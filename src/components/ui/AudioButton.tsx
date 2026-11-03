import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioService } from '../../services/audio.service';

interface AudioButtonProps {
  textToSpeak: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  textToSpeak,
  label = 'Listen',
  size = 'md',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    const spoken = audioService.speak(textToSpeak);
    // Visual speaking pulse duration
    setTimeout(() => {
      setIsPlaying(false);
    }, 1200);

    if (!spoken) {
      // Audio not supported on this device or muted
      setIsPlaying(false);
    }
  };

  const isAudioAvailable = audioService.isAvailable();

  const sizeClasses = {
    sm: 'p-2 text-xs rounded-xl min-h-[38px] min-w-[38px]',
    md: 'px-4 py-2 text-base rounded-2xl min-h-[48px]',
    lg: 'px-6 py-3 text-lg rounded-3xl min-h-[58px]',
  }[size];

  const iconSizes = {
    sm: 16,
    md: 22,
    lg: 28,
  }[size];

  return (
    <button
      type="button"
      onClick={handlePlay}
      title={isAudioAvailable ? `Listen to "${textToSpeak}"` : 'Audio not available on this device'}
      aria-label={`Listen to ${textToSpeak}`}
      className={`font-fredoka inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 select-none shadow-md ${
        isPlaying
          ? 'bg-[#FFB547] text-[#26324A] scale-105 border-b-4 border-[#EAA030]'
          : 'bg-[#40BFE8] text-white hover:bg-[#2CAAD4] border-b-4 border-[#2CAAD4] active:translate-y-1 active:border-b-2'
      } ${sizeClasses} ${className}`}
    >
      {isAudioAvailable ? (
        <Volume2 size={iconSizes} className={isPlaying ? 'animate-bounce' : ''} />
      ) : (
        <VolumeX size={iconSizes} />
      )}
      {label && <span className="font-bold">{label}</span>}
    </button>
  );
};

