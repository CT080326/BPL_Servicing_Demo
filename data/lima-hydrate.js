// Screen data from the in-browser servicing database.
// window.LimaHydrate.load(LimaDB) runs one batch of queries against the ui_* views
// (data/demo_views.sql) and returns plain objects shaped the way "Loan Servicing.dc.html"
// renders them. The page calls it once the database is ready, and again after any write.
(function () {
  const ASOF = '2026-09-25';
  const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const toDate = v => v == null || v === '' ? null : v instanceof Date ? v : new Date(String(v).slice(0, 10) + 'T00:00:00Z');
  const fmt = v => { const d = toDate(v); return d ? MON[d.getUTCMonth()] + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear() : '—'; };
  const fmtS = v => { const d = toDate(v); return d ? MON[d.getUTCMonth()] + ' ' + d.getUTCDate() : '—'; };
  const iso = v => { const d = toDate(v); return d ? d.toISOString().slice(0, 10) : null; };
  const days = (a, b) => Math.round((toDate(b) - toDate(a)) / 864e5);
  const asof = toDate(ASOF);
  const num = v => typeof v === 'bigint' ? Number(v) : v;
  const norm = r => { const o = {}; for (const k in r) o[k] = num(r[k]); return o; };
  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ') : '';
  const initials = s => (s || '').split(/[\s.]+/).filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase() || '—';
  const group = (rows, k) => { const g = {}; rows.forEach(r => (g[r[k]] = g[r[k]] || []).push(r)); return g; };
  const PTYPE = { sfr:'Single Family', townhome:'Townhome', condo:'Condo', duplex:'Duplex', triplex:'Triplex', fourplex:'Fourplex', multifamily_10plus:'Multifamily' };
  const STRAT = { foreclosure_baseline:'Foreclosure / REO', modification:'Modification', settlement:'Discounted Payoff', rent_redirection:'Rent Redirection', deficiency_judgment:'Deficiency Judgment',
    ucc_foreclosure:'UCC Foreclosure', project_completion:'Project Completion', maturity_extension:'Maturity Extension', deed_in_lieu:'Deed-in-Lieu', note_sale:'Note Sale', reinstatement:'Reinstatement' };
  const LIBKEY = { modification:'Modification', discounted_payoff:'Discounted Payoff', rent_redirection:'Rent Redirection', deficiency_judgment:'Deficiency Judgment',
    ucc_foreclosure:'UCC Foreclosure', project_completion:'Project Completion', asset_sale:'Asset Sale', walk_away:'Walk-Away' };

  const SQL = {
    loans: `SELECT * FROM ui_loan ORDER BY upb DESC`,
    people: `SELECT loan_id, borrower_id, name, role, guaranty_type FROM ui_loan_person`,
    tiers: `SELECT loan_id, tier_type, to_status, event_date FROM loan_tier_event ORDER BY loan_id, event_date, tier_event_id`,
    trend: `SELECT borrower_id, month, avg_receipt_day::float8 AS d FROM borrower_payment_trend WHERE month BETWEEN '2025-10' AND '2026-09'`,
    signals: `SELECT loan_id, borrower_id, signal_type, severity, detected_date, COALESCE(detail->>'note', detail::text) AS note, source_process FROM risk_signal WHERE status = 'open' ORDER BY detected_date DESC`,
    rels: `SELECT borrower_id, borrower_name, total_upb::float8 AS upb, worsened_loans_90d AS worsened, portfolio_deterioration AS flag FROM borrower_relationship
           ORDER BY portfolio_deterioration DESC, worsened_loans_90d DESC, total_upb DESC LIMIT 5`,
    delinq: `SELECT DISTINCT ON (loan_id) loan_id, days_past_due, bucket, amount_past_due::float8 AS past_due FROM loan_delinquency ORDER BY loan_id, as_of_date DESC`,
    acts: `SELECT loan_id, stage, activity_date, activity_type, result, promise_date, promise_amount::float8 AS promise_amount, promise_kept, agent FROM collection_activity ORDER BY activity_date DESC`,
    lact: `SELECT loan_id, event_date, kind, label, detail, amount::float8 AS amount FROM loan_activity WHERE kind NOT IN ('payment','test') ORDER BY event_date DESC`,
    analyses: `SELECT analysis_id, loan_id, analysis_date, delinquency_tier, status, actual_loan_balance::float8 AS bal, accrued_interest_amount::float8 AS accrued,
             advances_balance_amount::float8 AS advances, total_exposure_amount::float8 AS exposure, property_value_amount::float8 AS value, foreclosure_process_type AS process,
             estimated_timeline_months::float8 AS timeline, legal_cost_amount::float8 AS legal, monthly_carry_cost_amount::float8 AS carry_m, carry_months::float8 AS carry_mo,
             reo_discount_percent::float8 AS reo_disc, reo_selling_cost_percent::float8 AS sell_pct, estimated_gross_recovery_amount::float8 AS gross,
             estimated_net_recovery_amount::float8 AS net, estimated_loss_amount::float8 AS loss, loss_severity_percent::float8 AS severity
             FROM loss_exposure_analysis WHERE status <> 'superseded'`,
    apps: `SELECT analysis_id, strategy_code, applicable, reason, collectability_percent::float8 AS collect FROM scenario_applicability`,
    freezes: `SELECT f.freeze_id, f.loan_id, f.frozen_at, f.frozen_loss_amount::float8 AS baseline, f.approved_by, s.option_type, s.vs_baseline_delta_amount::float8 AS delta,
             EXISTS (SELECT 1 FROM resolution_outcome o WHERE o.freeze_id = f.freeze_id) AS resolved
             FROM baseline_freeze f LEFT JOIN resolution_scenario s ON s.scenario_id = f.scenario_id ORDER BY f.frozen_at`,
    outcomes: `SELECT l.id, l.borrower, o.state_code, o.strategy_type, o.analyst, a.actual_loan_balance::float8 AS upb, f.frozen_at, f.frozen_loss_amount::float8 AS baseline,
             s.vs_baseline_delta_amount::float8 AS delta, o.resolved_date, o.realized_loss_amount::float8 AS actual
             FROM resolution_outcome o JOIN ui_loan l USING (loan_id) LEFT JOIN loss_exposure_analysis a ON a.analysis_id = o.analysis_id
             LEFT JOIN baseline_freeze f ON f.freeze_id = o.freeze_id LEFT JOIN resolution_scenario s ON s.scenario_id = f.scenario_id ORDER BY o.resolved_date`,
    projects: `SELECT loan_id, budget_amount::float8 AS budget, draws_funded_amount::float8 AS funded, percent_complete::float8 AS pct, original_completion_date AS orig,
             current_completion_date AS cur, last_inspection_date AS insp_date, inspector_name AS inspector, cost_to_complete_amount::float8 AS ctc,
             est_months_to_complete::float8 AS months, after_repair_value_amount::float8 AS arv, as_is_value_amount::float8 AS as_is FROM project_status`,
    health: `SELECT loan_id, period, dscr::float8 AS dscr, occupancy_percent::float8 AS occ, gross_rent_amount::float8 AS rent, operating_expense_amount::float8 AS opex
             FROM property_health_period ORDER BY loan_id, period`,
    tasks: `SELECT t.task_id, t.loan_id, t.task_type, COALESCE(tt.name, initcap(replace(t.task_type, '_', ' '))) AS name, t.due_date, t.priority, t.status, t.assigned_to, t.owner_role, t.notes
             FROM servicing_task t LEFT JOIN task_template tt ON tt.template_id = t.template_id WHERE t.status NOT IN ('complete','cancelled') ORDER BY t.due_date NULLS LAST`,
    posted: `SELECT p.payment_id, l.id, l.borrower, p.payment_method_type AS method, p.payment_amount::float8 AS amount, COALESCE(p.posted_by, 'Auto') AS by, p.status, p.posted_at,
             (SELECT string_agg(DISTINCT pa.bucket, ', ') FROM payment_application pa WHERE pa.payment_id = p.payment_id) AS applied
             FROM payment p JOIN ui_loan l USING (loan_id) WHERE p.payment_received_date = DATE '${ASOF}' ORDER BY p.posted_at DESC NULLS LAST, p.payment_id DESC`,
    exq: `SELECT q.exception_id, q.exception_type, q.detected_date, q.status, q.description, q.payment_amount::float8 AS amount, q.payment_method_type AS method,
             l.id, l.borrower, l.investor, l.sched_total, l.next_due FROM payment_exception_queue q LEFT JOIN ui_loan l USING (loan_id)
             WHERE q.status <> 'resolved' ORDER BY q.detected_date DESC, q.exception_id`,
    exAll: `SELECT count(*) FILTER (WHERE status = 'resolved') AS resolved, count(*) AS total FROM payment_exception`,
    batches: `SELECT channel, batch_reference, item_count, total_amount::float8 AS total, received_at FROM payment_batch WHERE batch_date = DATE '${ASOF}' ORDER BY batch_id`,
    susp: `SELECT count(*) AS n, COALESCE(sum(suspense_amount), 0)::float8 AS amt FROM suspense_balance WHERE resolved_date IS NULL`,
    ext: `SELECT e.request_id, e.loan_id, l.id, l.borrower, l.guarantor, l.investor, e.requested_date, e.current_maturity_date, e.requested_months, e.status,
             e.proposed_rate::float8 AS proposed_rate, e.extension_fee_percent::float8 AS fee_pct, e.conditions, e.priced_date, e.decision_date, e.decided_by, e.notes
             FROM extension_request e JOIN ui_loan l USING (loan_id) ORDER BY CASE e.status WHEN 'under_review' THEN 0 WHEN 'priced' THEN 1 WHEN 'received' THEN 2 ELSE 3 END, e.requested_date`,
    remit: `SELECT i.investor_id, i.name, i.investor_type, i.default_servicing_fee_bps::float8 AS bps, i.remit_bank_name AS bank, i.remit_account_last4 AS last4, i.remit_day,
             count(l.loan_id) AS loans, COALESCE(sum(l.upb), 0)::float8 AS upb, COALESCE(sum(l.upb * COALESCE(l.fee_bps, 0) / 10000 / 12), 0)::float8 AS fee,
             COALESCE((SELECT sum(pa.applied_amount) FROM payment_application pa JOIN payment p ON p.payment_id = pa.payment_id JOIN loan_investor_position x ON x.loan_id = p.loan_id AND x.effective_to IS NULL
               WHERE x.investor_id = i.investor_id AND p.status = 'posted' AND p.payment_received_date BETWEEN DATE '2026-09-01' AND DATE '2026-09-30' AND pa.bucket IN ('principal','payoff_principal')), 0)::float8 AS principal,
             COALESCE((SELECT sum(pa.applied_amount) FROM payment_application pa JOIN payment p ON p.payment_id = pa.payment_id JOIN loan_investor_position x ON x.loan_id = p.loan_id AND x.effective_to IS NULL
               WHERE x.investor_id = i.investor_id AND p.status = 'posted' AND p.payment_received_date BETWEEN DATE '2026-09-01' AND DATE '2026-09-30' AND pa.bucket = 'interest'), 0)::float8 AS interest
             FROM investor i LEFT JOIN ui_loan l ON l.investor = i.name GROUP BY i.investor_id ORDER BY upb DESC`,
    dpdTrend: `SELECT x.d, count(*) AS n, COALESCE(sum(l.actual_loan_balance), 0)::float8 AS upb FROM
             (SELECT (date_trunc('month', t) + interval '1 month - 1 day')::date AS d FROM generate_series(DATE '2026-04-01', DATE '2026-09-01', interval '1 month') t) x
             JOIN LATERAL (SELECT DISTINCT ON (e.loan_id) e.loan_id, e.to_status FROM loan_tier_event e WHERE e.tier_type = 'payment' AND e.event_date <= LEAST(x.d, DATE '${ASOF}')
                           ORDER BY e.loan_id, e.event_date DESC, e.tier_event_id DESC) s ON s.to_status = 'breach'
             JOIN loan l ON l.loan_id = s.loan_id GROUP BY x.d ORDER BY x.d`,
    escrow: `SELECT ea.loan_id, ea.current_escrow_balance::float8 AS bal, ea.monthly_escrow_deposit_amount::float8 AS dep, ea.escrow_cushion_months AS cushion_mo,
             (SELECT json_agg(json_build_object('due', ti.tax_due_date, 'amt', ti.projected_disbursement_amount, 'payee', t.payee_name))
                FROM property_tax t JOIN property_tax_installment ti ON ti.tax_id = t.tax_id JOIN loan_collateral lc ON lc.property_id = t.property_id WHERE lc.loan_id = ea.loan_id) AS taxes,
             (SELECT json_agg(json_build_object('due', ip.premium_due_date, 'amt', ip.annual_premium_amount, 'carrier', ip.carrier_name, 'end', ip.coverage_end_date))
                FROM insurance_policy ip JOIN loan_collateral lc ON lc.property_id = ip.property_id WHERE lc.loan_id = ea.loan_id) AS ins
             FROM escrow_account ea WHERE ea.status = 'active'`,
    summary: `SELECT * FROM loss_prevention_summary`
  };

  // Composite covenant tier from the three lima-cap tier tracks (payment, maturity, covenant).
  function tierOf(st) {
    const v = Object.values(st), b = v.filter(x => x === 'breach').length, w = v.filter(x => x === 'watch').length;
    return b >= 2 ? 'Substandard' : b === 1 ? 'Special Mention' : w ? 'Watch' : 'Pass';
  }
  function tierHistory(events) {
    const st = {}, out = { tier0:'Pass', changes:[] }; let prev = 'Pass';
    (events || []).forEach(e => {
      st[e.tier_type] = e.to_status === 'clear' ? 'clear' : e.to_status;
      const t = tierOf(st), d = toDate(e.event_date), mi = (d.getUTCFullYear() - 2025) * 12 + d.getUTCMonth() - 9;
      if (t === prev) return;
      if (mi < 0) out.tier0 = t; else out.changes.push([fmt(d), days(d, asof), mi, t]);
      prev = t;
    });
    return out;
  }

  async function load(LimaDB) {
    const t0 = performance.now(), R = {};
    for (const [k, sql] of Object.entries(SQL)) R[k] = (await LimaDB.query(sql)).rows.map(norm);
    const D = { asof: ASOF, asofF: fmt(ASOF), asofS: fmtS(ASOF), fmt, fmtS, iso, days };

    // ---- loans ----
    const proj = Object.fromEntries(R.projects.map(p => [p.loan_id, p]));
    const byId = {}, byLoanId = {};
    D.LOANS = R.loans.map(r => {
      const pj = proj[r.loan_id], units = r.units || 1;
      const L = {
        loanId: r.loan_id, id: r.id, borrower: r.borrower || '—', bType: r.borrower_type, guarantor: r.guarantor || (r.borrower_type === 'Individual' ? r.borrower : '—'),
        guarantyType: r.guaranty_type, property: [r.address, r.city, (r.state || '') + ' ' + (r.zip || '')].filter(Boolean).join(', ') + (r.n_props > 1 ? ' + ' + (r.n_props - 1) + ' more' : ''),
        address: r.address, city: r.city, state: r.state, msa: r.msa, units, nProps: r.n_props,
        ptype: (PTYPE[r.property_type] || cap(r.property_type)) + (r.n_props > 1 ? ' portfolio (' + r.n_props + ')' : units > 1 ? ' (' + units + ')' : ''),
        type: r.type, prog: r.prog, product: r.product, upb: r.upb, noteAmt: r.note_amount, rate: r.rate, status: r.status, dpd: r.dpd,
        investor: r.investor || 'Unassigned', investorType: r.investor_type, feeBps: r.fee_bps,
        maturity: fmt(r.maturity), maturityD: iso(r.maturity), orig: fmt(r.funded || r.note_date), fundedD: iso(r.funded || r.note_date), noticeDays: r.maturity_notice_days, noteDate: fmt(r.note_date), next: fmt(r.next_due), nextD: iso(r.next_due),
        value: r.value || (pj && pj.as_is) || Math.round(r.upb / 0.7 / 1000) * 1000, valueSrc: r.value ? 'appraisal' : pj && pj.as_is ? 'inspection' : 'estimate',
        arv: r.arv || (pj && pj.arv) || undefined, io: !!r.io, dscr: r.dscr ? r.dscr.toFixed(2) + 'x' : undefined,
        amort: r.amort_months, term: r.term_months, holdback: r.holdback || 0, ir: r.interest_reserve || 0, lateRate: r.late_charge_rate, grace: r.grace_days,
        defaultRate: r.default_rate, recourse: r.recourse, purpose: r.loan_purpose, origLtv: r.orig_ltv,
        sched: { p: r.sched_p || 0, i: r.sched_i || 0, e: r.sched_e || 0, total: r.sched_total || 0 },
        watchlist: r.watchlist, openSignals: r.open_signals
      };
      byId[L.id] = L; byLoanId[L.loanId] = L; return L;
    });
    D.byId = byId; D.byLoanId = byLoanId;
    D.portUpb = D.LOANS.reduce((s, l) => s + l.upb, 0);

    // ---- people and relationships ----
    const tiers = group(R.tiers, 'loan_id');
    D.TIER = {}; Object.keys(byLoanId).forEach(k => { D.TIER[byLoanId[k].id] = tierHistory(tiers[k]); });
    D.PEOPLE = {}; D.LOAN_PEOPLE = {};
    R.people.forEach(p => { const L = byLoanId[p.loan_id]; if (!L) return;
      const P = D.PEOPLE[p.name] = D.PEOPLE[p.name] || { name: p.name, borrowerId: p.borrower_id, loans: [], roles: {} };
      if (!P.loans.includes(L.id)) P.loans.push(L.id);
      P.roles[L.id] = p.role === 'guarantor' ? (p.guaranty_type || 'guarantor') : p.role;
      (D.LOAN_PEOPLE[L.id] = D.LOAN_PEOPLE[L.id] || []).push(p.name); });
    D.TREND = {}; R.trend.forEach(t => { const i = (+t.month.slice(0, 4) - 2025) * 12 + (+t.month.slice(5, 7)) - 10; if (i < 0 || i > 11) return;
      (D.TREND[t.borrower_id] = D.TREND[t.borrower_id] || Array(12).fill(null))[i] = Math.round((t.d - 1) * 10) / 10; });
    const SIG_ICON = { payment_timing_drift:'clock-countdown', borrower_concentration:'users-three', tax_delinquent:'bank', insurance_lapsed:'shield-warning', maturity_within_90_days:'calendar-x', occupancy_decline:'house-line' };
    const SIG_SEV = { credit:'high', watch:'med' };
    D.SIGNALS = {}; R.signals.forEach(s => { const L = byLoanId[s.loan_id]; if (!L) return;
      (D.SIGNALS[L.id] = D.SIGNALS[L.id] || []).push({ date: fmt(s.detected_date), dateD: iso(s.detected_date), type: cap(s.signal_type), sev: SIG_SEV[s.severity] || 'low', text: s.note || '', source: s.source_process ? cap(s.source_process) : 'Servicing monitor', icon: SIG_ICON[s.signal_type] || 'warning' }); });
    D.REL_PICK = R.rels.map(r => ({ name: r.borrower_name, flag: !!r.flag, worsened: r.worsened }));

    // ---- delinquency, collections, loss ----
    const del = Object.fromEntries(R.delinq.map(d => [d.loan_id, d]));
    const acts = group(R.acts, 'loan_id'), lact = group(R.lact, 'loan_id');
    const tasks = group(R.tasks, 'loan_id');
    D.TASKS = {}; Object.keys(tasks).forEach(k => { const L = byLoanId[k]; if (L) D.TASKS[L.id] = tasks[k]; });
    D.ACTIVITY = {}; Object.keys(lact).forEach(k => { const L = byLoanId[k]; if (L) D.ACTIVITY[L.id] = lact[k]; });
    D.ANALYSIS = {}; R.analyses.forEach(a => { const L = byLoanId[a.loan_id]; if (L) D.ANALYSIS[L.id] = { ...a, apps: [] }; });
    const aById = {}; Object.values(D.ANALYSIS).forEach(a => aById[a.analysis_id] = a);
    R.apps.forEach(x => { const a = aById[x.analysis_id]; if (a) a.apps.push(x); });
    D.APPROVALS = {}; R.freezes.forEach(f => { const L = byLoanId[f.loan_id]; if (!L || f.resolved) return;
      D.APPROVALS[L.id] = { strategy: STRAT[f.option_type] || cap(f.option_type), date: fmt(f.frozen_at), by: f.approved_by || '—', baseline: f.baseline, projected: Math.max(0, f.baseline - (f.delta || 0)) }; });
    D.RESOLVED = R.outcomes.map(o => { const d = toDate(o.resolved_date);
      return [o.id, o.borrower, o.state_code, STRAT[o.strategy_type] || cap(o.strategy_type), o.analyst || '—', o.upb || 0, fmt(o.frozen_at), o.baseline || o.actual,
        Math.max(0, (o.baseline || 0) - (o.delta || 0)), fmt(d), MON[d.getUTCMonth()], o.actual]; });
    D.RES_MONTHS = [...new Set(D.RESOLVED.map(t => t[10]))];
    D.RES_RANGE = D.RESOLVED.length ? D.RESOLVED[0][10] + '–' + D.RESOLVED[D.RESOLVED.length - 1][10] : '';

    const STAGE = L => L.status === 'Foreclosure' ? 'Foreclosure' : L.status === 'Matured' ? 'Matured Unpaid' : L.dpd >= 90 ? '90+ DPD' : L.dpd >= 60 ? '60–89 DPD' : L.dpd >= 30 ? '30–59 DPD' : '1–29 DPD';
    const SBV = { 'Foreclosure':'navy', 'Matured Unpaid':'secondary', '90+ DPD':'destructive', '60–89 DPD':'destructive', '30–59 DPD':'warning', '1–29 DPD':'warning' };
    const RESULT = { no_contact:'No contact', left_message:'Left message', spoke_borrower:'Spoke with borrower', promise_to_pay:'Promise to pay', dispute:'Borrower disputes',
      refused:'Borrower refused', bad_number:'Bad number', reports_pending_payoff:'Borrower reports payoff pending', reports_paid_off:'Borrower reports paid off' };
    const colLoans = D.LOANS.filter(L => ['1–29 DPD','30 DPD','60 DPD','90+ DPD','Matured','Foreclosure'].includes(L.status));
    D.COL = colLoans.map(L => {
      const a = acts[L.loanId] || [], la = (lact[L.loanId] || []).filter(x => ['notice','tier','breach','promise','extension','decision','freeze'].includes(x.kind)), t = (tasks[L.loanId] || [])[0];
      const dl = del[L.loanId], due = dl && dl.past_due ? dl.past_due : L.sched.total * Math.max(1, Math.ceil(L.dpd / 30));
      const stage = STAGE(L), last = a[0] ? fmtS(a[0].activity_date) : la[0] ? fmtS(la[0].event_date) : '—', who = a[0] ? a[0].agent : t && t.assigned_to ? t.assigned_to : 'Unassigned';
      const promise = a.find(x => x.result === 'promise_to_pay' && x.promise_kept == null);
      const next = promise ? 'Promise to pay ' + fmtS(promise.promise_date) : t ? t.name + ' · due ' + fmtS(t.due_date) : stage === 'Foreclosure' ? 'Foreclosure in progress' : 'Contact borrower';
      const log = [...a.map(x => [fmtS(x.activity_date), cap(x.activity_type), (RESULT[x.result] || cap(x.result)) + (x.promise_amount ? ' · $' + x.promise_amount.toLocaleString('en-US', { minimumFractionDigits:2 }) + ' by ' + fmtS(x.promise_date) : '') + (x.agent ? ' · ' + x.agent : '')]),
        ...la.slice(0, 6).map(x => [fmtS(x.event_date), cap(x.kind), x.label + (x.detail ? ' · ' + x.detail : '')])].slice(0, 8);
      return [L.id, L.borrower, L.dpd, due, stage, SBV[stage], last, who, initials(who), next, log.length ? log : [['—', 'System', 'No contact logged yet.']]];
    });
    const expOf = id => D.ANALYSIS[id] ? D.ANALYSIS[id].loss : null;
    D.COL.sort((x, y) => (expOf(y[0]) || 0) - (expOf(x[0]) || 0) || y[2] - x[2]);

    D.LOSS_IN = {}; D.FACTS = {};
    const facts = L => {
      const a = D.ANALYSIS[L.id], pj = proj[L.loanId], h = R.health.filter(x => x.loan_id === L.loanId).pop();
      const why = {}; (a ? a.apps : []).forEach(x => { if (LIBKEY[x.strategy_code]) why[LIBKEY[x.strategy_code]] = x.applicable ? null : cap(x.reason) + '.'; });
      const dj = a && a.apps.find(x => x.strategy_code === 'deficiency_judgment');
      D.LOSS_IN[L.id] = [a ? a.bal : L.upb, L.rate, a ? a.value : L.value, a ? Math.round(a.timeline + (a.carry_mo || 0) / 2) : 9];
      D.FACTS[L.id] = { borrower: L.borrower, guarantor: L.guarantor, prog: L.prog === 'RTL' ? 'RTL' : L.prog === 'DSCR' ? 'DSCR' : 'CRE', ptype: L.type + ' · ' + L.ptype, st: L.state, city: L.city,
        recourse: L.guarantyType === 'limited' ? 'carve-out' : 'full', liq: 0, collect: dj && dj.collect != null ? dj.collect : null, pledge: L.bType === 'Entity',
        rehab: pj ? Math.round(pj.pct) : 100, ctc: pj ? pj.ctc : 0, arv: pj ? pj.arv : L.arv, rent: h ? Math.round(h.rent / 3) : 0, aor: !!h, payoff: true, dpd: L.dpd, dbWhy: a ? why : null };
    };
    [...colLoans, ...Object.keys(D.ANALYSIS).map(id => byId[id])].forEach(L => { if (L && !D.FACTS[L.id]) facts(L); });
    D.PROJ = {}; R.projects.forEach(p => { const L = byLoanId[p.loan_id]; if (!L) return;
      D.PROJ[L.id] = { budget: p.budget, funded: p.funded, draws: p.funded ? [['Draws funded through ' + fmt(p.insp_date), p.funded, Math.round(p.pct)]] : [], insp: Math.round(p.pct), inspDate: fmt(p.insp_date),
        inspector: p.inspector || '—', ctc: p.ctc, orig: fmt(p.orig), cur: fmt(p.cur), slip: Math.max(0, days(p.orig, p.cur)), months: p.months, arv: p.arv, asIs: p.as_is }; });
    D.HEALTH = {}; Object.entries(group(R.health, 'loan_id')).forEach(([k, rows]) => { const L = byLoanId[k]; if (L) D.HEALTH[L.id] = rows; });
    D.SUMMARY = R.summary[0] || {};

    // ---- portfolio ----
    D.DPD_TREND = R.dpdTrend.map(x => [MON[toDate(x.d).getUTCMonth()], x.upb / D.portUpb * 100]);

    // ---- task inbox ----
    const T = (label, icon, desc, items, count) => ({ label, icon, desc, count: count == null ? items.length : count, items: items.slice(0, 25) });
    const EXL = { short_pay:['Short pay','warning'], overpay:['Overpayment','outline'], nsf_return:['NSF return','destructive'], unidentified_payer:['Unidentified','secondary'], duplicate:['Duplicate','outline'], suspense_aging:['Suspense aging','warning'] };
    D.TG = {
      exceptions: T('Payment Exceptions', 'warning-circle', 'Open receipt exceptions from today\'s batches', R.exq.map(x => [x.id || '—', x.borrower || 'Unmatched', (EXL[x.exception_type] || [cap(x.exception_type)])[0], (EXL[x.exception_type] || [0, 'outline'])[1], x.description, 'Detected ' + fmtS(x.detected_date), 'Review'])),
      deter: T('Portfolio Deterioration', 'trend-down', 'Relationships with 2+ loans moved to a worse tier within 90 days', R.rels.filter(r => r.flag).map(r => ['Relationship', r.borrower_name, r.worsened + ' downgrades', 'destructive', r.worsened + ' loans moved to a worse tier in the trailing 90 days · $' + (r.upb / 1e6).toFixed(2) + 'M UPB.', 'Flagged', 'Review', r.borrower_name])),
      maturity: T('Maturing in 30 Days', 'calendar-check', 'Loans maturing on or before ' + fmtS(new Date(asof.getTime() + 30 * 864e5)) + ', plus matured unpaid',
        D.LOANS.filter(L => L.status === 'Matured' || (L.maturityD && days(ASOF, L.maturityD) >= 0 && days(ASOF, L.maturityD) <= 30)).sort((a, b) => (a.maturityD > b.maturityD ? 1 : -1))
          .map(L => [L.id, L.borrower, L.status === 'Matured' ? 'Matured' : 'Matures ' + fmtS(L.maturityD), L.status === 'Matured' ? 'navy' : 'outline', L.type + ' · $' + Math.round(L.upb).toLocaleString() + ' UPB', L.status === 'Matured' ? days(L.maturityD, ASOF) + ' days past' : fmtS(L.maturityD), 'Open'])),
      ext: T('Extension Requests', 'calendar-plus', 'Awaiting pricing or decision', R.ext.filter(e => ['received','under_review','priced'].includes(e.status)).map(e => [e.id, e.borrower, e.requested_months + '-month', 'secondary', cap(e.status) + (e.conditions ? ' · ' + e.conditions : e.notes ? ' · ' + e.notes : ''), 'Requested ' + fmtS(e.requested_date), 'Review'])),
      ptp: T('Promises to Pay', 'handshake', 'Open promise-to-pay commitments', R.acts.filter(a => a.result === 'promise_to_pay' && a.promise_kept == null && byLoanId[a.loan_id]).sort((a, b) => (iso(a.promise_date) > iso(b.promise_date) ? 1 : -1))
        .map(a => { const L = byLoanId[a.loan_id]; return [L.id, L.borrower, '$' + (a.promise_amount || 0).toLocaleString('en-US', { minimumFractionDigits:2 }), iso(a.promise_date) <= ASOF ? 'warning' : 'outline', 'Promised to ' + a.agent + ' on ' + fmtS(a.activity_date) + '.', iso(a.promise_date) === ASOF ? 'Today' : fmtS(a.promise_date), 'Call']; })),
      ins: T('Tax & Insurance', 'shield-warning', 'Open tax delinquency and insurance lapse signals', R.signals.filter(s => ['tax_delinquent','insurance_lapsed'].includes(s.signal_type) && byLoanId[s.loan_id])
        .map(s => { const L = byLoanId[s.loan_id]; return [L.id, L.borrower, s.signal_type === 'tax_delinquent' ? 'Tax delinquent' : 'Insurance lapsed', 'destructive', s.note || '', 'Detected ' + fmtS(s.detected_date), 'Request']; })),
      loss: T('Loss Analyses Due', 'scales', 'Open loss exposure analysis tasks', R.tasks.filter(t => t.task_type === 'loss_analysis' && byLoanId[t.loan_id]).map(t => { const L = byLoanId[t.loan_id];
        return [L.id, L.borrower, cap(t.priority || 'normal'), t.priority === 'high' || t.priority === 'urgent' ? 'destructive' : 'outline', t.name + ' · ' + cap(t.status) + (t.assigned_to ? ' · ' + t.assigned_to : ''), 'Due ' + fmtS(t.due_date), 'Open']; })),
      watch: T('Watchlist Reviews', 'eye', 'Scheduled watchlist loan reviews', R.tasks.filter(t => t.task_type === 'watchlist_review' && byLoanId[t.loan_id]).map(t => { const L = byLoanId[t.loan_id];
        return [L.id, L.borrower, cap(t.priority || 'normal'), 'outline', t.name + ' · ' + cap(t.status) + (t.assigned_to ? ' · ' + t.assigned_to : ''), 'Due ' + fmtS(t.due_date), 'Open']; }))
    };

    // ---- payments ----
    const ET = v => { const d = v ? new Date(v) : null; if (!d || isNaN(d)) return '—'; const h = (d.getUTCHours() + 20) % 24, mm = String(d.getUTCMinutes()).padStart(2, '0'); return (h % 12 || 12) + ':' + mm + (h < 12 ? ' AM' : ' PM'); };
    D.POSTED = R.posted.map(p => [p.status === 'posted' ? ET(p.posted_at) : cap(p.status), p.id, p.borrower, p.method === 'ach' ? 'ACH' : cap(p.method), p.amount, p.applied ? p.applied.split(', ').map(cap).join(', ') : cap(p.status), p.by]);
    D.POSTED_TOTAL = R.posted.reduce((s, p) => s + p.amount, 0);
    const EXA = { short_pay:'Apply', overpay:'Apply', nsf_return:'Reverse', unidentified_payer:'Match', duplicate:'Return', suspense_aging:'Apply' };
    D.EX = R.exq.map(x => [x.exception_id, (EXL[x.exception_type] || [cap(x.exception_type)])[0], (EXL[x.exception_type] || [0, 'outline'])[1], x.id || '—', x.borrower || (x.method ? cap(x.method) + ' · unmatched' : 'Unmatched'),
      x.description, x.amount || x.sched_total || 0, x.next_due ? fmtS(x.next_due) : '—', EXA[x.exception_type] || 'Apply', x.exception_type]);
    const bt = R.batches, items = bt.reduce((s, b) => s + b.item_count, 0);
    D.BATCH = { label: bt.map(b => ({ ach_file:'ACH', lockbox:'Lockbox', wire:'Wire' }[b.channel] || cap(b.channel))).join(' + ') + ' · ' + ASOF.replace(/-/g, '').slice(2),
      sub: bt.length ? 'Received ' + ET(bt[0].received_at) + ' · ' + bt.map(b => b.batch_reference).join(', ') : 'No batches today',
      receipts: items, total: bt.reduce((s, b) => s + b.total, 0), exceptions: R.exq.length, suspenseN: R.susp[0].n, suspenseAmt: R.susp[0].amt };

    // ---- escrow ----
    const taxS = {}, insS = {}; R.signals.forEach(s => { const L = byLoanId[s.loan_id]; if (!L) return; if (s.signal_type === 'tax_delinquent') taxS[L.id] = s; if (s.signal_type === 'insurance_lapsed') insS[L.id] = s; });
    const esc = R.escrow.map(e => ({ ...e, id: byLoanId[e.loan_id] && byLoanId[e.loan_id].id }));
    D.ESC_ACCT = esc[0] || null;
    const escLoans = new Set([...esc.map(e => e.id), ...Object.keys(taxS), ...Object.keys(insS)]);
    D.ESC_ROWS = [...escLoans].filter(Boolean).map(id => { const L = byId[id], e = esc.find(x => x.id === id), t = taxS[id], i = insS[id];
      const status = t ? ['Tax delinquent','destructive'] : i ? ['Insurance lapsed','destructive'] : ['OK','success'];
      return { id, borrower: L.borrower, upb: L.upb, escrowBal: e ? e.bal : null, dep: e ? e.dep : L.sched.e || null, ir: L.ir || null, irSub: L.ir ? Math.floor(L.ir / Math.max(L.sched.i, 1)) + ' mo of interest' : '',
        next: t ? 'Tax · delinquent' : i ? 'Insurance · lapsed' : e && e.taxes ? fmtS(e.taxes[0].due) + ' · Tax' : '—', nextAmt: e && e.taxes ? e.taxes[0].amt : null, status: status[0], bv: status[1],
        note: (t || i || {}).note || '' }; })
      .sort((a, b) => (a.bv === 'destructive' ? 0 : 1) - (b.bv === 'destructive' ? 0 : 1));
    const sigUpb = [...new Set([...Object.keys(taxS), ...Object.keys(insS)])].reduce((t, id) => t + byId[id].upb, 0);
    D.ESC_KPI = { sigUpb, irTotal: D.LOANS.reduce((s, L) => s + L.ir, 0), irLoans: D.LOANS.filter(L => L.ir > 0).length, escLoans: esc.length, escBal: esc.reduce((s, e) => s + e.bal, 0),
      tax: Object.keys(taxS).length, ins: Object.keys(insS).length };

    // ---- maturities and extensions ----
    const extByLoan = {}; R.ext.forEach(e => { extByLoan[e.id] = extByLoan[e.id] || e; });
    D.EXT = R.ext.map(e => ({ ...e, requestedF: fmt(e.requested_date), maturityF: fmt(e.current_maturity_date), pricedF: e.priced_date ? fmt(e.priced_date) : null }));
    const resOf = L => { const e = extByLoan[L.id];
      if (L.status === 'Matured') return e && e.status === 'approved' ? 'Extension approved' : 'Matured';
      if (e) return e.status === 'approved' ? 'Extension approved' : e.status === 'declined' ? 'Extension declined' : 'Extension';
      return (D.SIGNALS[L.id] || []).some(s => /Maturity/.test(s.type)) ? 'Notice sent' : 'No response'; };
    D.RES_OF = resOf; D.EXT_BY_LOAN = extByLoan;
    const mat = D.LOANS.filter(L => L.maturityD);
    D.WALL = Array.from({ length: 12 }, (_, i) => { const y = 2026 + Math.floor((9 + i) / 12), mo = (9 + i) % 12, key = y + '-' + String(mo + 1).padStart(2, '0');
      const ls = mat.filter(L => L.maturityD.slice(0, 7) === key && L.status !== 'Matured'), r = ls.map(resOf);
      return [MON[mo], ls.length, r.filter(x => x === 'Extension approved').length, r.filter(x => x === 'Extension').length]; });
    D.LADDER = [0, 1, 2].map(i => { const y = 2026, mo = 9 + i, key = y + '-' + String(mo + 1).padStart(2, '0');
      let ls = mat.filter(L => L.maturityD.slice(0, 7) === key);
      if (i === 0) ls = [...D.LOANS.filter(L => L.status === 'Matured'), ...ls];
      ls = ls.filter(L => L.status !== 'REO' && L.status !== 'Foreclosure');
      return [['October','November','December'][i] + ' 2026', ls.length, ls.map(L => [L.id, L.borrower, L.type, fmtS(L.maturityD), L.upb, resOf(L)])]; });
    const n90 = mat.filter(L => L.status === 'Matured' || (days(ASOF, L.maturityD) >= 0 && days(ASOF, L.maturityD) <= 90)).map(resOf);
    D.MAT_SUM = [['Extension approved', n90.filter(x => x === 'Extension approved').length, 'var(--primary)'], ['Extension in process', n90.filter(x => x === 'Extension').length, 'var(--secondary)'],
      ['No resolution', n90.filter(x => x === 'No response' || x === 'Notice sent' || x === 'Extension declined').length, 'var(--muted)'], ['Matured, unpaid', n90.filter(x => x === 'Matured').length, 'var(--destructive)']];

    // ---- remittance ----
    const exInv = group(R.exq.filter(x => x.investor), 'investor');
    D.REMIT = R.remit.filter(r => r.loans > 0).map(r => { const ex = exInv[r.name] || [], bs = r.investor_type === 'balance_sheet' || /balance sheet/i.test(r.name);
      return { name: r.name, sub: cap(r.investor_type) + (bs ? ' · retained' : ' · ' + (r.bps || 0) + ' bps servicing'), loans: r.loans, upb: r.upb, p: r.principal, i: r.interest, fee: bs ? 0 : r.fee,
        rec: ex.length ? ex.length + ' open exception' + (ex.length > 1 ? 's' : '') : 'Reconciled', bv: ex.length ? 'warning' : 'success',
        wire: bs ? 'Internal transfer · Oct ' + (r.remit_day || 15) : 'Wire Oct ' + (r.remit_day || 15) + (r.bank ? ' · ' + r.bank : '') + (r.last4 ? ' ····' + r.last4 : ''),
        ex: ex.map(x => [x.id, x.description, x.amount || 0, x.status === 'in_review' ? 'In review' : 'Open']) }; });

    D.loadMs = Math.round(performance.now() - t0);
    return D;
  }

  window.LimaHydrate = { load, fmt, fmtS, ASOF };
})();
