import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "SOCIAL MEDIA MANAGEMENT",
  "DIGITAL MEDIA MARKETING",
  "BRANDING & PACKAGING",
  "WEB DESIGN & SEO",
  "CONTENT PRODUCTION",
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    itemsRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        {
          scale: 1,
          color: "#1a1a1a",
          transformOrigin: "center center",
          opacity: 0.85,
        },
        {
          scale: 1.5,
          color: "#ffffff",
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 1.5,
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black py-16 flex flex-col items-center"
      style={{ minHeight: "100vh" }} id="services" // Reduced height to 100vh (viewport height)
    >
      <h3 className="text-white text-sm text-center uppercase mb-10 px-4 max-w-xl">
        Our Skills Cover
      </h3>
      <div className="flex flex-col items-center gap-16 w-full max-w-4xl px-6 sm:px-4">
        {skills.map((skill, index) => (
          <h2
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className="
              font-sixcaps font-medium will-change-transform 
              text-3xl sm:text-4xl md:text-6xl lg:text-8xl
              tracking-wide sm:tracking-wider md:tracking-widest
              text-center
            "
            style={{ color: "#1a1a1a", lineHeight: 1.1,letterSpacing:'2px'  }}
          >
            {skill}
          </h2>
        ))}
      </div>
    </section>
  );
}
