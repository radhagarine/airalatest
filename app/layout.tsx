// app/layout.tsx
'use client'

import { useEffect } from 'react'
import { setupAuthListener } from '@/lib/auth-listener'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const cleanupListener = setupAuthListener()
    return () => {
      if (cleanupListener) {
        cleanupListener()
      }
    }
  }, [])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}