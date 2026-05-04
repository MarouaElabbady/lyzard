import React, { useState } from "react";
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import WhySection from "./components/landing/WhySection";
import WhoIsItFor from "./components/landing/WhoIsItFor";
import CardsCarousel from "./components/landing/CardsCarousel";
import Pricing from "./components/landing/Pricing";
import { SocialConnect } from "./components/landing/ConnectWithUs";
import MasonryGrid from "./components/landing/MasonryGrid";
import Toast from "./components/Toast";
import { SignInCard } from "./components/auth/SignInCard";
import { AnimatePresence } from "framer-motion";
import Footer from "./components/landing/Footer";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/20">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      
      <main>
        <Hero />
        <WhySection />
        <WhoIsItFor />
        <CardsCarousel onLoginClick={() => setShowLogin(true)} />
        <Pricing onLoginClick={() => setShowLogin(true)} />
        <MasonryGrid onLoginClick={() => setShowLogin(true)} />
      </main>
      
      <SocialConnect />

      <Footer onLoginClick={() => setShowLogin(true)} />

      <Toast />

      <AnimatePresence>
        {showLogin && (
          <SignInCard isModal onClose={() => setShowLogin(false)} />
        )}
      </AnimatePresence>
    </div>
  );

}

export default App;
