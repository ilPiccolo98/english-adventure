import React from 'react';
import { Link } from 'react-router-dom';
import { TINA_CONFIG } from '../../data/teacher.config';
import { Sparkles } from 'lucide-react';

interface ParentButtonProps {
  onClick?: () => void;
  to?: string;
  size?: 'sm' | 'md' | 'lg';
  showAvatar?: boolean;
  showSubBadge?: boolean;
  className?: string;
}

export const ParentButton: React.FC<ParentButtonProps> = ({
  onClick,
  to = '/parents',
  size = 'md',
  showAvatar = true,
  showSubBadge = true,
  className = '',
}) => {
  const content = (
    <div className="flex items-center gap-2">
      {/* Teacher Tina Mini Photo Avatar */}
      {showAvatar && (
        <div className="relative shrink-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-2 border-yellow-300 shadow-xs bg-purple-100">
            <img
              src={TINA_CONFIG.photos.thumbsUp || TINA_CONFIG.photos.book}
              alt="Teacher Tina"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 text-[10px]">⭐</span>
        </div>
      )}

      {/* Main Label & Sub-badge */}
      <div className="flex flex-col text-left leading-tight">
        <div className="flex items-center gap-1">
          <span className="font-fredoka font-black text-white text-xs sm:text-sm tracking-wide drop-shadow-xs whitespace-nowrap">
            For Parents 👨‍👩‍👧
          </span>
          <Sparkles size={12} className="text-yellow-200 fill-yellow-200 hidden sm:inline" />
        </div>
        {showSubBadge && (
          <span className="text-[10px] font-fredoka font-bold text-yellow-200 tracking-wider hidden xs:inline uppercase">
            1-on-1 Lessons
          </span>
        )}
      </div>
    </div>
  );

  const baseStyle =
    'inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF5A79] via-[#FF6584] to-[#FF4766] text-white border-b-3 sm:border-b-4 border-[#C9384E] shadow-md hover:shadow-lg hover:brightness-105 active:translate-y-0.5 active:border-b-2 ring-2 ring-pink-300/80 transition-all cursor-pointer select-none';

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm',
    lg: 'px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base',
  }[size];

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        title="Information for Parents • Meet Teacher Tina"
        aria-label="Information for Parents"
        className={`${baseStyle} ${sizeClasses} ${className}`}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      to={to}
      title="Information for Parents • Meet Teacher Tina"
      aria-label="Information for Parents"
      className={`${baseStyle} ${sizeClasses} ${className}`}
    >
      {content}
    </Link>
  );
};

