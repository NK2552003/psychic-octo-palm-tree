


"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PhotographyDoodles from "@/components/PhotographyDoodles";

export default function WildlifePage() {
  const [currentPage, setCurrentPage] = useState<"gallery" | "detail">("gallery");
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const centerImageRef = useRef<HTMLImageElement | null>(null);
  const detailImageRef = useRef<HTMLImageElement | null>(null);
  const detailBottomImageRef = useRef<HTMLImageElement | null>(null);
  const [savedScroll, setSavedScroll] = useState<number | null>(null);

  const animals = [
    {
      id: 1,
      name: "Panda",
      image:
        "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=500&fit=crop",
      detailImage:
        "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=800&fit=crop",
      detailBottomImage:
        "https://images.unsplash.com/photo-1526566661780-1a67ea3c863e?w=1200&h=600&fit=crop",
      description:
        "The giant panda is a bear species endemic to China. Known for their distinctive black and white coloring, pandas spend most of their day eating bamboo. This gentle giant represents conservation success stories worldwide.",
    },
    {
      id: 2,
      name: "Lion",
      image:
        "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&h=500&fit=crop",
      detailImage:
        "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&h=800&fit=crop",
      detailBottomImage:
        "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=1200&h=600&fit=crop",
      description:
        "Known as the king of the jungle, lions are apex predators living in prides. Their majestic manes and powerful roar symbolize strength and courage. These social cats are found primarily in African savannas.",
    },
    {
      id: 3,
      name: "Horses",
      image:
        "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=500&fit=crop",
      detailImage:
        "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=800&fit=crop",
      detailBottomImage:
        "https://images.unsplash.com/photo-1594767268692-0821c6fc5dd5?w=1200&h=600&fit=crop",
      description:
        "Horses have been companions to humans for thousands of years. These magnificent creatures embody freedom, grace, and power. From wild mustangs to domesticated breeds, they continue to captivate our imagination.",
    },
    {
      id: 4,
      name: "Deer",
      image:
        "https://images.unsplash.com/photo-1551069613-1904dbdcda11?w=400&h=500&fit=crop",
      detailImage:
        "https://images.unsplash.com/photo-1551069613-1904dbdcda11?w=800&h=800&fit=crop",
      detailBottomImage:
        "https://images.unsplash.com/photo-1520034475321-cbe63696469a?w=1200&h=600&fit=crop",
      description:
        "Deer are elegant herbivores found across the globe. Their graceful movements and gentle nature make them symbols of natural beauty. Many species feature impressive antlers that are shed and regrown annually.",
    },
    {
      id: 5,
      name: "Turtle",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=500&fit=crop",
      detailImage:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=800&fit=crop",
      detailBottomImage:
        "https://images.unsplash.com/photo-1583574928108-4df9d1e3a0a8?w=1200&h=600&fit=crop",
      description:
        "Sea turtles are ancient mariners that have roamed the oceans for over 100 million years. These remarkable creatures navigate thousands of miles to return to their birthplace to nest. Conservation efforts are vital for their survival.",
    },
    {
      id: 6,
      name: "Owl",
      image:
        "https://images.unsplash.com/photo-1579170053380-58064b2dee67?w=400&h=500&fit=crop",
      detailImage:
        "https://images.unsplash.com/photo-1579170053380-58064b2dee67?w=800&h=800&fit=crop",
      detailBottomImage:
        "https://images.unsplash.com/photo-1516497396994-0a8f9ef58715?w=1200&h=600&fit=crop",
      description:
        "Owls are nocturnal birds of prey renowned for their wisdom in folklore. Their silent flight and keen vision make them exceptional hunters. These mysterious creatures have fascinated humans for centuries.",
    },
    {
      id: 7,
      name: "Eagle",
      image:
        "https://images.unsplash.com/photo-1579170053380-58064b2dee67?w=400&h=500&fit=crop",
      detailImage:
        "https://images.unsplash.com/photo-1598134493341-e5ef2a61eb46?w=800&h=800&fit=crop",
      detailBottomImage:
        "https://images.unsplash.com/photo-1552898431-7a4a6c3c8170?w=1200&h=600&fit=crop",
      description:
        "Eagles are powerful raptors symbolizing freedom and strength. With incredible eyesight and hunting prowess, they soar at great heights. These magnificent birds are revered across cultures worldwide.",
    },
  ];

  // Simple animation helper
  const animate = (
    element: HTMLElement | null,
    from: { opacity?: number; x?: number; y?: number },
    to: { opacity?: number; x?: number; y?: number },
    duration = 0.6,
    onComplete?: () => void
  ) => {
    if (!element) return;

    const start = performance.now();
    const startValues = { ...from };
    const endValues = { ...to };

    const step = (currentTime: number) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Easing function (ease-in-out)
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      // Opacity
      const startOpacity = typeof startValues.opacity !== 'undefined' ? startValues.opacity : undefined;
      const endOpacity = typeof endValues.opacity !== 'undefined' ? endValues.opacity : startOpacity;
      if (typeof startOpacity !== 'undefined' && typeof endOpacity !== 'undefined') {
        element.style.opacity = String(startOpacity + (endOpacity - startOpacity) * eased);
      }

      // Translate X/Y combined to avoid overwriting transform
      const startX = typeof startValues.x !== 'undefined' ? startValues.x : 0;
      const endX = typeof endValues.x !== 'undefined' ? endValues.x : startX;
      const startY = typeof startValues.y !== 'undefined' ? startValues.y : 0;
      const endY = typeof endValues.y !== 'undefined' ? endValues.y : startY;

      const curX = startX + (endX - startX) * eased;
      const curY = startY + (endY - startY) * eased;

      element.style.transform = `translate(${curX}px, ${curY}px)`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else if (onComplete) {
        onComplete();
      }
    };

    requestAnimationFrame(step);
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index);

    const y = typeof window !== "undefined" ? window.scrollY || window.pageYOffset : 0;
    setSavedScroll(y);

    animate(
      galleryRef.current,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -50 },
      0.6,
      () => {
        setCurrentPage("detail");
        if (detailRef.current) {
          detailRef.current.style.opacity = '0';
          detailRef.current.style.transform = 'translateY(50px)';
        }
      }
    );
  };

  const handleCenterImageClick = () => {
    handleImageClick(currentGalleryIndex);
  };

  const handleBackToGallery = () => {
    animate(
      detailRef.current,
      { opacity: 1, y: 0 },
      { opacity: 0, y: 50 },
      0.6,
      () => {
        setCurrentPage("gallery");
        setTimeout(() => {
          const top = savedScroll ?? 0;
          window.scrollTo({ top, behavior: "auto" });
          setSavedScroll(null);
        }, 40);
      }
    );
  };

  const handlePrev = () => {
    if (currentGalleryIndex > 0) {
      animate(
        centerImageRef.current,
        { opacity: 1, x: 0 },
        { opacity: 0, x: 50 },
        0.3,
        () => {
          setCurrentGalleryIndex((prev) => prev - 1);
          if (centerImageRef.current) {
            centerImageRef.current.style.opacity = '0';
            centerImageRef.current.style.transform = 'translateX(-50px)';
            animate(
              centerImageRef.current,
              { opacity: 0, x: -50 },
              { opacity: 1, x: 0 },
              0.3
            );
          }
        }
      );
    }
  };

  const handleNext = () => {
    if (currentGalleryIndex < animals.length - 1) {
      animate(
        centerImageRef.current,
        { opacity: 1, x: 0 },
        { opacity: 0, x: -50 },
        0.3,
        () => {
          setCurrentGalleryIndex((prev) => prev + 1);
          if (centerImageRef.current) {
            centerImageRef.current.style.opacity = '0';
            centerImageRef.current.style.transform = 'translateX(50px)';
            animate(
              centerImageRef.current,
              { opacity: 0, x: 50 },
              { opacity: 1, x: 0 },
              0.3
            );
          }
        }
      );
    }
  };

  const handleDetailNext = () => {
    if (selectedImage < animals.length - 1) {
      const elements = [detailImageRef.current, detailBottomImageRef.current].filter(Boolean) as HTMLElement[];
      let completed = 0;

      elements.forEach(el => {
        animate(
          el,
          { opacity: 1, x: 0 },
          { opacity: 0, x: -50 },
          0.3,
          () => {
            completed++;
            if (completed === elements.length) {
              setSelectedImage((prev) => prev + 1);
              elements.forEach(el => {
                if (el) {
                  el.style.opacity = '0';
                  el.style.transform = 'translateX(50px)';
                  animate(el, { opacity: 0, x: 50 }, { opacity: 1, x: 0 }, 0.3);
                }
              });
            }
          }
        );
      });
    }
  };

  const handleDetailPrev = () => {
    if (selectedImage > 0) {
      const elements = [detailImageRef.current, detailBottomImageRef.current].filter(Boolean) as HTMLElement[];
      let completed = 0;

      elements.forEach(el => {
        animate(
          el,
          { opacity: 1, x: 0 },
          { opacity: 0, x: 50 },
          0.3,
          () => {
            completed++;
            if (completed === elements.length) {
              setSelectedImage((prev) => prev - 1);
              elements.forEach(el => {
                if (el) {
                  el.style.opacity = '0';
                  el.style.transform = 'translateX(-50px)';
                  animate(el, { opacity: 0, x: -50 }, { opacity: 1, x: 0 }, 0.3);
                }
              });
            }
          }
        );
      });
    }
  };

  useEffect(() => {
    if (currentPage === "gallery" && galleryRef.current) {
      animate(galleryRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, 0.8);
    } else if (currentPage === "detail" && detailRef.current) {
      animate(detailRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, 0.8);
    }

    if (currentPage === "detail") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [currentPage]);

  return (
    <div ref={pageRef} className="relative">
      {/* Photography doodles (large screens only) */}
      <PhotographyDoodles />

      <div className="relative z-10">
        <div
          ref={galleryRef}
          className={`flex flex-col ${
            currentPage === "detail" ? "invisible" : ""
          }`}
        >
          {/* Gallery Page */}
          <div className="flex-1 flex flex-col justify-between p-4 md:p-8 lg:p-12">
            {/* Bottom Section - Wildlife Text */}
            <div className="relative pb-8 md:pb-12">
              <div className="flex justify-between items-end mb-2 md:mb-4">
                <span className="inline-block rounded-full border-2 px-6 py-2 text-sm font-medium transition-all hover:scale-105 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hero-jelly">
                  Photography
                </span>
                <span className="text-xs md:text-sm lg:text-base">
                  TOP SHOT
                </span>
              </div>
              <div className="text-center">
                <p className="text-xs md:text-sm mb-2">{`[ ${
                  currentPage === "gallery"
                    ? currentGalleryIndex + 1
                    : selectedImage + 1
                } ]`}</p>
                <h1 className="hero-jelly text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
                  QUITE FRAMES
                </h1>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-center gap-6 md:gap-8 mt-6 md:mt-8">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-125 transition-transform duration-300"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28-.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-125 transition-transform duration-300"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-125 transition-transform duration-300"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-125 transition-transform duration-300"
                  aria-label="Pinterest"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                  </svg>
                </a>
              </div>
            </div>
            {/* Middle Section - Main Image with Prev/Next */}
            <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-16 py-8 md:py-12">
              <button
                onClick={handlePrev}
                disabled={currentGalleryIndex === 0}
                className="text-lg md:text-xl lg:text-2xl font-bold hover:scale-110 transition-transform disabled:opacity-30 disabled:cursor-not-allowed"
              >
                [ PREV ]
              </button>

              <div
                className="relative cursor-pointer group"
                onClick={handleCenterImageClick}
              >
                <img
                  ref={centerImageRef}
                  src={
                    animals[currentGalleryIndex].image || "/placeholder.svg"
                  }
                  alt="Featured wildlife"
                  className="hero-jelly h-48 w-40 sm:h-64 sm:w-52 md:h-80 md:w-64 lg:h-96 lg:w-80 object-cover grayscale shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 hidden dark:block mix-blend-color bg-teal-600/30" />
                <div className="absolute w-full h-full inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                  <span className="text-white/70 text-xl md:text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 pl-4">
                    VIEW
                  </span>
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={currentGalleryIndex === animals.length - 1}
                className="text-lg md:text-xl lg:text-2xl font-bold hover:scale-110 transition-transform disabled:opacity-30 disabled:cursor-not-allowed"
              >
                [ NEXT ]
              </button>
            </div>

            {/* Top Section - Image Gallery */}
            <div className="flex-1 flex items-start pt-4 md:pt-8">
              <div className="w-full overflow-hidden">
                <div className="flex gap-2 md:gap-4 lg:gap-6">
                  {animals.map((animal, index) => (
                    <div
                      key={animal.id}
                      onClick={() => handleImageClick(index)}
                      className={`flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        index < 5 ? "md:block" : "md:hidden"
                      } ${index < 7 ? "xl:block" : "xl:hidden"}`}
                    >
                      <div className="relative">
                        <img
                          src={animal.image || "/placeholder.svg"}
                          alt={animal.name}
                          className="hero-jelly h-32 w-24 sm:h-40 sm:w-32 md:h-48 md:w-40 lg:h-56 lg:w-44 object-cover grayscale transition-all duration-500"
                        />
                        <div className="pointer-events-none absolute inset-0 hidden dark:block mix-blend-color bg-teal-600/30" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {typeof document !== "undefined" && currentPage === "detail"
          ? createPortal(
              <div
                ref={detailRef}
                className="fixed inset-0 z-50 text-black dark:text-white flex flex-col backdrop-blur-xl"
                style={{ opacity: 0, transform: 'translateY(50px)' }}
              >
                <button
                  onClick={handleBackToGallery}
                  className="absolute top-4 left-4 md:top-8 md:left-8 z-50 text-2xl md:text-3xl hover:scale-110 transition-transform"
                  aria-label="Close"
                >
                  ✕
                </button>

                {/* Detail Page - Single Screen Layout */}
                <div className="flex-1 flex flex-col p-4 md:p-8 lg:p-12 overflow-auto">
                  {/* Top Section - Images and Info */}
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 min-h-0">
                    {/* Left - Main Image */}
                    <div className="relative flex items-center justify-center overflow-hidden">
                      <img
                        ref={detailImageRef}
                        src={
                          animals[selectedImage].detailImage || "/placeholder.svg"
                        }
                        alt={animals[selectedImage].name}
                        className="hero-jelly w-full h-full object-contain"
                      />
                    </div>

                    {/* Right - Info and Bottom Image */}
                    <div className="flex flex-col gap-4 md:gap-6 min-h-0">
                      {/* Info Section */}
                      <div className="flex-shrink-0 flex flex-col justify-between p-4 md:p-6 lg:p-8">
                        <div className="text-right">
                          <p className="text-xs md:text-sm mb-1 md:mb-2">
                            [ 2025 ]
                          </p>
                          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none">
                            {selectedImage + 1}
                          </h2>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                          <p className="text-center text-xl md:text-2xl">[ + ]</p>

                          <div>
                            <p className="text-xs md:text-sm font-bold mb-1 md:mb-2">
                              [ {animals[selectedImage].name} ]
                            </p>
                            <p className="text-xs md:text-sm lg:text-base leading-relaxed">
                              {animals[selectedImage].description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Image */}
                      <div className="flex-1 relative overflow-hidden min-h-0">
                        <img
                          ref={detailBottomImageRef}
                          src={
                            animals[selectedImage].detailBottomImage ||
                            "/placeholder.svg"
                          }
                          alt={`${animals[selectedImage].name} scene`}
                          className="hero-jelly w-full h-full object-cover grayscale md:block hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer Navigation */}
                  <div className="flex-shrink-0 flex justify-between items-center text-xs md:text-sm mt-4">
                    <button
                      onClick={handleBackToGallery}
                      className="hover:underline"
                    >
                      0{selectedImage + 1}/{animals.length}
                    </button>
                    <div className="flex gap-2 md:gap-4">
                      <button
                        onClick={handleDetailNext}
                        disabled={selectedImage === animals.length - 1}
                        className="hover:underline disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        NEXT
                      </button>
                      <span>/</span>
                      <button
                        onClick={handleDetailPrev}
                        disabled={selectedImage === 0}
                        className="hover:underline disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        PREV
                      </button>
                    </div>
                  </div>
                </div>
              </div>,
              document.body
            )
          : null}
      </div>
      </div>
      );
}
