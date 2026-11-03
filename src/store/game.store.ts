import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { GameState, PlayerProfile, LevelResult, Difficulty, AvatarId } from '../types/game.types';
import { audioService } from '../services/audio.service';
import { checkNewlyUnlockedBadges } from '../services/scoring.service';

interface GameStore extends GameState {
  hasInitializedProfile: boolean;
  setPlayerProfile: (profile: Partial<PlayerProfile>) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setAvatar: (avatar: AvatarId) => void;
  setNickname: (name: string) => void;
  completeLevel: (result: LevelResult) => { newlyUnlockedBadges: string[] };
  toggleSound: () => void;
  toggleReducedMotion: () => void;
  resetProgress: () => void;
}

const DEFAULT_STATE: GameState = {
  player: {
    name: 'Explorer',
    avatar: 'fox',
    difficulty: 'little',
  },
  completedLevelIds: [],
  bestStarsByLevel: {},
  totalCoins: 0,
  unlockedBadgeIds: [],
  settings: {
    soundEnabled: true,
    reducedMotion: false,
  },
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,
      hasInitializedProfile: false,

      setPlayerProfile: (profile) => {
        set((state) => ({
          hasInitializedProfile: true,
          player: {
            ...state.player,
            ...profile,
          },
        }));
      },

      setDifficulty: (difficulty) => {
        set((state) => ({
          player: {
            ...state.player,
            difficulty,
          },
        }));
      },

      setAvatar: (avatar) => {
        set((state) => ({
          player: {
            ...state.player,
            avatar,
          },
        }));
      },

      setNickname: (name) => {
        set((state) => ({
          player: {
            ...state.player,
            name: name.trim() || 'Explorer',
          },
        }));
      },

      completeLevel: (result) => {
        const state = get();
        const currentBest = state.bestStarsByLevel[result.levelId] || 0;
        const newBestStars = Math.max(currentBest, result.stars) as 1 | 2 | 3;

        const updatedCompleted = Array.from(new Set([...state.completedLevelIds, result.levelId]));
        const updatedStarsMap = {
          ...state.bestStarsByLevel,
          [result.levelId]: newBestStars,
        };

        const updatedCoins = state.totalCoins + result.coinsEarned;

        const tempState: GameState = {
          ...state,
          completedLevelIds: updatedCompleted,
          bestStarsByLevel: updatedStarsMap,
          totalCoins: updatedCoins,
        };

        const newlyUnlocked = checkNewlyUnlockedBadges(tempState);
        const updatedBadges = Array.from(new Set([...state.unlockedBadgeIds, ...newlyUnlocked]));

        set({
          completedLevelIds: updatedCompleted,
          bestStarsByLevel: updatedStarsMap,
          totalCoins: updatedCoins,
          unlockedBadgeIds: updatedBadges,
        });

        return { newlyUnlockedBadges: newlyUnlocked };
      },

      toggleSound: () => {
        set((state) => {
          const next = !state.settings.soundEnabled;
          audioService.setSoundEnabled(next);
          return {
            settings: {
              ...state.settings,
              soundEnabled: next,
            },
          };
        });
      },

      toggleReducedMotion: () => {
        set((state) => ({
          settings: {
            ...state.settings,
            reducedMotion: !state.settings.reducedMotion,
          },
        }));
      },

      resetProgress: () => {
        set({
          ...DEFAULT_STATE,
          hasInitializedProfile: false,
        });
      },
    }),
    {
      name: 'english-adventure-save-v1',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          audioService.setSoundEnabled(state.settings.soundEnabled);
        }
      },
    }
  )
);
