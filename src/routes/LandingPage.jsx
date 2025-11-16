
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, HandCoins, ReceiptText, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-background font-sans text-foreground">

      {/* Hero Section */}
      <div className="relative text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop"
          alt="Modern House"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/85"></div>
        <div className="relative z-10 container mx-auto flex flex-col items-center justify-center min-h-[80vh] py-20 px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
            The Future of Real Estate.
          </h1>
          <p className="mt-2 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            A decentralized, zero-fee marketplace for buying and renting properties, powered by IOTA.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link 
              to="/explore" 
              className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg hover:bg-primary/80 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_var(--color-primary)] flex items-center justify-center gap-2"
            >
              Explore Properties <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-20 px-4 container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">A New Era of Real Estate</h2>
          <p className="text-muted-foreground mt-2">Experience the benefits of a decentralized marketplace.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-xl p-8 text-center transition-all duration-300 shadow-lg hover:border-primary/50 hover:-translate-y-2 hover:shadow-[0_0_15px_var(--color-primary)]">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full mx-auto flex items-center justify-center mb-4">
              <ShoppingCart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mt-4">Buy & Rent Securely</h3>
            <p className="text-muted-foreground mt-2">Utilize our secure escrow system for feeless, peer-to-peer transactions.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-8 text-center transition-all duration-300 shadow-lg hover:border-accent/50 hover:-translate-y-2 hover:shadow-[0_0_15px_var(--color-accent)]">
            <div className="w-16 h-16 bg-accent/10 text-accent rounded-full mx-auto flex items-center justify-center mb-4">
              <HandCoins className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mt-4">Zero Gas Fees</h3>
            <p className="text-muted-foreground mt-2">Leverage the IOTA Tangle for completely fee-free transactions. Keep what you earn.</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-8 text-center transition-all duration-300 shadow-lg hover:border-primary/50 hover:-translate-y-2 hover:shadow-[0_0_15px_var(--color-primary)]">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full mx-auto flex items-center justify-center mb-4">
              <ReceiptText className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mt-4">NFT-Based Receipts</h3>
            <p className="text-muted-foreground mt-2">Receive a unique NFT as a verifiable, on-chain receipt for every transaction.</p>
          </div>
        </div>
      </div>

      {/* Web3 Explanation Section */}
       <div className="py-20 px-4 bg-card/50">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold">The Power of Web3</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            PropaTradex is built on Web3 principles, giving you full control over your assets. By removing intermediaries, we ensure a more secure, transparent, and efficient real estate market for everyone. Your ownership is digitally guaranteed and your transactions are immutable.
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold">Begin Your Journey</h2>
          <p className="mt-2 text-muted-foreground">The perfect property is waiting for you. Connect your wallet and start exploring.</p>
          <div className="mt-8">
            <Link to="/explore" className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg hover:bg-primary/80 transition duration-300 transform hover:scale-105 shadow-[0_0_20px_var(--color-primary)]">
              Explore Listings
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
