'use client'

import { supabase } from './supabase-browser'

let listenerInitialized = false

export function setupAuthListener() {
  if (listenerInitialized) return

  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    // Get current path
    const currentPath = window.location.pathname

    if (event === 'SIGNED_IN' && session) {
      // Only redirect to dashboard if not already there
      if (!currentPath.startsWith('/dashboard')) {
        window.location.href = '/dashboard/profile'
      }
    } else if (event === 'SIGNED_OUT') {
      // Only redirect to home if not already there
      if (currentPath !== '/') {
        window.location.href = '/'
      }
    }
  })

  listenerInitialized = true

  return () => {
    subscription.unsubscribe()
  }
}