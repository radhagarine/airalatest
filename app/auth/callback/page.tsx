'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = getSupabaseBrowserClient()
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          throw error
        }
        if (session) {
          router.push('/dashboard/profile')
        } else {
          router.push('/signin')
        }
      } catch (error) {
        console.error('Error getting session:', error instanceof Error ? error.message : 'Unknown error')
        router.push('/auth-error')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Confirming your authentication...</h1>
        <p className="text-gray-600">Please wait while we complete the process.</p>
      </div>
    </div>
  )
}

