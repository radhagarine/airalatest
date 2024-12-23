"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  const { logout } = useAuth()

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <h1 className="text-xl font-semibold">Overview</h1>
        <Button
          variant="ghost"
          onClick={() => logout()}
          className="text-[#8B0000] hover:text-[#8B0000]/90"
        >
          Logout
        </Button>
      </div>
    </header>
  )
}

