import React, { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  Bell,
  Mail,
  Globe,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useSEO } from "../../hooks/useSEO";
import axiosInstance from "../../service/api";

// Icon mapping
const iconMap = {
  Shield: Shield,
  Lock: Lock,
  Eye: Eye,
  Database: Database,
  UserCheck: UserCheck,
  Bell: Bell,
  Mail: Mail,
  Globe: Globe,
  FileText: FileText,
  AlertCircle: AlertCircle,
};

const TermsAndConditions = () => {
  useSEO("termsAndConditions");
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTermsConditions();
  }, []);

  const fetchTermsConditions = async () => {
    try {
      const response = await axiosInstance.get("/terms-conditions");
      if (response.data.success) {
        setPageData(response.data.data);
      } else {
        setError("Failed to load terms and conditions");
      }
    } catch (error) {
      console.error("Error fetching terms and conditions:", error);
      setError("Unable to load terms and conditions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || FileText;
    return <IconComponent size={24} />;
  };

  const renderSubpoints = (subpoints) => {
    if (!subpoints || !Array.isArray(subpoints)) return null;

    return (
      <ul className="space-y-2 ml-4 mt-2">
        {subpoints.map((point, idx) => {
          // Handle different point formats
          if (typeof point === 'string') {
            return (
              <li key={idx} className="flex items-start">
                <span className="text-[#eb8749] mr-2 mt-1">•</span>
                <span className="text-gray-600">{point}</span>
              </li>
            );
          } else if (point.point) {
            return (
              <li key={idx} className="flex items-start">
                <span className="text-[#eb8749] mr-2 mt-1">•</span>
                <span className="text-gray-600">{point.point}</span>
              </li>
            );
          } else if (point.title && point.points) {
            return (
              <div key={idx} className="ml-4 mt-2">
                <h4 className="font-semibold text-gray-800 mb-1">{point.title}:</h4>
                <ul className="space-y-1 ml-4">
                  {point.points.map((subpoint, subIdx) => (
                    <li key={subIdx} className="flex items-start">
                      <span className="text-[#eb8749] mr-2 mt-1">•</span>
                      <span className="text-gray-600">{subpoint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          return null;
        })}
      </ul>
    );
  };

  const renderContact = (contact) => {
    if (!contact || !Array.isArray(contact)) return null;

    return (
      <div className="mt-4 space-y-2 p-4 rounded-lg">
        {contact.map((item, idx) => (
          <div key={idx} className="text-gray-700">
            {item.contact || item}
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6b3f2a]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={fetchTermsConditions}
            className="mt-4 bg-[#6b3f2a] text-white px-6 py-2 rounded-lg hover:bg-[#583020]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-5">
      {/* Hero Section */}
      <div className="py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-5 md:py-2">
          <div className="flex items-center space-x-4 mb-2">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {pageData?.title || "Terms & Conditions"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        {pageData?.introduction && (
          <div className="rounded-2xl p-8 mb-8 ">
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">
                {pageData.introduction}
              </p>
            </div>
          </div>
        )}

        {/* Terms Sections */}
        <div className="space-y-6">
          {pageData?.sections?.map((section, index) => (
            <div 
              key={index} 
              className="rounded-2xl overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  {section.icon && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-[#6b3f2a]">
                      {renderIcon(section.icon)}
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      {section.title}
                    </h2>
                    
                    <p className="text-gray-700 mb-4 text-lg">
                      {section.content}
                    </p>

                    {/* Subpoints */}
                    {section.subpoints && renderSubpoints(section.subpoints)}

                    {/* Contact Information */}
                    {section.contact && renderContact(section.contact)}

                    {/* Note */}
                    {section.note && (
                      <div className="mt-4 p-4 rounded-lg border border-amber-200">
                        <p className="text-amber-700 italic">{section.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default TermsAndConditions;