# Servicing database (in-browser)

Every screen in `Loan Servicing.dc.html` reads from a real Postgres database running in the browser via [PGlite](https://pglite.dev) (Postgres compiled to WebAssembly, loaded from jsdelivr). No server is needed; the page stays static.

| File | What it is |
|---|---|
| `lima_cap.sql.gz` | Full `pg_dump` (schema + data) of the lima-cap servicing database: 1,428 loans, 482 individuals, 946 entities, payments, tasks, signals, loss analyses… |
| `demo_views.sql` | Views the page queries: `ui_loan` / `ui_loan_person` (screens) and `db_loans` / `db_borrowers` (Query Builder). |
| `lima-db.js` | Loader. Restores the dump + views on page load and exposes `window.LimaDB.query(sql, params)`. |
| `lima-hydrate.js` | Runs one batch of queries and shapes the results for each screen (`window.LimaHydrate.load`). |
| `portfolio.sql`, `entities.sql`, `relationship_data.sql` | Original generator seed files from lima-cap `schema/generator/` (reference only; already in the dump). |

## How the page uses it

- On load the page shows "Loading servicing database…" (about 2 s), then renders every screen from the database.
- If the database can't load (for example, the file is opened as `file://`), the page falls back to its built-in sample data and says so in a banner.
- As-of date is fixed at **Sep 25, 2026**, matching the lima-cap snapshot.

These actions write to the database, and every screen reloads from it afterwards:

| Action | Tables written |
|---|---|
| Payments → Post Payment | `payment`, `payment_application`, `loan` (next due date, balance); a short payment goes to `suspense_balance` and opens a `payment_exception` |
| Payments → Batch Exceptions → Apply / Match / Return / Reverse / Suspense | `payment_exception` |
| Collections → Log Call / Promise to Pay | `collection_activity` |
| Maturities → Extension Workflow → Send for Signature | `extension_request` (approved) |

Writes last until the page reloads; each visit starts from the same snapshot. Approving a loss scenario (freezing a baseline) is still session-only.

Where lima-cap has little or no data, the screens show what exists rather than inventing numbers:
- **Escrow:** only one escrow account exists, so the Escrow screen is driven by open tax-delinquency and insurance-lapse signals.
- **30+ DPD trend:** built from the payment tier-event history.

The Reporting screen's Query Builder also has live **Servicing DB** datasets and a **SQL Console** that runs any SQL against any table.

## Serving locally

```sh
python -m http.server 8765
# open http://127.0.0.1:8765/Loan%20Servicing.dc.html
```

## Rebuilding the dump

Source: <https://github.com/jcespinophx/lima-cap> (`schema/` DDL + `schema/generator/` data), loaded into the `lima-cap-db` Docker container.

```sh
docker exec lima-cap-db pg_dump -U limacap -d lima_cap_servicing --no-owner --no-privileges --no-comments \
  | grep -v -E '^\\(restrict|unrestrict) ' | gzip -9 > data/lima_cap.sql.gz
```

The `\restrict` / `\unrestrict` lines are psql meta-commands that newer `pg_dump` builds emit; the browser loader cannot run them.
