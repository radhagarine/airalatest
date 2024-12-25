'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = getSupabaseBrowserClient()

      // First handle the OAuth callback
      const { error: callbackError } = await supabase.auth.getSession()
      if (callbackError) {
        console.error('Auth callback error:', callbackError.message)
        router.push('/auth-error')
        return
      }

      // Then check session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        console.error('Session error:', sessionError.message)
        router.push('/auth-error')
        return
      }

      if (session) {
        router.push('/dashboard')
      } else {
        router.push('/signin')
      }
    }

    handleAuthCallback()
  }, [router])

  return null
}

