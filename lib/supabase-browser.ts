'use client'  // Add this at the top

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/types/database.types'
import { ENV } from './config/env'

type AuthResponse = {
  error: {
    message: string;
    status: number;
  } | null;
}

export const supabase = createBrowserClient<Database>(
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
      set(name: string, value: string, options: { path: string; maxAge?: number }) {
        if (typeof document === 'undefined') return
        
        let cookie = `${name}=${value}; path=${options.path}; SameSite=Lax; Secure`
        if (options.maxAge) {
          cookie += `; Max-Age=${options.maxAge}`
        }
        document.cookie = cookie
      },
      remove(name: string, options: { path: string }) {
        if (typeof document === 'undefined') return
        
        document.cookie = `${name}=; path=${options.path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      }
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    }
  }
)

export const signInWithGoogle = async (): Promise<AuthResponse> => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${ENV.APP_URL}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
    
    if (error) throw error
    
    return {
      error: null
    }
  } catch (error: any) {
    console.error('Error signing in with Google:', error)
    return {
      error: {
        message: error.message || 'Failed to sign in with Google',
        status: error.status || 500
      }
    }
  }
}