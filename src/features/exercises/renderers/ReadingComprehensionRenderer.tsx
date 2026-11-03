import React, { useState } from 'react';
import type { ReadingComprehensionExercise } from '../../../types/exercise.types';
import { AudioButton } from '../../../components/ui/AudioButton';
import { audioService } from '../../../services/audio.service';

interface Props {
  exercise: ReadingComprehensionExercise;
  onAnswer: (isCorrect: boolean) => void;
  isResolved: boolean;
}

export const ReadingComprehensionRenderer: React.FC<Props> = ({
  exercise,
  onAnswer,
  isResolved,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<number>(0);

  const activeQuestion = exercise.questions[0];

  const handleSelect = (option: string) => {
    if (isResolved || !activeQuestion) return;
    setSelectedOption(option);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const isCorrect = option === activeQuestion.correctOption;
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
      {/* Story Box */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#40BFE8]/40 shadow-lg relative">
        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
          <div className="flex items-center gap-2">
            {exercise.storyEmoji && <span className="text-3xl">{exercise.storyEmoji}</span>}
            <span className="font-fredoka text-sm uppercase font-bold text-[#40BFE8] tracking-wider">
              {exercise.instruction}
            </span>
          </div>
          <AudioButton textToSpeak={exercise.storyPassage} label="Read Aloud" size="sm" />
        </div>

        <p className="font-nunito text-lg sm:text-xl text-[#26324A] font-semibold leading-relaxed">
          {exercise.storyPassage}
        </p>
      </div>

      {/* Question & Options */}
      {activeQuestion && (
        <div className="w-full bg-white/80 rounded-3xl p-5 border-2 border-purple-100 flex flex-col items-center gap-4">
          <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-[#26324A] text-center">
            {activeQuestion.questionText}
          </h3>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeQuestion.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              const showAsCorrect = isResolved && opt === activeQuestion.correctOption;

              let style =
                'bg-white border-b-5 border-gray-200 hover:border-[#6C5CE7] hover:bg-purple-50 text-[#26324A]';
              if (showAsCorrect) {
                style = 'bg-emerald-50 border-b-5 border-[#35C98A] text-[#27AD72] scale-102';
              } else if (isSelected && opt !== activeQuestion.correctOption) {
                style = 'bg-amber-50 border-b-5 border-[#FFB547] text-[#26324A] opacity-75';
              }

              return (
                <button
                  key={i}
                  type="button"
                  disabled={isResolved}
                  onClick={() => handleSelect(opt)}
                  className={`p-4 rounded-2xl font-fredoka font-bold text-base sm:text-lg cursor-pointer shadow-sm transition-all active:scale-95 ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
