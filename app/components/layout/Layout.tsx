import type { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Desktop header - hidden on mobile */}
      <Header className="hidden md:flex" />

      {/* Main content with bottom padding for mobile nav */}
      <main id="main-content" className="pb-safe md:pb-0">{children}</main>

      {/* Mobile bottom nav - hidden on desktop */}
      <BottomNav className="md:hidden" />
    </div>
  );
}
