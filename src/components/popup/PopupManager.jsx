import React, { useState, useEffect } from "react";
import Popup from "./Popup";

// Import your popup image
// Make sure you have this image in your assets folder
import { wommendaymob2 } from "../../assets/index";

const PopupManager = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Show popup after 1 second on every page load/refresh
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 1000); // 1000ms = 1 second delay

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs on every mount

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const popupFormUrl = "https://admin.masteraix.io/widget/form/69a53e0af2e7d";

  return (
    <Popup
      isOpen={isPopupOpen}
      onClose={handleClosePopup}
      imageSrc={wommendaymob2}
      formUrl={popupFormUrl}
      title="KABRA Womens Day"
      subtitle="Special Offer Just for You!"
    />
  );
};

export default PopupManager;