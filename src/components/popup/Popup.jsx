import React, { useState, useEffect } from "react";

const Popup = ({ 
  isOpen, 
  onClose, 
  imageSrc, 
  formUrl,
  title = "Special Offer",
  subtitle = "Click below to claim your offer"
}) => {
  const [showForm, setShowForm] = useState(false);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setShowForm(false);
    onClose();
  };

  const handleImageClick = () => {
    setShowForm(true);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 bg-opacity-75 transition-opacity"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl rounded-lg shadow-xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
          aria-label="Close popup"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {!showForm ? (
          /* Image View */
          <div className="relative cursor-pointer" onClick={handleImageClick}>
            <img
              src={imageSrc}
              alt="Promotional banner"
              className="w-full h-[700px] md:h-[700px] object-contain"
            />
            {/* <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
              <p className="text-xl text-white mb-4">{subtitle}</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
                Click to Claim Offer
              </button>
            </div> */}
          </div>
        ) : (
          /* Form View */
          <div className="p-6 bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
            <div className="relative w-full" style={{ height: "600px" }}>
              <iframe
                src={formUrl}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "3px"
                }}
                id="popup-form-iframe"
                title="Campaign Form"
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;