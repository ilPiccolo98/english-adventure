import type { Badge, GameState } from '../types/game.types';

export const BADGES: Badge[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Completed your very first English level!',
    icon: '🌱',
    condition: (state: GameState) => state.completedLevelIds.length >= 1,
  },
  {
    id: 'word-explorer',
    title: 'Word Explorer',
    description: 'Mastered the vocabulary of animals, colors, and numbers!',
    icon: '🏝️',
    condition: (state: GameState) => 
      state.completedLevelIds.some(id => id.startsWith('vocab-')),
  },
  {
    id: 'grammar-hero',
    title: 'Grammar Hero',
    description: 'Constructed sentences and mastered verbs in the Castle!',
    icon: '🏰',
    condition: (state: GameState) => 
      state.completedLevelIds.some(id => id.startsWith('grammar-')),
  },
  {
    id: 'sound-detective',
    title: 'Sound Detective',
    description: 'Discovered tricky English sounds in the Jungle!',
    icon: '🦜',
    condition: (state: GameState) => 
      state.completedLevelIds.some(id => id.startsWith('pronun-')),
  },
  {
    id: 'reading-star',
    title: 'Reading Star',
    description: 'Read fun stories and solved mysteries in the Forest!',
    icon: '📖',
    condition: (state: GameState) => 
      state.completedLevelIds.some(id => id.startsWith('reading-')),
  },
  {
    id: 'super-listener',
    title: 'Super Listener',
    description: 'Ears sharp like an owl in the Listening Cave!',
    icon: '🎧',
    condition: (state: GameState) => 
      state.completedLevelIds.some(id => id.startsWith('listening-')),
  },
  {
    id: 'english-champion',
    title: 'English Champion',
    description: 'Earned 15 or more stars across the adventure!',
    icon: '🏆',
    condition: (state: GameState) => {
      const totalStars = Object.values(state.bestStarsByLevel).reduce((a, b) => a + b, 0);
      return totalStars >= 15;
    },
  },
];
