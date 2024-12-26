"use client"

import { useState } from "react"
import { Navbar } from "@/components/nav/navbar"
import { Hero } from "@/components/hero/hero"
import InteractiveHub from "@/components/industries/industry-hub"
import FAQS from "@/components/faqs/faqs"
import { Features } from "@/components/features/features"
import { Footer } from "@/components/footer/footer"
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
      <div>
        <Navbar onOpenSignUp={handleOpenSignUp} onOpenSignIn={handleOpenSignIn} />
      </div>
      <div className="flex-grow flex flex-col justify-center items-center pt-20">
        <Hero onOpenSignUp={handleOpenSignUp} />
        <div className="my-8">
          <InteractiveHub />
        </div>
        <Features />
        <FAQS />
      </div>
      <Footer />
      <SignInDialog 
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSignInClick={handleOpenSignIn}
        onSignUpClick={handleOpenSignUp}
      />
    </main>
  )
}

