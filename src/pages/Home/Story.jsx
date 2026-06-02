import React, { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  X,
  User,
  ShoppingBag,
  Heart,
  Home,
  Grid,
  Star,
  ShoppingCart,
  Phone,
  Mail,
  MapPin,
  Truck,
  Shield,
  Clock,
} from "lucide-react";
import * as images from "../../assets";
import { useNavigate } from "react-router-dom";

function Story() {
  const scrollContainerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistCount, setWishlistCount] = useState(2);
  const navigate = useNavigate();

  // Enhanced category data with all your provided categories and images
  const categories = [
    {
      id: 1,
      name: "Kanchipuram Pure Silk Sarees",
      description: "Contemporary designer sarees for modern women",
      link: "product/kanchipuram-pure-silk",
      image: images.kachipuramsilkmodellightgreen,
      count: "150+",
      featured: true,
      type: "saree",
      trending: true,
    },
    {
      id: 2,
      name: "Banarasi Silk Sarees",
      description: "Luxurious silk sarees with intricate zari work",
      link: "product/banarasi-silk",
      image: images.banarasigeoegettemodelred,
      count: "200+",
      type: "saree",
      trending: true,
    },
    {
      id: 3,
      name: "Banarasi Organza",
      description: "Opulent wedding sarees for the bride and family",
      link: "product/banarasi-organza",
      image: images.banarasiorganzamodel,
      count: "100+",
      featured: true,
      type: "collection",
      new: true,
    },
    {
      id: 4,
      name: "Banarasi Georgette Saree",
      description: "Authentic Maharashtrian Paithanis with traditional motifs",
      link: "product/banarasi-georgette",
      image: images.banarasigeoegettemodelyello,
      count: "80+",
      type: "saree",
    },
    {
      id: 5,
      name: "Banarasi Tissue Saree",
      description: "Trendy designer lehengas for weddings and parties",
      link: "product/banarasi-tissue",
      image: images.banarasitiisuemodel,
      count: "120+",
      featured: true,
      type: "outfit",
      trending: true,
    },
    {
      id: 6,
      name: "Organza Sarees",
      description: "Glamorous outfits perfect for evening events",
      link: "product/organza-sarees",
      image: images.organzamodel,
      count: "200+",
      type: "outfit",
    },
    {
      id: 7,
      name: "Traditional Handloom Silk",
      description: "Traditional Kanchipuram silk sarees with temple borders",
      link: "product/handloom-sarees",
      image: images.purehandloommodelblue,
      count: "150+",
      type: "saree",
    },
    {
      id: 8,
      name: "Chanderi Saree",
      description: "Comfortable yet elegant cotton sarees for daily wear",
      link: "product/chanderi-saree",
      image: images.chanderimodelblue,
      count: "300+",
      type: "saree",
    },
    {
      id: 9,
      name: "Soft Silk Saree",
      description: "Premium fabrics for custom stitching",
      link: "product/soft-silk",
      image: images.softsilkmodelnavyblue,
      count: "300+",
      type: "material",
    },
    {
      id: 10,
      name: "Kalamkari Silk Saree",
      description: "Custom made outfits from selected fabrics",
      link: "product/kalamkari-silk",
      image: images.kalamkarimodelbrown,
      count: "Custom",
      type: "service",
    },
    {
      id: 11,
      name: "Silk Printed Saree",
      description: "Designer suits and salwar kameez",
      link: "product/silk-printed",
      image: images.silkprontedpurple,
      count: "150+",
      type: "outfit",
    },
    {
      id: 12,
      name: "Banarasi Georgette Saree",
      description: "Contemporary and traditional kurtis",
      link: "product/banarasi-georgette",
      image: images.banarasigeoegettemodelyello,
      count: "400+",
      type: "outfit",
      trending: true,
    },

    {
      id: 13,
      name: "Pure Designer Embroidery Saree",
      description: "Discounted premium collections",
      link: "product/pure-designer-embroidery",
      image: images.desginersaree2,
      count: "50% OFF",
      badge: true,
      type: "sale",
      featured: true,
    },
  ];


  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Categories Carousel Section */}
      <div className="relative w-full lg:hidden">
        {/* Navigation Arrows */}
        <button
          onClick={scrollLeft}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 -ml-6 transition-all hover:scale-110 hover:shadow-xl"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={scrollRight}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 -mr-6 transition-all hover:scale-110 hover:shadow-xl"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Categories Carousel */}
        <div className="py-3 md:py-1">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide space-x-1 md:space-x-6 px-2 md:px-8"
            style={{ scrollBehavior: "smooth" }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="shrink-0 w-24 md:w-28 flex flex-col items-center group cursor-pointer"
                onClick={() => {
                  setActiveCategory(category.name);
                  navigate(category.link);
                }}
              >
                {/* Category Circle */}
                <div className="relative mb-2 md:mb-3">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-md group-hover:shadow-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Category Name & Info */}
                <a href={category.link} className="text-center w-full">
                  <span className="block text-xs md:text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors truncate">
                    {category.name}
                  </span>
                  {/* <div className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1 truncate">
                    {category.description}
                  </div>
                  <div className="text-[10px] md:text-xs font-medium text-purple-600 mt-0.5">
                    {category.count}
                  </div> */}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      

      {/* Featured Categories Banner */}

      {/* Add custom styles for animations */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}

export default Story;
