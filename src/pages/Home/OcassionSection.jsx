import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import {
  kabra2,
  kabra7,
  kabra11,
  kabra16,
  occasionbg,
  bg1,
  mobilebg3, // Import your mobile background image
} from "../../assets";

const OccasionSection = () => {
  const occasionsRef = useRef(null);
  const navigate = useNavigate();

  const occasions = [
    {
      id: 1,
      name: "Haldi Hues",
      description: "Vibrant yellow outfits for Haldi ceremony",
      image: kabra2,
      link: "/occasion/sarees",
      slug: "sarees", // Added slug for navigation
      color: "from-yellow-400/20 to-amber-100",
    },
    {
      id: 2,
      name: "Cocktail Parties",
      description: "Elegant evening wear for cocktail events",
      image: kabra7,
      link: "/occasion/lehengas",
      slug: "lehengas", // Added slug for navigation
      color: "from-purple-400/20 to-pink-100",
    },
    {
      id: 3,
      name: "Sangeet Moments",
      description: "Dazzling dance outfits for Sangeet night",
      image: kabra11,
      link: "/occasion/sarees",
      slug: "sarees", // Added slug for navigation
      color: "from-blue-400/20 to-indigo-100",
    },
    {
      id: 4,
      name: "Reception Looks",
      description: "Grand attire for wedding reception",
      image: kabra16,
      link: "/occasion/salwarsuite",
      slug: "salwarsuite", // Added slug for navigation
      color: "from-red-400/20 to-rose-100",
    },
  ];

  return (
    <section className="relative py-4 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Desktop Background (hidden on mobile) */}
      <div
        className="absolute inset-0 hidden md:block bg-no-repeat bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bg1})` }}
      />

      {/* Mobile Background (hidden on desktop) */}
      <div
        className="absolute inset-0 md:hidden bg-no-repeat bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${mobilebg3})` }}
      />

      {/* Background Opacity Layer - Adjust opacity if needed */}
      <div className="absolute inset-0 bg-white opacity-60 z-10"></div>
      {/* For different opacity on mobile/desktop: */}
      {/* <div className="absolute inset-0 bg-white opacity-60 md:opacity-40 z-10"></div> */}

      {/* Content Wrapper */}
      <div className="relative max-w-7xl mx-auto z-20">
        {/* Heading */}
        <motion.div
          className="text-center mb-4 md:mb-12 pt-6 md:pt-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-1 md:mb-4 font-montserrat">
            Shop by Occasions
          </h1>

          <div className="h-1 w-16 md:w-20 bg-amber-500 mx-auto mb-4 md:mb-6" />

          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg font-nunito-sans px-4">
            Discover perfect outfits tailored for every special moment in your
            journey
          </p>
        </motion.div>

        {/* Desktop Grid - 4 columns */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {occasions.map((occasion, index) => (
            <motion.div
              key={occasion.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <div
                onClick={() => navigate(`/occasion/${occasion.slug}`)}
                className="block group relative overflow-hidden rounded-t-full h-[380px] shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
              >
                <img
                  src={occasion.image}
                  loading="lazy"
                  alt={occasion.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-b ${occasion.color} opacity-30 group-hover:opacity-20 transition-opacity duration-500`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-center text-xl mb-2">
                    {occasion.name}
                  </h3>
                  <p className="text-gray-200 text-center text-sm mb-3">
                    {occasion.description}
                  </p>
                  <div className="flex justify-center">
                    <div className="w-12 h-0.5 bg-amber-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile & Tablet Grid - 2 columns */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:hidden px-2">
          {occasions.map((occasion, index) => (
            <motion.div
              key={occasion.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <div
                onClick={() => navigate(`/occasion/${occasion.slug}`)}
                className="block group relative overflow-hidden rounded-t-full h-[180px] sm:h-[240px] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <img
                  src={occasion.image}
                  loading="lazy"
                  alt={occasion.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-b ${occasion.color} opacity-40`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-white font-bold text-center text-sm sm:text-base mb-1">
                    {occasion.name}
                  </h3>
                  <p className="text-gray-200 text-center text-xs sm:text-sm mb-2 line-clamp-2">
                    {occasion.description}
                  </p>
                  <div className="flex justify-center">
                    <div className="w-8 h-0.5 bg-amber-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-8 md:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => navigate("/occasion")}
            className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-nunito-sans"
          >
            View All Occasions
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </motion.div>

        {/* Decorative Dots */}
        <div className="hidden lg:flex justify-center mt-12 space-x-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-amber-300 opacity-50"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OccasionSection;
