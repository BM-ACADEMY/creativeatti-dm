import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import Logo from "../assets/logo.png";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const linkRefs = useRef([]);
  const mobileMenuRef = useRef();
  const toggleBtnRef = useRef();

  // Handle smooth scrolling
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  // Hover animation for nav links (desktop + mobile) - underline slide in
  useEffect(() => {
    linkRefs.current.forEach((el) => {
      if (el) {
        const underline = el.querySelector("span");

        const onEnter = () => {
          gsap.to(underline, {
            width: "100%",
            duration: 0.3,
            ease: "power2.out",
          });
        };
        const onLeave = () => {
          gsap.to(underline, {
            width: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        return () => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        };
      }
    });
  }, []);

  // Animate toggle button on isOpen change (fade + scale)
  useEffect(() => {
    if (toggleBtnRef.current) {
      gsap.fromTo(
        toggleBtnRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, [isOpen]);

  // Control menuVisible and animate open/close of mobile menu
  useEffect(() => {
    if (isOpen) {
      setMenuVisible(true);
      gsap.fromTo(
        mobileMenuRef.current,
        { x: "-100%", opacity: 0, scale: 0.95 },
        {
          x: "0%",
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            gsap.fromTo(
              linkRefs.current.slice(navLinks.length),
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.12,
                duration: 0.35,
                ease: "power2.out",
              }
            );
          },
        }
      );
    } else if (menuVisible) {
      gsap.to(mobileMenuRef.current, {
        x: "-100%",
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          setMenuVisible(false);
        },
      });
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black text-white w-full shadow-md px-4 py-3 z-50">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="text-2xl font-bold z-50">
          <img src={Logo} alt="Logo" className="h-8 md:h-10 w-auto" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link, i) => (
            <li
              key={link.name}
              ref={(el) => (linkRefs.current[i] = el)}
              className="cursor-pointer font-semibold relative inline-block"
            >
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative z-10"
              >
                {link.name}
              </a>
              <span className="absolute left-0 bottom-0 h-[2px] bg-[#97c93c] w-0"></span>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle with animation */}
        <div ref={toggleBtnRef} className="md:hidden z-50">
          {isOpen ? (
            <X
              onClick={() => setIsOpen(false)}
              className="text-white w-6 h-6 cursor-pointer"
            />
          ) : (
            <Menu
              onClick={() => setIsOpen(true)}
              className="text-white w-6 h-6 cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Fullscreen Mobile Menu */}
      {menuVisible && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed top-0 left-0 w-full h-screen bg-black flex flex-col justify-center items-center space-y-8 z-40"
        >
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              ref={(el) => (linkRefs.current[i + navLinks.length] = el)}
              className="text-6xl tracking-wide font-sixcaps cursor-pointer opacity-0 relative inline-block"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
              <span className="absolute left-0 bottom-[-6px] h-[3px] bg-[#97c93c] w-0"></span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
