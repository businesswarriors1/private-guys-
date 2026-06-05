"use client";

import { useState } from "react";
import { australianLocations } from "@/app/types";

export default function Hero() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const stateOptions = australianLocations.map((loc) => loc.state);
  const cityOptions = selectedState
    ? australianLocations.find((loc) => loc.state === selectedState)?.cities || []
    : [];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
  };

  const handleSearch = () => {
    if (selectedCity) {
      window.location.href = `/${selectedCity.toLowerCase().replace(/\s+/g, "-")}`;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-elevated to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-gold/5 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-4">
            <span className="text-gold-gradient">Private</span>
            <span className="text-text-primary"> Guys</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary font-light">
            Australia&apos;s Premier Male Companion Directory
          </p>
        </div>

        <div className="glass-card-gold rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-text-muted text-sm mb-2 text-left">State</label>
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="w-full bg-background-elevated border border-border-default rounded-lg px-4 py-3 text-text-primary focus:border-accent-gold focus:outline-none"
              >
                <option value="">Select State</option>
                {stateOptions.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-text-muted text-sm mb-2 text-left">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
                className="w-full bg-background-elevated border border-border-default rounded-lg px-4 py-3 text-text-primary focus:border-accent-gold focus:outline-none disabled:opacity-50"
              >
                <option value="">Select City</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSearch}
              disabled={!selectedCity}
              className="flex-1 bg-accent-gold hover:bg-accent-gold-light disabled:bg-text-muted disabled:cursor-not-allowed text-background font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Search Companions
            </button>
            <a
              href="/search"
              className="flex-1 border border-text-secondary hover:border-accent-gold hover:text-accent-gold text-text-secondary font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Advanced Search
            </a>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="#listings"
            className="inline-flex flex-col items-center text-text-muted hover:text-accent-gold transition-colors"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <svg
              className="w-6 h-6 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
