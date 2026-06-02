"use client";
import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaPhone, FaFacebookF, FaMapMarkerAlt, FaEnvelope, FaGlobe, FaStore, FaDirections } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function FloatingButtons() {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const navigate = useNavigate();
  
  // RichSol contact information
  const contactInfo = {
    phone: "+919890533709",
    whatsapp: "+919890533709", // Can be same as phone
    whatsappMessage:
      "Hello Kabra Emporium, I would like to know more about your collections.",
    instagram:
      "https://www.instagram.com/kabra.emporium?igsh=MW41dDByaGV3dWNjcg%3D%3D&utm_source=qr",
    facebook: "https://www.facebook.com/kabrasarees",
  };

  // Location pages routes
  const locationPages = {
    nashikroad: "/contact/nashik-road", // Update with your actual contact page routes
    panditcolony: "/contact/wholesale-branch",
    mainbranch: "/contact/main-branch",
  };

  const locationOptions = [
    {
      icon: <FaStore size={18} />,
      label: "Nashik Road Branch",
      href: locationPages.nashikroad,
      bgColor: "bg-red-500",
      hoverColor: "hover:bg-red-600",
    },
    {
      icon: <FaStore size={18} />,
      label: "Wholesale Branch",
      href: locationPages.panditcolony,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
    },
    {
      icon: <FaStore size={18} />,
      label: "Main Branch",
      href: locationPages.mainbranch,
      bgColor: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
    },
  ];

  const buttons = [
    {
      icon: <FaFacebookF size={20} />,
      label: "Facebook",
      href: contactInfo.facebook,
      bgColor: "bg-[#1877F2]",
      hoverColor: "hover:bg-[#1666d8]",
      target: "_blank",
      rel: "noopener noreferrer nofollow",
      aria: "Visit our Facebook page",
      isExternal: true,
    },
    {
      icon: <FaInstagram size={22} />,
      label: "Instagram",
      href: contactInfo.instagram,
      bgColor: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
      hoverColor: "hover:opacity-90",
      target: "_blank",
      rel: "noopener noreferrer nofollow",
      aria: "Visit our Instagram",
      isExternal: true,
    },
    {
      icon: <FaWhatsapp size={24} />,
      label: "WhatsApp",
      href: `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(contactInfo.whatsappMessage)}`,
      bgColor: "bg-[#25D366]",
      hoverColor: "hover:bg-[#20ba5a]",
      target: "_blank",
      rel: "noopener noreferrer",
      aria: "Chat on WhatsApp",
      isExternal: true,
    },
  ];

  const handleLocationClick = (href) => {
    setIsLocationOpen(false);
    navigate(href);
  };

  return (
    <div className="fixed bottom-15 right-6 z-50">
      <div className="flex flex-col items-end gap-3">
        {buttons.map((button, index) => (
          <motion.a
            key={button.label}
            href={button.href}
            target={button.target}
            rel={button.rel}
            aria-label={button.aria}
            className="relative"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
          >
            <div
              className={`p-3 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group ${button.bgColor} ${button.hoverColor}`}
            >
              {button.icon}
              <span className="hidden group-hover:inline text-sm font-medium pr-2">
                {button.label}
              </span>
            </div>
          </motion.a>
        ))}

        {/* Location Button with Dropdown */}
        <div 
          className="relative"
          onMouseEnter={() => setIsLocationOpen(true)}
          onMouseLeave={() => setIsLocationOpen(false)}
        >
          <motion.div
            className="relative cursor-pointer"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: buttons.length * 0.1, type: "spring", stiffness: 200 }}
          >
            <div
              className={`p-3 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600`}
            >
              <FaMapMarkerAlt size={22} />
              <span className="hidden group-hover:inline text-sm font-medium pr-2">
                Our Branches
              </span>
            </div>
          </motion.div>

          <AnimatePresence>
            {isLocationOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full right-0 mb-2 w-72 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100"
              >
               
                
                <div className="p-2 max-h-96 overflow-y-auto">
                  {locationOptions.map((option, index) => (
                    <motion.div
                      key={option.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => handleLocationClick(option.href)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group text-left"
                      >
                        <div className={`p-2 ${option.bgColor} rounded-full text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{option.label}</p>
                          
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default FloatingButtons;