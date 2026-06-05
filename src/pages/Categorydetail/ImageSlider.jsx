import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { resizeUrl, buildSrcSet } from "../../utils/imgResize";

const ImageSlider = ({ images, productName, autoScrollInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [timerId, setTimerId] = useState(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Reset autoscroll timer
  const resetAutoScroll = () => {
    if (timerId) {
      clearInterval(timerId);
    }

    if (isAutoScroll && images.length > 1) {
      const id = setInterval(() => {
        nextSlide();
      }, autoScrollInterval);

      setTimerId(id);
    }
  };

  // Handle autoscroll
  useEffect(() => {
    if (images.length > 1 && isAutoScroll) {
      const id = setInterval(() => {
        nextSlide();
      }, autoScrollInterval);

      setTimerId(id);

      return () => {
        if (id) clearInterval(id);
      };
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [images.length, isAutoScroll, currentIndex]); // Reset when currentIndex changes

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoScroll(false); // Pause autoscroll on touch
    if (timerId) clearInterval(timerId);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();

    setTouchStart(null);
    setTouchEnd(null);

    // Restart autoscroll after a delay
    setTimeout(() => {
      if (isAutoScroll) {
        resetAutoScroll();
      }
    }, 1000);
  };

  const handleMouseEnter = () => {
    // Pause autoscroll when mouse is over slider
    setIsAutoScroll(false);
    if (timerId) clearInterval(timerId);
  };

  const handleMouseLeave = () => {
    // Resume autoscroll when mouse leaves
    setIsAutoScroll(true);
    resetAutoScroll();
  };

  const handleButtonClick = (callback) => {
    return (e) => {
      e.stopPropagation();
      setIsAutoScroll(false); // Pause autoscroll on manual navigation
      if (timerId) clearInterval(timerId);

      // Call the original callback
      callback();

      // Restart autoscroll after a delay
      setTimeout(() => {
        setIsAutoScroll(true);
        resetAutoScroll();
      }, 3000);
    };
  };

  const handleDotClick = (index) => {
    setIsAutoScroll(false); // Pause autoscroll on dot click
    if (timerId) clearInterval(timerId);
    goToSlide(index);

    // Restart autoscroll after a delay
    setTimeout(() => {
      setIsAutoScroll(true);
      resetAutoScroll();
    }, 3000);
  };

  if (images.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden rounded-t-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative w-full h-50 md:h-80 object-cover transition-transform duration-500 ease-in-out"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={resizeUrl(images[currentIndex], 600)}
          srcSet={buildSrcSet(images[currentIndex], [300, 600, 900])}
          sizes="(max-width: 768px) 100vw, 50vw"
          alt={`${productName} - ${currentIndex + 1}`}
          width={600}
          height={600}
          className="w-full h-full object-fill"
          loading="lazy"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={handleButtonClick(prevSlide)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 md:p-2 rounded-full shadow-lg transition-all hover:scale-110 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
            </button>
            <button
              onClick={handleButtonClick(nextSlide)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 md:p-2 rounded-full shadow-lg transition-all hover:scale-110 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
            </button>
          </>
        )}
      </div>

      {/* Navigation Dots */}
      {/* {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )} */}

      {/* AutoScroll Indicator */}
      {/* {images.length > 1 && (
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={() => {
              setIsAutoScroll(!isAutoScroll);
              if (isAutoScroll) {
                if (timerId) clearInterval(timerId);
              } else {
                resetAutoScroll();
              }
            }}
            className="bg-black/50 hover:bg-black/70 text-white text-xs px-2 py-1 rounded-full transition-colors"
            aria-label={isAutoScroll ? "Pause autoscroll" : "Play autoscroll"}
          >
            {isAutoScroll ? "⏸️" : "▶️"}
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ImageSlider;
