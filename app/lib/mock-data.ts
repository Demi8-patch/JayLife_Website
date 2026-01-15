export interface Ingredient {
  name: string;
  dose: string;
}

export interface Ritual {
  handle: string;
  title: string;
  tagline: string;
  price: number;
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
    tagline: 'Force-quit your brain.',
    price: 29,
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
    tagline: 'Clean processing.',
    price: 32,
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
    tagline: 'Visible upgrade.',
    price: 36,
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
    tagline: 'Rebuild faster.',
    price: 38,
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
