import type { ReactNode } from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-brand-cream font-sans text-charcoal selection:bg-acid/20">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-acid focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:font-bold"
      >
        Skip to main content
      </a>

      <AnnouncementBar />
      <Header />

      <main id="main-content" className="pb-safe md:pb-0">
        {children}
      </main>

      <BottomNav />

      <Footer />
    </div>
  );
}
