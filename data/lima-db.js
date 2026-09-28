// In-browser servicing database (PGlite = Postgres compiled to WebAssembly).
// Loads the lima-cap pg_dump plus demo_views.sql, then exposes:
//   window.LimaDB.ready          -> Promise, resolves when the database is queryable
//   window.LimaDB.query(sql, p)  -> Promise<{ rows, fields }>
//   window.LimaDB.status         -> 'loading' | 'ready' | 'error'
//   window.LimaDB.onChange(fn)   -> called on every status change
// Rebuilding the dump: see data/README.md.
(function () {
  const PGLITE = 'https://cdn.jsdelivr.net/npm/@electric-sql/pglite@0.5.8/dist/index.js';
  const base = new URL('.', document.currentScript ? document.currentScript.src : location.href).href;
  const listeners = [];
  const api = { status: 'loading', error: null, loadMs: null, onChange: fn => { listeners.push(fn); fn(api.status); } };
  const set = (s, err) => { api.status = s; api.error = err || null; listeners.forEach(fn => { try { fn(s); } catch (e) {} }); };

  async function fetchText(name) {
    const res = await fetch(base + name);
    if (!res.ok) throw new Error(name + ': HTTP ' + res.status);
    const buf = new Uint8Array(await res.arrayBuffer());
    // Some hosts already decode .gz via Content-Encoding; only gunzip when the magic bytes are there.
    if (buf[0] === 0x1f && buf[1] === 0x8b) {
      const stream = new Blob([buf]).stream().pipeThrough(new DecompressionStream('gzip'));
      return await new Response(stream).text();
    }
    return new TextDecoder().decode(buf);
  }

  // Replay a plain-format pg_dump: SQL runs through exec(), each COPY ... FROM stdin block is fed as a blob.
  async function restore(db, dump) {
    const lines = dump.split('\n');
    let sql = [];
    const flush = async () => { const t = sql.join('\n').trim(); sql = []; if (t) await db.exec(t); };
    for (let i = 0; i < lines.length; i++) {
      const m = /^COPY (.+) FROM stdin;$/.exec(lines[i]);
      if (!m) { sql.push(lines[i]); continue; }
      await flush();
      let j = i + 1; while (j < lines.length && lines[j] !== '\\.') j++;
      const data = lines.slice(i + 1, j).join('\n');
      if (data) await db.query('COPY ' + m[1] + " FROM '/dev/blob'", [], { blob: new Blob([data + '\n']) });
      i = j;
    }
    await flush();
  }

  api.ready = (async () => {
    const t0 = performance.now();
    try {
      const [{ PGlite }, dump, views] = await Promise.all([import(PGLITE), fetchText('lima_cap.sql.gz'), fetchText('demo_views.sql')]);
      const db = await PGlite.create();
      await restore(db, dump);
      await db.exec("SELECT pg_catalog.set_config('search_path', 'public', false);");
      await db.exec(views);
      api.db = db;
      api.query = (sql, params) => db.query(sql, params || []);
      api.loadMs = Math.round(performance.now() - t0);
      set('ready');
      return api;
    } catch (e) {
      console.error('[LimaDB]', e);
      set('error', e);
      throw e;
    }
  })();
  api.query = async (sql, params) => { await api.ready; return api.db.query(sql, params || []); };
  window.LimaDB = api;
})();
