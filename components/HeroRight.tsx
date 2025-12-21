"use client";
import { Patrick_Hand } from "next/font/google";
import Signature from "./signature";

export const handwriting = Patrick_Hand({
  subsets: ["latin"],
  weight: "400", // Patrick Hand is naturally thick
  variable: "--font-handwriting",
});
const sections = [
  { label: "About Me", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Photography", id: "photography" },
  { label: "Experience", id: "qualifications" },
  { label: "Contact", id: "contact" },
];
export default function HeroRight() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col sm:flex-row gap-10 ">
      <div className="relative group overflow-hidden mx-auto sm:mx-0">
              <img
                src="profile.jpg"
                alt="Nitish Kumar"
                className="image-animate w-[220px] sm:w-[280px] md:[300px] lg:w-[320px] object-cover hero-jelly border-16 sm:border-24 border-stone-700/30 dark:border-[#0c3a3a]"
              />
  {/* OKLCH teal overlay (dark mode only) */}
  <div
    className="
      pointer-events-none
      absolute inset-0
      hidden dark:block
      mix-blend-color
      bg-teal-600/30
    "
  />
              <p
                className={`hero-jelly absolute bottom-12 right-3 text-sm sm:text-lg font-handwriting text-white dark:text-teal-200 ${handwriting.variable}`}
              >
                Code.
              </p>
              <p
                className={`hero-jelly absolute bottom-8 right-3 text-sm sm:text-lg font-handwriting text-white dark:text-teal-200 ${handwriting.variable}`}
              >
                Build.
              </p>
              <p
                className={`hero-jelly absolute bottom-4 right-3 text-sm sm:text-lg font-handwriting text-white dark:text-teal-200 ${handwriting.variable}`}
              >
                Capture.
              </p>
            </div>
             <ul className="hidden md:block space-y-4 text-lg relative -left-6">
          {sections.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(id);
                  if (el) {
                    // compute absolute document Y and use native smooth scroll
                    const rect = el.getBoundingClientRect();
                    const targetY = window.scrollY + rect.top - 12; // adjust offset if needed
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                    // update the URL hash without causing a jump
                    history.replaceState(null, "", `#${id}`);
                  } else {
                    // fallback: navigate to the page for this section (keeps single-page behavior when not mounted)
                    const routeMap: Record<string, string> = {
                      about: "/aboutme",
                      skills: "/skills",
                      projects: "/projects",
                      photography: "/photography",
                      experience: "/qualifications",
                      contact: "/contact",
                    };
                    const path = routeMap[id] ?? "/";
                    window.location.href = `${path}#${id}`;
                  }
                }}
                className="
                  group relative inline-flex items-center
                  hero-jelly cursor-pointer
                  transition-all duration-300 ease-out
                  hover:translate-x-2
                  active:scale-95
                "
              >
                {/* TEXT */}
                <span className="relative">
                  {label}

                  {/* UNDERLINE */}
                  <span
                    className="
                      pointer-events-none
                      absolute left-0 -bottom-1
                      h-[2px] w-full
                      bg-stone-800 dark:bg-teal-300
                      origin-left
                      scale-x-0
                      transition-transform duration-300 ease-out
                      group-hover:scale-x-100
                    "
                  />
                </span>

                {/* ARROW (HIDDEN BY DEFAULT) */}
                <span
                  className="
                    ml-2
                    inline-block
                    opacity-0
                    -translate-x-2
                    transition-all duration-300 ease-out
                    group-hover:opacity-100
                    group-hover:translate-x-0
                  "
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative max-w-md">
       <Signature/>
       <p className="absolute top-16 hero-jelly hero-jelly-fast mt-2 text-sm leading-relaxed text-stone-900 dark:text-teal-300">
              I’m an undergraduate engineering student who enjoys building
              real-world web applications, learning modern technologies, and
              expressing creativity through photography. I love turning ideas
              into functional, meaningful digital experiences.
            </p>
      </div>
    </div>
  );
}
