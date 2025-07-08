// src/components/Header.tsx
import { useState } from 'react';
import { Menu, X, Code } from 'lucide-react';
import { Link } from 'react-router-dom';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/#home" className="flex items-center space-x-2">
  <Code className="h-8 w-8 text-purple-400" />
  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
    WebDev Pro
  </span>
</Link>
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a key={item.href} href={item.href} className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium">
                {item.label}
              </a>
            ))}
          </nav>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/10">
            {menuItems.map((item) => (
              <a key={item.href} href={item.href} className="block py-2 text-gray-300 hover:text-purple-400 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
