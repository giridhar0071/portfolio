import React, { useCallback, useEffect, useState } from 'react';

const SECRET_KEY = 'admin_secret';

function authHeader(secret) {
  return { Authorization: `Basic ${btoa(':' + secret)}` };
}

const AdminPanel = () => {
  const [secret, setSecret] = useState(() => sessionStorage.getItem(SECRET_KEY) || '');
  const [secretInput, setSecretInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState('');

  const authedFetch = useCallback(
    async (url, options = {}) => {
      const res = await fetch(url, {
        ...options,
        headers: { ...(options.headers || {}), ...authHeader(secret) },
      });
      if (res.status === 401) {
        sessionStorage.removeItem(SECRET_KEY);
        setSecret('');
        setLoginError('Wrong secret, or it changed.');
        throw new Error('unauthorized');
      }
      return res;
    },
    [secret]
  );

  const loadRows = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authedFetch('/api/admin/tokens');
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch {
      // authedFetch already handled the 401 case; anything else, leave rows as-is.
    } finally {
      setLoading(false);
    }
  }, [authedFetch]);

  useEffect(() => {
    if (secret) loadRows();
  }, [secret, loadRows]);

  const login = (e) => {
    e.preventDefault();
    if (!secretInput.trim()) return;
    sessionStorage.setItem(SECRET_KEY, secretInput.trim());
    setSecret(secretInput.trim());
    setSecretInput('');
    setLoginError('');
  };

  const issueToken = async () => {
    setBanner('');
    try {
      const res = await authedFetch('/api/admin/tokens', { method: 'POST' });
      const data = await res.json();
      const fullUrl = `${window.location.origin}${data.submit_url}`;
      setBanner(fullUrl);
      loadRows();
    } catch {
      // 401 already surfaced via authedFetch
    }
  };

  const act = async (id, action) => {
    try {
      await authedFetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      loadRows();
    } catch {
      // 401 already surfaced via authedFetch
    }
  };

  if (!secret) {
    return (
      <Shell>
        <h1 className="text-2xl font-black text-ink mb-6">Admin</h1>
        <form onSubmit={login} className="space-y-4">
          <input
            type="password"
            value={secretInput}
            onChange={(e) => setSecretInput(e.target.value)}
            placeholder="Admin secret"
            className={inputClass}
            autoFocus
          />
          {loginError && <p className="text-accent-2 text-sm">{loginError}</p>}
          <button type="submit" className="w-full bg-accent text-white font-bold rounded-xl py-2.5 hover:bg-accent-2 transition-colors">
            Enter
          </button>
        </form>
      </Shell>
    );
  }

  const pending = rows.filter((r) => r.status === 'pending');
  const others = rows.filter((r) => r.status !== 'pending');

  return (
    <Shell wide>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-ink">Testimonials admin</h1>
        <button onClick={issueToken} className="bg-accent text-white font-bold rounded-lg px-4 py-2 text-sm hover:bg-accent-2 transition-colors">
          + New link
        </button>
      </div>

      {banner && (
        <div className="bg-panel-2 border border-accent-2/30 rounded-xl p-4 mb-6 text-sm text-ink break-all">
          Send this link: <span className="text-accent-2">{banner}</span>
        </div>
      )}

      {loading && <p className="text-ink-dim">Loading…</p>}

      <Section title={`Pending review (${pending.length})`}>
        {pending.length === 0 && <p className="text-ink-dim text-sm">Nothing pending.</p>}
        {pending.map((r) => (
          <Row key={r.id} row={r}>
            <button onClick={() => act(r.id, 'approve')} className="text-xs font-bold text-accent-2 hover:underline">Approve</button>
            <button onClick={() => act(r.id, 'reject')} className="text-xs font-bold text-ink-dim hover:underline">Reject</button>
          </Row>
        ))}
      </Section>

      <Section title="Everything else">
        {others.map((r) => (
          <Row key={r.id} row={r}>
            {(r.status === 'rejected' || r.status === 'unused') && r.token && (
              <button onClick={() => act(r.id, 'reopen')} className="text-xs font-bold text-accent-2 hover:underline">Reopen link</button>
            )}
          </Row>
        ))}
      </Section>
    </Shell>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-sm font-bold uppercase tracking-widest text-ink-dim mb-4">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

const Row = ({ row, children }) => (
  <div className="bg-panel border border-line rounded-xl p-4 flex items-start justify-between gap-4">
    <div className="min-w-0">
      <div className="text-ink font-bold text-sm">
        {row.name || <span className="text-ink-dim italic">unused token</span>}
        {row.role ? ` · ${row.role}` : ''}
      </div>
      {row.quote && <p className="text-ink-dim text-sm mt-1 line-clamp-2">{row.quote}</p>}
      {row.profile_url && (
        <a href={row.profile_url} target="_blank" rel="noreferrer" className="text-accent-2 text-xs break-all">
          {row.profile_url}
        </a>
      )}
      <div className="text-ink-dim text-[11px] mt-1 uppercase tracking-wide">{row.status}</div>
    </div>
    <div className="flex flex-col gap-2 shrink-0">{children}</div>
  </div>
);

const inputClass = 'w-full bg-panel-2 border border-line rounded-lg px-4 py-2.5 text-ink placeholder:text-ink-dim/60 focus:outline-none focus:border-accent-2/50';

const Shell = ({ children, wide }) => (
  <div className="min-h-screen bg-[#0a0a0a] flex justify-center px-6 py-16">
    <div className={`w-full ${wide ? 'max-w-3xl' : 'max-w-sm'}`}>
      {wide ? children : <div className="bg-panel border border-line rounded-3xl p-8">{children}</div>}
    </div>
  </div>
);

export default AdminPanel;
