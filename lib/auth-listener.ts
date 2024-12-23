import { getSupabaseBrowserClient } from './supabase-browser'

let listenerInitialized = false

export function setupAuthListener() {
  if (listenerInitialized) return

  const supabase = getSupabaseBrowserClient()

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      window.location.href = '/dashboard'
    } else if (event === 'SIGNED_OUT') {
      window.location.href = '/'
    }
  })

  listenerInitialized = true
}

