import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase-server"
import { Overview } from "@/components/dashboard/overview"
import type { Database } from "@/lib/database.types"

export default async function DashboardPage() {
  const supabase = getSupabaseServerClient()
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  const { data: business, error } = await supabase
    .from("Business")
    .select("*")
    .eq('user_id', session.user.id)
    .single()

  if (error) {
    console.error('Error fetching business data:', error)
  }

  return <Overview business={business as Database['public']['Tables']['Business']['Row'] | null} />
}

