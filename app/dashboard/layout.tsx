'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';

interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Overview', href: '/dashboard', icon: '📊' },
  { label: 'My Listing', href: '/dashboard/listing', icon: '📝' },
  { label: 'Photos', href: '/dashboard/photos', icon: '📸' },
  { label: 'Tours', href: '/dashboard/tours', icon: '🌍' },
  { label: 'Subscription', href: '/dashboard/subscription', icon: '💳' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
  { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Header />
      
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 border-r border-border-default bg-background-card flex-col">
          <nav className="flex-1 px-6 py-8 space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-accent-gold hover:bg-background-elevated transition-colors duration-200"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Info Footer */}
          <div className="border-t border-border-default px-6 py-4">
            <div className="text-sm">
              <p className="text-text-secondary">Logged in as</p>
              <p className="text-accent-gold font-medium">Alex (Premium)</p>
            </div>
          </div>
        </aside>

        {/* Mobile Drawer Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden absolute top-20 left-4 z-40 p-2 rounded-lg bg-background-card border border-border-default"
        >
          <span className="text-2xl">☰</span>
        </button>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-30 top-16"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`md:hidden fixed top-16 left-0 w-64 bg-background-card border-r border-border-default z-40 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="px-6 py-4 space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-accent-gold hover:bg-background-elevated transition-colors duration-200"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
