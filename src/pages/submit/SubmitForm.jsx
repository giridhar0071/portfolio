import React, { useEffect, useState } from 'react';

function getTokenFromLocation() {
  const params = new URLSearchParams(window.location.search);
  return params.get('token') || '';
}

function isValidHttpUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

const initialForm = { name: '', role: '', company: '', relationship: '', profile_url: '', quote: '' };

const SubmitForm = () => {
  const [token, setToken] = useState(getTokenFromLocation);
  const [tokenLoading, setTokenLoading] = useState(!getTokenFromLocation());
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');

  // No token in the URL (public "Leave a testimonial" button) — self-issue one.
  useEffect(() => {
    if (token) return;
    let cancelled = false;
    fetch('/api/testimonials/request', { method: 'POST' })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled && data.token) setToken(data.token);
      })
      .catch(() => {
        if (!cancelled) setServerError('Could not start a new submission — please try again.');
      })
      .finally(() => {
        if (!cancelled) setTokenLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Required';
    if (!form.role.trim()) errors.role = 'Required';
    if (!form.company.trim()) errors.company = 'Required';
    if (!form.relationship.trim()) errors.relationship = 'Required';
    if (!form.quote.trim()) errors.quote = 'Required';
    if (!form.profile_url.trim()) errors.profile_url = 'Required';
    else if (!isValidHttpUrl(form.profile_url.trim())) errors.profile_url = 'Must be a full link, e.g. https://linkedin.com/in/you';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!token) {
      setServerError("This link is missing its token — ask for a fresh one.");
      return;
    }
    if (!validate()) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ...form }),
      });

      if (res.status === 200) {
        setStatus('success');
        return;
      }
      if (res.status === 404) {
        setServerError("This link isn't valid. Ask for a fresh one.");
      } else if (res.status === 409) {
        setServerError('This link has already been used. Ask for a fresh one if you need to change something.');
      } else {
        const data = await res.json().catch(() => ({}));
        setServerError(data.details ? data.details.join(', ') : 'Something went wrong — please try again.');
      }
      setStatus('error');
    } catch {
      setServerError('Network error — please try again.');
      setStatus('error');
    }
  };

  if (!token && tokenLoading) {
    return (
      <Shell>
        <p className="text-ink-dim">Loading…</p>
      </Shell>
    );
  }

  if (!token) {
    return (
      <Shell>
        <p className="text-ink-dim">{serverError || 'Could not start a submission — please refresh and try again.'}</p>
      </Shell>
    );
  }

  if (status === 'success') {
    return (
      <Shell>
        <h1 className="text-2xl font-black text-ink mb-3">Thank you!</h1>
        <p className="text-ink-dim">Your testimonial is in for review. Once it's approved, it'll show up on the site with a link back to your profile.</p>
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="text-2xl font-black text-ink mb-2">Write a testimonial</h1>
      <p className="text-ink-dim mb-8">Takes a minute. Your name and a link to your profile go with it, so anyone can verify it's really you.</p>

      <form onSubmit={submit} className="space-y-5">
        <Field label="Your name" error={fieldErrors.name}>
          <input value={form.name} onChange={update('name')} className={inputClass} placeholder="Jane Doe" />
        </Field>
        <Field label="Role" error={fieldErrors.role}>
          <input value={form.role} onChange={update('role')} className={inputClass} placeholder="Engineering Manager" />
        </Field>
        <Field label="Company" error={fieldErrors.company}>
          <input value={form.company} onChange={update('company')} className={inputClass} placeholder="Acme Corp" />
        </Field>
        <Field label="How do you know Giridhar?" error={fieldErrors.relationship}>
          <input value={form.relationship} onChange={update('relationship')} className={inputClass} placeholder="Worked together at..." />
        </Field>
        <Field label="Link to your LinkedIn or GitHub profile" error={fieldErrors.profile_url}>
          <input value={form.profile_url} onChange={update('profile_url')} className={inputClass} placeholder="https://linkedin.com/in/you" />
        </Field>
        <Field label="Your testimonial" error={fieldErrors.quote}>
          <textarea value={form.quote} onChange={update('quote')} rows={5} className={inputClass} placeholder="What was it like working with Giridhar?" />
        </Field>

        {serverError && <p className="text-accent-2 text-sm">{serverError}</p>}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-accent text-white font-bold rounded-xl py-3 hover:bg-accent-2 transition-colors disabled:opacity-50"
        >
          {status === 'submitting' ? 'Sending…' : 'Submit'}
        </button>
      </form>
    </Shell>
  );
};

const inputClass = 'w-full bg-panel-2 border border-line rounded-lg px-4 py-2.5 text-ink placeholder:text-ink-dim/60 focus:outline-none focus:border-accent-2/50';

const Field = ({ label, error, children }) => (
  <label className="block">
    <span className="block text-sm text-ink-dim mb-1.5">{label}</span>
    {children}
    {error && <span className="block text-accent-2 text-xs mt-1">{error}</span>}
  </label>
);

const Shell = ({ children }) => (
  <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-16">
    <div className="w-full max-w-lg bg-panel border border-line rounded-3xl p-8">{children}</div>
  </div>
);

export default SubmitForm;
