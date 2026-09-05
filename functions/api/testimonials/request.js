import { jsonResponse } from '../../_shared/testimonial.js';

// POST /api/testimonials/request — public, no auth. Self-serve token issuance
// for the public "Leave a testimonial" button. Same single-use token model as
// admin-issued links: one row, status starts 'unused', consumed on first submit.
export async function onRequestPost({ env }) {
  const token = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO testimonials (token, status, created_at) VALUES (?, 'unused', datetime('now'))`
  ).bind(token).run();

  return jsonResponse({ token }, { status: 201 });
}
