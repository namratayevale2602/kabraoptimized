import React, { useState, useEffect } from "react";
import axiosInstance from "../../service/api";

const HeroSection = ({ initialBanners = undefined }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getValidImageUrl = (url) => {
    if (!url) return null;
    if (url.includes('/uploads/uploads/')) {
      return url.replace('/uploads/uploads/', '/uploads/');
    }
    return url;
  };

  useEffect(() => {
    // Use aggregated data if provided; fall back to individual fetch.
    if (initialBanners !== undefined) {
      if (initialBanners !== null) {
        const transformed = initialBanners.map((banner) => ({
          id: banner.id,
          desktopUrl: getValidImageUrl(banner.desktopUrl),
          mobileUrl: getValidImageUrl(banner.mobileUrl),
          link: banner.link,
          alt: banner.alt || banner.title || 'Hero banner',
          title: banner.title,
          subtitle: banner.subtitle,
        }));
        setImages(transformed);
        setLoading(false);
      }
      return;
    }

    // Self-fetch fallback when not pre-loaded.
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/hero-banners');
        if (response.data.success) {
          const transformed = response.data.data.map((banner) => ({
            id: banner.id,
            desktopUrl: getValidImageUrl(banner.desktopUrl),
            mobileUrl: getValidImageUrl(banner.mobileUrl),
            link: banner.link,
            alt: banner.alt || banner.title || 'Hero banner',
            title: banner.title,
            subtitle: banner.subtitle,
          }));
          setImages(transformed);
          setError(null);
        } else {
          setError('Failed to load banners');
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
        setError(err.response?.data?.message || 'Error loading banners. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, [initialBanners]);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleNext     = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrevious = () => setCurrentIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
  const handleDotClick = (index) => setCurrentIndex(index);
  const handleImageClick = (link) => { window.location.href = link; };

  if (loading) {
    return (
      <div className="w-full">
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden bg-gray-200 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
              <span className="text-gray-600 font-medium">Loading banners...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-600 font-medium block mb-2">Unable to load banners</span>
              <span className="text-gray-500 text-sm">{error}</span>
              <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">Retry</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full">
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-600 font-medium">No banners available</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden bg-gray-900">
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              aria-hidden={index !== currentIndex}
            >
              <button
                onClick={() => handleImageClick(image.link)}
                className="w-full h-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label={`View ${image.alt}`}
              >
                <img
                  src={image.desktopUrl}
                  alt={image.alt}
                  className="hidden md:block w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : undefined}
                />
                <img
                  src={image.mobileUrl}
                  alt={image.alt}
                  className="block md:hidden w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : undefined}
                />
              </button>
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button onClick={handlePrevious} className="hidden sm:flex absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full hover:bg-white/50 transition-all duration-300" aria-label="Previous slide">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button onClick={handleNext} className="hidden sm:flex absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full hover:bg-white/50 transition-all duration-300" aria-label="Next slide">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2 sm:space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
