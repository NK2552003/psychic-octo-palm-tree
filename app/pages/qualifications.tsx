"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, GraduationCap, Award, BookOpen } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SchoolDoodles from '@/components/SchoolDoodles';

gsap.registerPlugin(ScrollTrigger);

interface Qualification {
  category: string;
  title: string;
  institution?: string;
  duration?: string;
  description?: string;
  details?: {
    challenge?: string;
    solution?: string;
    result?: string;
    academic?: {
      semesters?: { sem: number; percent: string }[];
    };
  };
  skills:string[];
} 

const qualificationsData: Qualification[] = [
  {
    category: 'Education',
    title: 'Secondary Schooling',
    institution: 'Honey Modern High School',
    duration: '2018 - 2019',
    description: 'Completed with distinction in Science and Mathematics. Scored 87.6% aggregate',
    skills: ["Mathematics basics", "Science fundamentals", "Analytical thinking", "Time management"]
  },
  {
    category: 'Education',
    title: 'Senior Secondary Schooling',
    institution: 'Hindu Sr. Sec. School',
    duration: '2020 - 2021',
    description: 'Science Stream with 80.2% aggregate',
    skills: ["Physics", "Chemistry", "Mathematics", "Basic programming", "Problem-solving"]
  },
  {
    category: 'Education',
    title: 'B.Tech in Computer Science',
    institution: 'University: Tula\'s Institute, Dehradun aff. VMSBUTU',
    duration: '2022 - Present',
    description: 'Specialized in Software Engineering and Data Structures',
    details: {
      challenge: 'Balancing rigorous coursework with internships and projects.',
      solution: 'Focused on core subjects, practical projects and continuous learning.',
      result: 'Consistent performance and multiple shipped projects.',
      academic: {
        semesters: [
          { sem: 1, percent: '79.58%' },
          { sem: 2, percent: '78.63%' },
          { sem: 3, percent: '83.26%' },
          { sem: 4, percent: '74.56%' },
          { sem: 5, percent: '77.16%' },
          { sem: 6, percent: '77.56%' },
          { sem: 7, percent: 'Ongoing' },
          { sem: 8, percent: 'Pending' },
        ],
      },
    },
    skills: ["Data Structures", "OOP", "DBMS", "Computer Networks", "Python", "Java", "Software engineering"]
  },
  {
    category: 'Certifications',
    title: 'Web Development Internship',
    institution: 'Internshala',
    duration: 'Aug-Oct 2023',
    description:"Completed a web dev internship via Internshala, working with HTML, CSS, JS, React, and Node.js. Scored 67% for practical project contributions.",
    details: {
      challenge: 'Required expertise in modern web technologies and responsive design principles.',
      solution: 'Mastered React, Node.js, and database management through hands-on projects.',
      result: 'Built 12+ responsive web applications serving 10,000+ users.',
    },
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Git", "Team collaboration"]
  },
  {
    category: 'Certifications',
    title: 'App Development',
    institution: 'Flutter & Dart Course - Udemy',
    duration: 'Apr-Jun 2024',
    description:"Completed a Flutter & Dart course on Udemy, learning to build cross-platform mobile apps with responsive UI, state management, and API integration.",
       details: {
      challenge: 'Needed to master cross-platform mobile development for rapid deployment.',
      solution: 'Completed comprehensive Flutter certification covering UI/UX, state management, and API integration.',
      result: 'Successfully deployed 5 production apps with 50% reduced development time.',
    },
    skills: ["Flutter", "Dart", "Mobile UI design", "State management", "REST APIs"]
  },
  {
    category: 'Certifications',
    title: "React Course",
    institution: 'Udemy',
    duration: 'September 2025',
 description:"Pursuing an advanced React course covering components, hooks, state, and SPA architecture to build scalable, responsive web apps.",
    details: {
      challenge: 'Mastering advanced React concepts and SPA architecture for scalable web apps.',
      solution: 'Completed an advanced React course focused on hooks, component architecture, and performance optimization.',
      result: 'Built multiple scalable, responsive SPAs with improved maintainability and speed.',
    },
    skills: ["Advanced React", "Hooks", "Component architecture", "SPA development", "Performance optimization"]
  },
    {
    category: 'Certifications',
    title: "Big Data & Cloud Computing",
    institution: 'Campus Shutra',
    duration: 'November 2025',
        description:"Completed a Big Data & Cloud Computing course at Campus Shutra, learning distributed data processing, cloud infrastructure, and scalable analytics solutions.",
    details: {
      challenge: 'Handling massive datasets and deploying scalable analytics in the cloud.',
      solution: 'Mastered Hadoop, Spark, and AWS cloud services for distributed computing and data engineering.',
      result: 'Built and deployed scalable big data pipelines and cloud-based analytics platforms.',
    },
    skills: ["Big Data", "Cloud Computing", "Hadoop", "Spark", "AWS", "Distributed Systems", "Data Engineering"]
  },
];

