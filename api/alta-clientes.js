import { createHmac, timingSafeEqual } from 'node:crypto';
import { validateRegistration } from '../src/lib/clientRegistration.js';

const sign = (text, secret) => createHmac('sha256', secret).update(text).digest('hex');
const same = (a, b) => typeof a === 'string' && /^[a-f\d]{64}$/.test(a) && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  const secret = process.env.ALTA_CLIENTES_SECRET;
  const endpoint = process.env.ALTA_CLIENTES_WEBHOOK_URL;
  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }
  if (!secret || secret.length < 32 || !/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(endpoint || '')) return res.status(503).json({ ok: false, error: 'unavailable' });
  if (req.method === 'GET') {
    const timestamp = String(Date.now());
    const token = timestamp + '.' + sign('form:' + timestamp, secret);
    return res.status(200).json({ ok: true, token });
  }
  const origin = req.headers.origin;
  if (!origin || origin !== `https://${req.headers.host}` && !(process.env.NODE_ENV !== 'production' && origin === `http://${req.headers.host}`)) return res.status(403).json({ ok: false, error: 'invalid_origin' });
  if (!/^application\/json(?:;|$)/i.test(req.headers['content-type'] || '')) return res.status(415).json({ ok: false, error: 'invalid_content_type' });
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!body || Array.isArray(body) || Buffer.byteLength(JSON.stringify(body)) > 12000) return res.status(413).json({ ok: false, error: 'invalid_body' });
  } catch { return res.status(400).json({ ok: false, error: 'invalid_body' }); }
  const [issued, signature] = String(body.token || '').split('.');
  const age = Date.now() - Number(issued);
  if (!/^\d{13}$/.test(issued) || !same(signature, sign('form:' + issued, secret)) || age < 0 || age > 7200000) return res.status(403).json({ ok: false, error: 'expired_session' });
  if (body.website || !/^[a-f\d]{8}-(?:[a-f\d]{4}-){3}[a-f\d]{12}$/i.test(body.requestId || '')) return res.status(400).json({ ok: false, error: 'invalid_request' });
  const result = validateRegistration(body.data);
  if (!result.valid) return res.status(422).json({ ok: false, error: 'validation', errors: result.errors });
  const message = JSON.stringify({ requestId: body.requestId, data: result.data, timestamp: Date.now(), environment: process.env.VERCEL_ENV === 'production' ? 'production' : 'preview', clientKey: sign('ip:' + (req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'), secret) });
  try {
    const upstream = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, signature: sign(message, secret) }), signal: AbortSignal.timeout(25000), redirect: 'follow' });
    const payload = await upstream.json();
    if (!upstream.ok) throw new Error('upstream');
    if (payload.ok === true && /^[a-f\d-]{36}$/i.test(payload.registrationId || '')) return res.status(200).json({ ok: true, registrationId: payload.registrationId, duplicate: payload.duplicate === true });
    if (payload.error === 'idempotency_conflict') return res.status(409).json({ ok: false, error: payload.error });
    if (payload.error === 'rate_limit') {
      res.setHeader('Retry-After', '600');
      return res.status(429).json({ ok: false, error: 'rate_limit' });
    }
    throw new Error('unconfirmed');
  } catch {
    // No payloads, personal details, upstream URLs or signatures in logs/responses.
    return res.status(502).json({ ok: false, error: 'persistence_unconfirmed' });
  }
}
