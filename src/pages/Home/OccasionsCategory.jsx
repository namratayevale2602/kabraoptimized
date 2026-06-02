// import React, { useState } from "react";

// // Demo product images (replace with your real ones)
// import {
//   kabra2,
//   kabra7,
//   kabra11,
//   kabra16,
//   occasionbg,
// } from "../../assets";

// const mainTabs = [
//   "Baby Shower",
//   "Banarasi Sarees",
//   "Designer Sarees",
//   "Pure Handloom Silk Saree",
//   "Printed Sarees",
//   "Occasion",
// ];

// const subTabs = {
//   "Banarasi Sarees": [
//     "Banarasi Silk",
//     "Banarasi Kadhwa",
//     "Banarasi Tussar Weaving",
//     "Banarasi Organza",
//     "Banarasi Georgette Saree",
//     "Banarasi Tissue Saree",
//   ],
// };

// const productsData = {
//   "Banarasi Silk": [
//     { id: 1, img: kabra2 },
//     { id: 2, img: kabra7 },
//     { id: 3, img: kabra11 },
//     { id: 4, img: kabra16 },
//   ],
//   "Banarasi Kadhwa": [
//     { id: 5, img: kabra2 },
//     { id: 6, img: kabra7 },
//   ],
//   "Banarasi Tussar Weaving": [
//     { id: 7, img: kabra2 },
//     { id: 8, img: kabra7 },
//   ],
//   "Banarasi Organza": [
//     { id: 9, img: kabra11 },
//     { id: 10, img: occasionbg },
//   ],
// };

// export default function CollectionPage() {
//   const [activeMain, setActiveMain] = useState("Banarasi Sarees");
//   const [activeSub, setActiveSub] = useState("Banarasi Silk");

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">

//       {/* MAIN CATEGORY TABS */}
//       <div className="flex flex-wrap gap-3 mb-8">
//         {mainTabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => {
//               setActiveMain(tab);
//               if (subTabs[tab]) setActiveSub(subTabs[tab][0]);
//             }}
//             className={`px-6 py-2 rounded-full border transition ${
//               activeMain === tab
//                 ? "bg-amber-700 text-white"
//                 : "bg-white text-black"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* SUB CATEGORY TABS */}
//       {subTabs[activeMain] && (
//         <div className="flex flex-wrap gap-3 mb-10">
//           {subTabs[activeMain].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveSub(tab)}
//               className={`px-5 py-2 rounded-lg transition ${
//                 activeSub === tab
//                   ? "bg-orange-500 text-white"
//                   : "bg-gray-200"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* PRODUCTS GRID */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {(productsData[activeSub] || []).map((product) => (
//           <div
//             key={product.id}
//             className="rounded-xl overflow-hidden shadow hover:shadow-xl transition"
//           >
//             <img
//               src={product.img}
//               alt=""
//               className="w-full h-80 object-cover hover:scale-105 transition-transform"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import { kabra2, kabra7, kabra11, kabra16, occasionbg } from "../../assets";

const occasions = [
  {
    id: 1,
    title: "Baby shower",
    img: kabra2,
    slug: "babyshower",
  },
  {
    id: 2,
    title: "Haldi",
    img: kabra7,
    slug: "haldi",
  },
  {
    id: 3,
    title: "Sangeet Moments",
    img: kabra11,
    slug: "sangeet",
  },
  {
    id: 4,
    title: "Engagement",
    img: kabra16,
    slug: "engagement",
  },
  {
    id: 5,
    title: "Wedding Wear",
    img: kabra7,
    slug: "wedding",
  },
  {
    id: 6,
    title: "Festive Wear",
    img: kabra11,
    slug: "festival",
  },
  {
    id: 7,
    title: "Pooja & Rituals",
    img: kabra2,
    slug: "pooja",
  },
];

