import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase-server"
import { Overview } from "@/components/dashboard/overview"
import { BusinessProfileForm } from "@/components/dashboard/business-profile-form"
import type { Database } from "@/lib/database.types"

export default async function DashboardPage() {
  const supabase = getSupabaseServerClient()
  
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession()

  if (sessionError) {
    console.error('Error fetching session:', sessionError)
    redirect("/")
  }

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

  if (!business) {
    return (
      <div>
        <h2 className="text-xl font-semibold">Create Your Business Profile</h2>
        <BusinessProfileForm business={null} />
      </div>
    )
  }

  return <Overview business={business as Database['public']['Tables']['Business']['Row'] | null} />
}

