import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  carousal,
  curatedcollection1,
  curatedcollection2,
  curatedcollection3,
  curatedcollection4,
  curatedcollection5,
  mobilebg1,
  bg4,
} from "../../assets";

const originalItems = [
  {
    id: 1,
    title: "AWESOME AJRAKH",
    type: "Ajrakh Sarees",
    img: curatedcollection1,
    slug: "sarees",
  },
  {
    id: 2,
    title: "BEAUTIFUL BAGRU",
    type: "Bagru Sarees",
    img: curatedcollection2,
    slug: "sarees",
  },
  {
    id: 3,
    title: "BELLA BANARASI",
    type: "Banarasi Sarees",
    img: curatedcollection3,
    slug: "sarees",
  },
  {
    id: 4,
    title: "BLISFULL BROCADE",
    type: "Brocade Sarees",
    img: curatedcollection4,
    slug: "sarees",
  },
  {
    id: 5,
    title: "BOLD BAAGH",
    type: "Baagh Sarees",
    img: curatedcollection5,
    slug: "sarees",
  },
  {
    id: 6,
    title: "ELEGANT EMBROIDERY",
    type: "Embroidered Sarees",
    img: curatedcollection1,
    slug: "sarees",
  },
  {
    id: 7,
    title: "CLASSIC CHANDERI",
    type: "Chanderi Sarees",
    img: curatedcollection2,
    slug: "sarees",
  },
  {
    id: 8,
    title: "MAJESTIC MYSORE",
    type: "Mysore Silk Sarees",
    img: curatedcollection3,
    slug: "sarees",
  },
  {
    id: 9,
    title: "PRETTY PATOLA",
    type: "Patola Sarees",
    img: curatedcollection4,
    slug: "sarees",
  },
  {
    id: 10,
    title: "ROYAL RESHAM",
    type: "Resham Work Sarees",
    img: curatedcollection5,
    slug: "sarees",
  },
];

