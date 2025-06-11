import React, { useRef, useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Instagram, Facebook  } from 'lucide-react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const Footer = () => {
  const bottomUnderlineRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll to show/hide back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const animateUnderline = () => {
    gsap.killTweensOf(bottomUnderlineRef.current);
    gsap.set(bottomUnderlineRef.current, { transformOrigin: 'right center' });
    gsap.to(bottomUnderlineRef.current, {
      scaleX: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const resetUnderline = () => {
    gsap.killTweensOf(bottomUnderlineRef.current);
    gsap.set(bottomUnderlineRef.current, { transformOrigin: 'left center' });
    gsap.to(bottomUnderlineRef.current, {
      scaleX: 0,
      duration: 0.5,
      ease: 'power2.in',
    });
  };

  const textVariants = {
    hover: { y: -2, transition: { duration: 0.3 } },
    initial: { y: 0 },
  };

  // Animation variants for the button
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <footer className="bg-white text-black pb-10 relative" id='contact'>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between text-center gap-6 py-6 px-4">
        {/* Email */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <Mail className="w-6 h-6" />
          <p>flolapobyts@gmail.com</p>
        </div>

        {/* Address */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <MapPin className="w-6 h-6" />
          <div className="text-center">
            <p>148, Narayanaguru Road, Saibaba</p>
            <p>Colony, Coimbatore.</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <Phone className="w-6 h-6" />
          <p>+91 98651 20692 / +91 99441 57745</p>
        </div>
      </div>

      <div className="mt-4 py-5 text-center relative text-black">
        {/* Social Media Icons */}
        <div className="flex justify-center max-w-4xl mx-auto px-4 mb-5">
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Instagram
                className="w-6 h-6 text-black group-hover:text-[#97c93c] transition-colors duration-300"
              />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Facebook 
                className="w-6 h-6 text-black group-hover:text-[#97c93c] transition-colors duration-300"
              />
            </a>
          </div>
        </div>
        {/* Copyright */}
        <div className="max-w-4xl mx-auto px-4">
          <span>© {currentYear} </span>
          <motion.a
            href="https://bmtechx.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block cursor-pointer"
            variants={textVariants}
            whileHover="hover"
            initial="initial"
            onMouseEnter={animateUnderline}
            onMouseLeave={resetUnderline}
          >
            BMTechx.in
            <span
              ref={bottomUnderlineRef}
              className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 bg-[#97c93c] origin-right scale-x-0"
              style={{ transformOrigin: 'right center', transform: 'scaleX(0)' }}
            />
          </motion.a>
          <span> All rights reserved.</span>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 left-8 bg-black text-white rounded-full p-3 shadow-lg hover:bg-[#97c93c] transition-colors duration-300 z-50"
        variants={buttonVariants}
        initial="hidden"
        animate={showBackToTop ? "visible" : "hidden"}
        transition={{ duration: 0.3 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;