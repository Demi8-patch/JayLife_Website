import { NavLink } from '@remix-run/react';
import { HomeIcon, RitualsIcon, LearnIcon, AccountIcon, CartIcon } from '../ui/Icons';

interface BottomNavProps {
  className?: string;
}

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/rituals', label: 'Rituals', icon: RitualsIcon },
  { to: '/learn', label: 'Learn', icon: LearnIcon },
  { to: '/account', label: 'Account', icon: AccountIcon },
  { to: '/cart', label: 'Cart', icon: CartIcon },
];

export function BottomNav({ className = '' }: BottomNavProps) {
  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 bg-cream border-t border-charcoal/10 ${className}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex justify-between items-center h-16 px-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-touch min-h-touch gap-1 transition-colors rounded-lg focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 ${
                isActive ? 'text-charcoal' : 'text-muted'
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-caption">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
