'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import styles from './PortfolioNavigation.module.css';
const routes = [['/','Interactive portfolio'],['/simple','Simple portfolio'],['/contact','Contact'],['/pricing','Pricing'],['/process','How I work'],['/privacy','Privacy'],['/cookies','Cookies']] as const;

export default function PortfolioNavigation() {
  const pathname=usePathname();
  const {setTheme}=useTheme();
  const [open,setOpen]=useState(false);
  const root=useRef<HTMLDivElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    if(!open) return;
    const close=(event:PointerEvent)=>{if(!root.current?.contains(event.target as Node)) setOpen(false);};
    const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);trigger.current?.focus();}};
    document.addEventListener('pointerdown',close);document.addEventListener('keydown',escape);
    return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',escape);};
  },[open]);
  if(pathname==='/') return null;
  return <div ref={root} className={styles.navigation}>
    {open && <nav className={styles.menu} aria-label="Site navigation">{routes.map(([href,label])=><Link href={href} key={href} aria-current={pathname===href?'page':undefined} onClick={()=>setOpen(false)}>{label}<span aria-hidden="true">↗</span></Link>)}</nav>}
    <div className={styles.controls}>
      <button aria-label="Toggle theme" title="Toggle theme" onClick={()=>{
        const dark=!document.documentElement.classList.contains('dark');setTheme(dark?'dark':'light');
        window.dispatchEvent(new CustomEvent('theme-toggled',{detail:{isDark:dark}}));
      }}><span aria-hidden="true">◐</span></button>
      <button ref={trigger} aria-expanded={open} onClick={()=>setOpen(value=>!value)}>Explore <span aria-hidden="true">{open?'−':'+'}</span></button>
    </div>
  </div>;
}
