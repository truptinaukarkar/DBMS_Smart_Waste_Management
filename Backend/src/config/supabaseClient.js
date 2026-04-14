import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://demo.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'demo_key';

export const isDemoSupabase =
  supabaseUrl === 'https://demo.supabase.co' || supabaseKey === 'demo_key';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase credentials must be configured');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;