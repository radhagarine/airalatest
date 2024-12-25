"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { UserMenu } from "./user-menu"

interface AuthButtonsProps {
  onOpenSignUp: () => void;
  onOpenSignIn: () => void;
}

export function AuthButtons({ onOpenSignUp, onOpenSignIn }: AuthButtonsProps) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <UserMenu />
  }

  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant="ghost" 
        className="hidden sm:inline-flex border-2 border-[#8B0000]"
        onClick={onOpenSignIn}
      >
        Log in
      </Button>
      <Button 
        onClick={onOpenSignUp}
        className="bg-[#8B0000] hover:bg-[#8B0000]/90 text-white transition-all duration-300 
                  hover:scale-105 active:scale-98"
      >
        Sign up
      </Button>
    </div>
  )
}

