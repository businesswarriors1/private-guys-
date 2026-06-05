"use client";

import Link from "next/link";
import { useState } from "react";

const locations = {
  "New South Wales": [
    "Sydney",
    "Newcastle",
    "Wollongong",
    "Central Coast",
    "Byron Bay",
    "Coffs Harbour",
  ],
  Queensland: [
    "Brisbane",
    "Gold Coast",
    "Sunshine Coast",
    "Cairns",
    "Surfers Paradise",
    "Townsville",
  ],
  Victoria: [
    "Melbourne",
    "Geelong",
    "Ballarat",
    "Mornington Peninsula",
    "Shepparton",
    "Mildura",
  ],
  "Western Australia": [
    "Perth",
    "Bunbury",
    "Mandurah",
    "Geraldton",
    "Broome",
    "Albany",
  ],
  "South Australia": ["Adelaide", "Riverland"],
  Tasmania: ["Hobart", "Launceston", "Devonport", "Strahan"],
  "Northern Territory": ["Darwin", "Katherine"],
  ACT: ["Canberra"],
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/search", label: "Advanced Search" },
];

function toSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-gold/35 bg-accent-gold/10 font-heading text-lg font-bold text-accent-gold shadow-gold">
            PG
          </span>
          <span className="leading-none">
            <span className="block font-heading text-2xl font-bold text-gold-gradient">
              Private Guys
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em] text-text-muted group-hover:text-accent-gold">
              Australia
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.slice(0, 1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-bold uppercase tracking-[0.18em] text-text-secondary transition-colors hover:text-accent-gold"
            >
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <button className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-text-secondary transition-colors hover:text-accent-gold">
              Locations
              <span aria-hidden>v</span>
            </button>

            {isMenuOpen && (
              <div className="absolute left-1/2 top-full w-[58rem] -translate-x-1/2 pt-6">
                <div className="luxury-panel p-6">
                  <div className="mb-5 flex items-end justify-between gap-6 border-b border-white/10 pb-5">
                    <div>
                      <span className="brand-kicker">Browse Australia</span>
                      <p className="mt-3 max-w-xl text-sm text-text-secondary">
                        Find verified advertisers by city, then compare New,
                        Premium and Platinum placement.
                      </p>
                    </div>
                    <Link
                      href="/search"
                      className="rounded-full border border-accent-gold/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-accent-gold transition-colors hover:bg-accent-gold hover:text-background"
                    >
                      Open search
                    </Link>
                  </div>

                  <div className="grid grid-cols-4 gap-5">
                    {Object.entries(locations).map(([state, cities]) => (
                      <div key={state}>
                        <Link
                          href={`/location/${toSlug(state)}`}
                          className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-accent-gold transition-colors hover:text-accent-gold-light"
                        >
                          {state}
                        </Link>
                        <ul className="space-y-1.5">
                          {cities.map((city) => (
                            <li key={city}>
                              <Link
                                href={`/${toSlug(city)}`}
                                className="block text-sm text-text-secondary transition-colors hover:text-text-primary"
                              >
                                {city}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-bold uppercase tracking-[0.18em] text-text-secondary transition-colors hover:text-accent-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/login"
            className="text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-accent-gold px-5 py-2.5 text-sm font-bold text-background transition-colors hover:bg-accent-gold-light"
          >
            Register
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-sm font-bold uppercase tracking-widest text-text-primary lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span className="relative flex h-5 w-5 flex-col justify-center gap-1.5" aria-hidden>
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-background lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-5 sm:px-6" aria-label="Mobile">
            <div className="grid gap-3">
              {[...navLinks, { href: "/login", label: "Login" }, { href: "/register", label: "Register" }].map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border-b border-white/10 py-3 text-sm font-bold uppercase tracking-[0.18em] text-text-secondary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {Object.entries(locations)
                .flatMap(([, cities]) => cities.slice(0, 1))
                .map((city) => (
                  <Link
                    key={city}
                    href={`/${toSlug(city)}`}
                    className="rounded-xl border border-white/10 bg-background-card px-4 py-3 text-sm text-text-secondary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {city}
                  </Link>
                ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
