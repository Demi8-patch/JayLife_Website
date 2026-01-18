import { Link } from '@remix-run/react';
import { StarRating } from './StarRating';

interface ProductCardProps {
    id: string;
    title: string;
    tagline: string;
    price: string;
    image: string;
    rating: number;
    reviewCount: number;
    handle: string;
}

export function ProductCard({ id, title, tagline, price, image, rating, reviewCount, handle }: ProductCardProps) {
    return (
        <div className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-brand-navy/5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            {/* Image Area */}
            <Link to={`/rituals/${handle}`} className="relative aspect-square bg-brand-cream/50 overflow-hidden">
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-navy/20 font-display font-bold text-2xl">
                        {title}
                    </div>
                )}
                {/* Quick Add Overlay (Desktop) */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
                    <button className="w-full bg-brand-navy text-white text-sm font-medium py-3 rounded-xl hover:bg-brand-sage transition-colors shadow-lg">
                        Quick Add — {price}
                    </button>
                </div>
            </Link>

            {/* Content Area */}
            <div className="flex flex-col flex-grow p-5">
                <div className="mb-2">
                    <StarRating rating={rating} count={reviewCount} size="sm" />
                </div>

                <Link to={`/rituals/${handle}`} className="block">
                    <h3 className="font-display font-bold text-lg text-brand-navy mb-1">{title}</h3>
                    <p className="text-sm text-brand-navy/70 line-clamp-2 min-h-[40px]">{tagline}</p>
                </Link>

                <div className="mt-auto pt-4 flex items-center justify-between md:hidden">
                    <span className="font-bold text-brand-navy">{price}</span>
                    <button className="bg-brand-navy/10 text-brand-navy p-2 rounded-full hover:bg-brand-navy hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
