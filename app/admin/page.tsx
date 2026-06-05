'use client';

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5800 },
  { month: 'Mar', revenue: 7200 },
  { month: 'Apr', revenue: 8900 },
  { month: 'May', revenue: 11200 },
  { month: 'Jun', revenue: 13400 },
];

const tierData = [
  { name: 'Standard', value: 245, color: '#3b82f6' },
  { name: 'Premium', value: 128, color: '#8b5cf6' },
  { name: 'Platinum', value: 34, color: '#ec4899' },
];

const listingData = [
  { city: 'Sydney', count: 156 },
  { city: 'Melbourne', count: 134 },
  { city: 'Brisbane', count: 98 },
  { city: 'Perth', count: 76 },
  { city: 'Adelaide', count: 45 },
];

const StatCard = ({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) => (
  <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 flex items-center gap-4">
    <div className={`text-4xl p-4 rounded-lg ${color}`}>{icon}</div>
    <div>
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back! Here&apos;s an overview of your platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Listings"
          value={509}
          icon="📋"
          color="bg-blue-900/30"
        />
        <StatCard
          label="Active Subscriptions"
          value={407}
          icon="✅"
          color="bg-green-900/30"
        />
        <StatCard
          label="Pending Verifications"
          value={23}
          icon="⏳"
          color="bg-yellow-900/30"
        />
        <StatCard
          label="Monthly Revenue"
          value="$28,530 AUD"
          icon="💰"
          color="bg-purple-900/30"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trends */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Revenue Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tier Distribution */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Subscription Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={tierData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={100} fill="#8884d8" dataKey="value">
                {tierData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Listings by City */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">New Listings by City</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={listingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="city" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Bar dataKey="count" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <div className="text-2xl">✅</div>
            <div className="flex-1">
              <p className="font-semibold">5 new verifications approved</p>
              <p className="text-sm text-slate-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <div className="text-2xl">💰</div>
            <div className="flex-1">
              <p className="font-semibold">New Platinum subscription</p>
              <p className="text-sm text-slate-400">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <div className="text-2xl">⚠️</div>
            <div className="flex-1">
              <p className="font-semibold">1 listing flagged for review</p>
              <p className="text-sm text-slate-400">30 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
