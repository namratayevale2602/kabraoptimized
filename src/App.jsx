import React, { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Layout from "./layout/Layout";

// Every non-home route is lazy-loaded so its code is excluded from the
// initial bundle that the home page needs.
const ContactPanditColony  = lazy(() => import("./pages/Contact/ContactPanditColony"));
const ContactNashikRoad    = lazy(() => import("./pages/Contact/ContactNashikRoad"));
const ContactMainBranch    = lazy(() => import("./pages/Contact/ContactMainBranch"));
const About                = lazy(() => import("./pages/aboutus/About"));
const Categorydetail       = lazy(() => import("./pages/Categorydetail/Categorydetail"));
const ProductDetail        = lazy(() => import("./pages/Categorydetail/ProductDetail"));
const MainProduct          = lazy(() => import("./pages/Categorydetail/MainProduct"));
const ShopByOccasion       = lazy(() => import("./pages/Home/ShopByOccasion"));
const OccasionCategoryDetail = lazy(() => import("./pages/OccasionDetail/OccasionCategoryDetail"));
const TermsAndConditions   = lazy(() => import("./pages/policy/TermsAndConditions"));
const PrivacyPolicy        = lazy(() => import("./pages/policy/PrivacyPolicy"));
const BlogCards            = lazy(() => import("./pages/blog/BlogCards"));
const BlogDetailPage       = lazy(() => import("./pages/blog/BlogDetailPage"));

// Wrap a lazy component in Suspense. The fallback is an empty full-height div
// so there is no layout jump when the chunk arrives.
const lazy_route = (Component) => (
  <Suspense fallback={<div className="min-h-screen" />}>
    <Component />
  </Suspense>
);

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/contact/wholesale-branch" element={lazy_route(ContactPanditColony)} />
        <Route path="/contact/nashik-road"       element={lazy_route(ContactNashikRoad)} />
        <Route path="/contact/main-branch"       element={lazy_route(ContactMainBranch)} />
        <Route path="about"                      element={lazy_route(About)} />
        <Route path="Categorydetail/:slug"        element={lazy_route(Categorydetail)} />
        <Route path="/product/:slug"             element={lazy_route(ProductDetail)} />
        <Route path="/products/:slug"            element={lazy_route(MainProduct)} />
        <Route path="occasion"                   element={lazy_route(ShopByOccasion)} />
        <Route path="occasion/:slug"             element={lazy_route(OccasionCategoryDetail)} />
        <Route path="/terms-and-conditions"      element={lazy_route(TermsAndConditions)} />
        <Route path="/privacy-policy"            element={lazy_route(PrivacyPolicy)} />
        <Route path="/blog"                      element={lazy_route(BlogCards)} />
        <Route path="/blog/:slug"                element={lazy_route(BlogDetailPage)} />
      </Route>,
    ),
  );

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
