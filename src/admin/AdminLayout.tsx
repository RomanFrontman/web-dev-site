"use client";
// src/admin/AdminLayout.tsx

// ADMIN PANEL — HOW TO ADD A NEW MODULE:
// 1. Create src/data/yourmodule.json with initial data
// 2. Add typed helpers in src/lib/data.ts  (getAll / add / update / remove)
// 3. Create src/admin/AdminYourModule.tsx  (management UI)
// 4. Add a nav entry to NAV_ITEMS below    (icon + label + path)
// That's it. No other files need to be modified.

import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { logout, getSession } from '../lib/auth';

const NAV_ITEMS = [
  { icon: '🏠', label: 'Dashboard', path: '/admin/dashboard' },
  { icon: '📁', label: 'Projects',  path: '/admin/projects'  },
  { icon: '⚡', label: 'Skills',    path: '/admin/skills'    },
  { icon: '🛠️', label: 'Toolchain', path: '/admin/toolchain' },
  { icon: '✉️', label: 'Messages',  path: '/admin/messages'  },
  { icon: '📄', label: 'Pages',     path: '/admin/pages'     },
  { icon: '💰', label: 'Pricing',   path: '/admin/pricing'   },
];

const PAGE_TITLES: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/projects':  'Projects',
  '/admin/skills':    'Skills',
  '/admin/toolchain': 'Toolchain',
  '/admin/messages':  'Messages',
  '/admin/pages':     'Pages',
  '/admin/pricing':   'Pricing',
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const session = getSession();
  const pageTitle = PAGE_TITLES[location.pathname] ?? 'Admin';

  function handleSignOut() {
    logout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="dark min-h-screen bg-[var(--bg-subtle)] flex">

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`
        fixed top-0 left-0 h-full w-60 bg-[var(--bg-surface)]
        border-r border-[oklch(90%_0.012_349)] dark:border-white/10
        flex flex-col z-30 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-[oklch(90%_0.012_349)] dark:border-white/10">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200
                ${isActive
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-[var(--bg-subtle)] hover:text-gray-900 dark:hover:text-white'
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-[oklch(90%_0.012_349)] dark:border-white/10 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-[var(--bg-subtle)] transition-colors duration-200"
          >
            <span>🌐</span>
            <span>View Site</span>
          </a>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-[var(--bg-surface)] border-b border-[oklch(90%_0.012_349)] dark:border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-subtle)] transition-colors text-gray-600 dark:text-gray-300"
              aria-label="Open menu"
            >
              ☰
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{pageTitle}</h1>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
            {session?.email}
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
