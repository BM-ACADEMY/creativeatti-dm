import React, { useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { gsap } from "gsap";

const services = [
  { title: "Social Media Management", description: "Managing your social media platforms to build your brand and engage your audience effectively." },
  { title: "Ad Campaign", description: "Strategically planned advertising campaigns across digital platforms to maximize reach and ROI." },
  { title: "Content Marketing", description: "Producing and distributing relevant, consistent, and creative content to captivate your audience." },
  { title: "Analytics and Reporting", description: "Tracking and interpreting data to measure performance and guide strategy." },
  { title: "Public Relations", description: "Building a strong public image through media outreach, events, and storytelling." },
  { title: "Branding and Package Design", description: "Creating cohesive brand identities and product packaging that stand out." },
  { title: "Motion Graphics and VFX", description: "Bringing stories to life with animated visuals and professional effects." },
  { title: "Product photography", description: "Capturing high-quality images that showcase your products in the best light." },
  { title: "Multimedia production", description: "Producing videos, animations, and audio content tailored to your brand." },
  { title: "Content production", description: "End-to-end content creation from ideation to execution across formats." },
  { title: "E-commerce and web design", description: "Designing fast, mobile-friendly e-commerce sites and business websites." },
  { title: "Search Engine Optimization", description: "Improving your website’s visibility on search engines to attract organic traffic." },
  { title: "Online Reputation Management", description: "Monitoring and improving how your brand is perceived online." },
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
    <div className="bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left side: Title */}
        <div className="text-6xl md:text-7xl font-bold uppercase text-white lg:sticky lg:top-24 flex items-center  leading-tight">
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
                  <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black to-transparent z-10" />
                  <p className="text-sm text-gray-300 pb-4 pr-8 relative z-20">
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
