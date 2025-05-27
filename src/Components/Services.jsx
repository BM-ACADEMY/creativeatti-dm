import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: "/1.jpg", title: "Mountain View" },
  { src: "/2.jpg", title: "Forest Path" },
  { src: "/3.jpg", title: "Desert Dunes" },
  { src: "/4.jpg", title: "Ocean Horizon" },
];

const StackingCards = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [containerHeight, setContainerHeight] = useState("100vh");

  // Smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Dynamic container height
  useEffect(() => {
    const updateHeight = () => {
      const cardHeight = window.innerHeight * 0.9;
      const totalHeight = cardHeight * (images.length + 1);
      setContainerHeight(`${totalHeight}px`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // GSAP animations
  useEffect(() => {
    const cards = cardRefs.current;
    const cardHeight = window.innerHeight * 0.7;

    gsap.set(cards, {
      yPercent: (i) => (i === 0 ? 0 : 100),
      zIndex: (i) => 10 - i,
      scale: (i) => (i === 0 ? 1 : 0.85),
      filter: (i) => (i === 0 ? "blur(0px)" : "blur(8px)"),
      rotate: (i) => (i === 0 ? 0 : -5),
    });

    cards.forEach((card, index) => {
      if (!card || index === 0) return;

      const prevCard = cards[index - 1];
      const start = index * cardHeight;
      const end = start + cardHeight;
      
      // Use shorter duration for first two cards
      const duration = index < 2 ? 0.3 : 0.6;

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top+=${start} top`,
          end: `top+=${end} top`,
          scrub: index < 2 ? 0.5 : 1.5, // Less scrub for first two cards
          onEnter: () => {
            gsap.to(card, {
              scale: 1,
              filter: "blur(0px)",
              rotate: 0,
              zIndex: 10,
              duration,
              ease: "power2.out",
            });
            gsap.to(prevCard, {
              scale: 0.85,
              filter: "blur(8px)",
              yPercent: -25,
              rotate: -5,
              zIndex: 9,
              duration,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              yPercent: 100,
              scale: 0.85,
              filter: "blur(8px)",
              rotate: -5,
              zIndex: 9,
              duration,
              ease: "power2.inOut",
            });
            gsap.to(prevCard, {
              yPercent: 0,
              scale: 1,
              filter: "blur(0px)",
              rotate: 0,
              zIndex: 10,
              duration,
              ease: "power2.inOut",
            });

            // Reset all forward cards
            cards.forEach((c, i) => {
              if (i > index) {
                gsap.set(c, {
                  yPercent: 100,
                  scale: 0.85,
                  filter: "blur(8px)",
                  rotate: -5,
                  zIndex: 10 - i,
                });
              }
            });
          },
        },
      }).to(card, {
        yPercent: 0,
        ease: "power2.inOut",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      className="relative"
      style={{ height: containerHeight, backgroundColor: "black" }}
    >
      <div
        ref={sectionRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-visible"
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="absolute w-11/12 md:w-4/5 lg:w-4/5 h-auto aspect-[9/16] lg:aspect-[16/9] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ willChange: "transform, filter, rotate" }}
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={image.src}
                alt={`card-${index}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute font-sixcaps bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center font-light drop-shadow-2xl tracking-wider text-5xl sm:text-6xl md:text-7xl lg:text-8xl px-4">
                {image.title}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StackingCards;