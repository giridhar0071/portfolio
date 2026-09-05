export function isValidProfileUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateSubmission(body) {
  const errors = [];
  if (!body || typeof body !== 'object') return { valid: false, errors: ['invalid body'] };

  const { name, role, company, relationship, profile_url, quote } = body;
  if (!name || typeof name !== 'string' || !name.trim()) errors.push('name is required');
  if (!role || typeof role !== 'string' || !role.trim()) errors.push('role is required');
  if (!company || typeof company !== 'string' || !company.trim()) errors.push('company is required');
  if (!relationship || typeof relationship !== 'string' || !relationship.trim()) errors.push('relationship is required');
  if (!quote || typeof quote !== 'string' || !quote.trim()) errors.push('quote is required');
  if (!profile_url || typeof profile_url !== 'string' || !isValidProfileUrl(profile_url)) {
    errors.push('profile_url must be a valid http(s) URL');
  }

  return { valid: errors.length === 0, errors };
}

// Single-owner Basic Auth: username is ignored, only the password is checked
// against the ADMIN_SECRET Pages environment variable.
export async function requireAdminAuth(request, env) {
  const auth = request.headers.get('Authorization') || '';
  if (!auth.startsWith('Basic ')) return false;
  if (!env.ADMIN_SECRET) return false;

  let decoded;
  try {
    decoded = atob(auth.slice(6));
  } catch {
    return false;
  }
  const sepIndex = decoded.indexOf(':');
  const password = sepIndex === -1 ? decoded : decoded.slice(sepIndex + 1);
  return password === env.ADMIN_SECRET;
}

export function unauthorizedResponse() {
  return new Response(JSON.stringify({ error: 'unauthorized' }), {
    status: 401,
    headers: {
      'Content-Type': 'application/json',
      'WWW-Authenticate': 'Basic realm="admin"',
    },
  });
}

export function jsonResponse(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
}
