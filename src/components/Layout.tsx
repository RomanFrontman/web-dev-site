// src/components/Layout.tsx
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-gray-900 dark:text-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Layout;
