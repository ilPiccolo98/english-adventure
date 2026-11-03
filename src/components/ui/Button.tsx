import React from 'react';
import { audioService } from '../../services/audio.service';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'purple' | 'gold' | 'green' | 'blue' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'purple',
  size = 'md',
  icon,
  children,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const variantClass = {
    purple: 'btn-3d-purple text-white',
    gold: 'btn-3d-gold text-[#26324A]',
    green: 'btn-3d-green text-white',
    blue: 'btn-3d-blue text-white',
    white: 'btn-3d-white text-[#26324A] border border-gray-200',
  }[variant];

  const sizeClass = {
    sm: 'px-4 py-2 text-sm rounded-xl min-h-[40px]',
    md: 'px-6 py-3 text-lg font-bold rounded-2xl min-h-[50px]',
    lg: 'px-8 py-4 text-xl font-bold rounded-2xl min-h-[60px]',
    xl: 'px-10 py-5 text-2xl font-black rounded-3xl min-h-[72px]',
  }[size];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      audioService.playSoundEffect('pop');
      onClick?.(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`font-fredoka inline-flex items-center justify-center gap-2 tracking-wide cursor-pointer select-none transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {icon && <span className="inline-block">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

