import { FC } from 'react'
import Link from 'next/link'

const FAQ: FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-16 xl:px-24 bg-black/60">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Learn more about Bitcoin burning and government Bitcoin reserves
          </p>
        </div>
        
        <div className="space-y-8">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              Why would anyone burn Bitcoin?
            </h3>
            <p className="text-gray-300">
              People burn Bitcoin for various reasons: to make political statements, to increase scarcity, 
              as a form of &quot;proof of burn&quot; for certain protocols, or as an irreversible donation mechanism. 
              In this educational demo, we&apos;re highlighting the concept to illustrate the principle that 
              Bitcoin gives individuals sovereign control over their money.
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              What is the Strategic Bitcoin Reserve?
            </h3>
            <p className="text-gray-300">
              The Strategic Bitcoin Reserve is an initiative established through an executive order on March 6, 2025, 
              directing the United States government to acquire and hold Bitcoin as a national reserve asset. While proponents claim 
              the government would never sell these Bitcoin, our <Link href="/research" className="text-orange-500 hover:text-orange-400">research paper</Link> examines 
              why such promises are problematic given historical precedents of changing political priorities.
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              How does burning Bitcoin work technically?
            </h3>
            <p className="text-gray-300">
              Burning Bitcoin involves creating a transaction that sends Bitcoin to an OP_RETURN output. 
              This is a special Bitcoin script operation that makes the funds provably unspendable. The transaction 
              is recorded on the blockchain, but the Bitcoin can never be moved again, effectively removing it from circulation.
              The OP_RETURN output can include a short message, which is also permanently recorded on the blockchain.
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              What are potential safeguards against government misuse of Bitcoin reserves?
            </h3>
            <p className="text-gray-300">
              Some potential safeguards include: (1) Immutable smart contracts that restrict asset movement, 
              (2) Multi-signature wallets requiring consensus among diverse stakeholders, (3) Legislative oversight 
              with supermajority approval requirements, and (4) Transparent and regular public audits. 
              While these measures might mitigate risks, they cannot entirely eliminate the fundamental contradiction 
              between government control and Bitcoin&apos;s decentralized ethos.
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              Why is government ownership of Bitcoin problematic?
            </h3>
            <p className="text-gray-300">
              Government ownership of large Bitcoin reserves contradicts Bitcoin&apos;s core principles of decentralization
              and individual sovereignty. Our research identifies four main risks: market manipulation and volatility, 
              political short-termism leading to premature liquidation, security and custodial vulnerabilities, and 
              increased potential for corruption and misallocation of resources. Read our full 
              <Link href="/research" className="text-orange-500 hover:text-orange-400 ml-1">research paper</Link> for an in-depth analysis.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ 