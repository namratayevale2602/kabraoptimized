// components/AboutUsText.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../service/api";
import { aboutbg, bgimage, bg4 } from "../../assets";

export default function AboutUsText() {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await axiosInstance.get("/about");
      if (response.data.success) {
        setAboutData(response.data.data);
      } else {
        setError("Failed to load about us data");
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
      setError("Unable to load content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get image URL
  const getImageUrl = () => {
    if (!aboutData?.image_url) return null;
    
    // If it's a full URL, use it directly
    if (aboutData.image_url.startsWith('http')) {
      return aboutData.image_url;
    }
    
    // Otherwise, construct the full URL
    return `https://back.kabraemporium.com${aboutData.image_url}`;
  };

  if (loading) {
    return (
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6">
          {/* Loading skeleton for image */}
          <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
          
          {/* Loading skeleton for content */}
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-1 w-16 bg-gray-300 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#6b3f2a] text-white px-6 py-2 rounded-lg hover:bg-[#583020]"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Get paragraphs - handle different possible formats
  const getParagraphs = () => {
    if (!aboutData?.paragraphs) return [];
    
    // If it's an array of objects with 'paragraph' property
    if (Array.isArray(aboutData.paragraphs) && aboutData.paragraphs[0]?.paragraph) {
      return aboutData.paragraphs.map(p => p.paragraph);
    }
    
    // If it's an array of strings
    if (Array.isArray(aboutData.paragraphs)) {
      return aboutData.paragraphs;
    }
    
    return [];
  };

  const paragraphs = getParagraphs();
  const imageUrl = getImageUrl();

  return (
    <section
      className="relative py-16 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bg4})`,
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-white/80"></div>

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6">
        
        

        {/* LEFT – CONTENT */}
        <div className="text-[#6b3f2a]">
          <h2 className="text-2xl md:text-4xl font-bold mb-2">
            {aboutData?.title || "Kabra Emporium – A Legacy Woven in Love, Trust & Tradition"}
          </h2>
          <div className="h-1 w-16 md:w-20 bg-amber-500 mb-4" />

          <h4 className="font-semibold mb-4">
            {aboutData?.subtitle || "About Kabra Emporium"}
          </h4>

          {paragraphs.length > 0 ? (
            paragraphs.map((text, index) => (
              <p
                key={index}
                className="leading-relaxed text-sm text-justify pb-2"
              >
                {text}
              </p>
            ))
          ) : (
            // Fallback paragraphs
            <>
              <p className="leading-relaxed text-sm text-justify pb-2">
                NO Text
              </p>
            </>
          )}
        </div>

        {/* Right – IMAGE (Replacing Video) */}
        <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden rounded-lg shadow-xl group">
          {imageUrl ? (
            <img
              className="w-full h-full object-cover transition-transform duration-500"
              src={imageUrl}
              alt={aboutData?.title}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
          
         
        </div>
      </div>
    </section>
  );
}