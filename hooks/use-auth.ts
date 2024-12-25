import { create } from 'zustand'
import { getSupabaseBrowserClient } from '@/lib/supabase-browser'
import type { User, Session } from '@supabase/supabase-js'
//import { useRouter } from 'next/navigation'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  session: Session | null
  login: (email: string, password: string) => Promise<{ error: Error | null, confirmationSent: boolean }>
  signUp: (email: string, password: string, avatar: File | null) => Promise<{ error: Error | null, confirmationSent: boolean }>
  logout: () => Promise<void>
  setUser: (user: User | null, session: Session | null) => void
}

export const useAuth = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  session: null,
  login: async (email: string, password: string) => {
    const supabase = getSupabaseBrowserClient()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        return { error, confirmationSent: false }
      }

      if(data.user && data.session) {
        set({
          isAuthenticated: true,
          user: data.user,
          session: data.session
        })
      }
      return { error: null, confirmationSent: true }
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Login failed'), confirmationSent: false }
    }
  },
  signUp: async (email: string, password: string, avatar: File | null) => {
    const supabase = getSupabaseBrowserClient()
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            avatar_url: null,
            full_name: email.split('@')[0] || 'User'
          }
        }
      })

      if (error) {
        if (error.status === 422 && error.message === 'User already registered') {
          return { error: new Error('This email is already registered. Please sign in or use a different email.'), confirmationSent: false }
        }
        throw error
      }

      if (data.user) {
        const confirmationSent = data.session === null && !data.user?.confirmed_at
        return { error: null, confirmationSent }
      }

      return { error: new Error('Sign up failed'), confirmationSent: false }
    } catch (error) {
      return { 
        error: error instanceof Error ? error : new Error('Sign up failed'), 
        confirmationSent: false 
      }
    }
  },
  logout: async () => {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    set({ isAuthenticated: false, user: null, session: null })
  },
  setUser: (user, session) => set({ 
    isAuthenticated: !!user, 
    user, 
    session 
  }),
}))

// Initialize auth state from Supabase session
getSupabaseBrowserClient().auth.getSession().then(({ data: { session } }) => {
  useAuth.getState().setUser(session?.user ?? null, session)
})

// Set up auth state change listener
getSupabaseBrowserClient().auth.onAuthStateChange((event, session) => {
  useAuth.getState().setUser(session?.user ?? null, session)
})

