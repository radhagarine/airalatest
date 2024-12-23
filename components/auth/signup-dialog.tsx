"use client"

import * as React from "react"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AiraLogo } from "@/components/ui/aira-logo"
import { Upload, Mail, Lock, AlertCircle } from 'lucide-react'
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SignUpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInClick: () => void;
}

export function SignUpDialog({ isOpen, onClose, onSignInClick }: SignUpDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { signUp } = useAuth()

async function onSubmit(event: React.FormEvent) {
  event.preventDefault()
  setIsLoading(true)

  try {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match")
    }

    const { error, confirmationSent } = await signUp(email, password, avatar)
    if (error) throw error

    if (confirmationSent) {
      setShowConfirmation(true)
      toast.success("Please check your email to confirm your account")
    } else {
      toast.success("Successfully signed up!")
      onClose()
    }
  } catch (error) {
    console.error("Sign up error:", error)
    toast.error(error instanceof Error ? error.message : "Failed to sign up")
  } finally {
    setIsLoading(false)
  }
}

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setAvatar(event.target.files[0])
    }
  }

  if (showConfirmation) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center space-y-6 py-6">
            <AiraLogo />
            <h2 className="text-2xl font-semibold">Check Your Email</h2>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                We've sent a confirmation link to <strong>{email}</strong>. 
                Please check your email and click the link to complete your registration.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={onClose}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto border-[#8B0000] bg-white/95 backdrop-blur-md blurred-border rounded-xl p-6">
        <div className="flex flex-col items-center space-y-6 py-6 px-4">
          <AiraLogo />
          <h2 className="text-2xl font-semibold tracking-tight">Create Account</h2>
          
          <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center group cursor-pointer hover:bg-gray-200 transition-colors">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Upload className="w-8 h-8 text-gray-400 group-hover:text-gray-500" />
          </div>
          <span className="text-sm text-gray-500">Upload profile picture</span>

          <form onSubmit={onSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  placeholder="Create a password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  className="pl-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <label
                htmlFor="terms"
                className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-[#8B0000] hover:underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#8B0000] hover:bg-[#8B0000]/90"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button onClick={onSignInClick} className="text-[#8B0000] hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

