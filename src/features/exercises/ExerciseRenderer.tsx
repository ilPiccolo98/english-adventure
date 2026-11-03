import React from 'react';
import type { Exercise } from '../../types/exercise.types';
import { MultipleChoiceRenderer } from './renderers/MultipleChoiceRenderer';
import { MatchingPairsRenderer } from './renderers/MatchingPairsRenderer';
import { MemoryMatchRenderer } from './renderers/MemoryMatchRenderer';
import { FillTheGapRenderer } from './renderers/FillTheGapRenderer';
import { SentenceOrderRenderer } from './renderers/SentenceOrderRenderer';
import { ListenRepeatRenderer } from './renderers/ListenRepeatRenderer';
import { SoundRecognitionRenderer } from './renderers/SoundRecognitionRenderer';
import { ReadingComprehensionRenderer } from './renderers/ReadingComprehensionRenderer';

interface ExerciseRendererProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean) => void;
  isResolved: boolean;
}

export const ExerciseRenderer: React.FC<ExerciseRendererProps> = ({
  exercise,
  onAnswer,
  isResolved,
}) => {
  switch (exercise.type) {
    case 'multipleChoice':
      return (
        <MultipleChoiceRenderer
          exercise={exercise}
          onAnswer={onAnswer}
          isResolved={isResolved}
        />
      );
    case 'matchingPairs':
      return (
        <MatchingPairsRenderer
          exercise={exercise}
          onAnswer={onAnswer}
          isResolved={isResolved}
        />
      );
    case 'memoryMatch':
      return (
        <MemoryMatchRenderer
          exercise={exercise}
          onAnswer={onAnswer}
          isResolved={isResolved}
        />
      );
    case 'fillTheGap':
      return (
        <FillTheGapRenderer
          exercise={exercise}
          onAnswer={onAnswer}
          isResolved={isResolved}
        />
      );
    case 'sentenceOrder':
      return (
        <SentenceOrderRenderer
          exercise={exercise}
          onAnswer={onAnswer}
          isResolved={isResolved}
        />
      );
    case 'listenAndRepeat':
      return (
        <ListenRepeatRenderer
          exercise={exercise}
          onAnswer={onAnswer}
          isResolved={isResolved}
        />
      );
    case 'soundRecognition':
      return (
        <SoundRecognitionRenderer
          exercise={exercise}
          onAnswer={onAnswer}
          isResolved={isResolved}
        />
      );
    case 'readingComprehension':
      return (
        <ReadingComprehensionRenderer
          exercise={exercise}
          onAnswer={onAnswer}
          isResolved={isResolved}
        />
      );
    default:
      return (
        <div className="p-8 text-center text-red-500 font-bold">
          Unknown exercise type: {(exercise as { type: string }).type}
        </div>
      );
  }
};
