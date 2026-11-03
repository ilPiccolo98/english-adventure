import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/game.store';
import type { Difficulty, AvatarId } from '../../types/game.types';
import { AvatarDisplay } from '../../components/icons/GameIcons';
import { AVATAR_LIST } from '../../data/avatars.data';
import { Button } from '../../components/ui/Button';
import { Compass, Sparkles, Check } from 'lucide-react';
import { TeacherTinaPortrait } from '../../components/game/TeacherTinaPortrait';
import { ParentButton } from '../../components/game/ParentButton';

export const PlayerSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const player = useGameStore((state) => state.player);
  const setPlayerProfile = useGameStore((state) => state.setPlayerProfile);

  const [difficulty, setDifficulty] = useState<Difficulty>(player.difficulty || 'little');
  const [avatar, setAvatar] = useState<AvatarId>(player.avatar || 'fox');
  const [nickname, setNickname] = useState<string>(player.name === 'Explorer' ? '' : player.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlayerProfile({
      name: nickname.trim() || 'Explorer',
      avatar,
      difficulty,
    });
    navigate('/map');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#B4E4FF] via-[#F0EDFF] to-[#FFF9F0] py-8 px-4 flex flex-col items-center select-none">
      {/* Top Bar with For Parents Button */}
      <div className="w-full max-w-xl flex items-center justify-between mb-3 z-10">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-xs font-fredoka font-bold text-[#6C5CE7] bg-white px-3.5 py-1.5 rounded-2xl border-2 border-purple-100 shadow-xs hover:bg-purple-50 cursor-pointer"
        >
          ← Home
        </button>
        <ParentButton size="sm" />
      </div>

      <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-[#6C5CE7] shadow-2xl">
        {/* Header Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-white bg-[#6C5CE7] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
            <Compass size={16} /> Explorer Character Select
          </div>
          <h1 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
            WHO ARE YOU?
          </h1>
          <p className="text-sm font-bold text-gray-500 font-nunito mt-1">
            Choose your learning path and pick your arcade hero!
          </p>
        </div>

        {/* Teacher Tina Welcome Banner */}
        <div className="mb-6 bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 p-4 rounded-3xl border-3 border-purple-200 flex items-center gap-4 shadow-sm">
          <TeacherTinaPortrait
            photo="welcome"
            variant="avatar"
            size="md"
            altText="Teacher Tina welcoming explorer"
          />
          <div>
            <span className="font-fredoka text-sm font-black text-[#6C5CE7] flex items-center gap-1">
              Teacher Tina says: <Sparkles size={14} className="text-[#FFB547] fill-[#FFB547]" />
            </span>
            <p className="font-nunito text-xs sm:text-sm font-bold text-[#26324A] leading-snug mt-0.5">
              "Welcome to English class, Explorer! Pick your hero, complete all 15 stages, and win your official Certificate to qualify for 1-on-1 private lessons!"
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Path Selection */}
          <div>
            <label className="font-fredoka text-base sm:text-lg font-black text-[#26324A] block mb-3">
              1. Choose your adventure difficulty:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Little Explorer Card */}
              <button
                type="button"
                onClick={() => setDifficulty('little')}
                className={`p-4 rounded-3xl border-4 text-left transition-all duration-150 cursor-pointer shadow-md relative overflow-hidden ${
                  difficulty === 'little'
                    ? 'border-[#FFB547] bg-[#FFF9E6] ring-4 ring-[#FFB547]/40 scale-102'
                    : 'border-gray-200 bg-white hover:border-gray-300 opacity-80'
                }`}
              >
                {difficulty === 'little' && (
                  <div className="absolute top-2 right-2 bg-[#FFB547] text-white p-1 rounded-full shadow-xs">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl">🐣</span>
                  <span className="font-fredoka text-xs font-black bg-[#FFB547] text-[#26324A] px-2.5 py-0.5 rounded-full uppercase">
                    Ages 5–7
                  </span>
                </div>
                <h3 className="font-fredoka text-xl font-black text-[#26324A]">
                  Little Explorer
                </h3>
                <p className="text-xs text-gray-700 font-nunito font-semibold mt-1">
                  Single words, animal matching, big pictures, and gentle sound listening.
                </p>
              </button>

              {/* Super Explorer Card */}
              <button
                type="button"
                onClick={() => setDifficulty('super')}
                className={`p-4 rounded-3xl border-4 text-left transition-all duration-150 cursor-pointer shadow-md relative overflow-hidden ${
                  difficulty === 'super'
                    ? 'border-[#6C5CE7] bg-purple-50 ring-4 ring-[#6C5CE7]/40 scale-102'
                    : 'border-gray-200 bg-white hover:border-gray-300 opacity-80'
                }`}
              >
                {difficulty === 'super' && (
                  <div className="absolute top-2 right-2 bg-[#6C5CE7] text-white p-1 rounded-full shadow-xs">
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl">🚀</span>
                  <span className="font-fredoka text-xs font-black bg-[#6C5CE7] text-white px-2.5 py-0.5 rounded-full uppercase">
                    Ages 8–10
                  </span>
                </div>
                <h3 className="font-fredoka text-xl font-black text-[#26324A]">
                  Super Explorer
                </h3>
                <p className="text-xs text-gray-700 font-nunito font-semibold mt-1">
                  Sentence building, reading stories, grammar puzzles, and sound discrimination.
                </p>
              </button>
            </div>
          </div>

          {/* Arcade Character Carousel */}
          <div>
            <label className="font-fredoka text-base sm:text-lg font-black text-[#26324A] block mb-3">
              2. Pick your arcade hero avatar:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {AVATAR_LIST.map((item) => {
                const isSelected = avatar === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAvatar(item.id)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-4 transition-all cursor-pointer shadow-sm ${
                      isSelected
                        ? 'border-[#6C5CE7] bg-purple-100 ring-4 ring-[#6C5CE7]/30 scale-108'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100 opacity-80'
                    }`}
                  >
                    <AvatarDisplay avatar={item.id} size="md" />
                    <span className="font-fredoka text-xs font-black text-[#26324A] truncate max-w-full">
                      {item.label.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nickname Input */}
          <div>
            <label
              htmlFor="nickname-input"
              className="font-fredoka text-base sm:text-lg font-black text-[#26324A] block mb-1"
            >
              3. Your Explorer Nickname (Optional):
            </label>
            <p className="text-xs text-gray-500 font-nunito font-semibold mb-2">
              No real name or email needed. Just a fun nickname for your map!
            </p>
            <input
              id="nickname-input"
              type="text"
              maxLength={15}
              placeholder="e.g. Leo, Noor, Star"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl border-3 border-gray-200 focus:border-[#6C5CE7] focus:outline-none font-fredoka text-lg text-[#26324A] bg-gray-50 focus:bg-white transition-colors shadow-inner"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="purple"
              size="xl"
              className="w-full shadow-2xl text-xl py-5"
              icon={<Sparkles size={24} />}
            >
              ENTER ADVENTURE MAP!
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
