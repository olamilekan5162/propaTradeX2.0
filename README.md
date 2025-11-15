# PropaTradex

**Decentralized real estate marketplace with secure escrow and transparent transactions on IOTA blockchain.**

## Overview

PropaTradex is a blockchain-powered real estate platform that enables secure property sales and rentals without intermediaries. Built on **IOTA blockchain**, it provides trustless escrow services, automated ownership transfers, and fair dispute resolution—making real estate transactions transparent and accessible to everyone.

## Core Features

- **Unified Listings** – List properties for sale or rent in one seamless interface.
- **Secure Escrow** – Funds locked in smart contracts until both parties confirm satisfaction.
- **Automatic Ownership Transfer** – Property ownership transfers instantly upon successful sale.
- **IPFS Document Storage** – Property documents, images, and videos stored securely off-chain.
- **Rental Management** – Automated rental period tracking with automatic expiration.
- **Dispute Resolution** – Fair admin-mediated resolution when issues arise.
- **Receipt NFTs** – Immutable proof of transactions minted for all parties.
- **Auto-Verified KYC** – User profiles verified automatically upon registration.

## Real Use Case: Alice Buys a Home

Alice finds a property listed by Bob on PropaTradex. She deposits the purchase amount into escrow. Bob confirms he's ready to transfer the property. Alice inspects and confirms satisfaction. The smart contract automatically:

- Releases payment to Bob
- Transfers property ownership to Alice
- Mints receipt NFTs for both parties

All transparent, secure, and instant—no middlemen, no delays.

## How It Works

1. **Users register** with KYC details (auto-verified).
2. **Sellers list properties** with prices, images, videos, and documents.
3. **Buyers/renters deposit funds** into escrow smart contracts.
4. **Both parties confirm** when satisfied with the transaction.
5. **Smart contract executes**:
   - Releases funds to seller
   - Transfers ownership (for sales)
   - Tracks rental period (for rentals)
   - Mints receipt NFTs
6. **Disputes resolved** by platform admins if needed.

## User Types

- **Sellers/Landlords**: List properties, confirm delivery, receive payments.
- **Buyers/Renters**: Browse listings, deposit funds, confirm receipt.
- **Admins**: Resolve disputes, ensure platform integrity.

Each user has a dashboard accessible after connecting their IOTA wallet.

## Tech Stack

| Layer                  | Technology                                  |
| ---------------------- | ------------------------------------------- |
| **Blockchain**         | IOTA blockchain (smart contracts in Move)   |
| **Frontend**           | React.js, TypeScript, TailwindCSS           |
| **Wallet Integration** | IOTA Wallet, @iota/dapp-kit                 |
| **Storage**            | IPFS via Pinata (documents, images, videos) |
| **State Management**   | @tanstack/react-query                       |
| **Build Tool**         | Vite                                        |

## Getting Started

**Prerequisites:**

- [Node.js](https://nodejs.org/) (v18+)
- [IOTA CLI](https://docs.iota.org/developer/getting-started/install-iota)
- [IOTA Wallet Extension](https://chromewebstore.google.com/detail/iota-wallet/...)
- [Pinata Account](https://pinata.cloud/) (optional, for IPFS)

**Installation & Running:**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/freedteck/propatrade.git
   cd propatradex
   ```

2. **Install frontend dependencies:**

   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `frontend` directory:

   ```env
   VITE_PINATA_JWT=<YOUR_PINATA_JWT>
   VITE_PINATA_GATEWAY=<YOUR_PINATA_GATEWAY_URL>
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173` in your browser.

## Project Structure

```
propatradex/
├── contracts/
│   └── sources/
│       └── propatradex.move       # Smart contract
├── frontend/
│   ├── src/
│   │   ├── components/            # React components
│   │   ├── pages/                 # Application pages
│   │   └── App.tsx                # Main app
│   └── package.json
├── README.md
└── Move.toml
```

## Testing

### Manual Testing Workflow

1. **Register as a user** with your KYC details
2. **List a property** (sale or rent) with images and details
3. **Switch accounts** and browse the marketplace
4. **Deposit funds** to initiate a purchase/rental
5. **Confirm as seller** to release the property
6. **Confirm as buyer** to release funds
7. **Verify** ownership transfer and receipt NFTs

## Contributing

We're building transparent real estate with community at the core. If you're a:

- Web3 developer (Move, React, smart contracts)
- Real estate tech enthusiast
- Designer, tester, or user

Feel free to contribute or join the discussion.

**GitHub Repository:** [GitHub](https://github.com/freedteck/propatrade)

## License

This project is licensed under **MIT License**. See the [LICENSE](LICENSE) file for details.

---

**Built on IOTA Blockchain – Making real estate accessible and transparent for everyone.**
