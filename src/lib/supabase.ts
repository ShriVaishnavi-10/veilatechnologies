import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Defensive check to avoid crashing the build or application if env variables are not present.
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock interface for when Supabase is not configured yet
export const submitContactFormMock = async (data: { name: string; email: string; message: string }) => {
  console.log('[Veila Tech mock] Submitting contact form:', data);
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { error: null, success: true };
};

export const submitNewsletterMock = async (email: string) => {
  console.log('[Veila Tech mock] Newsletter subscription for:', email);
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { error: null, success: true };
};
