'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase-browser'
import { useAuth } from '@/hooks/use-auth'
import { RealtimeChannel } from '@supabase/supabase-js'

export function useSupabaseAuth() {
  const { setUser, refreshSession } = useAuth()

  useEffect(() => {
    // Initial session check
    refreshSession()

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          const { data: { user } } = await supabase.auth.getUser()
          setUser(user, session)
        } else if (event === 'SIGNED_OUT') {
          setUser(null, null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, refreshSession])

  return useAuth()
}

// Fixed realtime subscription hook
export function useSupabaseSubscription<T>(
  table: string,
  event: 'INSERT' | 'UPDATE' | 'DELETE',
  callback: (payload: T) => void
) {
  useEffect(() => {
    let channel: RealtimeChannel | null = null

    const setupSubscription = async () => {
      // Create channel with table name
      channel = supabase.channel(`public:${table}`)

      // Set up subscription
      channel
        .on(
          'system',
          {
            event: event as 'INSERT' | 'UPDATE' | 'DELETE',
            schema: 'public',
            table: table,
          },
          (payload: { new: T }) => callback(payload.new)
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('Subscribed to', table)
          }
        })
    }

    setupSubscription()

    // Cleanup
    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [table, event, callback])
}