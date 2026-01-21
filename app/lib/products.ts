import type { Ritual, Variant, Review } from './mock-data';
import { RITUALS, getRitualByHandle, getSynergyRituals, formatPrice } from './mock-data';

// Unified Product type (alias to Ritual for backward compatibility)
export type Product = Ritual;
export type ProductVariant = Variant;
export type ProductReview = Review;

// Re-export data and helpers under a clearer module name
export const PRODUCTS: Product[] = RITUALS;

// Local aliases so we can export named bindings and include in default export
export const getProductByHandle = getRitualByHandle;
export const getSynergyProducts = getSynergyRituals;
export const formatProductPrice = formatPrice;

// Convenience default export
export default {
  PRODUCTS,
  getProductByHandle,
  getSynergyProducts,
  formatProductPrice,
};
