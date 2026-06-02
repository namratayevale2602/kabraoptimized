// components/Testimonial.jsx - Ultra Simple Version
import React, { useEffect } from 'react';

const Testimonial = () => {
  const FEATURABLE_WIDGET_ID = "995bd598-bfb6-4cd7-b989-e29b1dd89457";
  const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJuYbJy6Dr3TsR7XJoVl8dn0U";

  useEffect(() => {
    // Load Featurable only when the widget container enters the viewport so
    // the 111 KiB script and the Instagram embeds it spawns don't block the
    // initial page load.
    const container = document.getElementById(`featurable-${FEATURABLE_WIDGET_ID}`);
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (!document.querySelector('script[src*="featurable.com/assets/v2/grid_default.min.js"]')) {
          const script = document.createElement('script');
          script.src = "https://featurable.com/assets/v2/grid_default.min.js";
          script.defer = true;
          script.charset = "UTF-8";
          document.body.appendChild(script);
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleGoogleRedirect = () => {
    window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full py-8 md:py-10">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-center text-2xl md:text-4xl font-bold text-[#5c2c1a]">
          Voice Of Customers
        </h1>

        <div className=" rounded-2xl">
          
          {/* Featurable Widget */}
          <div id={`featurable-${FEATURABLE_WIDGET_ID}`} data-featurable-async />
        </div>

        {/* Write Review Button */}
        <div className="text-center" >
          <button
            onClick={handleGoogleRedirect}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5c2c1a] text-white rounded-full font-semibold hover:bg-[#7a3d24] transition shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            </svg>
            Write a Review on Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;