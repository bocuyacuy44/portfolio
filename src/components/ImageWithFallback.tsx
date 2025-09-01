import { useState, useRef, useEffect } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

const ImageWithFallback = ({
  src,
  alt,
  fallback = 'https://via.placeholder.com/400x300/1a1a1a/00ff88?text=Loading...',
  className = '',
  loading = 'lazy',
  onLoad,
  onError
}: ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setImageSrc(src);
    setImageLoaded(false);
    setImageError(false);
  }, [src]);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    if (imageSrc !== fallback) {
      setImageSrc(fallback);
      setImageError(true);
      onError?.();
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Loading Skeleton */}
      {!imageLoaded && (
        <div className={`absolute inset-0 bg-bg-secondary animate-pulse ${className}`}>
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-4 border-accent-primary/30 border-t-accent-primary rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Main Image */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Error State */}
      {imageError && imageLoaded && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-red-500/80 text-white text-xs rounded">
          Failed to load
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;