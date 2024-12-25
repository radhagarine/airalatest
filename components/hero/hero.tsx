"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { HeroMedia } from "./hero-media"
import Image from "next/image"
import { Volume2, VolumeX } from 'lucide-react'

interface HeroProps {
  onOpenSignUp: () => void;
}

export function Hero({ onOpenSignUp }: HeroProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlayThrough = () => {
      setAudioLoaded(true)
      audio.muted = true;
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error)
      })
    }

    const handlePlay = () => {
      setAudioPlaying(true)
    }

    const handlePause = () => {
      setAudioPlaying(false)
    }

    audio.addEventListener('canplaythrough', handleCanPlayThrough)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.pause()
      audio.removeEventListener('canplaythrough', handleCanPlayThrough)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [])

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio || !audioLoaded) return

    if (audio.paused) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error)
      })
    } else {
      audio.pause()
    }
  }

  const handleUserInteraction = () => {
    const audio = audioRef.current
    if (audio && audioLoaded) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error)
      })
    }
  }

  return (
    <section 
      id="hero"
      className="relative w-full min-h-[calc(100vh-4rem)] flex items-center pt-20"
      aria-label="Hero section"
      onClick={handleUserInteraction}
    >
      <HeroMedia />
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Hi, I am <span className="text-4xl md:text-5xl font-bold text-[#8B0000]">AiRA, </span>
            </h1>
            <p className="text-lg md:text-xl"> 
              Your voice enabled AI Reception assistant that can transform your business.
            </p>
            <br></br>
            <Button 
              className="bg-[#8B0000] hover:bg-[#8B0000]/90 text-white px-8 py-6 text-lg
                        transition-all duration-300 hover:scale-105 active:scale-98"
              onClick={onOpenSignUp}
            >
              Get Started →
            </Button>
          </div>

          {/* <div className="relative flex justify-center lg:justify-start lg:-ml-12">
            <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden">
              <Image
                src="/images/hero_img.JPG"
                alt="Aira AI Assistant"
                fill
                className="object-cover transform hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/20 to-transparent opacity-75 mix-blend-overlay" />
            </div>
          </div> */}
        </div>
      </div>

      {audioLoaded && (
        <button
          onClick={toggleAudio}
          className="absolute bottom-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label={audioPlaying ? "Mute background music" : "Unmute background music"}
        >
          {audioPlaying ? (
            <Volume2 className="w-6 h-6 text-white" />
          ) : (
            <VolumeX className="w-6 h-6 text-white" />
          )}
        </button>
      )}
    </section>
  )
}

