import { FC } from 'react'
import { Check } from 'lucide-react'

interface StepProps {
  number: number
  title: string
  isActive: boolean
  isComplete: boolean
}

const Step: FC<StepProps> = ({ number, title, isActive, isComplete }) => {
  return (
    <div 
      className={`flex items-center ${isActive ? 'opacity-100' : 'opacity-50'}`}
    >
      <div 
        className={`
          flex items-center justify-center w-8 h-8 rounded-full mr-2
          ${isComplete ? 'bg-green-500' : isActive ? 'bg-orange-500' : 'bg-gray-700'}
        `}
      >
        {isComplete ? (
          <Check className="h-5 w-5 text-white" />
        ) : (
          <span className="text-white font-semibold">{number}</span>
        )}
      </div>
      <span 
        className={`
          text-sm font-medium
          ${isComplete ? 'text-green-500' : isActive ? 'text-orange-500' : 'text-gray-400'}
        `}
      >
        {title}
      </span>
      {number < 4 && (
        <div className="w-10 h-px bg-gray-700 mx-2" />
      )}
    </div>
  )
}

export default Step 