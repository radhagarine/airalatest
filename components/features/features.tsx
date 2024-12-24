import { Clock, Shield, Globe2, MessageSquare, Calendar, Headphones, Phone, MessageCircle } from 'lucide-react'

const features = [
  {
    icon: Calendar,
    iconColor: "bg-red-500/20",
    iconFill: "text-red-500",
    title: "Scheduling",
    description:
      "Simplify appointment booking and management, from healthcare to personal services. Clients can easily schedule, reschedule, or cancel appointments through natural conversation.",
    isActive: true,
  },
  {
    icon: Shield,
    iconColor: "bg-gray-300/20",
    iconFill: "text-gray-400",
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and security protocols to protect your sensitive business communications.",
    isActive: false,
  },
  {
    icon: Globe2,
    iconColor: "bg-gray-300/20",
    iconFill: "text-gray-400",
    title: "Multilingual Support",
    description:
      "Seamless communication in multiple languages, breaking down international barriers.",
    isActive: false,
  },
  {
    icon: MessageCircle,
    iconColor: "bg-gray-300/20",
    iconFill: "text-gray-400",
    title: "Smart Interactions",
    description:
      "AI-powered conversations that adapt and learn from each interaction for better service.",
    isActive: false,
  },
  {
    icon: Phone,
    iconColor: "bg-gray-300/20",
    iconFill: "text-gray-400",
    title: "Outbound Calls",
    description:
      "Automate your outreach campaigns with intelligent call handling and follow-ups to maximize engagement and conversion rates.",
    isActive: false,
  },
  {
    icon: MessageSquare,
    iconColor: "bg-gray-300/20",
    iconFill: "text-gray-400",
    title: "Social Media Support",
    description:
      "Manage and respond to social media interactions across multiple platforms, maintaining consistent brand voice and rapid response times.",
    isActive: false,
  },
]

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Voice Integrated Features for the Modern Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-[800px] mx-auto">
            Everything you need to revolutionize your reception services
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-2xl bg-gradient-to-br ${
                item.isActive ? 'from-white to-gray-50/50' : 'from-gray-100 to-gray-200/50'
              } p-8 shadow-lg transition-all duration-500 hover:shadow-xl border border-gray-200/50 backdrop-blur-xl`}
            >
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 pointer-events-none" />
              
              {/* Icon wrapper */}
              <div className={`w-14 h-14 rounded-full ${item.iconColor} flex items-center justify-center mb-6 relative mx-auto`}>
                <item.icon className={`w-7 h-7 ${item.iconFill}`} />
                {/* Metallic shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-full" />
              </div>

              <h3 className={`text-xl font-semibold mb-3 text-center ${item.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                {item.title}
              </h3>
              <p className={`text-sm leading-relaxed text-center ${item.isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                {item.description}
              </p>

              {!item.isActive && (
                <div className="absolute top-4 right-4 bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-semibold">
                  Coming Soon
                </div>
              )}

              {/* Interactive hover effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

