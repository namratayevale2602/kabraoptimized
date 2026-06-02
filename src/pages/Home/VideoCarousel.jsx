import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Volume2,
  VolumeX,
  Share2,
} from "lucide-react";
import {
  kabrareel1,
  kabrareel2,
  kabrareel3,
  kabrareel4,
  kabrareel5,
  kabrareel6,
} from "../../assets";

const VideoCarousel = () => {
  const carouselRef = useRef(null);
  const videoRefs = useRef([]);
  const [mutedStates, setMutedStates] = React.useState({});
  const [hoveredVideo, setHoveredVideo] = React.useState(null);

  // Video data with actual video imports
  const videoPosts = [
    {
      id: 1,
      videoSrc: kabrareel1,
      // link: "/collections/lehengas",
      cta: "Shop Lehengas",
      title: "Designer Lehengas",
    },
    {
      id: 4,
      videoSrc: kabrareel5,
      // link: "/collections/bridal",
      cta: "Shop Bridal",
      title: "Bridal Collection",
    },
    {
      id: 2,
      videoSrc: kabrareel4,
      // link: "/collections/accessories",
      cta: "Shop Accessories",
      title: "Fashion Accessories",
    },

    {
      id: 5,
      videoSrc: kabrareel2,
      // link: "/collections/sarees",
      cta: "Shop Sarees",
      title: "Silk Sarees",
    },
    {
      id: 3,
      videoSrc: kabrareel3,
      // link: "/collections/jewelry",
      cta: "Shop Jewelry",
      title: "Bridal Jewelry",
    },

    {
      id: 6,
      videoSrc: kabrareel6,
      // link: "/collections/party-wear",
      cta: "Shop Party Wear",
      title: "Party Collection",
    },
  ];

  // Initialize all videos as muted
  useEffect(() => {
    const initialMutedStates = {};
    videoPosts.forEach((video) => {
      initialMutedStates[video.id] = true;
    });
    setMutedStates(initialMutedStates);
  }, []);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const cardWidth = 280;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const toggleMute = (videoId) => {
    setMutedStates((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  const handleShare = (videoId) => {
    const video = videoPosts.find((v) => v.id === videoId);
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: `Check out this ${video.title} from Kabra Fashion`,
        url: window.location.origin + video.link,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin + video.link);
      alert("Link copied to clipboard!");
    }
  };

  // Handle video autoplay on intersection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch((e) => {
              console.log("Autoplay prevented:", e);
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  return (
    <section className="py-4 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - Desktop */}
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 shadow-lg rounded-full p-2 hidden md:block hover:bg-white transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 shadow-lg rounded-full p-2 hidden md:block hover:bg-white transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Navigation Arrows - Mobile */}
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 shadow-md rounded-full p-1.5 md:hidden"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 shadow-md rounded-full p-1.5 md:hidden"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>

          {/* Video Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 sm:gap-6"
            style={{ scrollBehavior: "smooth" }}
          >
            {videoPosts.map((video, index) => (
              <motion.div
                key={video.id}
                className="shrink-0 w-52 sm:w-72 md:w-80"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                <div className="group relative">
                  {/* Video Container */}
                  <div className="relative overflow-hidden rounded-xl cursor-pointer">
                    {/* Video Element */}
                    <video
                      onClick={() =>
                        window.open(
                          "https://www.instagram.com/kabra.emporium/",
                          "_blank",
                        )
                      }
                      ref={(el) => (videoRefs.current[index] = el)}
                      className="w-full h-76 sm:h-96 md:h-[450px] object-cover"
                      muted={mutedStates[video.id]}
                      loop
                      playsInline
                      preload="auto"
                      autoPlay
                    >
                      <source src={video.videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Controls Overlay (appears on hover) */}
                    <div
                      className={`absolute top-3 right-3 flex space-x-2 transition-opacity duration-300 ${
                        hoveredVideo === video.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {/* Mute/Unmute Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleMute(video.id);
                        }}
                        className="bg-black/40 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/60 transition-colors"
                        aria-label={
                          mutedStates[video.id] ? "Unmute video" : "Mute video"
                        }
                      >
                        {mutedStates[video.id] ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>

                      {/* Share Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleShare(video.id);
                        }}
                        className="bg-black/40 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/60 transition-colors"
                        aria-label="Share video"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Transparent Shop Button at bottom */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <a
                        onClick={() =>
                          window.open(
                            "https://www.instagram.com/kabra.emporium/",
                            "_blank",
                          )
                        }
                        href={video.link}
                        className="inline-flex items-center px-5 py-2.5 bg-black/40 backdrop-blur-sm text-white font-medium rounded-full hover:bg-black/60 hover:backdrop-blur-md transition-all duration-300 border border-white/20"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        {video.cta}
                      </a>
                    </div>

                    {/* Video Title (optional, appears on hover) */}
                    <div
                      className={`absolute top-3 left-3 transition-opacity duration-300 ${
                        hoveredVideo === video.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <span className="bg-black/40 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-full">
                        {video.title}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;
