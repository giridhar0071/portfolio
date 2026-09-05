import { requireAdminAuth, unauthorizedResponse, jsonResponse } from '../../_shared/testimonial.js';

const ACTIONS = ['approve', 'reject', 'reopen'];

// PATCH /api/testimonials/:id — admin only. Approve/reject a pending submission,
// or reopen a used/rejected token so the same recommender link works again.
export async function onRequestPatch({ request, env, params }) {
  if (!(await requireAdminAuth(request, env))) return unauthorizedResponse();

  const id = params.id;
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid JSON' }, { status: 400 });
  }

  const { action } = body || {};
  if (!ACTIONS.includes(action)) {
    return jsonResponse({ error: `action must be one of ${ACTIONS.join(', ')}` }, { status: 400 });
  }

  const existing = await env.DB.prepare('SELECT id FROM testimonials WHERE id = ?').bind(id).first();
  if (!existing) {
    return jsonResponse({ error: 'not found' }, { status: 404 });
  }

  if (action === 'approve') {
    await env.DB.prepare(
      `UPDATE testimonials SET status = 'approved', decided_at = datetime('now') WHERE id = ?`
    ).bind(id).run();
  } else if (action === 'reject') {
    await env.DB.prepare(
      `UPDATE testimonials SET status = 'rejected', decided_at = datetime('now') WHERE id = ?`
    ).bind(id).run();
  } else {
    // reopen: same token, blank slate, back to submittable.
    await env.DB.prepare(
      `UPDATE testimonials
       SET status = 'unused', name = NULL, role = NULL, company = NULL, relationship = NULL,
           profile_url = NULL, quote = NULL, submitted_at = NULL, decided_at = NULL
       WHERE id = ?`
    ).bind(id).run();
  }

  return jsonResponse({ ok: true });
}
