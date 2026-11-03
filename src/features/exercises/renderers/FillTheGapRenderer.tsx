import React, { useState } from 'react';
import type { FillTheGapExercise } from '../../../types/exercise.types';
import { audioService } from '../../../services/audio.service';

interface Props {
  exercise: FillTheGapExercise;
  onAnswer: (isCorrect: boolean) => void;
  isResolved: boolean;
}

export const FillTheGapRenderer: React.FC<Props> = ({
  exercise,
  onAnswer,
  isResolved,
}) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<number>(0);

  const handleSelectOption = (option: { id: string; text: string; isCorrect: boolean }) => {
    if (isResolved) return;
    setSelectedWord(option.text);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (option.isCorrect) {
      audioService.playSoundEffect('correct');
      onAnswer(newAttempts === 1);
    } else {
      audioService.playSoundEffect('wrong');
      if (newAttempts >= 2) {
        onAnswer(false);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full bg-white/90 rounded-3xl p-6 border-3 border-[#6C5CE7]/30 shadow-md text-center">
        <span className="font-fredoka text-sm uppercase font-bold text-[#6C5CE7] tracking-wider">
          {exercise.instruction}
        </span>
        <h2 className="font-fredoka text-2xl sm:text-3xl text-[#26324A] font-bold mt-1">
          {exercise.prompt}
        </h2>
      </div>

      {/* Sentence Slot Bar */}
      <div className="w-full bg-white p-6 rounded-3xl border-3 border-gray-200 shadow-sm flex items-center justify-center flex-wrap gap-2 text-2xl sm:text-3xl font-fredoka font-bold text-[#26324A]">
        {exercise.hintEmoji && <span className="mr-2 text-3xl">{exercise.hintEmoji}</span>}
        {exercise.sentenceParts.before && <span>{exercise.sentenceParts.before}</span>}
        <span
          className={`inline-block px-5 py-1.5 rounded-2xl border-b-4 min-w-[90px] text-center transition-all ${
            selectedWord
              ? isResolved
                ? 'bg-emerald-100 text-[#27AD72] border-[#35C98A]'
                : 'bg-purple-100 text-[#6C5CE7] border-[#6C5CE7]'
              : 'bg-gray-100 text-gray-400 border-gray-300 border-dashed'
          }`}
        >
          {selectedWord || '___'}
        </span>
        {exercise.sentenceParts.after && <span>{exercise.sentenceParts.after}</span>}
      </div>

      {/* Selectable Word Bubbles */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
        {exercise.options.map((opt) => {
          const isSelected = selectedWord === opt.text;
          const showAsCorrect = isResolved && opt.isCorrect;

          let style =
            'bg-white border-b-6 border-gray-200 hover:border-[#6C5CE7] hover:bg-purple-50 text-[#26324A]';
          if (showAsCorrect) {
            style = 'bg-emerald-50 border-b-6 border-[#35C98A] text-[#27AD72] scale-105';
          } else if (isSelected && !opt.isCorrect) {
            style = 'bg-amber-50 border-b-6 border-[#FFB547] text-[#26324A] opacity-75';
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={isResolved}
              onClick={() => handleSelectOption(opt)}
              className={`px-7 py-3.5 rounded-2xl font-fredoka font-bold text-xl sm:text-2xl cursor-pointer shadow-md transition-all active:scale-95 ${style}`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};
