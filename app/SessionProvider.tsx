'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase-browser'

const SessionContext = createContext<Session | null>(null)

export const useSession = () => useContext(SessionContext)

export function SessionProvider({ 
 children,
 session: initialSession
}: { 
 children: React.ReactNode
 session: Session | null
}) {
 const [session, setSession] = useState<Session | null>(initialSession)

 useEffect(() => {
   const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
     setSession(session)
   })

   return () => {
     subscription.unsubscribe()
   }
 }, [])

 return (
   <SessionContext.Provider value={session}>
     {children}
   </SessionContext.Provider>
 )
}