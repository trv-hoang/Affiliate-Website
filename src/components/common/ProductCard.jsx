import PropTypes from 'prop-types';
import LazyImage from './LazyImage';

// Helper: Convert Google Drive link to direct image URL
function convertGoogleDriveUrl(url) {
  if (!url) return null;
  
  // Check if it's a Google Drive link with file ID
  const driveMatch = url.match(/drive\.google\.com\/(?:file\/d\/|uc\?.*id=)([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    const fileId = driveMatch[1];
    // Use thumbnail API for better compatibility
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
  }
  
  return url;
}

function ProductCard({ product, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(product);
    } else if (product.link) {
      window.open(product.link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };
  
  // Convert Google Drive URL if needed
  const imageUrl = convertGoogleDriveUrl(product.image) || product.image;

  return (
    <div 
      className="product-card"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name}`}
    >
      <div className="product-card-image">
        <LazyImage 
          src={imageUrl} 
          alt={product.name}
          aspectRatio="16/9"
        />
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">{product.name}</h3>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string,
    order: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
};

export default ProductCard;
