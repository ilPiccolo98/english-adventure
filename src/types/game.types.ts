export type Difficulty = 'little' | 'super';

export type AvatarId = 'fox' | 'bear' | 'rabbit' | 'owl' | 'lion' | 'panda';

export interface PlayerProfile {
  name: string;
  avatar: AvatarId;
  difficulty: Difficulty;
}

export interface LevelResult {
  levelId: string;
  worldId: string;
  correctFirstTry: number;
  totalQuestions: number;
  stars: 1 | 2 | 3;
  coinsEarned: number;
  didacticSummary: string;
  completedAt: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  condition: (state: GameState) => boolean;
}

export interface GameSettings {
  soundEnabled: boolean;
  reducedMotion: boolean;
}

export interface GameState {
  player: PlayerProfile;
  completedLevelIds: string[];
  bestStarsByLevel: Record<string, 1 | 2 | 3>;
  totalCoins: number;
  unlockedBadgeIds: string[];
  settings: GameSettings;
}

