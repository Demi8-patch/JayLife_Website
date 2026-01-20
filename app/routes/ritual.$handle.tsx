import { useState } from 'react';
import type { MetaFunction, LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Link } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';
import { motion } from 'framer-motion';
import { getRitualByHandle, getSynergyRituals } from '~/lib/mock-data';
import { StarRating } from '~/components/ui/StarRating';
import { PriceDisplay } from '~/components/ui/PriceDisplay';
import { SaleBadge, ProductBadge } from '~/components/ui/SaleBadge';
import { WishlistButton } from '~/components/ui/WishlistButton';
import { VariantSelector } from '~/components/product/VariantSelector';
import { DeliveryEstimate } from '~/components/product/DeliveryEstimate';
import { FAQAccordion } from '~/components/ui/FAQAccordion';
import { ReviewSection } from '~/components/product/ReviewSection';
import { QuantitySelector } from '~/components/ui/QuantitySelector';
import { ProductCarousel } from '~/components/product/ProductCarousel';
import {
  CartIcon,
  CheckIcon,
  TruckIcon,
  ShieldCheckIcon,
  BeakerIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '~/components/ui/Icons';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.ritual) {
    return [{ title: 'Ritual Not Found | Jay Life' }];
  }
  return [
    { title: `${data.ritual.title} | Jay Life` },
    { name: 'description', content: data.ritual.tagline },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const ritual = getRitualByHandle(params.handle || '');

  if (!ritual) {
    throw new Response('Ritual not found', { status: 404 });
  }

  const synergyRituals = getSynergyRituals(ritual.synergyRituals || []);

  return json({ ritual, synergyRituals });
}

