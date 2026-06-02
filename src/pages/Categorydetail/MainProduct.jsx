import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../service/api";
import ImageSlider from "./ImageSlider";

const ProductModal = ({ product, onClose, onEnquiry }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="relative h-full bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images[currentImageIndex]?.url || product.images[currentImageIndex]}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-[500px] lg:h-[550px] object-contain"
                />
                
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/75 transition"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/75 transition"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        currentImageIndex === index
                          ? 'border-amber-600'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image.url || image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {product.description && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            {product.specifications && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-gray-500 capitalize">{key}:</span>
                      <span className="ml-2 text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={() => {
                  onEnquiry(product.name);
                  onClose();
                }}
                className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors text-lg font-medium"
              >
                Enquiry Now
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function MainProduct() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainCategories, setMainCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const whatsappNumber = "919890533709";

  useEffect(() => {
    fetchChildCategory();
    fetchMainCategories();
  }, [slug]);

  const fetchChildCategory = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/v1/category/${slug}`);
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load category data");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMainCategories = async () => {
    try {
      const response = await axiosInstance.get('/v1/categories');
      if (response.data.success) {
        setMainCategories(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching main categories:", err);
    }
  };

  const handleWhatsAppEnquiry = (productName) => {
    const message = `Hello, I am interested in ${productName}. Please share more details.`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  const openProductModal = (product) => {
    const images = product.all_images || 
      (product.additional_images ? 
        (Array.isArray(product.additional_images) ? 
          product.additional_images.map(img => img.url || img) : 
          [product.additional_images]) : 
        [product.primary_image]);
    
    setSelectedProduct({
      ...product,
      images: images
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || "Product category not found"}
          </h2>
          <button
            onClick={() => navigate("/")}
            className="text-amber-600 hover:text-amber-800"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <button
              onClick={() => navigate("/")}
              className="hover:text-amber-600 transition-colors"
            >
              Home
            </button>
            <span>/</span>
            {data.category_path?.main && (
              <>
                <button
                  onClick={() => navigate(`/category/${data.category_path.main.slug}`)}
                  className="hover:text-amber-600 transition-colors"
                >
                  {data.category_path.main.name}
                </button>
                <span>/</span>
              </>
            )}
            {data.category_path?.sub && (
              <>
                <span className="text-gray-500">{data.category_path.sub.name}</span>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900 font-medium">{data.name}</span>
          </nav>

          {/* Title */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {data.name}
            </h1>
            {data.description && (
              <p className="text-gray-600 mt-2 max-w-3xl">{data.description}</p>
            )}
            <div className="w-24 h-1 bg-amber-500 mt-4"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Categories Navigation */}
        {mainCategories.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Browse Categories
            </h3>
            <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:gap-2 sm:overflow-visible">
              {mainCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => navigate(`/category/${cat.slug}`)}
                  className={`
                    shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all
                    whitespace-nowrap mr-3 sm:mr-0
                    ${cat.slug === data.category_path?.main?.slug
                      ? "bg-amber-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }
                  `}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Occasion Tags */}
        {data.occasion_tags && Object.values(data.occasion_tags).some(v => v) && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {Object.entries(data.occasion_tags).map(([key, value]) => (
                value && (
                  <span
                    key={key}
                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm capitalize"
                  >
                    {key.replace('_', ' ')}
                  </span>
                )
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {data.products && data.products.length > 0 ? (
          <>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {data.products.length} products
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {data.products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => openProductModal(product)}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={product.primary_image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    {product.total_images > 1 && (
                      <span className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                        {product.total_images} photos
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    {product.product_code && (
                      <p className="text-xs text-gray-500 mb-2">
                        Code: {product.product_code}
                      </p>
                    )}
                    {product.formatted_price && (
                      <p className="text-amber-600 font-semibold mb-2">
                        {product.formatted_price}
                      </p>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppEnquiry(product.name);
                      }}
                      className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                    >
                      Enquiry Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <p className="text-gray-500 text-lg">
              Products coming soon for this category
            </p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showModal && selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={closeModal}
          onEnquiry={handleWhatsAppEnquiry}
        />
      )}
    </div>
  );
}