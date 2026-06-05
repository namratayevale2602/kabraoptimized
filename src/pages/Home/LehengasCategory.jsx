import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../service/api";
import { resizeUrl, buildSrcSet } from "../../utils/imgResize";

export const LehengasCategory = ({ initialData = undefined }) => {
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialData !== undefined) {
      if (initialData !== null) {
        const data = initialData?.sub_categories || [];
        setSubCategories(data.filter((item) => item.show_on_home === true && item.is_active === true));
        setLoading(false);
      }
      return;
    }

    axiosInstance
      .get("/v1/categories/lehengas/subcategories")
      .then((res) => {
        const data = res.data?.data?.sub_categories || [];
        setSubCategories(data.filter((item) => item.show_on_home === true && item.is_active === true));
      })
      .catch((err) => console.error("Error fetching lehenga subcategories:", err))
      .finally(() => setLoading(false));
  }, [initialData]);

  if (loading) {
    return (
      <div className="lg:min-h-screen p-4 md:p-8 font-serif">
        <div className="mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 lg:h-[650px]">
            <div className="w-full h-[400px] sm:h-[450px] lg:h-full bg-gray-200 animate-pulse rounded" />
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 lg:mt-0">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!subCategories.length) return null;

  const leftCategory   = subCategories[0];
  const gridCategories = subCategories.slice(1, 5);

  return (
    <div className="lg:min-h-screen p-4 md:p-8 font-serif">
      <div className="mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 lg:h-[650px]">

          {leftCategory && (
            <div
              className="relative w-full h-[400px] sm:h-[450px] lg:h-full shadow-2xl overflow-hidden group cursor-pointer"
              onClick={() => navigate(`/Categorydetail/lehengas`)}
            >
              <img
                src={resizeUrl(leftCategory.image, 800)}
                srcSet={buildSrcSet(leftCategory.image, [400, 800, 1200])}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt={leftCategory.name}
                width={800}
                height={1200}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-4 md:p-8">
                <div className="text-white drop-shadow-2xl">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{leftCategory.name}</h2>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 lg:mt-0">
            {gridCategories.map((item, idx) => (
              <div
                key={idx}
                className="relative aspect-square shadow-xl overflow-hidden group cursor-pointer"
                onClick={() => navigate(`/Categorydetail/lehengas`)}
              >
                <img
                  src={resizeUrl(item.image || leftCategory.image, 600)}
                  srcSet={buildSrcSet(item.image || leftCategory.image, [300, 600, 900])}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  alt={item.name}
                  width={600}
                  height={600}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent flex items-end p-2 sm:p-3">
                  <span className="text-white text-xs sm:text-sm font-semibold drop-shadow-md">{item.name}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
