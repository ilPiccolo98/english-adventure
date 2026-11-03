import React from 'react';
import type { ListenRepeatExercise } from '../../../types/exercise.types';
import { AudioButton } from '../../../components/ui/AudioButton';
import { Button } from '../../../components/ui/Button';
import { audioService } from '../../../services/audio.service';
import { CheckCircle } from 'lucide-react';

interface Props {
  exercise: ListenRepeatExercise;
  onAnswer: (isCorrect: boolean) => void;
  isResolved: boolean;
}

export const ListenRepeatRenderer: React.FC<Props> = ({
  exercise,
  onAnswer,
  isResolved,
}) => {
  const handleSelfConfirm = () => {
    if (isResolved) return;
    audioService.playSoundEffect('correct');
    onAnswer(true);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full bg-white/90 rounded-3xl p-6 border-3 border-[#35C98A]/40 shadow-md text-center flex flex-col items-center gap-2">
        <span className="font-fredoka text-sm uppercase font-bold text-[#35C98A] tracking-wider">
          {exercise.instruction}
        </span>
        <h2 className="font-fredoka text-2xl sm:text-3xl text-[#26324A] font-bold">
          {exercise.prompt}
        </h2>
        {exercise.phoneticFocus && (
          <span className="text-xs font-bold text-[#6C5CE7] bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            Phonetics: {exercise.phoneticFocus}
          </span>
        )}
      </div>

      {/* Target Word Hero Display */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border-4 border-[#35C98A] shadow-xl flex flex-col items-center text-center gap-4">
        {exercise.emoji && <span className="text-6xl drop-shadow-sm">{exercise.emoji}</span>}
        <div className="font-fredoka text-4xl sm:text-5xl font-black text-[#26324A] tracking-wider uppercase">
          {exercise.targetWord}
        </div>

        <div>
          <AudioButton
            textToSpeak={exercise.audioText || exercise.targetWord}
            label="Listen to Model"
            size="lg"
          />
        </div>

        <p className="text-sm font-semibold text-gray-500 font-nunito mt-1">
          {exercise.repeatPrompt}
        </p>
      </div>

      {/* Child Self-Reporting Confirmation Button */}
      <div className="w-full max-w-sm flex justify-center">
        <Button
          variant="green"
          size="xl"
          disabled={isResolved}
          onClick={handleSelfConfirm}
          className="w-full shadow-lg"
          icon={<CheckCircle size={28} />}
        >
          I DID IT! 🗣️
        </Button>
      </div>
    </div>
  );
};
