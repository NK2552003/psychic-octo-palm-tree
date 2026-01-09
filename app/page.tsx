"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Background from "@/components/Background";
import FloatingControls from "@/components/FloatingControls";

import LandingPage from "./pages/landingpage";

import { applyJellyText } from "@/lib/jellyText";
import AboutPage from "./pages/aboutme";
import ScrollAnimation from "./pages/skillsSection";
import SkillsPage from "./pages/skills";
import ProjectsPage from "./pages/projects";
import WildlifePage from "./pages/photography";
import Footer from "./pages/footer";
import ContactSection from "./pages/contact";
import QualificationsSection from "./pages/qualifications";
import { FloatingNav } from "@/components/floatingNav";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  /* ======================================================
     JELLY TEXT — SCROLL REVEAL (VIEWPORT ONLY)
  ====================================================== */
useEffect(() => {
  // Disable jelly animations on small screens to improve mobile performance
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 640px)").matches) {
    // Ensure text is visible even when we skip the reveal animation
    document.querySelectorAll<HTMLElement>(".hero-jelly").forEach((el) => {
      el.style.visibility = "visible";
    });
    return;
  }

  const elements = document.querySelectorAll<HTMLElement>(".hero-jelly");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target as HTMLElement;
        const isFast = el.classList.contains("hero-jelly-fast");

        // 🔓 reveal
        el.style.visibility = "visible";

        applyJellyText(el, 0, isFast ? 0.012 : 0.035);

        observer.unobserve(el);
      });
    },
    {
      threshold: 0.35,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  // For elements already in the viewport, reveal immediately; otherwise hide and observe
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      el.style.visibility = "visible";
      const isFast = el.classList.contains("hero-jelly-fast");
      applyJellyText(el, 0, isFast ? 0.012 : 0.035);
    } else {
      el.style.visibility = "hidden";
      observer.observe(el);
    }
  });

  return () => observer.disconnect();
}, []);

  /* ======================================================
     IMAGE + BACKGROUND ANIMATION
  ====================================================== */
  useEffect(() => {
    const bg = document.querySelector(".image-bg");
    const img = document.querySelector(".image-animate");

    if (bg) {
      gsap.fromTo(
        bg,
        { opacity: 0, scale: 0.94, y: 40, filter: "blur(12px)" },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
        }
      );
    }

    if (img) {
      gsap.fromTo(
        img,
        { opacity: 0, scale: 0.92, y: 30, filter: "grayscale(100%)" },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "grayscale(0%)",
          duration: 1.2,
          ease: "power3.out",
          delay: 0.35,
        }
      );

      gsap.to(img, {
        y: -6,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });
    }
  }, []);

  /* ======================================================
     HEADER ICON JELLY
  ====================================================== */
  useEffect(() => {
    gsap.fromTo(
      ".jelly-icon",
      { opacity: 0, scale: 0.6, y: 10 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(2)",
        delay: 0.4,
      }
    );

    gsap.to(".jelly-icon", {
      scale: 1.08,
      duration: 1.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.25, from: "random" },
      delay: 2,
    });
  }, []);

  /* ======================================================
     MENU OPEN JELLY
  ====================================================== */
  useEffect(() => {
    if (!menuOpen) return;

    document.querySelectorAll(".menu-link").forEach((el, i) => {
      applyJellyText(el as HTMLElement, i * 0.1);
    });
  }, [menuOpen]);

  /* ======================================================
     THEME INIT
  ====================================================== */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (saved === "dark" || (!saved && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = (event?: React.MouseEvent) => {
    setIsDark((prev) => {
      const next = !prev;
      
      // Use View Transition API for smooth theme change
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          document.documentElement.classList.toggle("dark", next);
          localStorage.setItem("theme", next ? "dark" : "light");
        });
      } else {
        // Fallback for browsers without View Transition API
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
      }
      
      return next;
    });
  };

  /* ======================================================
     CTA BORDER
  ====================================================== */
  useEffect(() => {
    gsap.fromTo(
      ".view-work-border",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.7,
        ease: "power3.out",
        delay: 1.1,
      }
    );
  }, []);

  /* ======================================================
     GENIE EFFECT — SCROLL REVEAL
  ====================================================== */
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".genie");
    if (!els || els.length === 0) return;

    els.forEach((el) => {
      gsap.fromTo(
        el,
        { scaleY: 0.16, transformOrigin: "50% 0%", y: 30, opacity: 0 },
        {
          scaleY: 1,
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "elastic.out(1, 0.6)",
          stagger: 0.06,
          scrollTrigger: {
            scroller: document.body,
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ======================================================
     RENDER
  ====================================================== */

  
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      <FloatingNav/>
      <LandingPage />
      <AboutPage/>
      <SkillsPage/>
      <ScrollAnimation/>
      <ProjectsPage/>
      <QualificationsSection/>
      <WildlifePage/>
      <ContactSection/>
      <Footer/>
      <FloatingControls
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    </div>
  );
}
