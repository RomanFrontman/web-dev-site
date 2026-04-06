// src/lib/auth.ts
import bcrypt from 'bcryptjs';

export const ADMIN_EMAIL = 'admin@portfolio.com';

// Read from environment — set VITE_ADMIN_PASSWORD_HASH in .env.local and Vercel dashboard.
// To generate a new hash: node -e "require('bcryptjs').hash('yourpass',10).then(console.log)"
// Hash is stored as base64 in env to avoid dotenv-expand corrupting $ characters.
// To update: node -e "require('bcryptjs').hash('pass',10).then(h=>console.log(Buffer.from(h).toString('base64')))"
const _hashB64 = import.meta.env.VITE_ADMIN_PASSWORD_HASH as string | undefined;
const ADMIN_PASSWORD_HASH = _hashB64 ? atob(_hashB64) : undefined;

const SESSION_KEY = 'admin_session';

interface Session {
  email: string;
  expires: number;
}

export function login(email: string, password: string): boolean {
  if (!ADMIN_PASSWORD_HASH) throw new Error('VITE_ADMIN_PASSWORD_HASH is not set');
  if (email.toLowerCase().trim() !== ADMIN_EMAIL) return false;
  if (!bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) return false;

  const session: Session = {
    email,
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 h
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return true;
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): Session | null {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    const session = JSON.parse(stored) as Session;
    if (Date.now() > session.expires) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}
