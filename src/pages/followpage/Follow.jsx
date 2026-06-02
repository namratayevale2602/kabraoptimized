// Follow.jsx
import React from 'react';
import { Phone, MapPin, Globe, Star, Menu } from 'lucide-react';
import { kabralogo,mobilebg } from "../../assets/index"
import { FaFacebook, FaInstagram } from 'react-icons/fa';

function Follow() {
  // Redirection handlers
  const handleDirections = () => {
    // Google Maps URL with the address
    const address = encodeURIComponent("Padma-vishwa Centre Old Pandit Colony Sharanpur Road, opp. Rajiv Gandhi Bhavan, Nashik, Maharashtra 422002");
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  const handleAddressClick = () => {
    // Specific Google Maps link provided
    window.open('https://maps.app.goo.gl/HA71KEB1LFNzsv1SA', '_blank');
  };

  const handleInstagram = () => {
    window.open('https://www.instagram.com/kabra.emporium?igsh=MW41dDByaGV3dWNjcg%3D%3D&utm_source=qr', '_blank');
  };

  const handleFacebook = () => {
    window.open('https://www.facebook.com/kabrasarees', '_blank');
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ 
        backgroundImage: `url(${mobilebg})`,
      }}
    >
      {/* Overlay to make content readable */}
      <div className="absolute inset-0 bg-white/80"></div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Dealer Info Card */}
        <div className="rounded-lg overflow-hidden max-w-4xl mx-auto">
          {/* Dealer Header with Centered Logo */}
          <div className="px-6 flex flex-col items-center justify-center">
            {/* Centered Logo */}
            <img 
              src={kabralogo} 
              alt="Kabra Emporium" 
              className="h-50 w-auto rounded-lg p-3 mb-3"
            />
          </div>

          {/* Visitor Form Section - White background for readability */}
          <div className="p-6 backdrop-blur-md rounded-lg shadow-xl">
            {/* Action Buttons with Redirections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Instagram Button */}
              <button 
                onClick={handleInstagram}
                className="flex items-center justify-center gap-3 bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white font-semibold py-4 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-md"
              >
                <FaInstagram className="w-6 h-6" />
                <span className="text-lg">Instagram</span>
              </button>

              {/* Facebook Button */}
              <button 
                onClick={handleFacebook}
                className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-md"
              >
                <FaFacebook className="w-6 h-6" />
                <span className="text-lg">Facebook</span>
              </button>
            </div>

            <div 
              className="backdrop-blur-sm rounded-lg p-4 border border-gray-200 transition-all duration-200"
            >
              <div className="flex text-4xl md:text-6xl items-start justify-center gap-3">
                <h1 className='text-[#7b3306]'>
                  Happy Women's Day
                </h1>
              </div>
            </div>

            {/* Address Section - Clickable */}
            <div 
              onClick={handleAddressClick}
              className="backdrop-blur-sm rounded-lg p-4 border border-gray-200 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <p className="text-gray-700 text-sm leading-relaxed">
                  Padma-vishwa Centre Old Pandit Colony Sharanpur Road, opp. Rajiv Gandhi Bhavan, Nashik, Maharashtra 422002
                </p>
              </div>
              <div className="mt-2 text-xs text-blue-600 flex items-center gap-1 justify-end">
                <MapPin className="w-3 h-3" />
                <span>Click to open in Google Maps</span>
              </div>
            </div>
            
            {/* Contact info with clickable links */}
            <div className="mt-4 flex flex-col sm:flex-row gap-4 text-sm text-gray-600 justify-between">
              <a 
                href="tel:+919890533709" 
                className="flex items-center gap-2 hover:text-green-600 transition-colors backdrop-blur-sm p-3 rounded-lg border border-gray-200 hover:border-green-300"
              >
                <Phone className="w-4 h-4 text-green-600" /> 
                <span className="font-medium">+91 98905 33709</span>
              </a>
              <a 
                href="https://kabraemporium.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-purple-600 transition-colors backdrop-blur-sm p-3 rounded-lg border border-gray-200 hover:border-purple-300"
              >
                <Globe className="w-4 h-4 text-purple-600" /> 
                <span className="font-medium">kabraemporium.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Follow;