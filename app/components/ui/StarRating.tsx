interface StarRatingProps {
  rating: number; // 0 to 5
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showCount?: boolean;
}

export function StarRating({
  rating,
  count,
  size = 'md',
  className = '',
  showCount = true,
}: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex text-acid">
        {stars.map((star) => (
          <svg
            key={star}
            className={`${sizeClasses[size]} ${star <= rating ? 'fill-current' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.04894 1.20163C9.34834 0.280053 10.6517 0.280053 10.9511 1.20163L12.9127 7.23847C13.0466 7.65064 13.4307 7.92971 13.864 7.92971H20.2111C21.18 7.92971 21.5828 9.16962 20.799 9.7391L15.6639 13.4697C15.3134 13.7243 15.1667 14.1757 15.3006 14.5878L17.2622 20.6247C17.5616 21.5463 16.507 22.3125 15.7232 21.743L10.5881 18.0124C10.2376 17.7578 9.76242 17.7578 9.41188 18.0124L4.27677 21.743C3.493 22.3125 2.43838 21.5463 2.73778 20.6247L4.69941 14.5878C4.83333 14.1757 4.68662 13.7243 4.33612 13.4697L-0.799017 9.7391C-1.58278 9.16962 -1.18004 7.92971 -0.211099 7.92971H6.13601C6.56934 7.92971 6.95345 7.65064 7.08737 7.23847L9.04894 1.20163Z"
              fill={star <= rating ? 'currentColor' : '#D1D5DB'}
            />
          </svg>
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-charcoal/60 font-medium ml-1">({count})</span>
      )}
    </div>
  );
}
