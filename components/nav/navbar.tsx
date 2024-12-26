"use client"

import { BrandLogo } from "./brand-logo"
import { NavLinks } from "./nav-links"
import { AuthButtons } from "./auth-buttons"

interface NavbarProps {
  onOpenSignUp: () => void;
  onOpenSignIn: () => void;
}

export function Navbar({ onOpenSignUp, onOpenSignIn }: NavbarProps) {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 h-16">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <BrandLogo />
          <NavLinks />
          <AuthButtons onOpenSignIn={onOpenSignIn} onOpenSignUp={onOpenSignUp} />
        </div>
      </div>
    </header>
  )
}

