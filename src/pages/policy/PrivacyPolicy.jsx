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
  Database: Database,
  Lock: Lock,
  Eye: Eye,
  UserCheck: UserCheck,
  Bell: Bell,
  Mail: Mail,
  Globe: Globe,
  Shield: Shield,
  FileText: FileText,
  AlertCircle: AlertCircle,
};

const PrivacyPolicy = () => {
  useSEO("privacyPolicy");
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    try {
      const response = await axiosInstance.get("/privacy-policy");
      if (response.data.success) {
        setPageData(response.data.data);
      } else {
        setError("Failed to load privacy policy");
      }
    } catch (error) {
      console.error("Error fetching privacy policy:", error);
      setError("Unable to load privacy policy. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || Shield;
    return <IconComponent size={24} />;
  };

  const renderSubpoints = (subpoints) => {
    if (!subpoints || !Array.isArray(subpoints)) return null;

    return (
      <div className="space-y-4">
        {subpoints.map((point, idx) => {
          if (typeof point === 'string' || point.point) {
            return (
              <div key={idx} className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span className="text-gray-600">{point.point || point}</span>
              </div>
            );
          } else {
            return (
              <div key={idx} className="ml-4">
                <h4 className="font-bold text-gray-800 mb-2">{point.title}:</h4>
                <ul className="space-y-1 ml-4">
                  {point.points?.map((subpoint, subIdx) => (
                    <li key={subIdx} className="text-gray-600">
                      • {subpoint}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
        })}
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
            onClick={fetchPrivacyPolicy}
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
                {pageData?.title || "Privacy Policy"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Introduction */}
        {pageData?.introduction && (
          <div className="rounded-2xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Introduction
            </h2>
            <div className="space-y-4 text-gray-700 text-lg">
              {pageData.introduction.split('\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        )}

        {/* Policy Sections */}
        <div className="space-y-8">
          {pageData?.sections?.map((section, index) => (
            <div key={index} className="rounded-2xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {section.icon && (
                        <div className="text-[#6b3f2a]">
                          {renderIcon(section.icon)}
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-gray-900">
                        {section.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-700 text-lg mb-4">
                      {section.content}
                    </p>

                    {section.subpoints && renderSubpoints(section.subpoints)}

                    {section.contact && (
                      <div className="mt-4 space-y-2">
                        {section.contact.map((contact, idx) => (
                          <div key={idx} className="text-gray-600">
                            {contact.contact || contact}
                          </div>
                        ))}
                      </div>
                    )}

                    {section.note && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-700 italic">{section.note}</p>
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

export default PrivacyPolicy;