export default function RitualPage() {
  const { ritual, synergyRituals } = useLoaderData<typeof loader>();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(ritual.variants?.[0] || null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'how-to'>('benefits');

  const images = ritual.images || [ritual.image || ''];

  const handleAddToCart = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    console.log('Add to cart:', { ritual: ritual.handle, quantity, variant: selectedVariant });
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-warm-sunrise-offwhite min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-6">
        <nav className="text-sm text-muted">
          <Link to="/" className="hover:text-warm-sunrise-charcoal">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/rituals" className="hover:text-warm-sunrise-charcoal">Rituals</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-navy font-medium">{ritual.title}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              {/* Sale Badge */}
              {ritual.discountPercent && ritual.discountPercent > 0 && (
                <SaleBadge percent={ritual.discountPercent} position="top-right" />
              )}

              {/* Wishlist */}
              <WishlistButton productHandle={ritual.handle} />

              {/* Image */}
              <motion.img
                key={selectedImageIndex}
                src={images[selectedImageIndex]}
                alt={ritual.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      idx === selectedImageIndex
                        ? 'border-electric-lime'
                        : 'border-transparent hover:border-brand-navy/20'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={img} alt={`${ritual.title} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            {ritual.badges && ritual.badges.length > 0 && (
              <div className="flex gap-2">
                {ritual.badges.map((badge) => (
                  <ProductBadge key={badge} type={badge} />
                ))}
              </div>
            )}

            {/* Title */}
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-brand-navy mb-2">
                {ritual.title}
              </h1>
              <p className="text-lg text-brand-navy/70">{ritual.tagline}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={ritual.rating} size="md" showCount={false} />
              <span className="font-bold text-brand-navy">{ritual.rating}</span>
              <button type="button" className="text-sm text-electric-lime hover:underline font-medium">
                ({ritual.reviewCount} reviews)
              </button>
            </div>

            {/* Price */}
            <div>
              <PriceDisplay
                price={ritual.price}
                compareAtPrice={ritual.compareAtPrice}
                discountPercent={ritual.discountPercent}
                size="lg"
              />
            </div>

            {/* Variant Selector */}
            {ritual.variants && ritual.variants.length > 0 && (
              <VariantSelector
                variants={ritual.variants}
                selectedVariant={selectedVariant}
                onSelect={setSelectedVariant}
                label="Choose Flavor"
              />
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-2">Quantity</label>
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
                min={1}
                max={ritual.stockCount || 99}
                size="lg"
              />
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!ritual.inStock}
              className="btn-add-to-cart"
            >
              <CartIcon className="w-5 h-5" />
              {ritual.inStock ? `Add ${quantity} to Cart` : 'Out of Stock'}
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-brand-navy/10">
              <div className="flex items-center gap-2">
                <BeakerIcon className="w-5 h-5 text-electric-lime" />
                <span className="text-sm font-medium text-brand-navy">Lab Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5 text-electric-lime" />
                <span className="text-sm font-medium text-brand-navy">Quality Assured</span>
              </div>
              <div className="flex items-center gap-2">
                <TruckIcon className="w-5 h-5 text-electric-lime" />
                <span className="text-sm font-medium text-brand-navy">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-electric-lime" />
                <span className="text-sm font-medium text-brand-navy">Easy Returns</span>
              </div>
            </div>

            {/* Delivery Estimate */}
            <DeliveryEstimate deliveryDays={ritual.deliveryDays} />
          </div>
        </div>
      </div>

      {/* Tabbed Content Section */}
      <div className="bg-white py-12 md:py-16 border-t border-brand-navy/5">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-brand-navy/10">
            {(['benefits', 'ingredients', 'how-to'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-bold text-sm uppercase tracking-wide transition-colors relative ${
                  activeTab === tab
                    ? 'text-brand-navy'
                    : 'text-muted hover:text-brand-navy'
                }`}
              >
                {tab === 'benefits' && 'Benefits'}
                {tab === 'ingredients' && 'Ingredients'}
                {tab === 'how-to' && 'How to Use'}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-lime"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl">
            {activeTab === 'benefits' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="font-display font-bold text-2xl text-brand-navy mb-4">
                  What Makes It Work
                </h3>
                <ul className="space-y-3">
                  {ritual.benefits?.map((benefit, idx) => (
                    <li key={idx} className="flex gap-3">
                      <CheckIcon className="w-5 h-5 text-electric-lime flex-shrink-0 mt-0.5" />
                      <span className="text-brand-navy">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {activeTab === 'ingredients' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="font-display font-bold text-2xl text-brand-navy mb-4">
                  Full Transparency
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {ritual.ingredients.map((ing, idx) => (
                    <div key={idx} className="bg-brand-cream rounded-xl p-4 border border-brand-navy/5">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-brand-navy">{ing.name}</h4>
                        <span className="text-sm font-mono font-bold text-electric-lime">{ing.dose}</span>
                      </div>
                      <p className="text-sm text-muted">
                        Clinically studied dose for optimal effectiveness.
                      </p>
                    </div>
                  ))}
                </div>
                {ritual.labReportUrl && (
                  <a
                    href={ritual.labReportUrl}
                    className="inline-flex items-center gap-2 text-electric-lime hover:underline font-bold"
                  >
                    <BeakerIcon className="w-5 h-5" />
                    View Lab Report
                  </a>
                )}
              </motion.div>
            )}

            {activeTab === 'how-to' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="font-display font-bold text-2xl text-brand-navy mb-4">
                  Usage Instructions
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-brand-navy">
                    Take 1 capsule daily with water. For best results, take at the same time each day.
                    Consistency is key to experiencing the full benefits.
                  </p>
                  <p className="text-muted text-sm mt-4">
                    * These statements have not been evaluated by the FDA. This product is not intended
                    to diagnose, treat, cure, or prevent any disease.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      {ritual.faqs && ritual.faqs.length > 0 && (
        <div className="py-12 md:py-16 bg-brand-cream">
          <div className="max-w-4xl mx-auto px-5 md:px-10">
            <FAQAccordion
              faqs={ritual.faqs}
              title="Frequently Asked Questions"
            />
          </div>
        </div>
      )}

      {/* Reviews */}
      {ritual.reviews && ritual.reviews.length > 0 && (
        <div className="py-12 md:py-16 bg-white border-t border-brand-navy/5">
          <div className="max-w-7xl mx-auto px-5 md:px-10">
            <ReviewSection
              reviews={ritual.reviews}
              averageRating={ritual.rating}
              totalReviews={ritual.reviewCount}
            />
          </div>
        </div>
      )}

      {/* You Might Also Like */}
      {synergyRituals.length > 0 && (
        <div className="py-12 md:py-16 bg-brand-cream">
          <ProductCarousel
            rituals={synergyRituals}
            title="You Might Also Like"
            subtitle="Perfect Pairings"
          />
        </div>
      )}
    </div>
  );
}
