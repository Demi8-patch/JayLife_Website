import type { MetaFunction } from '@shopify/remix-oxygen';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Learn | Jay Life' },
    { name: 'description', content: 'Understand how your rituals work.' },
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
    <div className="px-5 md:px-20 py-12 md:py-20">
      <h1 className="text-hero font-bold mb-2">Learn</h1>
      <p className="text-muted mb-12">
        Explain it like I'm 15. No jargon, just science.
      </p>

      <div className="space-y-6">
        {ARTICLES.map((article) => (
          <Link
            key={article.slug}
            to={`/learn/${article.slug}`}
            className="block bg-white p-6 rounded-card hover:shadow-card transition-shadow"
          >
            <span className="text-xs font-mono text-muted">{article.category}</span>
            <h2 className="font-bold text-lg mt-1 mb-2">{article.title}</h2>
            <p className="text-muted text-sm">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
