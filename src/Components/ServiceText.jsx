import React from "react";
import { motion } from "framer-motion";

const ReachOutSection = () => {
  return (
    <div className="bg-black text-white py-16 px-6 flex flex-col items-center justify-center text-center">
      <motion.p
        className="max-w-6xl text-[#999987] text-lg sm:text-xl md:text-1xl leading-relaxed"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.4 }} 
      >
        At Flolapo, we understand the power of a strong online presence. Our
        team of talented designers, writers, photographers, videographers and
        strategists work collaboratively to create visually stunning and
        engaging content that not only capture attention but also convert
        visitors into loyal customers
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        viewport={{ once: true }}
        className="mt-8 px-7 py-2 border-2 border-white rounded-full text-white text-lg font-medium transition duration-300 hover:bg-white hover:text-black "
      >
        Reach Out!
      </motion.button>
    </div>
  );
};

export default ReachOutSection;
