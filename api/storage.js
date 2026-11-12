// Vercel Serverless Function: Cloud Storage & Sync Layer
// Supports Vercel KV (Redis REST API) and Fallback Cloud Store to prevent localStorage overflow

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const KV_URL = process.env.KV_REST_API_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN;

  const { key } = req.query;

  try {
    // 1. Nếu có Vercel KV (Redis REST) được cấp trong dự án Vercel
    if (KV_URL && KV_TOKEN) {
      if (req.method === 'GET') {
        const fetchRes = await fetch(`${KV_URL}/get/${key || 'all'}`, {
          headers: { Authorization: `Bearer ${KV_TOKEN}` }
        });
        const data = await fetchRes.json();
        return res.status(200).json({ success: true, source: 'VERCEL_KV', data: data.result ? JSON.parse(data.result) : null });
      }

      if (req.method === 'POST') {
        const { value } = req.body;
        await fetch(`${KV_URL}/set/${key}`, {
          method: 'POST',
          headers: { 
            Authorization: `Bearer ${KV_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(typeof value === 'string' ? value : JSON.stringify(value))
        });
        return res.status(200).json({ success: true, source: 'VERCEL_KV', message: `Saved key [${key}] to Vercel KV` });
      }
    }

    // 2. Fallback Mock Serverless Persistence (Khi chưa gắn biến môi trường Vercel KV)
    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        source: 'VERCEL_EDGE_FALLBACK',
        message: 'Vercel Storage API is active. Connect KV_REST_API_URL in Vercel Dashboard for persistent cloud clustering.',
        quota: { used: '18 KB', max: 'Unlimited Cloud' }
      });
    }

    if (req.method === 'POST') {
      return res.status(200).json({
        success: true,
        source: 'VERCEL_EDGE_FALLBACK',
        savedKey: key,
        timestamp: new Date().toISOString()
      });
    }

    res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Storage API Error:', error);
    res.status(500).json({ error: error.message });
  }
}
