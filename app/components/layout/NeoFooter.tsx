import { Link } from '@remix-run/react';

export function NeoFooter() {
  return (
    <footer className="bg-warm-sunrise-charcoal text-warm-sunrise-offwhite border-t-4 border-warm-sunrise-lime pt-20 pb-10 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section: CTA + Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-black font-display uppercase leading-[0.9] mb-6">
              Never Miss <br />
              <span className="text-warm-sunrise-lime">The Drop.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="mb-4 text-warm-sunrise-blush font-medium">
              Join the insider list. No spam, just vibes.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="EMAIL ADDRESS"
                aria-label="Email address for newsletter"
                className="flex-1 bg-warm-sunrise-offwhite text-warm-sunrise-charcoal font-bold px-4 py-4 uppercase placeholder:text-warm-sunrise-charcoal/50 focus:outline-none border-2 border-transparent focus:border-warm-sunrise-lime focus:ring-2 focus:ring-warm-sunrise-lime focus:ring-inset"
              />
              <button className="bg-warm-sunrise-lime text-warm-sunrise-charcoal px-8 font-black uppercase hover:bg-warm-sunrise-orange hover:text-white transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t-2 border-warm-sunrise-offwhite/10 pt-12">
          {['Shop', 'Focus', 'Calm', 'Gut', 'Glow', 'Move'].map((item) => (
            <div key={item}>
              <Link
                to="/rituals"
                className="block text-xl font-bold uppercase hover:text-warm-sunrise-lime mb-2"
              >
                {item}
              </Link>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm text-warm-sunrise-lime font-mono mb-4 uppercase">Support</h4>
            <Link to="/account" className="block text-sm hover:text-warm-sunrise-lime mb-2">
              My Account
            </Link>
            <Link to="/faq" className="block text-sm hover:text-warm-sunrise-lime mb-2">
              FAQ
            </Link>
            <Link to="/contact" className="block text-sm hover:text-warm-sunrise-lime mb-2">
              Contact
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-warm-sunrise-offwhite/40 uppercase tracking-widest gap-4">
          <div>© 2026 Jay Life. All rights reserved.</div>
          <div className="flex gap-4">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-warm-sunrise-lime/5 rounded-full blur-[100px] pointer-events-none"></div>
    </footer>
  );
}
