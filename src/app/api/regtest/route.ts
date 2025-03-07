import { NextRequest, NextResponse } from 'next/server'
import * as bitcoin from 'bitcoinjs-lib'
import { ECPairFactory } from 'ecpair'
import * as ecc from 'tiny-secp256k1'

// Initialize ECPair factory
const ECPair = ECPairFactory(ecc)

// Use regtest network
const NETWORK = bitcoin.networks.regtest

// Define types
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
  timestamp: number
}

// In-memory storage for simulation (would use a database in production)
const wallets = new Map<string, Wallet>()
const utxos = new Map<string, UTXO[]>()
const transactions = new Map<string, Transaction>()
let blockHeight = 0

export async function POST(request: NextRequest) {
  try {
    const { action, params } = await request.json()

    switch (action) {
      case 'initialize':
        return handleInitialize()
      case 'fund_wallet':
        return handleFundWallet(params.address)
      case 'mine_blocks':
        return handleMineBlocks(params.count || 1)
      case 'burn_bitcoin':
        return handleBurnBitcoin(params.privateKeyWIF, params.utxoTxid, params.utxoVout, params.burnMessage)
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Handler functions
async function handleInitialize() {
  try {
    // Create a new wallet
    const keyPair = ECPair.makeRandom({ network: NETWORK })
    const { address } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: NETWORK })
    
    const wallet: Wallet = {
      address: address as string,
      privateKeyWIF: keyPair.toWIF(),
      balance: 0
    }
    
    // Store wallet in memory
    if (address) {
      wallets.set(address, wallet)
    }
    
    return NextResponse.json({
      success: true,
      wallet
    })
  } catch (error) {
    console.error('Failed to initialize wallet:', error)
    return NextResponse.json({ error: 'Failed to initialize wallet' }, { status: 500 })
  }
}

async function handleFundWallet(address: string) {
  try {
    if (!address || !wallets.has(address)) {
      return NextResponse.json({ error: 'Invalid address' }, { status: 400 })
    }
    
    // Create a test transaction
    const txid = `regtest${Math.random().toString(16).slice(2, 10)}`
    const amount = 100000000 // 1 BTC in satoshis
    
    // Create a UTXO
    const utxo: UTXO = {
      txid,
      vout: 0,
      value: amount
    }
    
    // Store UTXO in memory
    const addressUtxos = utxos.get(address) || []
    utxos.set(address, [...addressUtxos, utxo])
    
    // Create transaction record
    const tx: Transaction = {
      txid,
      confirmations: 0,
      type: 'funding',
      amount: amount / 100000000, // Convert to BTC
      timestamp: Date.now()
    }
    
    // Store transaction
    transactions.set(txid, tx)
    
    // Update wallet balance
    const wallet = wallets.get(address)
    if (wallet) {
      wallet.balance += amount / 100000000
      wallets.set(address, wallet)
    }
    
    return NextResponse.json({
      success: true,
      transaction: tx,
      utxo,
      wallet: wallets.get(address)
    })
  } catch (error) {
    console.error('Failed to fund wallet:', error)
    return NextResponse.json({ error: 'Failed to fund wallet' }, { status: 500 })
  }
}

async function handleMineBlocks(count: number) {
  try {
    // Increase block height
    blockHeight += count
    
    // Update transaction confirmations
    for (const [txid, tx] of transactions.entries()) {
      tx.confirmations += count
      transactions.set(txid, tx)
    }
    
    return NextResponse.json({
      success: true,
      blockHeight,
      transactions: Array.from(transactions.values())
    })
  } catch (error) {
    console.error('Failed to mine blocks:', error)
    return NextResponse.json({ error: 'Failed to mine blocks' }, { status: 500 })
  }
}

async function handleBurnBitcoin(privateKeyWIF: string, utxoTxid: string, utxoVout: number, burnMessage: string) {
  try {
    // Validate inputs
    if (!privateKeyWIF || !utxoTxid) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }
    
    // Decode private key
    const keyPair = ECPair.fromWIF(privateKeyWIF, NETWORK)
    const { address } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: NETWORK })
    
    if (!address || !wallets.has(address)) {
      return NextResponse.json({ error: 'Invalid private key' }, { status: 400 })
    }
    
    // Find UTXO
    const addressUtxos = utxos.get(address) || []
    const utxo = addressUtxos.find((u: UTXO) => u.txid === utxoTxid && u.vout === utxoVout)
    
    if (!utxo) {
      return NextResponse.json({ error: 'UTXO not found' }, { status: 400 })
    }
    
    // Create burn transaction
    const burnTxid = `burn${Math.random().toString(16).slice(2, 10)}`
    
    // In a real implementation, we would create a real Bitcoin transaction with OP_RETURN here
    
    // Create transaction record
    const tx: Transaction = {
      txid: burnTxid,
      confirmations: 0,
      type: 'burning',
      amount: utxo.value / 100000000, // Convert to BTC
      burnMessage,
      timestamp: Date.now()
    }
    
    // Store transaction
    transactions.set(burnTxid, tx)
    
    // Remove the UTXO
    utxos.set(
      address, 
      addressUtxos.filter((u: UTXO) => !(u.txid === utxoTxid && u.vout === utxoVout))
    )
    
    // Update wallet balance
    const wallet = wallets.get(address)
    if (wallet) {
      wallet.balance -= utxo.value / 100000000
      wallets.set(address, wallet)
    }
    
    return NextResponse.json({
      success: true,
      transaction: tx,
      wallet: wallets.get(address)
    })
  } catch (error) {
    console.error('Failed to burn Bitcoin:', error)
    return NextResponse.json({ error: 'Failed to burn Bitcoin' }, { status: 500 })
  }
}

// Helper route to get current state for debugging
export async function GET() {
  return NextResponse.json({
    wallets: Array.from(wallets.entries()),
    utxos: Array.from(utxos.entries()),
    transactions: Array.from(transactions.values()),
    blockHeight
  })
} 