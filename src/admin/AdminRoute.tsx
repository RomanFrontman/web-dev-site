// src/admin/AdminRoute.tsx
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../lib/auth';
import type { ReactNode } from 'react';

export default function AdminRoute({ children }: { children: ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}
