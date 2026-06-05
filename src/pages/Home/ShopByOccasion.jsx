import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../service/api";
import { resizeUrl, buildSrcSet } from "../../utils/imgResize";
import {
  shopbyoccasion1,
  shopbyoccasion2,
  shopbyoccasion3,
  shopbyoccasion4,
  shopbyoccasion5,
  shopbyoccasion6,
  shopbyoccasion7,
  babyshower,
  carousal,
  mehendi,
  poojarituals,
} from "../../assets";

export default function ShopByOccasion({ initialData = undefined }) {
  const [occasions, setOccasions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getFallbackImage = (slug) => {
    const fallbackMap = {
      'baby-shower': babyshower,
      'wedding': shopbyoccasion7,
      'engagement': shopbyoccasion2,
      'haldi': shopbyoccasion4,
      'pooja': poojarituals,
      'mehendi': mehendi,
      'festival': shopbyoccasion3,
    };
    return fallbackMap[slug] || shopbyoccasion1;
  };

  useEffect(() => {
    if (initialData !== undefined) {
      if (initialData !== null) {
        const mapped = initialData.map((occasion, index) => ({
          id: occasion.id || index + 1,
          title: occasion.name,
          slug: occasion.slug,
          description: occasion.description,
          icon: occasion.icon,
          img: occasion.image || getFallbackImage(occasion.slug),
          is_active: true,
        }));
        setOccasions(mapped);
        setLoading(false);
      }
      return;
    }

    axiosInstance
      .get("/occasions")
      .then((res) => {
        if (res.data && res.data.success) {
          const mapped = res.data.data.map((occasion, index) => ({
            id: occasion.id || index + 1,
            title: occasion.name,
            slug: occasion.slug,
            description: occasion.description,
            icon: occasion.icon,
            img: occasion.image || getFallbackImage(occasion.slug),
            is_active: true,
          }));
          setOccasions(mapped);
        }
      })
      .catch((err) => {
        console.error("Error fetching occasions:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const carouselImages = Array(6).fill(carousal);

  // Skeleton reserves the same space as the real section to prevent CLS.
  if (loading) {
    return (
      <div className="w-full pt-12 md:pt-16">
        {/* carousel strip placeholder */}
        <div className="hidden sm:block w-full h-8 bg-gray-100 mb-8" />

        {/* heading skeleton */}
        <div className="text-center mb-8 md:mb-10 px-4">
          <div className="h-9 w-56 bg-gray-200 animate-pulse mx-auto mb-3 rounded" />
          <div className="h-1 w-16 bg-gray-200 animate-pulse mx-auto mb-4" />
          <div className="h-5 w-40 bg-gray-100 animate-pulse mx-auto rounded" />
        </div>

        {/* Mobile skeleton: 2×2 grid, h-40 each */}
        <div className="md:hidden max-w-7xl mx-auto grid grid-cols-2 gap-3 px-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>

        {/* Desktop skeleton: row of 3 + row of 4, h-56 each */}
        <div className="hidden md:block max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-56 bg-gray-200 animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-3 pt-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-56 bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>

        {/* bottom carousel strip placeholder */}
        <div className="hidden sm:block w-full h-16 md:h-20 lg:h-24 mt-8 bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="w-full pt-12 md:pt-16">
      {/* Top Carousel Strip */}
      <div className="hidden sm:block w-full overflow-hidden mb-8">
        <div className="flex animate-slide">
          {carouselImages.map((img, index) => (
            <img
              key={index}
              onClick={() => navigate("/Categorydetail/lehengas")}
              src={img}
              loading="lazy"
              className="h-8 w-auto cursor-pointer"
              alt="Lehengas"
            />
          ))}
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-8 md:mb-10 px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-[#5c2c1a] mb-2">
          Shop by Occasion
        </h1>
        <div className="h-1 w-16 md:w-20 bg-amber-500 mx-auto mb-4" />
        <p className="text-sm md:text-lg mt-2 font-light text-gray-700">
          Styled For Every Moment
        </p>
      </div>

      {/* Mobile View */}
      <div className="md:hidden max-w-7xl mx-auto grid grid-cols-2 gap-3 px-4">
        {occasions.map((item) => (
          <div key={item.id} className="relative overflow-hidden group cursor-pointer justify-center">
            <img
              src={resizeUrl(item.img, 400)}
              srcSet={buildSrcSet(item.img, [200, 400, 600])}
              sizes="50vw"
              loading="lazy"
              alt={item.title}
              width={400}
              height={160}
              onClick={() => navigate(`/occasion/${item.slug}`)}
              className="w-full rounded-xl h-40 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-3">
          {occasions.slice(0, 3).map((item) => (
            <div key={item.id} className="relative overflow-hidden group cursor-pointer">
              <img
                src={resizeUrl(item.img, 600)}
                srcSet={buildSrcSet(item.img, [300, 600])}
                sizes="33vw"
                loading="lazy"
                alt={item.title}
                width={600}
                height={224}
                onClick={() => navigate(`/occasion/${item.slug}`)}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-3 pt-5">
          {occasions.slice(3, 7).map((item) => (
            <div key={item.id} className="relative overflow-hidden group cursor-pointer">
              <img
                src={resizeUrl(item.img, 500)}
                srcSet={buildSrcSet(item.img, [250, 500])}
                sizes="25vw"
                loading="lazy"
                alt={item.title}
                width={500}
                height={224}
                onClick={() => navigate(`/occasion/${item.slug}`)}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Carousel Strip */}
      <div className="hidden sm:block w-full overflow-hidden h-16 sm:h-16 md:h-20 lg:h-24 mt-8">
        <div className="flex animate-slide-reverse">
          {carouselImages.map((img, index) => (
            <img
              key={index}
              onClick={() => navigate("/Categorydetail/lehengas")}
              src={img}
              loading="lazy"
              className="h-8 w-auto cursor-pointer"
              alt="Lehengas"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes slideReverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-slide { animation: slide 25s linear infinite; width: fit-content; display: flex; }
        .animate-slide-reverse { animation: slideReverse 25s linear infinite; width: fit-content; display: flex; }
        .animate-slide:hover, .animate-slide-reverse:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
