"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const companies = [
  { 
    name: "TechCorp", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/techcorp-logo.png" 
  },
  { 
    name: "Innovation Labs", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/innovation-labs-logo.png" 
  },
  { 
    name: "Global Systems", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/global-systems-logo.png" 
  },
  { 
    name: "Future Enterprises", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/future-enterprises-logo.png" 
  },
  { 
    name: "Smart Solutions", 
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smart-solutions-logo.png" 
  }
]

const testimonials = [
  {
    quote: "Aira transformed our reception operations completely. The AI's ability to handle multiple inquiries simultaneously is remarkable.",
    author: "Sarah Johnson",
    title: "Operations Director",
    company: "TechCorp",
    image: "/placeholder.svg?height=80&width=80"
  },
  {
    quote: "The cost savings and efficiency gains have been substantial. Our clients love the professional and prompt responses.",
    author: "Michael Chen",
    title: "CEO",
    company: "Innovation Labs",
    image: "/placeholder.svg?height=80&width=80"
  },
  {
    quote: "Implementation was seamless, and the AI's learning capability means it gets better every day.",
    author: "Emma Williams",
    title: "IT Director",
    company: "Global Systems",
    image: "/placeholder.svg?height=80&width=80"
  },
]

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-lg text-gray-600">See what our clients have to say about Aira</p>
        </div>

        {/* Company Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
          {companies.map((company) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-100 rounded-lg px-8 py-4 min-w-[200px] text-center font-medium text-gray-800"
            >
              {company.name}
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <blockquote className="text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.title}</p>
                  <p className="text-[#8B0000]">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

