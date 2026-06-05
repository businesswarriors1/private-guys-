"use client";

import { useState } from "react";
import AgeGate from "@/app/components/AgeGate";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ListingCard from "@/app/components/cards/ListingCard";
import { mockListings } from "@/app/data/mockListings";
import { attributes, australianLocations } from "@/app/types";

export default function SearchPage() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedBuild, setSelectedBuild] = useState<string>("");

  const cityOptions = selectedState
    ? australianLocations.find((loc) => loc.state === selectedState)?.cities || []
    : [];

  const filteredListings = mockListings.filter((listing) => {
    if (selectedState && listing.state !== selectedState) return false;
    if (selectedCity && listing.city !== selectedCity) return false;
    if (selectedTier && listing.tier !== selectedTier) return false;
    if (selectedAge && listing.ageRange !== selectedAge) return false;
    if (selectedBuild && listing.build !== selectedBuild) return false;
    return true;
  });

  return (
    <>
      <AgeGate />
      <Header />
      <main className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-8">
            Advanced Search
          </h1>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-text-primary mb-6">
                  Filters
                </h2>

                <div className="space-y-6">
                  {/* State Filter */}
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">
                      State
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        setSelectedCity("");
                      }}
                      className="w-full bg-background-elevated border border-border-default rounded-lg px-3 py-2 text-text-primary text-sm focus:border-accent-gold focus:outline-none"
                    >
                      <option value="">All States</option>
                      {australianLocations.map((loc) => (
                        <option key={loc.state} value={loc.state}>
                          {loc.state}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City Filter */}
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">
                      City
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={!selectedState}
                      className="w-full bg-background-elevated border border-border-default rounded-lg px-3 py-2 text-text-primary text-sm focus:border-accent-gold focus:outline-none disabled:opacity-50"
                    >
                      <option value="">All Cities</option>
                      {cityOptions.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tier Filter */}
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">
                      Tier
                    </label>
                    <select
                      value={selectedTier}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      className="w-full bg-background-elevated border border-border-default rounded-lg px-3 py-2 text-text-primary text-sm focus:border-accent-gold focus:outline-none"
                    >
                      <option value="">All Tiers</option>
                      <option value="platinum">Platinum</option>
                      <option value="premium">Premium</option>
                      <option value="standard">Standard</option>
                      <option value="free">Free</option>
                    </select>
                  </div>

                  {/* Age Range */}
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">
                      Age Range
                    </label>
                    <select
                      value={selectedAge}
                      onChange={(e) => setSelectedAge(e.target.value)}
                      className="w-full bg-background-elevated border border-border-default rounded-lg px-3 py-2 text-text-primary text-sm focus:border-accent-gold focus:outline-none"
                    >
                      <option value="">Any Age</option>
                      {attributes.ageRange.map((age) => (
                        <option key={age} value={age}>
                          {age}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Build */}
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">
                      Build
                    </label>
                    <select
                      value={selectedBuild}
                      onChange={(e) => setSelectedBuild(e.target.value)}
                      className="w-full bg-background-elevated border border-border-default rounded-lg px-3 py-2 text-text-primary text-sm focus:border-accent-gold focus:outline-none"
                    >
                      <option value="">Any Build</option>
                      {attributes.build.map((build) => (
                        <option key={build} value={build}>
                          {build}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={() => {
                      setSelectedState("");
                      setSelectedCity("");
                      setSelectedTier("");
                      setSelectedAge("");
                      setSelectedBuild("");
                    }}
                    className="w-full border border-text-secondary text-text-secondary hover:border-accent-gold hover:text-accent-gold py-2 px-4 rounded-lg text-sm transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-text-secondary">
                  Showing {filteredListings.length} results
                </p>
                <select className="bg-background-elevated border border-border-default rounded-lg px-3 py-2 text-text-primary text-sm">
                  <option>Sort by: Newest</option>
                  <option>Sort by: Premium First</option>
                  <option>Sort by: Name A-Z</option>
                </select>
              </div>

              {filteredListings.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-lg mb-2">
                    No listings found
                  </p>
                  <p className="text-text-muted text-sm">
                    Try adjusting your filters to see more results.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
