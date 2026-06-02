import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../service/api";

const TopCategories = ({ initialData = undefined }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData !== undefined) {
      if (initialData !== null) {
        setCategories((initialData || []).slice(0, 3));
        setLoading(false);
      }
      return;
    }

    axiosInstance
      .get("/v1/categories")
      .then((res) => {
        if (res.data.success) setCategories(res.data.data.slice(0, 3));
        else setError("Failed to load categories");
      })
      .catch(() => setError("Failed to load categories"))
      .finally(() => setLoading(false));
  }, [initialData]);

  if (loading) {
    return (
      <section className="relative py-12 px-4 overflow-hidden">
        <div className="relative z-10">
          <div className="text-center mb-6 md:mb-10">
            <div className="h-10 w-48 bg-gray-200 animate-pulse mx-auto mb-2" />
          </div>
          <div className="hidden lg:block max-w-6xl mx-auto">
            <div className="grid grid-cols-3 gap-6 px-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 h-[360px] animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
          <div className="lg:hidden max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-200 h-[300px] animate-pulse rounded-xl row-span-2" />
              <div className="flex flex-col gap-4">
                <div className="bg-gray-200 h-[140px] animate-pulse rounded-xl" />
                <div className="bg-gray-200 h-[140px] animate-pulse rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || categories.length === 0) return null;

  return (
    <section className="relative py-12 px-4 overflow-hidden">
      <div className="relative z-10">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
            Top Categories
          </h1>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-6 px-4">
            {categories.map((category) => (
              <div key={category.id} className="relative">
                <Link
                  to={`/Categorydetail/${category.slug}`}
                  className="block bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-[360px]">
                    <img
                      src={category.image}
                      loading="lazy"
                      alt={category.name}
                      width={1024}
                      height={864}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 via-black/20 to-transparent">
                      <h4 className="font-bold text-white text-2xl lg:text-3xl drop-shadow-lg">
                        {category.title || category.name}
                      </h4>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-4 px-4">
            {categories.length > 0 && (
              <div className="relative row-span-2">
                <Link
                  to={`/Categorydetail/${categories[0].slug}`}
                  className="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-[300px]">
                    <img
                      src={categories[0].image}
                      loading="lazy"
                      alt={categories[0].name}
                      width={1024}
                      height={864}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 via-black/20 to-transparent">
                      <h4 className="font-bold text-white text-xl drop-shadow-lg">
                        {categories[0].title || categories[0].name}
                      </h4>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            {categories.length > 1 && (
              <div className="flex flex-col gap-4">
                {categories.slice(1).map((category) => (
                  <Link
                    key={category.id}
                    to={`/Categorydetail/${category.slug}`}
                    className="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="relative h-[140px]">
                      <img
                        src={category.image}
                        loading="lazy"
                        alt={category.name}
                        width={1024}
                        height={864}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 via-black/20 to-transparent">
                        <h4 className="font-bold text-white text-lg drop-shadow-lg">
                          {category.title || category.name}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
