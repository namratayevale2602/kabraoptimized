import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../service/api';

// Product Modal Component
const ProductModal = ({ product, onClose, onEnquiry }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Process images from the product data
    if (product.all_images && product.all_images.length > 0) {
      // Extract just the URLs from the all_images array
      setImages(product.all_images.map(img => img.url));
    } else if (product.additional_images && product.additional_images.length > 0) {
      setImages(product.additional_images.map(img => img.url));
    } else if (product.primary_image) {
      setImages([product.primary_image]);
    }
  }, [product]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!images.length) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold line-clamp-1">{product.name}</h2>
          <button
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Main Image */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={images[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-[550px] lg:h-[600px] object-contain"
            />
            
            {images.length > 1 && (
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
            
            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
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
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Enquiry Button */}
          <div className="mt-6">
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
      </div>
    </div>
  );
};

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const whatsappNumber = "919890533709";

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/v1/category/${slug}`);
        
        if (response.data?.success) {
          setCategoryData(response.data.data);
          setError(null);
        } else {
          setError('Category not found');
        }
      } catch (err) {
        console.error('Error fetching category:', err);
        setError(err.response?.data?.message || 'Error loading category data');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategoryData();
    }
  }, [slug]);

  const handleWhatsAppEnquiry = (productName) => {
    const message = `Hello, I am interested in ${productName}. Please share more details.`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
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

  if (error || !categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Category not found'}
          </h2>
          <Link to="/" className="text-amber-600 hover:text-amber-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div>
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4 flex-wrap">
            <Link to="/" className="hover:text-amber-600 transition-colors">
              Home
            </Link>
            
            {categoryData.category_path?.main && (
              <>
                <span>/</span>
                <Link 
                  to={`/category/${categoryData.category_path.main.slug}`}
                  className="hover:text-amber-600 transition-colors"
                >
                  {categoryData.category_path.main.name}
                </Link>
              </>
            )}
            
            {categoryData.category_path?.sub && (
              <>
                <span>/</span>
                <span className="text-gray-500">
                  {categoryData.category_path.sub.name}
                </span>
              </>
            )}
            
            <span>/</span>
            <span className="text-gray-900 font-medium">{categoryData.name}</span>
          </div>
          
          {/* Title */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {categoryData.name}
            </h1>
            {/* {categoryData.description && categoryData.description !== 'sadasd' && (
              <p className="text-gray-600 mt-2">{categoryData.description}</p>
            )} */}
            
           
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        {categoryData.products && categoryData.products.length > 0 ? (
          <>
           
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
              {categoryData.products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => openProductModal(product)}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="relative h-65 md:h-95 overflow-hidden bg-gray-100">
                    <img
                      src={product.primary_image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300"
                      
                    />
                    
                  
                  </div>
                  
                  <div className="p-3">
                   
                    
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
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <p className="text-gray-500 text-lg">
              No products available in this category
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
};

export default ProductDetailsPage;