import { supabase } from './supabase-browser'
import type { AuthResponse } from '@/lib/types/database.types'

export const signOut = async (): Promise<AuthResponse> => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    return {
      user: null,
      session: null,
      error: null
    }
  } catch (error) {
    const typedError = error as Error
    console.error('Error signing out:', typedError)
    return {
      user: null,
      session: null,
      error: {
        message: typedError.message || 'Failed to sign out',
        status: (typedError as any).status || 500
      }
    }
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}