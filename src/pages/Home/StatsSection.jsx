import React, { useState, useEffect } from "react";
import axiosInstance from "../../service/api";

export default function StatsSection({ initialData = undefined }) {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialData !== undefined) {
      if (initialData !== null) {
        setStats(initialData);
        setLoading(false);
      }
      return;
    }

    axiosInstance
      .get("/stats")
      .then((res) => { if (res.data.success) setStats(res.data.data); })
      .catch((err) => console.error("Error fetching stats:", err))
      .finally(() => setLoading(false));
  }, [initialData]);

  if (loading) {
    return (
      <section className="relative py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-pulse flex justify-center space-x-4">
            <div className="h-20 w-32 bg-gray-200 rounded"></div>
            <div className="h-20 w-32 bg-gray-200 rounded"></div>
            <div className="h-20 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-14 bg-cover bg-center">
      <div className="absolute inset-0"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-10 text-center text-[#5c2c1a]">
          {stats.map((stat, index) => (
            <div key={index}>
              <h3 className="text-2xl md:text-5xl font-serif font-semibold mb-2">
                {stat.value}{stat.suffix}
              </h3>
              <p className="tracking-wide text-sm md:text-base">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}