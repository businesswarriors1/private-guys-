"use client";

import { useState } from "react";
import { australianLocations } from "@/app/types";

const heroStats = [
  { label: "Verified-first", value: "18+" },
  { label: "Australian locations", value: "45+" },
  { label: "Placement tiers", value: "4" },
];

function toSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export default function Hero() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const cityOptions = selectedState
    ? australianLocations.find((loc) => loc.state === selectedState)?.cities || []
    : [];

  const handleSearch = () => {
    if (selectedCity) {
      window.location.href = `/${toSlug(selectedCity)}`;
    }
  };

  return (
    <section className="premium-shell relative min-h-[92vh] overflow-hidden pt-28">
      <div
        className="absolute inset-0 opacity-[0.34]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2200&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/65 via-background/88 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-wine/45 via-transparent to-accent-gold/14" />

      <div className="relative z-10 mx-auto grid min-h-[calc(92vh-7rem)] max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <span className="brand-kicker">PrivateGuys.com.au</span>
          <h1 className="mt-7 max-w-4xl font-heading text-5xl font-semibold leading-[0.95] tracking-tight text-text-primary sm:text-7xl lg:text-8xl">
            Verified male companion advertising across Australia.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-text-secondary">
            A premium classified directory for independent adult advertisers,
            designed around location, verification and paid placement.
          </p>

          <div className="mt-9 grid max-w-2xl grid-cols-3 border-y border-white/10">
            {heroStats.map((stat) => (
              <div key={stat.label} className="border-r border-white/10 py-5 last:border-r-0">
                <p className="font-heading text-3xl font-semibold text-gold-gradient sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="luxury-panel p-5 sm:p-7">
          <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-6">
            <div>
              <span className="brand-kicker">Start by location</span>
              <h2 className="mt-4 font-heading text-3xl font-semibold text-text-primary sm:text-4xl">
                Browse verified listings.
              </h2>
            </div>
            <div className="hidden rounded-full border border-accent-gold/35 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-gold sm:block">
              18+ only
            </div>
          </div>

          <div className="mt-7 grid gap-4">
            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">
                State or territory
              </span>
              <select
                value={selectedState}
                onChange={(event) => {
                  setSelectedState(event.target.value);
                  setSelectedCity("");
                }}
                className="h-14 w-full rounded-xl border border-white/10 bg-background-elevated px-4 text-text-primary outline-none transition-colors focus:border-accent-gold"
              >
                <option value="">Select state</option>
                {australianLocations.map((location) => (
                  <option key={location.state} value={location.state}>
                    {location.state}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">
                City or region
              </span>
              <select
                value={selectedCity}
                onChange={(event) => setSelectedCity(event.target.value)}
                disabled={!selectedState}
                className="h-14 w-full rounded-xl border border-white/10 bg-background-elevated px-4 text-text-primary outline-none transition-colors focus:border-accent-gold disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select city</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-3 pt-2 sm:grid-cols-[1fr_auto]">
              <button
                onClick={handleSearch}
                disabled={!selectedCity}
                className="h-14 rounded-full bg-accent-gold px-7 text-sm font-bold uppercase tracking-[0.16em] text-background transition-colors hover:bg-accent-gold-light disabled:cursor-not-allowed disabled:bg-text-muted"
              >
                Search companions
              </button>
              <a
                href="/search"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-bold uppercase tracking-[0.16em] text-text-primary transition-colors hover:border-accent-gold hover:text-accent-gold"
              >
                Advanced
              </a>
            </div>
          </div>

          <div className="mt-7 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
            {["New listings", "Premium first", "Platinum spotlight"].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-text-primary">{item}</p>
                <p className="mt-2 text-xs leading-5 text-text-muted">
                  Placement that mirrors the PrivateGirls tier model.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
