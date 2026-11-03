import React from 'react';
import type { AvatarId } from '../../types/game.types';
import { AVATAR_LIST } from '../../data/avatars.data';

export const AvatarDisplay: React.FC<{
  avatar: AvatarId;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ avatar, size = 'md', className = '' }) => {
  const item = AVATAR_LIST.find((a) => a.id === avatar) || AVATAR_LIST[0];

  const sizeClasses = {
    sm: 'w-10 h-10 text-xl border-2',
    md: 'w-14 h-14 text-3xl border-3',
    lg: 'w-20 h-20 text-4xl border-4',
    xl: 'w-28 h-28 text-6xl border-4',
  }[size];

  return (
    <div
      className={`rounded-full flex items-center justify-center shadow-md select-none ${sizeClasses} ${className}`}
      style={{ backgroundColor: `${item.color}25`, borderColor: item.color }}
      title={item.label}
    >
      <span>{item.emoji}</span>
    </div>
  );
};
