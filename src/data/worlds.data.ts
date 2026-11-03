import type { World, Level } from '../types/exercise.types';
import { VOCABULARY_ISLAND_LEVELS } from './worlds/01-vocabulary-island';
import { GRAMMAR_CASTLE_LEVELS } from './worlds/02-grammar-castle';
import { PRONUNCIATION_JUNGLE_LEVELS } from './worlds/03-pronunciation-jungle';
import { READING_FOREST_LEVELS } from './worlds/04-reading-forest';
import { LISTENING_CAVE_LEVELS } from './worlds/05-listening-cave';

export const WORLDS_DATA: World[] = [
  {
    id: 'vocabulary-island',
    number: 1,
    title: 'Vocabulary Island',
    skillLabel: 'Vocabulary & Words',
    description: 'Learn new English words through bright pictures, associations, and animal memory matches.',
    themeColor: '#FFB547',
    bgGradient: 'from-amber-200 via-orange-100 to-yellow-50',
    borderColor: '#EAA030',
    icon: '🏝️',
    levels: VOCABULARY_ISLAND_LEVELS,
  },
  {
    id: 'grammar-castle',
    number: 2,
    title: 'Grammar Castle',
    skillLabel: 'Sentence Patterns & Verbs',
    description: 'Build strong sentences, choose correct pronouns, and climb the Verb Tower with building blocks.',
    themeColor: '#6C5CE7',
    bgGradient: 'from-purple-200 via-indigo-100 to-violet-50',
    borderColor: '#5644D4',
    icon: '🏰',
    levels: GRAMMAR_CASTLE_LEVELS,
  },
  {
    id: 'pronunciation-jungle',
    number: 3,
    title: 'Pronunciation Jungle',
    skillLabel: 'Sounds, P vs B & Speech',
    description: 'Listen, repeat aloud, and master tricky English sounds with friendly jungle parrots.',
    themeColor: '#35C98A',
    bgGradient: 'from-emerald-200 via-teal-100 to-green-50',
    borderColor: '#27AD72',
    icon: '🦜',
    levels: PRONUNCIATION_JUNGLE_LEVELS,
  },
  {
    id: 'reading-forest',
    number: 4,
    title: 'Reading Forest',
    skillLabel: 'Story Reading & Meaning',
    description: 'Read short illustrated stories, meet storybook friends, and solve comprehension quests.',
    themeColor: '#40BFE8',
    bgGradient: 'from-sky-200 via-blue-100 to-cyan-50',
    borderColor: '#2CAAD4',
    icon: '🌲',
    levels: READING_FOREST_LEVELS,
  },
  {
    id: 'listening-cave',
    number: 5,
    title: 'Listening Cave',
    skillLabel: 'Listening & Real English',
    description: 'Tune your ears in the crystal cavern to hear instructions, dialogues, and mission clues.',
    themeColor: '#FF7285',
    bgGradient: 'from-rose-200 via-pink-100 to-fuchsia-50',
    borderColor: '#E65A6E',
    icon: '🔮',
    levels: LISTENING_CAVE_LEVELS,
  },
];

export function getWorldById(worldId: string): World | undefined {
  return WORLDS_DATA.find((w) => w.id === worldId);
}

export function getLevelById(levelId: string): { level: Level; world: World } | undefined {
  for (const world of WORLDS_DATA) {
    const level = world.levels.find((l) => l.id === levelId);
    if (level) {
      return { level, world };
    }
  }
  return undefined;
}

export function getNextLevel(currentLevelId: string): { level: Level; world: World } | undefined {
  const current = getLevelById(currentLevelId);
  if (!current) return undefined;

  const currentLevelIndex = current.world.levels.findIndex((l) => l.id === currentLevelId);
  if (currentLevelIndex < current.world.levels.length - 1) {
    return {
      level: current.world.levels[currentLevelIndex + 1],
      world: current.world,
    };
  }

  // Next world first level
  const currentWorldIndex = WORLDS_DATA.findIndex((w) => w.id === current.world.id);
  if (currentWorldIndex < WORLDS_DATA.length - 1) {
    const nextWorld = WORLDS_DATA[currentWorldIndex + 1];
    if (nextWorld.levels.length > 0) {
      return {
        level: nextWorld.levels[0],
        world: nextWorld,
      };
    }
  }

  return undefined;
}
