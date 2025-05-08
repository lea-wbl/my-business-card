"use client";

import React, { useState, useRef } from "react";
import { FiGithub, FiGlobe, FiLinkedin } from "react-icons/fi";

export default function TiltingBusinessCard2() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement over card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate the tilt based on mouse position
    // More distance from center = more tilt (max 15 degrees)
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
    // <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
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
      // className={`w-96 h-56 bg-gradient-to-br from-indigo-300 via-pink-500 to-amber-400 rounded-xl p-6 text-white relative overflow-hidden ${
      //   isHovering ? "shadow-2xl/45" : "shadow-2xl/60"
      // }`}
      className={`w-96 h-56 bg-neutral-800 rounded-xl p-6 text-white relative overflow-hidden ${
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
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* <h1 className="text-[3rem] font-bold glitch-effect">Jane Doe</h1> */}

          {/* <h1 className="text-[3rem] font-bold glitch-effect2">Léa Weibel</h1> */}

          <h1 className="text-[3rem] font-bold text-black glitch-effect3 font-custom">
            Léa Weibel
          </h1>

          {/* <h1 className="text-[4rem] font-bold text-transparent bg-blue-900 bg-clip-text text-shadow-[2px_5px_5px_rgba(255,255,255,0.3)]">
            Jane Doe
          </h1> */}

          {/* <h1 className="text-[3rem] font-bold relative w-fit">
            <span className="absolute -top-0.5 -left-0.5 text-[#ffb644] opacity-70 select-none">
              Léa Weibel
            </span>
            <span className="absolute -bottom-px -right-px text-[#fff] opacity-50 select-none">
              Léa Weibel
            </span>
            <span className="relative text-[#fcd28f]">Léa Weibel</span>
          </h1> */}

          <h2 className="text-lg font-semibold text-[#70459e]">
            Frontend Developer
          </h2>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            {/* <Mail size={16} className="mr-2" /> */}
            <span className="text-sm">lwbl.portfolio@gmail.com</span>
          </div>

          <div className="flex justify-between">
            <div className="flex items-start gap-1">
              <FiGithub />
              <span className="text-sm">GitHub</span>
            </div>
            <div className="flex items-start gap-1">
              <FiLinkedin />
              <span className="text-sm">LinkedIn</span>
            </div>
            <div className="flex items-start gap-1">
              <FiGlobe />
              <span className="text-sm">Website</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
