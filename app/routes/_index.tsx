import type { MetaFunction } from '@shopify/remix-oxygen';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { RitualGrid } from '~/components/product/RitualGrid';
import { RITUALS } from '~/lib/mock-data';
import { TrustBadge } from '~/components/ui/TrustBadge';
import { StarRating } from '~/components/ui/StarRating';
import { CheckIcon } from '~/components/ui/Icons';

export const meta: MetaFunction = () => {
  return [
    { title: 'Jay Life | Wellness made simple.' },
    { name: 'description', content: 'Science-backed supplements for focus, calm, and performance. No gimmicks. Just results.' },
    { property: 'og:title', content: 'Jay Life | Wellness made simple.' },
    { property: 'og:description', content: 'Science-backed supplements for focus, calm, and performance.' },
  ];
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Homepage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-cream lg:min-h-[85vh] flex items-center">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,155,122,0.1),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-5 md:px-10 w-full pt-20 pb-12 lg:pt-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Hero Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="relative z-10 text-center lg:text-left"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-brand-sage/10 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-sage animate-pulse" />
                <span className="text-xs font-bold tracking-wide text-brand-navy uppercase">Science-backed wellness</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-brand-navy mb-6 leading-[1.05] tracking-tight"
              >
                Feel your best.
                <br />
                <span className="text-brand-sage">Every day.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-brand-navy/70 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                Simple, effective rituals for focus, calm, and energy.
                Formulated with clinical doses. No miracle claims.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/rituals" className="bg-brand-navy text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-brand-sage transition-colors shadow-lg shadow-brand-navy/10">
                  Shop Bestsellers
                </Link>
                <Link to="/learn" className="bg-white text-brand-navy border border-brand-navy/10 px-8 py-4 rounded-xl font-medium text-lg hover:bg-white/80 transition-colors">
                  How it works
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-cream bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <StarRating rating={5} size="sm" showCount={false} />
                  <p className="text-sm text-brand-navy/80 font-medium">4,500+ Happy Customers</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-0 hidden lg:block"
            >
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=1200&auto=format&fit=crop"
                  alt="Jay Life Daily Essentials"
                  className="w-full h-full object-cover"
                />
                {/* Floating Badge */}
                <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-green-100 p-1.5 rounded-full text-green-700">
                      <CheckIcon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-brand-navy">Daily Essentials</span>
                  </div>
                  <p className="text-xs text-brand-navy/70">"My energy levels have never been more consistent."</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-brand-navy/5 bg-white py-8 overflow-hidden">
        <div className="marquee-container flex gap-12 md:gap-24 justify-center items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <TrustBadge label="Lab Verified" icon={<CheckIcon className="w-5 h-5" />} className="border-0 p-0 bg-transparent flex-row gap-3" />
          <TrustBadge label="Made in USA" icon={<CheckIcon className="w-5 h-5" />} className="border-0 p-0 bg-transparent flex-row gap-3" />
          <TrustBadge label="30-Day Guarantee" icon={<CheckIcon className="w-5 h-5" />} className="border-0 p-0 bg-transparent flex-row gap-3" />
          <TrustBadge label="Free Shipping $50+" icon={<CheckIcon className="w-5 h-5" />} className="border-0 p-0 bg-transparent flex-row gap-3" />
        </div>
      </section>

      {/* Product Grid */}
      <RitualGrid rituals={RITUALS} />

      {/* How It Works */}
      <section className="py-20 bg-brand-navy text-brand-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 text-center relative z-10">
          <span className="text-brand-sage font-bold tracking-wider uppercase text-sm mb-3 block">Simple & Effective</span>
          <h2 className="font-display font-bold text-4xl mb-12">Your Wellness Journey in 3 Steps</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="font-display font-bold text-2xl mb-4">Choose Your Formula</h3>
              <p className="text-white/70 leading-relaxed">Pick the blend that matches your goals. Focus, Calm, or Gut health.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <div className="text-5xl mb-6">📦</div>
              <h3 className="font-display font-bold text-2xl mb-4">Make it a Habit</h3>
              <p className="text-white/70 leading-relaxed">Same time, every day. We make it easy to remember with smart packaging.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <div className="text-5xl mb-6">✨</div>
              <h3 className="font-display font-bold text-2xl mb-4">See Results</h3>
              <p className="text-white/70 leading-relaxed">Consistency is key. Most people notice a visible difference in 3-5 weeks.</p>
            </div>
          </div>

          <div className="mt-12">
            <Link to="/rituals" className="inline-block bg-brand-sage text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-brand-navy transition-colors">
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <StarRating rating={5} size="lg" className="justify-center mb-6" />
          <h2 className="font-display font-bold text-3xl md:text-5xl text-brand-navy mb-8 leading-tight">
            "I've tried dozens of supplements. Jay Life FOCUS is the first that actually works without the crash."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="https://i.pravatar.cc/100?img=32" alt="Sarah M." />
            </div>
            <div className="text-left">
              <div className="font-bold text-brand-navy">Sarah M.</div>
              <div className="text-xs text-brand-navy/60 uppercase tracking-wide">Verified Buyer • Focus Ritual</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
