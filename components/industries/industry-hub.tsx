'use client'

import { useState, useRef } from 'react'
import { Mic, Utensils, Home, Stethoscope, Scissors, ShoppingBag, Briefcase, GraduationCap, Car, Plane, Play, Pause, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { AiraLogo } from '../ui/aira-logo'

type RecordingItem = {
  name: string
  icon: React.ElementType
  color: string
  recording: string | null
}

const items: RecordingItem[] = [
  { name: 'Restaurants', icon: Utensils, color: 'from-orange-400 to-orange-300', recording: null },
  { name: 'Real Estate', icon: Home, color: 'from-blue-400 to-blue-300', recording: null },
  { name: 'Healthcare', icon: Stethoscope, color: 'from-green-400 to-green-300', recording: null },
  { name: 'Beauty', icon: Scissors, color: 'from-purple-400 to-purple-300', recording: null },
  { name: 'Retail', icon: ShoppingBag, color: 'from-pink-400 to-pink-300', recording: null },
  { name: 'Finance', icon: Briefcase, color: 'from-indigo-400 to-indigo-300', recording: null },
  { name: 'Education', icon: GraduationCap, color: 'from-yellow-400 to-yellow-300', recording: null },
  { name: 'Automotive', icon: Car, color: 'from-red-400 to-red-300', recording: null },
  { name: 'Travel', icon: Plane, color: 'from-teal-400 to-teal-300', recording: null },
]

const generateStarburstLines = (count: number) => {
  const lines = []
  for (let i = 0; i < count; i++) {
    const angle = (i * 360) / count
    const length = 150 + Math.sin(i * 0.5) * 30 // Varying lengths for organic feel
    lines.push({ angle, length })
  }
  return lines
}

export default function IndustriesSection() {
  const [recordings, setRecordings] = useState<RecordingItem[]>(items)
  const [isRecording, setIsRecording] = useState(false)
  const [currentRecordingIndex, setCurrentRecordingIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const radius = 240
  const starburstLines = generateStarburstLines(60)

  const restaurantsAudioRef = useRef<HTMLAudioElement>(null)
  const beautyAudioRef = useRef<HTMLAudioElement>(null)

  const startRecording = (index: number) => {
    setIsRecording(true)
    setCurrentRecordingIndex(index)
    // Simulating recording start
    console.log(`Started recording for ${recordings[index].name}`)
  }

  const stopRecording = () => {
    if (currentRecordingIndex !== null) {
      setIsRecording(false)
      // Simulating recording stop and save
      const updatedRecordings = [...recordings]
      updatedRecordings[currentRecordingIndex].recording = `Recording for ${updatedRecordings[currentRecordingIndex].name}`
      setRecordings(updatedRecordings)
      setCurrentRecordingIndex(null)
      console.log(`Stopped and saved recording for ${updatedRecordings[currentRecordingIndex].name}`)
    }
  }

  const playRecording = (index: number) => {
    setIsPlaying(true)
    // Simulating playback
    console.log(`Playing recording: ${recordings[index].recording}`)
    setTimeout(() => setIsPlaying(false), 3000) // Simulate 3 second playback
  }

  const deleteRecording = (index: number) => {
    const updatedRecordings = [...recordings]
    updatedRecordings[index].recording = null
    setRecordings(updatedRecordings)
    console.log(`Deleted recording for ${updatedRecordings[index].name}`)
  }

  return (
    <section id="industries" className="py-16 bg-gray-50">
      <audio ref={restaurantsAudioRef} src="/audio/Restaurants.mp3" />
      <audio ref={beautyAudioRef} src="/audio/Beauty.mp3" />
      <div className="container mx-auto px-4">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Transform Your Reception
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-[#8B0000]">with AI Excellence</h2>
          </div>
        <div className="grid grid-cols-3 items-center">
          <div className="col-span-1">
          {/* Left side: Heading and Description */}
          <div className="space-y-6">
          
            <p className="text-lg md:text-xl">
              Experience the future of reception services with Aira. Our AI-powered
              platform delivers <span className="text-[#8B0000] font-semibold">24/7</span> professional reception coverage with unmatched
              efficiency and elegance.
            </p>
          </div>
        </div>
        <div className="col-span-2">
          {/* Right side: Interactive Animation */}
          <div className="relative h-[600px] w-full max-w-[600px] mx-auto flex items-center justify-center overflow-hidden">
            {/* Starburst Pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.svg
                className="absolute w-[500px] h-[500px]"
                viewBox="-250 -250 500 500"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 200,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {starburstLines.map((line, index) => (
                  <motion.line
                    key={index}
                    x1={0}
                    y1={0}
                    x2={line.length * Math.cos((line.angle * Math.PI) / 180)}
                    y2={line.length * Math.sin((line.angle * Math.PI) / 180)}
                    stroke="rgba(239, 68, 68, 0.3)" // Changed from 0.2 to 0.3 for darker strokes
                    strokeWidth="1.5"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0.3, 0.5, 0.3], // Adjusted opacity range for darker effect
                      scale: 1,
                      strokeWidth: [1.5, 2, 1.5],
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 0.02,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </motion.svg>
            </div>

            {/* Enhanced Ripple Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[1, 2, 3, 4, 5].map((index) => (
                <motion.div
                  key={index}
                  className="absolute rounded-full"
                  style={{
                    width: `${index * 100}px`,
                    height: `${index * 100}px`,
                    border: `2px solid rgba(185, 28, 28, ${0.4 - index * 0.05})`,
                  }}
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.4,
                    ease: "easeOut",
                  }}
                />
              ))}
              {[1, 2, 3, 4, 5].map((index) => (
                <motion.div
                  key={`bubble-${index}`}
                  className="absolute rounded-full bg-red-600"
                  style={{
                    width: `${10 - index}px`,
                    height: `${10 - index}px`,
                  }}
                  animate={{
                    x: [0, (index * 50 + 100) * Math.cos(index * Math.PI / 5)],
                    y: [0, (index * 50 + 100) * Math.sin(index * Math.PI / 5)],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {/* Updated Gradient Center */}
            <div className="absolute w-64 h-64 rounded-full overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#FFD700,#FFF7C7,#FFD700,#FFF7C7,#FFD700)]" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-yellow-200/10 to-yellow-900/20" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent" />
            </div>

            {/* Central Button */}
            <AiraLogo />
           {/*  <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#8B0000] to-[#A52A2A] rounded-full p-6 w-40 h-40 shadow-lg shadow-yellow-500/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                onClick={() => isRecording ? stopRecording() : null}
                aria-label={isRecording ? "Stop Recording" : "Activate AiRA"}
              >
                <Mic className="w-10 h-10 text-white mb-2" aria-hidden="true" />
                <div className="text-white text-center font-bold text-lg">
                  {isRecording ? "Stop Recording" : "Talk to AiRA"}
                </div>
              </motion.button>
            </motion.div> */}

            {/* Circumferential Items */}
            <div className="absolute inset-0 flex items-center justify-center">
              {recordings.map((item, index) => {
                const angle = (index / recordings.length) * 360
                const x = radius * Math.cos((angle - 90) * (Math.PI / 180))
                const y = radius * Math.sin((angle - 90) * (Math.PI / 180))
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, x, y }}
                    transition={{ delay: 0.1 * index }}
                    className="absolute"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex flex-col items-center"
                    >
                      <motion.div 
                        className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${item.color} shadow-lg relative cursor-pointer overflow-hidden`}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                        }}
                        onClick={() => item.recording ? playRecording(index) : startRecording(index)}
                        onMouseEnter={() => {
                          if (item.name === 'Restaurants' && restaurantsAudioRef.current) {
                            restaurantsAudioRef.current.play();
                          } else if (item.name === 'Beauty' && beautyAudioRef.current) {
                            beautyAudioRef.current.play();
                          }
                        }}
                        onMouseLeave={() => {
                          if (item.name === 'Restaurants' && restaurantsAudioRef.current) {
                            restaurantsAudioRef.current.pause();
                            restaurantsAudioRef.current.currentTime = 0;
                          } else if (item.name === 'Beauty' && beautyAudioRef.current) {
                            beautyAudioRef.current.pause();
                            beautyAudioRef.current.currentTime = 0;
                          }
                        }}
                        style={{
                          boxShadow: '0 3px 5px -1px rgba(0, 0, 0, 0.1), 0 1px 3px -1px rgba(0, 0, 0, 0.06), inset 0 -1px 3px rgba(0, 0, 0, 0.1), inset 0 1px 3px rgba(255, 255, 255, 0.5)'
                        }}
                      >
                        <item.icon className="w-7 h-7 text-white relative z-10" aria-hidden="true" />
                        {item.recording && (
                          <button
                            className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1 z-20"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteRecording(index)
                            }}
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        )}
                      </motion.div>
                      <span className="mt-2 text-sm font-semibold text-gray-600">{item.name}</span>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

