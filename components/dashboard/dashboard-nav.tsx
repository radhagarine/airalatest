"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AiraLogo } from "@/components/ui/aira-logo"
import { LayoutDashboard, Building2, BarChart3, Calendar, Settings, UserCircle } from 'lucide-react'

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Business",
    href: "/dashboard/business",
    icon: Building2,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UserCircle,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="flex w-64 flex-col border-r bg-white">
      <div className="p-6">
        <AiraLogo />
      </div>
      <nav className="flex-1 space-y-1 px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-50 hover:text-[#8B0000]",
                pathname === item.href
                  ? "bg-gray-50 text-[#8B0000]"
                  : "text-gray-700"
              )}
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

