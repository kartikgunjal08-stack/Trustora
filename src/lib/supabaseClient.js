import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// इथे 'export' लावणे अत्यंत गरजेचे आहे
export const supabase = createClient(supabaseUrl, supabaseAnonKey);