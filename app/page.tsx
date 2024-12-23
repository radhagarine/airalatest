"use client"

import { useState } from "react"
import { Navbar } from "@/components/nav/navbar"
import { Hero } from "@/components/hero/hero"
import { Industries } from "@/components/industries/industries"
import { Features } from "@/components/features/features"
import { Testimonials } from "@/components/testimonials/testimonials"
import { Footer } from "@/components/footer/footer"
import { SignUpDialog } from "@/components/auth/signup-dialog"
import { SignInDialog } from "@/components/auth/signin-dialog"

export default function Home() {
  const [showSignUp, setShowSignUp] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  const handleOpenSignUp = () => {
    setShowSignUp(true)
    setShowSignIn(false)
  }

  const handleOpenSignIn = () => {
    setShowSignIn(true)
    setShowSignUp(false)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar onOpenSignUp={handleOpenSignUp} onOpenSignIn={handleOpenSignIn} />
      <div className="flex-grow">
        <Hero onOpenSignUp={handleOpenSignUp} />
        <Industries />
        <Features />
        <Testimonials />
      </div>
      <Footer />
      <SignUpDialog 
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSignInClick={handleOpenSignIn}
      />
      <SignInDialog 
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSignUpClick={handleOpenSignUp}
      />
    </main>
  )
}

