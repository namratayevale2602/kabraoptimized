// components/FaqSection.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../service/api";

export default function FaqSection({ initialData = undefined }) {
  const [faqData, setFaqData] = useState({
    sectionTitle: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about our products and services",
    faqs: [],
  });
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData !== undefined) {
      if (initialData !== null) {
        setFaqData(initialData);
        setError(null);
        setLoading(false);
      }
      return;
    }

    axiosInstance
      .get('/faqs')
      .then((res) => {
        if (res.data.success) { setFaqData(res.data.data); setError(null); }
        else setError('Failed to load FAQs');
      })
      .catch((err) => setError(err.response?.data?.message || 'Error loading FAQs'))
      .finally(() => setLoading(false));
  }, [initialData]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-1 w-16 bg-gray-200 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-2">
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center text-red-500 bg-red-50 p-6 rounded-lg">
            <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium block mb-2">Unable to load FAQs</span>
            <span className="text-sm">{error}</span>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No FAQs state
  if (!faqData.faqs || faqData.faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center px-4 md:px-6 mb-6 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6b3f2a] inline-block pb-2">
            {faqData.sectionTitle}
          </h2>
          <div className="h-1 w-16 md:w-20 bg-amber-500 mx-auto mb-4" />
          <p className="mt-2 text-sm md:text-base text-gray-700">
            {faqData.subtitle}
          </p>
        </div>

        {/* Category Filters - Optional */}
        {[...new Set(faqData.faqs.map(faq => faq.category).filter(Boolean))].length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button
              onClick={() => {/* Handle category filter */}}
              className="px-4 py-2 text-sm bg-amber-100 text-[#6b3f2a] rounded-full hover:bg-amber-200 transition-colors"
            >
              All
            </button>
            {[...new Set(faqData.faqs.map(faq => faq.category).filter(Boolean))].map((category, idx) => (
              <button
                key={idx}
                onClick={() => {/* Handle category filter */}}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-amber-100 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* FAQ List */}
        <div className="space-y-0 divide-y divide-gray-200">
          {faqData.faqs.map((faq, index) => (
            <div key={faq.id || index} className="rounded-lg mb-3 overflow-hidden">
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex justify-between items-center text-left px-5 py-4 transition-colors `}
              >
                <span className="font-medium text-[#6b3f2a] text-sm md:text-base pr-4">
                  {faq.question}
                </span>
                <span className="text-xl text-[#6b3f2a] flex-shrink-0">
                  {activeIndex === index ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </span>
              </button>

              {/* Answer */}
              {activeIndex === index && (
                <div className="px-5 py-4 text-sm md:text-base text-gray-700 leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}