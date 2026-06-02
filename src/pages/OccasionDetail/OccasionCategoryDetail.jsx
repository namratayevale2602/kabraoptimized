import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../service/api";

// Product Modal Component (keep as is)
const ProductModal = ({ product, onClose, onEnquiry }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all images from product (primary + additional)
  const getAllImages = () => {
    const images = [];
    
    // Add primary image
    if (product.primary_image) {
      images.push({
        url: product.primary_image,
        is_primary: true
      });
    }
    
    // Add additional images
    if (product.additional_images && Array.isArray(product.additional_images)) {
      product.additional_images.forEach(img => {
        if (typeof img === 'string') {
          images.push({ url: img, is_primary: false });
        } else if (img.url) {
          images.push(img);
        }
      });
    }
    
    return images;
  };

  const allImages = getAllImages();

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  if (allImages.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Image Gallery */}
          {allImages.length > 0 && (
            <div className="mb-6">
              <div className="relative h-full bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={allImages[currentImageIndex]?.url}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-[500px] lg:h-[550px] object-contain"
                />
                
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-75 transition"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-75 transition"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {allImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {allImages.map((image, index) => (
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
                        src={image?.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-4">
            {product.product_code && (
              <p className="text-sm text-gray-500 mb-2">
                Product Code: {product.product_code}
              </p>
            )}
            
            {product.formatted_price && (
              <p className="text-2xl font-bold text-amber-600 mb-4">
                {product.formatted_price}
              </p>
            )}

            {product.description && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Specifications</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {typeof product.specifications === 'object' ? (
                    Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex py-1 border-b border-gray-200 last:border-0">
                        <span className="w-1/3 text-gray-600 capitalize">{key}:</span>
                        <span className="w-2/3 text-gray-900">{value}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">{product.specifications}</p>
                  )}
                </div>
              </div>
            )}

            {/* Category Path */}
            {product.category_path && (
              <div className="mb-4 text-sm text-gray-500">
                <span>Category: </span>
                {product.category_path.main && (
                  <>
                    <span>{product.category_path.main.name}</span>
                    <span className="mx-1">→</span>
                  </>
                )}
                {product.category_path.sub && (
                  <>
                    <span>{product.category_path.sub.name}</span>
                    <span className="mx-1">→</span>
                  </>
                )}
                {product.category_path.child && (
                  <span>{product.category_path.child.name}</span>
                )}
              </div>
            )}

            {/* Occasion Tags from child_categories */}
            {product.occasion_tags && Object.entries(product.occasion_tags).some(([key, value]) => value) && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Occasion Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(product.occasion_tags).map(([key, value]) => {
                    if (value) {
                      const tagNames = {
                        wedding: 'Wedding',
                        festival: 'Festival',
                        baby_shower: 'Baby Shower',
                        engagement: 'Engagement',
                        haldi: 'Haldi',
                        mehendi: 'Mehendi',
                        pooja: 'Pooja'
                      };
                      return (
                        <span key={key} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                          {tagNames[key] || key}
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}

            {/* Tags from child_categories */}
            {product.tags && product.tags.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Enquiry Button */}
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

export default function OccasionCategoryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [occasionData, setOccasionData] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedCategory, setSelectedCategory] = useState(null); // null by default = show all
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const whatsappNumber = "919890533709"; // replace with your WhatsApp number

  useEffect(() => {
    fetchProductsByOccasion();
  }, [slug]);

  const fetchProductsByOccasion = async () => {
    try {
      setLoading(true);
      
      // Fetch products by occasion from your backend
      const response = await axiosInstance.get(`/occasion/${slug}/products`);
      
      if (response.data && response.data.success) {
        const data = response.data.data;
        
        setOccasionData({
          title: data.occasion?.title || getOccasionTitle(slug),
          description: data.occasion?.description || `Explore our beautiful collection for ${getOccasionTitle(slug)}`,
          image: data.occasion?.image || null,
          slug: slug
        });
        
        setCategories(data.categories || []);
        setProducts(data.products || []);
        
        // Don't set selectedCategory - keep it null to show all products by default
        // setSelectedCategory(null); // This is already the default state
        
      } else {
        // If API fails, show empty state
        setOccasionData({
          title: getOccasionTitle(slug),
          description: `Explore our beautiful collection for ${getOccasionTitle(slug)}`,
          slug: slug
        });
        setProducts([]);
        setCategories([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
      // Set default data on error
      setOccasionData({
        title: getOccasionTitle(slug),
        description: `Explore our beautiful collection for ${getOccasionTitle(slug)}`,
        slug: slug
      });
    } finally {
      setLoading(false);
    }
  };

  const getOccasionTitle = (slug) => {
    const titles = {
      'wedding': 'Wedding Collection',
      'festival': 'Festival Collection',
      'baby-shower': 'Baby Shower Collection',
      'engagement': 'Engagement Collection',
      'haldi': 'Haldi Collection',
      'mehendi': 'Mehendi Collection',
      'pooja': 'Pooja & Rituals'
    };
    return titles[slug] || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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

  // Filter products by selected category (null = show all)
  const getFilteredProducts = () => {
    if (!selectedCategory) return products; // Show all products when no category selected
    
    if (selectedCategory.products) {
      return selectedCategory.products;
    }
    
    return products.filter(product => 
      product.category?.id === selectedCategory.id || 
      product.category?.slug === selectedCategory.slug
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-amber-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading occasion collection...</p>
        </div>
      </div>
    );
  }

  if (error && !occasionData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error}
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

  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen">
      {/* Header Section with Occasion Image */}
      <div 
        className="bg-cover bg-center bg-no-repeat relative"
        
      >
        <div className={`border-b border-gray-200`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm mb-4">
              <button
                onClick={() => navigate("/")}
                className={`text-gray-600 hover:text-amber-600 transition-colors`}
              >
                Home
              </button>
              <span className={'text-gray-400'}>/</span>
              <span className={'text-gray-900 font-medium'}>
                {occasionData?.title}
              </span>
            </nav>

            {/* Title */}
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold text-gray-900`}>
                {occasionData?.title}
              </h1>
              <div className="w-24 h-1 bg-amber-500 mt-2"></div>
              <p className={`mt-4 max-w-3xl text-lg text-gray-600`}>
                {occasionData?.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Shop by Category
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`
                  px-6 py-3 rounded-full font-medium text-sm transition-all
                  ${!selectedCategory 
                    ? 'bg-amber-600 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }
                `}
              >
                All Products ({products.length})
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-6 py-1 rounded-full font-medium text-sm transition-all flex items-center
                    ${selectedCategory?.id === category.id
                      ? 'bg-amber-600 text-white shadow-lg' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }
                  `}
                >
                  {category.name} ({category.product_count || 0})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory ? selectedCategory.name : 'All Products'} 
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredProducts.length} items)
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => openProductModal(product)}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-65 md:h-95 overflow-hidden">
                    {product.primary_image ? (
                      <img
                        src={product.primary_image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3">
                   
                    {product.formatted_price && (
                      <p className="text-amber-600 font-semibold text-sm mb-2">
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
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 rounded-xl">
            <p className="text-gray-500 text-lg mb-4">
              No products found for this occasion
            </p>
            <button
              onClick={() => navigate("/")}
              className="text-amber-600 hover:text-amber-800 font-medium"
            >
              Browse other collections
            </button>
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