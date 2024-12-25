// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.replace('/signin')
    }
    setIsLoading(false)
  }, [isAuthenticated, router, isLoading])

  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return null

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <p className="text-gray-600">Welcome to your dashboard</p>
      </div>
    </div>
  )
}