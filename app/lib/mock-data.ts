export interface Ingredient {
  name: string;
  dose: string;
}

export interface Variant {
  id: string;
  name: string;
  type: 'flavor' | 'size';
  image?: string;
  price?: number;
  priceModifier?: number;
  available: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title?: string;
  content?: string;
  body?: string;
  verified: boolean;
  images?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Ritual {
  handle: string;
  title: string;
  tagline: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  discountPercent?: number;
  image?: string;
  images?: string[];
  ingredients: Ingredient[];
  labReportUrl?: string;
  synergyRituals?: string[];
  // E-commerce fields
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  variants?: Variant[];
  inStock: boolean;
  stockCount?: number;
  badges?: ('Bestseller' | 'New' | 'Limited' | 'Sale')[];
  deliveryDays?: number;
  faqs?: FAQ[];
  benefits?: string[];
}

export const RITUALS: Ritual[] = [
  {
    handle: 'focus',
    title: 'FOCUS',
    tagline: 'Stay sharp. No jitters.',
    description: 'Upgrade your cognitive performance with our precision-dosed nootropic stack. FOCUS delivers sustained mental clarity without the crash.',
    price: 27,
    compareAtPrice: 34,
    discountPercent: 21,
    image: '/images/product_focus.png',
    images: [
      '/images/product_focus.png',
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=800&auto=format&fit=crop',
    ],
    ingredients: [
      { name: 'Caffeine', dose: '100mg' },
      { name: 'L-Theanine', dose: '200mg' },
      { name: 'Tyrosine', dose: '500mg' },
    ],
    labReportUrl: '#',
    synergyRituals: ['calm', 'gut'],
    rating: 4.9,
    reviewCount: 245,
    inStock: true,
    stockCount: 42,
    badges: ['Bestseller'],
    deliveryDays: 3,
    variants: [
      { id: 'citrus', name: 'Citrus Burst', type: 'flavor', available: true },
      { id: 'berry', name: 'Berry Zen', type: 'flavor', available: true },
      { id: 'unflavored', name: 'Unflavored', type: 'flavor', available: true },
    ],
    benefits: [
      'Sustained mental clarity for 4-6 hours',
      'No jitters or crash',
      'Clinically dosed ingredients',
      'Third-party lab tested',
    ],
    faqs: [
      { question: 'When should I take FOCUS?', answer: 'Take 1 capsule in the morning or early afternoon. Avoid taking within 6 hours of bedtime due to caffeine content.' },
      { question: 'Can I stack FOCUS with other rituals?', answer: 'Yes! FOCUS pairs perfectly with CALM for balanced energy, or GUT for optimal nutrient absorption.' },
      { question: 'Is it safe for daily use?', answer: 'Absolutely. All ingredients are clinically studied and safe for daily consumption. Consult your doctor if you have any concerns.' },
    ],
    reviews: [
      { id: '1', author: 'Alex M.', rating: 5, date: '2026-01-10', title: 'Game changer for work', content: 'Finally a focus supplement that actually works without making me feel wired. Smooth energy all day.', verified: true },
      { id: '2', author: 'Sarah K.', rating: 5, date: '2026-01-08', content: 'I\'ve tried dozens of nootropics. This is the first that delivers without the crash.', verified: true },
      { id: '3', author: 'James R.', rating: 4, date: '2026-01-05', title: 'Great product', content: 'Works well for my morning routine. Would love a larger size option.', verified: true },
    ],
  },
  {
    handle: 'calm',
    title: 'CALM',
    tagline: 'Find your calm. Quiet your mind.',
    description: 'De-stress and unwind with our adaptogenic blend. CALM helps regulate cortisol levels for natural relaxation without drowsiness.',
    price: 24,
    compareAtPrice: 29,
    discountPercent: 17,
    image: '/images/product_calm.png',
    images: [
      '/images/product_calm.png',
      'https://images.unsplash.com/photo-1544367563-eab5e05ed0fa?q=80&w=800&auto=format&fit=crop',
    ],
    ingredients: [
      { name: 'Ashwagandha', dose: '600mg' },
      { name: 'Magnesium', dose: '400mg' },
    ],
    labReportUrl: '#',
    synergyRituals: ['focus', 'glow'],
    rating: 4.8,
    reviewCount: 189,
    inStock: true,
    badges: ['New'],
    deliveryDays: 3,
    variants: [
      { id: 'lavender', name: 'Lavender Mint', type: 'flavor', available: true },
      { id: 'chamomile', name: 'Chamomile', type: 'flavor', available: true },
    ],
    benefits: [
      'Reduces stress and anxiety naturally',
      'Supports quality sleep',
      'Non-drowsy formula',
      'Adaptogenic support',
    ],
    faqs: [
      { question: 'Will CALM make me sleepy?', answer: 'No. CALM promotes relaxation without sedation. It\'s designed for anytime use.' },
      { question: 'How long until I feel effects?', answer: 'Most people notice effects within 30-45 minutes. Full adaptogenic benefits build over 2-4 weeks of consistent use.' },
    ],
  },
  {
    handle: 'gut',
    title: 'GUT',
    tagline: 'Healthy digestion from within.',
    description: 'Support your microbiome with our synbiotic formula. GUT combines premium probiotics with digestive enzymes for complete gut health.',
    price: 32,
    image: '/images/product_gut.png',
    ingredients: [
      { name: 'Probiotics', dose: '10B CFU' },
      { name: 'Digestive Enzymes', dose: '150mg' },
    ],
    labReportUrl: '#',
    synergyRituals: ['focus', 'move'],
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    deliveryDays: 3,
    variants: [
      { id: '30ct', name: '30 Count', type: 'size', available: true },
      { id: '60ct', name: '60 Count', type: 'size', price: 56, available: true },
    ],
    benefits: [
      '10 billion CFU probiotics',
      'Supports nutrient absorption',
      'Reduces bloating',
      'Shelf-stable formula',
    ],
    faqs: [
      { question: 'Do I need to refrigerate GUT?', answer: 'No. Our probiotics are shelf-stable and don\'t require refrigeration.' },
    ],
  },
  {
    handle: 'glow',
    title: 'GLOW',
    tagline: 'Radiance from within.',
    description: 'Nourish your skin, hair, and nails with our beauty-from-within formula. GLOW delivers clinically effective doses of collagen and biotin.',
    price: 29,
    compareAtPrice: 36,
    discountPercent: 19,
    image: '/images/product_glow.png',
    ingredients: [
      { name: 'Collagen', dose: '5g' },
      { name: 'Biotin', dose: '5000mcg' },
      { name: 'Vitamin C', dose: '500mg' },
    ],
    labReportUrl: '#',
    synergyRituals: ['calm', 'gut'],
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    badges: ['Bestseller', 'Sale'],
    deliveryDays: 3,
    variants: [
      { id: 'berry', name: 'Mixed Berry', type: 'flavor', available: true },
      { id: 'tropical', name: 'Tropical', type: 'flavor', available: true },
      { id: 'unflavored', name: 'Unflavored', type: 'flavor', available: false },
    ],
    benefits: [
      'Hydrolyzed collagen peptides',
      'Supports skin elasticity',
      'Strengthens hair and nails',
      'Delicious flavors',
    ],
  },
  {
    handle: 'move',
    title: 'MOVE',
    tagline: 'Perform better. Recover faster.',
    description: 'Optimize your training with our performance stack. MOVE supports muscle growth, endurance, and recovery.',
    price: 32,
    compareAtPrice: 38,
    discountPercent: 16,
    image: '/images/product_move.png',
    ingredients: [
      { name: 'Creatine', dose: '3g' },
      { name: 'BCAA', dose: '5g' },
      { name: 'Zinc', dose: '30mg' },
    ],
    labReportUrl: '#',
    synergyRituals: ['focus', 'gut'],
    rating: 4.6,
    reviewCount: 98,
    inStock: true,
    stockCount: 8,
    badges: ['Limited'],
    deliveryDays: 5,
    variants: [
      { id: 'fruit', name: 'Fruit Punch', type: 'flavor', available: true },
      { id: 'lemon', name: 'Lemon Lime', type: 'flavor', available: true },
    ],
    benefits: [
      'Supports muscle growth',
      'Improves endurance',
      'Accelerates recovery',
      'Clean, tested ingredients',
    ],
  },
];

export function getRitualByHandle(handle: string): Ritual | undefined {
  return RITUALS.find((r) => r.handle === handle);
}

export function getSynergyRituals(handles: string[]): Ritual[] {
  return RITUALS.filter((r) => handles.includes(r.handle));
}

export function formatPrice(price: number): string {
  return `$${price}`;
}

export function calculateSavings(price: number, compareAtPrice?: number): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  return compareAtPrice - price;
}
