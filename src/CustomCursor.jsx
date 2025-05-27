import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Set initial positions and centering
    gsap.set([cursor, follower], {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100,
    });

    // Mouse move handler
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power3.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    // Hover effect for interactive elements
    const addHover = () => {
      gsap.to(cursor, {
        scale: 0.5,
        backgroundColor: "#ef4444",
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(follower, {
        scale: 1.8,
        opacity: 0.8,
        borderColor: "#ef4444",
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const removeHover = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "#ffffff",
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(follower, {
        scale: 1,
        opacity: 0.5,
        borderColor: "#ffffff",
        duration: 0.3,
        ease: "power3.out",
      });
    };

    // Add event listeners to interactive elements
    const interactiveEls = document.querySelectorAll("a, button, .hover-target, .card");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    // Handle mouse move with smooth scrolling (Lenis compatibility)
    const handleMouseMove = (e) => {
      // Use clientX/Y for compatibility with smooth scrolling
      moveCursor(e);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed w-10 h-10 border-2 border-white rounded-full pointer-events-none z-[9998] opacity-50 mix-blend-difference"
      />
    </>
  );
};

export default CustomCursor;