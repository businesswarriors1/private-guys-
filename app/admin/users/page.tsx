'use client';

import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  tier: 'standard' | 'premium' | 'platinum';
  cities: string[];
  status: 'active' | 'suspended' | 'inactive';
  joinDate: string;
  listings: number;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    tier: 'premium',
    cities: ['Sydney', 'Melbourne'],
    status: 'active',
    joinDate: '2024-01-15',
    listings: 8,
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@example.com',
    tier: 'standard',
    cities: ['Brisbane'],
    status: 'active',
    joinDate: '2024-02-20',
    listings: 3,
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@example.com',
    tier: 'platinum',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
    status: 'active',
    joinDate: '2024-01-01',
    listings: 24,
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john@example.com',
    tier: 'standard',
    cities: ['Perth'],
    status: 'suspended',
    joinDate: '2024-03-10',
    listings: 5,
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSuspend = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: 'suspended' } : user
      )
    );
  };

  const handleActivate = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: 'active' } : user
      )
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 bg-green-900/50 text-green-200 rounded-full text-sm">✅ Active</span>;
      case 'suspended':
        return <span className="px-3 py-1 bg-red-900/50 text-red-200 rounded-full text-sm">🚫 Suspended</span>;
      case 'inactive':
        return <span className="px-3 py-1 bg-slate-600 text-slate-300 rounded-full text-sm">⏸️ Inactive</span>;
      default:
        return null;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'standard':
        return 'text-blue-400';
      case 'premium':
        return 'text-purple-400';
      case 'platinum':
        return 'text-pink-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">User Management</h1>
        <p className="text-slate-400">Manage and monitor user accounts and subscriptions</p>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Users Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50 border-b border-slate-600">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Tier</th>
                <th className="px-6 py-4 text-left font-semibold">Cities</th>
                <th className="px-6 py-4 text-left font-semibold">Listings</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4 font-semibold">{user.name}</td>
                  <td className="px-6 py-4 text-slate-400">{user.email}</td>
                  <td className={`px-6 py-4 font-semibold capitalize ${getTierColor(user.tier)}`}>
                    {user.tier}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {user.cities.map((city) => (
                        <span
                          key={city}
                          className="px-2 py-1 bg-slate-700 rounded text-xs"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.listings}</td>
                  <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowDetails(true);
                      }}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold mb-6">{selectedUser.name}</h2>

            {/* User Info */}
            <div className="space-y-4 mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <p className="font-semibold">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Status</p>
                  {getStatusBadge(selectedUser.status)}
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Subscription Tier</p>
                  <p className={`font-semibold capitalize ${getTierColor(selectedUser.tier)}`}>
                    {selectedUser.tier}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Join Date</p>
                  <p className="font-semibold">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Cities and Listings */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <h3 className="font-semibold mb-3">Active Cities</h3>
                <div className="space-y-2">
                  {selectedUser.cities.map((city) => (
                    <div key={city} className="flex items-center gap-2">
                      <span className="text-blue-400">📍</span>
                      <span>{city}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <h3 className="font-semibold mb-3">Account Activity</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Listings</span>
                    <span className="font-semibold">{selectedUser.listings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account Age</span>
                    <span className="font-semibold">
                      {Math.floor(
                        (Date.now() - new Date(selectedUser.joinDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{' '}
                      days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {selectedUser.status === 'active' ? (
                <button
                  onClick={() => handleSuspend(selectedUser.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  🚫 Suspend Account
                </button>
              ) : (
                <button
                  onClick={() => handleActivate(selectedUser.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  ✅ Reactivate
                </button>
              )}

              <button
                onClick={() => setShowDetails(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
