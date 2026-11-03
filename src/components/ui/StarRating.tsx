import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  stars: 0 | 1 | 2 | 3;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  stars,
  size = 'md',
  animated = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 18,
    md: 26,
    lg: 40,
    xl: 56,
  }[size];

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      {[1, 2, 3].map((starIndex) => {
        const isFilled = starIndex <= stars;
        return (
          <div
            key={starIndex}
            className={`transition-all duration-300 ${
              isFilled ? 'text-[#FFB547] drop-shadow-md scale-100' : 'text-gray-300 scale-90'
            } ${animated && isFilled ? 'animate-bounce' : ''}`}
            style={{
              animationDelay: `${starIndex * 0.15}s`,
              animationIterationCount: 1,
            }}
          >
            <Star
              size={iconSizes}
              className={isFilled ? 'fill-[#FFB547] stroke-[#EAA030]' : 'fill-gray-200 stroke-gray-300'}
              strokeWidth={2.5}
            />
          </div>
        );
      })}
    </div>
  );
};

