'use client'

import { FC, useState, useEffect } from 'react'
import { Flame, Copy, Check, Eye, EyeOff, RefreshCw, ArrowDown, Code, Info } from 'lucide-react'
import Step from '@/components/Step'

// Define types for our demo
type Wallet = {
  address: string
  privateKeyWIF: string
  balance: number
}

type UTXO = {
  txid: string
  vout: number
  value: number
}

type Transaction = {
  txid: string
  confirmations: number
  type: 'funding' | 'burning'
  amount: number
  burnMessage?: string
  timestamp?: number
}

// Transaction Details Component
const TransactionDetails: FC<{
  utxo?: UTXO;
  burnMessage?: string;
  txid?: string;
  isConfirmed?: boolean;
}> = ({ utxo, burnMessage, txid, isConfirmed = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!utxo && !txid) return null;
  
  // Calculate network fee (simulated)
  const networkFee = utxo ? (utxo.value * 0.0001) : 10000; // 0.01% or 10000 sats
  
  // Format satoshis to BTC
  const formatBTC = (sats: number) => (sats / 100000000).toFixed(8);
  
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-white font-medium flex items-center">
          <Code className="h-4 w-4 mr-2" />
          Technical Transaction Details
        </span>
        <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
          <ArrowDown className="h-4 w-4 text-gray-400" />
        </span>
      </button>
      
      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-white mb-2">Transaction Overview</h4>
            <div className="bg-black/30 rounded p-3 font-mono text-xs">
              <p className="text-gray-300 mb-1">
                <span className="text-gray-500">txid:</span> {txid || `burn_tx_${Math.random().toString(16).slice(2, 10)}`}
              </p>
              <p className="text-gray-300 mb-1">
                <span className="text-gray-500">version:</span> 2
              </p>
              <p className="text-gray-300 mb-1">
                <span className="text-gray-500">size:</span> 224 bytes
              </p>
              <p className="text-gray-300 mb-1">
                <span className="text-gray-500">locktime:</span> 0
              </p>
              <p className="text-gray-300">
                <span className="text-gray-500">status:</span> {isConfirmed ? 'confirmed' : 'unconfirmed'}
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-white mb-2">Input (1)</h4>
            <div className="bg-black/30 rounded p-3 font-mono text-xs">
              <p className="text-gray-300 mb-1">
                <span className="text-gray-500">txid:</span> {utxo?.txid || 'previous_tx_id'}
              </p>
              <p className="text-gray-300 mb-1">
                <span className="text-gray-500">vout:</span> {utxo?.vout || 0}
              </p>
              <p className="text-gray-300 mb-1">
                <span className="text-gray-500">scriptsig:</span> {'<signature> <pubkey>'}
              </p>
              <p className="text-gray-300 mb-1">
                <span className="text-gray-500">sequence:</span> 0xffffffff
              </p>
              <p className="text-gray-300">
                <span className="text-gray-500">witness:</span> []
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-white mb-2">Outputs (2)</h4>
            <div className="space-y-3">
              {/* Change output */}
              <div className="bg-black/30 rounded p-3 font-mono text-xs">
                <p className="text-gray-300 mb-1">
                  <span className="text-gray-500">value:</span> {utxo ? formatBTC(utxo.value - networkFee) : '0.00000000'} BTC
                </p>
                <p className="text-gray-300 mb-1">
                  <span className="text-gray-500">scriptpubkey:</span> {'OP_DUP OP_HASH160 <hash> OP_EQUALVERIFY OP_CHECKSIG'}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-500">type:</span> p2pkh (change address)
                </p>
              </div>
              
              {/* OP_RETURN output */}
              <div className="bg-red-900/20 border-l-4 border-red-500 rounded p-3 font-mono text-xs">
                <p className="text-gray-300 mb-1">
                  <span className="text-gray-500">value:</span> 0.00000000 BTC <span className="text-red-400 font-normal">(BURNED)</span>
                </p>
                <p className="text-gray-300 mb-1">
                  <span className="text-gray-500">scriptpubkey:</span> {'OP_RETURN'} {burnMessage ? `<&quot;${burnMessage}&quot;>` : '<data>'}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-500">type:</span> null-data (provably unspendable)
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700/30 rounded p-3 mt-4">
            <h4 className="text-sm font-medium text-white flex items-center mb-2">
              <Info className="h-4 w-4 mr-1 text-blue-400" />
              How OP_RETURN Works
            </h4>
            <ul className="text-gray-300 text-xs space-y-2">
              <li>• <strong>OP_RETURN</strong> is a Bitcoin script opcode that marks a transaction output as invalid.</li>
              <li>• Coins sent to an OP_RETURN output are provably unspendable and permanently removed from circulation.</li>
              <li>• It allows embedding up to 80 bytes of arbitrary data into the blockchain.</li>
              <li>• This data (like &quot;{burnMessage || 'message'}&quot;) becomes a permanent part of the Bitcoin blockchain.</li>
              <li>• The consensus rules of Bitcoin prevent these outputs from being spent, ensuring they are burned forever.</li>
              <li>• Miners still include these transactions because they collect the transaction fees.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const BurnDemo: FC = () => {
  // Demo state
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [utxos, setUtxos] = useState<UTXO[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [burnMessage, setBurnMessage] = useState('Bitcoin belongs to individuals, not governments')
  const [selectedUtxo, setSelectedUtxo] = useState<UTXO | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [blockHeight, setBlockHeight] = useState(0)

  // Initialize the demo when component mounts
  useEffect(() => {
    initializeDemo()
  }, [])

  // Function to reset and initialize the demo
  const initializeDemo = async () => {
    setIsLoading(true)
    
    try {
      // Call the API to create a new wallet
      const response = await fetch('/api/regtest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'initialize',
          params: {}
        }),
      })
      
      const data = await response.json()
      
      if (data.success && data.wallet) {
        setWallet(data.wallet)
        setUtxos([])
        setTransactions([])
        setBlockHeight(0)
        setCurrentStep(1)
      } else {
        console.error('Failed to initialize wallet:', data.error)
        if (data.details) {
          console.error('Error details:', data.details)
          alert(`Failed to initialize wallet: ${data.details}`)
        } else {
          alert(`Failed to initialize wallet: ${data.error || 'Unknown error'}`)
        }
      }
    } catch (error) {
      console.error('Failed to initialize demo:', error)
      alert(`Failed to initialize demo: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to fund the wallet with test Bitcoin
  const fundWallet = async () => {
    if (!wallet?.address) return
    
    setIsLoading(true)
    
    try {
      // Call the API to fund the wallet
      const response = await fetch('/api/regtest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'fund_wallet',
          params: {
            address: wallet.address
          }
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Update state with new wallet data
        setWallet(data.wallet)
        
        // Add the new UTXO
        setUtxos(prev => [...prev, data.utxo])
        
        // Add the new transaction
        setTransactions(prev => [...prev, data.transaction])
        
        // Move to next step
        setCurrentStep(2)
      } else {
        console.error('Failed to fund wallet:', data.error)
      }
    } catch (error) {
      console.error('Failed to fund wallet:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to mine blocks to confirm transactions
  const mineBlocks = async (count: number = 1) => {
    setIsLoading(true)
    
    try {
      // Call the API to mine blocks
      const response = await fetch('/api/regtest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'mine_blocks',
          params: {
            count
          }
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Update block height
        setBlockHeight(data.blockHeight)
        
        // Update transactions
        setTransactions(data.transactions)
        
        // Update wallet if available
        if (data.wallets && data.wallets.length > 0) {
          // Find the wallet that matches our current wallet address
          const updatedWallet = data.wallets.find((w: Wallet) => w.address === wallet?.address);
          if (updatedWallet) {
            setWallet(updatedWallet);
          }
        }
        
        // Check if a burning transaction has been confirmed
        const confirmedBurnTx = data.transactions.find(
          (tx: Transaction) => tx.type === 'burning' && tx.confirmations >= 1
        );
        
        // If we have a confirmed burn transaction and we're on step 4, complete the step
        if (confirmedBurnTx && currentStep === 4) {
          // Mark demo as complete
          setCurrentStep(5); // Using 5 to indicate completion of all steps
        }
      } else {
        console.error('Failed to mine blocks:', data.error)
      }
    } catch (error) {
      console.error('Failed to mine blocks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to burn Bitcoin
  const burnBitcoin = async () => {
    if (!selectedUtxo || !wallet?.privateKeyWIF) return
    
    setIsLoading(true)
    
    try {
      // Call the API to burn Bitcoin
      const response = await fetch('/api/regtest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'burn_bitcoin',
          params: {
            privateKeyWIF: wallet.privateKeyWIF,
            utxoTxid: selectedUtxo.txid,
            utxoVout: selectedUtxo.vout,
            burnMessage
          }
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Update wallet
        setWallet(data.wallet)
        
        // Add the new transaction
        setTransactions(prev => [...prev, data.transaction])
        
        // Remove the burned UTXO
        setUtxos(prev => prev.filter(utxo => 
          utxo.txid !== selectedUtxo.txid || utxo.vout !== selectedUtxo.vout
        ))
        
        // Reset selected UTXO
        setSelectedUtxo(null)
        
        // Move to next step
        setCurrentStep(4)
      } else {
        console.error('Failed to burn Bitcoin:', data.error)
      }
    } catch (error) {
      console.error('Failed to burn Bitcoin:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section id="demo" className="py-24 px-6 md:px-12 lg:px-16 xl:px-24 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Interactive Bitcoin Burning Demo
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Experience how Bitcoin UTXOs can be permanently removed from circulation through an educational regtest demonstration.
          </p>
        </div>
        
        {/* Steps navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Step 
            number={1} 
            title="Create Wallet" 
            isActive={currentStep >= 1}
            isComplete={currentStep > 1}
          />
          <Step 
            number={2} 
            title="Fund Wallet" 
            isActive={currentStep >= 2}
            isComplete={currentStep > 2}
          />
          <Step 
            number={3} 
            title="Burn Bitcoin" 
            isActive={currentStep >= 3}
            isComplete={currentStep > 3}
          />
          <Step 
            number={4} 
            title="Verify Burn" 
            isActive={currentStep >= 4}
            isComplete={currentStep >= 5}
          />
        </div>
        
        {/* Demo interface */}
        <div className="bg-gray-800 rounded-xl p-6 md:p-8 shadow-xl">
          {/* Wallet information */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Regtest Wallet
              <button 
                onClick={initializeDemo}
                disabled={isLoading}
                className="ml-3 text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded inline-flex items-center"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Reset Demo
              </button>
            </h3>
            
            {wallet ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Address</p>
                  <div className="flex items-center justify-between">
                    <p className="text-white font-mono text-sm truncate mr-2">
                      {wallet.address}
                    </p>
                    <button 
                      onClick={() => copyToClipboard(wallet.address)}
                      className="text-gray-400 hover:text-white"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Private Key (WIF)</p>
                  <div className="flex items-center justify-between">
                    <p className="text-white font-mono text-sm truncate mr-2">
                      {showPrivateKey ? wallet.privateKeyWIF : '••••••••••••••••••••••••••••••••'}
                    </p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setShowPrivateKey(!showPrivateKey)}
                        className="text-gray-400 hover:text-white"
                      >
                        {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button 
                        onClick={() => copyToClipboard(wallet.privateKeyWIF)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700/50 rounded-lg p-4 md:col-span-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Balance</p>
                      <p className="text-xl font-semibold text-white">{wallet.balance.toFixed(8)} BTC</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Block Height</p>
                      <p className="text-xl font-semibold text-white">{blockHeight}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => mineBlocks(1)}
                        disabled={isLoading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Mine Block
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-12">
                <p className="text-gray-400 mb-4">No wallet created yet</p>
                <button
                  onClick={initializeDemo}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating...' : 'Create Regtest Wallet'}
                </button>
              </div>
            )}
          </div>
          
          {/* Fund wallet section */}
          {wallet && currentStep === 1 && (
            <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/30 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Step 1: Fund Your Wallet</h3>
              <p className="text-gray-300 mb-6">
                In a real Bitcoin network, you would need to acquire Bitcoin through an exchange or from another person. 
                In this regtest demo, we can create test Bitcoin for educational purposes.
              </p>
              <button
                onClick={fundWallet}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Funding...' : 'Fund Wallet with 1 Test Bitcoin'}
              </button>
            </div>
          )}
          
          {/* UTXOs section */}
          {wallet && utxos.length > 0 && currentStep >= 2 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Unspent Transaction Outputs (UTXOs)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-700/30 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-700/70">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Transaction ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Output Index</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount (BTC)</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {utxos.map((utxo) => (
                      <tr 
                        key={`${utxo.txid}-${utxo.vout}`}
                        className={`hover:bg-gray-700/50 ${selectedUtxo && selectedUtxo.txid === utxo.txid && selectedUtxo.vout === utxo.vout ? 'bg-orange-900/30 border-l-4 border-orange-500' : ''}`}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-gray-300 truncate max-w-[150px]">
                          {utxo.txid}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {utxo.vout}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {(utxo.value / 100000000).toFixed(8)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          <button
                            onClick={() => {
                              setSelectedUtxo(utxo)
                              setCurrentStep(3)
                            }}
                            className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-xs"
                          >
                            <Flame className="h-3 w-3 mr-1" />
                            Select to Burn
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Burn Bitcoin section */}
          {wallet && selectedUtxo && currentStep === 3 && (
            <div className="bg-gradient-to-r from-orange-900/50 to-red-900/30 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Step 3: Burn Bitcoin</h3>
              <p className="text-gray-300 mb-6">
                Burning Bitcoin means sending it to an OP_RETURN output, making it permanently unspendable.
                This is an irreversible process that removes Bitcoin from circulation forever.
              </p>
              
              <div className="mb-4">
                <label htmlFor="burn-message" className="block text-sm font-medium text-gray-300">
                  Burn Message (will be stored on the blockchain):
                </label>
                <input
                  id="burn-message"
                  type="text"
                  value={burnMessage}
                  onChange={(e) => setBurnMessage(e.target.value)}
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter a message to store with this burn transaction"
                />
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg mb-6">
                <h4 className="text-sm font-semibold text-white mb-2">UTXO to Burn:</h4>
                <p className="font-mono text-xs text-gray-300 mb-1">TXID: {selectedUtxo.txid}</p>
                <p className="font-mono text-xs text-gray-300 mb-1">Output Index: {selectedUtxo.vout}</p>
                <p className="font-mono text-xs text-gray-300">Amount: {(selectedUtxo.value / 100000000).toFixed(8)} BTC</p>
              </div>
              
              {/* Add transaction details component */}
              <TransactionDetails 
                utxo={selectedUtxo}
                burnMessage={burnMessage}
              />
              
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => {
                    setSelectedUtxo(null)
                    setCurrentStep(2)
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={burnBitcoin}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Flame className="h-4 w-4 mr-2" />
                  {isLoading ? 'Burning...' : 'Burn This Bitcoin Forever'}
                </button>
              </div>
            </div>
          )}
          
          {/* Transactions */}
          {wallet && transactions.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Transaction History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-700/30 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-700/70">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Transaction ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount (BTC)</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Confirmations</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {transactions.map((tx) => (
                      <tr key={tx.txid} className={`hover:bg-gray-700/50 ${tx.type === 'burning' ? 'bg-red-900/10' : ''}`}>
                        <td className="px-4 py-3 text-sm">
                          {tx.type === 'funding' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-800">
                              Funding
                            </span>
                          ) : tx.confirmations > 0 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-200 text-purple-800">
                              <Flame className="h-3 w-3 mr-1" />
                              Burned
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-200 text-red-800">
                              <Flame className="h-3 w-3 mr-1" />
                              Burning
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-300 truncate max-w-[150px]">
                          {tx.txid}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {tx.amount.toFixed(8)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {tx.confirmations === 0 ? (
                            <span className="text-yellow-500">Unconfirmed</span>
                          ) : (
                            tx.confirmations
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {tx.type === 'burning' && tx.burnMessage && (
                            <div className="text-xs">
                              <span className="text-gray-400">Message:</span> &quot;{tx.burnMessage}&quot;
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {currentStep === 4 && transactions.some(tx => tx.type === 'burning' && tx.confirmations === 0) && (
                <div className="mt-4 bg-gradient-to-r from-green-900/50 to-green-800/30 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Verify the Burn Transaction</h4>
                  <p className="text-gray-300 mb-4">
                    Your transaction has been created and broadcast to the regtest network. 
                    To confirm it, you need to mine a new block.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => mineBlocks(1)}
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Mining...' : 'Mine Block to Confirm'}
                    </button>
                  </div>
                </div>
              )}
              
              {currentStep === 5 && (
                <div className="mt-4 bg-gradient-to-r from-blue-900/50 to-indigo-800/30 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    <Check className="h-5 w-5 inline-block mr-2 text-green-500" />
                    Bitcoin Successfully Burned!
                  </h4>
                  <p className="text-gray-300 mb-4">
                    Congratulations! You have successfully burned Bitcoin on the regtest network. 
                    The transaction has been confirmed and the Bitcoin is permanently removed from circulation.
                  </p>
                  <div className="bg-black/20 p-4 rounded-lg">
                    <h5 className="text-sm font-semibold text-white mb-2">Transaction Summary:</h5>
                    {transactions.filter(tx => tx.type === 'burning' && tx.confirmations > 0).map(burnTx => (
                      <div key={burnTx.txid} className="text-xs font-mono">
                        <p className="text-gray-300 mb-1"><span className="text-gray-400">Transaction ID:</span> {burnTx.txid}</p>
                        <p className="text-gray-300 mb-1"><span className="text-gray-400">Amount Burned:</span> {burnTx.amount.toFixed(8)} BTC</p>
                        <p className="text-gray-300 mb-1"><span className="text-gray-400">Confirmations:</span> {burnTx.confirmations}</p>
                        <p className="text-gray-300"><span className="text-gray-400">Message:</span> &quot;{burnTx.burnMessage}&quot;</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Show detailed transaction for the burned transaction */}
                  {transactions.filter(tx => tx.type === 'burning' && tx.confirmations > 0).map(burnTx => {
                    const burnUtxo = {
                      txid: burnTx.txid.replace('burn', 'funding'),
                      vout: 0,
                      value: burnTx.amount * 100000000
                    };
                    
                    return (
                      <TransactionDetails 
                        key={burnTx.txid}
                        utxo={burnUtxo}
                        txid={burnTx.txid}
                        burnMessage={burnTx.burnMessage}
                        isConfirmed={true}
                      />
                    );
                  })}
                  
                  <div className="mt-4 bg-gray-800/50 p-4 rounded-lg">
                    <h5 className="text-sm font-semibold text-white mb-2">How to Verify a Burn Transaction:</h5>
                    <ol className="list-decimal list-inside space-y-1 text-gray-300 text-xs">
                      <li>In a Bitcoin explorer, look up the transaction ID shown above</li>
                      <li>Examine the outputs of the transaction</li>
                      <li>A legitimate burn will have an <span className="font-mono">OP_RETURN</span> output script</li>
                      <li>Verify that the <span className="font-mono">OP_RETURN</span> output contains your message data</li>
                      <li>Check that the balance was permanently removed from circulation</li>
                      <li>Confirm the transaction has sufficient confirmations (usually 6+)</li>
                    </ol>
                    <p className="mt-2 text-xs text-gray-400">
                      In real-world usage, properly verifying burns is a critical step to ensure
                      that the Bitcoin was actually made unspendable and not just sent to another address.
                    </p>
                  </div>
                  
                  <div className="mt-4 bg-gray-700/30 rounded-lg p-4">
                    <h5 className="text-sm font-semibold text-white mb-2">Technical Burn Verification Guide:</h5>
                    
                    <div className="space-y-4 text-xs">
                      <div>
                        <h6 className="text-blue-400 font-medium mb-1">Step 1: Decode the Raw Transaction</h6>
                        <div className="bg-black/30 rounded p-2 font-mono">
                          <p className="text-gray-300">$ bitcoin-cli -regtest decoderawtransaction [transaction_hex]</p>
                        </div>
                        <p className="mt-1 text-gray-400">This command shows the complete structure of the transaction including all inputs and outputs.</p>
                      </div>
                      
                      <div>
                        <h6 className="text-blue-400 font-medium mb-1">Step 2: Verify OP_RETURN in scriptPubKey</h6>
                        <div className="bg-black/30 rounded p-2 font-mono">
                          <p className="text-gray-300">
                            &quot;scriptPubKey&quot;: {`{`}<br />
                            &nbsp;&nbsp;&quot;asm&quot;: &quot;OP_RETURN [your_data_hex]&quot;,<br />
                            &nbsp;&nbsp;&quot;type&quot;: &quot;nulldata&quot;,<br />
                            &nbsp;&nbsp;...<br />
                            {`}`}
                          </p>
                        </div>
                        <p className="mt-1 text-gray-400">
                          The <span className="font-mono text-gray-300">type: &quot;nulldata&quot;</span> and 
                          <span className="font-mono text-gray-300"> OP_RETURN</span> in the ASM field 
                          confirm this is a burn output.
                        </p>
                      </div>
                      
                      <div>
                        <h6 className="text-blue-400 font-medium mb-1">Step 3: Decode the Message Data</h6>
                        <div className="bg-black/30 rounded p-2 font-mono">
                          <p className="text-gray-300">$ echo [hex_data] | xxd -r -p</p>
                        </div>
                        <p className="mt-1 text-gray-400">
                          Convert the hex data following the OP_RETURN to ASCII text to verify the message.
                          For example, your message &quot;{transactions.find(tx => tx.type === 'burning')?.burnMessage || burnMessage}&quot; 
                          would appear in the data section after conversion.
                        </p>
                      </div>
                      
                      <div>
                        <h6 className="text-blue-400 font-medium mb-1">Step 4: Confirm Provable Unspendability</h6>
                        <p className="text-gray-400">
                          Bitcoin&apos;s consensus rules define <span className="font-mono text-gray-300">OP_RETURN</span> as 
                          immediately terminating script execution and marking the transaction as invalid. This means 
                          the funds sent to this output can never be spent again, regardless of what data follows the 
                          <span className="font-mono text-gray-300"> OP_RETURN</span> opcode.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={initializeDemo}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                    >
                      <RefreshCw className="h-4 w-4 inline-block mr-1" />
                      Reset Demo
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Educational content */}
        <div className="mt-16 bg-gray-800/50 rounded-xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-white mb-6">
            What Happens When Bitcoin is Burned?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-medium text-orange-500 mb-4">The Technical Process</h4>
              <p className="text-gray-300 mb-3">
                When Bitcoin is &quot;burned,&quot; it&apos;s sent to an OP_RETURN output, which makes it unspendable by design. Here&apos;s what happens:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>A transaction is created that spends a UTXO (Unspent Transaction Output)</li>
                <li>Instead of sending to a normal address, it&apos;s sent to an OP_RETURN script</li>
                <li>The OP_RETURN script can include a small message (up to 80 bytes)</li>
                <li>Network fees are subtracted from the input amount</li>
                <li>The transaction is broadcast and confirmed by miners</li>
                <li>The Bitcoin becomes permanently unspendable</li>
              </ol>
            </div>
            
            <div>
              <h4 className="text-xl font-medium text-orange-500 mb-4">The Philosophical Implications</h4>
              <p className="text-gray-300 mb-3">
                Burning Bitcoin is a powerful statement about ownership, scarcity, and control:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>It demonstrates true ownership - only the owner can decide to burn their Bitcoin</li>
                <li>It increases scarcity by permanently removing Bitcoin from circulation</li>
                <li>It serves as a reminder that individuals, not governments, should control Bitcoin</li>
                <li>It makes a statement that Bitcoin&apos;s value is in its principles, not just its price</li>
                <li>It proves that decentralized systems can&apos;t be controlled by central authorities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BurnDemo 