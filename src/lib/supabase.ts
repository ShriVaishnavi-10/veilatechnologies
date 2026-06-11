import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const submitContactFormMock = async (data: { name: string; email: string; message: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { error: null, success: true };
};

export const submitNewsletterMock = async (email: string) => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { error: null, success: true };
};
