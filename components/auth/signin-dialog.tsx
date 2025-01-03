"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AiraLogo } from "@/components/ui/aira-logo"
import { Mail, Lock } from 'lucide-react'
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from 'next/navigation'

interface SignInDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick: () => void;
}

export function SignInDialog({ isOpen, onClose, onSignUpClick }: SignInDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      onClose()
      // Use setTimeout to ensure dialog closes before navigation
      setTimeout(() => {
        router.replace('/dashboard/profile')
      }, 100)
    }
  }, [isAuthenticated, router, onClose])

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)

    try {
      console.log("Attempting to log in with:", email, password);
      const { error } = await login(email, password)
      if (error) throw error
      
      //router.push('/dashboard/profile')
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred. Please try again."
      console.error("Login failed:", message)
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
            <form onSubmit={onSubmit} className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 h-12 w-full rounded-full border border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 h-12 w-full rounded-full border border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#8B0000] hover:bg-[#8B0000]/90"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500">
              Forgot your password?{" "}
              <Link href="/forgot-password" className="text-[#8B0000] hover:underline">
                Reset it
              </Link>
            </p>
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <button onClick={onSignUpClick} className="text-[#8B0000] hover:underline" type="button">
                Create Account
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

