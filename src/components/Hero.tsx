import { FC } from 'react'
import Link from 'next/link'

const Hero: FC = () => {
  return (
    <section className="relative px-6 py-24 overflow-hidden sm:py-32 md:px-12 lg:px-16 xl:px-24">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-center bg-no-repeat bg-cover opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40"></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          Bitcoin Belongs to <span className="text-orange-500">Individuals</span>
          <br />
          Not <span className="text-red-500">Governments</span>
        </h1>
        
        <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
          Learn about Bitcoin UTXOs, the concept of &quot;burning&quot; Bitcoin, and why government-controlled Bitcoin reserves present significant risks to Bitcoin&apos;s core principles of decentralization and financial sovereignty.
        </p>
        
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="#demo"
            className="rounded-md bg-orange-500 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            Try the Burn Demo
          </Link>
          <Link
            href="/sbr-demo"
            className="rounded-md bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Strategic Reserve Demo
          </Link>
          <Link
            href="/research"
            className="rounded-md border border-white/20 bg-black/20 backdrop-blur-sm px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Read Research Paper
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero 