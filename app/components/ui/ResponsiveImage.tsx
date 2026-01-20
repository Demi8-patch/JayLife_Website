interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

/**
 * Responsive image component with AVIF/WebP/JPG fallback chain.
 * Expects images at /images/ with -400, -800, -1600 suffixes.
 */
export function ResponsiveImage({
  src,
  alt,
  sizes = '(max-width: 640px) 400px, (max-width: 1024px) 800px, 1600px',
  className = '',
  loading = 'lazy',
  priority = false,
}: ResponsiveImageProps) {
  // Extract base path without extension
  const basePath = src.replace(/\.(avif|webp|jpg|jpeg|png)$/, '');
  const hasResponsiveSizes = !src.includes('unsplash') && !src.startsWith('http');

  if (!hasResponsiveSizes) {
    // External URL or placeholder - use as-is
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : loading}
      />
    );
  }

  return (
    <picture>
      {/* AVIF - best compression */}
      <source
        type="image/avif"
        srcSet={`${basePath}-400.avif 400w, ${basePath}-800.avif 800w, ${basePath}-1600.avif 1600w`}
        sizes={sizes}
      />
      {/* WebP - good fallback */}
      <source
        type="image/webp"
        srcSet={`${basePath}-400.webp 400w, ${basePath}-800.webp 800w, ${basePath}-1600.webp 1600w`}
        sizes={sizes}
      />
      {/* JPG - universal fallback */}
      <img
        src={`${basePath}-800.jpg`}
        srcSet={`${basePath}-400.jpg 400w, ${basePath}-800.jpg 800w, ${basePath}-1600.jpg 1600w`}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : loading}
      />
    </picture>
  );
}
