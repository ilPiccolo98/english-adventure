import React, { useState } from 'react';
import type { SentenceOrderExercise } from '../../../types/exercise.types';
import { audioService } from '../../../services/audio.service';
import { RotateCcw, Check } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface Props {
  exercise: SentenceOrderExercise;
  onAnswer: (isCorrect: boolean) => void;
  isResolved: boolean;
}

export const SentenceOrderRenderer: React.FC<Props> = ({
  exercise,
  onAnswer,
  isResolved,
}) => {
  // Available words in bank (with unique instance ids in case of duplicates)
  const [bankWords, setBankWords] = useState<Array<{ id: string; word: string }>>(() => {
    return [...exercise.words]
      .sort(() => Math.random() - 0.5)
      .map((w, i) => ({ id: `${w}-${i}`, word: w }));
  });

  const [placedWords, setPlacedWords] = useState<Array<{ id: string; word: string }>>([]);
  const [attempts, setAttempts] = useState<number>(0);

  const handlePlaceWord = (item: { id: string; word: string }) => {
    if (isResolved) return;
    audioService.playSoundEffect('pop');
    setBankWords((prev) => prev.filter((w) => w.id !== item.id));
    setPlacedWords((prev) => [...prev, item]);
  };

  const handleReturnWord = (item: { id: string; word: string }) => {
    if (isResolved) return;
    audioService.playSoundEffect('pop');
    setPlacedWords((prev) => prev.filter((w) => w.id !== item.id));
    setBankWords((prev) => [...prev, item]);
  };

  const handleReset = () => {
    if (isResolved) return;
    audioService.playSoundEffect('pop');
    setBankWords(
      [...exercise.words]
        .sort(() => Math.random() - 0.5)
        .map((w, i) => ({ id: `${w}-${i}`, word: w }))
    );
    setPlacedWords([]);
  };

  const handleCheck = () => {
    if (isResolved) return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const userSentence = placedWords.map((w) => w.word).join(' ');
    const correctSentence = exercise.correctOrder.join(' ');

    if (userSentence === correctSentence) {
      audioService.playSoundEffect('correct');
      onAnswer(newAttempts === 1);
    } else {
      audioService.playSoundEffect('wrong');
      if (newAttempts >= 2) {
        // Auto-arrange to show correct sequence
        onAnswer(false);
      }
    }
  };

  const allWordsPlaced = placedWords.length === exercise.words.length;

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

      {/* Assembly Tray */}
      <div className="w-full min-h-[90px] bg-white p-4 rounded-3xl border-3 border-dashed border-[#6C5CE7]/50 shadow-inner flex flex-wrap items-center justify-center gap-2.5">
        {exercise.hintEmoji && <span className="text-3xl mr-2">{exercise.hintEmoji}</span>}
        {placedWords.length === 0 ? (
          <span className="font-fredoka text-gray-400 text-lg">
            Tap the word cards below to put them here!
          </span>
        ) : (
          placedWords.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={isResolved}
              onClick={() => handleReturnWord(item)}
              className="px-4 py-2.5 bg-purple-100 text-[#6C5CE7] border-b-4 border-[#6C5CE7] rounded-2xl font-fredoka font-bold text-lg sm:text-xl shadow-xs hover:bg-purple-200 cursor-pointer active:scale-95"
            >
              {item.word}
            </button>
          ))
        )}
      </div>

      {/* Available Word Bank */}
      <div className="flex flex-wrap justify-center gap-3 w-full min-h-[60px]">
        {bankWords.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={isResolved}
            onClick={() => handlePlaceWord(item)}
            className="px-5 py-3 bg-white text-[#26324A] border-b-5 border-gray-200 hover:border-[#40BFE8] hover:bg-sky-50 rounded-2xl font-fredoka font-bold text-lg sm:text-xl shadow-md cursor-pointer transition-all active:scale-95"
          >
            {item.word}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <Button
          variant="white"
          size="md"
          disabled={placedWords.length === 0 || isResolved}
          onClick={handleReset}
          icon={<RotateCcw size={18} />}
        >
          Reset
        </Button>
        <Button
          variant="purple"
          size="lg"
          disabled={!allWordsPlaced || isResolved}
          onClick={handleCheck}
          icon={<Check size={20} />}
        >
          Check Sentence
        </Button>
      </div>
    </div>
  );
};
