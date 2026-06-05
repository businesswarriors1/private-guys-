'use client';

import { useState } from 'react';

interface Placement {
  id: string;
  city: string;
  tier: 'premium' | 'platinum';
  position: number;
  user: string;
  listing: string;
  startDate: string;
  expiryDate: string;
  isPinned: boolean;
}

// Mock data
const mockPlacements: Placement[] = [
  {
    id: '1',
    city: 'Sydney',
    tier: 'platinum',
    position: 1,
    user: 'Emma Davis',
    listing: 'Professional Services Sydney',
    startDate: '2024-06-01',
    expiryDate: '2024-07-01',
    isPinned: true,
  },
  {
    id: '2',
    city: 'Sydney',
    tier: 'premium',
    position: 2,
    user: 'Sarah Johnson',
    listing: 'Premium Listing Sydney',
    startDate: '2024-06-03',
    expiryDate: '2024-07-03',
    isPinned: false,
  },
  {
    id: '3',
    city: 'Melbourne',
    tier: 'platinum',
    position: 1,
    user: 'Michael Brown',
    listing: 'Featured Melbourne Services',
    startDate: '2024-06-02',
    expiryDate: '2024-07-02',
    isPinned: true,
  },
  {
    id: '4',
    city: 'Brisbane',
    tier: 'premium',
    position: 1,
    user: 'Jessica Lee',
    listing: 'Brisbane Services',
    startDate: '2024-06-01',
    expiryDate: '2024-06-30',
    isPinned: false,
  },
];

const CITIES = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'];

export default function PlacementControlPage() {
  const [placements, setPlacements] = useState<Placement[]>(mockPlacements);
  const [selectedCity, setSelectedCity] = useState('Sydney');
  const [showNewPlacementForm, setShowNewPlacementForm] = useState(false);
  const [newPlacement, setNewPlacement] = useState({
    tier: 'premium' as const,
    user: '',
    listing: '',
    days: 30,
  });

  const cityPlacements = placements
    .filter((p) => p.city === selectedCity)
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return a.position - b.position;
    });

  const premiumPlacements = cityPlacements.filter((p) => p.tier === 'premium');
  const platinumPlacements = cityPlacements.filter((p) => p.tier === 'platinum');

  const handleAddPlacement = () => {
    if (!newPlacement.user || !newPlacement.listing) {
      alert('Please fill in all fields');
      return;
    }

    const placement: Placement = {
      id: Date.now().toString(),
      city: selectedCity,
      tier: newPlacement.tier,
      position: cityPlacements.length + 1,
      user: newPlacement.user,
      listing: newPlacement.listing,
      startDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + newPlacement.days * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      isPinned: false,
    };

    setPlacements((prev) => [...prev, placement]);
    setNewPlacement({ tier: 'premium', user: '', listing: '', days: 30 });
    setShowNewPlacementForm(false);
  };

  const handleTogglePin = (id: string) => {
    setPlacements((prev) =>
      prev.map((p) =>
        p.id === id && p.city === selectedCity ? { ...p, isPinned: !p.isPinned } : p
      )
    );
  };

  const handleRemovePlacement = (id: string) => {
    setPlacements((prev) => prev.filter((p) => p.id !== id));
  };

  const PlacementCard = ({ placement }: { placement: Placement }) => (
    <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 flex items-center justify-between hover:border-slate-500 transition">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          {placement.isPinned && <span className="text-xl">📌</span>}
          <h3 className="font-semibold text-lg">{placement.listing}</h3>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            placement.tier === 'platinum'
              ? 'bg-pink-900/50 text-pink-200'
              : 'bg-purple-900/50 text-purple-200'
          }`}>
            {placement.tier.toUpperCase()}
          </span>
        </div>
        <p className="text-slate-400 text-sm mb-2">By {placement.user}</p>
        <div className="flex gap-4 text-xs text-slate-400">
          <span>Position: #{placement.position}</span>
          <span>Expires: {new Date(placement.expiryDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleTogglePin(placement.id)}
          className={`px-3 py-2 rounded transition text-sm font-semibold ${
            placement.isPinned
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
              : 'bg-slate-600 hover:bg-slate-500 text-white'
          }`}
        >
          {placement.isPinned ? '📌 Pinned' : 'Pin'}
        </button>
        <button
          onClick={() => handleRemovePlacement(placement.id)}
          className="px-3 py-2 bg-red-900/50 hover:bg-red-900/70 text-red-300 rounded transition text-sm font-semibold"
        >
          Remove
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Placement Control</h1>
        <p className="text-slate-400">Manage featured listings and rotation by city</p>
      </div>

      {/* City Selector */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="font-semibold mb-4">Select City</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedCity === city
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Platinum Placements */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Platinum Placements</h2>
          <span className="text-sm text-slate-400">
            {platinumPlacements.length} active
          </span>
        </div>
        <div className="space-y-3">
          {platinumPlacements.length > 0 ? (
            platinumPlacements.map((placement) => (
              <PlacementCard key={placement.id} placement={placement} />
            ))
          ) : (
            <div className="bg-slate-700/30 rounded-lg p-8 text-center text-slate-400">
              No platinum placements in {selectedCity}
            </div>
          )}
        </div>
      </div>

      {/* Premium Placements */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Premium Placements</h2>
          <span className="text-sm text-slate-400">
            {premiumPlacements.length} active
          </span>
        </div>
        <div className="space-y-3">
          {premiumPlacements.length > 0 ? (
            premiumPlacements.map((placement) => (
              <PlacementCard key={placement.id} placement={placement} />
            ))
          ) : (
            <div className="bg-slate-700/30 rounded-lg p-8 text-center text-slate-400">
              No premium placements in {selectedCity}
            </div>
          )}
        </div>
      </div>

      {/* Add New Placement Form */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Add New Placement</h2>
          <button
            onClick={() => setShowNewPlacementForm(!showNewPlacementForm)}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            {showNewPlacementForm ? 'Cancel' : '+ Add'}
          </button>
        </div>

        {showNewPlacementForm && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Tier</label>
              <select
                value={newPlacement.tier}
                onChange={(e) =>
                  setNewPlacement({ ...newPlacement, tier: e.target.value as 'premium' | 'platinum' })
                }
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="premium">Premium</option>
                <option value="platinum">Platinum</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">User Name</label>
              <input
                type="text"
                value={newPlacement.user}
                onChange={(e) => setNewPlacement({ ...newPlacement, user: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="User name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Listing Title</label>
              <input
                type="text"
                value={newPlacement.listing}
                onChange={(e) => setNewPlacement({ ...newPlacement, listing: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="Listing title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Duration (days)</label>
              <input
                type="number"
                value={newPlacement.days}
                onChange={(e) => setNewPlacement({ ...newPlacement, days: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-blue-500"
                min="1"
              />
            </div>

            <button
              onClick={handleAddPlacement}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Add Placement
            </button>
          </div>
        )}
      </div>

      {/* Rotation Rules Info */}
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-6">
        <h3 className="font-bold mb-3 text-blue-200">Rotation Rules</h3>
        <ul className="space-y-2 text-sm text-blue-100">
          <li>✓ Platinum placements are always featured at the top</li>
          <li>✓ Premium placements rotate every 24 hours in order</li>
          <li>✓ Pinned listings stay in their position until unpinned</li>
          <li>✓ Placements expire on the specified date and are automatically removed</li>
        </ul>
      </div>
    </div>
  );
}
