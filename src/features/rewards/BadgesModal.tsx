import React from 'react';
import { Modal } from '../../components/ui/Modal';
import { BADGES } from '../../data/badges.data';
import { useGameStore } from '../../store/game.store';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ isOpen, onClose }) => {
  const unlockedIds = useGameStore((state) => state.unlockedBadgeIds);
  const unlockedSet = new Set(unlockedIds);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="My Explorer Badges 🏆">
      <div className="space-y-4 py-2">
        <p className="text-center text-sm font-nunito font-semibold text-gray-600">
          Complete missions across the 5 worlds to unlock shiny explorer badges!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {BADGES.map((badge) => {
            const isUnlocked = unlockedSet.has(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border-3 flex items-center gap-3 transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-[#FFB547] shadow-sm'
                    : 'bg-gray-100/70 border-gray-200 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    isUnlocked ? 'bg-white shadow-xs' : 'bg-gray-200 grayscale'
                  }`}
                >
                  {badge.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-fredoka font-bold text-base text-[#26324A] truncate">
                      {badge.title}
                    </h4>
                    {isUnlocked && <span className="text-xs">⭐</span>}
                  </div>
                  <p className="text-xs text-gray-600 font-nunito leading-tight line-clamp-2">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

