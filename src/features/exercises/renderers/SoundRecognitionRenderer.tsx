import React, { useState } from 'react';
import type { SoundRecognitionExercise } from '../../../types/exercise.types';
import { AudioButton } from '../../../components/ui/AudioButton';
import { audioService } from '../../../services/audio.service';

interface Props {
  exercise: SoundRecognitionExercise;
  onAnswer: (isCorrect: boolean) => void;
  isResolved: boolean;
}

export const SoundRecognitionRenderer: React.FC<Props> = ({
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
      if (newAttempts >= 2) {
        onAnswer(false);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full bg-white/90 rounded-3xl p-5 border-3 border-[#35C98A]/30 shadow-md text-center flex flex-col items-center gap-2">
        <span className="font-fredoka text-sm uppercase font-bold text-[#35C98A] tracking-wider">
          {exercise.instruction}
        </span>
        <h2 className="font-fredoka text-2xl sm:text-3xl text-[#26324A] font-bold">
          {exercise.prompt}
        </h2>

        <div className="mt-2">
          <AudioButton textToSpeak={exercise.audioText || exercise.playedWord} label="Play Sound" size="lg" />
        </div>
      </div>

      {/* 2 Sound Choices */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
        {exercise.options.map((opt) => {
          const isSelected = selectedId === opt.id;
          const showAsCorrect = isResolved && opt.isCorrect;

          let style =
            'bg-white border-b-6 border-gray-200 hover:border-[#35C98A] hover:bg-emerald-50 text-[#26324A]';
          if (showAsCorrect) {
            style = 'bg-emerald-50 border-b-6 border-[#35C98A] text-[#27AD72] scale-102';
          } else if (isSelected && !opt.isCorrect) {
            style = 'bg-amber-50 border-b-6 border-[#FFB547] text-[#26324A] opacity-75';
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={isResolved}
              onClick={() => handleSelect(opt.id, opt.isCorrect)}
              className={`p-6 rounded-3xl flex flex-col items-center justify-center gap-2 font-fredoka cursor-pointer shadow-md transition-all active:scale-95 ${style}`}
            >
              {opt.emoji && <span className="text-4xl">{opt.emoji}</span>}
              <span className="text-2xl font-black">{opt.soundLabel}</span>
              <span className="text-sm font-semibold text-gray-500">Word: "{opt.word}"</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
