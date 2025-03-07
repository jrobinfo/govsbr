import { FC } from 'react'

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
              as a form of "proof of burn" for certain protocols, or as an irreversible donation mechanism. 
              In this educational demo, we're highlighting the concept to illustrate the principle that 
              Bitcoin gives individuals sovereign control over their money.
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              What is the Strategic Bitcoin Reserve?
            </h3>
            <p className="text-gray-300">
              The Strategic Bitcoin Reserve is a proposal by some United States politicians to have the government 
              acquire and hold Bitcoin as a national reserve asset. Proponents claim the government would never sell 
              these Bitcoin, but history shows that political promises regarding monetary policy often change over time.
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
              Why is government ownership of Bitcoin problematic?
            </h3>
            <p className="text-gray-300">
              Government ownership of large Bitcoin reserves contradicts Bitcoin's core principles of decentralization
              and individual sovereignty. History shows that governments frequently change policies based on political
              expediency. If a government holds significant Bitcoin reserves, it could manipulate markets, impose regulations
              that favor its holdings, or eventually confiscate citizens' Bitcoin as it has done with gold in the past.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ 