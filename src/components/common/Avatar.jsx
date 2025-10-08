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
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
  }
  
  return url;
}

function Avatar({ src, alt, size = 'large', className = '' }) {
  const sizeClass = `avatar-${size}`;
  
  // Convert Google Drive URL if needed
  const imageUrl = convertGoogleDriveUrl(src) || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150"%3E%3Ccircle fill="%23FFE8F0" cx="75" cy="75" r="75"/%3E%3Ctext fill="%23FF88B0" font-family="Arial" font-size="48" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E👤%3C/text%3E%3C/svg%3E';
  
  return (
    <div className={`avatar ${sizeClass} ${className}`}>
      <LazyImage 
        src={imageUrl} 
        alt={alt} 
        aspectRatio="1/1"
        className="avatar-image"
      />
    </div>
  );
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

export default Avatar;
