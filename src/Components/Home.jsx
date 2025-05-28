import { useRef } from 'react';
import { gsap } from 'gsap';
import { motion, useAnimationControls } from 'framer-motion';
import Navbar from './navbar';

// Framer Motion: Variants for the container (staggered animation for children)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Framer Motion: Variants for each letter in the main text
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: 'easeOut',
    },
  },
};

// Framer Motion: Variants for the description container
const descriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
      delay: 1.0,
    },
  },
};

const Homesection = () => {
  const lettersRef = useRef([]);
  const controls = useAnimationControls();

  const handleHover = (index) => {
    gsap.to(lettersRef.current[index], {
      scaleY: 1.5,
      scaleX: 1.1,
      transformOrigin: 'bottom center',
      duration: 0.6,
      ease: 'power4.out',
      overwrite: 'auto',
    });
  };

  const handleLeave = (index) => {
    gsap.to(lettersRef.current[index], {
      scaleY: 1,
      scaleX: 1,
      duration: 0.5,
      ease: 'power4.inOut',
      overwrite: 'auto',
    });
  };

  const text = "CREATIஅTTI";

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white px-4 text-center space-y-6" id='home'>
      <Navbar/>
      {/* Framer Motion: Main Text Container with Fade-In Animation */}
      <motion.div
        className="flex flex-wrap justify-center leading-none gap-x-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        { text.split("").map((char, i) => {
  const isLastFour = i >= text.length - 4;
  const isTamilLetter = char === "அ"; // detect the Tamil letter

  return (
    <motion.span
      key={i}
      ref={(el) => (lettersRef.current[i] = el)}
      onMouseEnter={() => handleHover(i)}
      onMouseLeave={() => handleLeave(i)}
      className="text-[80px] sm:text-[120px] md:text-[180px] lg:text-[220px] xl:text-[280px] 2xl:text-[320px] font-medium font-sixcaps inline-block cursor-pointer"
      style={{
        lineHeight: isTamilLetter ? 0.7 : 1,
        padding: 0,
        margin: 0,
        color: isLastFour ? '#97c93c' : 'inherit',
      }}
      variants={letterVariants}
    >
      {char}
    </motion.span>
  );
})}

      </motion.div>

      {/* Framer Motion: Description Container with Fade-In Animation */}
      <motion.div
        className="max-w-4xl font-poppins text-[#676767] font-medium text-sm sm:text-base md:text-lg space-y-2"
        variants={descriptionVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p>
          WE ARE A CREATIVE AGENCY, SPECIALIZED IN STRATEGY, BRANDING DESIGN, AND DEVELOPMENT.
        </motion.p>
        <motion.p>
          OUR WORK IS ALWAYS AT THE INTERSECTION OF DESIGN AND TECHNOLOGY.
        </motion.p>
        <motion.p className="text-[#676767] mt-4">
          We take your Brand Flight!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Homesection;
