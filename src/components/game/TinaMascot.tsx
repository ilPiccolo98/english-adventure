import React from 'react';

export type TinaPose = 'avatar' | 'standing' | 'expressive' | 'listening';

interface TinaMascotProps {
  pose?: TinaPose;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const TinaMascot: React.FC<TinaMascotProps> = ({
  pose = 'standing',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-44 h-44',
    xl: 'w-64 h-64',
  }[size];

  if (pose === 'avatar') {
    return (
      <div className={`relative inline-block ${sizeClasses} ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md rounded-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle badge */}
          <circle cx="50" cy="50" r="48" fill="#6C5CE7" stroke="#FFB547" strokeWidth="4" />
          <circle cx="50" cy="50" r="44" fill="#FFF9F0" />

          {/* Shoulders / Collar */}
          <path d="M22 92 C28 72 72 72 78 92" fill="#FF7285" />
          <path d="M42 78 L50 86 L58 78 Z" fill="#FFFFFF" />

          {/* Neck */}
          <rect x="44" y="62" width="12" height="18" fill="#FAD0B1" rx="4" />

          {/* Hair back */}
          <circle cx="50" cy="42" r="30" fill="#6D4C41" />

          {/* Head */}
          <ellipse cx="50" cy="46" rx="22" ry="24" fill="#FEE3D4" />

          {/* Cheeks */}
          <circle cx="36" cy="54" r="5" fill="#FF8A80" opacity="0.5" />
          <circle cx="64" cy="54" r="5" fill="#FF8A80" opacity="0.5" />

          {/* Eyes with friendly sparkle */}
          <circle cx="41" cy="46" r="3.5" fill="#26324A" />
          <circle cx="59" cy="46" r="3.5" fill="#26324A" />
          <circle cx="42" cy="44.5" r="1.2" fill="#FFFFFF" />
          <circle cx="60" cy="44.5" r="1.2" fill="#FFFFFF" />

          {/* Friendly stylish glasses */}
          <circle cx="41" cy="46" r="7" fill="none" stroke="#6C5CE7" strokeWidth="2.5" />
          <circle cx="59" cy="46" r="7" fill="none" stroke="#6C5CE7" strokeWidth="2.5" />
          <path d="M48 46 L52 46" stroke="#6C5CE7" strokeWidth="2.5" strokeLinecap="round" />

          {/* Happy smile */}
          <path d="M44 56 Q50 64 56 56" fill="none" stroke="#D32F2F" strokeWidth="2.5" strokeLinecap="round" />

          {/* Hair front bangs & cute side bun */}
          <path d="M28 42 C32 26 68 26 72 42 C64 33 54 36 50 36 C44 36 34 32 28 42 Z" fill="#5D4037" />
          <circle cx="72" cy="30" r="10" fill="#5D4037" />
          <circle cx="72" cy="30" r="4" fill="#FFB547" />
        </svg>
      </div>
    );
  }

  // Full-body or expressive pose
  return (
    <div className={`relative inline-block ${sizeClasses} ${className}`}>
      <svg
        viewBox="0 0 200 240"
        className="w-full h-full drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft magical glow backdrop */}
        <circle cx="100" cy="120" r="85" fill="#FFF2D6" opacity="0.6" />

        {/* Legs and shoes */}
        <rect x="76" y="175" width="16" height="42" rx="7" fill="#3F51B5" />
        <rect x="108" y="175" width="16" height="42" rx="7" fill="#3F51B5" />
        <ellipse cx="80" cy="222" rx="15" ry="8" fill="#FF7285" />
        <ellipse cx="120" cy="222" rx="15" ry="8" fill="#FF7285" />

        {/* Dress / Jacket */}
        <path d="M65 110 L135 110 L146 178 L54 178 Z" fill="#6C5CE7" />
        {/* Belt */}
        <rect x="63" y="140" width="74" height="10" rx="3" fill="#FFB547" />
        <circle cx="100" cy="145" r="7" fill="#FFA000" />

        {/* Left arm waving (for expressive) or resting */}
        {pose === 'expressive' ? (
          <g>
            <path d="M65 115 Q35 90 40 55" fill="none" stroke="#FF7285" strokeWidth="18" strokeLinecap="round" />
            <circle cx="40" cy="50" r="10" fill="#FEE3D4" />
            {/* Sparkles near waving hand */}
            <text x="20" y="42" fontSize="20">✨</text>
          </g>
        ) : (
          <g>
            {/* Left arm holding a teacher's friendly book */}
            <path d="M68 115 Q48 135 60 160" fill="none" stroke="#FF7285" strokeWidth="16" strokeLinecap="round" />
            <rect x="42" y="140" width="26" height="32" rx="4" fill="#35C98A" transform="rotate(-15 42 140)" />
            <rect x="46" y="144" width="20" height="24" rx="2" fill="#FFFFFF" transform="rotate(-15 42 140)" />
            <text x="48" y="160" fontSize="11" fill="#26324A" transform="rotate(-15 42 140)">ABC</text>
            <circle cx="64" cy="158" r="8" fill="#FEE3D4" />
          </g>
        )}

        {/* Right arm */}
        {pose === 'expressive' ? (
          <g>
            <path d="M135 115 Q165 90 160 55" fill="none" stroke="#FF7285" strokeWidth="18" strokeLinecap="round" />
            <circle cx="160" cy="50" r="10" fill="#FEE3D4" />
            <text x="165" y="42" fontSize="20">⭐</text>
          </g>
        ) : (
          <g>
            <path d="M135 115 Q158 130 152 155" fill="none" stroke="#FF7285" strokeWidth="16" strokeLinecap="round" />
            <circle cx="150" cy="158" r="8" fill="#FEE3D4" />
          </g>
        )}

        {/* Collar */}
        <path d="M84 108 L100 124 L116 108 Z" fill="#FFFFFF" />

        {/* Neck */}
        <rect x="92" y="90" width="16" height="20" fill="#FAD0B1" rx="4" />

        {/* Hair back */}
        <circle cx="100" cy="68" r="42" fill="#5D4037" />

        {/* Head */}
        <ellipse cx="100" cy="72" rx="30" ry="33" fill="#FEE3D4" />

        {/* Cheeks */}
        <circle cx="82" cy="84" r="6" fill="#FF8A80" opacity="0.55" />
        <circle cx="118" cy="84" r="6" fill="#FF8A80" opacity="0.55" />

        {/* Eyes */}
        <circle cx="88" cy="73" r="4.5" fill="#26324A" />
        <circle cx="112" cy="73" r="4.5" fill="#26324A" />
        <circle cx="90" cy="71" r="1.8" fill="#FFFFFF" />
        <circle cx="114" cy="71" r="1.8" fill="#FFFFFF" />

        {/* Stylized rounded purple glasses */}
        <circle cx="88" cy="73" r="10" fill="none" stroke="#6C5CE7" strokeWidth="3" />
        <circle cx="112" cy="73" r="10" fill="none" stroke="#6C5CE7" strokeWidth="3" />
        <path d="M98 73 L102 73" stroke="#6C5CE7" strokeWidth="3" strokeLinecap="round" />

        {/* Warm smile */}
        <path d="M92 88 Q100 100 108 88" fill="none" stroke="#D32F2F" strokeWidth="3.2" strokeLinecap="round" />

        {/* Hair front & top bun */}
        <path d="M70 66 C75 42 125 42 130 66 C120 54 105 58 100 58 C92 58 78 52 70 66 Z" fill="#4E342E" />
        <circle cx="128" cy="48" r="15" fill="#4E342E" />
        <circle cx="128" cy="48" r="6" fill="#FFB547" />
      </svg>
    </div>
  );
};

