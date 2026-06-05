'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Verifications', href: '/admin/verifications', icon: '✅' },
  { label: 'Moderation', href: '/admin/moderation', icon: '🔍' },
  { label: 'User Management', href: '/admin/users', icon: '👥' },
  { label: 'Placement Control', href: '/admin/placement', icon: '📌' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (pathname !== '/admin/login' && !document.cookie.includes('admin_token=')) {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; max-age=0';
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <Link href="/admin" className="font-bold text-xl flex items-center gap-3">
            <span className="text-2xl">🚀</span>
            {isSidebarOpen && <span>PrivateGuys</span>}
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-900/30 text-red-300 hover:bg-red-900/50 transition"
          >
            <span className="text-xl">🚪</span>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <div className="p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full py-2 text-slate-400 hover:text-white transition"
          >
            {isSidebarOpen ? '«' : '»'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
