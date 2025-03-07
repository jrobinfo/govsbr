# Bitcoin UTXO Burner Educational Website

An interactive educational website that demonstrates how Bitcoin UTXOs can be permanently removed from circulation through burning, and why Bitcoin belongs to individuals, not governments.

## Project Overview

This project was created to educate users about:

1. The technical process of burning Bitcoin UTXOs using OP_RETURN outputs
2. Why Bitcoin's true power lies with individuals, not centralized authorities
3. The problems with government-owned Bitcoin reserves
4. How to interact with Bitcoin in a regtest environment

The site includes an interactive demo that allows users to create wallets, fund them with test Bitcoin, burn the Bitcoin with custom messages, and verify the burn transactions - all in a safe, educational regtest environment.

## Features

- **Interactive Demo**: Create wallets, fund them, burn Bitcoin, mine blocks, and view transactions
- **Educational Content**: Learn about Bitcoin fundamentals and the philosophical implications of Bitcoin sovereignty
- **Responsive Design**: Fully responsive UI that works on mobile and desktop
- **Server-side API**: Simulated Bitcoin regtest environment through Next.js API routes

## Technical Stack

- **Frontend**: React, Next.js 15, TypeScript, Tailwind CSS
- **Bitcoin Libraries**: bitcoinjs-lib, ecpair, tiny-secp256k1
- **Icons**: Lucide React
- **API**: Next.js API routes for the simulated regtest environment

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bitcoin-utxo-burner.git
cd bitcoin-utxo-burner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

## Troubleshooting

### API Errors

If you encounter errors with the Bitcoin libraries in the API routes:

1. Make sure you're using the correct import syntax for tiny-secp256k1:
```javascript
// Change this:
import ecc from 'tiny-secp256k1'

// To this:
import * as ecc from 'tiny-secp256k1'
```

2. If you're still having issues, try using the following alternative setup in `src/app/api/regtest/route.ts`:
```javascript
import * as bitcoin from 'bitcoinjs-lib'
import { ECPairFactory } from 'ecpair'
import * as ecc from 'tiny-secp256k1'

// Initialize ECPair factory
const ECPair = ECPairFactory(ecc)
```

### Component Not Found Errors

If you see errors about components not being found, check your import paths:

1. Make sure all component imports use the correct path
2. The Step component import in BurnDemo.tsx should be:
```javascript
import Step from '@/components/Step'
```

## Project Structure

- `src/app/page.tsx`: Main page component
- `src/components/`: React components for the UI
- `src/app/api/regtest/`: API routes for the Bitcoin regtest simulation

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This software is provided "as is", without warranty of any kind. This project is for educational purposes only and should not be used to burn actual Bitcoin on mainnet without fully understanding the consequences.

## Credits

- Bitcoin UTXO Burner code adapted from the Bitcoin_UTXO_Burner project
- Thanks to the bitcoinjs-lib and ecpair libraries for making Bitcoin development in JavaScript possible
- Quote by Luke Dashjr on why governments shouldn't hold Bitcoin reserves
