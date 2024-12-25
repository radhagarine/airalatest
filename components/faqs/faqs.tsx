"use client"
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

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
    <section id="faqs" className="w-full max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Frequently Asked Questions
      </h1>
      <p className="text-gray-600 mb-12 text-center">
        Find answers to common questions about our platform
      </p>
      
      <div className="space-y-4">
        {faqItems.map(({ id, question, answer }) => (
          <div 
            key={id}
            className="border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow duration-200"
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

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Still have questions?{" "}
          <a href="/contact" className="text-red-500 hover:text-red-600 font-medium">
            Contact our support team
          </a>
        </p>
      </div>
    </section>
  )
}