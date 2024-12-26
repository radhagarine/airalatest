"use client"

import * as React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AiraLogo } from "@/components/ui/aira-logo"
import { signInWithGoogle } from "@/lib/supabase-browser"

interface SignInDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick: () => void;
  onSignInClick: () => void;
}

export function SignInDialog({ isOpen, onClose }: SignInDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const { error } = await signInWithGoogle()
      if (error) throw error
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred. Please try again."
      console.error("Google Sign In failed:", message)
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto border-[#8B0000] bg-white/95 backdrop-blur-md blurred-border rounded-xl p-6"
        aria-describedby="signin-dialog-description"
      >
        <DialogHeader>
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogDescription id="dialog-description">
            Sign in to your account to continue
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          <AiraLogo />
          <div role="alert" aria-live="polite">
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
          </div>

          <div className="w-full space-y-6">
            <Button
              onClick={handleGoogleSignIn}
              className="w-full bg-[#8B0000] hover:bg-[#8B0000]/90"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In with Google"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}