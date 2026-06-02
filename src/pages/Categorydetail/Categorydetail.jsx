import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import axiosInstance from "../../service/api";

// ProductModal Component
const ProductModal = ({ product, onClose, onEnquiry }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [productDetails, setProductDetails] = useState(product);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        
        // First, check if the product already has all_images from the category response
        if (product.all_images && product.all_images.length > 0) {
          console.log('Using images from category response:', product.all_images);
          setImages(product.all_images);
          setProductDetails(product);
          setLoading(false);
          return;
        }
        
        // If not, fetch from the product detail endpoint
        const productId = product.id || product.slug;
        const response = await axiosInstance.get(`/v1/product/${productId}`);
        
        if (response.data.success) {
          const productData = response.data.data;
          setProductDetails(productData);
          
          // Process images from the response
          let processedImages = [];
          
          // Check for all_images first (from updated backend)
          if (productData.all_images && productData.all_images.length > 0) {
            processedImages = productData.all_images;
          }
          // Check for additional_images
          else if (productData.additional_images && productData.additional_images.length > 0) {
            processedImages = productData.additional_images;
          }
          // Fallback to primary image only
          else if (productData.primary_image) {
            processedImages = [{
              url: productData.primary_image,
              is_primary: true
            }];
          }
          
          setImages(processedImages);
          console.log('Processed images from API:', processedImages);
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        
        // Fallback to images from the passed product
        let fallbackImages = [];
        
        if (product.all_images && product.all_images.length > 0) {
          fallbackImages = product.all_images;
        } else if (product.additional_images && product.additional_images.length > 0) {
          fallbackImages = product.additional_images;
        } else if (product.primary_image) {
          fallbackImages = [{
            url: product.primary_image,
            is_primary: true
          }];
        }
        
        setImages(fallbackImages);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-center mt-4">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-lg max-w-2xl w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{productDetails.name || product.name}</h2>
            <button onClick={onClose} className="text-2xl hover:text-amber-600">&times;</button>
          </div>
          <p className="text-gray-500 text-center py-8">No images available for this product</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold line-clamp-1">{productDetails.name || product.name}</h2>
          <button 
            onClick={onClose} 
            className="text-2xl hover:text-amber-600 transition-colors"
          >
            &times;
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
            {/* Image Gallery Section */}
            <div>
              {/* Main Image Display */}
              <div className="relative h-[600px] bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={images[currentImageIndex]?.url || images[currentImageIndex]}
                  alt={productDetails.name || product.name}
                  className="w-full h-full object-contain"
                />
                
                {images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage} 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full hover:bg-black/70 transition-colors flex items-center justify-center"
                    >
                      ←
                    </button>
                    <button 
                      onClick={nextImage} 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full hover:bg-black/70 transition-colors flex items-center justify-center"
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

              {/* Scrollable Thumbnails */}
              {images.length > 1 && (
                <div className="relative">
                  <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                       style={{ 
                         WebkitOverflowScrolling: 'touch',
                         scrollbarWidth: 'thin',
                         maxWidth: '100%'
                       }}>
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index 
                            ? 'border-amber-600 scale-105' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image.url || image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  
                  {/* Scroll indicator for more images */}
                  {images.length > 4 && (
                    <>
                      <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-white to-transparent pointer-events-none flex items-center justify-end pr-2">
                        <span className="text-gray-400 text-sm animate-pulse">→</span>
                      </div>
                      <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-white to-transparent pointer-events-none flex items-center justify-start pl-2">
                        <span className="text-gray-400 text-sm animate-pulse">←</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

          
        </div>
      </div>
    </div>
  );
};

export default function Categorydetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const whatsappNumber = "919890533709";

  // Fetch category data from API
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        // First, get all categories to find the one matching the slug
        const response = await axiosInstance.get('/v1/categories');
        
        if (response.data.success) {
          // Find the category that matches the slug
          const category = response.data.data.find(cat => cat.slug === slug);
          
          if (category) {
            setCategoryData(category);
            
            // Set default selections
            if (category.sub_categories && category.sub_categories.length > 0) {
              const firstSubCat = category.sub_categories[0];
              setSelectedCategory(firstSubCat);
              
              if (firstSubCat.child_categories && firstSubCat.child_categories.length > 0) {
                // Fetch the child category details to get products
                fetchChildCategoryDetails(firstSubCat.child_categories[0].slug);
              }
            }
          } else {
            setError('Category not found');
          }
        } else {
          setError('Failed to load categories');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Error loading category data');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [slug]);

  // Fetch child category details with products
  const fetchChildCategoryDetails = async (childSlug) => {
    try {
      const response = await axiosInstance.get(`/v1/category/${childSlug}`);
      if (response.data.success) {
        setSelectedSub(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching child category:', err);
    }
  };

  // Handle category change
  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    if (category.child_categories && category.child_categories.length > 0) {
      await fetchChildCategoryDetails(category.child_categories[0].slug);
    } else {
      setSelectedSub(null);
    }
  };

  // Handle sub-category change
  const handleSubCategoryChange = async (subCategory) => {
    await fetchChildCategoryDetails(subCategory.slug);
  };

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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading category...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Category not found'}
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
      <div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <button
              onClick={() => navigate("/")}
              className="hover:text-amber-600 transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-gray-900 font-medium">{categoryData.title}</span>
          </nav>

          {/* Title */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {categoryData.title}
            </h1>
            {categoryData.description && (
              <p className="text-gray-600 mt-2">{categoryData.description}</p>
            )}
            <div className="w-24 h-1 bg-amber-500 mt-2"></div>
          </div>
        </div>  
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Navigation */}
        {categoryData.sub_categories && categoryData.sub_categories.length > 0 && (
          <div className="mb-6">
            <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:gap-2 sm:overflow-visible">
              {categoryData.sub_categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat)}
                  className={`
                    shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all
                    whitespace-nowrap mr-3 sm:mr-0
                    ${
                      selectedCategory?.id === cat.id
                        ? "bg-amber-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }
                  `}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sub-category Navigation */}
        {selectedCategory && selectedCategory.child_categories && selectedCategory.child_categories.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Select from {selectedCategory.name}
            </h3>
            <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:gap-3 sm:overflow-visible">
              {selectedCategory.child_categories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleSubCategoryChange(sub)}
                  className={`
                    shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all
                    whitespace-nowrap mr-3 sm:mr-0
                    ${
                      selectedSub?.slug === sub.slug
                        ? "bg-amber-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }
                  `}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        {selectedSub && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedSub.name}
              </h2>
              {/* {selectedSub.description && (
                <p className="text-gray-600 mt-2">{selectedSub.description}</p>
              )} */}
            </div>

            {selectedSub.products && selectedSub.products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {selectedSub.products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => openProductModal(product)}
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className="relative h-65 md:h-95 overflow-hidden">
                      {product.primary_image ? (
                        <img
                          src={product.primary_image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                      
                     
                      
                    
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
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow">
                <p className="text-gray-500 text-lg">
                  Products coming soon for this category
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!selectedSub && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Select a category to view products
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