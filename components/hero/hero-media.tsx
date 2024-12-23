"use client"

import { useEffect, useRef, useState } from "react"

export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsVideoLoaded(true)
      video.play().catch(() => {
        // Autoplay was prevented, show fallback image
        setIsVideoLoaded(false)
      })
    }

    video.addEventListener('canplay', handleCanPlay)
    return () => video.removeEventListener('canplay', handleCanPlay)
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      {/* Fallback Image */}
      <div 
        className={`absolute inset-0 bg-[url('/office-bg.jpg')] bg-cover bg-center transition-opacity duration-1000
                    ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))`
        }}
        aria-hidden={isVideoLoaded}
      />

      {/* Video Background */}
      <video
        ref={videoRef}
        className={`object-cover w-full h-full transition-opacity duration-1000
                    ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        playsInline
        muted
        loop
        preload="auto"
        poster="/office-bg.jpg"
        aria-hidden="true"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="/hero-video.webm" type="video/webm" />
      </video>

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"
        aria-hidden="true"
      />
    </div>
  )
}

