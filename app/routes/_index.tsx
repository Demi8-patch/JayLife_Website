import { Link } from '@remix-run/react';
import type { MetaFunction } from '@shopify/remix-oxygen';
import { motion } from 'framer-motion';
import { BundleCard } from '~/components/product/BundleCard';
import { ProductCarousel } from '~/components/product/ProductCarousel';
import { RitualGrid } from '~/components/product/RitualGrid';
import { StarRating } from '~/components/ui/StarRating';
import { TrustBadge } from '~/components/ui/TrustBadge';
import { RITUALS } from '~/lib/mock-data';

import { CountdownTimer } from '~/components/ui/CountdownTimer';
import { EmailCapture } from '~/components/ui/EmailCapture';
import { ExitIntentPopup } from '~/components/ui/ExitIntentPopup';
import {
  BeakerIcon,
  CartIcon,
  CheckIcon,
  ChevronRightIcon,
  FlagIcon,
  ShieldCheckIcon,
  TruckIcon,
} from '~/components/ui/Icons';

export const meta: MetaFunction = () => {
  return [
    { title: 'Jay Life | Wellness made simple.' },
    {
      name: 'description',
      content:
        'Science-backed supplements for focus, calm, and performance. No gimmicks. Just results.',
    },
    { property: 'og:title', content: 'Jay Life | Wellness made simple.' },
    {
      property: 'og:description',
      content: 'Science-backed supplements for focus, calm, and performance.',
    },
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

// Mock bundles data
const BUNDLES = [
  {
    title: 'The Starter Stack',
    tagline: 'Perfect combo for daily optimization',
    handle: 'starter-stack',
    price: 89.99,
    compareAtPrice: 119.97,
    discountPercent: 25,
    products: [
      { title: 'FOCUS', image: RITUALS[0]?.image },
      { title: 'CALM', image: RITUALS[1]?.image },
    ],
    benefits: [
      'Save 25% vs buying separately',
      'Free shipping included',
      '30-day money back guarantee',
    ],
  },
  {
    title: 'The Complete Stack',
    tagline: 'Everything you need for total wellness',
    handle: 'complete-stack',
    price: 149.99,
    compareAtPrice: 209.95,
    discountPercent: 29,
    products: [
      { title: 'FOCUS', image: RITUALS[0]?.image },
      { title: 'CALM', image: RITUALS[1]?.image },
      { title: 'GUT', image: RITUALS[2]?.image },
      { title: 'IMMUNE', image: RITUALS[3]?.image },
    ],
    benefits: [
      'Save 29% vs buying separately',
      'Free express shipping',
      'Priority customer support',
    ],
  },
];

// Categories for quick shop
const CATEGORIES = [
  { name: 'Focus & Energy', icon: '🎯', handle: 'focus-energy', count: 3 },
  { name: 'Calm & Sleep', icon: '😌', handle: 'calm-sleep', count: 2 },
  { name: 'Gut Health', icon: '🌿', handle: 'gut-health', count: 2 },
  { name: 'Immunity', icon: '🛡️', handle: 'immunity', count: 2 },
];

// Testimonials
const TESTIMONIALS = [
  {
    quote:
      "I've tried dozens of supplements. Jay Life FOCUS is the first that actually works without the crash.",
    author: 'Sarah M.',
    role: 'Marketing Manager',
    product: 'Focus Ritual',
    rating: 5,
    avatar: '/images/avatars/sarah.svg',
  },
  {
    quote:
      'CALM has completely transformed my evenings. I fall asleep faster and wake up refreshed.',
    author: 'Michael R.',
    role: 'Software Engineer',
    product: 'Calm Ritual',
    rating: 5,
    avatar: '/images/avatars/michael.svg',
  },
  {
    quote:
      'Finally, a gut supplement that actually works. No bloating, better digestion, more energy.',
    author: 'Jessica T.',
    role: 'Fitness Coach',
    product: 'Gut Ritual',
    rating: 5,
    avatar: '/images/avatars/jessica.svg',
  },
];

export default function Homepage() {
  // Get bestsellers (products with Bestseller badge or top rated)
  const bestsellers = RITUALS.filter((r) => r.badges?.includes('Bestseller') || r.rating >= 4.8);

  return (
    <>
      {/* Hero Section - E-commerce Focused */}
      <section className="relative overflow-hidden bg-warm-sunrise-offwhite">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(191,255,0,0.1),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-5 md:px-10 w-full pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="relative z-10 text-center lg:text-left"
            >
              {/* Sale Badge */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 bg-warm-sunrise-orange text-white rounded-full px-4 py-1.5 mb-6"
              >
                <span className="font-bold text-sm">
                  NEW YEAR SALE - Ends in{' '}
                  <CountdownTimer targetDate={new Date(Date.now() + 24 * 60 * 60 * 1000)} />
                </span>
                <span className="text-xs opacity-80">Up to 30% off</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-warm-sunrise-charcoal mb-6 leading-[1.1] tracking-tight"
              >
                Science-backed
                <br />
                supplements that
                <br />
                <span className="text-warm-sunrise-lime">actually work.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-warm-sunrise-charcoal/70 text-lg max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                Clinical-dose formulas for focus, calm, and gut health. No proprietary blends. No
                miracle claims. Just results.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
              >
                <Link
                  to="/rituals"
                  className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
                >
                  <CartIcon className="w-5 h-5" />
                  Shop Now
                </Link>
                <Link
                  to="/learn"
                  className="bg-white text-charcoal border-2 border-charcoal/10 px-8 py-4 rounded-xl font-bold text-lg hover:border-charcoal/30 transition-colors inline-flex items-center justify-center gap-2"
                >
                  See the Science
                  <ChevronRightIcon className="w-5 h-5" />
                </Link>
              </motion.div>

              {/* Social Proof Row */}
              <motion.div
                variants={fadeUp}
                className="flex items-center justify-center lg:justify-start gap-6"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-brand-cream bg-gray-200 overflow-hidden"
                    >
                      <img
                        src={`/images/avatars/proof-${i}.svg`}
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <StarRating rating={5} size="sm" showCount={false} />
                    <span className="font-bold text-charcoal">4.9</span>
                  </div>
                  <p className="text-sm text-charcoal/60">12,000+ Happy Customers</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Product Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative z-0 hidden lg:block"
            >
              <div className="relative">
                {/* Main Product Image */}
                <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=800&auto=format&fit=crop"
                    alt="Jay Life Supplements"
                    className="w-full h-full object-cover"
                    width={800}
                    height={800}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />

                  {/* Sale Badge Overlay */}
                  <div className="absolute top-6 left-6 bg-sale-red text-white px-4 py-2 rounded-xl font-bold">
                    30% OFF
                  </div>
                </div>

                {/* Floating Trust Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-charcoal/5">
                  <div className="flex items-center gap-3">
                    <div className="bg-electric-lime/20 p-2 rounded-full">
                      <ShieldCheckIcon className="w-6 h-6 text-electric-lime" />
                    </div>
                    <div>
                      <p className="font-bold text-charcoal text-sm">Lab Verified</p>
                      <p className="text-xs text-charcoal/60">3rd party tested</p>
                    </div>
                  </div>
                </div>

                {/* Floating Review */}
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-charcoal/5 max-w-[200px]">
                  <StarRating rating={5} size="sm" showCount={false} />
                  <p className="text-xs text-charcoal/70 mt-2">
                    "Finally found something that works!"
                  </p>
                  <p className="text-xs font-bold text-charcoal mt-1">— Alex K.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-charcoal/5 bg-white py-6">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-8">
            <TrustBadge
              label="Lab Verified"
              icon={<BeakerIcon className="w-5 h-5" />}
              className="border-0 p-0 bg-transparent flex-row gap-2"
            />
            <TrustBadge
              label="Made in USA"
              icon={<FlagIcon className="w-5 h-5" />}
              className="border-0 p-0 bg-transparent flex-row gap-2"
            />
            <TrustBadge
              label="30-Day Guarantee"
              icon={<ShieldCheckIcon className="w-5 h-5" />}
              className="border-0 p-0 bg-transparent flex-row gap-2"
            />
            <TrustBadge
              label="Free Shipping $50+"
              icon={<TruckIcon className="w-5 h-5" />}
              className="border-0 p-0 bg-transparent flex-row gap-2"
            />
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-12 md:py-16 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal text-center mb-8">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.handle}
                to={`/category/${category.handle}`}
                className="group bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-charcoal/5 hover:border-electric-lime"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-bold text-charcoal group-hover:text-electric-lime transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-charcoal/60 mt-1">{category.count} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Carousel */}
      <ProductCarousel rituals={bestsellers} title="Bestsellers" subtitle="Most Popular" />

      {/* All Products Grid */}
      <section className="py-12 md:py-16 bg-warm-sunrise-offwhite">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-warm-sunrise-charcoal text-center mb-8">
            All Rituals
          </h2>
          <RitualGrid rituals={RITUALS} />
        </div>
      </section>

      {/* Why Jay Life - Dark Section */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(191,255,0,0.1),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
          <div className="text-center mb-16">
            <span className="text-electric-lime font-bold tracking-wider uppercase text-sm mb-3 block">
              Why Choose Us
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">
              The Jay Life Difference
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We believe in transparency, clinical dosing, and ingredients that actually work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <div className="w-14 h-14 bg-electric-lime/20 rounded-2xl flex items-center justify-center mb-6">
                <BeakerIcon className="w-7 h-7 text-electric-lime" />
              </div>
              <h3 className="font-display font-bold text-xl mb-4">Clinical Doses</h3>
              <p className="text-white/60 leading-relaxed">
                Every ingredient at the dose proven effective in clinical studies. No pixie dusting.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <div className="w-14 h-14 bg-electric-lime/20 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheckIcon className="w-7 h-7 text-electric-lime" />
              </div>
              <h3 className="font-display font-bold text-xl mb-4">3rd Party Tested</h3>
              <p className="text-white/60 leading-relaxed">
                Every batch tested for purity and potency. View lab reports on each product page.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <div className="w-14 h-14 bg-electric-lime/20 rounded-2xl flex items-center justify-center mb-6">
                <CheckIcon className="w-7 h-7 text-electric-lime" />
              </div>
              <h3 className="font-display font-bold text-xl mb-4">No Proprietary Blends</h3>
              <p className="text-white/60 leading-relaxed">
                We show exactly what's in every capsule. Full transparency, always.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-electric-lime font-bold hover:underline"
            >
              Learn more about our standards
              <ChevronRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bundle & Save Section */}
      <section className="py-16 md:py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <span className="text-sale-red font-bold tracking-wider uppercase text-sm mb-3 block">
              Save More
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal mb-4">
              Bundle & Save Up to 30%
            </h2>
            <p className="text-charcoal/60 max-w-xl mx-auto">
              Stack your supplements for maximum results and savings. Free shipping on all bundles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {BUNDLES.map((bundle) => (
              <BundleCard key={bundle.handle} {...bundle} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <span className="text-acid font-bold tracking-wider uppercase text-sm mb-3 block">
              Reviews
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-charcoal mb-4">
              Loved by 12,000+ Customers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className="bg-brand-cream rounded-2xl p-6 border border-charcoal/5"
              >
                <StarRating
                  rating={testimonial.rating}
                  size="sm"
                  showCount={false}
                  className="mb-4"
                />
                <p className="text-charcoal mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-charcoal">{testimonial.author}</p>
                    <p className="text-xs text-charcoal/60">
                      {testimonial.role} • {testimonial.product}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 text-charcoal font-bold hover:text-electric-lime transition-colors"
            >
              Read all reviews
              <ChevronRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - Simplified */}
      <section className="py-16 md:py-20 bg-charcoal text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10 text-center relative z-10">
          <span className="text-electric-lime font-bold tracking-wider uppercase text-sm mb-3 block">
            Simple & Effective
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">
            Start Your Ritual in 3 Steps
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="relative">
              <div className="w-16 h-16 bg-electric-lime text-dark font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-6">
                1
              </div>
              <h3 className="font-display font-bold text-xl mb-3">Choose Your Stack</h3>
              <p className="text-white/60">
                Pick the formulas that match your goals. Focus, Calm, Gut, or all three.
              </p>
            </div>

            <div className="relative">
              <div className="w-16 h-16 bg-electric-lime text-dark font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-6">
                2
              </div>
              <h3 className="font-display font-bold text-xl mb-3">Build the Habit</h3>
              <p className="text-white/60">
                Same time, every day. Morning or evening. Consistency is key.
              </p>
            </div>

            <div className="relative">
              <div className="w-16 h-16 bg-electric-lime text-dark font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-6">
                3
              </div>
              <h3 className="font-display font-bold text-xl mb-3">Feel the Difference</h3>
              <p className="text-white/60">
                Most people notice results in 2-4 weeks. Real change takes time.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              to="/rituals"
              className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
            >
              <CartIcon className="w-5 h-5" />
              Start Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <EmailCapture />
      <ExitIntentPopup />
    </>
  );
}
