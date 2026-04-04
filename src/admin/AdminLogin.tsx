"use client";
// src/admin/AdminLogin.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, isAuthenticated } from '../lib/auth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated()) {
    navigate('/admin/dashboard', { replace: true });
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 200));
    const ok = login(email, password);
    if (ok) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Invalid email or password.');
      setLoading(false);
    }
  }

  return (
    <div className="dark min-h-screen bg-[var(--bg-base)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[var(--bg-surface)] backdrop-blur-md rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign in to manage your portfolio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="admin@portfolio.com"
                className="w-full bg-[var(--bg-subtle)] dark:bg-black/20 border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[var(--bg-subtle)] dark:bg-black/20 border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-full text-white font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Default credentials: admin@portfolio.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
