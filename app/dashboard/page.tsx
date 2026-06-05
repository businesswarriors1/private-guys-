'use client';

import { useState } from 'react';
import Link from 'next/link';

interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
  color?: string;
}

interface QuickAction {
  label: string;
  href: string;
  icon: string;
}

const mockStats: StatCard[] = [
  { label: 'Profile Views', value: 342, icon: '👁️', trend: '+12%' },
  { label: 'Contact Clicks', value: 28, icon: '📞', trend: '+5%' },
  { label: 'Phone Reveals', value: 15, icon: '☎️', trend: '+3%' },
  { label: 'Days Remaining', value: 23, icon: '📅', color: 'text-accent-gold' },
];

const quickActions: QuickAction[] = [
  { label: 'Edit Listing', href: '/dashboard/listing', icon: '✏️' },
  { label: 'Upload Photos', href: '/dashboard/photos', icon: '📸' },
  { label: 'Renew Subscription', href: '/dashboard/subscription', icon: '💳' },
];

export default function DashboardHome() {
  const [listingStatus] = useState('Live');

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
          Welcome Back, <span className="text-accent-gold">Alex</span>
        </h1>
        <p className="text-text-secondary">Manage your listing and track your performance</p>
      </div>

      {/* Listing Status */}
      <div className="glass-card-gold p-6 rounded-lg border border-border-gold">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-secondary text-sm mb-2">Listing Status</p>
            <p className="text-2xl font-bold">
              <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
              {listingStatus}
            </p>
          </div>
          <div className="text-right">
            <p className="text-text-secondary text-sm mb-2">Subscription Tier</p>
            <p className="text-2xl font-bold text-accent-gold">Premium</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat) => (
          <div
            key={stat.label}
            className="glass-card p-6 rounded-lg border border-border-default hover-lift"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              {stat.trend && (
                <span className="text-sm text-green-400 font-medium">{stat.trend}</span>
              )}
            </div>
            <p className="text-text-secondary text-sm mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color || 'text-text-primary'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="glass-card p-6 rounded-lg border border-border-default hover:border-accent-gold hover-lift transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl group-hover:scale-110 transition-transform">
                  {action.icon}
                </span>
                <span className="font-semibold text-text-primary group-hover:text-accent-gold transition-colors">
                  {action.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Activity</h2>
        <div className="glass-card rounded-lg border border-border-default divide-y divide-border-default overflow-hidden">
          {[
            { action: 'Profile viewed', time: '2 hours ago', icon: '👁️' },
            { action: 'Contact message received', time: '5 hours ago', icon: '💬' },
            { action: 'Phone number revealed', time: 'Yesterday', icon: '☎️' },
            { action: 'Listing approved', time: '3 days ago', icon: '✓' },
          ].map((activity, idx) => (
            <div key={idx} className="p-4 flex items-center gap-4">
              <span className="text-2xl">{activity.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-text-primary">{activity.action}</p>
              </div>
              <p className="text-text-secondary text-sm">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
