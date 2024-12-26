'use client'

import { useSupabaseAuth } from '@/lib/supabase/hooks'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useSupabaseAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return children
}