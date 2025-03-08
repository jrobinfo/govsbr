# Strategic Bitcoin Reserve (SBR) Project Documentation

## Project Overview

This project demonstrates how governments could theoretically implement a Strategic Bitcoin Reserve (SBR) using various Bitcoin security mechanisms such as multi-signature requirements, timelocks, and Taproot technology. The project consists of two main interactive demos:

1. **Bitcoin Burning Demo**: Demonstrates how Bitcoin UTXOs can be permanently removed from circulation.
2. **Strategic Bitcoin Reserve Demo**: Shows how a government Bitcoin reserve could be secured with multi-signature requirements and timelocks to prevent unauthorized access and political manipulation.

## Technical Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Bitcoin Functionality**: Regtest environment for educational demonstration

## Components Structure

### 1. BurnDemo.tsx

Demonstrates the process of permanently removing Bitcoin from circulation by sending it to an OP_RETURN output.

#### Key Features:
- Wallet creation and initialization
- Funding the wallet with test Bitcoin
- Burning Bitcoin with a custom message
- Transaction verification
- Block mining simulation

#### Main Functions:
- `initializeDemo()`: Sets up a new wallet
- `fundWallet()`: Adds test Bitcoin to the wallet
- `mineBlocks()`: Simulates block confirmation
- `burnBitcoin()`: Demonstrates the burning process

### 2. SBRDemo.tsx

Demonstrates a model for a government Strategic Bitcoin Reserve with multi-signature security and timelock requirements.

#### Key Features:
- Configuration step to set initial parameters
- Multi-signature policy enforcement (2-of-3, 3-of-5, or 171M-of-340M)
- Timelock visualization and simulation
- Policy visualization with interactive nodes
- Activity logging

#### Main Functions:
- `initializeReserve()`: Sets up the reserve with user-defined parameters
- `toggleApproval()`: Handles participant signatures 
- `startTimelock()`: Initiates the timelock countdown
- `decrementTime()`: Fast-forwards time for demonstration
- `resetDemo()`: Resets the demo to initial state

#### Types:
- `Participant`: Represents a signing authority
- `TimeConstraint`: Manages timelock periods
- `ReserveState`: Tracks the reserve status
- `PolicyDetails`: Stores user-selected policy options

## Implementation Progress

### Completed Features

1. **BurnDemo Implementation**:
   - Full implementation of the Bitcoin burning demonstration
   - Interactive wallet and transaction management
   - Educational UI explaining the burning process
   
2. **SBRDemo Base Implementation**:
   - Multi-signature visualization and approval mechanisms
   - Timelock functionality with countdown
   - Policy details and explanations

3. **SBRDemo Enhancements**:
   - Added initial configuration step for users to set:
     - BTC amount (default: 200,000 BTC)
     - Multi-signature policy (2-of-3, 3-of-5, or 171M-of-340M)
     - Timelock period in years (up to 100 years)
     - Taproot support toggle
   - Visual representations adapted to each policy type
   - Time units converted from days to years for better understanding
   - Fast-forward functionality increased to 10 years at a time

### Fixed Issues

1. Error handling for the 171M-of-340M option by creating a specialized visualization
2. Updated time representation from days to years throughout the UI
3. Fixed policy visualization to dynamically adjust based on selected multi-signature policy
4. Added the ability to fast-forward time by 10 years at once (instead of 10 days)
5. Improved log entries to better reflect time progression

## Pending Tasks

1. **Enhanced Visualization Improvements**:
   - Potentially add animations for signature collection
   - Visualize the time passage more dynamically
   - Create a more detailed view of the 171M-of-340M voting process

2. **Educational Content**:
   - Add more detailed explanations about Taproot technology
   - Include references to real-world examples or proposals
   - Add more technical details about the Bitcoin script implementation

3. **Technical Enhancements**:
   - Add actual Bitcoin script generation (beyond just displaying it)
   - Implement actual Miniscript representation of policies
   - Potentially connect to a real Bitcoin testnet for demonstration
   - Add capability to export policy definitions

4. **UI/UX Improvements**:
   - Make the demos more mobile-friendly
   - Add more interactive elements to improve engagement
   - Implement a guided tour/walkthrough for first-time users
   - Add sound effects or notifications for important state changes

5. **Integration Possibilities**:
   - Connect both demos to show how a reserve could be established and then partially burned if needed
   - Create a governance simulator to model policy changes over time
   - Implement a historical events timeline showing theoretical reserve impacts

## How to Run the Project

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Access the demos:
   - Bitcoin Burning Demo: Visit `/burn-demo` route
   - Strategic Bitcoin Reserve Demo: Visit `/sbr-demo` route

## Notes for Future Development

- The current implementation is purely educational and not intended for production use
- The reserve amounts and policies are simulations and would need significant adaptation for real-world use
- The Bitcoin regtest environment is used for demonstration only and doesn't reflect mainnet security requirements
- The 171M-of-340M option is theoretical and would require a custom implementation outside of standard Bitcoin multi-signature capabilities

## Resources for Further Learning

- [Bitcoin Script Documentation](https://en.bitcoin.it/wiki/Script)
- [Taproot Technology Overview](https://bitcoinops.org/en/topics/taproot/)
- [Miniscript Documentation](https://bitcoin.sipa.be/miniscript/)
- [Time-locked Transactions in Bitcoin](https://en.bitcoin.it/wiki/Timelock)
- [BIP-0341: Taproot](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki)
- [BIP-0342: Tapscript](https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki)

## Project Contributors

- Current developer team
- Special thanks to the Bitcoin development community for creating the technologies demonstrated

---

*Last updated: May 3, 2023* 