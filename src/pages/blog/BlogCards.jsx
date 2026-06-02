// components/BlogCards.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../service/api';

const BlogCards = ({ initialData = undefined }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (initialData !== undefined) {
      if (initialData !== null) {
        setBlogs(initialData);
        setError(null);
        setLoading(false);
      }
      return;
    }

    axiosInstance
      .get('/blogs?per_page=10')
      .then((res) => {
        if (res.data.success) { setBlogs(res.data.data.blogs); setError(null); }
        else setError('Failed to load blogs');
      })
      .catch((err) => setError(err.response?.data?.message || 'Error loading blogs'))
      .finally(() => setLoading(false));
  }, [initialData]);

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 20);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 20
      );
    }
  };

  // Scroll functions
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Mouse drag/touch scroll functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="flex gap-6 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="shrink-0 w-[280px]">
                  <div className="h-56 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-red-500 bg-red-50 p-6 rounded-lg">
            <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium block mb-2">Unable to load blogs</span>
            <span className="text-sm">{error}</span>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No blogs state
  if (blogs.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#5c2c1a] mb-3">
            Our Blog
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Discover the latest trends, styling tips, and fashion inspiration from our experts
          </p>
        </div>

        {/* Scroll Controls - Desktop */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="hidden lg:flex absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full items-center justify-center hover:bg-amber-50 transition-all duration-300 hover:scale-110"
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6 text-[#5c2c1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="hidden lg:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full items-center justify-center hover:bg-amber-50 transition-all duration-300 hover:scale-110"
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6 text-[#5c2c1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Scrollable Cards Container */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`flex overflow-x-auto gap-6 md:gap-8 pb-6 px-2 scrollbar-hide cursor-grab active:cursor-grabbing ${
              isDragging ? 'select-none' : ''
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {blogs.map((post) => (
              <div
                key={post.id}
                onClick={() => !isDragging && navigate(`/blog/${post.slug}`)}
                className="shrink-0 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px] group bg-white overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-56 sm:h-64">
                  <img
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-blog.jpg';
                    }}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  {/* Category */}
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg md:text-xl font-serif font-bold text-[#5c2c1a] mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <span className="text-sm font-medium text-amber-600 group-hover:text-amber-700 flex items-center gap-1">
                      Read More
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator Dots - Mobile */}
        {blogs.length > 3 && (
          <div className="flex justify-center gap-2 mt-6 lg:hidden">
            {blogs.slice(0, 5).map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === 0 ? 'w-4 bg-amber-600' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .cursor-grab {
          cursor: grab;
        }
        .cursor-grabbing {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
};

export default BlogCards;