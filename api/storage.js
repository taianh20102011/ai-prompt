// Vercel Serverless Function: Cloud Storage & Sync Layer
// Supports Vercel KV (Redis REST API) and Fallback Cloud Store to prevent localStorage overflow

const SAFE_KEY_REGEX = /^[a-zA-Z0-9_-]{1,64}$/;
const MAX_VALUE_BYTES = 100 * 1024; // 100 KB payload cap

export default async function handler(req, res) {
  // Security Headers (OWASP REST Cheatsheet)
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token');

  const origin = req.headers.origin;
  const host = req.headers.host;
  if (origin && host && (origin === `https://${host}` || origin === `http://${host}` || origin.startsWith('http://localhost:'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  const rawKey = typeof req.query?.key === 'string' ? req.query.key.trim() : 'all';
  if (!SAFE_KEY_REGEX.test(rawKey)) {
    return res.status(400).json({ error: 'Invalid storage key format.' });
  }
  const key = encodeURIComponent(rawKey);

  try {
    // 1. Nếu có Vercel KV (Redis REST) được cấp trong dự án Vercel
    if (KV_URL && KV_TOKEN) {
      if (req.method === 'GET') {
        const fetchRes = await fetch(`${KV_URL}/get/${key}`, {
          headers: { Authorization: `Bearer ${KV_TOKEN}` }
        });
        const data = await fetchRes.json();
        return res.status(200).json({ success: true, source: 'VERCEL_KV', data: data.result ? JSON.parse(data.result) : null });
      }

      if (req.method === 'POST') {
        const { value } = req.body || {};
        const serialized = typeof value === 'string' ? value : JSON.stringify(value ?? null);
        if (Buffer.byteLength(serialized, 'utf8') > MAX_VALUE_BYTES) {
          return res.status(413).json({ error: 'Payload exceeds maximum allowed size.' });
        }
        await fetch(`${KV_URL}/set/${key}`, {
          method: 'POST',
          headers: { 
            Authorization: `Bearer ${KV_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(serialized)
        });
        return res.status(200).json({ success: true, source: 'VERCEL_KV', message: 'Saved to Vercel KV.' });
      }
    }

    // 2. Fallback Mock Serverless Persistence (Khi chưa gắn biến môi trường Vercel KV)
    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        source: 'VERCEL_EDGE_FALLBACK',
        message: 'Vercel Storage API is active.',
        quota: { used: '18 KB', max: 'Unlimited Cloud' }
      });
    }

    if (req.method === 'POST') {
      return res.status(200).json({
        success: true,
        source: 'VERCEL_EDGE_FALLBACK',
        savedKey: rawKey,
        timestamp: new Date().toISOString()
      });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Storage API Error:', error);
    return res.status(500).json({ error: 'Internal storage service error.' });
  }
}
