'use client'

//import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardInitialPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Confirming you are in dashboard view...</h1>
        <p className="text-gray-600">Please wait while we complete the process.</p>
      </div>
    </div>
  )
}