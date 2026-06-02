import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import {
  IoLocationOutline,
  IoCallOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  // Three locations data
  const locations = [
    {
      name: "Main Branch",
      address: "Padma-vishwa Centre, Old Pandit Colony, Sharanpur Road, Opp. Rajiv Gandhi Bhavan, Nashik, Maharashtra 422002",
      phone: ["+91 98905 33709"],
      email: "connect@kabraemporium.com",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.1607545696947!2d73.77421427495118!3d20.001766722258893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeba0cbc986b9%3A0x459f1d5f566872ed!2sKabra%20Emporium%20%7C%20Best%20Sarees%20%7C%20Designer%20Sarees%20%7C%20Nashik!5e0!3m2!1sen!2sin!4v1770092560073!5m2!1sen!2sin",
    },
    {
      name: "Nashik Road Branch",
      address: "Datta Mandir Rd, DattaMandir, Deolali Gaon, Nashik, Maharashtra 422101",
      phone: ["+91 98905 33709"],
      email: "connect@kabraemporium.com",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.274266929898!2d73.8346716!3d19.9549648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd9553950e7d97%3A0x3114ac0facd97793!2sKabra%20Emporium%20Nashik%20Road!5e0!3m2!1sen!2sin!4v1772083396404!5m2!1sen!2sin",
    },
    {
      name: "Wholesale Branch",
      address: "Padma-vishwa Centre, Old Pandit Colony, Sharanpur Road, Opp. Rajiv Gandhi Bhavan, Nashik, Maharashtra 422002",
      phone: ["+91 98905 33709"],
      email: "connect@kabraemporium.com",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.1607545696947!2d73.77421427495118!3d20.001766722258893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeba0cbc986b9%3A0x459f1d5f566872ed!2sKabra%20Emporium%20%7C%20Best%20Sarees%20%7C%20Designer%20Sarees%20%7C%20Nashik!5e0!3m2!1sen!2sin!4v1770092560073!5m2!1sen!2sin",
    },
  ];

  // Updated categories based on Navbar structure
  const categories = [
    { label: "Kanjeevaram Sarees", slug: "sarees" },
    { label: "Banarasi Sarees", slug: "sarees" },
    { label: "Designer Sarees", slug: "sarees" },
    { label: "Paithani Sarees", slug: "sarees" },
    { label: "Lehengas", slug: "lehengas" },
    { label: "Salwar Suits", slug: "salwarsuite" },
    { label: "Party Wear", slug: "lehengas" },
    { label: "Bridal Collection", slug: "sarees" },
  ];

  const quickLinks = [
    { label: "Home", action: () => navigate("/") },
    { label: "Collections", action: () => navigate("/Categorydetail/sarees") },
    { label: "About Us", action: () => navigate("/about") },
    { label: "Contact Pandit Colony", action: () => navigate("/contact/wholesale-branch") },
    { label: "Contact Nashik Road", action: () => navigate("/contact/nashik-road") },
    { label: "Contact Main Branch", action: () => navigate("/contact/main-branch") },
  ];

  const socialIcons = [
    {
      icon: FaFacebookF,
      label: "Facebook",
      url: "https://www.facebook.com/kabrasarees",
      color: "hover:text-blue-600",
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      url: "https://www.instagram.com/kabra.emporium?igsh=MW41dDByaGV3dWNjcg%3D%3D&utm_source=qr",
      color: "hover:text-pink-600",
    },
    {
      icon: FaWhatsapp,
      label: "Whatsapp",
      url: "https://wa.me/919890533709?text=Hello Kabra Emporium, I would like to know more about your collections.",
      color: "hover:text-green-500",
    },
  ];

  // Function to handle category navigation
  const handleCategoryClick = (slug) => {
    navigate(`/Categorydetail/${slug}`);
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-linear-to-b from-gray-900 to-gray-950 text-white pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-6 sm:pb-8 px-4 sm:px-6 md:px-8 lg:px-16 rounded-t-2xl sm:rounded-t-3xl shadow-inner"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12">
        {/* About Section - Column 1 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-4">
            Kabra Emporium
          </h3>
          <p className="text-gray-300 mb-6 text-sm leading-relaxed">
            Nashik's premier destination for exquisite sarees and traditional
            wear since 1984. Experience the finest collection of handcrafted
            textiles and traditional Indian attire.
          </p>

          <div className="flex space-x-4">
            {socialIcons.map(({ icon: Icon, label, url, color }, index) => (
              <motion.a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                title={label}
                className="bg-white/10 backdrop-blur-sm p-2.5 sm:p-3 rounded-full shadow-sm hover:bg-white/20 text-white transition-all duration-300 group relative"
              >
                <Icon size={18} className={`sm:w-5 sm:h-5 ${color}`} />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                  {label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links - Column 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-amber-400">
            Quick Links
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            {quickLinks.map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button
                  onClick={link.action}
                  className="text-gray-300 hover:text-amber-300 transition-colors duration-300 flex items-center gap-2 group w-full text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {link.label}
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>

          {/* Store Timings */}
          <div className="mt-8 pt-4 border-t border-white/20">
            <h4 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
              <IoTimeOutline size={16} />
              STORE TIMINGS
            </h4>
            <p className="text-sm text-gray-300">
              Monday to Sunday: 10:00 AM - 8:00 PM
            </p>
            <p className="text-sm text-gray-300">
              Open all days including holidays
            </p>
          </div>
        </motion.div>

        {/* Collections - Column 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-amber-400">
            Collections
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            {categories.map((category, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button
                  onClick={() => handleCategoryClick(category.slug)}
                  className="text-gray-300 hover:text-amber-300 transition-colors duration-300 flex items-center gap-2 group w-full text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {category.label}
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info - Column 4 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-1"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-amber-400">
            Contact Info
          </h3>

          <div className="space-y-4">
            {/* Main Branch Contact */}
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <h4 className="text-sm font-medium text-amber-300 mb-2">Main Branch</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <IoLocationOutline className="text-amber-400 mt-1 shrink-0" size={14} />
                  <span className="text-xs">Padma-vishwa Centre, Old Pandit Colony</span>
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineEmail className="text-amber-400 shrink-0" size={14} />
                  <a href="mailto:connect@kabraemporium.com" className="text-xs hover:text-amber-300">connect@kabraemporium.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <IoCallOutline className="text-amber-400 shrink-0" size={14} />
                  <a href="tel:+919890533709" className="text-xs hover:text-amber-300">+91 98905 33709</a>
                </li>
              </ul>
                <button
                onClick={() => navigate("/contact/main-branch")}
                className="w-full bg-amber-600 text-white px-2 py-0.5 rounded-lg hover:bg-amber-700 transition-all duration-300 border border-amber-500 text-sm shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-2"
              >
                <MdOutlineEmail size={16} />
                Quick Inquiry
              </button>
            </div>
            

            {/* Nashik Road Contact */}
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <h4 className="text-sm font-medium text-amber-300 mb-2">Nashik Road Branch</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <IoLocationOutline className="text-amber-400 mt-1 shrink-0" size={14} />
                  <span className="text-xs">DattaMandir, Deolali Gaon</span>
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineEmail className="text-amber-400 shrink-0" size={14} />
                  <a href="mailto:connect@kabraemporium.com" className="text-xs hover:text-amber-300">connect@kabraemporium.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <IoCallOutline className="text-amber-400 shrink-0" size={14} />
                  <a href="tel:+919890533709" className="text-xs hover:text-amber-300">+91 98905 33709</a>
                </li>
              </ul>
              <button
              onClick={() => navigate("contact/nashik-road")}
              className="w-full bg-amber-600 text-white px-2 py-0.5 rounded-lg hover:bg-amber-700 transition-all duration-300 border border-amber-500 text-sm font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-2"
            >
              <MdOutlineEmail size={16} />
              Quick Inquiry
            </button>
            </div>

            {/* Pandit Colony Contact */}
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
              <h4 className="text-sm font-medium text-amber-300 mb-2">Wholesale Branch</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <IoLocationOutline className="text-amber-400 mt-1 shrink-0" size={14} />
                  <span className="text-xs">Padma-vishwa Centre, Old Pandit Colony</span>
                </li>
                <li className="flex items-center gap-2">
                  <MdOutlineEmail className="text-amber-400 shrink-0" size={14} />
                  <a href="mailto:connect@kabraemporium.com" className="text-xs hover:text-amber-300">connect@kabraemporium.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <IoCallOutline className="text-amber-400 shrink-0" size={14} />
                  <a href="tel:+919890533709" className="text-xs hover:text-amber-300">+91 98905 33709</a>
                </li>
                
              </ul>
              <button
              onClick={() => navigate("/contact/wholesale-branch")}
              className="w-full bg-amber-600 text-white px-2 py-0.5 rounded-lg hover:bg-amber-700 transition-all duration-300 border border-amber-500 text-sm font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-2"
            >
              <MdOutlineEmail size={16} />
              Quick Inquiry
            </button>
            </div>

           
            
          </div>
        </motion.div>

        {/* Location Maps - Column 5 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-1"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-amber-400">
            Our Locations
          </h3>

          <div className="space-y-4">
            {locations.map((location, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden shadow-lg group">
                {/* Location Label */}
                <div className={`absolute top-2 left-2 z-10 bg-linear-to-r from-amber-600 to-orange-600 text-white text-xs font-medium px-2 py-1 rounded-md`}>
                  {location.name}
                </div>
                
                {/* Map */}
                <iframe
                  title={location.name}
                  src={location.mapEmbed}
                  className="w-full h-24 sm:h-28 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  style={{ border: 0 }}
                  allowFullScreen
                />
                
                
              </div>
            ))}
          </div>

          
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center text-sm text-gray-400 border-t border-white/20 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-amber-300">Kabra Emporium</span>
            . All Rights Reserved.
          </p>
          <span className="hidden sm:inline text-gray-600">|</span>
          <button
            onClick={() => navigate("/terms-and-conditions")}
            className="hover:text-amber-300 transition-colors duration-300"
          >
            Terms & Condition
          </button>
          <button
            onClick={() => navigate("/privacy-policy")}
            className="hover:text-amber-300 transition-colors duration-300"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;