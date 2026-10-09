import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GlowingPortal.css';
const GlowingPortal = () => {
  const portalRef = useRef();

  useEffect(() => {
    gsap.to(portalRef.current, {
      rotation: 360,
      transformOrigin: '50% 50%',
      repeat: -1,
      duration: 20,
      ease: 'linear'
    });
  }, []);

  return (
    <div className="glowing-portal-wrapper">
      <svg
        ref={portalRef}
        className="glowing-portal"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f2ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0088cc" stopOpacity="0.8" />
          </radialGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="url(#grad)"
          stroke="#00ffff"
          strokeWidth="2"
          filter="url(#glow)"
        />
        <circle
          cx="100"
          cy="100"
          r="40"
          stroke="#00ffff"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4"
        />
      </svg>
    </div>
  );
};

export default GlowingPortal;
