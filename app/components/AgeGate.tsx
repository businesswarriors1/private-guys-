"use client";

import { useState, useEffect } from "react";

export default function AgeGate() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const ageVerified = localStorage.getItem("ageVerified");
    const ageGateExpiry = localStorage.getItem("ageGateExpiry");

    if (!ageVerified || !ageGateExpiry || Date.now() > parseInt(ageGateExpiry)) {
      setIsOpen(true);
    }
  }, []);

  const handleEnter = () => {
    localStorage.setItem("ageVerified", "true");
    // Expire after 30 days
    localStorage.setItem("ageGateExpiry", String(Date.now() + 30 * 24 * 60 * 60 * 1000));
    setIsOpen(false);
  };

  const handleLeave = () => {
    setIsExiting(true);
    setTimeout(() => {
      window.location.href = "https://www.google.com";
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "rgba(10, 10, 10, 0.98)" }}
    >
      <div className="w-full max-w-2xl px-6 py-12 text-center">
        <div className="mb-8">
          <h1 className="text-gold-gradient text-6xl md:text-7xl font-heading font-bold mb-4">
            18+
          </h1>
          <div className="w-24 h-1 bg-gradient-gold mx-auto rounded-full"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-text-primary mb-6">
          Age Verification Required
        </h2>

        <p className="text-text-secondary text-lg mb-4 max-w-xl mx-auto">
          This website contains adult content and is strictly for persons aged 18 years or older.
        </p>

        <p className="text-text-muted text-sm mb-12 max-w-xl mx-auto">
          By entering this site, you confirm that you are of legal age in your jurisdiction
          and agree to our Terms of Use and Privacy Policy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleEnter}
            className="px-12 py-4 bg-accent-gold hover:bg-accent-gold-light text-background font-semibold text-lg rounded-lg transition-all duration-200 hover:shadow-gold"
          >
            I am 18+ Enter
          </button>
          <button
            onClick={handleLeave}
            className="px-12 py-4 border border-text-secondary hover:border-red-500 hover:text-red-400 text-text-secondary font-medium text-lg rounded-lg transition-all duration-200"
          >
            I am under 18 Leave
          </button>
        </div>

        <p className="mt-12 text-text-muted text-xs">
          All persons depicted herein were at least 18 years of age at the time of photography.
          <br />
          This site provides classified advertising space only.
        </p>
      </div>
    </div>
  );
}
