import Image from 'next/image'

interface IndustryItemProps {
  industry: {
    name: string
    angle: number
    audio: string
    description: string
    //image: string
  }
  isActive: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

export function IndustryItem({
  industry,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: IndustryItemProps) {
  const positionStyle = {
    left: `calc(50% + ${Math.cos((industry.angle * Math.PI) / 180) * 75}%)`,
    top: `calc(50% + ${Math.sin((industry.angle * Math.PI) / 180) * 75}%)`,
    transform: 'translate(-50%, -50%)',
  }

  return (
    <div
      className={`absolute transition-all duration-300 cursor-pointer
              ${isActive ? 'scale-110' : 'scale-100'}`}
      style={positionStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div 
        className={`w-40 text-center cursor-pointer transition-all duration-300 relative pb-8 ${isActive ? 'scale-110' : 'scale-100'}`}
        style={positionStyle}
        onClick={onClick}
      >
        
        <h3 
          className={`text-xl font-semibold transition-colors duration-300 whitespace-nowrap
            ${isActive ? 'text-[#8B0000]' : 'text-gray-800 hover:text-[#8B0000]'}`}
        >
          {industry.name}
        </h3>
      </div>
    </div>
  )
}

