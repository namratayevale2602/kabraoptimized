import React from "react";
import { bg2, mobilebg } from "../../assets";
import { useHomeData } from "../../hooks/useHomeData";
import HeroSection from "./HeroSection";
import TopCategories from "./TopCategories";
import ShopByOccasion from "./ShopByOccasion";
import CategorySlider from "./CategorySlider";
import AboutUs from "./AboutUs";
import ExclusiveCollection from "./ExclusiveCollection";
import StatsSection from "./StatsSection";
import FaqSection from "./FaqSection";
import { SareesCategory } from "./SareesCategory";
import { LehengasCategory } from "./LehengasCategory";
import { SalwarSuitsCategory } from "./SalwarSuitsCategory";
import TrendingCollections from "./TrendingCollections";
import BlogCards from "../blog/BlogCards";
import Testimonial from "./Testimonial";

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
      {/* Background images — absolute so they never cause layout shift */}
      <img
        src={bg2}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center opacity-25 pointer-events-none select-none"
      />
      <img
        src={mobilebg}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center opacity-20 pointer-events-none select-none lg:hidden"
      />

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
        <Testimonial />
        <BlogCards           initialData={d("blogs")} />
        <StatsSection        initialData={d("stats")} />
        <FaqSection          initialData={d("faqs")} />
      </div>
    </section>
  );
};

export default Home;
