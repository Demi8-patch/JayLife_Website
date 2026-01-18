export interface Ingredient {
  name: string;
  dose: string;
}

export interface Ritual {
  handle: string;
  title: string;
  tagline: string;
  price: number;
  image?: string;
  ingredients: Ingredient[];
  labReportUrl?: string;
  synergyRituals?: string[];
}

export const RITUALS: Ritual[] = [
  {
    handle: 'focus',
    title: 'FOCUS',
    tagline: 'Stay sharp. No jitters.',
    price: 34,
    image: 'https://images.unsplash.com/photo-1594489432420-a88ae15d4872?q=80&w=800&auto=format&fit=crop', // Placeholder
    ingredients: [
      { name: 'Caffeine', dose: '100mg' },
      { name: 'L-Theanine', dose: '200mg' },
      { name: 'Tyrosine', dose: '500mg' },
    ],
    labReportUrl: '#',
    synergyRituals: ['calm', 'gut'],
  },
  {
    handle: 'calm',
    title: 'CALM',
    tagline: 'Find your calm. Quiet your mind.',
    price: 29,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop', // Placeholder
    ingredients: [
      { name: 'Ashwagandha', dose: '600mg' },
      { name: 'Magnesium', dose: '400mg' },
    ],
    labReportUrl: '#',
    synergyRituals: ['focus', 'glow'],
  },
  {
    handle: 'gut',
    title: 'GUT',
    tagline: 'Healthy digestion from within.',
    price: 32,
    image: 'https://images.unsplash.com/photo-1624458316204-637996c9c7c2?q=80&w=800&auto=format&fit=crop', // Placeholder
    ingredients: [
      { name: 'Probiotics', dose: '10B CFU' },
      { name: 'Digestive Enzymes', dose: '150mg' },
    ],
    labReportUrl: '#',
    synergyRituals: ['focus', 'move'],
  },
  {
    handle: 'glow',
    title: 'GLOW',
    tagline: 'Radiance from within.',
    price: 36,
    image: 'https://images.unsplash.com/photo-1615396660145-202d0891d4d3?q=80&w=800&auto=format&fit=crop', // Placeholder
    ingredients: [
      { name: 'Collagen', dose: '5g' },
      { name: 'Biotin', dose: '5000mcg' },
      { name: 'Vitamin C', dose: '500mg' },
    ],
    labReportUrl: '#',
    synergyRituals: ['calm', 'gut'],
  },
  {
    handle: 'move',
    title: 'MOVE',
    tagline: 'Perform better. Recover faster.',
    price: 38,
    image: 'https://images.unsplash.com/photo-1594489468903-51cc6c8c4955?q=80&w=800&auto=format&fit=crop', // Placeholder
    ingredients: [
      { name: 'Creatine', dose: '3g' },
      { name: 'BCAA', dose: '5g' },
      { name: 'Zinc', dose: '30mg' },
    ],
    labReportUrl: '#',
    synergyRituals: ['focus', 'gut'],
  },
];

export function getRitualByHandle(handle: string): Ritual | undefined {
  return RITUALS.find((r) => r.handle === handle);
}

export function getSynergyRituals(handles: string[]): Ritual[] {
  return RITUALS.filter((r) => handles.includes(r.handle));
}
