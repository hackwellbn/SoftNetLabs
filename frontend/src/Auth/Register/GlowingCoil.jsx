import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlowingCoil = () => {
  const coilRef = useRef(null);

  useEffect(() => {
    gsap.to(coilRef.current, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  }, []);

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '200px',
      height: '200px',
      zIndex: 10,
      pointerEvents: 'none',
    }}>
      <svg
        ref={coilRef}
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rough background texture */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern id="noise" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#444" />
            <circle cx="5" cy="3" r="1" fill="#333" />
            <circle cx="9" cy="9" r="1" fill="#555" />
          </pattern>
        </defs>

        {/* Coil */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="url(#noise)"
          strokeWidth="6"
          fill="none"
          filter="url(#glow)"
        />
        <circle
          cx="100"
          cy="100"
          r="60"
          stroke="#00f0ff"
          strokeWidth="4"
          fill="none"
          opacity="0.5"
        />
        <circle
          cx="100"
          cy="100"
          r="40"
          stroke="#00f0ff"
          strokeWidth="2"
          fill="none"
          opacity="0.2"
        />
        <circle
          cx="100"
          cy="100"
          r="20"
          stroke="#ffffff"
          strokeWidth="1"
          fill="none"
          opacity="0.1"
        />
      </svg>
    </div>
  );
};

export default GlowingCoil;
