import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  XCircle,
  Building,
  Map,
  ChevronDown
} from "lucide-react";
import axiosInstance from "../../service/api";
import { useSEO } from "../../hooks/useSEO";
import LocalBusinessSchema from "../../components/seo/LocalBusinessSchema";

const ContactNashikRoad = () => {

   useSEO("contactPanditColony");

   // Add LocalBusiness schema data
  const localBusinessSchema = {
    "name": "Kabra Emporium - Nashik Road",
    "description": "Premium saree showroom on Nashik Road. Part of the 3‑generation Kabra Emporium heritage, offering authentic Indian weaves.",
    "image": "https://kabraemporium.com/assets/location/nashikroad.webp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Datta Mandir Rd, DattaMandir, Deolali Gaon",
      "addressLocality": "Nashik",
      "addressRegion": "Maharashtra",
      "postalCode": "422101",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.9549648",
      "longitude": "73.8346716"
    },
    "url": "https://kabraemporium.com/contact/nashik-road",
    "telephone": "+919890533709",
    "email": "connect@kabraemporium.com",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "19:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/kabrasarees",
      "https://www.instagram.com/kabra.emporium"
    ],
    "priceRange": "₹₹",
    "areaServed": "Nashik",
    "hasMap": "https://maps.google.com/?q=Kabra+Emporium+Nashik+Road"
  };

  const { branchKey = "nashik-road" } = useParams();
  const navigate = useNavigate();
  
  const [branchData, setBranchData] = useState(null);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: branchKey,
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  const [activeMap, setActiveMap] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreement, setAgreement] = useState(true);

 

  // Fetch branch details
  useEffect(() => {
    const fetchBranchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/contact-details/nashik-road`);
        if (response.data.success) {
          setBranchData(response.data.data);
          // Update form location when branch changes
          setFormData(prev => ({ ...prev, location: branchKey }));
         
        }
      } catch (error) {
        console.error("Error fetching branch data:", error);
        setError("Failed to load contact information");
      } finally {
        setLoading(false);
      }
    };

    fetchBranchData();
  }, [branchKey]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/contact", {
        ...formData,
        agreement: agreement,
      });

      if (response.data.success) {
        setFormStatus({
          submitted: true,
          success: true,
          message:
            response.data.message ||
            "Your message has been sent successfully! We'll get back to you soon.",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          location: branchKey,
          subject : "",
          message: "",
        });
        setAgreement(true);
      } else {
        throw new Error(response.data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        const firstError = Object.values(validationErrors)[0][0];
        setFormStatus({
          submitted: true,
          success: false,
          message: firstError || "Please check your form inputs and try again.",
        });
      } else {
        setFormStatus({
          submitted: true,
          success: false,
          message:
            error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);

      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: "",
        });
      }, 5000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !branchData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error || "Branch not found"}</p>
          <button
            onClick={() => navigate('/contact/nashik-road')}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Go to Main Branch
          </button>
        </div>
      </div>
    );
  }

  const currentAddress = branchData.addresses[activeMap] || branchData.addresses[0];

  return (
    <>
    <LocalBusinessSchema businessData={localBusinessSchema} />
    <div className="min-h-screen py-4 px-2 sm:px-4 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header with Branch Selector */}
        <div className="text-center mb-6 sm:mb-10 relative px-2">
          <div className="absolute inset-0 bg-linear-to-r from-orange-500/10 to-amber-500/10 rounded-3xl blur-3xl -z-10" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 bg-clip-text bg-linear-to-r from-orange-600 to-amber-600 px-2">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Visit us at {branchData.branch_name} or reach out through any of the
            following channels.
          </p>

         
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-2">
          {/* Left Column - Contact Info */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 flex items-center">
                <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-linear-to-b from-orange-500 to-amber-500 rounded-full mr-2 sm:mr-3"></div>
                Our Location
              </h2>

              {/* Address Details */}
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <div className="flex items-start mb-3 sm:mb-4">
                  <div className="p-1.5 sm:p-2 rounded-xl bg-linear-to-br from-orange-500 to-amber-500 text-white mr-3">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {currentAddress.title}
                    </h3>
                    <div className="space-y-0.5">
                      <p className="text-gray-700 text-sm sm:text-base">
                        {currentAddress.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3">
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-500 mb-0.5">
                      Phone
                    </p>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      {currentAddress.phone}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-500 mb-0.5">
                      Email
                    </p>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      {currentAddress.email}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-2 sm:p-3 rounded-lg col-span-2">
                    <p className="text-xs sm:text-sm text-gray-500 mb-0.5">
                      Timings
                    </p>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      {currentAddress.timings}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              {currentAddress.map_url && (
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg flex items-center mb-1 sm:mb-0">
                      <Map className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-600" />
                      Location on Map
                    </h3>
                    {currentAddress.coordinates && (
                      <div className="text-xs sm:text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {currentAddress.coordinates}
                      </div>
                    )}
                  </div>
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg h-48 sm:h-56 lg:h-64">
                    <iframe
                      src={currentAddress.map_url}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map for ${currentAddress.title}`}
                      className="rounded-xl sm:rounded-2xl"
                    />
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 sm:px-3 sm:py-1 shadow-md">
                      <span className="text-gray-900 text-xs sm:text-sm font-medium">
                        {currentAddress.title.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100 lg:sticky lg:top-8">
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 flex items-center">
                  <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-linear-to-b from-orange-500 to-amber-500 rounded-full mr-2 sm:mr-3"></div>
                  Send us a Message
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              {/* Form Status Message */}
              {formStatus.submitted && (
                <div
                  className={`mb-4 sm:mb-6 lg:mb-8 p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl border ${
                    formStatus.success
                      ? "bg-linear-to-r from-green-50 to-emerald-50 border-green-200 text-green-800"
                      : "bg-linear-to-r from-red-50 to-rose-50 border-red-200 text-red-800"
                  } animate-in slide-in-from-top`}
                >
                  <div className="flex items-start">
                    {formStatus.success ? (
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 shrink-0 mt-0.5" />
                    )}
                    <p className="font-medium text-sm sm:text-base">
                      {formStatus.message}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-1 sm:space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400 transition-all duration-200 placeholder-gray-400 text-sm sm:text-base"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message *
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400 transition-all duration-200 placeholder-gray-400 resize-none text-sm sm:text-base"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={agreement}
                    onChange={(e) => setAgreement(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded"
                  />
                  <label htmlFor="agreement" className="text-sm text-gray-600">
                    By clicking this, you agree to disclose your personal
                    information to Kabra Emporium for contacting you via SMS,
                    Email, RCS Messages, Calls, and WhatsApp.
                  </label>
                </div>

                <div className="pt-2 sm:pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || !agreement}
                    className={`w-full inline-flex items-center justify-center px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 text-base sm:text-lg font-semibold rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 ${
                      isSubmitting || !agreement
                        ? "bg-linear-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                        : "bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 hover:shadow-xl"
                    } text-white focus:outline-none focus:ring-3 focus:ring-orange-500/30`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Information Blocks */}
        {branchData.contact_info && branchData.contact_info.length > 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 mt-5 lg:p-8 border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 flex items-center">
              <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-linear-to-b from-orange-500 to-amber-500 rounded-full mr-2 sm:mr-3"></div>
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {branchData.contact_info.map((item, index) => (
                <div
                  key={index}
                  className="bg-orange-50 rounded-xl sm:rounded-2xl p-2 sm:p-3 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4 lg:space-x-5">
                    <div
                      className="p-1 sm:p-1.5 rounded-xl sm:rounded-2xl text-white bg-linear-to-br from-orange-500 to-amber-500 shadow-md"
                    >
                      {item.type === 'phone' && <Phone className="w-5 h-5" />}
                      {item.type === 'email' && <Mail className="w-5 h-5" />}
                      {item.type === 'hours' && <Clock className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">
                        {item.title}
                      </h2>
                      {item.details.map((detail, idx) => (
                        <p
                          key={idx}
                          className="text-gray-700 text-sm sm:text-base mb-0.5 sm:mb-1 last:mb-0 wrap-break-word"
                        >
                          {detail.value}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ContactNashikRoad;