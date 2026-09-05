import { validateSubmission, jsonResponse } from '../../_shared/testimonial.js';

// GET /api/testimonials?status=approved — public, only approved rows, cached at the edge.
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const status = url.searchParams.get('status');

  if (status !== 'approved') {
    return jsonResponse({ error: 'status must be "approved"' }, { status: 400 });
  }

  const { results } = await env.DB.prepare(
    `SELECT name, role, company, relationship, profile_url, quote
     FROM testimonials WHERE status = 'approved' ORDER BY decided_at DESC`
  ).all();

  return jsonResponse(results ?? [], {
    headers: { 'Cache-Control': 'public, max-age=300' },
  });
}

// POST /api/testimonials — public, requires a valid unused token issued by the admin.
export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid JSON' }, { status: 400 });
  }

  const { token } = body || {};
  if (!token || typeof token !== 'string') {
    return jsonResponse({ error: 'missing token' }, { status: 400 });
  }

  const { valid, errors } = validateSubmission(body);
  if (!valid) {
    return jsonResponse({ error: 'validation failed', details: errors }, { status: 400 });
  }

  const existing = await env.DB.prepare('SELECT status FROM testimonials WHERE token = ?')
    .bind(token)
    .first();

  if (!existing) {
    return jsonResponse({ error: 'unknown token' }, { status: 404 });
  }
  if (existing.status !== 'unused') {
    return jsonResponse({ error: 'already submitted' }, { status: 409 });
  }

  const { name, role, company, relationship, profile_url, quote } = body;
  await env.DB.prepare(
    `UPDATE testimonials
     SET name = ?, role = ?, company = ?, relationship = ?, profile_url = ?, quote = ?,
         status = 'pending', submitted_at = datetime('now')
     WHERE token = ?`
  )
    .bind(name, role, company ?? null, relationship ?? null, profile_url, quote, token)
    .run();

  return jsonResponse({ ok: true }, { status: 200 });
}
