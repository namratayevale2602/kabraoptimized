import React from "react";
import { bg2, mobilebg } from "../../assets";
import AboutUsText from "./AboutUsText";
import { useSEO } from "../../hooks/useSEO";

const About = () => {
  useSEO("about");
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background Image with lower opacity */}
      <div
        className="absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Mobile-specific background overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20 lg:hidden"
        style={{
          backgroundImage: `url(${mobilebg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Content with higher z-index */}
      <div className="relative z-10">
        <AboutUsText />
      </div>
    </section>
  );
};

export default About;
