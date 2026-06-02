import React, { useState } from "react";
import womensDayData from "../../constant/Home/landingData.json";
import {kabra_phone_banner1} from "../../assets/index"

// Color constants based on your provided colors
const colors = {
  primary: "#eb8749",
  secondary: "#7b3306",
  accent: "#ffb048",
  light: "#fff5eb",
  dark: "#2d1a0a"
};

const WomensDayLanding = () => {
  const [showForm, setShowForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Unsplash image URLs for saree-related images
  const heroImage = kabra_phone_banner1;
  const patternImage = "https://images.unsplash.com/photo-1607623476082-8c0c9e5e3e3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <div className="bg-transparent">
      {/* Main Hero Section with Form */}
      <section id="home" className="flex items-center py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Column - Hero Content (Shows first on mobile) */}
            <div className="space-y-6 md:space-y-8 order-1 pt-35">
              
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span style={{ color: colors.secondary }}>{womensDayData.hero.title}</span>
                <br />
                <span style={{ color: colors.primary }}>{womensDayData.hero.subtitle}</span>
              </h1>
              
              {/* Description */}
              <p className="text-base md:text-lg max-w-lg" style={{ color: colors.secondary + "cc" }}>
                {womensDayData.hero.description}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    document.getElementById('form').scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                  className="px-6 md:px-8 py-2 md:py-3 rounded-full text-white font-semibold transform hover:scale-105 transition-all shadow-lg text-sm md:text-base"
                  style={{ backgroundColor: colors.primary }}
                >
                  {'Claim Your Offer'}
                </button>
              </div>
            </div>

            {/* Right Column - Image (Shows last on mobile, right side on desktop) */}
            <div className="lg:sticky lg:top-24 order-3 lg:order-2">
              <div className="relative group">
                {/* Decorative Background */}
                <div 
                  className="absolute inset-0 rounded-3xl blur-3xl opacity-30 transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: colors.primary }}
                ></div>
                
                {/* Image Container */}
                <div 
                  className="relative rounded-2xl shadow-2xl overflow-hidden transform transition-transform group-hover:scale-[1.02] duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}15)`,
                  }}
                >
                  <div className="aspect-[4/3] md:aspect-square relative">
                    {/* Main Image */}
                    <img 
                      src={heroImage}
                      alt="Elegant woman in traditional saree"
                      className="w-full h-[600px] md:h-full object-cover"
                    />
                    
                    {/* Overlay Gradient */}
                    <div 
                      className="absolute inset-0"
                      style={{ 
                        background: `linear-gradient(45deg, ${colors.primary}40, transparent)`
                      }}
                    ></div>
                    
                    {/* Decorative Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div 
                        className="absolute top-10 left-10 w-20 h-20 rounded-full blur-xl"
                        style={{ backgroundColor: colors.primary }}
                      ></div>
                      <div 
                        className="absolute bottom-10 right-10 w-32 h-32 rounded-full blur-xl"
                        style={{ backgroundColor: colors.accent }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section - Shows second on mobile, hidden on desktop */}
            <div className="order-2 lg:hidden mt-8">
              <div className="rounded-2xl shadow-2xl overflow-hidden" id="form">
                {/* Form Header */}
                <div className="p-4 md:p-6 text-center">
                  {/* <h2 className="text-xl md:text-4xl font-bold text-[#7b3306]">
                    {womensDayData.form.title}
                  </h2> */}
                  <p className="text-[#7b3306] text-xl md:text-base mt-1">
                    {womensDayData.form.subtitle}
                  </p>
                </div>
                
                {/* Form Container */}
                <div className="p-4 md:p-6">
                  <div className="relative w-full" style={{ height: "600px" }}>
                    <iframe
                      src={womensDayData.form.iframeSrc}
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: "3px"
                      }}
                      id="womens-day-form"
                      title={womensDayData.form.title}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Form Section - Only visible on desktop */}
      <div className="hidden lg:block max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-2xl shadow-2xl overflow-hidden" id="form">
          {/* Form Header */}
          <div className="p-4 md:p-6 text-center">
            <h2 className="text-xl md:text-4xl font-bold text-[#7b3306]">
              {womensDayData.form.title}
            </h2>
            <p className="text-[#7b3306] text-xl md:text-base mt-1">
              {womensDayData.form.subtitle}
            </p>
          </div>
          
          {/* Form Container */}
          <div className="p-4 md:p-6">
            <div className="relative w-full" style={{ height: "600px" }}>
              <iframe
                src={womensDayData.form.iframeSrc}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "3px"
                }}
                id="womens-day-form"
                title={womensDayData.form.title}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default WomensDayLanding;