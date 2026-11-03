import React, { useState } from 'react';
import type { MemoryMatchExercise } from '../../../types/exercise.types';
import { audioService } from '../../../services/audio.service';

interface Props {
  exercise: MemoryMatchExercise;
  onAnswer: (isCorrect: boolean) => void;
  isResolved: boolean;
}

export const MemoryMatchRenderer: React.FC<Props> = ({
  exercise,
  onAnswer,
  isResolved,
}) => {
  const [cards] = useState(() => {
    return [...exercise.cards].sort(() => Math.random() - 0.5);
  });
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<Set<string>>(new Set());
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [hadMistake, setHadMistake] = useState<boolean>(false);

  const handleCardClick = (index: number) => {
    if (isResolved || isEvaluating) return;
    if (flippedIndices.includes(index)) return;

    const targetCard = cards[index];
    if (matchedPairIds.has(targetCard.pairId)) return;

    audioService.playSoundEffect('pop');

    if (flippedIndices.length === 0) {
      setFlippedIndices([index]);
    } else if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      const firstCard = cards[firstIndex];
      const secondCard = targetCard;

      setFlippedIndices([firstIndex, index]);
      setIsEvaluating(true);

      if (firstCard.pairId === secondCard.pairId) {
        // Matched!
        setTimeout(() => {
          audioService.playSoundEffect('correct');
          const updated = new Set(matchedPairIds).add(firstCard.pairId);
          setMatchedPairIds(updated);
          setFlippedIndices([]);
          setIsEvaluating(false);

          // All pairs matched?
          const totalPairs = new Set(cards.map((c) => c.pairId)).size;
          if (updated.size === totalPairs) {
            onAnswer(!hadMistake);
          }
        }, 600);
      } else {
        // Did not match
        setTimeout(() => {
          audioService.playSoundEffect('wrong');
          setHadMistake(true);
          setFlippedIndices([]);
          setIsEvaluating(false);
        }, 900);
      }
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

      {/* Cards Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4 max-w-md w-full">
        {cards.map((card, index) => {
          const isFlipped =
            flippedIndices.includes(index) || matchedPairIds.has(card.pairId) || isResolved;
          const isMatched = matchedPairIds.has(card.pairId);

          return (
            <button
              key={card.id + index}
              type="button"
              disabled={isMatched || isResolved || isEvaluating}
              onClick={() => handleCardClick(index)}
              className={`aspect-square rounded-3xl flex flex-col items-center justify-center p-2 font-fredoka font-bold text-center border-b-6 transition-all duration-200 cursor-pointer shadow-md select-none ${
                isMatched
                  ? 'bg-emerald-50 border-[#35C98A] text-[#27AD72] scale-98'
                  : isFlipped
                  ? 'bg-white border-[#6C5CE7] text-[#26324A] scale-102'
                  : 'bg-gradient-to-br from-[#6C5CE7] to-[#40BFE8] border-[#5644D4] text-white hover:brightness-105 active:scale-95'
              }`}
            >
              {isFlipped ? (
                <div className="flex flex-col items-center justify-center gap-1">
                  {card.type === 'emoji' ? (
                    <span className="text-4xl sm:text-5xl">{card.content}</span>
                  ) : (
                    <span className="text-lg sm:text-xl text-[#26324A] font-black tracking-wide">
                      {card.content}
                    </span>
                  )}
                  {card.label && (
                    <span className="text-xs text-gray-500 font-semibold">{card.label}</span>
                  )}
                </div>
              ) : (
                <span className="text-3xl sm:text-4xl opacity-80">❓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
