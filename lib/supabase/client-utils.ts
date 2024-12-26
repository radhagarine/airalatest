// lib/supabase/client-utils.ts
'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/types/database.types'
import { ENV } from '../config/env'

export const createClient = () => {
  return createBrowserClient<Database>(
    ENV.SUPABASE_URL,
    ENV.SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          if (typeof document === 'undefined') return ''
          
          const match = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${name}=`))
          return match ? match.split('=')[1] : ''
        },
        set(name: string, value: string, options: { path: string }) {
          if (typeof document === 'undefined') return
          
          document.cookie = `${name}=${value}; path=${options.path}; SameSite=Lax; Secure`
        },
        remove(name: string, options: { path: string }) {
          if (typeof document === 'undefined') return
          
          document.cookie = `${name}=; path=${options.path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
        },
      },
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    }
  )
}