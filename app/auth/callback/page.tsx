'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-browser'

export default function AuthCallbackPage() {
 const router = useRouter()

 useEffect(() => {
   const handleAuthCallback = async () => {
     const { data: { session }, error } = await supabase.auth.getSession()
     
     if (error) {
       console.error('Authentication error:', error)
       router.push('/auth-error')
       return
     }

     if (session) {
       router.push('/dashboard')
     } else {
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