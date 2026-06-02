import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../service/api";

// Module-level promise — embed.js is requested exactly once no matter how
// many <CustomInstagramReel> instances mount at the same time.
let instagramScriptPromise = null;

function loadInstagramScript() {
  if (instagramScriptPromise) return instagramScriptPromise;
  instagramScriptPromise = new Promise((resolve, reject) => {
    if (window.instgrm) { resolve(); return; }
    const existing = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
    if (existing) {
      existing.addEventListener("load", resolve);
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.body.appendChild(s);
  });
  return instagramScriptPromise;
}

const CustomInstagramReel = ({ url }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    loadInstagramScript()
      .then(() => {
        window.instgrm?.Embeds.process();
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const reelId = (() => {
    if (!url || typeof url !== "string") return null;
    const m = url.match(/\/reel\/([^/?#]+)/);
    return m ? m[1] : null;
  })();

  if (!reelId || hasError) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div className="text-center p-4">
          <p className="text-gray-500 mb-2">
            {!reelId ? "Invalid Instagram URL" : "Failed to load reel"}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Open in Instagram
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
        </div>
      )}
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={`https://www.instagram.com/reel/${reelId}/`}
        data-instgrm-version="14"
        data-instgrm-captioned="false"
        style={{
          background: "#FFF",
          border: "0",
          borderRadius: "3px",
          margin: "0",
          maxWidth: "100%",
          minWidth: "100%",
          padding: "0",
          width: "100%",
          height: "100%",
          minHeight: "400px",
          display: isLoading ? "none" : "block",
        }}
      >
        <a
          href={`https://www.instagram.com/reel/${reelId}/`}
          target="_blank"
          rel="noopener noreferrer"
        />
      </blockquote>
    </div>
  );
};

export default function ExclusiveCollection({ initialData = undefined }) {
  const [data, setData] = useState({ sectionTitle: "Customer Reviews", testimonials: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Defer Instagram embed rendering until section enters viewport so the
  // script and all embed iframes don't block the initial page load.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (initialData !== undefined) {
      if (initialData !== null) {
        setData(initialData);
        setError(null);
        setLoading(false);
      }
      return;
    }

    axiosInstance
      .get("/instagram-reels")
      .then((res) => {
        if (res.data.success) setData(res.data.data);
        else setError("Failed to load reels");
      })
      .catch(() => setError("Unable to load Instagram reels. Please try again later."))
      .finally(() => setLoading(false));
  }, [initialData]);

  const renderMedia = (item) => {
    if (!item) return null;
    if (item.type === "instagram" && item.instagramUrl) {
      return (
        <div className="relative h-[350px] md:h-[400px] overflow-hidden">
          {inView ? (
            <CustomInstagramReel url={item.instagramUrl} />
          ) : (
            <div className="w-full h-full bg-gray-100 animate-pulse" />
          )}
        </div>
      );
    }
    return (
      <div className="relative h-[350px] md:h-[400px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No media available</p>
      </div>
    );
  };

  if (loading) {
    return (
      <section ref={sectionRef} className="relative py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-200 h-[400px] rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section ref={sectionRef} className="relative py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16 bg-cover bg-center">
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6b3f2a] inline-block pb-2">
            Watch & Shop Exclusive Collection
          </h2>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-2">
          {data.testimonials.map((item) => (
            <div
              key={item.id}
              className="shrink-0 w-[280px] snap-center bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {renderMedia(item)}
              {item.title && (
                <div className="p-3 text-center">
                  <p className="text-sm font-medium text-gray-800">{item.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-2">
          {data.testimonials.map((item) => (
            <div key={item.id} className="bg-white overflow-hidden rounded-xl shadow-lg">
              {renderMedia(item)}
              {item.title && (
                <div className="p-3 text-center">
                  <p className="text-sm font-medium text-gray-800">{item.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
