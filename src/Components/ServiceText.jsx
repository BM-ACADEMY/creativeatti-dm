import React from "react";
import { motion } from "framer-motion";

const ReachOutSection = () => {
  return (
    <div className="bg-white py-16 px-6 flex flex-col items-center justify-center text-center">
      <motion.p
        className="max-w-6xl text-[#757573] text-lg sm:text-xl md:text-1xl leading-relaxed"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        At CREATIஅTTI, we believe in the power of impactful digital presence.
        Our team of creative minds — designers, writers, photographers,
        videographers, and strategists — work together to craft compelling
        visuals and content that not only grab attention but drive real results.
        We don’t just create content — we create connections that convert.
      </motion.p>
    </div>
  );
};

export default ReachOutSection;
