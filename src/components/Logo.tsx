import { SVGProps } from 'react';

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="bg-gradient" x1="0" y1="0" x2="100" y2="100">
          <stop stopColor="#1A0A00" />
          <stop offset="1" stopColor="#3D1E00" />
        </linearGradient>
        <linearGradient id="gold-gradient" x1="0" y1="0" x2="100" y2="100">
          <stop stopColor="#F5D57A" />
          <stop offset="0.5" stopColor="#C8922A" />
          <stop offset="1" stopColor="#7A5515" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect width="100" height="100" rx="18" fill="url(#bg-gradient)" />
      
      {/* Elegant Borders */}
      <rect x="6" y="6" width="88" height="88" rx="14" stroke="url(#gold-gradient)" strokeWidth="0.75" opacity="0.6" strokeDasharray="3 3"/>
      <rect x="11" y="11" width="78" height="78" rx="10" stroke="url(#gold-gradient)" strokeWidth="1.5" />

      {/* Corner Accents */}
      <path d="M11 25 L25 11" stroke="url(#gold-gradient)" strokeWidth="1.5" />
      <path d="M89 25 L75 11" stroke="url(#gold-gradient)" strokeWidth="1.5" />
      <path d="M11 75 L25 89" stroke="url(#gold-gradient)" strokeWidth="1.5" />
      <path d="M89 75 L75 89" stroke="url(#gold-gradient)" strokeWidth="1.5" />

      {/* Flame Icon (Roasting) */}
      <path d="M50 18 C55 26 56 30 54 34 C52 37 48 37 46 34 C44 30 45 26 50 18 Z" fill="url(#gold-gradient)" opacity="0.9" />
      <path d="M50 22 C52 27 53 30 52 32 C51 34 49 34 48 32 C47 30 48 27 50 22 Z" fill="#F5D57A" opacity="0.8" />

      {/* Main text: CQ */}
      <text 
        x="51" 
        y="60" 
        fontFamily="'Cormorant Garamond', serif" 
        fontSize="36" 
        fontStyle="italic" 
        fontWeight="bold" 
        fill="url(#gold-gradient)" 
        textAnchor="middle"
        style={{ textShadow: '0 2px 10px rgba(200,146,42,0.3)' }}
      >
        CQ
      </text>
      
      {/* Subtext: VIỆT */}
      <text 
        x="51" 
        y="78" 
        fontFamily="'Mulish', sans-serif" 
        fontSize="11" 
        fontWeight="900" 
        letterSpacing="4" 
        fill="#E8D5A8" 
        textAnchor="middle" 
        opacity="0.9"
      >
        VIỆT
      </text>

      {/* Side Dots */}
      <circle cx="23" cy="50" r="1.5" fill="url(#gold-gradient)" />
      <circle cx="77" cy="50" r="1.5" fill="url(#gold-gradient)" />
    </svg>
  );
}
