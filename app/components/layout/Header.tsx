import { Link, useLocation } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { CartIcon } from '../ui/Icons';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Shop', href: '/rituals' },
    { label: 'Learn', href: '/learn' },
    { label: 'Account', href: '/account' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-navy text-brand-cream py-2 px-5 text-center text-[10px] md:text-sm font-bold tracking-widest uppercase">
        Free shipping on orders $50+ | 30-day money-back guarantee
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-brand-navy/5 py-4 shadow-sm'
            : 'bg-brand-cream py-6'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl font-bold tracking-tight text-brand-navy">
            JAY LIFE
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm font-bold transition-colors uppercase tracking-widest ${isActive ? 'text-brand-sage' : 'text-brand-navy/60 hover:text-brand-sage'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <Link to="/cart" className="relative group p-2">
              <CartIcon className="w-6 h-6 text-brand-navy group-hover:scale-110 transition-transform" />
              <span className="absolute top-1 right-1 bg-brand-sage text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
