import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase-server"
import { BusinessProfileForm } from "@/components/dashboard/business-profile-form"
import { Database } from "@/lib/database.types"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

type Business = Database['public']['Tables']['Business']['Row']

export default async function BusinessProfilePage() {
  const supabase = getSupabaseServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  const result: PostgrestSingleResponse<Business> = await supabase
    .from("Business")
    .select("*")
    .eq('user_id', session.user.id)
    .single()

  if (result.error) {
    console.error('Error fetching business data:', result.error)
    return <div>Error loading business profile. Please try again later.</div>
  }

  const business: Business | null = result.data

  return <BusinessProfileForm business={business} />
}

