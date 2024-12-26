"use client"

import React from 'react';
import { Button } from "@/components/ui/button"
import { signInWithGoogle } from "@/lib/supabase-browser"

interface AuthButtonsProps {
  onOpenSignUp: () => void;
  onOpenSignIn: () => void;
}

export function AuthButtons({ onOpenSignUp, onOpenSignIn }: AuthButtonsProps) {
 const handleGoogleSignIn = async () => {
   const { error } = await signInWithGoogle()
   if (error) {
     console.error('Google Sign In Error:', error)
   }
 }

 return (
   <div className="flex items-center space-x-4">
     <Button 
       onClick={handleGoogleSignIn}
       className="bg-[#8B0000] hover:bg-[#8B0000]/90 text-white transition-all duration-300 
                 hover:scale-105 active:scale-98"
     >
       Sign Up/Sign In
     </Button>
   </div>
 )
}