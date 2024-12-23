"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { getSupabaseBrowserClient } from "@/lib/supabase-browser"
import { Database } from "@/lib/database.types"

type Business = Database['public']['Tables']['Business']['Row']

interface BusinessProfileFormProps {
  business: Business | null
}

export function BusinessProfileForm({ business }: BusinessProfileFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Omit<Business, 'id' | 'user_id' | 'created_at'>>({
    name: business?.name ?? "",
    industry_type: business?.industry_type ?? "",
    address: business?.address ?? "",
    business_email: business?.business_email ?? "",
    phone_number: business?.phone_number ?? "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const supabase = getSupabaseBrowserClient()

    try {
      const { error } = await supabase
        .from("Business")
        .upsert({ 
          ...formData, 
          id: business?.id ?? undefined, 
          user_id: business?.user_id ?? undefined 
        })

      if (error) throw error

      toast.success("Business profile updated successfully")
      router.refresh()
    } catch (error) {
      console.error("Error updating business profile:", error)
      toast.error("Failed to update business profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Business Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="industry_type">Industry Type</Label>
            <Input
              id="industry_type"
              name="industry_type"
              value={formData.industry_type}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="business_email">Business Email</Label>
            <Input
              id="business_email"
              name="business_email"
              type="email"
              value={formData.business_email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

