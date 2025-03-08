import { Metadata } from 'next'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import BurnDemo from '@/components/BurnDemo'
import FAQ from '@/components/FAQ'
import CallToAction from '@/components/CallToAction'

export const metadata: Metadata = {
  title: 'Bitcoin UTXO Burner & Strategic Reserve Demos',
  description: 'Learn about burning Bitcoin UTXOs and explore how Taproot and Miniscript can secure a Strategic Bitcoin Reserve with multi-signature requirements and timelocks',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Hero />
      <Features />
      <BurnDemo />
      <FAQ />
      <CallToAction />
    </main>
  )
}
