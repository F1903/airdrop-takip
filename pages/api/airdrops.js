// 1. pages/api/airdrops.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  const { data, error } = await supabase.from('airdrop_takip').select('*');
  if (error) return res.status(500).json([]);
  res.status(200).json(Array.isArray(data) ? data : []);
}