"use client";

import Link from "next/link";
import { useState } from "react";

const locations = {
  "New South Wales": [
    "Sydney", "Newcastle", "Wollongong", "Central Coast", "Byron Bay",
    "Coffs Harbour", "Parramatta", "Bondi Junction", "Port Macquarie",
    "Wagga Wagga", "Albury", "Tamworth"
  ],
  "Queensland": [
    "Brisbane", "Gold Coast", "Sunshine Coast", "Cairns", "Surfers Paradise",
    "Townsville", "Toowoomba", "Mackay", "Rockhampton", "Airlie Beach",
    "Port Douglas"
  ],
  "Victoria": [
    "Melbourne", "Geelong", "Ballarat", "Mornington Peninsula", "Shepparton",
    "Mildura", "Echuca", "Phillip Island"
  ],
  "Western Australia": [
    "Perth", "Bunbury", "Mandurah", "Geraldton", "Broome", "Albury",
    "Busselton", "Kalgoorlie", "Margaret River", "Port Hedland"
  ],
  "South Australia": ["Adelaide", "Riverland"],
  "Tasmania": ["Hobart", "Launceston", "Devonport", "Strahan"],
  "Northern Territory": ["Darwin", "Katherine"],
  "ACT": ["Canberra"],
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setActiveState] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-heading font-bold text-gold-gradient">
              Private
            </span>
            <span className="text-2xl font-heading font-bold text-text-primary">
              Guys
            </span>
            <span className="text-xs text-accent-gold font-medium ml-1">AU</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-text-primary hover:text-accent-gold transition-colors text-sm font-medium uppercase tracking-wider"
            >
              Home
            </Link>

            {/* Locations Mega Menu */}
            <div
              className="relative group"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => {
                setIsMenuOpen(false);
                setActiveState(null);
              }}
            >
              <button className="text-text-primary hover:text-accent-gold transition-colors text-sm font-medium uppercase tracking-wider flex items-center gap-1">
                Locations
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                  <div className="glass-card rounded-xl p-6 min-w-[800px]">
                    <div className="grid grid-cols-4 gap-6">
                      {Object.entries(locations).map(([state, cities]) => (
                        <div key={state}>
                          <h3 className="text-accent-gold font-semibold text-sm mb-3 uppercase tracking-wider">
                            {state}
                          </h3>
                          <ul className="space-y-1">
                            {cities.slice(0, 6).map((city) => (
                              <li key={city}>
                                <Link
                                  href={`/${city.toLowerCase().replace(/\s+/g, "-")}`}
                                  className="text-text-secondary hover:text-text-primary text-sm transition-colors block py-0.5"
                                >
                                  {city}
                                </Link>
                              </li>
                            ))}
                            {cities.length > 6 && (
                              <li>
                                <Link
                                  href={`/location/${state.toLowerCase().replace(/\s+/g, "-")}`}
                                  className="text-accent-gold text-xs hover:underline"
                                >
                                  View all {cities.length} cities →
                                </Link>
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="text-text-primary hover:text-accent-gold transition-colors text-sm font-medium uppercase tracking-wider"
            >
              Blog
            </Link>
            <Link
              href="/search"
              className="text-text-primary hover:text-accent-gold transition-colors text-sm font-medium uppercase tracking-wider"
            >
              Advanced Search
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="hidden sm:block text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-accent-gold hover:bg-accent-gold-light text-background px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
