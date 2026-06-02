import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../service/api";

export default function AboutUs({ initialData = undefined }) {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData !== undefined) {
      if (initialData !== null) {
        setAboutData(initialData);
        setLoading(false);
      }
      return;
    }

    axiosInstance
      .get("/about")
      .then((res) => {
        if (res.data.success) setAboutData(res.data.data);
        else setError("Failed to load about us data");
      })
      .catch(() => setError("Unable to load content. Please try again later."))
      .finally(() => setLoading(false));
  }, [initialData]);

  if (loading) {
    return (
      <section className="relative py-5 md:py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-[#6b3f2a] text-center">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2 animate-pulse"></div>
            <div className="h-16 bg-gray-200 rounded w-full max-w-2xl mx-auto mb-4 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-5 md:py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Get home paragraph - handle both array and string formats
  const homeParagraph = aboutData?.home_para?.[0]?.paragraph || 
                       aboutData?.home_para?.[0] || 
                       aboutData?.home_para ||
                       "Kabra Emporium isn't just a saree store — it is a 3-generation-old heritage built on relationships, trust, and the timeless beauty of Indian weaves.";

  return (
    <section className="relative py-5 md:py-8 bg-cover bg-center bg-no-repeat">
      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-[#6b3f2a] text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-2">
            {aboutData?.title}
          </h2>
           <h2 className="text-xl md:text-2xl font-bold mb-2">
            {homeParagraph}
          </h2>
         

          <button
            onClick={() => navigate("/about")}
            className="bg-[#6b3f2a] text-white text-sm sm:text-base rounded-2xl px-6 py-2 md:px-8 md:py-3 tracking-widest hover:bg-[#583020] transition mt-2 shadow-md hover:shadow-lg"
          >
            Read More
          </button>
        </div>
      </div>
    </section>
  );
}