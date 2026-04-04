"use client";
// src/admin/AdminMessages.tsx
import { useState, useEffect } from 'react';
import { getMessages, setReadStatus, deleteMessage } from '../lib/db';
import type { Message } from '../types/database';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { void load(); }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setMessages(await getMessages());
    } catch {
      setError('Failed to load messages.');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleRead(msg: Message) {
    setSaving(true);
    try {
      await setReadStatus(msg.id, !msg.read);
      await load();
    } catch {
      setError('Failed to update message.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this message?')) return;
    setSaving(true);
    try {
      await deleteMessage(id);
      await load();
    } catch {
      setError('Failed to delete message.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Messages</h2>

      {error && (
        <div className="px-4 py-3 rounded-lg text-sm bg-red-500/10 text-red-500">{error}</div>
      )}

      {loading ? (
        <div className="bg-[var(--bg-surface)] rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10 p-16 text-center text-sm text-gray-500 dark:text-gray-400">
          Loading…
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-[var(--bg-surface)] rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10 p-16 text-center">
          <div className="text-5xl mb-4">✉️</div>
          <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`bg-[var(--bg-surface)] rounded-2xl border p-6 transition-colors ${
                !msg.read
                  ? 'border-purple-500/40'
                  : 'border-[oklch(90%_0.012_349)] dark:border-white/10'
              }`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  {!msg.read && (
                    <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{msg.name}</p>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {formatDate(msg.created_at)}
                </span>
              </div>

              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                {msg.message}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => handleToggleRead(msg)}
                  disabled={saving}
                  className="px-3 py-1.5 text-xs rounded-lg border border-[oklch(90%_0.012_349)] dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-purple-400 hover:text-purple-400 transition disabled:opacity-50"
                >
                  {msg.read ? 'Mark as unread' : 'Mark as read'}
                </button>
                <button
                  onClick={() => handleDelete(msg.id)}
                  disabled={saving}
                  className="px-3 py-1.5 text-xs rounded-lg text-red-400 hover:bg-red-500/10 transition disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
