import { Metadata } from 'next'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import BurnDemo from '@/components/BurnDemo'
import FAQ from '@/components/FAQ'
import CallToAction from '@/components/CallToAction'

export const metadata: Metadata = {
  title: 'Bitcoin UTXO Burner | Educational Demo',
  description: 'Learn about burning Bitcoin UTXOs and why Bitcoin belongs to individuals, not governments',
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
