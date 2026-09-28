-- Views the demo page queries. Loaded after lima_cap.sql.gz.
-- ui_* views feed the screens (see data/lima-hydrate.js); db_* views feed the Query Builder,
-- and their column names match its field keys in "Loan Servicing.dc.html".
-- The as-of date is fixed to the lima-cap snapshot so DPD does not drift with the calendar.

CREATE OR REPLACE FUNCTION ui_asof() RETURNS date LANGUAGE sql IMMUTABLE AS $$ SELECT DATE '2026-09-25' $$;

-- One row per loan with everything the screens show about it.
CREATE OR REPLACE VIEW ui_loan AS
WITH b AS (
  SELECT DISTINCT ON (lp.loan_id) lp.loan_id,
         COALESCE(le.full_name, br.first_name || ' ' || br.last_name) AS borrower,
         CASE WHEN le.legal_entity_id IS NOT NULL THEN 'Entity' ELSE 'Individual' END AS borrower_type,
         le.single_purpose_entity_indicator AS spe
  FROM loan_party lp
  LEFT JOIN legal_entity le ON le.legal_entity_id = lp.legal_entity_id
  LEFT JOIN borrower br ON br.borrower_id = lp.borrower_id
  WHERE lp.party_role_type = 'borrower'
  ORDER BY lp.loan_id, lp.is_primary DESC
),
g AS (
  SELECT DISTINCT ON (lp.loan_id) lp.loan_id, br.first_name || ' ' || br.last_name AS guarantor, lp.guaranty_type
  FROM loan_party lp JOIN borrower br ON br.borrower_id = lp.borrower_id
  WHERE lp.party_role_type = 'guarantor'
  ORDER BY lp.loan_id, lp.loan_party_id
),
p AS (
  SELECT DISTINCT ON (lc.loan_id) lc.loan_id, pr.property_id, pr.address_line_text, pr.city_name, pr.state_code, pr.postal_code,
         pr.property_type, pr.total_units_count, pr.msa_code
  FROM loan_collateral lc JOIN property pr ON pr.property_id = lc.property_id
  ORDER BY lc.loan_id, lc.loan_or_pledge_priority_position NULLS LAST, lc.loan_collateral_id
),
pc AS (SELECT loan_id, count(*) AS n_props, sum(pr.total_units_count) AS units FROM loan_collateral lc JOIN property pr USING (property_id) GROUP BY loan_id),
msa AS (SELECT DISTINCT ON (geography_code) geography_code, geography_name FROM market_indicator WHERE geography_type = 'msa' ORDER BY geography_code, retrieved_date DESC NULLS LAST),
inv AS (
  SELECT DISTINCT ON (lip.loan_id) lip.loan_id, i.name AS investor, i.investor_type, COALESCE(lip.servicing_fee_bps, i.default_servicing_fee_bps) AS fee_bps
  FROM loan_investor_position lip JOIN investor i ON i.investor_id = lip.investor_id
  WHERE lip.effective_to IS NULL
  ORDER BY lip.loan_id, lip.ownership_percent DESC
),
val AS (
  SELECT v.loan_id,
         max(vp.appraisal_premise_indicated_value_amount) FILTER (WHERE vp.appraisal_premise_type = 'as_is') AS as_is,
         max(vp.appraisal_premise_indicated_value_amount) FILTER (WHERE vp.appraisal_premise_type = 'as_if_completed') AS arv
  FROM valuation v JOIN valuation_premise vp USING (valuation_id) GROUP BY v.loan_id
),
hp AS (SELECT DISTINCT ON (loan_id) loan_id, dscr FROM property_health_period ORDER BY loan_id, period DESC),
sch AS (
  SELECT s.loan_id, s.scheduled_principal_amount AS sched_p, s.scheduled_interest_amount AS sched_i,
         COALESCE(s.scheduled_escrow_amount, 0) AS sched_e, s.total_payment_amount AS sched_total
  FROM loan_schedule s JOIN loan l ON l.loan_id = s.loan_id AND s.payment_due_date = l.next_payment_due_date
),
fc AS (SELECT DISTINCT loan_id FROM foreclosure_case WHERE status = 'active'),
reo AS (SELECT DISTINCT loan_id FROM reo_asset WHERE sold_date IS NULL),
w AS (SELECT loan_id, string_agg(DISTINCT delinquency_tier, ', ') AS watchlist FROM watchlist_entry WHERE status = 'active' GROUP BY loan_id),
s AS (SELECT loan_id, count(*) AS open_signals FROM risk_signal WHERE status = 'open' GROUP BY loan_id),
d AS (
  SELECT l.loan_id, GREATEST(0, ui_asof() - l.next_payment_due_date) AS dpd,
         CASE WHEN fc.loan_id IS NOT NULL THEN 'Foreclosure'
              WHEN reo.loan_id IS NOT NULL THEN 'REO'
              WHEN l.loan_maturity_date < ui_asof() THEN 'Matured'
              WHEN ui_asof() - l.next_payment_due_date >= 90 THEN '90+ DPD'
              WHEN ui_asof() - l.next_payment_due_date >= 60 THEN '60 DPD'
              WHEN ui_asof() - l.next_payment_due_date >= 30 THEN '30 DPD'
              WHEN ui_asof() - l.next_payment_due_date > 0 THEN '1–29 DPD'
              ELSE 'Current' END AS status
  FROM loan l LEFT JOIN fc USING (loan_id) LEFT JOIN reo USING (loan_id)
)
SELECT l.loan_id,
       l.loan_identifier AS id,
       b.borrower, b.borrower_type, b.spe,
       g.guarantor, g.guaranty_type,
       lpr.product_code, lpr.product_name AS product, lpr.category,
       CASE lpr.category WHEN 'fix_flip' THEN 'Fix & Flip' WHEN 'bridge' THEN 'Bridge' WHEN 'construction' THEN 'Construction'
                         WHEN 'rental' THEN 'DSCR' WHEN 'multifamily' THEN 'Multifamily' END AS type,
       CASE lpr.category WHEN 'rental' THEN 'DSCR' WHEN 'multifamily' THEN 'MF' ELSE 'RTL' END AS prog,
       p.property_id, p.address_line_text AS address, p.city_name AS city, p.state_code AS state, p.postal_code AS zip,
       COALESCE(msa.geography_name, p.city_name) AS msa, p.property_type, COALESCE(pc.units, p.total_units_count, 1)::int AS units,
       COALESCE(pc.n_props, 1)::int AS n_props,
       l.note_amount::float8 AS note_amount, l.actual_loan_balance::float8 AS upb, l.note_rate::float8 AS rate,
       l.interest_only_indicator AS io, l.original_amortization_term_months AS amort_months, l.original_loan_term_months AS term_months,
       l.note_date, l.loan_funding_date AS funded, l.loan_maturity_date AS maturity, l.next_payment_due_date AS next_due,
       l.holdback_amount::float8 AS holdback, l.interest_reserve_amount::float8 AS interest_reserve,
       COALESCE(l.late_charge_rate, pst.late_charge_rate)::float8 AS late_charge_rate, COALESCE(l.late_charge_grace_period_days, pst.late_charge_grace_period_days) AS grace_days,
       COALESCE(l.default_rate_pct, l.note_rate + pst.default_rate_add_pct)::float8 AS default_rate, pst.maturity_notice_days,
       l.recourse, l.extension_options, l.loan_purpose, l.original_ltv_percent::float8 AS orig_ltv,
       d.dpd, d.status,
       inv.investor, inv.investor_type, inv.fee_bps::float8 AS fee_bps,
       val.as_is::float8 AS value, val.arv::float8 AS arv, hp.dscr::float8 AS dscr,
       sch.sched_p::float8 AS sched_p, sch.sched_i::float8 AS sched_i, sch.sched_e::float8 AS sched_e, sch.sched_total::float8 AS sched_total,
       COALESCE(w.watchlist, '') AS watchlist, COALESCE(s.open_signals, 0)::int AS open_signals
