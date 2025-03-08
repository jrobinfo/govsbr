import { FC } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import SBRDemo from '@/components/SBRDemo'

export const metadata: Metadata = {
  title: 'Strategic Bitcoin Reserve Demo | Taproot & Miniscript Solutions',
  description: 'Interactive demo exploring how Taproot and Miniscript can secure a Strategic Bitcoin Reserve with multi-signature requirements and timelocks.',
}

const SBRDemoPage: FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <Link 
          href="/"
          className="inline-flex items-center mb-8 text-orange-500 hover:text-orange-400"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to Home
        </Link>
        
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-6 text-center text-white">Strategic Bitcoin Reserve Demo</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl text-center">
            Explore how Taproot and Miniscript can secure a government Bitcoin reserve with multi-signature requirements 
            and timelocks to prevent unauthorized access and political manipulation.
          </p>
          
          <SBRDemo />
        </div>
      </div>
    </main>
  )
}

export default SBRDemoPage 