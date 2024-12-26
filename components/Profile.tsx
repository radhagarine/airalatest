'use client'

import { useAuth } from '@/hooks/use-auth'

export function Profile() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}