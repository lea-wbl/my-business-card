"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiGithub, FiGlobe, FiLinkedin } from "react-icons/fi";

export default function TiltingBusinessCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const maxTilt = 15;
      const tiltX = event.beta ?? 0; // front-back
      const tiltY = event.gamma ?? 0; // left-right

      setTilt({
        x: Math.max(Math.min(tiltX / 3, maxTilt), -maxTilt),
        y: Math.max(Math.min(tiltY / 3, maxTilt), -maxTilt),
      });
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  // Handle mouse movement over card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate the tilt based on mouse position
    // More distance from center = more tilt (max 25 degrees)
    const maxTilt = 25;
    const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * maxTilt;
    const tiltY = -((e.clientX - centerX) / (rect.width / 2)) * maxTilt;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  // Reset tilt when mouse leaves
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovering
          ? `perspective(1500px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(100px)`
          : "perspective(1500px)",
        transition: isHovering ? "transform 0.1s ease" : "transform 0.5s ease",
      }}
      className={`w-full aspect-[2/3] md:w-96 md:h-56 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl py-[25%] px-6 md:p-6 text-white text-center md:text-start relative overflow-hidden flex flex-col ${
        isHovering ? "shadow-2xl/45" : "shadow-2xl/60"
      }`}
    >
      {/* Glare effect */}
      <div
        className="absolute inset-0 bg-white opacity-10 pointer-events-none"
        style={{
          background: isHovering
            ? `radial-gradient(circle at ${tilt.y * -10 + 50}% ${
                tilt.x * 10 + 50
              }%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)`
            : "none",
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Main Info */}
        <div className="space-y-2 md:space-y-0">
          <h1
            className="text-[4.5rem] leading-[4.5rem] md:text-[3rem] font-bold font-custom title-effect mb-4 md:mb-0 cursor-default
"
          >
            Léa Weibel
          </h1>

          <h2
            className="text-2xl md:text-xl font-bold font-text text-royal-purple cursor-default
"
          >
            Frontend Developer
          </h2>
          <a
            href="mailto:lwbl.portfolio@gmail.com"
            className="font-semibold font-text md:text-sm text-hot-raspberry hover:text-white transition-colors duration-200 active:text-royal-purple"
          >
            lwbl.portfolio@gmail.com
          </a>
        </div>

        {/* Links */}
        <div className="font-text text-royal-purple flex flex-wrap justify-center md:justify-between gap-x-8 gap-y-4">
          <a
            href="https://github.com/lea-wbl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub"
            title="Visit my GitHub"
            className="flex items-center gap-1 text-lg md:text-sm hover:text-white hover:scale-110 transition-all duration-200 active:text-hot-raspberry"
          >
            <span className="bg-royal-purple rounded-full p-1.5 text-white">
              <FiGithub />
            </span>
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/l%C3%A9a-weibel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my LinkedIn"
            title="Visit my LinkedIn"
            className="flex items-center gap-1 text-lg md:text-sm hover:text-white hover:scale-110 transition-all duration-200 active:text-hot-raspberry"
          >
            <span className="bg-royal-purple rounded-full p-1.5 text-white">
              <FiLinkedin />
            </span>
            <span>LinkedIn</span>
          </a>

          <a
            href="https://lea-weibel.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my website"
            title="Visit my website"
            className="flex items-center gap-1 text-lg md:text-sm hover:text-white hover:scale-110 transition-all duration-200 active:text-hot-raspberry"
          >
            <span className="bg-royal-purple rounded-full p-1.5 text-white">
              <FiGlobe />
            </span>
            <span>Website</span>
          </a>
        </div>
      </div>
    </div>
  );
}
