import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const tripletImages = [
  { left: "/client/1.jpg", center: "/client/2.jpg", right: "/client/3.jpg" },
  { left: "/client/4.jpg", center: "/client/5.jpg", right: "/client/6.jpg" },
  { left: "/client/7.jpg", center: "/client/8.jpg", right: "/client/9.jpg" },
];

const ParallaxGallery = () => {
  const sectionRef = useRef(null);
  const leftRefs = useRef([]);
  const centerRefs = useRef([]);
  const rightRefs = useRef([]);

  // State to track if heading entered viewport
  const [headingInView, setHeadingInView] = useState(false);

  useEffect(() => {
    if (!headingInView) return; // only run if heading is visible

    const ctx = gsap.context(() => {
      leftRefs.current.forEach((ref) => {
        gsap.from(ref, {
          x: -200,
          opacity: 0,
          scrollTrigger: {
            trigger: ref,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        });
      });

      centerRefs.current.forEach((ref) => {
        gsap.from(ref, {
          scale: 0.8,
          opacity: 0,
          scrollTrigger: {
            trigger: ref,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        });
      });

      rightRefs.current.forEach((ref) => {
        gsap.from(ref, {
          x: 200,
          opacity: 0,
          scrollTrigger: {
            trigger: ref,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [headingInView]);

  return (
    <div ref={sectionRef} className="overflow-x-hidden">
      {/* Heading */}
      <div className="text-center py-12 bg-black">
        <motion.h2
          className="text-4xl py-5 font-bold text-white"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onViewportEnter={() => setHeadingInView(true)} // set flag when h2 enters viewport
        >
          Our Client
        </motion.h2>

        <motion.p
          className="text-gray-400 mt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Trusted by brands and businesses
        </motion.p>
      </div>

      {tripletImages.map((set, idx) => (
  <section
    key={idx}
    className="py-8 md:py-10 bg-black flex items-center justify-center px-4"
  >
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      {/* Left Image */}
      <div
        ref={(el) => (leftRefs.current[idx] = el)}
        className="w-full md:w-[400px] rounded-xl shadow-2xl overflow-hidden"
      >
        <img
          src={set.left}
          alt={`Left ${idx}`}
          className="w-full h-[400px] object-cover rounded-xl"
        />
      </div>

      {/* Center Image */}
      <div
        ref={(el) => (centerRefs.current[idx] = el)}
        className="w-full md:w-[400px] rounded-xl shadow-2xl overflow-hidden"
      >
        <img
          src={set.center}
          alt={`Center ${idx}`}
          className="w-full h-[400px] object-cover rounded-xl"
        />
      </div>

      {/* Right Image */}
      <div
        ref={(el) => (rightRefs.current[idx] = el)}
        className="w-full md:w-[400px] rounded-xl shadow-2xl overflow-hidden"
      >
        <img
          src={set.right}
          alt={`Right ${idx}`}
          className="w-full h-[400px] object-cover rounded-xl"
        />
      </div>

      
    </div>
  </section>
))}

    </div>
  );
};

export default ParallaxGallery;
