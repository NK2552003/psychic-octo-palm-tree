"use client";

import { qualificationsData, type Qualification } from "@/lib/portfolio-qualifications";
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, GraduationCap, Award, BookOpen } from 'lucide-react';
import { gsap } from 'gsap';
import { t, type LangCode } from '@/lib/i18n'

const QualificationCard: React.FC<{ qualification: Qualification; index: number; lang: LangCode }> = ({
  qualification,
  index,
  lang,
}) => {
  const getTrans = (key: string, fallback?: string) => {
    try {
      const val = t(key, lang)
      return val === key ? (fallback ?? '') : val
    } catch (e) { return fallback ?? '' }
  }
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (detailsRef.current) {
      if (isExpanded) {
        gsap.to(detailsRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(detailsRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
        });
      }
    }
  }, [isExpanded]);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const isNonExpandable =
    qualification.title === 'Secondary Schooling' ||
    qualification.title === 'Senior Secondary Schooling';

  return (
    <div
      ref={cardRef}
      className={`border-b border-border-1 py-6 transition-colors duration-300 ${
        !isNonExpandable ? 'cursor-pointer hover:bg-background/5' : ''
      }`}
      onClick={isNonExpandable ? undefined : handleClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
           <div className='flex w-full justify-between '>
              {(getTrans(`qual.entry.${index}.institution`, qualification.institution)) && (
            <p className="text-foreground/90 text-sm sm:text-base mb-1 hero-jelly">
              {getTrans(`qual.entry.${index}.institution`, qualification.institution)}
            </p>
          )} 
           {(getTrans(`qual.entry.${index}.duration`, qualification.duration)) && (
            <p className="text-foreground/60 text-sm md:text-base mb-2 hidden md:block hero-jelly">{getTrans(`qual.entry.${index}.duration`, qualification.duration)}</p>
          )} 
           </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-tight hero-jelly">
              {getTrans(`qual.entry.${index}.title`, qualification.title)}
            </h3> 
          </div> 
       
          {(getTrans(`qual.entry.${index}.duration`, qualification.duration)) && (
            <p id="qualifications" className="text-foreground/60 text-sm md:text-base mb-2 block md:hidden">{getTrans(`qual.entry.${index}.duration`, qualification.duration)}</p>
          )} 
          {(getTrans(`qual.entry.${index}.description`, qualification.description)) && (
            <p className="text-foreground/70 text-sm sm:text-base md:text-lg">
              {getTrans(`qual.entry.${index}.description`, qualification.description)}
            </p>
          )} 
        </div>
        {!isNonExpandable && (
          <div className="flex-shrink-0 mt-12 md:mt-9 fixed right-0 md:right-8">
            <ChevronDown
              className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-foreground/70 transition-transform duration-300 dark:text-primary ${
                isExpanded ? 'rotate-180' : ''
              }`}
              aria-hidden
            />
          </div>
        )} 
      </div>

      {qualification.details && (
        <div
          ref={detailsRef}
          className="overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="mt-6 pt-6 border-t border-border/30">
            <p className="text-sm md:text-base text-foreground/70 italic mb-4">
              {qualification.details && (
                <>
                  {getTrans(`qual.entry.${index}.details.challenge`, qualification.details.challenge)} {getTrans(`qual.entry.${index}.details.solution`, qualification.details.solution)} {getTrans(`qual.entry.${index}.details.result`, qualification.details.result)}
                </>
              )}
            </p>

            {qualification.details.academic?.semesters && (
              <div className="mb-4">
                <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                  <h5 data-i18n="qual.semesters" className="font-semibold text-sm md:text-base">{t('qual.semesters', lang)}</h5>
                  {qualification.details.academic.cgpa && (
                    <span className="text-xs sm:text-sm font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                      Grand CGPA: {qualification.details.academic.cgpa} {qualification.details.academic.division ? `• ${qualification.details.academic.division}` : ''}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-xs md:text-sm">
                  {qualification.details.academic.semesters.map((s, idx) => {
                    const displayPercent = s.percent === 'Ongoing' ? t('qual.status.ongoing', lang) : s.percent === 'Pending' ? t('qual.status.pending', lang) : s.percent
                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-md border text-center ${
                          s.percent === 'Ongoing'
                            ? 'bg-accent/10 border-accent/30'
                            : s.percent === 'Pending'
                            ? 'bg-background/20 border-dashed border-border/30'
                            : 'bg-card/80 border-border/10'
                        }`}>
                        <div className="font-semibold text-sm md:text-base">S{s.sem}</div>
                        <div className="text-foreground/70 text-sm md:text-base">{displayPercent}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className='border p-2 md:p-4 rounded-xl'>
                <h4 data-i18n="qual.challenge" className="font-bold text-sm md:text-base mb-2">{t('qual.challenge', lang)}</h4>
                <p className="text-sm text-foreground/70">{getTrans(`qual.entry.${index}.details.challenge`, qualification.details.challenge)}</p>
              </div>
              <div className='border p-2 md:p-4 rounded-xl'>
                <h4 data-i18n="qual.solution" className="font-bold text-sm mb-2">{t('qual.solution', lang)}</h4>
                <p className="text-sm text-foreground/70">{getTrans(`qual.entry.${index}.details.solution`, qualification.details.solution)}</p>
              </div>
              <div className='border p-2 md:p-4 rounded-xl'>
                <h4 data-i18n="qual.result" className="font-bold text-sm mb-2">{t('qual.result', lang)}</h4>
                <p className="text-sm text-foreground/70">{getTrans(`qual.entry.${index}.details.result`, qualification.details.result)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function QualificationsSection() {
  const myRef = useRef<HTMLElement | null>(null);
  const journeyRef = useRef<HTMLElement | null>(null);

  const splitGraphemes = (s: string) => {
    try { const Seg = (Intl as any).Segmenter; if (typeof Seg === 'function') return Array.from(new Seg(undefined, { granularity: 'grapheme' }).segment(s), (seg: any) => seg.segment) } catch (e) {}
    return Array.from(s)
  }

  const mySizes = ["clamp(10rem, 35vw, 35rem)", "clamp(9rem, 30vw, 30rem)"]
  const journeySizes = ["clamp(10rem, 34vw, 34rem)", "clamp(9rem, 31vw, 31rem)", "clamp(10.5rem, 36vw, 36rem)", "clamp(9rem, 30vw, 30rem)", "clamp(10.5rem, 36vw, 36rem)", "clamp(9rem, 30vw, 30rem)", "clamp(8rem, 27vw, 27rem)"]
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

  useEffect(() => {
    const cards = document.querySelectorAll('.qual-card');
    if (cards && cards.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.08 }
      );
    }

    // Use gsap.context to scope selectors and add ScrollTrigger-based reveals for headings
    const ctx = gsap.context(() => {
      gsap.from('.my-letter', {
        opacity: 0,
        y: 30,
        rotation: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: myRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      gsap.fromTo(
        '.journey-letter',
        { opacity: 0, y: 40, scale: 0.95, rotation: 0 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.04,
          scrollTrigger: {
            trigger: journeyRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
          delay: 0.1,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="p-2 sm:p-12 lg:p-16">
         <span id="qualifications" data-i18n="qual.badge" className="hero-jelly inline-block rounded-full border-2 px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all hover:scale-105 hover:bg-black hover:text-white">
            {t('qual.badge', lang)}
          </span>
      <div className="max-w-7xl mx-auto">
        <div
            className="leading-none tracking-tighter flex items-start justify-center"
            style={{
              transform: "scaleX(0.3)",
              fontFamily: "var(--font-bebas), sans-serif",
              fontWeight: "700",
            }}
          >
          <span ref={myRef} className="my-wrap flex">
  {(() => {
    const left = t('qual.title.left', lang) || ''
    return splitGraphemes(left).map((ch, i) => (
      <span key={`my-${i}`} className="my-letter inline-block" style={{ fontSize: mySizes[i] ?? 'clamp(9rem, 30vw, 30rem)' }}>{ch}</span>
    ))
  })()}
</span>

<span style={{ fontSize: "clamp(5rem, 16vw, 16rem)" }}></span>

<span ref={journeyRef} className="journey-wrap flex">
  {(() => {
    const right = t('qual.title.right', lang) || ''
    return splitGraphemes(right).map((ch, i) => (
      <span key={`journey-${i}`} className="journey-letter inline-block opacity-0" style={{ fontSize: journeySizes[i] ?? 'clamp(9rem, 30vw, 30rem)' }}>{ch}</span>
    ))
  })()}

            </span> 
          </div>
        <div className="">
          <div className="p-6 sm:p-8 lg:p-10">
            <p data-i18n="qual.intro" className="text-foreground/70 text-center mx-auto max-w-3xl mb-8 text-[15px] sm:text-base md:text-lg leading-relaxed italic hero-jelly">
              {t('qual.intro', lang)}
            </p>
            <div className="relative">
              {/* vertical timeline line (desktop) */}
              <div className="block absolute left-[23px] md:left-[32px] top-12 bottom-8 w-[2px] bg-border/80 pointer-events-none" aria-hidden />
              <div className="space-y-6">
                {qualificationsData.map((qualification, index) => (
                  <div key={index} className="relative pl-14 sm:pl-20">
                    <div className="absolute left-2 top-8 sm:top-9 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-card border border-border">
                      {qualification.category === 'Education' ? (
                        <GraduationCap className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-foreground/90" />
                      ) : qualification.category === 'Certifications' ? (
                        <Award className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-foreground/90" />
                      ) : (
                        <BookOpen className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-foreground/90" />
                      )}
                      <span className="sr-only">{qualification.category}</span>
                    </div>
                    <div className="qual-card">
                      <QualificationCard
                        qualification={qualification}
                        index={index}
                        lang={lang}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}