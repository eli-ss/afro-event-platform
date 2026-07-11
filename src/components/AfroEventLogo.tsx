/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface LogoProps {
  className?: string;
  variant?: "default" | "dark" | "monochrome";
  hideTagline?: boolean;
  scale?: number;
}

export default function AfroEventLogo({
  className = "",
  variant = "default",
  hideTagline = false,
  scale = 1
}: LogoProps) {
  // Brand Colors matching the logo asset:
  // - Earthy Orange: #F27D26 or #F97316
  // - Warm Gold/Yellow: #D9A01B or #E5A93B
  // - Earthy Red/Brown: #C04E22
  // - Dark Charcoal: #2B1E16
  // - Pine/Emerald Green: #1A5235

  const isDark = variant === "dark";
  const isMono = variant === "monochrome";

  const textColorFro = isMono 
    ? "text-current" 
    : "text-[#C04E22]"; // Earthy Redish Brown
  const textColorO = isMono 
    ? "text-current" 
    : "text-[#E5A93B]"; // Warm Yellow/Gold
  const textColorEv = isMono 
    ? "text-current" 
    : isDark 
      ? "text-white" 
      : "text-[#2B1E16]"; // Dark Charcoal/Brown
  const textColorEnt = isMono 
    ? "text-current" 
    : "text-[#1A5235]"; // Pine Green
  const taglineColor = isMono 
    ? "text-current opacity-80" 
    : "text-[#B07C27]"; // Light ochre gold

  return (
    <div 
      className={`flex flex-col select-none ${className}`} 
      style={{ transform: `scale(${scale})`, transformOrigin: "left center" }}
      id="afro-event-brand-logo"
    >
      <div className="flex items-center gap-2.5">
        {/* Decorative Circle Icon Left Emblem */}
        <svg 
          width="46" 
          height="46" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          {/* Circular Swirl/Shield Background */}
          <circle 
            cx="50" 
            cy="50" 
            r="46" 
            fill={isMono ? "transparent" : "#F27D26"} 
            stroke={isMono ? "currentColor" : "#C04E22"} 
            strokeWidth="3"
            className="opacity-95"
          />
          {/* Subtle tribal background spirals/waves inside circle */}
          <path 
            d="M 12 50 C 20 25, 80 25, 88 50 C 80 75, 20 75, 12 50 Z" 
            stroke={isMono ? "currentColor" : "#D9A01B"} 
            strokeWidth="2" 
            strokeDasharray="4 4"
            className="opacity-30"
          />
          <circle cx="50" cy="50" r="32" stroke={isMono ? "currentColor" : "#E5A93B"} strokeWidth="1.5" strokeDasharray="3 3" className="opacity-40" />

          {/* Adinkra Gye Nyame Symbol */}
          <g transform="translate(30, 24) scale(0.65)" stroke={isMono ? "currentColor" : "#2B1E16"} strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Center spine */}
            <path d="M30 10 L30 70" />
            <circle cx="30" cy="40" r="5" fill={isMono ? "currentColor" : "#2B1E16"} />
            
            {/* Left Hand Curve with knuckles */}
            <path d="M30 20 C5 20, 5 60, 30 60" />
            <path d="M12 28 C8 32, 8 36, 12 40" />
            <path d="M10 40 C6 44, 6 48, 10 52" />

            {/* Right Hand Curve with knuckles */}
            <path d="M30 20 C55 20, 55 60, 30 60" />
            <path d="M48 28 C52 32, 52 36, 48 40" />
            <path d="M50 40 C54 44, 54 48, 50 52" />

            {/* Top & Bottom horns/projections */}
            <path d="M22 10 L38 10" />
            <path d="M22 70 L38 70" />
            <path d="M30 5 L30 15" />
            <path d="M30 65 L30 75" />
          </g>

          {/* Djembe Drum Icon overlay in bottom right inside the circle */}
          <g transform="translate(56, 52) scale(0.35)" fill={isMono ? "currentColor" : "#E5A93B"} stroke={isMono ? "currentColor" : "#2B1E16"} strokeWidth="3" strokeLinejoin="round">
            {/* Drum head */}
            <ellipse cx="40" cy="20" rx="25" ry="8" fill={isMono ? "currentColor" : "#FFF7ED"} />
            
            {/* Drum upper body (goblet bowl) */}
            <path d="M15 20 C15 45, 65 45, 65 20 Z" fill={isMono ? "currentColor" : "#C04E22"} />
            
            {/* Drum lower stand */}
            <path d="M32 40 L25 75 C25 80, 55 80, 55 75 L48 40 Z" fill={isMono ? "currentColor" : "#2B1E16"} />
            
            {/* Rope tension lines */}
            <path d="M17 21 L32 40 M28 23 L35 40 M40 24 L40 40 M52 23 L45 40 M63 21 L48 40" strokeWidth="2" stroke={isMono ? "currentColor" : "#E5A93B"} />
            
            {/* Base rings */}
            <ellipse cx="40" cy="75" rx="16" ry="4" fill="none" />
          </g>
        </svg>

        {/* Stylized letter 'A' with afro-hair & braid, followed by text "FRO EVENT" */}
        <div className="flex items-center">
          {/* Logo 'A' with hair */}
          <svg 
            width="44" 
            height="48" 
            viewBox="0 0 90 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 -mr-1"
          >
            {/* Stylized Afro Curls on Left Leg */}
            <path 
              d="M 32 30 C 20 20, 15 35, 20 45 C 10 50, 15 65, 25 65 C 18 72, 30 85, 40 75 C 45 85, 60 80, 55 70 C 65 65, 60 50, 50 48" 
              fill={isMono ? "currentColor" : "#2B1E16"} 
              className="opacity-95"
            />
            {/* Big afro hair puff back cloud */}
            <path 
              d="M 35 15 C 22 5, 8 18, 12 32 C 2 38, 2 54, 10 62 C 6 74, 18 84, 28 80" 
              fill={isMono ? "currentColor" : "#2B1E16"}
            />

            {/* Stylized braid in hair with pan-African colors (Red, Yellow, Green beads) */}
            <path 
              d="M 28 26 C 26 34, 30 42, 28 50 C 26 58, 22 64, 18 70" 
              stroke={isMono ? "currentColor" : "#E5A93B"} 
              strokeWidth="5" 
              strokeLinecap="round" 
              fill="none" 
            />
            {/* Beads along the braid */}
            <circle cx="28" cy="30" r="3.5" fill={isMono ? "currentColor" : "#DC2626"} /> {/* Red */}
            <circle cx="29" cy="40" r="3.5" fill={isMono ? "currentColor" : "#F59E0B"} /> {/* Yellow */}
            <circle cx="26" cy="50" r="3.5" fill={isMono ? "currentColor" : "#10B981"} /> {/* Green */}
            <circle cx="21" cy="60" r="3.5" fill={isMono ? "currentColor" : "#DC2626"} /> {/* Red */}
            <circle cx="18" cy="68" r="3.5" fill={isMono ? "currentColor" : "#F59E0B"} /> {/* Yellow */}

            {/* Sleek bold main 'A' body (combining the legs and crossbar) */}
            <path 
              d="M 44 26 L 68 82 C 70 85, 65 85, 60 85 L 53 85 L 47 68 L 38 68 L 44 26 Z" 
              fill={isMono ? "currentColor" : "#2B1E16"} 
            />
            {/* Inner negative space of A */}
            <path d="M 45 42 L 41 60 L 48 60 Z" fill={isMono ? "currentColor" : isDark ? "#111827" : "#FFFFFF"} />
          </svg>

          {/* "FRO EVENT" text block */}
          <div className="flex flex-col justify-center leading-none pl-1">
            <div className="flex items-baseline font-display font-black text-2.5xl tracking-tight leading-none">
              <span className={textColorFro}>F</span>
              <span className={textColorFro}>R</span>
              <span className={textColorO}>O</span>
            </div>
            <div className="font-display font-bold text-base tracking-widest uppercase leading-none mt-0.5 flex">
              <span className={textColorEv}>EV</span>
              <span className={textColorEnt}>ENT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tagline text below */}
      {!hideTagline && (
        <span className={`text-[8.5px] font-sans font-bold tracking-[0.22em] uppercase mt-1 pl-2.5 whitespace-nowrap ${taglineColor}`}>
          Africa's University Event Platform
        </span>
      )}
    </div>
  );
}
