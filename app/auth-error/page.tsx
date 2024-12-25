// app/auth-error/page.tsx
'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AuthErrorPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-6 max-w-md px-4">
        <h1 className="text-2xl font-semibold text-red-600">Authentication Error</h1>
        <p className="text-gray-600">There was a problem with your authentication. Please try signing in again.</p>
        <div className="space-x-4">
          <Button onClick={() => router.push('/signin')}>
            Back to Sign In
          </Button>
          <Button variant="outline" onClick={() => router.push('/')}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  )
}