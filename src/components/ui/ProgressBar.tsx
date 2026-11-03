import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className={`w-full flex items-center gap-3 ${className}`}>
      <div className="flex-1 bg-white/70 backdrop-blur-xs h-5 rounded-full p-1 border-2 border-[#6C5CE7]/30 shadow-inner overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-[#35C98A] to-[#40BFE8] rounded-full transition-all duration-300 shadow-sm relative overflow-hidden"
          style={{ width: `${percentage}%` }}
        >
          {/* Subtle animated highlight stripe */}
          <div className="absolute inset-0 bg-white/20 w-full h-full" />
        </div>
      </div>
      <div className="font-fredoka text-sm font-bold text-[#6C5CE7] bg-white px-2.5 py-1 rounded-xl shadow-xs border border-purple-100 min-w-[54px] text-center">
        {current} / {total}
      </div>
    </div>
  );
};

