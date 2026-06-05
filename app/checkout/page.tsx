'use client';

import { useState } from 'react';
import { PRICING_TIERS, CITY_ADDON_PRICE } from '@/lib/stripe';
import Link from 'next/link';

const CITIES = [
  'Sydney',
  'Melbourne',
  'Brisbane',
  'Perth',
  'Adelaide',
  'Hobart',
  'Darwin',
  'Gold Coast',
  'Canberra',
];

export default function CheckoutPage() {
  const [selectedTier, setSelectedTier] = useState<'standard' | 'premium' | 'platinum' | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [selectedCities, setSelectedCities] = useState<string[]>(['Sydney']);
  const [isLoading, setIsLoading] = useState(false);

  const handleCityToggle = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) && prev.length > 1 ? prev.filter((c) => c !== city) : [...prev.filter((c) => c !== city), city]
    );
  };

  const calculatePrice = () => {
    if (!selectedTier) return 0;

    const tier = PRICING_TIERS[selectedTier];
    const basePrice = (tier.prices[billingCycle as keyof typeof tier.prices] as number) || 0;

    // Add city add-ons (only for standard/premium)
    if (selectedTier !== 'platinum' && selectedCities.length > 1) {
      return basePrice + CITY_ADDON_PRICE * (selectedCities.length - 1);
    }

    return basePrice;
  };

  const handleCheckout = async () => {
    if (!selectedTier) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: selectedTier,
          cities: selectedCities,
          billingCycle,
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const price = calculatePrice();
  const priceInDollars = (price / 100).toFixed(2);
  const billingLabel =
    billingCycle === 'annual' ? '/year' : billingCycle === 'quarterly' ? '/quarter' : '/month';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-slate-300">
            Professional listing and profile management for Private Guys Australia
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              billingCycle === 'monthly' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('quarterly')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              billingCycle === 'quarterly' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Quarterly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              billingCycle === 'annual' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Annual
          </button>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {Object.entries(PRICING_TIERS).map(([key, tier]) => (
            <div
              key={key}
              className={`rounded-lg p-8 transition cursor-pointer border-2 ${
                selectedTier === key ? 'border-blue-500 bg-slate-800 shadow-xl shadow-blue-500/20' : 'border-slate-700 bg-slate-700/50 hover:border-slate-600'
              }`}
              onClick={() => setSelectedTier(key as 'standard' | 'premium' | 'platinum')}
            >
              <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
              <p className="text-slate-400 mb-4">{tier.description}</p>

              <div className="mb-6">
                {key === 'platinum' ? (
                  <div className="text-3xl font-bold text-blue-400">Custom Pricing</div>
                ) : (
                  <div>
                    <span className="text-4xl font-bold">${priceInDollars}</span>
                    <span className="text-slate-400"> {billingLabel}</span>
                  </div>
                )}
              </div>

              <ul className="space-y-2 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2 rounded-lg font-semibold transition ${
                  selectedTier === key
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-slate-600 text-white hover:bg-slate-500'
                }`}
              >
                {selectedTier === key ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* City Selection (hide for platinum) */}
        {selectedTier !== 'platinum' && (
          <div className="bg-slate-700/50 rounded-lg p-8 mb-12 border border-slate-600">
            <h3 className="text-2xl font-bold mb-6">Select Cities</h3>
            <p className="text-slate-400 mb-4">
              First city is included. Additional cities: ${(CITY_ADDON_PRICE / 100).toFixed(2)}{billingLabel}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCityToggle(city)}
                  className={`p-4 rounded-lg font-semibold transition ${
                    selectedCities.includes(city)
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <p className="font-semibold mb-2">Selected: {selectedCities.join(', ')}</p>
              <p className="text-slate-400 text-sm">Additional city cost: AUD ${((CITY_ADDON_PRICE * (selectedCities.length - 1)) / 100).toFixed(2)}</p>
            </div>
          </div>
        )}

        {/* Summary and Checkout */}
        <div className="bg-slate-700/50 rounded-lg p-8 border border-slate-600 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

          {selectedTier ? (
            <>
              <div className="space-y-4 mb-6 pb-6 border-b border-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">{PRICING_TIERS[selectedTier].name} Subscription</span>
                  <span>${((PRICING_TIERS[selectedTier].prices[billingCycle as keyof typeof PRICING_TIERS[typeof selectedTier].prices] as number) / 100).toFixed(2)}</span>
                </div>

                {selectedTier !== 'platinum' && selectedCities.length > 1 && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Additional Cities ({selectedCities.length - 1})</span>
                    <span>${((CITY_ADDON_PRICE * (selectedCities.length - 1)) / 100).toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-3xl font-bold text-blue-400">${priceInDollars}</span>
                <span className="text-slate-400">{billingLabel}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-bold py-3 rounded-lg transition mb-4"
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              <p className="text-sm text-slate-400 text-center">
                Secure payment powered by Stripe. You can manage your subscription anytime.
              </p>
            </>
          ) : (
            <p className="text-slate-400 text-center py-8">Select a plan to continue</p>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
