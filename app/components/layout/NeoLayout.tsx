import { NeoNavbar } from './NeoNavbar';
import { NeoFooter } from './NeoFooter';

interface LayoutProps {
  children: React.ReactNode;
}

export function NeoLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-warm-sunrise-offwhite selection:bg-warm-sunrise-lime selection:text-warm-sunrise-charcoal">
      <NeoNavbar />
      <main className="flex-grow pt-[72px]">{children}</main>
      <NeoFooter />
    </div>
  );
}
