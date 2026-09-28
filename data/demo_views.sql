-- Flat views the demo page queries. Loaded after lima_cap.sql.gz.
-- Column names match the Query Builder field keys in "Loan Servicing.dc.html".
-- As-of date is fixed to the lima-cap snapshot so DPD does not drift with the calendar.

CREATE OR REPLACE VIEW db_loans AS
WITH asof AS (SELECT DATE '2026-09-25' AS d),
b AS (
  SELECT DISTINCT ON (lp.loan_id) lp.loan_id,
         COALESCE(le.full_name, br.first_name || ' ' || br.last_name) AS borrower,
         CASE WHEN le.legal_entity_id IS NOT NULL THEN 'Entity' ELSE 'Individual' END AS borrower_type
  FROM loan_party lp
  LEFT JOIN legal_entity le ON le.legal_entity_id = lp.legal_entity_id
  LEFT JOIN borrower br ON br.borrower_id = lp.borrower_id
  WHERE lp.party_role_type = 'borrower'
  ORDER BY lp.loan_id, lp.is_primary DESC
),
g AS (
  SELECT DISTINCT ON (lp.loan_id) lp.loan_id, br.first_name || ' ' || br.last_name AS guarantor
  FROM loan_party lp JOIN borrower br ON br.borrower_id = lp.borrower_id
  WHERE lp.party_role_type = 'guarantor'
  ORDER BY lp.loan_id, lp.loan_party_id
),
p AS (
  SELECT DISTINCT ON (lc.loan_id) lc.loan_id, pr.city_name, pr.state_code, pr.property_type
  FROM loan_collateral lc JOIN property pr ON pr.property_id = lc.property_id
  ORDER BY lc.loan_id, lc.loan_or_pledge_priority_position NULLS LAST, lc.loan_collateral_id
),
inv AS (
  SELECT DISTINCT ON (lip.loan_id) lip.loan_id, i.name AS investor
  FROM loan_investor_position lip JOIN investor i ON i.investor_id = lip.investor_id
  WHERE lip.effective_to IS NULL
  ORDER BY lip.loan_id, lip.ownership_percent DESC
),
w AS (
  SELECT loan_id, string_agg(DISTINCT delinquency_tier, ', ') AS watchlist
  FROM watchlist_entry WHERE status = 'active' GROUP BY loan_id
),
s AS (
  SELECT loan_id, count(*) AS open_signals FROM risk_signal WHERE status = 'open' GROUP BY loan_id
)
SELECT l.loan_identifier AS loan,
       b.borrower,
       b.borrower_type,
       g.guarantor,
       CASE lpr.category WHEN 'fix_flip' THEN 'Fix & Flip' WHEN 'rental' THEN 'DSCR Rental' ELSE initcap(lpr.category) END AS program,
       lpr.product_name AS product,
       p.city_name AS city,
       p.state_code AS state,
       p.property_type,
       l.note_amount::float8 AS note_amount,
       l.actual_loan_balance::float8 AS upb,
       l.note_rate::float8 AS rate,
       GREATEST(0, (SELECT d FROM asof) - l.next_payment_due_date) AS dpd,
       CASE WHEN l.loan_maturity_date < (SELECT d FROM asof) THEN 'Matured'
            WHEN (SELECT d FROM asof) - l.next_payment_due_date >= 90 THEN '90+ DPD'
            WHEN (SELECT d FROM asof) - l.next_payment_due_date >= 60 THEN '60 DPD'
            WHEN (SELECT d FROM asof) - l.next_payment_due_date >= 30 THEN '30 DPD'
            WHEN (SELECT d FROM asof) - l.next_payment_due_date > 0 THEN '1–29 DPD'
            ELSE 'Current' END AS status,
       inv.investor,
       to_char(l.loan_maturity_date, 'YYYY-MM-DD') AS maturity,
       COALESCE(w.watchlist, '—') AS watchlist,
       COALESCE(s.open_signals, 0) AS open_signals
FROM loan l
JOIN loan_product lpr ON lpr.product_id = l.product_id
LEFT JOIN b ON b.loan_id = l.loan_id
LEFT JOIN g ON g.loan_id = l.loan_id
LEFT JOIN p ON p.loan_id = l.loan_id
LEFT JOIN inv ON inv.loan_id = l.loan_id
LEFT JOIN w ON w.loan_id = l.loan_id
LEFT JOIN s ON s.loan_id = l.loan_id;

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
         count(*) FILTER (WHERE l.next_payment_due_date < DATE '2026-09-25') AS delinquent
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
