'use client'

import { useEffect, useRef } from 'react'

export default function ProgressScrollBar() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateProgress = () => {
      if (!progressRef.current) return

      // Calculate scroll progress as a percentage
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.scrollY

      const scrollProgress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0

      // Update bar height directly for real-time sync
      progressRef.current.style.setProperty('--progress', `${scrollProgress}%`)
    }

    // Use requestAnimationFrame for real-time sync with browser repaint
    let frameId: number

    const handleScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial update
    updateProgress()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <>
      <svg style={{ position: 'fixed', top: 0, right: 0, width: 0, height: 0, zIndex: -1 }}>
        <defs>
          <filter id="sketchFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="drawFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="5" result="noise" seed="3" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <style jsx>{`
        .progress-scroll-bar {
          position: fixed;
          top: 0;
          right: 0;
          width: 3px;
          height: 100vh;
          background-color: transparent;
          z-index: 40;
          pointer-events: none;
          --progress: 0%;
        }

        .progress-scroll-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--progress);
          background: linear-gradient(
            180deg,
            var(--accent) 0%,
            var(--primary) 100%
          );
          box-shadow: 
            0 0 12px rgba(var(--accent-rgb, 135, 180, 180), 0.6),
            inset -1px 0 3px rgba(255, 255, 255, 0.4),
            inset 1px 0 3px rgba(0, 0, 0, 0.3);
          filter: url(#sketchFilter);
          opacity: 0.92;
          animation: sketchFlicker 0.08s ease-out;
        }

        /* Top edge/pen tip effect */
        .progress-scroll-bar::before {
          content: '';
          position: absolute;
          top: calc(var(--progress) - 2px);
          left: -1px;
          width: 5px;
          height: 4px;
          background: radial-gradient(
            ellipse at center,
            var(--accent) 0%,
            rgba(var(--accent-rgb, 135, 180, 180), 0.5) 70%
          );
          border-radius: 50%;
          filter: url(#drawFilter);
          box-shadow: 
            0 0 6px rgba(var(--accent-rgb, 135, 180, 180), 0.8),
            0 0 12px rgba(var(--primary), 0.4);
          animation: drawPulse 0.4s ease-out;
          pointer-events: none;
          opacity: 0.8;
        }

        @keyframes sketchFlicker {
          0%, 100% {
            opacity: 0.92;
          }
          50% {
            opacity: 0.85;
          }
        }

        @keyframes drawPulse {
          0% {
            box-shadow: 
              0 0 8px rgba(var(--accent-rgb, 135, 180, 180), 1),
              0 0 16px rgba(var(--primary), 0.6);
            opacity: 1;
          }
          100% {
            box-shadow: 
              0 0 6px rgba(var(--accent-rgb, 135, 180, 180), 0.6),
              0 0 12px rgba(var(--primary), 0.3);
            opacity: 0.6;
          }
        }

        /* Texture overlay for sketch effect */
        .progress-scroll-bar::marker {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--progress);
          background: 
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.08) 2px,
              rgba(255, 255, 255, 0.08) 4px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.05) 2px,
              rgba(0, 0, 0, 0.05) 4px
            );
          pointer-events: none;
          animation: sketchTexture 3s linear infinite;
        }

        @keyframes sketchTexture {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.15;
          }
          100% {
            opacity: 0.3;
          }
        }
      `}</style>
      
      <div ref={progressRef} className="progress-scroll-bar" />
    </>
  )
}
