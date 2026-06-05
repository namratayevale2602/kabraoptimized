import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../service/api";
import { resizeUrl, buildSrcSet } from "../../utils/imgResize";

// Auto-scroll handled entirely by CSS animation. No setInterval / scrollLeft reads.
export default function CategorySlider({ initialData = undefined }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData !== undefined) {
      if (initialData !== null) {
        setCategories(initialData);
        setError(null);
        setLoading(false);
      }
      return;
    }

    axiosInstance
      .get("/category-sliders")
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.data);
          setError(null);
        } else {
          setError("Failed to load categories");
        }
      })
      .catch((err) => setError(err.response?.data?.message || "Error loading categories."))
      .finally(() => setLoading(false));
  }, [initialData]);

  if (loading) {
    return (
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-4" />
            <div className="h-1 w-16 bg-gray-200 mb-8" />
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="shrink-0 w-[150px] sm:w-[220px] md:min-w-[340px]">
                  <div className="w-full h-[200px] sm:h-[340px] md:h-[460px] bg-gray-200 rounded-[100px] md:rounded-[120px]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || categories.length === 0) return null;

  const items = [...categories, ...categories];

  return (
    <section className="py-10 md:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6b3f2a] inline-block pb-2">
          Categories
        </h2>
        <div className="h-1 w-16 md:w-20 bg-amber-500 mb-4" />
      </div>

      <div className="overflow-hidden">
        <div className="flex gap-4 md:gap-8 px-4 md:px-10 animate-carousel w-max">
          {items.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="shrink-0 w-[150px] sm:w-[220px] md:min-w-[340px] flex justify-center"
            >
              <div
                onClick={() => navigate(`/Categorydetail/${item.slug}`)}
                className="relative w-full h-[200px] sm:h-[340px] md:h-[460px] overflow-hidden rounded-[100px] md:rounded-[120px] cursor-pointer group"
              >
                <img
                  src={resizeUrl(item.image, 460)}
                  srcSet={buildSrcSet(item.image, [200, 400, 600])}
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 220px, 340px"
                  loading="lazy"
                  alt={item.alt || item.title || `Category ${item.id}`}
                  width={460}
                  height={460}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
