import type { GameState } from '../types/game.types';
import { BADGES } from '../data/badges.data';

export function calculateStars(correctFirstTry: number, totalQuestions: number): 1 | 2 | 3 {
  if (totalQuestions <= 0) return 1;
  const ratio = correctFirstTry / totalQuestions;
  if (ratio >= 0.9) return 3;
  if (ratio >= 0.65) return 2;
  return 1; // Completed level always receives at least 1 star!
}

export function calculateCoinsEarned(stars: 1 | 2 | 3): number {
  if (stars === 3) return 15;
  if (stars === 2) return 12;
  return 10;
}

export function checkNewlyUnlockedBadges(state: GameState): string[] {
  const currentBadgeIds = new Set(state.unlockedBadgeIds);
  const newlyUnlocked: string[] = [];

  for (const badge of BADGES) {
    if (!currentBadgeIds.has(badge.id) && badge.condition(state)) {
      newlyUnlocked.push(badge.id);
    }
  }

  return newlyUnlocked;
}

export function formatEncouragement(stars: 1 | 2 | 3): string {
  if (stars === 3) {
    const list = [
      'AMAZING! You got a perfect score! 🌟',
      'SUPERSTAR! English champion in action! 🚀',
      'BRILLIANT! You answered like a master! 🏆',
    ];
    return list[Math.floor(Math.random() * list.length)];
  }
  if (stars === 2) {
    const list = [
      'GREAT JOB! You are getting stronger every day! 💪',
      'FANTASTIC WORK! Keep up the great adventure! ✨',
      'WONDERFUL! You did so well! 🎈',
    ];
    return list[Math.floor(Math.random() * list.length)];
  }
  const list = [
    'GOOD TRY! You finished the mission! Proud of you! 💖',
    'WELL DONE! Every step makes you smarter! 🌱',
    'YOU DID IT! Practice makes you a hero! 🎯',
  ];
  return list[Math.floor(Math.random() * list.length)];
}