export default function CuratedCollection() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const autoScrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Create extended array for seamless looping (triple the items)
  const items = [...originalItems, ...originalItems, ...originalItems];

  // Auto-scroll function with continuous loop
  const startAutoScroll = useCallback(() => {
    if (!scrollContainerRef.current || isPaused || isTransitioning) return;

    const container = scrollContainerRef.current;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    if (scrollWidth <= clientWidth) return; // No need to scroll if content fits

    const scrollStep = 1; // Pixels to scroll per frame
    const scrollInterval = 16; // ~60fps

    autoScrollRef.current = setInterval(() => {
      if (isTransitioning) return;

      const currentScroll = container.scrollLeft;
      const maxScroll = scrollWidth - clientWidth;

      // Calculate one set width (original items width)
      const oneSetWidth = scrollWidth / 3;

      // If we're at the end of the second set (approaching third set)
      const threshold = oneSetWidth * 2;

      if (currentScroll >= threshold - clientWidth) {
        // We're approaching the end, jump to the middle (second set)
        setIsTransitioning(true);
        const originalScrollBehavior = container.style.scrollBehavior;
        container.style.scrollBehavior = "auto"; // Disable smooth scrolling for jump

        // Calculate new position in the middle set
        const newScroll = oneSetWidth + (currentScroll - threshold);
        container.scrollLeft = newScroll;

        // Re-enable smooth scrolling after a brief delay
        setTimeout(() => {
          container.style.scrollBehavior = originalScrollBehavior;
          setIsTransitioning(false);
        }, 50);
      } else {
        // Continue normal scrolling
        container.scrollLeft += scrollStep;
      }
    }, scrollInterval);
  }, [isPaused, isTransitioning]);

  // Function to check and reset position for seamless loop
  const checkAndResetPosition = useCallback(() => {
    if (!scrollContainerRef.current || isTransitioning) return;

    const container = scrollContainerRef.current;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;

    // Calculate one set width (original items width)
    const oneSetWidth = scrollWidth / 3;

    // If we're at the end of the second set (approaching third set)
    const threshold = oneSetWidth * 2;

    if (scrollLeft >= threshold - clientWidth) {
      // We're approaching the end, jump to the middle (second set)
      setIsTransitioning(true);
      const originalScrollBehavior = container.style.scrollBehavior;
      container.style.scrollBehavior = "auto";

      const newScroll = oneSetWidth + (scrollLeft - threshold);
      container.scrollLeft = newScroll;

      setTimeout(() => {
        container.style.scrollBehavior = originalScrollBehavior;
        setIsTransitioning(false);
      }, 50);
    }
    // If we're at the beginning of the first set
    else if (scrollLeft <= 0) {
      // Jump to the middle (second set)
      setIsTransitioning(true);
      const originalScrollBehavior = container.style.scrollBehavior;
      container.style.scrollBehavior = "auto";

      const adjustedScroll = oneSetWidth + scrollLeft;
      container.scrollLeft = adjustedScroll;

      setTimeout(() => {
        container.style.scrollBehavior = originalScrollBehavior;
        setIsTransitioning(false);
      }, 50);
    }
  }, [isTransitioning]);

  // Handle mouse events for pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Handle scroll events for manual scrolling
  const handleScroll = useCallback(() => {
    if (!isTransitioning) {
      checkAndResetPosition();
    }
  }, [checkAndResetPosition, isTransitioning]);

  useEffect(() => {
    // Clear existing interval
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    // Start auto-scroll if not paused
    if (!isPaused && !isTransitioning) {
      startAutoScroll();
    }

    // Cleanup on unmount
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [startAutoScroll, isPaused, isTransitioning]);

  // Initialize scroll position to the middle set
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollWidth = container.scrollWidth;
        const oneSetWidth = scrollWidth / 3;

        // Start in the middle set for seamless looping
        container.scrollLeft = oneSetWidth;
        container.style.scrollBehavior = "smooth";
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Manual scroll functions
  const scrollLeftManual = () => {
    setIsPaused(true);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
    setTimeout(() => setIsPaused(false), 1500);
  };

  const scrollRightManual = () => {
    setIsPaused(true);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
    setTimeout(() => setIsPaused(false), 1500);
  };

  return (
    <section>
      <div className="w-full relative">
        {/* Desktop Background (hidden on mobile) */}
        {/* <div
          className="absolute inset-0 z-0 hidden md:block"
          style={{
            backgroundImage: `url(${bg4})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        /> */}

        {/* Mobile Background (hidden on desktop) */}
        {/* <div
          className="absolute inset-0 z-0 md:hidden"
          style={{
            backgroundImage: `url(${mobilebg1})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        /> */}

        {/* Background overlay with opacity */}
        <div className="absolute inset-0"></div>

        {/* Content container with full opacity */}
        <div className="relative z-10">
          {/* ---------------- TOP SLIDER STRIP ---------------- */}
          <div className="hidden sm:block w-full overflow-hidden h-16 sm:h-16 md:h-20 lg:h-8">
            <div className="flex animate-slide cursor-pointer">
              <img
                onClick={() => navigate("/Categorydetail/sarees")}
                src={carousal}
                loading="lazy"
                className="h-8 w-auto cursor-pointer"
                alt="Sarees"
              />
              <img
                onClick={() => navigate("/Categorydetail/sarees")}
                src={carousal}
                loading="lazy"
                className="h-8 w-auto cursor-pointer"
                alt="Sarees"
              />
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="max-w-7xl mx-auto px-4 relative pt-5">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-[#5c2c1a]">
              Curated collection
            </h1>
            <div className="h-1 w-16 md:w-20 bg-amber-500 mb-4" />

            {/* ----------- IMAGE SCROLL (Continuous Auto Scroll) ----------- */}
            <div
              ref={scrollContainerRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setTimeout(() => setIsPaused(false), 1000)}
              className="flex overflow-x-auto scrollbar-thin pb-4 space-x-1 md:space-x-8 cursor-crosshair"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollBehavior: "smooth",
              }}
            >
              {/* Hide scrollbar for Chrome, Safari and Opera */}
              <style jsx>{`
                .scrollbar-thin::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="shrink-0 flex flex-col items-center"
                >
                  {/* Updated IMG TAG With Shape */}
                  <div className="w-[140px] h-[180px] md:w-[210px] md:h-[230px] rounded-b-[60px] overflow-hidden">
                    <img
                      onClick={() => navigate(`/Categorydetail/${item.slug}`)}
                      src={item.img}
                      loading="lazy"
                      alt={item.type}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm mt-2 text-[#5c2c1a] font-medium">
                    {item.type}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- BOTTOM SLIDER STRIP WITH BACKGROUND IMAGE ---------------- */}
          <div className="hidden sm:block w-full overflow-hidden h-16 sm:h-16 md:h-20 lg:h-24">
            <div className="flex animate-slide">
              <img
                onClick={() => navigate("/Categorydetail/lehengas")}
                src={carousal}
                loading="lazy"
                className="h-8 w-auto cursor-pointer"
                alt="Lehengas"
              />
              <img
                onClick={() => navigate("/Categorydetail/lehengas")}
                src={carousal}
                loading="lazy"
                className="h-8 w-auto cursor-pointer"
                alt="Lehengas"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
