"use client"

import { useState } from "react"
import { Mic } from 'lucide-react'
import { IndustryItem } from "./industry-item"
import { AudioPlayer } from "./audio-player"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const MicrophoneCircle = () => (
  <>
    {/* Background Circle */}
    <div className="absolute inset-[10%] border-4 border-[#8B0000]/25 rounded-full" />
    {/* Center Microphone */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
        w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#8B0000] 
        flex items-center justify-center
        ring-4 sm:ring-8 ring-[#8B0000]/10
        z-10 overflow-visible">
      <div className="absolute inset-[-45%] animate-pulse-circles bg-[#8B0000]/30 rounded-full" />
      <div className="absolute inset-[-45%] animate-pulse-circles-delayed bg-[#8B0000]/20 rounded-full" />
      <div className="relative z-20 animate-pulse-mic">
        <Mic className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
      </div>
    </div>
    {/* Aira Logo */}
    <div className={`absolute left-1/2 -translate-x-1/2 top-[calc(50%+60px)] sm:top-[calc(50%+80px)] ${inter.className}`}>
      <span className="flex items-baseline tracking-tight gap-[0.2em] text-[1.2rem] sm:text-[1.7rem] font-semibold">
        <span className="font-bold text-black">A</span>
        <span className="font-bold text-black">i</span>
        <span className="text-[1.5rem] sm:text-[2.1rem] font-bold text-[#8B0000] -mt-1">R</span>
        <span className="font-bold text-black">A</span>
      </span>
    </div>
  </>
)

const industries = [
  {
    name: "Hotels",
    angle: -25,
    audio: "/audio/hero_aud.mp3",
    description: "AI reception services for hotels",
    //image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hotels.jpg-M3uJGodobKppgPoE6WgEXSy6w9242o.jpeg"
  },
  {
    name: "Salons",
    angle: -155,
    audio: "/audio/hero_aud.mp3",
    description: "AI reception services for beauty salons",
    //image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/saloons.jpg-WKGCKPg3PnXT7miJA3gesuVBsdoTrS.jpeg"
  },
  {
    name: "Clinics",
    angle: 25,
    audio: "/audio/hero_aud.mp3",
    description: "AI reception services for medical clinics",
    //image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clinics.jpg-J4PvAd7wE87j0yFgVnuO52IthlJju0.jpeg"
  },
  {
    name: "More Coming Soon",
    angle: 155,
    audio: "/audio/hero_aud.mp3",
    description: "AI reception services for more businesses coming soon",
    //image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clinics.jpg-J4PvAd7wE87j0yFgVnuO52IthlJju0.jpeg"
  }
]

export function Industries() {
  const [activeAudio, setActiveAudio] = useState<string | null>(null)
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null)

  const handleIndustryClick = (industry: typeof industries[0]) => {
    setActiveIndustry(industry.name)
    setActiveAudio(industry.audio)
  }

  return (
    <section className="py-16 sm:py-24 relative bg-white" id="industries">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 sm:mb-16">Industries We Serve</h2>
        
        <div className="relative w-[300px] h-[350px] sm:w-[600px] sm:h-[700px] mx-auto my-12 sm:my-24">
          <MicrophoneCircle />
          {industries.map((industry) => (
            <IndustryItem
              key={industry.name}
              industry={industry}
              isActive={activeIndustry === industry.name}
              onMouseEnter={() => setActiveAudio(industry.audio)}
              onMouseLeave={() => setActiveAudio(null)}
              onClick={() => handleIndustryClick(industry)}
            />
          ))}
        </div>

        {/* Audio Player */}
        <AudioPlayer audioSrc={activeAudio} activeIndustry={activeIndustry} />
      </div>
    </section>
  )
}

