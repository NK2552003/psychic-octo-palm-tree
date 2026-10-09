'use client';

import React from 'react';
import styles from '@/app/simple/simple.module.css';

export default function SimpleNav() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (typeof window !== 'undefined' && window.history?.pushState) {
        window.history.pushState(null, '', `#${id}`);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined' && window.history?.pushState) {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <nav className={styles.nav} aria-label="Portfolio sections">
      <span onClick={scrollToTop} title="Scroll to top">
        THE SIMPLE VERSION
      </span>
      <a href="#stack" onClick={e => scrollTo(e, 'stack')}>
        Stack
      </a>
      <a href="#projects" onClick={e => scrollTo(e, 'projects')}>
        Work
      </a>
      <a href="#contact" onClick={e => scrollTo(e, 'contact')}>
        Contact
      </a>
    </nav>
  );
}
