import React, { useState, useEffect } from 'react';

interface FenixLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function FenixLogo({ className = '', size = 'md' }: FenixLogoProps) {
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  useEffect(() => {
    // Load custom logo if exists
    const saved = localStorage.getItem('fenix_custom_logo');
    if (saved) {
      setCustomLogo(saved);
    }

    const handleLogoUpdate = () => {
      setCustomLogo(localStorage.getItem('fenix_custom_logo'));
    };

    window.addEventListener('fenix_logo_updated', handleLogoUpdate);
    window.addEventListener('storage', handleLogoUpdate);

    return () => {
      window.removeEventListener('fenix_logo_updated', handleLogoUpdate);
      window.removeEventListener('storage', handleLogoUpdate);
    };
  }, []);

  const dimensions = {
    sm: 'h-10 w-10',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
    xl: 'h-36 w-36 shadow-lg shadow-yellow-500/5'
  }[size];

  if (customLogo) {
    return (
      <div className={`relative flex items-center justify-center ${dimensions} ${className}`} id="fenix-logo-wrapper">
        <img
          src={customLogo}
          alt="Logo Fênix"
          className="w-full h-full object-cover rounded-xl border border-yellow-400 shadow-md"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${dimensions} ${className}`} id="fenix-logo-wrapper">
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          {/* Cybernetic High-Tech Glow Filters */}
          <filter id="neonGlowRed" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="neonGlowAmber" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Luxury Metallic Gold Gradient for the Bone */}
          <linearGradient id="goldBoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" /> {/* Yellow 200 */}
            <stop offset="30%" stopColor="#eab308" /> {/* Yellow 500 */}
            <stop offset="70%" stopColor="#ca8a04" /> {/* Yellow 600 */}
            <stop offset="100%" stopColor="#854d0e" /> {/* Yellow 800 */}
          </linearGradient>

          {/* Futuristic Yellow/Red Gradient for the Agro & Tech lines */}
          <linearGradient id="redTechGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b91c1c" /> {/* Red 700 */}
            <stop offset="50%" stopColor="#ef4444" /> {/* Red 500 */}
            <stop offset="100%" stopColor="#f59e0b" /> {/* Amber 500 */}
          </linearGradient>

          {/* Dark Charcoal base for premium contrast */}
          <linearGradient id="charcoalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" /> {/* Slate 800 */}
            <stop offset="100%" stopColor="#0f172a" /> {/* Slate 900 */}
          </linearGradient>

          {/* Neon Red/Orange energy lines */}
          <linearGradient id="orangeNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" /> {/* Red 500 */}
            <stop offset="100%" stopColor="#f97316" /> {/* Orange 500 */}
          </linearGradient>
        </defs>

        {/* 1. Cyber-Tech Circular Base & Orbit Ring (Clean Outer Core) */}
        <circle
          cx="60"
          cy="60"
          r="56"
          fill="url(#charcoalGrad)"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Outer Tech Orbit dashes */}
        <circle
          cx="60"
          cy="60"
          r="51"
          stroke="url(#redTechGrad)"
          strokeWidth="1"
          strokeDasharray="6 4 2 4"
          className="opacity-80"
        />

        {/* Glowing concentric accent ring */}
        <circle
          cx="60"
          cy="60"
          r="47"
          stroke="url(#orangeNeonGrad)"
          strokeWidth="0.75"
          className="opacity-40"
        />

        {/* 2. MAJESTIC FUTURISTIC CYBER-DOG PROFILE SILHOUETTE */}
        {/* Facing strictly to the Right, stylized with dynamic polygonal and organic lines */}
        <g id="cyber-dog-head">
          {/* Back of Head, Neck, and Chest */}
          <path
            d="M 38,82 
               C 34,70 34,54 44,40 
               C 50,32 58,26 66,28 
               C 70,29 76,32 78,35 
               L 81,35 
               C 85,35 88,38 90,41 
               L 92,44
               L 84,48
               L 78,54
               C 74,58 70,68 70,76
               L 66,88
               Z"
            fill="url(#redTechGrad)"
            className="opacity-90"
          />

          {/* Front Face, Snout, and Lower Jaw */}
          <path
            d="M 68,28 
               L 84,33 
               C 92,35.5 96,38 98,42 
               C 99,44 100,45.5 98,47 
               C 96,48.5 90,49 84,48 
               L 78,54 
               C 74,59 74,67 74,74 
               L 64,88 
               C 58,88 50,86 45,82"
            fill="url(#redTechGrad)"
          />

          {/* Realistic-Futuristic Long Ears pointing straight upward with tech facets */}
          {/* Main Ear Structure */}
          <path
            d="M 46,38 
               L 36,10 
               C 38,12 43,20 48,25 
               L 52,32 Z"
            fill="#0f172a"
          />
          <path
            d="M 46,38 
               L 36,10 
               L 41,20 
               L 48,25 Z"
            fill="url(#orangeNeonGrad)"
            filter="url(#neonGlowRed)"
          />

          {/* Outer Ear Structure (layered) */}
          <path
            d="M 52,32 
               L 47,8 
               L 53,18 
               L 57,26 Z"
            fill="url(#redTechGrad)"
          />

          {/* Tech Eye: Laser-cut neon indicator */}
          <polygon
            points="74,38 78,39 76,42 72,41"
            fill="#fef08a"
            filter="url(#neonGlowAmber)"
          />
          
          {/* Cybernetic Neck circuit lines */}
          <path
            d="M 44,52 Q 52,56 50,64"
            stroke="#0f172a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M 48,48 Q 56,52 54,60"
            stroke="#ffffff"
            strokeWidth="1"
            strokeLinecap="round"
            className="opacity-30"
          />
        </g>

        {/* 3. PREMIUM GEOMETRIC GLOWING GOLDEN BONE */}
        {/* Rendered beautifully at a stylized slant on the bottom sector, looking absolutely stunning */}
        <g id="glowing-bone" filter="url(#neonGlowAmber)">
          {/* The main Bone Body with detailed bevel coordinates */}
          {/* Left twin-knuckles */}
          <path
            d="M 28,78 
               C 24,74 20,74 18,78 
               C 16,82 17,88 22,90 
               C 19,94 22,99 26,99 
               C 31,99 34,95 34,90
               L 66,72
               C 66,77 70,81 75,81
               C 79,81 82,76 79,72
               C 84,70 85,64 81,60
               C 77,56 71,59 71,64
               L 34,82
               C 34,79 31,78 28,78 Z"
            fill="url(#goldBoneGrad)"
            stroke="#ffffff"
            strokeWidth="0.75"
          />
          
          {/* Inside Bone Highlight line for 3D realism */}
          <path
            d="M 31,84 L 66,66"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-60"
          />
        </g>

        {/* 4. Minimalist Phoenix Wing Accent line behind the dog to echo the Fênix name */}
        <path
          d="M 24,45 C 18,34 30,22 36,28 Q 30,36 34,44 Z"
          fill="url(#orangeNeonGrad)"
          className="opacity-70"
        />

        {/* Small tech sparkle diamonds representing excellence and agriculture */}
        <path d="M 88,20 L 91,23 L 88,26 L 85,23 Z" fill="url(#goldBoneGrad)" />
        <path d="M 24,60 L 26,62 L 24,64 L 22,62 Z" fill="url(#redTechGrad)" />
      </svg>
    </div>
  );
}
