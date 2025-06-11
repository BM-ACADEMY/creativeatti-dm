import React, { useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { gsap } from "gsap";

const services = [
  {
    title: "Creative Content Production",
    description: "End-to-end content creation including writing, visuals, and multimedia that align with your brand's voice."
  },
  {
    title: "Social Media Management",
    description: "Managing your social platforms to grow engagement, build community, and maintain brand consistency."
  },
  {
    title: "Digital Media Ads",
    description: "Strategic ad campaigns across platforms like Meta, Google, and YouTube to drive results and ROI."
  },
  {
    title: "Branding",
    description: "Creating powerful brand identities through logos, messaging, and visual systems that connect with your audience."
  },
  {
    title: "Web Design & SEO",
    description: "Designing fast, mobile-optimized websites and implementing SEO strategies to improve visibility and performance."
  },
  {
    title: "Commercial Photos & Films",
    description: "Producing high-quality photo and video content that elevates your brand and tells compelling stories."
  }
];
export default function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const refs = useRef([]);

  const toggleAccordion = (index) => {
    const isOpen = openIndex === index;
    setOpenIndex(isOpen ? null : index);

    refs.current.forEach((ref, i) => {
      if (ref) {
        gsap.to(ref, {
          height: i === index && !isOpen ? ref.scrollHeight : 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    });
  };

  return (
    <div className="bg-white text-black py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left side: Title */}
        <div className="text-6xl md:text-7xl font-bold uppercase text-black lg:sticky lg:top-24 flex items-center  leading-tight">
  Our<br />Services
</div>



        {/* Right side: Accordion */}
        <div className="space-y-4">
          {services.map((item, index) => (
            <div key={index} className="border-b border-gray-700">
              <button
                className="w-full flex justify-between items-center py-4 text-left"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-semibold text-[16px]">{item.title}</span>
                {openIndex === index ? (
                  <ChevronDown className="w-5 h-5 transition-transform transform rotate-180" />
                ) : (
                  <ChevronRight className="w-5 h-5 transition-transform" />
                )}
              </button>
              <div
                ref={(el) => (refs.current[index] = el)}
                className="overflow-hidden h-0 relative"
              >
                <div className="relative">
                  <div className="absolute top-0 left-0 w-full h-4  to-transparent z-10" />
                  <p className="text-sm text-gray-500 pb-4 pr-8 relative z-20">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
