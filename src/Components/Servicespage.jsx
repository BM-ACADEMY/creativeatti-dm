import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollImage = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.set(imageRef.current, { clipPath: 'circle(15% at 50% 50%)' });

    gsap.to(imageRef.current, {
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: true,
        toggleActions: 'play none none reverse',
      },
      clipPath: 'circle(100% at 50% 50%)',
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-[200vh] bg-black">
      <div className="h-screen sticky top-0 overflow-hidden">
        {/* Image with animated clipPath */}
        <img
          ref={imageRef}
          src="/ourservice.png"
          alt="Full Screen"
          className="w-full h-full object-cover"
        />

        {/* Our Service heading at top center */}
     <h1 className="absolute font-mulish top-4 left-1/2 transform -translate-x-1/2 text-white font-bold z-20
               text-2xl   /* base: small devices */
               sm:text-3xl  /* small devices */
               md:text-4xl  /* medium devices */
">
  Our Service
</h1>
        {/* Black fade overlay at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
      </div>
    </div>
  );
};

export default ScrollImage;