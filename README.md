# DeFi Dapp with React and Truffle

## Description
This is a **Decentralized Finance (DeFi) Dapp** built with **React** for the frontend and **Truffle** for smart contract development, using **Ganache** for local testing.  

Users can **stake JAM tokens** and earn **Stellar (STE) token rewards**, with a secure token approval system and balance management.

---

## Key Features
- **Token Staking:** Deposit JAM tokens to earn STE rewards.  
- **Unstake:** Safely withdraw staked tokens at any time.  
- **Automatic Rewards:** Reward tokens are distributed automatically based on staking participation.  
- **Owner-Controlled Issuance:** The contract owner can issue STE tokens to all stakers.  
- **User-Friendly Interface:** React frontend with `toast` notifications for transaction updates.  
- **Security:** Balance and allowance checks to prevent transaction errors.


## Technologies Used
- **Frontend:** React, TypeScript, Tailwind CSS  
- **Smart Contracts:** Solidity, Truffle, Ganache  
- **Blockchain Interaction:** Web3.js  

---
## Quick Start 

Follow these steps to get the DeFi Dapp running locally:

## Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** 18 or higher  
- **npm** (Node package manager)  
- **Ganache** (for local blockchain testing)  
- **MetaMask** browser extension (to interact with the Dapp)  
- **Truffle** (globally installed)


```bash
git clone https://github.com/your-username/your-project.git
cd your-project

# Install frontend dependencies
cd DApp-frontend
npm install

# Install truffle dependencies
cd DApp-truffle
npm install

```

## Running the Application

```bash
git clone https://github.com/your-username/your-project.git
cd your-project

# Terminal 1
cd DApp-frontend
npm run dev

# Terminal 2
cd DApp-truffle
truffle compile
truffle migrate

```

## Project Structure

```bash
DApp/
├── frontend/                 # React TypeScript TailwindCSS
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Icons/      # React Icons Components
│   │   │   ├── form-staking.tsx # Form for entering token amounts to stake or withdraw
│   │   │   ├── header.tsx  # Header interface with nav and user address
│   │   ├── hooks/          # Custom React hooks
│   │   ├──context/         # React Contexts for global state management (Web3, User, Tokens, etc.)
│   │   └── services/       # API client services
│   └── package.json
│
├──/DApp-truffle
│    ├── /contracts
│    │ ├── JamToken.sol --> # ERC20 token used for staking
│    │ ├── StellartToken.sol --> # ERC20 token used for rewards
│    │ └── TokenFarm.sol --> # Main staking contract (handles staking, unstaking, and issuing rewards)
│    ├── /migrations
│    │ ├── 1_initial_migration.js --> # Truffle migration for initial setup
│    │ └── 2_deploy_contracts.js --> # Deployment scripts for JamToken, StellartToken, and TokenFarm
│    ├── /test
│    │ └── *.test.js --> # Unit tests for smart contracts
│    ├── /build
│    ├── contracts --> # Compiled contract artifacts (ABIs + bytecode)
│    ├── /scripts --> # Scripts for interacting with smart contracts, e.g., issuing STE tokens
│    ├── truffle-config.js --> # Truffle configuration (networks, compiler version, etc.)
│    └── package.json
```


