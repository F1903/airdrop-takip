// 4. pages/api/save.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { image, name, priceSui, priceUsd } = req.body;
    const { error } = await supabase.from('nfts').insert([{ image, name, priceSui, priceUsd }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }
  res.status(405).end();
}