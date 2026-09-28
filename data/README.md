# Servicing database (in-browser)

The demo page runs a real Postgres database in the browser via [PGlite](https://pglite.dev) (Postgres compiled to WebAssembly, loaded from jsdelivr). No server is needed; the page stays static.

| File | What it is |
|---|---|
| `lima_cap.sql.gz` | Full `pg_dump` (schema + data) of the lima-cap servicing database: 1,428 loans, 482 individuals, 946 entities, tasks, signals, watchlist, payments… |
| `demo_views.sql` | Flat views the page queries: `db_loans`, `db_borrowers`. Column names match the Query Builder field keys. |
| `lima-db.js` | Loader. Restores the dump + views on page load and exposes `window.LimaDB.query(sql, params)`. |
| `portfolio.sql`, `entities.sql`, `relationship_data.sql` | Original generator seed files copied from lima-cap `schema/generator/` (reference only; already included in the dump). |

## Where it shows up

Reporting → Query Builder:
- Datasets **Servicing DB · Loans** and **Servicing DB · Borrowers** run the builder's filters, grouping and sorting as real SQL.
- Saved reports prefixed **Live DB ·** open those datasets.
- **SQL Console** (shown on the live datasets) runs any SQL against any table. Writes persist until the page reloads.

The page has to be served over HTTP (e.g. `python -m http.server`), not opened as `file://`, because the loader fetches the data files.

## Rebuilding the dump

Source: <https://github.com/jcespinophx/lima-cap> (`schema/` DDL + `schema/generator/` data), loaded into the `lima-cap-db` Docker container.

```sh
docker exec lima-cap-db pg_dump -U limacap -d lima_cap_servicing --no-owner --no-privileges --no-comments \
  | grep -v -E '^\\(restrict|unrestrict) ' | gzip -9 > data/lima_cap.sql.gz
```

The `\restrict` / `\unrestrict` lines are psql meta-commands that newer `pg_dump` builds emit; the browser loader cannot run them.
