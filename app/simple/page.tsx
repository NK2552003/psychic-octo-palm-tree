import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PortfolioAssistant from "@/components/PortfolioAssistant";
import SimpleOffline from "@/components/SimpleOffline";
import { portfolioStack } from "@/lib/portfolio-assistant";
import { liveWebsitesData, publishedExtensionsData } from "@/lib/portfolio-projects";
import { qualificationsData } from "@/lib/portfolio-qualifications";
import styles from "./simple.module.css";

export const metadata: Metadata = {
  title: "Simple Portfolio",
  description: "Nitish Kumar — full-stack developer and photographer. Projects, skills, education, and ways to get in touch, in a simple reading view.",
  alternates: { canonical: "https://nitishkr.fun/simple" },
};


const socials = [
  ["GitHub", "https://github.com/nk2552003"],
  ["LinkedIn", "https://www.linkedin.com/in/nk2552003/"],
  ["Instagram", "https://www.instagram.com/natur_hacks/"],
];

function Tags({ items }: { items: string[] }) {
  return <ul className={styles.tags}>{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export default function SimplePortfolio() {
  return (
    <div className={styles.page} lang="en">
      <a className={styles.skip} href="#intro">Skip to content</a>
      <div className={styles.column}>
        <nav className={styles.nav} aria-label="Portfolio sections">
          <span>THE SIMPLE VERSION</span>
          <a href="#stack">Stack</a><a href="#projects">Work</a><a href="#contact">Contact</a>
        </nav>
        <main id="intro">
          <header>
            <div className={styles.identity}>
              <Image src="/profile.jpg" alt="Nitish Kumar" width={112} height={112} priority className={styles.portrait} />
              <div><h1>Nitish Kumar</h1><p className={styles.eyebrow}>Full-stack developer · Photographer</p><span className={styles.note}>B.Tech in Computer Science & Engineering</span></div>
            </div>
            <p className={styles.intro}>I’m a Computer Science graduate and full-stack developer who enjoys building real-world web applications, exploring modern technologies, and expressing creativity through photography. I turn ideas into functional, meaningful digital experiences.</p>
            <div className={styles.actions}><a className={styles.primary} href="mailto:nk2552003@gmail.com">Get in touch ↗</a><Link className={styles.secondary} href="/">Explore interactive portfolio ↗</Link></div>
            <div className={styles.links}>{socials.map(([label, url]) => <a key={label} href={url}>{label}</a>)}</div>
          </header>

          <PortfolioAssistant />
          <SimpleOffline />
          <section id="stack"><h2>Stack</h2><p className={styles.muted}>The tools I use across interfaces, backend systems, mobile apps, and deployment.</p><Tags items={portfolioStack} /></section>

          <section id="projects">
            <div className={styles.sectionHeading}><h2>Projects</h2><a href="https://github.com/nk2552003">All on GitHub ↗</a></div>
            {liveWebsitesData.map(project => <article className={styles.entry} key={project.id}>
              <div className={styles.entryHeading}><h3><a href={project.url}>{project.name} ↗</a></h3><span className={styles.note}>{project.badge}</span></div>
              <p>{project.description}</p><Tags items={project.tags} />
              {project.sourceUrl && <a className={styles.source} href={project.sourceUrl}>Source code ↗</a>}
            </article>)}
          </section>

          <section id="tools"><h2>Extensions & packages</h2>
            {publishedExtensionsData.map(project => <article className={styles.entry} key={project.id}>
              <div className={styles.entryHeading}><h3><a href={project.url}>{project.name} ↗</a></h3><span className={styles.note}>{project.platform}</span></div>
              <p>{project.description}</p><Tags items={project.tags} />
            </article>)}
          </section>

          <section id="education"><h2>Education</h2>
            {qualificationsData.filter(item => item.category === "Education").slice().reverse().map(item => <article className={styles.entry} key={item.title}>
              <div className={styles.entryHeading}><h3>{item.title}</h3><span className={styles.note}>{item.duration}</span></div>
              <p className={styles.institution}>{item.institution}</p><p>{item.description}</p>
              {item.details?.academic?.semesters && <details><summary>Semester results</summary><dl className={styles.results}>{item.details.academic.semesters.map(sem => <div key={sem.sem}><dt>Semester {sem.sem}</dt><dd>{sem.percent}</dd></div>)}</dl></details>}
              <Tags items={item.skills} />
            </article>)}
          </section>

          <section id="learning"><h2>Experience & certifications</h2>
            {qualificationsData.filter(item => item.category === "Certifications").map(item => <article className={styles.entry} key={item.title}>
              <div className={styles.entryHeading}><h3>{item.title}</h3><span className={styles.note}>{item.duration}</span></div>
              <p className={styles.institution}>{item.institution}</p><p>{item.description}</p><Tags items={item.skills} />
            </article>)}
          </section>

          <section id="photography"><h2>Through the lens</h2><p>Beyond code, I express my creativity through nature and wildlife photography. A few frames from my collection:</p>
            <div className={styles.photos}>{[1, 2, 3].map(number => <a key={number} href={`/${number}.jpeg`} aria-label={`View nature photograph ${number}`}><Image src={`/${number}.jpeg`} alt={`Nature photography by Nitish, photograph ${number}`} width={240} height={180} sizes="(max-width: 600px) 30vw, 220px" /></a>)}</div>
            <div className={styles.links}><a href="https://instagram.com/natur_hacks">Instagram ↗</a><a href="https://www.deviantart.com/sidkr222003">DeviantArt ↗</a><a href="https://www.youpic.com/nitish">YouPic ↗</a><a href="https://x.com/Kr222003">X ↗</a></div>
          </section>

          <section id="elsewhere"><h2>Writing & experiments</h2><p>I also share technical writing, interactive CSS and JavaScript experiments, and reusable interface components.</p><div className={styles.links}><a href="https://dev.to/nk2552003">Read on DEV ↗</a><a href="https://codepen.io/rlaqxvbr-the-bashful">CodePen ↗</a><a href="https://uiverse.io/nk2552003">UIverse ↗</a></div></section>
          <section id="recognition"><h2>Recognition</h2><div className={styles.entry}><h3><a href="https://astonishingawards.com/nominee/nitish-portfolio/">Astonishing Awards ↗</a></h3><p>Project Of The Day · October 7, 2026</p></div><div className={styles.entry}><h3><a href="https://wdawards.com/web/an-interactive-dev-portfolio">WDAwards ↗</a></h3><p>Nominee · An Interactive Dev Portfolio</p></div></section>
          <section id="contact" className={styles.contact}><h2>Let’s build something.</h2><p>Have a project in mind or want to connect? Drop me a line.</p><a href="mailto:nk2552003@gmail.com">nk2552003@gmail.com ↗</a></section>
        </main>
      </div>

    </div>
  );
}
