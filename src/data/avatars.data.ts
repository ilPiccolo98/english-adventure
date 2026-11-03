import type { AvatarId } from '../types/game.types';

export interface AvatarItem {
  id: AvatarId;
  label: string;
  emoji: string;
  color: string;
}

export const AVATAR_LIST: AvatarItem[] = [
  { id: 'fox', label: 'Felix Fox', emoji: '🦊', color: '#FF7285' },
  { id: 'bear', label: 'Barnaby Bear', emoji: '🐻', color: '#FFB547' },
  { id: 'rabbit', label: 'Rosie Rabbit', emoji: '🐰', color: '#40BFE8' },
  { id: 'owl', label: 'Oliver Owl', emoji: '🦉', color: '#6C5CE7' },
  { id: 'lion', label: 'Leo Lion', emoji: '🦁', color: '#FFA000' },
  { id: 'panda', label: 'Penny Panda', emoji: '🐼', color: '#35C98A' },
];

