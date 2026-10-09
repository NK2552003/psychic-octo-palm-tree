"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { t, type LangCode } from '@/lib/i18n'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldReduceAnimations } from "../../lib/deviceDetection";
import Swiper from "swiper";
import { EffectCoverflow, Keyboard, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

gsap.registerPlugin(ScrollTrigger);


export default function WildlifePage() {
  const [currentPage, setCurrentPage] = useState<"gallery" | "detail">("gallery");
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<Swiper | null>(null);
  const swiperContainerRef = useRef<HTMLDivElement | null>(null);
  const centerImageRef = useRef<HTMLImageElement | null>(null);
  const detailImageRef = useRef<HTMLImageElement | null>(null);
  const detailBottomImageRef = useRef<HTMLImageElement | null>(null);
  const quietRef = useRef<HTMLElement | null>(null);
  const framesRef = useRef<HTMLElement | null>(null);
  const [lang, setLang] = useState<LangCode>(typeof window !== 'undefined' ? ((localStorage.getItem('preferredLang') as LangCode) || 'en') : 'en')

  useEffect(() => {
    const onPref = (e: any) => setLang(((e && e.detail) as LangCode) || ((localStorage.getItem('preferredLang') as LangCode) || 'en'))
    window.addEventListener('preferredLangChange', onPref)
    window.addEventListener('storage', onPref)
    return () => {
      window.removeEventListener('preferredLangChange', onPref)
      window.removeEventListener('storage', onPref)
    }
  }, [])

  const splitGraphemes = (s: string) => {
    try { const Seg = (Intl as any).Segmenter; if (typeof Seg === 'function') return Array.from(new Seg(undefined, { granularity: 'grapheme' }).segment(s), (seg: any) => seg.segment) } catch (e) {}
    return Array.from(s)
  }

  const quietSizes = ["clamp(9rem, 30vw, 30rem)", "clamp(9rem, 30vw, 30rem)", "clamp(9rem, 30vw, 30rem)", "clamp(9rem, 30vw, 30rem)", "clamp(9rem, 30vw, 30rem)"]
  const framesSizes = ["clamp(10rem, 34vw, 34rem)", "clamp(9rem, 31vw, 31rem)", "clamp(10.5rem, 36vw, 36rem)", "clamp(9rem, 30vw, 30rem)", "clamp(10.5rem, 36vw, 36rem)", "clamp(9rem, 30vw, 30rem)", "clamp(8rem, 27vw, 27rem)"]
  const [savedScroll, setSavedScroll] = useState<number | null>(null);

  // Nature-themed two-word titles
  const natureTitles = [
    "Silent Woods", "Golden Dawn", "Misty Lake", "Wild Bloom", "Crystal River", "Frosty Peaks", "Sunny Glade", "Hidden Valley",
    "Gentle Breeze", "Emerald Forest", "Shady Grove", "Peaceful Stream", "Starry Night", "Autumn Leaves", "Winter Chill", "Spring Dew",
    "Summer Rain", "Desert Rose", "Ocean Whisper", "Mountain Echo", "Twilight Sky", "Falling Petals", "Dancing Shadows", "Serene Path",
    "Quiet Meadow", "Lush Canopy", "Silver Mist", "Amber Fields", "Cobalt Wave", "Blossom Trail", "Sunset Haze", "Rainy Silence",
    "Moonlit Plains", "Verdant Hills", "Cloudy Summit", "Tranquil Bay", "Willow Shade", "Cedar Light"
  ];

  // Quotes for each image
  const quotes = [
    "Photography is the story I fail to put into words.",
    "A picture is a poem without words.",
    "The best thing about a picture is that it never changes, even when the people in it do.",
    "Taking pictures is savoring life intensely, every hundredth of a second.",
    "You don't take a photograph, you make it.",
    "A photograph is the pause button of life.",
    "When words become unclear, I shall focus with photographs.",
    "Photography helps people to see.",
    "A good snapshot keeps a moment from running away.",
    "The camera is an instrument that teaches people how to see without a camera.",
    "To photograph is to hold one's breath, when all faculties converge to capture fleeting reality.",
    "A great photograph is one that fully expresses what one feels, in the deepest sense, about what is being photographed.",
    "Photography is the beauty of life captured.",
    "A photograph can be an instant of life captured for eternity that will never cease looking back at you.",
    "The whole point of taking pictures is so that you don't have to explain things with words.",
    "A camera is a SAVE button for the mind's eye.",
    "Photography is the only language that can be understood anywhere in the world.",
    "A photograph is a secret about a secret. The more it tells you the less you know.",
    "The eye should learn to listen before it looks.",
    "A thing that you see in my pictures is that I was not afraid to fall in love with these people.",
    "The picture that you took with your camera is the imagination you want to create with reality.",
    "A photograph is memory in the raw.",
    "A photo is not just an image, it's a memory.",
    "A photograph is the pause button of life.",
    "Photography is the art of frozen time… the ability to store emotion and feelings within a frame.",
    "A photograph is a return ticket to a moment otherwise gone.",
    "A photograph is the only language that can be understood anywhere in the world.",
    "A photograph is a moment—when you press the button, it will never come back.",
    "A photograph is a way of feeling, of touching, of loving.",
    "A photograph is a memory in the raw.",
    "A photograph is the pause button of life.",
    "A photograph is the story I fail to put into words.",
    "A photograph is the beauty of life captured.",
    "A photograph is a secret about a secret. The more it tells you the less you know.",
    "A photograph is a return ticket to a moment otherwise gone.",
    "A photograph is the only language that can be understood anywhere in the world.",
    "A photograph is a moment—when you press the button, it will never come back."
  ];

  // Build images array
  const images = Array.from({ length: 38 }, (_, i) => ({
    id: i + 1,
    name: natureTitles[i % natureTitles.length],
    image: `/${i + 1}.jpeg`,
    detailImage: `/${i + 1}.jpeg`,
    detailBottomImage: `/${((i + 1) % 38) + 1}.jpeg`,
    quote: quotes[i % quotes.length],
  }));

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
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  useEffect(() => {
    if (!swiperContainerRef.current) return;

    const swiper = new Swiper(swiperContainerRef.current, {
      modules: [EffectCoverflow, Keyboard, Mousewheel],
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      slideToClickedSlide: true,
      loop: true,
      loopAdditionalSlides: 5,
      coverflowEffect: {
        rotate: 0,
        stretch: "50%",
        depth: 140,
        modifier: 1,
        slideShadows: false,
      },
      keyboard: {
        enabled: true,
      },
      mousewheel: {
        thresholdDelta: 70,
      },
      on: {
        slideChange: (s) => {
          setCurrentGalleryIndex(s.realIndex);
        },
      },
    });

    swiperRef.current = swiper;

    return () => {
      swiper.destroy(true, true);
    };
  }, []);

  useEffect(() => {
    if (currentPage === "gallery" && swiperRef.current) {
      setTimeout(() => {
        swiperRef.current?.update();
      }, 50);
    }
  }, [currentPage]);

  const handleDetailNext = () => {
    if (selectedImage < images.length - 1) {
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
    }

    if (currentPage === "detail") {
      document.body.style.overflow = "hidden";
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        if (detailRef.current) {
          animate(detailRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, 0.8);
        }
      }, 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [currentPage]);

  // Title letters animation (match Qualifications "MY JOURNEY" style)
  useEffect(() => {
    const reduceAnimations = shouldReduceAnimations();

    const ctx = gsap.context(() => {
      if (reduceAnimations) {
        document.querySelectorAll<HTMLElement>(".quiet-letter, .frames-letter").forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
        return;
      }

      gsap.from(".quiet-letter", {
        opacity: 0,
        y: 50,
        rotation: "random(-15, 15)",
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.08,
        scrollTrigger: {
          trigger: quietRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.fromTo(
        ".frames-letter",
        { opacity: 0, y: 80, scale: 0.9, rotation: "random(-8, 8)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.2)",
          stagger: 0.06,
          scrollTrigger: {
            trigger: framesRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
          delay: 0.18,
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Measure image width based on aspect ratio and fixed height
  useEffect(() => {
    const measureImageWidth = () => {
      if (centerImageRef.current) {
        const img = centerImageRef.current;
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        const displayHeight = img.offsetHeight;
        
        if (naturalWidth && naturalHeight && displayHeight) {
          // Calculate width based on aspect ratio and current display height
          const calculatedWidth = (naturalWidth / naturalHeight) * displayHeight;
          setContainerWidth(calculatedWidth);
        }
      }
    };

    const img = centerImageRef.current;
    if (img) {
      if (img.complete && img.naturalWidth) {
        measureImageWidth();
      } else {
        img.addEventListener('load', measureImageWidth);
        return () => img.removeEventListener('load', measureImageWidth);
      }
    }
  }, [currentGalleryIndex]);

  return (
    <div ref={pageRef} className="relative">
      <style>{`
        @keyframes clipMe {
          0%, 100% { clip-path: inset(0px 0px calc(100% - 2px) 0px); }
          25% { clip-path: inset(0px 0px 0px calc(100% - 2px)); }
          50% { clip-path: inset(calc(100% - 2px) 0px 0px 0px); }
          75% { clip-path: inset(0px calc(100% - 2px) 0px 0px); }
        }

        .animated-border-container {
          position: relative;
          display: inline-block;
          transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          overflow: hidden;
        }

        .animated-border-container::before,
        .animated-border-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 2px solid #69ca62;
          pointer-events: none;
          z-index: 10;
          animation: clipMe 8s linear infinite;
          background: transparent;
        }

        .dark .animated-border-container::before,
        .dark .animated-border-container::after {
          border: 2px solid var(--primary);
        }

        .animated-border-container::after {
          animation-delay: -4s;
        }

        .image-wrapper {
          width: auto;
          height: auto;
          display: block;
          overflow: hidden;
        }

        .photo-swiper {
          width: 100%;
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
          overflow: visible !important;
        }

        .photo-swiper .swiper-slide {
          width: clamp(17.5rem, 32vw, 29rem);
          height: clamp(11rem, 20vw, 18.125rem);
          max-width: 86vw;
          border-radius: 0 !important;
          overflow: hidden;
          box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          transition: filter 0.4s ease, opacity 0.4s ease, box-shadow 0.4s ease;
          filter: brightness(0.72);
        }

        .photo-swiper .swiper-slide-active {
          filter: brightness(1);
          box-shadow:
            0 12px 24px -6px rgba(0, 0, 0, 0.6),
            0 24px 44px -10px rgba(0, 0, 0, 0.75),
            0 0 0 1.5px rgba(255, 255, 255, 0.35);
        }

        .light .photo-swiper .swiper-slide {
          box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.1);
        }

        .light .photo-swiper .swiper-slide-active {
          box-shadow:
            0 12px 24px -6px rgba(0, 0, 0, 0.15),
            0 24px 44px -10px rgba(0, 0, 0, 0.22),
            0 0 0 1.5px rgba(0, 0, 0, 0.35);
        }

        /* Inactive slides: grayscale and dimmed */
        .photo-swiper .swiper-slide .photo-card-img {
          filter: grayscale(100%) contrast(1.05);
          transition: filter 0.5s ease, transform 0.7s ease-out;
        }

        .photo-swiper .swiper-slide .photo-card-overlay {
          opacity: 1;
        }

        /* Side card hover preview */
        .photo-swiper .swiper-slide:hover:not(.swiper-slide-active) .photo-card-img {
          filter: grayscale(50%) contrast(1.05);
        }

        .photo-swiper .swiper-slide:hover:not(.swiper-slide-active) .photo-card-overlay {
          opacity: 0.5;
        }

        /* Active slide: ONLY active color stays colorful! */
        .photo-swiper .swiper-slide-active .photo-card-img {
          filter: grayscale(0%) contrast(1) !important;
        }

        .photo-swiper .swiper-slide-active .photo-card-overlay {
          opacity: 0 !important;
        }

        /* Bottom blur to top transparent overlay (revealed only on active slide hover) */
        .card-hover-blur-overlay {
          opacity: 0;
          transition: opacity 0.4s ease;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.45) 50%, rgba(0, 0, 0, 0) 100%);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 45%, rgba(0, 0, 0, 0) 90%);
          -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 45%, rgba(0, 0, 0, 0) 90%);
        }

        .photo-swiper .swiper-slide-active:hover .card-hover-blur-overlay,
        .photo-swiper .swiper-slide-active:focus-within .card-hover-blur-overlay {
          opacity: 1;
        }

        /* Slide card content (revealed ONLY on active slide hover) */
        .slide-card-content {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1), transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
          pointer-events: none;
          width: 100%;
        }

        .photo-swiper .swiper-slide-active:hover .slide-card-content,
        .photo-swiper .swiper-slide-active:focus-within .slide-card-content {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* Support touch devices without hover */
        @media (hover: none) {
          .photo-swiper .swiper-slide-active .card-hover-blur-overlay {
            opacity: 1;
          }
          .photo-swiper .swiper-slide-active .slide-card-content {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }
        }

        .photo-swiper .swiper-3d .swiper-slide-shadow,
        .photo-swiper .swiper-3d .swiper-slide-shadow-left,
        .photo-swiper .swiper-3d .swiper-slide-shadow-right,
        .photo-swiper .swiper-3d .swiper-slide-shadow-coverflow-left,
        .photo-swiper .swiper-3d .swiper-slide-shadow-coverflow-right {
          display: none !important;
          opacity: 0 !important;
          background-image: none !important;
        }

        /* Carousel edge blur and fade vignettes (matching website background in dark & light mode) */
        .carousel-edge-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: clamp(2.5rem, 8vw, 8.5rem);
          pointer-events: none;
          z-index: 20;
        }

        .carousel-edge-fade-left {
          left: 0;
          background: linear-gradient(
            to right,
            var(--background) 0%,
            color-mix(in srgb, var(--background) 80%, transparent) 45%,
            transparent 100%
          );
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          mask-image: linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.6) 45%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.6) 45%, transparent 100%);
        }

        .carousel-edge-fade-right {
          right: 0;
          background: linear-gradient(
            to left,
            var(--background) 0%,
            color-mix(in srgb, var(--background) 80%, transparent) 45%,
            transparent 100%
          );
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          mask-image: linear-gradient(to left, black 0%, rgba(0, 0, 0, 0.6) 45%, transparent 100%);
          -webkit-mask-image: linear-gradient(to left, black 0%, rgba(0, 0, 0, 0.6) 45%, transparent 100%);
        }

        /* Themed card arrow button (Light: crisp white / Dark: electric teal) */
        .photo-card-arrow-btn {
          background-color: #ffffff;
          color: #1c1917;
          border-color: #ffffff;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .photo-card-arrow-btn:hover {
          background-color: #1c1917;
          color: #ffffff;
          border-color: #1c1917;
        }

        :global(.dark) .photo-card-arrow-btn,
        .dark .photo-card-arrow-btn {
          background-color: #2dd4bf;
          color: #042f2e;
          border-color: #2dd4bf;
        }

        :global(.dark) .photo-card-arrow-btn:hover,
        .dark .photo-card-arrow-btn:hover {
          background-color: #5eead4;
          color: #021a19;
          border-color: #5eead4;
        }

        /* Detail modal animated theme grid background */
        .detail-grid-bg {
          width: 100%;
          height: 100%;
          background-size: 32px 32px;
          background-image:
            linear-gradient(to right, rgba(0, 0, 0, 0.09) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.09) 1px, transparent 1px);
          opacity: 0.45;
          animation: gridPulse 6s ease-in-out infinite;
        }

        :global(.dark) .detail-grid-bg,
        .dark .detail-grid-bg {
          background-image:
            linear-gradient(to right, rgba(45, 212, 191, 0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(45, 212, 191, 0.18) 1px, transparent 1px);
        }
      `}</style>

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
                <span data-i18n="photography.badge" id="photography" className="inline-block rounded-full border-2 px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all hover:scale-105 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                  Photography
                </span>
                <span data-i18n="photography.top" className="text-xs md:text-sm lg:text-base">
                  TOP SHOT
                </span>
              </div>
              <div className="text-center">
                <p className="text-xs md:text-sm mb-2">{`[ ${
                  currentPage === "gallery"
                    ? currentGalleryIndex + 1
                    : selectedImage + 1
                } ]`}</p>
                <div className="leading-none tracking-tight flex items-center justify-center" style={{ transform: "scaleX(0.3)", fontFamily: "var(--font-bebas), sans-serif", fontWeight: "700" }}>
                  <span ref={quietRef} className="quiet-wrap flex">
                    {(() => {
                      const left = t('photography.title.left', lang) || ''
                      return splitGraphemes(left).map((ch, i) => (
                        <span key={`quiet-${i}`} className="quiet-letter inline-block" style={{ fontSize: quietSizes[i] ?? 'clamp(9rem, 30vw, 30rem)' }}>{ch}</span>
                      ))
                    })()}
                  </span>

                  <span style={{ fontSize: "clamp(5rem, 16vw, 16rem)" }}></span>

                  <span ref={framesRef} className="frames-wrap flex">
                    {(() => {
                      const right = t('photography.title.right', lang) || ''
                      return splitGraphemes(right).map((ch, i) => (
                        <span key={`frames-${i}`} className="frames-letter inline-block opacity-0" style={{ fontSize: framesSizes[i] ?? 'clamp(9rem, 30vw, 30rem)' }}>{ch}</span>
                      ))
                    })()}
                  </span>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-center gap-6 md:gap-8 mt-6 md:mt-8">
                <a
                  href="https://instagram.com/natur_hacks"
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
                  href="https://x.com/Kr222003"
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
                {/* DeviantArt */}
                <a
                  href="https://www.deviantart.com/sidkr222003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-125 transition-transform duration-300"
                  aria-label="DeviantArt"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.512V0h-4.512l-.318.318-2.198 4.194-.651.445H0v6.734h13.06l.318.318-2.198 4.194-.651.445H0V24h4.512l.318-.318 2.198-4.194.651-.445H24v-6.734H10.94l-.318-.318 2.198-4.194.651-.445H24z" />
                  </svg>
                </a>
                <a
                  href="https://www.youpic.com/nitish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-125 transition-transform duration-300"
                  aria-label="DeviantArt"
                >
                  <span className="font-extrabold">[YouPic]</span>
                </a>

              </div>
            </div>
            {/* ── Centered 3D Coverflow Carousel ── */}
            <div className="relative w-full max-w-[96rem] mx-auto py-6 md:py-10 flex flex-col items-center">
              {/* Carousel Viewport with Left & Right Soft Blur Vignettes */}
              <div className="relative w-full overflow-x-clip overflow-y-visible">
                {/* Soft Edge Blur Vignettes (adapts to light & dark mode background) */}
                <div className="carousel-edge-fade carousel-edge-fade-left" aria-hidden="true" />
                <div className="carousel-edge-fade carousel-edge-fade-right" aria-hidden="true" />

                {/* Swiper Container */}
                <div ref={swiperContainerRef} className="swiper photo-swiper w-full select-none">
                <div className="swiper-wrapper">
                  {images.map((img, index) => (
                    <div
                      key={img.id}
                      className="swiper-slide cursor-pointer group relative overflow-hidden rounded-none"
                      onClick={() => {
                        if (currentGalleryIndex === index) {
                          handleImageClick(index);
                        }
                      }}
                    >
                      {/* Card Background Image */}
                      <img
                        src={img.image}
                        alt={t(`photography.title.${index}`, lang) || img.name}
                        className="photo-card-img absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                        loading="eager"
                      />

                      {/* Inactive card overlays (matching Landing Page Hero filter in dark and light mode) */}
                      <div className="photo-card-overlay pointer-events-none absolute inset-0 transition-opacity duration-500 z-[1]">
                        {/* Light mode: clean monochrome stone overlay */}
                        <div className="absolute inset-0 bg-stone-900/25 dark:hidden mix-blend-multiply" />
                        {/* Dark mode: exact Hero OKLCH teal mix-blend overlay */}
                        <div className="absolute inset-0 hidden dark:block mix-blend-color bg-teal-600/35" />
                        <div className="absolute inset-0 hidden dark:block bg-[#042f2e]/25 mix-blend-multiply" />
                      </div>

                      {/* Bottom blur to top transparent overlay (revealed only on active slide hover) */}
                      <div className="card-hover-blur-overlay pointer-events-none absolute inset-0 z-[2]" />

                      {/* Card Content (revealed only on active slide hover) */}
                      <div className="slide-card-content relative z-10 w-full p-4 sm:p-5 md:p-6 flex items-end justify-between gap-3 sm:gap-4 text-left">
                        {/* Text Information on the Left */}
                        <div className="flex-1 min-w-0 pr-1 sm:pr-2">
                          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-stone-300 dark:text-teal-400/90 mb-1 block">
                            0{img.id} · WILDLIFE
                          </span>
                          <h2 className="text-white font-bold text-base sm:text-lg md:text-xl tracking-wide uppercase mb-1 font-display drop-shadow truncate">
                            {t(`photography.title.${index}`, lang) || img.name}
                          </h2>
                          <p className="text-stone-300/90 text-[11px] sm:text-xs leading-relaxed line-clamp-2 font-light drop-shadow">
                            {t(`photography.quote.${index}`, lang) || img.quote}
                          </p>
                        </div>

                        {/* Arrow Button Only on the Right Side (adapts to light & dark theme) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageClick(index);
                          }}
                          aria-label={`View ${img.name}`}
                          className="photo-card-arrow-btn flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center rounded-none border hover:scale-105 active:scale-95 transition-all shadow-xl group/btn mb-0.5 cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls (PREV / NEXT and numbering) moved to the bottom of the carousel */}
            <div className="flex items-center justify-between w-full max-w-md px-6 pt-6 md:pt-10 z-20 relative select-none">
                <button
                  onClick={handlePrev}
                  className="text-sm md:text-base font-mono font-bold hover:scale-110 transition-transform uppercase tracking-wider text-stone-600 dark:text-stone-300 hover:text-black dark:hover:text-white cursor-pointer"
                  aria-label="Previous Photo"
                >
                  [ PREV ]
                </button>
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  {currentGalleryIndex + 1} / {images.length}
                </span>
                <button
                  onClick={handleNext}
                  className="text-sm md:text-base font-mono font-bold hover:scale-110 transition-transform uppercase tracking-wider text-stone-600 dark:text-stone-300 hover:text-black dark:hover:text-white cursor-pointer"
                  aria-label="Next Photo"
                >
                  [ NEXT ]
                </button>
              </div>
            </div>
          </div>
        </div>

        {currentPage === "detail" && typeof window !== "undefined"
          ? createPortal(
              <div
                ref={detailRef}
                className="fixed inset-0 z-50 flex flex-col backdrop-blur-xl bg-background/95 text-foreground transition-colors duration-300"
                style={{ opacity: 0, transform: 'translateY(50px)' }}
              >
                {/* Background Grid Pattern (matches site's animated theme grid in light & dark mode) */}
                <div className="pointer-events-none absolute inset-0 detail-grid-bg z-0 select-none" aria-hidden="true" />

                <button
                  onClick={handleBackToGallery}
                  className="absolute top-4 left-4 md:top-8 md:left-8 z-50 text-2xl md:text-3xl hover:scale-110 transition-transform text-foreground hover:text-stone-500 dark:hover:text-teal-400 cursor-pointer"
                  aria-label="Close"
                >
                  ✕
                </button>

                {/* Detail Page - Single Screen Layout */}
                <div className="flex-1 flex flex-col p-4 md:p-8 lg:p-12 overflow-auto relative z-10">
                  {/* Top Section - Images and Info */}
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 min-h-0">
                    {/* Left - Main Image */}
                    <div className="relative flex items-center justify-center overflow-hidden min-h-[300px]">
                      <img
                        ref={detailImageRef}
                        src={images[selectedImage].detailImage}
                        alt={t(`photography.title.${selectedImage}`, lang)}
                        className="w-full h-full object-contain max-h-[70vh]"
                        onError={(e) => {
                          console.error('Image failed to load:', images[selectedImage].detailImage);
                        }}
                      />
                    </div>

                    {/* Right - Info and Bottom Image */}
                    <div className="flex flex-col gap-4 md:gap-6 min-h-0">
                      {/* Info Section */}
                      <div className="flex-shrink-0 flex flex-col justify-between p-4 md:p-6 lg:p-8">
                        <div className="text-right">
                          <p className="text-xs md:text-sm mb-1 md:mb-2 text-stone-500 dark:text-teal-400/90 font-mono">
                            [ 2025 ]
                          </p>
                          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none font-display text-foreground">
                            {selectedImage + 1}
                          </h2>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                          <p className="text-center text-xl md:text-2xl text-stone-400 dark:text-teal-500/70 font-mono">[ + ]</p>

                          <div>
                            <p className="text-xs md:text-sm font-bold mb-1 md:mb-2 font-display tracking-wider uppercase text-foreground">
                              [ {t(`photography.title.${selectedImage}`, lang)} ]
                            </p>
                            <p className="text-xs md:text-sm lg:text-base leading-relaxed text-stone-600 dark:text-stone-300 font-light">
                              {t(`photography.quote.${selectedImage}`, lang)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Image */}
                      <div className="flex-1 relative overflow-hidden min-h-[200px] border border-stone-300/40 dark:border-teal-900/40">
                        <img
                          ref={detailBottomImageRef}
                          src={images[selectedImage].detailBottomImage}
                          alt={`${t(`photography.title.${selectedImage}`, lang)} scene`}
                          className="w-full h-full object-cover grayscale md:block hidden"
                          onError={(e) => {
                            console.error('Bottom image failed to load:', images[selectedImage].detailBottomImage);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer Navigation */}
                  <div className="flex-shrink-0 flex justify-between items-center text-xs md:text-sm mt-4 text-stone-600 dark:text-stone-400 font-mono">
                    <button
                      onClick={handleBackToGallery}
                      className="hover:underline hover:text-foreground cursor-pointer"
                    >
                      0{selectedImage + 1}/{images.length}
                    </button>
                    <div className="flex gap-2 md:gap-4 items-center">
                      <button
                        onClick={handleDetailNext}
                        disabled={selectedImage === images.length - 1}
                        className="hover:underline hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        NEXT
                      </button>
                      <span className="opacity-40">/</span>
                      <button
                        onClick={handleDetailPrev}
                        disabled={selectedImage === 0}
                        className="hover:underline hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
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

      {/* Ambient background silhouettes from aquatic theme */}
      <img
        src="https://cdn.pixabay.com/photo/2021/11/04/19/39/jellyfish-6769173_960_720.png"
        alt=""
        className="pointer-events-none absolute -top-16 -left-28 w-72 md:w-96 opacity-[0.03] dark:opacity-[0.07] z-0 select-none"
      />
      <img
        src="https://cdn.pixabay.com/photo/2012/04/13/13/57/scallop-32506_960_720.png"
        alt=""
        className="pointer-events-none absolute -bottom-8 -right-10 w-36 md:w-44 opacity-[0.03] dark:opacity-[0.07] z-0 select-none"
      />
    </div>
  );
}