FROM loan l
JOIN loan_product lpr ON lpr.product_id = l.product_id
JOIN d ON d.loan_id = l.loan_id
LEFT JOIN product_servicing_terms pst ON pst.product_code = lpr.product_code
LEFT JOIN b ON b.loan_id = l.loan_id
LEFT JOIN g ON g.loan_id = l.loan_id
LEFT JOIN p ON p.loan_id = l.loan_id
LEFT JOIN pc ON pc.loan_id = l.loan_id
LEFT JOIN msa ON msa.geography_code = p.msa_code
LEFT JOIN inv ON inv.loan_id = l.loan_id
LEFT JOIN val ON val.loan_id = l.loan_id
LEFT JOIN hp ON hp.loan_id = l.loan_id
LEFT JOIN sch ON sch.loan_id = l.loan_id
LEFT JOIN w ON w.loan_id = l.loan_id
LEFT JOIN s ON s.loan_id = l.loan_id;

-- Every individual behind each loan: guarantors, entity principals and individual borrowers.
CREATE OR REPLACE VIEW ui_loan_person AS
SELECT DISTINCT ON (x.loan_id, x.borrower_id) x.loan_id, x.borrower_id, br.first_name || ' ' || br.last_name AS name, x.role, x.guaranty_type
FROM (
  SELECT lp.loan_id, lp.borrower_id, lp.party_role_type AS role, lp.guaranty_type, CASE lp.party_role_type WHEN 'guarantor' THEN 1 WHEN 'borrower' THEN 2 ELSE 3 END AS rk
  FROM loan_party lp WHERE lp.borrower_id IS NOT NULL
  UNION ALL
  SELECT lp.loan_id, ep.borrower_id, 'principal', NULL, 4
  FROM entity_principal ep JOIN loan_party lp ON lp.legal_entity_id = ep.legal_entity_id AND lp.party_role_type = 'borrower'
) x JOIN borrower br ON br.borrower_id = x.borrower_id
ORDER BY x.loan_id, x.borrower_id, x.rk;

