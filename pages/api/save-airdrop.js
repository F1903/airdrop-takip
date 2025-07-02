// 2. pages/api/save-airdrop.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const payload = req.body;
    // Özellikle tarih alanını text olarak göndermeye devam ediyoruz
    const formattedPayload = {
      ...payload,
      TGE_MAINNET_DATE: payload.TGE_MAINNET_DATE || ''
    };
    const { error } = await supabase.from('airdrop_takip').insert([formattedPayload]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }
  res.status(405).end();
}