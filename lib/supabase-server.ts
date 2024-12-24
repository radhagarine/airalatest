import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './database.types'

export const getSupabaseServerClient = () => {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: any) => {
          cookieStore.set({ name, value, ...options })
        },
        remove: (name: string, options: any) => {
          cookieStore.set({ name, value: '', ...options })
        },
      },
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    }
  )
}
