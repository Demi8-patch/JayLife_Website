import type { MetaFunction } from '@shopify/remix-oxygen';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Science & Learn | Jay Life' },
    { name: 'description', content: 'Understand the science behind our wellness routines.' },
  ];
};

const ARTICLES = [
  {
    slug: 'how-l-theanine-works',
    title: 'How L-Theanine Works',
    excerpt: 'The science behind calm focus without the jitters.',
    category: 'FOCUS',
  },
  {
    slug: 'ashwagandha-explained',
    title: 'Ashwagandha Explained',
    excerpt: 'Why this ancient herb helps modern stress.',
    category: 'CALM',
  },
  {
    slug: 'gut-brain-connection',
    title: 'The Gut-Brain Connection',
    excerpt: 'How your gut affects your mood and focus.',
    category: 'GUT',
  },
  {
    slug: 'collagen-myths',
    title: 'Collagen Myths Debunked',
    excerpt: 'What actually works and what doesn\'t.',
    category: 'GLOW',
  },
];

export default function LearnPage() {
  return (
    <div className="bg-brand-cream/30 min-h-screen">
      <div className="max-w-4xl mx-auto px-5 md:px-10 py-12 md:py-20">
        <span className="text-brand-sage font-bold tracking-wider uppercase text-sm mb-3 block">Education First</span>
        <h1 className="font-display font-bold text-5xl text-brand-navy mb-4">Learn</h1>
        <p className="text-brand-navy/60 text-lg mb-12 leading-relaxed">
          Transparent science, explained simply. No jargon, just results you can understand.
        </p>

        <div className="grid gap-8">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              to={`/learn/${article.slug}`}
              className="group block bg-white p-8 rounded-3xl border border-brand-navy/5 hover:border-brand-sage/20 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <span className="text-xs font-bold text-brand-sage tracking-widest uppercase mb-2 block">{article.category}</span>
              <h2 className="font-display font-bold text-2xl text-brand-navy mb-3 group-hover:text-brand-sage transition-colors">{article.title}</h2>
              <p className="text-brand-navy/70 leading-relaxed">{article.excerpt}</p>
              <div className="mt-6 flex items-center font-bold text-sm text-brand-navy group-hover:gap-2 transition-all">
                Read Article <span className="text-brand-sage">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
