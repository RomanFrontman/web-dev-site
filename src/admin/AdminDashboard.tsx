"use client";
// src/admin/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { getProjects, getSkills, getMessages } from '../lib/db';
import type { Message } from '../types/database';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, unread: 0, lastDate: '' });
  const [recent, setRecent] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { void load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const [projects, skills, messages] = await Promise.all([
        getProjects(),
        getSkills(),
        getMessages(),
      ]);
      setStats({
        projects: projects.length,
        skills:   skills.length,
        unread:   messages.filter(m => !m.read).length,
        lastDate: messages[0]?.created_at ?? '',
      });
      setRecent(messages.slice(0, 5));
    } catch {
      // silently fail — dashboard is informational
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    { label: 'Total Projects',  value: stats.projects,                              icon: '📁', color: 'text-purple-400' },
    { label: 'Total Skills',    value: stats.skills,                                icon: '⚡', color: 'text-blue-400'   },
    { label: 'Unread Messages', value: stats.unread,                                icon: '✉️', color: 'text-pink-400'   },
    { label: 'Last Message',    value: stats.lastDate ? formatDate(stats.lastDate) : '—', icon: '🕐', color: 'text-green-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map(c => (
          <div
            key={c.label}
            className="bg-[var(--bg-surface)] rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{c.icon}</span>
              <span className={`text-2xl font-bold ${c.color}`}>
                {loading ? '—' : c.value}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Recent messages */}
      <div className="bg-[var(--bg-surface)] rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-[oklch(90%_0.012_349)] dark:border-white/10">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Recent Messages</h2>
        </div>
        {loading ? (
          <p className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">Loading…</p>
        ) : recent.length === 0 ? (
          <p className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">No messages yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[oklch(90%_0.012_349)] dark:border-white/10 text-xs text-gray-500 dark:text-gray-400">
                  <th className="text-left px-6 py-3 font-medium">Name</th>
                  <th className="text-left px-6 py-3 font-medium">Email</th>
                  <th className="text-left px-6 py-3 font-medium">Date</th>
                  <th className="text-left px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(msg => (
                  <tr
                    key={msg.id}
                    className="border-b border-[oklch(90%_0.012_349)] dark:border-white/10 last:border-0 hover:bg-[var(--bg-subtle)] transition-colors"
                  >
                    <td className="px-6 py-3 text-gray-900 dark:text-white">{msg.name}</td>
                    <td className="px-6 py-3 text-gray-500 dark:text-gray-400">{msg.email}</td>
                    <td className="px-6 py-3 text-gray-500 dark:text-gray-400">{formatDate(msg.created_at)}</td>
                    <td className="px-6 py-3">
                      {msg.read
                        ? <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs">Read</span>
                        : <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs">Unread</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
