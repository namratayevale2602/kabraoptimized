import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingBag,
  User,
  Heart,
  Search,
  ChevronRight,
  Home,
  ContactIcon,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { kabralogo } from "../../assets/index";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items with dropdown structure - Same for mobile and desktop
  const navItems = [
    {
      type: "link",
      label: "Home",
      icon: <Home size={18} />,
      path: "/",
      action: () => {
        navigate("/");
        setIsSidebarOpen(false);
      },
    },
    {
      type: "link",
      label: "About Us",
      icon: <Info size={18} />,
      path: "/about",
      action: () => {
        navigate("/about");
        setIsSidebarOpen(false);
      },
    },
    {
      type: "link",
      label: "Main Branch",
      icon: <ContactIcon size={18} />,
      path: "/contact/main-branch",
      action: () => {
        navigate("/contact/main-branch");
        setIsSidebarOpen(false);
      },
    },
    {
      type: "link",
      label: "Wholesale Branch",
      icon: <ContactIcon size={18} />,
      path: "/contact/wholesale-branch",
      action: () => {
        navigate("/contact/wholesale-branch");
        setIsSidebarOpen(false);
      },
    },
    {
      type: "link",
      label: "Nashik Road Branch",
      icon: <ContactIcon size={18} />,
      path: "/contact/nashik-road",
      action: () => {
        navigate("/contact/nashik-road");
        setIsSidebarOpen(false);
      },
    },
    {
      type: "dropdown",
      label: "Categories",
      icon: <Menu size={18} />,
      subItems: [
        {
          label: "Sarees",
          subItems: [
            {
              label: "Kanchipuram Sarees",
              subItems: [
                {
                  label: "Kanchipuram Pure Silk Sarees",
                  slug: "kanchipuram-pure-silk-sarees",
                },
                {
                  label: "Kanchipuram Pure Half Fine Jari",
                  slug: "kanchipuram-half-fine-jari",
                },
              ],
            },
            {
              label: "Banarasi Sarees",
              subItems: [
                { label: "Banarasi Silk Sarees", slug: "banarasi-silk" },
                { label: "Banarasi Kadhwa Sarees", slug: "banarasi-kadhwa" },
                { label: "Banarasi Tussar Weaving", slug: "banarasi-tussar" },
                { label: "Banarasi Organza", slug: "banarasi-organza" },
                {
                  label: "Banarasi Georgette Saree",
                  slug: "banarasi-georgette",
                },
                { label: "Banarasi Tissue Saree", slug: "banarasi-tissue" },
              ],
            },
            {
              label: "Designer Sarees",
              subItems: [
                {
                  label: "Pure Designer Embroidery Saree",
                  slug: "pure-designer-embroidery",
                },
                { label: "Fancy Sarees", slug: "fancy-sarees" },
                { label: "Organza Sarees", slug: "organza-sarees" },
                { label: "Bandhani Sarees", slug: "bandhani-sarees" },
                { label: "Fancy Weaving Saree", slug: "fancy-weaving" },
                { label: "Ready Blouse Sarees", slug: "ready-blouse" },
                {
                  label: "Pure Tussar Embroidery Sarees",
                  slug: "pure-tussar-embroidery",
                },
                { label: "Ready To Wear Saree", slug: "ready-to-wear" },
                {
                  label: "Handloom Silk Embroidery Sarees",
                  slug: "handloom-silk-embroidery",
                },
              ],
            },
            {
              label: "Handloom Silk",
              subItems: [
                { label: "Handloom Sarees", slug: "handloom-sarees" },
                { label: "Gadwal Silk", slug: "gadwal-silk" },
                { label: "Paithani Sarees", slug: "paithani-sarees" },
                { label: "Chanderi Saree", slug: "chanderi-saree" },
                { label: "Ikkat & Patola Saree", slug: "ikkat-patola" },
                { label: "Soft Silk Saree", slug: "soft-silk" },
                { label: "Patan Patola", slug: "patan-patola" },
                { label: "Pashmina Sarees", slug: "pashmina-sarees" },
              ],
            },
            {
              label: "Printed Saree",
              subItems: [
                { label: "Designer Printed Saree", slug: "designer-printed" },
                { label: "Tussar Printed Saree", slug: "tussar-printed" },
                { label: "Kalamkari Silk Saree", slug: "kalamkari-silk" },
                { label: "Silk Printed Saree", slug: "silk-printed" },
              ],
            },
            {
              label: "Occasion",
              subItems: [
                { label: "Wedding Saree", slug: "wedding-saree" },
                { label: "Festive Wear Saree", slug: "festive-wear" },
                { label: "Party Wear Saree", slug: "party-wear-saree" },
                { label: "Mehendi Sarees", slug: "mehendi-sarees" },
                { label: "Reception sarees", slug: "reception-sarees" },
                { label: "Haldi Sarees", slug: "haldi-sarees" },
              ],
            },
          ],
        },
        {
          label: "Lehengas",
          subItems: [
            {
              label: "Style",
              subItems: [
                { label: "Ready To Ship", slug: "ready-to-ship-lehenga" },
                { label: "Bridal Lehenga", slug: "bridal-lehenga" },
                { label: "Designer Lehenga", slug: "designer-lehenga" },
                { label: "Jacket Lehenga", slug: "jacket-lehenga" },
                { label: "Bridesmaids Lehenga", slug: "bridesmaids-lehenga" },
                { label: "Crop Top Lehenga", slug: "crop-top-lehenga" },
                { label: "Bandhani Lehenga", slug: "bandhani-lehenga" },
                { label: "Fishcut Lehenga", slug: "fishcut-lehenga" },
              ],
            },
            {
              label: "Occasions",
              subItems: [
                { label: "Wedding Lehenga", slug: "wedding-lehenga" },
                { label: "Reception Lehenga", slug: "reception-lehenga" },
                { label: "Party Wear Lehenga", slug: "party-wear-lehenga" },
                { label: "Mehendi Lehenga", slug: "mehendi-lehenga" },
                { label: "Sangeet Lehenga", slug: "sangeet-lehenga" },
                { label: "Engagement Lehenga", slug: "engagement-lehenga" },
              ],
            },
          ],
        },
        {
          label: "Salwar Suits",
          subItems: [
            {
              label: "Style",
              subItems: [
                { label: "Readymade Suites", slug: "readymade-suites" },
                { label: "Anarkali", slug: "anarkali" },
                { label: "Straight Cut Suit", slug: "straight-cut" },
                { label: "Sharara Suit", slug: "sharara-suit" },
                { label: "Palazzo Suit", slug: "palazzo-suit" },
              ],
            },
            {
              label: "Plus Size & Special",
              subItems: [
                { label: "Plus Size Salwar Kameez", slug: "plus-size" },
                { label: "Indowestern", slug: "indowestern" },
                { label: "Evening Look", slug: "evening-look" },
                { label: "Bridal Gowns", slug: "bridal-gowns" },
              ],
            },
            {
              label: "Unstitched Salwars",
              subItems: [
                {
                  label: "Embroidery Unstitched Salwars",
                  slug: "embroidery-unstitched",
                },
                {
                  label: "Cotton Unstitched Salwars",
                  slug: "cotton-unstitched",
                },
                {
                  label: "Banarasi Unstitched Salwars",
                  slug: "banarasi-unstitched",
                },
                {
                  label: "Paithani Unstitched Salwars",
                  slug: "paithani-unstitched",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  // Desktop mega menu categories - All in one array
  const megaMenuCategories = [
    {
      label: "Kanchipuram Sarees",
      subItems: [
        { label: "Kanchipuram Pure Silk Sarees", slug: "kanchipuram-pure-silk-sarees" },
        { label: "Kanchipuram Pure Half Fine Jari", slug: "kanchipuram-half-fine-jari" },
      ],
    },
    {
      label: "Banarasi Sarees",
      subItems: [
        { label: "Banarasi Silk Sarees", slug: "banarasi-silk-sarees" },
        { label: "Banarasi Kadhwa Sarees", slug: "banarasi-kadhwa-sarees" },
        { label: "Banarasi Tussar Weaving", slug: "banarasi-tussar-weaving" },
        { label: "Banarasi Organza", slug: "banarasi-organza" },
        { label: "Banarasi Georgette Saree", slug: "banarasi-georgette-saree" },
        { label: "Banarasi Tissue Saree", slug: "banarasi-tissue-saree" },
      ],
    },
    {
      label: "Designer Sarees",
      subItems: [
        { label: "Pure Designer Embroidery", slug: "pure-designer-embroidery-saree" },
        { label: "Fancy Sarees", slug: "fancy-sarees" },
        { label: "Organza Sarees", slug: "organza-sarees" },
        { label: "Bandhani Sarees", slug: "bandhani-sarees" },
        { label: "Fancy Weaving Saree", slug: "fancy-weaving-saree" },
        { label: "Pure Tussar Embroidery Sarees", slug: "pure-tussar-embroidery-sarees" },
        { label: "Ready To Wear Saree", slug: "ready-to-wear-saree" },
      ],
    },
    {
      label: "Handloom Silk",
      subItems: [
        { label: "Handloom Sarees", slug: "handloom-sarees" },
        { label: "Gadwal Silk", slug: "gadwal-silk" },
        { label: "Paithani Sarees", slug: "paithani-sarees" },
        { label: "Chanderi Saree", slug: "chanderi-saree" },
        { label: "Ikkat & Patola", slug: "ikkat-patola-saree" },
        { label: "Soft Silk Saree", slug: "soft-silk-saree" },
      ],
    },
    {
      label: "Printed Saree",
      subItems: [
        { label: "Designer Printed", slug: "designer-printed-saree" },
        { label: "Tussar Printed", slug: "tussar-printed-saree" },
        { label: "Kalamkari Silk", slug: "kalamkari-silk-saree" },
        { label: "Silk Printed", slug: "silk-printed-saree" },
      ],
    },
    {
      label: "Lehengas",
      subItems: [
        { label: "Designer Lehenga", slug: "designer-lehenga" },
        { label: "Jacket Lehenga", slug: "jacket-lehenga" },
        { label: "Crop Top Lehenga", slug: "crop-top-lehenga" },
        { label: "Ready To Ship", slug: "ready-to-ship" },
        { label: "Bandhani Lehenga", slug: "bandhani-lehenga" },
        { label: "Fishcut Lehenga", slug: "fishcut-lehenga" },
      ],
    },
    {
      label: "Salwar Suits",
      subItems: [
        { label: "Anarkali", slug: "anarkali" },
        { label: "Straight Cut", slug: "straight-cut-suit" },
        { label: "Palazzo Suit", slug: "palazzo-suit" },
        { label: "Sharara Suit", slug: "sharara-suit" },
        { label: "Readymade Suites", slug: "readymade-suites" },
        { label: "Plus Size", slug: "plus-size-salwar-kameez" },
      ],
    },
    {
      label: "Wedding Collection",
      subItems: [
        { label: "Bridal Lehenga", slug: "bridal-lehenga" },
        { label: "Bridesmaids Lehenga", slug: "bridesmaids-lehenga" },
        { label: "Sangeet Lehenga", slug: "sangeet-lehenga" },
        { label: "Engagement Lehenga", slug: "engagement-lehenga" },
        { label: "Mehendi Lehenga", slug: "mehendi-lehenga" },
      ],
    },
  ];

  const contactInfo = {
    phone: "+919890533709",
    whatsapp: "+919890533709",
    whatsappMessage:
      "Hello Kabra Emporium, I would like to know more about your collections.",
    instagram:
      "https://www.instagram.com/kabra.emporium?igsh=MW41dDByaGV3dWNjcg%3D%3D&utm_source=qr",
    facebook: "https://www.facebook.com/kabrasarees",
  };
  
  const mobileNavItems = [
    {
      icon: <Home size={20} />,
      label: "Home",
      action: () => navigate("/"),
    },
    // {
    //   icon: <Search size={20} />,
    //   label: "Search",
    //   action: () => setIsSearchOpen(true),
    // },
    {
      icon: <ContactIcon size={20} />,
      label: "Branches",
      action: () => setIsSidebarOpen(true),
    },
  ];

  const handleCategoryClick = (slug) => {
    if (slug) {
      navigate(`/product/${slug}`);
    }
    setIsSidebarOpen(false);
    setActiveMegaMenu(null);
    setHoveredCategory(null);
  };

  const handleCategoryClicks = (slug) => {
    navigate(`/Categorydetail/${slug}`);
    setIsSidebarOpen(false);
  };

  // Component for dropdown items
  const DropdownItem = ({ item, level = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isLeafNode = !hasSubItems && item.slug;

    const handleClick = (e) => {
      e.stopPropagation();
      if (isLeafNode) {
        handleCategoryClick(item.slug);
        setIsSidebarOpen(false);
      } else if (hasSubItems) {
        setIsExpanded(!isExpanded);
      } else if (item.slug) {
        handleCategoryClick(item.slug);
        setIsSidebarOpen(false);
      }
    };

    return (
      <>
        <button
          onClick={handleClick}
          className={`w-full flex items-center justify-between p-3 hover:bg-orange-50 transition-colors ${
            level === 0 ? "border-b border-gray-100" : ""
          }`}
          style={{ paddingLeft: `${20 + level * 16}px` }}
        >
          <div className="flex items-center space-x-3">
            {level === 0 && item.icon && (
              <div className="text-gray-600">{item.icon}</div>
            )}
            <div className="text-left">
              <div
                className={`font-medium ${
                  level === 0 ? "text-gray-800" : "text-gray-700"
                }`}
              >
                {item.label}
              </div>
            </div>
          </div>

          {hasSubItems && (
            <div className="text-gray-400">
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          )}

          {(isLeafNode || item.slug) && !hasSubItems && (
            <ChevronRight size={16} className="text-gray-400" />
          )}
        </button>

        {/* Sub-items */}
        {hasSubItems && isExpanded && (
          <div className="bg-gray-50/50">
            {item.subItems.map((subItem, idx) => (
              <DropdownItem
                key={`${item.label}-${idx}`}
                item={subItem}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  // Mega menu component for desktop with responsive sizing
  const MegaMenuItem = ({ category }) => {
    const isHovered = hoveredCategory === category.label;

    const handleMainClick = () => {
      if (category.slug) {
        handleCategoryClick(category.slug);
      }
    };

    return (
      <div
        className="relative"
        onMouseEnter={() => setHoveredCategory(category.label)}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <button
          onClick={handleMainClick}
          className={`navfont text-xs xl:text-sm font-medium whitespace-nowrap px-1.5 xl:px-2 py-1 transition-all duration-300 cursor-pointer ${
            isHovered ? "text-[#7b3306]" : "text-gray-700"
          } ${isScrolled ? "text-xs" : "text-sm"}`}
        >
          {category.label}
        </button>
        
        {/* Dropdown menu without image */}
        {isHovered && category.subItems && (
          <div 
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0 pt-1 z-50"
            onMouseEnter={() => setHoveredCategory(category.label)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden" style={{ minWidth: "250px" }}>
              <div className="py-2">
                {category.subItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCategoryClick(item.slug)}
                    className="w-full text-left px-4 py-2 hover:bg-orange-50 text-sm text-gray-700 hover:text-[#7b3306] cursor-pointer transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <style jsx>{`
        @media (max-width: 1024px) {
          body,
          html {
            overflow-x: hidden;
            position: relative;
          }
        }

        /* Custom scrollbar for sidebar */
        .sidebar-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f9fafb;
        }

        .sidebar-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb;
        }

        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 2px;
        }

        /* Responsive padding classes */
        .px-responsive {
          padding-left: clamp(1rem, 5vw, 12rem);
          padding-right: clamp(1rem, 5vw, 12rem);
        }

        /* Navbar transition */
        .navbar-transition {
          transition: all 0.3s ease-in-out;
        }
      `}</style>

      {/* Main Navbar - Logo on LEFT side with scroll effect */}
      <nav className={`fixed top-0 left-0 right-0 z-50 navbar-transition ${
        isScrolled 
          ? "bg-white shadow-lg py-1" 
          : "bg-white shadow-sm py-2"
      }`}>
        <div className="flex items-center justify-between px-4 lg:px-8 xl:px-16 2xl:px-24">
          {/* Logo - Left side */}
          <div
            className="flex items-center cursor-pointer shrink-0 navbar-transition"
            onClick={() => navigate("/")}
          >
            <img
              src={kabralogo}
              loading="lazy"
              alt="Kabra Logo"
              className={`object-contain navbar-transition ${
                isScrolled 
                  ? "w-12 h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-15" 
                  : "w-12 h-12 sm:w-14 sm:h-14 lg:w-20 lg:h-20"
              }`}
            />
          </div>

          {/* All categories centered - Desktop only */}
          <div className="hidden lg:flex items-center justify-center space-x-2 xl:space-x-4 2xl:space-x-6 flex-1 mx-8">
            {megaMenuCategories.map((category, index) => (
              <MegaMenuItem key={index} category={category} />
            ))}
          </div>

          {/* Right side - empty spacer for balance */}
          <div className="hidden lg:block w-28"></div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-orange-50 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} className="text-[#7b3306]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer div to prevent content from hiding under fixed navbar */}
      <div className={`${isScrolled ? "h-16 sm:h-20 lg:h-24" : "h-16 sm:h-24 lg:h-24"}`}></div>

      {/* Mobile Search Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ${
          isSearchOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ overflowY: "auto" }}
      >
        <div className="p-4 pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Search className="text-[#eb8749]" size={24} />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Search</h2>
                <p className="text-sm text-gray-500">Find sarees & more</p>
              </div>
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close search"
            >
              <X size={24} className="text-gray-700" />
            </button>
          </div>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search sarees, fabrics, designers..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:border-[#eb8749] focus:ring-1 focus:ring-[#eb8749] bg-white"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
                  setIsSearchOpen(false);
                }
              }}
            />
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Banarasi", slug: "sarees" },
                { name: "Kanjeevaram", slug: "sarees" },
                { name: "Designer", slug: "sarees" },
                { name: "Lehengas", slug: "lehengas" },
                { name: "Party Wear", slug: "lehengas" },
                { name: "Bridal", slug: "sarees" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(`/product/${item.slug}`);
                    setIsSearchOpen(false);
                  }}
                  className="px-3 py-1.5 bg-[#eb8749]/10 text-[#7b3306] rounded-full text-sm hover:bg-[#eb8749]/20 transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 w-screen overflow-hidden safe-bottom">
        <div className="flex justify-around items-center w-full px-2 py-1">
          {mobileNavItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="flex flex-col items-center justify-center active:opacity-70 transition-opacity flex-1 min-w-0 px-1 py-1"
            >
              <div
                className={`p-1.5 rounded-full ${
                  item.label === "Search" ? "text-[#eb8749]" : "text-gray-600"
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[10px] font-medium text-gray-700 truncate w-full text-center">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar with same structure as desktop (Mobile Only) */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isSidebarOpen
            ? "bg-black/30 backdrop-blur-sm"
            : "bg-transparent pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-xl transform transition-transform duration-300 overflow-hidden ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: "100vw" }}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div>
                <div className="font-bold text-gray-800 text-lg">
                  Navigation
                </div>
                <p className="text-xs text-gray-500">Browse all categories</p>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X size={22} className="text-gray-700" />
            </button>
          </div>

          {/* Sidebar Content - Same navigation as desktop */}
          <div className="sidebar-scrollbar overflow-y-auto h-[calc(100%-60px)] pb-20">
            <div className="p-1">
              {/* Navigation Items - Same structure as desktop mega menu */}
              <div className="space-y-0">
                {/* Home Link */}
                <button
                  onClick={() => {
                    navigate("/");
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-orange-50 rounded-lg transition-colors text-left border-b border-gray-100 cursor-pointer"
                >
                  <div className="text-gray-600"><Home size={18} /></div>
                  <span className="font-medium text-gray-800 text-sm">Home</span>
                </button>

                {/* About Us Link */}
                <button
                  onClick={() => {
                    navigate("/about");
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-orange-50 rounded-lg transition-colors text-left border-b border-gray-100 cursor-pointer"
                >
                  <div className="text-gray-600"><Info size={18} /></div>
                  <span className="font-medium text-gray-800 text-sm">About Us</span>
                </button>

                {/* Categories Dropdown */}
                <DropdownItem item={navItems.find(item => item.label === "Categories")} />

                {/* Branch Contacts */}
                <div className="mt-4">
                  <div className="px-3 py-2 bg-gray-50">
                    <h4 className="text-sm font-semibold text-gray-700">Our Branches</h4>
                  </div>
                  <button
                    onClick={() => {
                      navigate("/contact/main-branch");
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-orange-50 transition-colors text-left border-b border-gray-100 cursor-pointer"
                  >
                    <div className="text-gray-600"><ContactIcon size={18} /></div>
                    <span className="font-medium text-gray-800 text-sm">Main Branch</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/contact/wholesale-branch");
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-orange-50 transition-colors text-left border-b border-gray-100 cursor-pointer"
                  >
                    <div className="text-gray-600"><ContactIcon size={18} /></div>
                    <span className="font-medium text-gray-800 text-sm">Wholesale Branch</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/contact/nashik-road");
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-orange-50 transition-colors text-left border-b border-gray-100 cursor-pointer"
                  >
                    <div className="text-gray-600"><ContactIcon size={18} /></div>
                    <span className="font-medium text-gray-800 text-sm">Nashik Road Branch</span>
                  </button>
                </div>
              </div>

              {/* Quick Access */}
              <div className="mt-6 p-4 bg-linear-to-r from-[#eb8749]/5 to-[#7b3306]/5 rounded-lg border border-orange-100 mx-3">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                  Special Collections
                </h4>
                <div className="space-y-2">
                  {[
                    { name: "Festive Collection", slug: "sarees" },
                    { name: "Wedding Season", slug: "lehengas" },
                  ].map((collection, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handleCategoryClicks(collection.slug);
                        setIsSidebarOpen(false);
                      }}
                      className="w-full text-left block py-2 px-3 text-[#7b3306] hover:text-[#eb8749] hover:bg-white rounded transition-colors cursor-pointer text-sm"
                    >
                      {collection.name}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  window.open(
                    `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
                      contactInfo.whatsappMessage,
                    )}`,
                    "_blank",
                  );
                  setIsSidebarOpen(false);
                }}
                className="mx-auto w-fit text-center block mt-5 py-2 px-6 bg-[#7b3306] text-white rounded text-sm cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;