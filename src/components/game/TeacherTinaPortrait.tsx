import React, { useState } from 'react';
import { TINA_CONFIG } from '../../data/teacher.config';

export type TeacherPhotoKey = 'book' | 'welcome' | 'lesson' | 'reading' | 'thumbsUp';
export type TeacherVariant = 'hero' | 'card' | 'avatar' | 'badge';

interface TeacherTinaPortraitProps {
  photo?: TeacherPhotoKey;
  variant?: TeacherVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  speechBubble?: string;
  speechPosition?: 'top' | 'right' | 'bottom';
  className?: string;
  altText?: string;
}

export const TeacherTinaPortrait: React.FC<TeacherTinaPortraitProps> = ({
  photo = 'book',
  variant = 'card',
  size = 'md',
  speechBubble,
  speechPosition = 'top',
  className = '',
  altText = 'Teacher Tina',
}) => {
  const [hasError, setHasError] = useState(false);

  const photoSrc = TINA_CONFIG.photos[photo] || TINA_CONFIG.photos.book;

  // Avatar sizing
  const avatarSizes = {
    xs: 'w-10 h-10 border-2',
    sm: 'w-14 h-14 border-3',
    md: 'w-20 h-20 border-4',
    lg: 'w-28 h-28 border-4',
    xl: 'w-36 h-36 border-5',
  }[size];

  // Card / Hero sizing
  const cardSizes = {
    xs: 'max-w-[140px]',
    sm: 'max-w-[200px]',
    md: 'max-w-[280px]',
    lg: 'max-w-[360px]',
    xl: 'max-w-[440px]',
  }[size];

  if (variant === 'avatar') {
    return (
      <div className={`relative inline-block shrink-0 ${className}`}>
        <div
          className={`rounded-full overflow-hidden border-[#FFB547] bg-purple-100 shadow-md ring-2 ring-purple-200/50 ${avatarSizes}`}
        >
          {hasError ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-purple-400 to-pink-400 text-white font-fredoka font-bold text-base">
              TT
            </div>
          ) : (
            <img
              src={photoSrc}
              alt={altText}
              onError={() => setHasError(true)}
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          )}
        </div>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-2xl border-2 border-purple-200 shadow-xs ${className}`}
      >
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#FFB547] shrink-0">
          <img
            src={photoSrc}
            alt={altText}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-fredoka text-xs font-bold text-[#6C5CE7] leading-none">
            Teacher Tina
          </span>
          <span className="text-[10px] text-gray-500 font-nunito font-semibold leading-tight">
            English Mentor
          </span>
        </div>
      </div>
    );
  }

  // Hero & Card Variants
  return (
    <div className={`relative flex flex-col items-center ${cardSizes} ${className}`}>
      {/* Speech Bubble (Top) */}
      {speechBubble && speechPosition === 'top' && (
        <div className="relative mb-3 z-10 animate-bounce-subtle">
          <div className="bg-white px-4 py-2.5 rounded-2xl border-3 border-[#6C5CE7] shadow-md text-center max-w-[280px]">
            <p className="font-fredoka text-xs sm:text-sm font-bold text-[#26324A] leading-snug">
              {speechBubble}
            </p>
          </div>
          <div className="w-3 h-3 bg-white border-b-3 border-r-3 border-[#6C5CE7] rotate-45 mx-auto -mt-1.5 shadow-xs" />
        </div>
      )}

      {/* Main Framed Portrait */}
      <div className="relative w-full rounded-3xl overflow-hidden border-4 border-[#6C5CE7]/30 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
        <div className="aspect-3/4 w-full overflow-hidden bg-gradient-to-b from-purple-100 to-pink-50">
          <img
            src={photoSrc}
            alt={altText}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
          />
        </div>

        {/* Bottom Teacher Tina Tag */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6 flex items-center justify-between text-white">
          <div>
            <span className="font-fredoka font-black text-sm sm:text-base text-yellow-300 block drop-shadow-xs">
              Teacher Tina
            </span>
            <span className="font-nunito text-[11px] font-bold text-white/90 block">
              Certified English Teacher
            </span>
          </div>
          <span className="text-xl drop-shadow-xs">👩‍🏫</span>
        </div>
      </div>

      {/* Speech Bubble (Bottom) */}
      {speechBubble && speechPosition === 'bottom' && (
        <div className="relative mt-3 z-10">
          <div className="w-3 h-3 bg-white border-t-3 border-l-3 border-[#6C5CE7] rotate-45 mx-auto -mb-1.5 shadow-xs" />
          <div className="bg-white px-4 py-2.5 rounded-2xl border-3 border-[#6C5CE7] shadow-md text-center max-w-[280px]">
            <p className="font-fredoka text-xs sm:text-sm font-bold text-[#26324A] leading-snug">
              {speechBubble}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