-- Days past due at a point in time: oldest installment due on or before the date that no posted payment covered by then.
CREATE OR REPLACE FUNCTION ui_dpd_at(p_date date) RETURNS TABLE (loan_id bigint, dpd int) LANGUAGE sql STABLE AS $$
  SELECT s.loan_id, (p_date - min(s.payment_due_date))::int
  FROM loan_schedule s
  WHERE s.payment_due_date <= p_date
    AND NOT EXISTS (SELECT 1 FROM payment_application pa JOIN payment p ON p.payment_id = pa.payment_id
                    WHERE pa.schedule_id = s.schedule_id AND p.status = 'posted' AND p.payment_received_date <= p_date)
  GROUP BY s.loan_id
$$;

-- Query Builder datasets.
CREATE OR REPLACE VIEW db_loans AS
SELECT id AS loan, borrower, borrower_type, guarantor,
       CASE category WHEN 'fix_flip' THEN 'Fix & Flip' WHEN 'rental' THEN 'DSCR Rental' ELSE initcap(category) END AS program,
       product, city, state, property_type, note_amount, upb, rate, dpd, status, investor,
       to_char(maturity, 'YYYY-MM-DD') AS maturity, COALESCE(NULLIF(watchlist, ''), '—') AS watchlist, open_signals
FROM ui_loan;

-- One row per individual (guarantor, principal or direct borrower) with exposure across every entity they stand behind.
CREATE OR REPLACE VIEW db_borrowers AS
WITH links AS (
  SELECT lp.borrower_id, lp.loan_id, NULL::bigint AS legal_entity_id
  FROM loan_party lp WHERE lp.borrower_id IS NOT NULL
  UNION
  SELECT ep.borrower_id, lp.loan_id, lp.legal_entity_id
  FROM entity_principal ep
  JOIN loan_party lp ON lp.legal_entity_id = ep.legal_entity_id AND lp.party_role_type = 'borrower'
),
agg AS (
  SELECT d.borrower_id,
         count(*) AS loans,
         sum(l.actual_loan_balance)::float8 AS upb,
         count(*) FILTER (WHERE l.next_payment_due_date < ui_asof()) AS delinquent
  FROM (SELECT DISTINCT borrower_id, loan_id FROM links) d
  JOIN loan l USING (loan_id)
  GROUP BY d.borrower_id
),
ents AS (
  SELECT borrower_id, count(DISTINCT legal_entity_id) AS entities FROM links GROUP BY borrower_id
)
SELECT br.first_name || ' ' || br.last_name AS name,
       a.loans,
       e.entities,
       a.upb,
       a.delinquent,
       COALESCE(gc.concentration_level, 'none') AS concentration,
       c.city || ', ' || c.state AS location,
       c.email_address AS email,
       c.preferred_contact_method_type AS contact_pref
FROM borrower br
JOIN agg a ON a.borrower_id = br.borrower_id
JOIN ents e ON e.borrower_id = br.borrower_id
LEFT JOIN guarantor_concentration gc ON gc.borrower_id = br.borrower_id
LEFT JOIN LATERAL (
  SELECT city, state, email_address, preferred_contact_method_type FROM contact ct
  WHERE ct.borrower_id = br.borrower_id ORDER BY primary_contact_indicator DESC NULLS LAST LIMIT 1
) c ON true;