const QualificationCard: React.FC<{ qualification: Qualification; index: number }> = ({
  qualification,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (detailsRef.current) {
      if (isExpanded) {
        gsap.to(detailsRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      } else {
        gsap.to(detailsRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
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
              {qualification.institution && (
            <p className="text-foreground/90 text-sm sm:text-base mb-1 hero-jelly">
              {qualification.institution}
            </p>
          )} 
           {qualification.duration && (
            <p className="text-foreground/60 text-sm md:text-base mb-2 hidden md:block hero-jelly">{qualification.duration}</p>
          )} 
           </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-tight hero-jelly">
              {qualification.title}
            </h3> 
          </div> 
       
          {qualification.duration && (
            <p id="qualifications" className="text-foreground/60 text-sm md:text-base mb-2 block md:hidden">{qualification.duration}</p>
          )} 
          {qualification.description && (
            <p className="text-foreground/70 text-sm sm:text-base md:text-lg">
              {qualification.description}
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
              {qualification.details.challenge} {qualification.details.solution} {qualification.details.result}
            </p> 

            {qualification.details.academic?.semesters && (
              <div className="mb-4">
                <h5 className="font-semibold mb-2 text-sm md:text-base">Semesters</h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-xs md:text-sm">
                  {qualification.details.academic.semesters.map((s, idx) => (
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
                      <div className="text-xs text-foreground/70 text-sm md:text-base">{s.percent}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className='border p-2 md:p-4 rounded-xl'>
                <h4 className="font-bold text-sm md:text-base mb-2">Challenge</h4>
                <p className="text-sm text-foreground/70">{qualification.details.challenge}</p>
              </div>
              <div className='border p-2 md:p-4 rounded-xl'>
                <h4 className="font-bold text-sm mb-2">Solution</h4>
                <p className="text-sm text-foreground/70">{qualification.details.solution}</p>
              </div>
              <div className='border p-2 md:p-4 rounded-xl'>
                <h4 className="font-bold text-sm mb-2">Result</h4>
                <p className="text-sm text-foreground/70">{qualification.details.result}</p>
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

  useEffect(() => {
    const cards = document.querySelectorAll('.qual-card');
    if (cards && cards.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 0.12 }
      );
    }

    // Use gsap.context to scope selectors and add ScrollTrigger-based reveals for headings
    const ctx = gsap.context(() => {
      gsap.from('.my-letter', {
        opacity: 0,
        y: 50,
        rotation: 'random(-15, 15)',
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        stagger: 0.08,
        scrollTrigger: {
          trigger: myRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      gsap.fromTo(
        '.journey-letter',
        { opacity: 0, y: 80, scale: 0.9, rotation: 'random(-8, 8)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'back.out(1.2)',
          stagger: 0.06,
          scrollTrigger: {
            trigger: journeyRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
          delay: 0.18,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="p-2 sm:p-12 lg:p-16">
         <span id="qualifications" className="hero-jelly inline-block rounded-full border-2 px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all hover:scale-105 hover:bg-black hover:text-white">
            Qualification & Certifications
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
  <span className="my-letter inline-block" style={{ fontSize: "clamp(10rem, 35vw, 35rem)" }}>
    M
  </span>
  <span className="my-letter inline-block" style={{ fontSize: "clamp(9rem, 30vw, 30rem)" }}>
    Y
  </span>
</span>

<span style={{ fontSize: "clamp(5rem, 16vw, 16rem)" }}></span>

<span ref={journeyRef} className="journey-wrap flex">
  <span className="journey-letter inline-block opacity-0" style={{ fontSize: "clamp(10rem, 34vw, 34rem)" }}>
    J
  </span>
  <span className="journey-letter inline-block opacity-0" style={{ fontSize: "clamp(9rem, 31vw, 31rem)" }}>
    O
  </span>
  <span className="journey-letter inline-block opacity-0" style={{ fontSize: "clamp(10.5rem, 36vw, 36rem)" }}>
    U
  </span>
  <span className="journey-letter inline-block opacity-0" style={{ fontSize: "clamp(9rem, 30vw, 30rem)" }}>
    R
  </span>
  <span className="journey-letter inline-block opacity-0" style={{ fontSize: "clamp(10.5rem, 36vw, 36rem)" }}>
    N
  </span>
  <span className="journey-letter inline-block opacity-0" style={{ fontSize: "clamp(9rem, 30vw, 30rem)" }}>
    E
  </span>
  <span className="journey-letter inline-block opacity-0" style={{ fontSize: "clamp(8rem, 27vw, 27rem)" }}>
    Y
  </span>

            </span>
          </div>
        <div className="">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-foreground/70 text-center mx-auto max-w-3xl mb-8 text-[15px] sm:text-base md:text-lg leading-relaxed italic hero-jelly">
              Every entry below is a short chapter—click to unfold the challenge, the solution, and the result.
            </p>
            <div className="relative">
              <SchoolDoodles />
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