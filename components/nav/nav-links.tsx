"use client"

import Link from "next/link"
import { useNavigation } from "@/hooks/use-navigation"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/", label: "About" },
  { href: "/#features", label: "Services" },
  { href: "/", label: "Contact" },
]

export function NavLinks() {
  const { isActive } = useNavigation()

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-medium transition-colors duration-200 ease-in-out
                      ${item.href.startsWith('/#') 
                        ? 'text-gray-600 hover:text-[#8B0000]'
                        : isActive(item.href)
                          ? 'text-[#8B0000] font-semibold'
                          : 'text-gray-600 hover:text-[#8B0000]'}`}
          onClick={(e) => {
            if (item.href.startsWith('/#')) {
              e.preventDefault();
              const element = document.getElementById(item.href.substring(2));
              element?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
