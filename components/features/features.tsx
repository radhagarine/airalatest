import { Clock, Shield, Globe2, MessageSquare } from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Round-the-clock reception services that never sleep, ensuring your business is always accessible."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and security protocols to protect your sensitive business communications."
  },
  {
    icon: Globe2,
    title: "Multilingual Support",
    description: "Seamless communication in multiple languages, breaking down international barriers."
  },
  {
    icon: MessageSquare,
    title: "Smart Interactions",
    description: "AI-powered conversations that adapt and learn from each interaction for better service."
  }
]

export function Features() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden" id="features">
      <div className="absolute inset-0 bg-gray-50 opacity-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.05" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")' }}></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16 features-fade-in-up">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-800">
            Powerful Features for Modern Business
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Everything you need to revolutionize your reception services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={feature.title}
                className="bg-white rounded-lg p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#8B0000]/20 group features-fade-in-up flex flex-col h-full"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col items-center text-center flex-grow">
                  <div className="bg-[#8B0000]/10 rounded-full p-3 mb-4 group-hover:bg-[#8B0000]/20 transition-all duration-300 transform group-hover:scale-110">
                    <Icon className="w-6 h-6 text-[#8B0000] group-hover:features-pulse" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#8B0000] transition-all duration-300 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-center">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

