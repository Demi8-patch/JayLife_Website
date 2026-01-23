import { Link, useLocation } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartCount } from '~/lib/cart-context';

export function NeoNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const cartCount = useCartCount();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const LINKS = [
    { name: 'Shop All', href: '/rituals' },
    { name: 'Learn', href: '/learn' },
    { name: 'Account', href: '/account' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[50] flex items-center justify-between px-6 py-4 bg-warm-sunrise-charcoal/95 backdrop-blur border-b-2 border-warm-sunrise-lime">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tighter uppercase font-display text-warm-sunrise-lime hover:text-warm-sunrise-offwhite transition-colors"
        >
          Jay Life<span className="text-warm-sunrise-orange">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-bold uppercase tracking-widest text-warm-sunrise-offwhite hover:text-warm-sunrise-lime transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/cart"
            className="px-6 py-2 text-sm font-bold uppercase border-2 bg-warm-sunrise-lime text-warm-sunrise-charcoal border-warm-sunrise-offwhite shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            Cart ({cartCount})
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          className="md:hidden p-2 text-warm-sunrise-lime hover:text-warm-sunrise-orange focus:outline-none focus:ring-2 focus:ring-warm-sunrise-lime focus:ring-offset-2 rounded transition-all"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[40] bg-warm-sunrise-charcoal pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-4xl font-black uppercase font-display text-warm-sunrise-offwhite border-b-2 border-warm-sunrise-charcoal/50 pb-4 hover:pl-4 transition-all hover:text-warm-sunrise-lime hover:border-warm-sunrise-lime"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/cart"
                className="text-4xl font-black uppercase font-display text-warm-sunrise-lime border-b-2 border-warm-sunrise-charcoal/50 pb-4 hover:pl-4 transition-all"
              >
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
