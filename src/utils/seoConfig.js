// utils/seoConfig.js
export const seoConfig = {
  siteName: "Kabra Emporium",
  defaultTitle:
    "Kabra Emporium – A Legacy Woven in Love, Trust & Tradition | Heritage Saree Store",
  defaultDescription:
    "Kabra Emporium is a 3‑generation‑old heritage built on relationships, trust, and the timeless beauty of Indian weaves. Led by the third generation with honesty, authenticity & warmth.",
  baseUrl: "https://kabraemporium.com",
  twitterHandle: "@kabraemporium",
  address:
    "Your Store Address, City, State - PIN Code",
  phone: "+91 12345 67890", // Update with actual phone
  email: "hello@kabraemporium.com", // Update with actual email
  openingHours: {
    sunday: "Closed",
    otherDays: "10:00 AM - 8:00 PM",
  },
};

export const pageSEO = {
  home: {
    title: "Kabra Emporium – A Legacy Woven in Love, Trust & Tradition | Heritage Saree Store",
    description: "Kabra Emporium is a 3‑generation‑old heritage built on relationships, trust, and the timeless beauty of Indian weaves. Led by the third generation with honesty, authenticity & warmth.",
    keywords: "kabra emporium, heritage saree store, traditional sarees, Indian weaves, family business, three generation legacy, authentic sarees, paithani, banarasi, chanderi, kanjivaram",
    canonical: "/",
  },
  about: {
    title: "About Kabra Emporium | Three Generations of Saree Legacy",
    description: "Discover the story of Kabra Emporium – a 3‑generation‑old heritage built on relationships, trust, and the timeless beauty of Indian weaves. Learn about our journey of honesty, authenticity & warmth.",
    keywords: "about kabra emporium, saree store history, family business legacy, three generation saree shop, traditional weavers",
    canonical: "/about",
  },
  products: {
    title: "Our Saree Collection | Authentic Indian Weaves | Kabra Emporium",
    description: "Explore our exquisite collection of authentic Indian sarees including Paithani, Banarasi, Chanderi, Kanjivaram, and more. Each piece carries our legacy of quality and tradition.",
    keywords: "saree collection, paithani sarees, banarasi sarees, chanderi sarees, kanjivaram sarees, traditional sarees, authentic weaves",
    canonical: "/products",
  },
  // Category details will be dynamic, but keeping a base structure
  categoryDetail: {
    title: "%category% Sarees | Authentic %category% Collection | Kabra Emporium",
    description: "Explore our authentic collection of %category% sarees. Handpicked with love and tradition, each saree reflects our three-generation legacy of trust and quality.",
    keywords: "%category% sarees, traditional sarees, authentic weaves, %category% collection",
  },
  productDetail: {
    title: "%product% | Authentic %category% Saree | Kabra Emporium",
    description: "Discover %product% – an authentic %category% saree from our heritage collection. Handcrafted with love and tradition, reflecting our three-generation legacy.",
    keywords: "%product%, %category% saree, traditional saree, authentic weave, heritage collection",
  },
  occasion: {
    title: "%occasion% Sarees | Traditional %occasion% Collection | Kabra Emporium",
    description: "Find the perfect %occasion% saree from our heritage collection. Each piece is woven with love, trust, and tradition – perfect for your special moments.",
    keywords: "%occasion% sarees, wedding sarees, festival sarees, traditional wear, celebration sarees",
    canonical: "/occasion",
  },
  occasionDetail: {
    title: "%occasion% Sarees Collection | Traditional %occasion% Wear | Kabra Emporium",
    description: "Explore our exquisite %occasion% saree collection. Handpicked from authentic weavers, each saree carries our three-generation legacy of trust and tradition.",
    keywords: "%occasion% sarees, %occasion% collection, traditional wear, celebration sarees",
  },
  blog: {
    title: "Saree Blog | Weaving Stories of Tradition & Heritage | Kabra Emporium",
    description: "Explore our blog for stories about saree traditions, weaving techniques, styling tips, and the rich heritage of Indian textiles. Woven with love, trust & tradition.",
    keywords: "saree blog, textile heritage, weaving stories, saree styling, Indian textiles, traditional wear blog",
    canonical: "/blog",
  },
  blogDetail: {
    title: "%title% | Saree Stories & Heritage | Kabra Emporium",
    description: "%excerpt% Read more about the rich tradition and stories behind Indian weaves at Kabra Emporium.",
    keywords: "saree stories, textile heritage, weaving traditions, %category%",
  },
  contact: {
    title: "Contact Kabra Emporium | Visit Our Store | Get in Touch",
    description: "Visit our store to experience our three-generation legacy firsthand. Contact us for inquiries, bridal consultations, or assistance in finding your perfect saree.",
    keywords: "contact kabra emporium, saree store location, bridal consultation, visit saree shop, traditional saree store",
    canonical: "/contact",
  },
  // Contact branches
  contactPanditColony: {
    title: "Kabra Emporium Pandit Colony | Saree Store in Pandit Colony",
    description: "Visit Kabra Emporium at Pandit Colony. Experience our three-generation legacy of love, trust & tradition. Explore authentic Indian weaves at our Pandit Colony store.",
    keywords: "kabra emporium pandit colony, saree store pandit colony, traditional sarees pandit colony",
    canonical: "/contact/wholesale-branch",
  },
  contactNashikRoad: {
    title: "Kabra Emporium Nashik Road | Saree Store on Nashik Road",
    description: "Visit Kabra Emporium on Nashik Road. Discover our heritage collection of authentic Indian sarees, woven with love, trust & tradition across three generations.",
    keywords: "kabra emporium nashik road, saree store nashik road, traditional sarees nashik road",
    canonical: "/contact/nashik-road",
  },
  contactMainBranch: {
    title: "Kabra Emporium Main Branch | Our Flagship Heritage Store",
    description: "Visit our flagship Kabra Emporium store. Experience three generations of love, trust & tradition in every saree. Our main branch welcomes you with warmth and authenticity.",
    keywords: "kabra emporium main branch, flagship saree store, heritage saree shop, main store",
    canonical: "/contact/main-branch",
  },
  termsAndConditions: {
    title: "Terms and Conditions | Kabra Emporium",
    description: "Read our terms and conditions for shopping at Kabra Emporium. We believe in transparent, honest transactions built on three generations of trust.",
    keywords: "terms and conditions, store policy, saree store terms, return policy",
    canonical: "/terms-and-conditions",
  },
  privacyPolicy: {
    title: "Privacy Policy | Kabra Emporium",
    description: "Our privacy policy explains how we protect your information. At Kabra Emporium, your trust is as precious as our three-generation legacy.",
    keywords: "privacy policy, data protection, customer privacy, store policies",
    canonical: "/privacy-policy",
  },
  notFound: {
    title: "Page Not Found | Kabra Emporium – Heritage Saree Store",
    description: "The page you're looking for doesn't exist. Return to our homepage and explore our three-generation legacy of love, trust & tradition in Indian weaves.",
    canonical: "/404",
  },
};

// Helper function to replace dynamic placeholders
export const getDynamicSEO = (pageType, params = {}) => {
  const seo = pageSEO[pageType];
  if (!seo) return pageSEO.home;
  
  let title = seo.title;
  let description = seo.description;
  let keywords = seo.keywords;
  
  Object.keys(params).forEach(key => {
    title = title.replace(`%${key}%`, params[key]);
    description = description.replace(`%${key}%`, params[key]);
    keywords = keywords.replace(`%${key}%`, params[key]);
  });
  
  return {
    ...seo,
    title,
    description,
    keywords,
  };
};