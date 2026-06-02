import React, { useEffect, useState } from "react";
import axiosInstance from "../../service/api";

// Auto-scroll is CSS-only (animate-carousel class). No rAF loop, no forced reflows.
const TrendingCollections = ({ initialData = undefined }) => {
  const [trendingData, setTrendingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData !== undefined) {
      if (initialData !== null) {
        setTrendingData(initialData);
        setLoading(false);
      }
      return;
    }

    axiosInstance
      .get("/v1/collections/trending")
      .then((res) => {
        if (res.data.success) setTrendingData(res.data.data);
        else setError("Failed to load trending collections");
      })
      .catch(() => setError("Error loading trending collections"))
      .finally(() => setLoading(false));
  }, [initialData]);

  const images =
    trendingData?.products
      ?.filter((p) => p.primary_image)
      .map((p) => ({
        id: p.id,
        src: p.primary_image,
        alt: p.name,
        price: p.formatted_price,
        product_code: p.product_code,
      })) ?? [];

  if (loading) {
    return (
      <div className="w-full py-6 md:py-10 bg-linear-to-br from-amber-50/50 via-pink-50/50 to-purple-50/50">
        <div className="mx-auto px-4 md:px-6">
          <div className="h-8 bg-gray-200 rounded w-56 animate-pulse mb-6" />
          <div className="flex gap-3 md:gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="shrink-0 w-[220px] sm:w-[250px] md:w-[280px] lg:w-[300px]">
                <div className="relative aspect-3/4 bg-gray-200 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || images.length === 0) return null;

  const scrollItems = [...images, ...images];

  return (
    <div className="w-full py-6 md:py-10 bg-linear-to-br from-amber-50/50 via-pink-50/50 to-purple-50/50 overflow-hidden">
      <div className="mx-auto px-4 md:px-6 mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#6b3f2a]">
          {trendingData?.title || "Trending Collections"}
        </h2>
      </div>

      <div className="flex gap-3 md:gap-4 py-2 px-4 animate-carousel w-max">
        {scrollItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="shrink-0 w-[220px] sm:w-[250px] md:w-[280px] lg:w-[300px]">
            <div className="relative aspect-3/4 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group cursor-default">
              <img
                src={item.src}
                alt={item.alt}
                width={832}
                height={1108}
                className="w-full h-full object-cover pointer-events-none"
                loading="lazy"
                draggable="false"
              />
              {(item.price || item.product_code) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.price && <p className="text-white text-sm font-semibold">{item.price}</p>}
                  {item.product_code && <p className="text-white/80 text-xs">{item.product_code}</p>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCollections;
