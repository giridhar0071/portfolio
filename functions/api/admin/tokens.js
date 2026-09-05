import { requireAdminAuth, unauthorizedResponse, jsonResponse } from '../../_shared/testimonial.js';

// GET /api/admin/tokens — admin only. Full list, every status, for the review queue.
export async function onRequestGet({ request, env }) {
  if (!(await requireAdminAuth(request, env))) return unauthorizedResponse();

  const { results } = await env.DB.prepare(
    `SELECT id, token, name, role, company, relationship, profile_url, quote,
            status, submitted_at, decided_at, created_at
     FROM testimonials ORDER BY created_at DESC`
  ).all();

  return jsonResponse(results ?? []);
}

// POST /api/admin/tokens — admin only. Mint a fresh single-use token/link to send
// to a recommender.
export async function onRequestPost({ request, env }) {
  if (!(await requireAdminAuth(request, env))) return unauthorizedResponse();

  const token = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO testimonials (token, status, created_at) VALUES (?, 'unused', datetime('now'))`
  ).bind(token).run();

  return jsonResponse({ token, submit_url: `/submit?token=${token}` }, { status: 201 });
}
