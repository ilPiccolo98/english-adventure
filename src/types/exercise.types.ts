import type { Difficulty } from './game.types';

export type ExerciseType =
  | 'multipleChoice'
  | 'matchingPairs'
  | 'memoryMatch'
  | 'fillTheGap'
  | 'sentenceOrder'
  | 'listenAndRepeat'
  | 'soundRecognition'
  | 'readingComprehension';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  difficulty: Difficulty;
  instruction: string;
  prompt: string;
  audioText?: string;
  explanation?: string;
  points?: number;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multipleChoice';
  promptImage?: string;
  emoji?: string;
  options: Array<{
    id: string;
    text: string;
    image?: string;
    emoji?: string;
    audioText?: string;
    isCorrect: boolean;
  }>;
}

export interface MatchingPairsExercise extends BaseExercise {
  type: 'matchingPairs';
  pairs: Array<{
    id: string;
    left: { text: string; emoji?: string; image?: string };
    right: { text: string; emoji?: string; image?: string };
  }>;
}

export interface MemoryMatchExercise extends BaseExercise {
  type: 'memoryMatch';
  cards: Array<{
    id: string;
    pairId: string;
    type: 'text' | 'emoji' | 'image';
    content: string;
    label?: string;
  }>;
}

export interface FillTheGapExercise extends BaseExercise {
  type: 'fillTheGap';
  sentenceParts: {
    before: string;
    after: string;
  };
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  hintEmoji?: string;
}

export interface SentenceOrderExercise extends BaseExercise {
  type: 'sentenceOrder';
  words: string[];
  correctOrder: string[];
  hintEmoji?: string;
}

export interface ListenRepeatExercise extends BaseExercise {
  type: 'listenAndRepeat';
  targetWord: string;
  phoneticFocus?: string;
  emoji?: string;
  repeatPrompt: string;
}

export interface SoundRecognitionExercise extends BaseExercise {
  type: 'soundRecognition';
  targetSound: string; // e.g. "P" or "B"
  contrastSound: string;
  playedWord: string;
  options: Array<{
    id: string;
    soundLabel: string;
    word: string;
    emoji?: string;
    isCorrect: boolean;
  }>;
}

export interface ReadingComprehensionExercise extends BaseExercise {
  type: 'readingComprehension';
  storyPassage: string;
  storyImage?: string;
  storyEmoji?: string;
  questions: Array<{
    id: string;
    questionText: string;
    options: string[];
    correctOption: string;
    explanation?: string;
  }>;
}

export type Exercise =
  | MultipleChoiceExercise
  | MatchingPairsExercise
  | MemoryMatchExercise
  | FillTheGapExercise
  | SentenceOrderExercise
  | ListenRepeatExercise
  | SoundRecognitionExercise
  | ReadingComprehensionExercise;

export interface Level {
  id: string;
  worldId: string;
  levelNumber: number;
  title: string;
  topic: string;
  icon: string;
  description: string;
  didacticTakeaway: string;
  exercises: {
    little: Exercise[];
    super: Exercise[];
  };
}

export interface World {
  id: string;
  number: number;
  title: string;
  skillLabel: string;
  description: string;
  themeColor: string;
  bgGradient: string;
  borderColor: string;
  icon: string;
  levels: Level[];
}
