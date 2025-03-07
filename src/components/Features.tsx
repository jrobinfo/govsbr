import { FC } from 'react'
import { ArrowDown, AlertTriangle, BarChart4, ShieldAlert, Landmark } from 'lucide-react'
import Link from 'next/link'

const Features: FC = () => {
  return (
    <section id="learn" className="py-24 px-6 md:px-12 lg:px-16 xl:px-24 bg-black/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why Government Bitcoin Reserves Are Problematic
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Understanding the risks and implications of government-controlled Bitcoin reserves
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative p-6 bg-gray-800/50 rounded-xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 rounded-full p-3">
              <BarChart4 className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white pt-2">Market Manipulation</h3>
            <p className="mt-3 text-gray-300">
              Government accumulation of significant Bitcoin reserves increases market volatility and enables potential manipulation. 
              Even a single announcement can dramatically influence prices, undermining Bitcoin&apos;s decentralized valuation.
            </p>
          </div>
          
          <div className="relative p-6 bg-gray-800/50 rounded-xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 rounded-full p-3">
              <Landmark className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white pt-2">Political Short-Termism</h3>
            <p className="mt-3 text-gray-300">
              Governments often prioritize short-term political gains over sound fiscal strategy. Bitcoin reserves could 
              become another resource liquidated prematurely or misused to curry short-term political favor.
            </p>
          </div>
          
          <div className="relative p-6 bg-gray-800/50 rounded-xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 rounded-full p-3">
              <ShieldAlert className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white pt-2">Security Risks</h3>
            <p className="mt-3 text-gray-300">
              Managing substantial Bitcoin reserves presents significant security challenges. Digital assets require specialized 
              infrastructure, and government management adds bureaucratic inefficiencies that increase security risks.
            </p>
          </div>
          
          <div className="relative p-6 bg-gray-800/50 rounded-xl lg:col-span-3">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full p-3">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white pt-2">The Strategic Bitcoin Reserve Problem</h3>
            <p className="mt-3 text-gray-300">
              On March 6, 2025, President Trump signed an executive order establishing a &quot;Strategic Bitcoin Reserve&quot; and a stockpile for other cryptocurrencies.
              While the government claims they&apos;ll never sell the Bitcoin, history shows that politicians frequently change policies based on political expediency.
            </p>
            <p className="mt-3 text-gray-300">
              Government Bitcoin holdings create centralization risks, potential market manipulation, and conflict with Bitcoin&apos;s core principles of decentralization
              and individual sovereignty.
            </p>
            <div className="mt-5 flex justify-center">
              <Link href="/research" className="inline-flex items-center text-orange-500 hover:text-orange-400">
                Read our full research paper
                <ArrowDown className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features 