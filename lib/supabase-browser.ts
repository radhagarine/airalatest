import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'
import { supabaseConfig } from './supabase-config'

let supabase: ReturnType<typeof createBrowserClient<Database, 'public'>> | null = null

export const getSupabaseBrowserClient = () => {
  if (!supabase) {
    supabase = createBrowserClient<Database, 'public'>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        ...supabaseConfig,
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        },
        cookies: {
          get: (name: string) => {
            const cookies = document.cookie.split(';')
            for (const cookie of cookies) {
              const [key, value] = cookie.split('=')
              if (key.trim() === name) return value
            }
            return undefined
          },
          /*set: (name: string, value: string, options: any) => {
            document.cookie = `${name}=${value}; ${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('; ')}`
          },*/
          set: (name: string, value: string, options: any) => {
            document.cookie = `${name}=${encodeURIComponent(value)}; path=/; secure; samesite=lax; ${Object.entries({
              ...options,
              path: '/'
            }).map(([k, v]) => `${k}=${v}`).join('; ')}`
          },
          remove: (name: string, options: any) => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('; ')}`
          }
        }
      }
    )
  }
  return supabase
}

