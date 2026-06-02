// hooks/useSEO.js
import { useEffect } from "react";
import { seoConfig, pageSEO } from "../utils/seoConfig";

export const useSEO = (page = "home", additionalTags = {}) => {
  useEffect(() => {
    const pageData = pageSEO[page] || pageSEO.home;
    const fullTitle = pageData.title; // Using the full title directly from config
    const description = pageData.description || seoConfig.defaultDescription;

    // Update document title
    document.title = fullTitle;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (pageData.keywords) {
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = pageData.keywords;
    } else if (metaKeywords) {
      // Remove keywords meta tag if no keywords provided
      metaKeywords.remove();
    }

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = `${seoConfig.baseUrl}${pageData.canonical}`;

    // Open Graph tags
    const ogTags = [
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: `${seoConfig.baseUrl}${pageData.canonical}`,
      },
      { property: "og:site_name", content: seoConfig.siteName },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: `${seoConfig.baseUrl}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
    ];

    // Twitter Card tags
    const twitterTags = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: seoConfig.twitterHandle },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      {
        name: "twitter:image",
        content: `${seoConfig.baseUrl}/twitter-image.jpg`,
      },
    ];

    // Create or update all meta tags
    [...ogTags, ...twitterTags].forEach((tag) => {
      let metaTag =
        document.querySelector(`meta[property="${tag.property}"]`) ||
        document.querySelector(`meta[name="${tag.name}"]`);

      if (!metaTag) {
        metaTag = document.createElement("meta");
        if (tag.property) {
          metaTag.setAttribute("property", tag.property);
        } else {
          metaTag.setAttribute("name", tag.name);
        }
        document.head.appendChild(metaTag);
      }

      metaTag.content = tag.content;
    });

    // Additional meta tags for better SEO
    const additionalMetaTags = [
      { name: "author", content: seoConfig.siteName },
      { name: "robots", content: "index, follow" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ];

    additionalMetaTags.forEach((tag) => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.name = tag.name;
        document.head.appendChild(metaTag);
      }
      metaTag.content = tag.content;
    });

    // Add JSON-LD structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: seoConfig.siteName,
      url: seoConfig.baseUrl,
      logo: `${seoConfig.baseUrl}/logo.png`,
      description: seoConfig.defaultDescription,
      telephone: seoConfig.phone,
      email: seoConfig.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: seoConfig.address,
        addressLocality: "Nashik",
        addressRegion: "Maharashtra",
        postalCode: "422002",
        addressCountry: "IN",
      },
      sameAs: [
        "https://www.facebook.com/yourcompany",
        "https://www.linkedin.com/company/yourcompany",
        "https://twitter.com/yourcompany",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:30",
          closes: "18:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "00:00",
          closes: "00:00",
        },
      ],
      priceRange: "$$",
      serviceType: [
        "Software Development",
        "Digital Marketing",
        "IT Training",
        "Bulk SMS Services",
        "WhatsApp Services",
      ],
      areaServed: "India",
    };

    // Remove existing structured data if any
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    // Add new structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Reset to default title if needed
      document.title = seoConfig.defaultTitle;
    };
  }, [page, additionalTags]);
};
