import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Database } from "@/lib/database.types"

type Business = Database['public']['Tables']['Business']['Row']

interface OverviewProps {
  business: Business | null
}

export function Overview({ business }: OverviewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Overview
        </h2>
        <Link href="/dashboard/profile">
          <Button>Edit Profile</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {/* Business Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent>
            {business ? (
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Business Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{business.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Industry Type</dt>
                  <dd className="mt-1 text-sm text-gray-900">{business.industry_type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{business.address}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Business Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{business.business_email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{business.phone_number}</dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm text-gray-500">No business information available. Please update your profile.</p>
            )}
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Welcome to your dashboard! This is where you'll find an overview of your reception services.
            </p>
          </CardContent>
        </Card>

        {/* Pending Tasks Card */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {!business && (
                <li className="flex items-center text-sm text-[#8B0000]">
                  • Update business information
                </li>
              )}
              <li className="flex items-center text-sm text-[#8B0000]">
                • Set up AI reception preferences
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

