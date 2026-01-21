import { useState } from 'react';
import { StarRating } from '~/components/ui/StarRating';
import { VerifiedIcon, ChevronDownIcon } from '~/components/ui/Icons';
import type { Review } from '~/lib/mock-data';

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  className?: string;
}

// Mock review data for display
const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Sarah M.',
    rating: 5,
    title: 'Finally something that works!',
    body: "I've been taking this for 3 weeks now and I can definitely feel the difference. My focus is sharper and I don't get that afternoon slump anymore. Highly recommend!",
    date: '2024-01-15',
    verified: true,
  },
  {
    id: '2',
    author: 'Michael R.',
    rating: 5,
    title: 'Great quality, no jitters',
    body: 'Love that this actually has clinical doses listed. No proprietary blend BS. Works exactly as described.',
    date: '2024-01-10',
    verified: true,
  },
  {
    id: '3',
    author: 'Jessica T.',
    rating: 4,
    title: 'Good product, shipping was slow',
    body: "The product itself is great and I'm noticing improvements. Took a while to arrive though. Otherwise very happy with my purchase.",
    date: '2024-01-05',
    verified: true,
  },
];

export function ReviewSection({ averageRating, totalReviews, className = '' }: ReviewSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');

  // Use mock reviews for display
  const displayReviews = MOCK_REVIEWS;

  // Calculate rating distribution (mock data)
  const ratingDistribution = [
    { stars: 5, count: Math.round(totalReviews * 0.75), percentage: 75 },
    { stars: 4, count: Math.round(totalReviews * 0.15), percentage: 15 },
    { stars: 3, count: Math.round(totalReviews * 0.06), percentage: 6 },
    { stars: 2, count: Math.round(totalReviews * 0.03), percentage: 3 },
    { stars: 1, count: Math.round(totalReviews * 0.01), percentage: 1 },
  ];

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">
        {/* Overall Rating */}
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-charcoal mb-2">{averageRating.toFixed(1)}</div>
          <StarRating rating={averageRating} size="md" showCount={false} />
          <p className="text-sm text-charcoal/60 mt-2">Based on {totalReviews} reviews</p>
        </div>

        {/* Rating Distribution */}
        <div className="flex-1 max-w-md">
          {ratingDistribution.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-3 mb-2">
              <span className="text-sm text-charcoal/60 w-12">{stars} star</span>
              <div className="flex-1 h-2 bg-charcoal/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-electric-lime rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-charcoal/60 w-12 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort & Filter */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-charcoal/10">
        <h3 className="font-display font-bold text-lg text-charcoal">
          Customer Reviews ({totalReviews})
        </h3>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="appearance-none bg-white border border-charcoal/10 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-charcoal cursor-pointer hover:border-charcoal/30 focus:outline-none focus:border-electric-lime"
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/60 pointer-events-none" />
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayReviews.slice(0, showAll ? undefined : 3).map((review) => (
          <div key={review.id} className="bg-white rounded-xl p-6 border border-charcoal/5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-charcoal">{review.author}</span>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-electric-lime font-medium">
                      <VerifiedIcon className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  )}
                </div>
                <StarRating rating={review.rating} size="sm" showCount={false} />
              </div>
              <span className="text-sm text-charcoal/50">
                {new Date(review.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            {review.title && <h4 className="font-bold text-charcoal mb-2">{review.title}</h4>}
            <p className="text-charcoal/70 leading-relaxed">{review.body}</p>
          </div>
        ))}
      </div>

      {/* Show More */}
      {displayReviews.length > 3 && !showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="w-full mt-6 py-3 text-center text-charcoal font-bold hover:text-electric-lime transition-colors"
        >
          Show all {totalReviews} reviews
        </button>
      )}
    </div>
  );
}
