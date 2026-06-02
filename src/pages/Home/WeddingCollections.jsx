import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import {
  kabratrend1,
  trending1,
  trending2,
  trending3,
  trending4,
  bg4,
  mobilebg1, // Import your mobile background image
} from "../../assets";

const WeddingCollections = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const weddingCollections = [
    {
      id: 1,
      title: "White Gadhwal Pure Soft Silk Saree",
      image: trending1,
      price: "₹1,695.00",
      oldPrice: "₹5,445.00",
      discount: "68% off",
      rating: 4.9,
      reviews: 34,
      badge: "NEW",
    },
    {
      id: 2,
      title: "Cream Colour Double Border Che...",
      image: trending2,
      price: "₹999.00",
      oldPrice: "₹4,545.00",
      discount: "78% off",
      rating: 4.8,
      reviews: 322,
    },
    {
      id: 3,
      title: "Off White Ethnic Motif Silk Blend",
      image: trending3,
      price: "₹1,995.00",
      oldPrice: "₹3,545.00",
      discount: "43% off",
      rating: 4.9,
      reviews: 69,
    },
    {
      id: 4,
      title: "Elephant Zari Banarasi Soft Silk",
      image: trending4,
      price: "₹1,099.00",
      rating: 4.7,
      reviews: 21,
    },
  ];

  return (
    <section>
      <div className="w-full relative">
        {/* Desktop Background (hidden on mobile) */}
        {/* <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${bg4})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        /> */}

        {/* Mobile Background (hidden on desktop) */}
        {/* <div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url(${mobilebg1})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        /> */}

        {/* Background overlay with opacity - Adjust if needed */}
        <div className="absolute inset-0"></div>
        {/* For different opacity on mobile/desktop: */}
        {/* <div className="absolute inset-0 bg-white opacity-60 md:opacity-40"></div> */}

        {/* Content container with full opacity */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-[#6b3f2a] text-center md:text-left">
                  Trending Collection
                </h2>
                <div className="h-1 w-16 md:w-20 bg-amber-500 mx-auto md:mx-0 mb-2 md:mb-4" />
                <p className="text-gray-600 text-sm md:text-base text-center md:text-left">
                  Best selling designs loved by our customers
                </p>
              </div>

              {/* <button
                onClick={() => navigate("/Categorydetail/sarees")}
                className="bg-[#5a2f17] text-white px-5 py-2 rounded-md text-sm hover:bg-[#4a2612] transition-colors duration-300 self-center md:self-auto"
              >
                View All
              </button> */}
            </div>

            {/* CAROUSEL */}
            <div
              ref={carouselRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 px-2 md:px-0"
            >
              {weddingCollections.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[220px] sm:min-w-[260px] bg-transparent shrink-0"
                >
                  {/* IMAGE CARD */}
                  <div
                    className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
                    onClick={() => navigate("/Categorydetail/sarees")}
                  >
                    <img
                      src={item.image}
                      loading="lazy"
                      alt={item.title}
                      className="w-full h-[280px] sm:h-[340px] md:h-[380px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* {item.badge && (
                      <span className="absolute top-3 right-3 bg-[#7a3d1c] text-white text-xs px-3 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )} */}

                    {/* Price Tag Overlay */}
                    {/* <div className="absolute top-3 left-3 bg-amber-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      {item.price}
                      {item.oldPrice && (
                        <span className="ml-2 text-xs line-through opacity-80">
                          {item.oldPrice}
                        </span>
                      )}
                    </div> */}

                    {/* Discount Badge */}
                    {/* {item.discount && (
                      <div className="absolute top-12 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {item.discount}
                      </div>
                    )} */}

                    {/* INFO OVER IMAGE */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-linear-to-t from-black/80 via-black/40 to-transparent">
                      <p className="text-white text-xs sm:text-sm font-medium">
                        Fabric: Silk Blend
                      </p>
                      <p className="text-white text-xs sm:text-sm font-medium">
                        {item.title}
                      </p>
                      <div className="h-1px bg-white/50 my-1 sm:my-2"></div>
                      <p className="text-white text-xs sm:text-sm">
                        Occasion: Traditional
                      </p>

                      {/* RATING */}
                      {/* <div className="flex items-center mt-2 sm:mt-3 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            className="fill-amber-400 text-amber-400 mr-0.5"
                          />
                        ))}
                        <span className="ml-2 text-white">
                          {item.rating} | {item.reviews} reviews
                        </span>
                      </div> */}
                    </div>
                  </div>

                  {/* TEXT BELOW */}
                  <div className="mt-3 sm:mt-4 text-[#6b3f2a]">
                    {/* <p className="text-sm font-medium leading-snug line-clamp-2">
                      {item.title}
                    </p> */}

                    {/* Price details - Optional */}
                    {/* <div className="flex items-center gap-2 mt-2 text-sm">
                      <span className="font-semibold">{item.price}</span>
                      {item.oldPrice && (
                        <span className="line-through text-gray-500 text-xs">
                          {item.oldPrice}
                        </span>
                      )}
                    </div> */}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4 md:hidden">
              {weddingCollections.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-amber-300 opacity-50"
                />
              ))}
            </div>

            {/* Desktop View All Button - Bottom */}
            <div className="hidden md:flex justify-center mt-8">
              <button
                onClick={() => navigate("/Categorydetail/sarees")}
                className="px-8 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white font-medium rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore All Collections
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default WeddingCollections;
