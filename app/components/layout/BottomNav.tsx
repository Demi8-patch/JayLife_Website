import { Link, useLocation } from '@remix-run/react';
import { HomeIcon, RitualsIcon, LearnIcon, AccountIcon, CartIcon } from '../ui/Icons';

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', href: '/', icon: HomeIcon },
    { label: 'Shop', href: '/rituals', icon: RitualsIcon },
    { label: 'Learn', href: '/learn', icon: LearnIcon },
    { label: 'Account', href: '/account', icon: AccountIcon },
    { label: 'Cart', href: '/cart', icon: CartIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 backdrop-blur-md border-t border-brand-navy/5 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive ? 'text-brand-sage' : 'text-brand-navy/40 hover:text-brand-navy'
                }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
