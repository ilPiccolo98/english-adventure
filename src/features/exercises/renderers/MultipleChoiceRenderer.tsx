import React, { useState } from 'react';
import type { MultipleChoiceExercise } from '../../../types/exercise.types';
import { AudioButton } from '../../../components/ui/AudioButton';
import { audioService } from '../../../services/audio.service';

interface Props {
  exercise: MultipleChoiceExercise;
  onAnswer: (isCorrect: boolean) => void;
  isResolved: boolean;
}

export const MultipleChoiceRenderer: React.FC<Props> = ({
  exercise,
  onAnswer,
  isResolved,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<number>(0);

  const handleSelect = (optionId: string, isCorrect: boolean) => {
    if (isResolved) return;
    setSelectedId(optionId);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (isCorrect) {
      audioService.playSoundEffect('correct');
      onAnswer(newAttempts === 1);
    } else {
      audioService.playSoundEffect('wrong');
      // If failed twice, gently resolve to keep game moving without frustration
      if (newAttempts >= 2) {
        onAnswer(false);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Exercise Prompt Box */}
      <div className="w-full bg-white/90 rounded-3xl p-6 border-3 border-[#6C5CE7]/30 shadow-md flex flex-col items-center text-center gap-3">
        <span className="font-fredoka text-sm uppercase font-bold text-[#6C5CE7] tracking-wider">
          {exercise.instruction}
        </span>
        <h2 className="font-fredoka text-2xl sm:text-3xl text-[#26324A] font-bold">
          {exercise.prompt}
        </h2>

        {exercise.audioText && (
          <div className="mt-2">
            <AudioButton textToSpeak={exercise.audioText} label="Listen to Clue" size="md" />
          </div>
        )}
      </div>

      {/* Answer Options Grid */}
      <div
        className={`w-full grid gap-4 ${
          exercise.options.length === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : exercise.options.length === 3
            ? 'grid-cols-1 sm:grid-cols-3'
            : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-4'
        }`}
      >
        {exercise.options.map((option) => {
          const isSelected = selectedId === option.id;
          const showAsCorrect = isResolved && option.isCorrect;
          const showAsIncorrect = isSelected && !option.isCorrect;

          let cardStyle =
            'bg-white border-b-6 border-gray-200 hover:border-[#6C5CE7] hover:bg-purple-50/50 text-[#26324A]';

          if (showAsCorrect) {
            cardStyle = 'bg-emerald-50 border-b-6 border-[#35C98A] text-[#27AD72] scale-102';
          } else if (showAsIncorrect) {
            cardStyle = 'bg-amber-50 border-b-6 border-[#FFB547] text-[#26324A] opacity-70';
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={isResolved}
              onClick={() => handleSelect(option.id, option.isCorrect)}
              className={`p-5 rounded-3xl flex flex-col items-center justify-center gap-3 font-fredoka transition-all duration-150 cursor-pointer shadow-md min-h-[110px] active:scale-98 ${cardStyle}`}
            >
              {option.emoji && (
                <span className="text-4xl sm:text-5xl drop-shadow-xs select-none">
                  {option.emoji}
                </span>
              )}
              <span className="text-lg sm:text-xl font-bold tracking-wide text-center">
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
