import { Link } from '@remix-run/react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-brand-cream border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link
              to="/"
              className="font-display text-2xl font-bold tracking-tight text-white mb-4 block"
            >
              JAY LIFE
            </Link>
            <p className="text-brand-cream/70 text-sm leading-relaxed mb-6">
              Science-backed supplements for focus, calm, and performance. No gimmicks. Just
              results.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/rituals"
                  className="text-sm text-brand-cream/70 hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/rituals/focus"
                  className="text-sm text-brand-cream/70 hover:text-white transition-colors"
                >
                  Focus
                </Link>
              </li>
              <li>
                <Link
                  to="/rituals/calm"
                  className="text-sm text-brand-cream/70 hover:text-white transition-colors"
                >
                  Calm
                </Link>
              </li>
              <li>
                <Link
                  to="/rituals/gut"
                  className="text-sm text-brand-cream/70 hover:text-white transition-colors"
                >
                  Gut
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-brand-cream/70 hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/learn"
                  className="text-sm text-brand-cream/70 hover:text-white transition-colors"
                >
                  Science & Ingredients
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-brand-cream/70 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-brand-cream/70 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Stay in the loop</h3>
            <p className="text-sm text-brand-cream/70 mb-4">
              Join our community for wellness tips and exclusive offers.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-acid w-full"
              />
              <button
                type="submit"
                className="bg-acid hover:bg-acid/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-cream/50">
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
          <p>© {currentYear} Jay Life. All rights reserved.</p>
        </div>

        <div className="mt-8 text-[10px] text-brand-cream/30 text-center leading-relaxed max-w-4xl mx-auto">
          * These statements have not been evaluated by the Food and Drug Administration. This
          product is not intended to diagnose, treat, cure, or prevent any disease.
        </div>
      </div>
    </footer>
  );
}
