import { useState } from 'react';

function ShareButton() {
  const [showToast, setShowToast] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: 'Check out my products!',
      url: window.location.href,
    };

    try {
      // Try native share API first (mobile)
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } catch (clipboardErr) {
        console.error('Clipboard error:', clipboardErr);
      }
    }
  };

  return (
    <>
      <button 
        className="share-button" 
        onClick={handleShare}
        aria-label="Share this page"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 15.2491 15.0227 15.3715L8.08259 11.9013C7.54305 11.3453 6.81069 11 6 11C4.34315 11 3 12.3431 3 14C3 15.6569 4.34315 17 6 17C6.81069 17 7.54305 16.6547 8.08259 16.0987L15.0227 19.6285C15.0077 19.7509 15 19.8745 15 20C15 21.6569 16.3431 23 18 23C19.6569 23 21 21.6569 21 20C21 18.3431 19.6569 17 18 17C17.1893 17 16.457 17.3453 15.9174 17.9013L8.97733 14.3715C8.99229 14.2491 9 14.1255 9 14C9 13.8745 8.99229 13.7509 8.97733 13.6285L15.9174 10.0987C16.457 10.6547 17.1893 11 18 11C19.6569 11 21 9.65685 21 8C21 6.34315 19.6569 5 18 5V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {showToast && (
        <div className="share-toast">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Link đã được sao chép!
        </div>
      )}
    </>
  );
}

export default ShareButton;
