
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
// import WhatsAppPopup from "../components/ScrollToTop/WhatsAppPopup";
import FloatingButtons from "../components/FloatingButtons/FloatingButtons";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

import { bg2, mobilebg } from "../assets/index";
import PopupManager from "../components/popup/PopupManager";

function Layout() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with lower opacity.
          backgroundAttachment:fixed removed — it blocks GPU layer compositing
          and causes full-page repaints on every scroll event on mobile. */}
      <div
        className="fixed inset-0 z-0 opacity-25"
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />

      {/* Mobile-specific background overlay */}
      <div
        className="fixed inset-0 z-0 opacity-20 lg:hidden"
        style={{
          backgroundImage: `url(${mobilebg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />

      {/* Content with higher z-index */}
      <div className="relative z-10">
        <ScrollToTop />
        <Navbar />
        {/* <WhatsAppPopup /> */}
        <FloatingButtons />
        <Outlet />
        <Footer />
      </div>
      {/* <PopupManager /> */}
    </div>
  );
}

export default Layout;
