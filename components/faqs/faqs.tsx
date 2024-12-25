"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from 'react'
import { Mic, ChevronDown } from 'lucide-react'
import Image from "next/image"

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const faqItems = [
    {
      id: "item-1",
      question: <>Can I integrate <span className="text-red-500">AiRA</span> into my own app?</>,
      answer: "Yes, you can integrate our technology into your applications through our comprehensive API."
    },
    {
      id: "item-2",
      question: "How many agents can I create?",
      answer: "The number of agents you can create depends on your subscription plan. Contact our sales team for detailed information."
    },
    {
      id: "item-3",
      question: "What LLMs can I use with my voice agents?",
      answer: "We support a wide range of Large Language Models that can be integrated with your voice agents for enhanced functionality."
    },
    {
      id: "item-4",
      question: "Can my agent make API calls to external services?",
      answer: "Yes, agents can be configured to make API calls to external services, enabling integration with your existing infrastructure."
    },
    {
      id: "item-5",
      question: <>How can I make and receive phone calls with <span className="text-red-500">AiRA</span>?</>,
      answer: "Our platform provides comprehensive telephony integration features that allow your AI agents to handle phone calls seamlessly."
    }
  ]

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section id="faqs" className="w-full mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center sm:text-4xl md:text-5xl mb-4">Frequently Asked Questions</h2>
      <div className="flex justify-center items-center"> {/* Center the entire section */}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl"> {/* Two-column layout with max width */}
            <div className="flex flex-col col-span-1"> {/* First column for FAQs */}
                <p className="text-gray-900 mb-12 text-center">
                    Find answers to common questions about our platform
                </p>
                {faqItems.map(({ id, question, answer }) => (
                <div 
                    key={id}
                    className="border rounded-lg mb-4 px-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                    <button
                    onClick={() => toggleItem(id)}
                    className="w-full py-4 flex justify-between items-center text-left"
                    aria-expanded={openItem === id}
                    aria-controls={`content-${id}`}
                    >
                    <span className="font-medium">{question}</span>
                    <ChevronDown 
                        className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                        openItem === id ? 'transform rotate-180' : ''
                        }`}
                    />
                    </button>
                    <div
                    id={`content-${id}`}
                    className={`overflow-hidden transition-all duration-200 ${
                        openItem === id ? 'max-h-40 py-4' : 'max-h-0'
                    }`}
                    role="region"
                    >
                    <p className="text-gray-600">{answer}</p>
                    </div>
                </div>
                ))}
            </div>

            <div className="flex flex-col justify-center items-center col-span-1 space-y-4"> {/* Second column for additional queries */}
                <p className="text-gray-900">
                Still have questions?{" "}
                <a href="/contact" className="text-red-500 hover:text-red-600 font-medium">
                    Talk to Aira
                </a>
                </p>
                {/* Avatar section with pulsating rings */}
                <div className="relative w-80 h-80">
                    <div className="absolute inset-0 rounded-full bg-rose-200/30 animate-pulse-slow"></div>
                    <div className="absolute inset-[10%] rounded-full bg-rose-200/40 animate-pulse-medium"></div>
                    <div className="absolute inset-[20%] rounded-full bg-rose-200/50 animate-pulse-fast"></div>
                    <div className="absolute inset-[30%] rounded-full bg-white border-4 border-white overflow-hidden shadow-lg">
                    <Image
                        src="/images/hero_img.JPG"
                        alt="AI Assistant Avatar"
                        width={480}
                        height={480}
                        className="w-full h-full object-cover"
                    />
                    </div>
                </div>
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <Button 
                        size="lg" 
                        className="bg-[#722F37] hover:bg-[#8a383f] text-white px-8 py-6 text-lg rounded-full"
                        >
                        <Mic className="mr-2 h-5 w-5" />
                        Talk to Me
                    </Button>
                </div>
                {/* FAQ Card */}
                <Card className="max-w-lg w-full p-6 bg-white shadow-lg rounded-2xl">
                    <div className="space-y-5">
                    <div className="flex items-start gap-3">
                        <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <span className="text-[#722F37]">💬</span>
                            Ask me anything about Aira:
                        </h2>
                        <div className="space-y-4 text-gray-700 text-lg">
                            <p className="hover:text-gray-900 cursor-pointer transition-colors">
                            "How much does Aira cost?"
                            </p>
                            <p className="hover:text-gray-900 cursor-pointer transition-colors">
                            "Can you handle multiple languages?"
                            </p>
                            <p className="hover:text-gray-900 cursor-pointer transition-colors">
                            "How do I get started?"
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </Card>

                <style jsx global>{`
                    @keyframes pulse-slow {
                        0%, 100% { transform: scale(1); opacity: 0.3; }
                        50% { transform: scale(1.05); opacity: 0.4; }
                    }
                    @keyframes pulse-medium {
                        0%, 100% { transform: scale(1); opacity: 0.4; }
                        50% { transform: scale(1.1); opacity: 0.5; }
                    }
                    @keyframes pulse-fast {
                        0%, 100% { transform: scale(1); opacity: 0.5; }
                        50% { transform: scale(1.15); opacity: 0.6; }
                    }
                    .animate-pulse-slow {
                        animation: pulse-slow 3s infinite;
                    }
                    .animate-pulse-medium {
                        animation: pulse-medium 2s infinite;
                    }
                    .animate-pulse-fast {
                        animation: pulse-fast 1.5s infinite;
                    }
                `}</style>
            </div>
        </div>
      </div>
    </section>
  )
}