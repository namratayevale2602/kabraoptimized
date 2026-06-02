import React from "react";
import { useNavigate } from "react-router-dom";

import { bestseller, exclusive, carousal } from "../../assets";

export default function SareeShowcase() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#f7f2ef] ">
      {/* ---------------- TOP SLIDER STRIP ---------------- */}
      {/* <div className="hidden sm:block overflow-hidden w-full h-10 bg-[#f7f2ef]">
        <div className="flex animate-slide">
          <img src={carousal} className="h-7 w-auto" />
          <img src={carousal} className="h-7 w-auto" />
        </div>
      </div> */}

      {/* TOP PATTERN */}
      <div
        className="w-full h-4 bg-repeat bg-top"
        style={{ backgroundImage: "url('/pattern.png')" }}
      ></div>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-10">
        {/* LEFT – BEST SELLER IMAGE */}
        <div className="relative overflow-hidden p-6 flex items-end justify-center h-[200px] md:h-[400px]">
          <img
            onClick={() => navigate("/Categorydetail/lehengas")}
            src={bestseller}
            loading="lazy"
            alt="Best Seller"
            className="h-full w-full object-contain object-center rounded-2xl"
          />
        </div>

        {/* RIGHT – EXCLUSIVE COLLECTION IMAGE */}
        <div className="relative overflow-hidden p-6 flex items-end justify-center h-[200px] md:h-[400px]">
          <img
            onClick={() => navigate("/Categorydetail/sarees")}
            src={exclusive}
            loading="lazy"
            alt="Exclusive Collection"
            className="h-full w-full object-contain object-center rounded-2xl"
          />
        </div>
      </div>

      {/* BOTTOM PATTERN */}
      {/* <div
        className="w-full h-6 bg-repeat bg-bottom"
        style={{ backgroundImage: "url('/pattern.png')" }}
      ></div> */}

      {/* ---------------- BOTTOM SLIDER STRIP ---------------- */}
      {/* <div className="hidden sm:block overflow-hidden w-full h-10 bg-[#f7f2ef] mt-4">
        <div className="flex animate-slide">
          <img src={carousal} className="h-7 w-auto" />
          <img src={carousal} className="h-7 w-auto" />
        </div>
      </div> */}
    </div>
  );
}
