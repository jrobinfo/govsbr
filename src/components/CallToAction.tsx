import { FC } from 'react'
import Link from 'next/link'
import { Github, BookOpen, Bitcoin, FileText } from 'lucide-react'

const CallToAction: FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-16 xl:px-24 bg-gradient-to-b from-black to-orange-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join the Bitcoin Sovereignty Movement
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Learn more about Bitcoin sovereignty, contribute to the project, or explore our research on why 
            Bitcoin belongs to individuals, not governments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-gray-800/50 hover:bg-gray-800/80 transition-colors rounded-xl p-8 text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-orange-500 mb-6">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Research Paper</h3>
            <p className="text-gray-300 mb-6">
              Read our research on the implications of government-controlled Bitcoin reserves and the potential safeguards against misuse.
            </p>
            <Link 
              href="/research" 
              className="inline-flex items-center text-orange-500 hover:text-orange-400 font-medium"
            >
              Read the paper
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-gray-800/50 hover:bg-gray-800/80 transition-colors rounded-xl p-8 text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-orange-500 mb-6">
              <Bitcoin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Learn About Bitcoin</h3>
            <p className="text-gray-300 mb-6">
              Deepen your understanding of Bitcoin, UTXO model, and why self-custody matters in preserving 
              Bitcoin&apos;s core values.
            </p>
            <Link 
              href="https://bitcoin.org/en/bitcoin-paper" 
              target="_blank"
              className="inline-flex items-center text-orange-500 hover:text-orange-400 font-medium"
            >
              Read the whitepaper
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-gray-800/50 hover:bg-gray-800/80 transition-colors rounded-xl p-8 text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-orange-500 mb-6">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Explore OP_RETURN</h3>
            <p className="text-gray-300 mb-6">
              Learn more about the OP_RETURN opcode in Bitcoin, how it works, and why it&apos;s used 
              for permanently burning Bitcoin.
            </p>
            <Link 
              href="https://en.bitcoin.it/wiki/OP_RETURN" 
              target="_blank"
              className="inline-flex items-center text-orange-500 hover:text-orange-400 font-medium"
            >
              Read the documentation
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-gray-800/50 hover:bg-gray-800/80 transition-colors rounded-xl p-8 text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-orange-500 mb-6">
              <Github className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Contribute to the Project</h3>
            <p className="text-gray-300 mb-6">
              Help improve this educational tool, add new features, or fix bugs. All contributions 
              are welcome, from code to documentation.
            </p>
            <Link 
              href="https://github.com" 
              target="_blank"
              className="inline-flex items-center text-orange-500 hover:text-orange-400 font-medium"
            >
              View on GitHub
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-2">From our research paper:</p>
          <blockquote className="italic text-xl text-gray-300 max-w-3xl mx-auto">
            &ldquo;While Bitcoin offers substantial value as an inflation hedge and represents the ethos of individual financial autonomy, 
            governmental centralization poses significant threats. The inherent risks of political short-termism, corruption, market manipulation, 
            and custodial mismanagement challenge the very principles Bitcoin embodies.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-gray-500">
            This website is provided for educational purposes only. Always do your own research and 
            make informed decisions about your Bitcoin.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CallToAction 