import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Instagram } from "lucide-react";
import {
  kabra10,
  kabra15,
  kabra20,
  kabra25,
  kabra21,
  kabra26,
  kabra29,
  kabra30,
  kabrainsta1,
} from "../../assets";
import VideoCarousel from "./VideoCarousel";

const InstagramFamousTrends = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const instagramTrends = [
    {
      id: 1,
      name: "Kanjeevaram Red",
      image: kabrainsta1,
      // link: "/trends/kanjeevaram-red",
      instagramHandle: "@kabra_fashion",
      likes: "2.5k",
    },
    {
      id: 2,
      name: "Banarasi Gold",
      image: kabrainsta1,
      // link: "/trends/banarasi-gold",
      instagramHandle: "@kabra_styles",
      likes: "3.1k",
    },
    {
      id: 3,
      name: "Designer Lehenga",
      image: kabrainsta1,
      // link: "/trends/designer-lehenga",
      instagramHandle: "@kabra_designs",
      likes: "4.2k",
    },
    {
      id: 4,
      name: "Paithani Blue",
      image: kabrainsta1,
      // link: "/trends/paithani-blue",
      instagramHandle: "@kabra_traditional",
      likes: "2.8k",
    },
    {
      id: 5,
      name: "Cocktail Saree",
      image: kabrainsta1,
      // link: "/trends/cocktail-saree",
      instagramHandle: "@kabra_partywear",
      likes: "3.5k",
    },
    {
      id: 6,
      name: "Silk Fusion",
      image: kabrainsta1,
      // link: "/trends/silk-fusion",
      instagramHandle: "@kabra_fusion",
      likes: "2.9k",
    },
  ];

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const cardWidth = 280;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-2 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6b3f2a] inline-block pb-2">
              Instagram Famous Trends
            </h2>
            <div className="h-1 w-16 md:w-20 bg-amber-500 mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Trending styles loved by thousands
            </p>
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - Desktop */}
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hidden md:block hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hidden md:block hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 sm:gap-6 pb-4"
            style={{ scrollBehavior: "smooth" }}
          >
            {instagramTrends.map((trend, index) => (
              <motion.div
                key={trend.id}
                className="shrink-0 w-42 sm:w-72 md:w-80 snap-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <a
                  href={trend.link}
                  className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={trend.image}
                      loading="lazy"
                      alt={trend.name}
                      onClick={() =>
                        window.open(
                          "https://www.instagram.com/kabra.emporium/",
                          "_blank",
                        )
                      }
                      className="w-full h-64 sm:h-56 md:h-[380px] object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
        <VideoCarousel />

        {/* View All Button */}
        <motion.div
          className="text-center mt-8 md:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <a
            href="https://www.instagram.com/kabra.emporium"
            target="_blank"
            className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-white border border-gray-300 text-gray-800 font-medium rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow"
          >
            <Instagram className="mr-2 w-4 h-4 text-pink-600" />
            View All Trends
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFamousTrends;
