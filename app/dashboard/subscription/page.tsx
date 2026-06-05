'use client';

import { useState } from 'react';
import { australianLocations } from '@/app/types';

interface Subscription {
  id: string;
  tier: 'standard' | 'premium' | 'platinum';
  amount: number;
  interval: 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
  status: 'active' | 'cancelled' | 'expired';
}

interface BillingRecord {
  id: string;
  date: string;
  amount: number;
  tier: string;
  status: 'paid' | 'pending' | 'failed';
}

const tierPlans = [
  {
    name: 'Standard',
    price: 19.99,
    interval: 'month',
    features: ['3 photos', 'Basic listing', 'Standard duration (30 days)'],
  },
  {
    name: 'Premium',
    price: 39.99,
    interval: 'month',
    features: ['10 photos', 'Premium listing', 'Extended duration (90 days)', '2 city placements'],
    current: true,
  },
  {
    name: 'Platinum',
    price: 79.99,
    interval: 'month',
    features: ['Unlimited photos', 'Premium listing', '180 day listing', 'All city placements'],
  },
];

export default function SubscriptionPage() {
  const [currentSubscription] = useState<Subscription>({
    id: 'sub_123',
    tier: 'premium',
    amount: 39.99,
    interval: 'monthly',
    startDate: '2024-06-01',
    endDate: '2024-09-01',
    status: 'active',
  });

  const [selectedCities, setSelectedCities] = useState(['Sydney', 'Melbourne']);
  const [billingRecords] = useState<BillingRecord[]>([
    {
      id: '1',
      date: '2024-06-01',
      amount: 39.99,
      tier: 'Premium',
      status: 'paid',
    },
    {
      id: '2',
      date: '2024-05-01',
      amount: 39.99,
      tier: 'Premium',
      status: 'paid',
    },
    {
      id: '3',
      date: '2024-04-01',
      amount: 39.99,
      tier: 'Premium',
      status: 'paid',
    },
  ]);

  const cities = australianLocations.flatMap((loc) => loc.cities).sort();

  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysRemaining = () => {
    const today = new Date();
    const end = new Date(currentSubscription.endDate);
    return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Subscription Management</h1>
        <p className="text-text-secondary">Manage your subscription tier and billing</p>
      </div>

      {/* Current Subscription */}
      <div className="glass-card-gold p-8 rounded-lg border border-accent-gold">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-text-secondary text-sm mb-2">Current Plan</p>
            <h2 className="text-3xl font-bold text-accent-gold mb-4">
              {currentSubscription.tier.charAt(0).toUpperCase() +
                currentSubscription.tier.slice(1)}
            </h2>
            <div className="space-y-2">
              <p className="text-text-primary">
                💰 ${currentSubscription.amount.toFixed(2)}/{currentSubscription.interval}
              </p>
              <p className="text-text-primary">
                📅 {formatDate(currentSubscription.startDate)} - {formatDate(currentSubscription.endDate)}
              </p>
              <p className="text-accent-gold font-medium">
                ✓ Active ({getDaysRemaining()} days remaining)
              </p>
            </div>
          </div>
          <div className="text-right">
            <button className="px-6 py-3 bg-accent-gold text-background rounded-lg hover:bg-accent-gold-light transition-colors font-medium mb-3">
              Renew Subscription
            </button>
            <button className="block px-6 py-3 rounded-lg border border-accent-gold text-accent-gold hover:bg-accent-gold/10 transition-colors font-medium">
              Manage Payment
            </button>
          </div>
        </div>
      </div>

      {/* Upgrade Plans */}
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">Upgrade Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tierPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border p-6 transition-all ${
                plan.current
                  ? 'glass-card-gold border-accent-gold'
                  : 'glass-card border-border-default hover:border-accent-gold'
              }`}
            >
              {plan.current && (
                <div className="mb-4 inline-block px-3 py-1 bg-accent-gold text-background rounded-full text-xs font-semibold">
                  Current Plan
                </div>
              )}
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-accent-gold">
                  ${plan.price.toFixed(2)}
                </span>
                <span className="text-text-secondary ml-2">/{plan.interval}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-text-secondary text-sm flex items-start gap-2">
                    <span className="text-accent-gold mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {!plan.current && (
                <button className="w-full px-4 py-2 rounded-lg border border-accent-gold text-accent-gold hover:bg-accent-gold/10 transition-colors font-medium">
                  Upgrade Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* City Placements */}
      <div className="glass-card p-8 rounded-lg border border-border-default">
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Per-City Placements (Premium Feature)
        </h2>
        <p className="text-text-secondary text-sm mb-4">
          Select up to 2 cities for premium placement visibility
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {cities.map((city) => (
            <label
              key={city}
              className="flex items-center gap-2 p-3 rounded-lg border border-border-default hover:border-accent-gold cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedCities.includes(city)}
                onChange={() => toggleCity(city)}
                disabled={!selectedCities.includes(city) && selectedCities.length >= 2}
                className="w-4 h-4"
              />
              <span className="text-text-primary">{city}</span>
            </label>
          ))}
        </div>
        <button className="mt-6 px-6 py-2 rounded-lg bg-accent-gold text-background hover:bg-accent-gold-light transition-colors font-medium">
          Save City Preferences
        </button>
      </div>

      {/* Billing History */}
      <div className="glass-card rounded-lg border border-border-default overflow-hidden">
        <div className="p-8 border-b border-border-default">
          <h2 className="text-xl font-semibold text-text-primary">Billing History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left px-6 py-3 text-sm font-semibold text-text-secondary">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-text-secondary">
                  Tier
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-text-secondary">
                  Amount
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-text-secondary">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-text-secondary">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody>
              {billingRecords.map((record) => (
                <tr key={record.id} className="border-b border-border-default hover:bg-background-elevated">
                  <td className="px-6 py-4 text-text-primary">{formatDate(record.date)}</td>
                  <td className="px-6 py-4 text-text-primary">{record.tier}</td>
                  <td className="px-6 py-4 text-text-primary font-medium">
                    ${record.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        record.status === 'paid'
                          ? 'bg-green-600/20 text-green-400'
                          : record.status === 'pending'
                            ? 'bg-yellow-600/20 text-yellow-400'
                            : 'bg-red-600/20 text-red-400'
                      }`}
                    >
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-accent-gold hover:text-accent-gold-light transition-colors">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
