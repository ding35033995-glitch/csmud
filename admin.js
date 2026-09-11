function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.end(JSON.stringify(body));
}

module.exports = async (req, res) => {
  if (req.method !== 'GET') return json(res, 405, { error: 'Method Not Allowed' });

  const password = req.headers['x-admin-password'];
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return json(res, 401, { error: '未授權' });
  }

  const base = String(process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) return json(res, 500, { error: '尚未完成雲端資料庫設定' });

  try {
    const response = await fetch(`${base}/rest/v1/rpc/admin_snapshot`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: '{}'
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      console.error('Supabase admin error:', data);
      return json(res, 500, { error: '無法讀取資料' });
    }
    return json(res, 200, data);
  } catch (error) {
    console.error('Admin error:', error);
    return json(res, 500, { error: '無法讀取資料' });
  }
};