const OccasionsPage = () => {
  const navigate = useNavigate();

  const firstRow = occasions.slice(0, 3);
  const secondRow = occasions.slice(3);

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center py-12 md:py-16"
      style={{ backgroundImage: `url(${occasionbg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-serif font-semibold text-[#5c2c1a]">
            Shop by Occasion
          </h1>
          <p className="text-sm md:text-lg mt-2 font-light text-gray-700">
            Styled For Every Celebration
          </p>
          <div className="w-28 md:w-40 mx-auto h-[2px] bg-[#5c2c1a] mt-3"></div>
        </div>

        {/* FIRST ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {firstRow.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => navigate(`/occasion/${item.slug}`)}
            >
              <img
                src={item.img}
                loading="lazy"
                alt={item.title}
                className="w-full h-52 md:h-60 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-md">
                <p className="text-[#5c2c1a] font-semibold text-base md:text-lg text-center">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SECOND ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {secondRow.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => navigate(`/occasion/${item.slug}`)}
            >
              <img
                src={item.img}
                loading="lazy"
                alt={item.title}
                className="w-full h-40 sm:h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-md">
                <p className="text-[#5c2c1a] font-semibold text-xs sm:text-sm md:text-lg text-center">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OccasionsPage;

// import React from "react";
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import {
//   kabra2,
//   kabra7,
//   kabra11,
//   kabra16,
//   occasionbg,
// } from "../../assets";

// const occasions = [
//   {
//     id: 1,
//     name: "Haldi Hues",
//     description: "Vibrant yellow outfits for Haldi ceremony",
//     image: kabra2,
//     link: "/Categorydetail/sarees",
//     color: "from-yellow-400/30 to-amber-100",
//   },
//   {
//     id: 2,
//     name: "Cocktail Parties",
//     description: "Elegant evening wear for cocktail events",
//     image: kabra7,
//     link: "/Categorydetail/lehengas",
//     color: "from-purple-400/30 to-pink-100",
//   },
//   {
//     id: 3,
//     name: "Sangeet Moments",
//     description: "Dazzling dance outfits for Sangeet night",
//     image: kabra11,
//     link: "/Categorydetail/salwarsuite",
//     color: "from-blue-400/30 to-indigo-100",
//   },
//   {
//     id: 4,
//     name: "Reception Looks",
//     description: "Grand attire for wedding reception",
//     image: kabra16,
//     link: "/Categorydetail/lehengas ",
//     color: "from-red-400/30 to-rose-100",
//   },
// ];

// const OccasionsPage = () => {
//   return (
//     <section
//       className="relative min-h-screen py-10 md:py-16 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
//       style={{ backgroundImage: `url(${occasionbg})` }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-white/80" />

//       <div className="relative max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-amber-900 font-montserrat">
//             Shop by Occasion
//           </h1>
//           <div className="h-1 w-24 bg-amber-500 mx-auto my-4" />
//           <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg font-nunito-sans">
//             Every celebration deserves the perfect look — explore outfits
//             curated for every special moment.
//           </p>
//         </motion.div>

//         {/* Occasions Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {occasions.map((occasion, index) => (
//             <motion.a
//               key={occasion.id}
//               href={occasion.link}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: index * 0.1 }}
//               className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all bg-white"
//             >
//               {/* Image */}
//               <div className="h-[320px] relative overflow-hidden">
//                 <img
//                   src={occasion.image}
//                   alt={occasion.name}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />

//                 <div
//                   className={`absolute inset-0 bg-gradient-to-b ${occasion.color} opacity-60`}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//               </div>

//               {/* Content */}
//               <div className="absolute bottom-0 left-0 right-0 p-6">
//                 <h3 className="text-white text-xl font-bold font-montserrat">
//                   {occasion.name}
//                 </h3>
//                 <p className="text-white/80 text-sm mt-1">
//                   {occasion.description}
//                 </p>

//                 <div className="flex items-center mt-4 text-amber-300 font-semibold">
//                   Explore
//                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                 </div>
//               </div>
//             </motion.a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OccasionsPage;
