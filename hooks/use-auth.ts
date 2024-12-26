import { create } from 'zustand'
import { supabase } from '@/lib/supabase-browser'
import type { User, Session } from '@supabase/supabase-js'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  session: Session | null
  isLoading: boolean
  logout: () => Promise<void>
  setUser: (user: User | null, session: Session | null) => void
  refreshSession: () => Promise<void>
}

export const useAuth = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  session: null,
  isLoading: true,

  logout: async () => {
    try {
      await supabase.auth.signOut()
      set({ isAuthenticated: false, user: null, session: null })
    } catch (error) {
      console.error('Error during logout:', error)
    }
  },

  setUser: (user, session) => 
    set({
      isAuthenticated: !!user,
      user,
      session,
      isLoading: false
    }),

  refreshSession: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const { data: { user } } = await supabase.auth.getUser()
      
      set({
        isAuthenticated: !!user,
        user,
        session,
        isLoading: false
      })
    } catch (error) {
      console.error('Error refreshing session:', error)
      set({
        isAuthenticated: false,
        user: null,
        session: null,
        isLoading: false
      })
    }
  }
}))
