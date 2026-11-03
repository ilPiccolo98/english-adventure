import React, { useState } from 'react';
import type { MatchingPairsExercise } from '../../../types/exercise.types';
import { audioService } from '../../../services/audio.service';
import { Check } from 'lucide-react';

interface Props {
  exercise: MatchingPairsExercise;
  onAnswer: (isCorrect: boolean) => void;
  isResolved: boolean;
}

export const MatchingPairsRenderer: React.FC<Props> = ({
  exercise,
  onAnswer,
  isResolved,
}) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<Set<string>>(new Set());
  const [hadMistake, setHadMistake] = useState(false);

  // Shuffle right side items once on component mount
  const [shuffledPairs] = useState(() => {
    return [...exercise.pairs].sort(() => Math.random() - 0.5);
  });

  const handleSelectLeft = (pairId: string) => {
    if (isResolved || matchedPairIds.has(pairId)) return;
    audioService.playSoundEffect('pop');
    setSelectedLeft(pairId);
  };

  const handleSelectRight = (pairId: string) => {
    if (isResolved || matchedPairIds.has(pairId) || !selectedLeft) return;

    if (selectedLeft === pairId) {
      // Correct match!
      audioService.playSoundEffect('correct');
      const updated = new Set(matchedPairIds).add(pairId);
      setMatchedPairIds(updated);
      setSelectedLeft(null);

      // Check if all pairs matched
      if (updated.size === exercise.pairs.length) {
        onAnswer(!hadMistake);
      }
    } else {
      // Incorrect match
      audioService.playSoundEffect('wrong');
      setHadMistake(true);
      setSelectedLeft(null);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full bg-white/90 rounded-3xl p-5 border-3 border-[#6C5CE7]/30 shadow-md text-center">
        <span className="font-fredoka text-sm uppercase font-bold text-[#6C5CE7] tracking-wider">
          {exercise.instruction}
        </span>
        <h2 className="font-fredoka text-2xl sm:text-3xl text-[#26324A] font-bold mt-1">
          {exercise.prompt}
        </h2>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-3">
          {exercise.pairs.map((pair) => {
            const isMatched = matchedPairIds.has(pair.id);
            const isSelected = selectedLeft === pair.id;

            return (
              <button
                key={`left-${pair.id}`}
                type="button"
                disabled={isMatched || isResolved}
                onClick={() => handleSelectLeft(pair.id)}
                className={`p-4 rounded-2xl flex items-center justify-between font-fredoka font-bold text-base sm:text-lg transition-all border-b-4 cursor-pointer shadow-sm min-h-[64px] ${
                  isMatched
                    ? 'bg-emerald-50 border-[#35C98A] text-[#27AD72] opacity-80 cursor-default'
                    : isSelected
                    ? 'bg-purple-100 border-[#6C5CE7] text-[#6C5CE7] scale-102 ring-2 ring-[#6C5CE7]'
                    : 'bg-white border-gray-200 hover:border-[#6C5CE7] text-[#26324A]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {pair.left.emoji && <span className="text-2xl">{pair.left.emoji}</span>}
                  <span>{pair.left.text}</span>
                </div>
                {isMatched && <Check size={20} className="text-[#35C98A]" />}
              </button>
            );
          })}
        </div>

        {/* Right Column (shuffled) */}
        <div className="flex flex-col gap-3">
          {shuffledPairs.map((pair) => {
            const isMatched = matchedPairIds.has(pair.id);

            return (
              <button
                key={`right-${pair.id}`}
                type="button"
                disabled={isMatched || isResolved || !selectedLeft}
                onClick={() => handleSelectRight(pair.id)}
                className={`p-4 rounded-2xl flex items-center justify-between font-fredoka font-bold text-base sm:text-lg transition-all border-b-4 shadow-sm min-h-[64px] ${
                  isMatched
                    ? 'bg-emerald-50 border-[#35C98A] text-[#27AD72] opacity-80 cursor-default'
                    : selectedLeft
                    ? 'bg-amber-50/60 border-amber-300 hover:border-[#FFB547] hover:bg-amber-100 text-[#26324A] cursor-pointer'
                    : 'bg-white border-gray-200 text-gray-400 cursor-not-allowed opacity-90'
                }`}
              >
                <div className="flex items-center gap-2">
                  {pair.right.emoji && <span className="text-2xl">{pair.right.emoji}</span>}
                  <span>{pair.right.text}</span>
                </div>
                {isMatched && <Check size={20} className="text-[#35C98A]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
