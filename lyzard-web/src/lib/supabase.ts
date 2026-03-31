import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,    // keep session in localStorage automatically
    autoRefreshToken: true,  // silently refresh tokens before expiry
    detectSessionInUrl: true, // handle OAuth redirects
  },
});

export type SupabaseUser = Awaited<
  ReturnType<typeof supabase.auth.getUser>
>['data']['user'];
