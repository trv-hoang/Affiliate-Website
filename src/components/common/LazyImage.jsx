import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function LazyImage({ src, alt, className = '', aspectRatio = '1/1' }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageRef, setImageRef] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let observer;
    
    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            rootMargin: '50px',
          }
        );
        observer.observe(imageRef);
      } else {
        // Fallback for browsers without IntersectionObserver
        setImageSrc(src);
      }
    }
    
    return () => {
      if (observer && observer.unobserve && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div 
      className={`lazy-image-wrapper ${className}`} 
      style={{ aspectRatio }}
      ref={setImageRef}
    >
      {isLoading && (
        <div className="lazy-image-placeholder">
          <div className="spinner-small"></div>
        </div>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`lazy-image ${isLoading ? 'loading' : 'loaded'}`}
          onLoad={handleLoad}
          loading="lazy"
        />
      )}
    </div>
  );
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  aspectRatio: PropTypes.string,
};

export default LazyImage;
