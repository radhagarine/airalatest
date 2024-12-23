import { SupabaseClientOptions } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabaseConfig: SupabaseClientOptions<'public'> = {
  auth: {
    autoRefreshToken: true,
    persistSession: false,
    detectSessionInUrl: true
  }
}

// Only add the realtime config if we're in a Node.js environment
if (typeof window === 'undefined') {
  supabaseConfig.realtime = {
    params: {
      eventsPerSecond: 10
    }
  }
}

