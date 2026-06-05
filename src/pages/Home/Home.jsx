import React, { lazy, Suspense } from "react";
import { useHomeData } from "../../hooks/useHomeData";
import HeroSection from "./HeroSection";
import TopCategories from "./TopCategories";
import ShopByOccasion from "./ShopByOccasion";
import CategorySlider from "./CategorySlider";
import AboutUs from "./AboutUs";
import ExclusiveCollection from "./ExclusiveCollection";
import { SareesCategory } from "./SareesCategory";
import { LehengasCategory } from "./LehengasCategory";
import { SalwarSuitsCategory } from "./SalwarSuitsCategory";
import TrendingCollections from "./TrendingCollections";

// Below-fold sections — lazy-loaded so they are excluded from the initial JS chunk
const Testimonial  = lazy(() => import("./Testimonial"));
const BlogCards    = lazy(() => import("../blog/BlogCards"));
const StatsSection = lazy(() => import("./StatsSection"));
const FaqSection   = lazy(() => import("./FaqSection"));

const Home = () => {
  const { homeData, loading: homeLoading, error: homeError } = useHomeData();

  // While the aggregated request is in flight: pass null → components show skeleton.
  // If it fails: pass undefined → components fall back to their own individual requests.
  // When it succeeds: pass the relevant slice → components render immediately.
  const d = (key) => {
    if (homeLoading) return null;         // still loading → skeleton
    if (homeError || !homeData) return undefined; // failed → self-fetch
    return homeData[key] ?? undefined;    // got data
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background images are rendered by Layout.jsx for the whole app —
          no duplicate img tags here (removing them saves bandwidth + priority
          competition with the hero banner). */}
      <div className="relative z-10">
        <HeroSection         initialBanners={d("heroBanners")} />
        <AboutUs             initialData={d("about")} />
        <SareesCategory      initialData={d("sarees")} />
        <TopCategories       initialData={d("topCategories")} />
        <LehengasCategory    initialData={d("lehengas")} />
        <SalwarSuitsCategory initialData={d("salwarsuite")} />
        <TrendingCollections initialData={d("trending")} />
        <ShopByOccasion      initialData={d("occasions")} />
        <CategorySlider      initialData={d("categorySliders")} />
        <ExclusiveCollection initialData={d("instagramReels")} />
        {/* Below-fold sections — loaded lazily after main content is visible */}
        <Suspense fallback={null}>
          <Testimonial />
          <BlogCards    initialData={d("blogs")} />
          <StatsSection initialData={d("stats")} />
          <FaqSection   initialData={d("faqs")} />
        </Suspense>
      </div>
    </section>
  );
};

export default Home;
