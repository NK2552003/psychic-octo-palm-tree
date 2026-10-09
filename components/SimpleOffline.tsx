'use client';
import { useEffect, useState } from 'react';

export default function SimpleOffline() {
  const [status,setStatus]=useState('Answers run locally. Preparing offline access…');
  useEffect(()=>{
    let active=true;
    const update=(text:string)=>{if(active)setStatus(text);};
    if(process.env.NODE_ENV!=='production') {
      update('Answers run locally. Offline page caching is enabled in production.');
      return;
    }
    if(!('serviceWorker' in navigator)) {
      update('Answers work offline while this page stays open. Offline reload is unavailable in this browser.');
      return;
    }
    async function prepare() {
      try {
        await navigator.serviceWorker.register('/sw.js');
        const registration=await navigator.serviceWorker.ready;
        await document.fonts.ready;
        const assets=performance.getEntriesByType('resource').map(entry=>entry.name).filter(name=>{
          const url=new URL(name,location.href);
          return url.origin===location.origin && (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/_next/image'));
        });
        const urls=[...new Set(['/simple','/profile.jpg','/1.jpeg','/2.jpeg','/3.jpeg',...assets])];
        const channel=new MessageChannel();
        await new Promise<void>((resolve,reject)=>{
          const timeout=setTimeout(()=>{channel.port1.close();reject(new Error('Offline preparation timed out'));},20000);
          channel.port1.onmessage=event=>{
            clearTimeout(timeout);channel.port1.close();
            if(event.data?.ok) resolve(); else reject(new Error('Offline cache incomplete'));
          };
          registration.active?.postMessage({type:'CACHE_SIMPLE',urls},[channel.port2]);
        });
        update('Offline ready · You can reload this page without a connection. External links still need internet.');
      } catch {
        update('Answers work offline while this page stays open. Reconnect and reload to prepare offline access.');
      }
    }
    void prepare();
    return()=>{active=false;};
  },[]);
  return <p role="status" style={{fontSize:11,color:'var(--quiet)',marginTop:-22}}>{status}</p>;
}
