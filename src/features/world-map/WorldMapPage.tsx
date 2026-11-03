import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TopHUD } from '../../components/game/TopHUD';
import { WORLDS_DATA } from '../../data/worlds.data';
import { useGameStore } from '../../store/game.store';
import { TinaMascot } from '../../components/game/TinaMascot';
import { WorldIslandIllustration } from '../../components/game/WorldIslandIllustration';
import { BadgesModal } from '../rewards/BadgesModal';
import { Award, ArrowRight, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export const WorldMapPage: React.FC = () => {
  const completedLevelIds = useGameStore((state) => state.completedLevelIds);
  const bestStars = useGameStore((state) => state.bestStarsByLevel);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#70A6FF] via-[#D8EEFF] to-[#FFF9F0] flex flex-col select-none relative overflow-x-hidden">
      {/* Background Floating Decorative Clouds & Arcade Particles */}
      <div className="absolute top-16 left-6 text-6xl opacity-40 animate-pulse pointer-events-none">
        ☁️
      </div>
      <div className="absolute top-48 right-10 text-7xl opacity-50 pointer-events-none">
        ☁️
      </div>
      <div className="absolute top-1/2 left-4 text-5xl opacity-35 pointer-events-none">
        ☁️
      </div>
      <div className="absolute top-3/4 right-8 text-6xl opacity-40 pointer-events-none">
        ☁️
      </div>

      <TopHUD showBackHome={false} />

      {/* Main Arcade Map Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col items-center z-10">
        {/* Arcade Overworld Banner */}
        <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-5 border-4 border-[#6C5CE7] shadow-xl flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <TinaMascot pose="avatar" size="sm" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-fredoka text-xs font-black uppercase text-[#6C5CE7] bg-purple-100 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Sparkles size={12} /> OVERWORLD
                </span>
              </div>
              <h1 className="font-fredoka text-2xl sm:text-3xl font-black text-[#26324A] mt-0.5">
                The 5 Floating Worlds
              </h1>
              <p className="text-xs sm:text-sm font-bold text-gray-500 font-nunito">
                Tap any floating island stage to begin your adventure!
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsBadgesOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] hover:brightness-105 text-[#26324A] border-b-4 border-[#EAA030] rounded-2xl font-fredoka font-black text-sm shadow-md cursor-pointer transition-all active:translate-y-1 active:border-b-2 shrink-0"
          >
            <Award size={20} />
            <span>Badges</span>
          </button>
        </div>

        {/* 5 Floating Island Cards on Winding Arcade Trail */}
        <div className="w-full flex flex-col items-center gap-8 relative pb-10">
          {/* Glowing Winding Trail */}
          <div className="hidden sm:block absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-3 bg-gradient-to-b from-[#FFB547] via-[#6C5CE7] to-[#FF7285] rounded-full opacity-40 shadow-inner z-0 border border-white" />

          {WORLDS_DATA.map((world, index) => {
            const worldLevelIds = world.levels.map((l) => l.id);
            const completedCount = worldLevelIds.filter((id) =>
              completedLevelIds.includes(id)
            ).length;
            const totalWorldLevels = world.levels.length;
            const isAllCompleted = completedCount === totalWorldLevels;

            const worldStars = worldLevelIds.reduce((sum, id) => sum + (bestStars[id] || 0), 0);
            const maxStars = totalWorldLevels * 3;

            const isEven = index % 2 === 0;

            return (
              <div
                key={world.id}
                className={`w-full max-w-xl z-10 transition-transform duration-200 hover:scale-[1.02] ${
                  isEven ? 'sm:self-start sm:ml-2' : 'sm:self-end sm:mr-2'
                }`}
              >
                <Link
                  to={`/world/${world.id}`}
                  className="block bg-white/95 rounded-3xl p-5 sm:p-6 border-4 transition-all duration-200 shadow-xl hover:shadow-2xl group relative overflow-hidden"
                  style={{ borderColor: world.borderColor }}
                >
                  {/* Glowing corner ribbon if world is 100% completed */}
                  {isAllCompleted && (
                    <div className="absolute top-3 right-3 bg-[#35C98A] text-white px-2.5 py-1 rounded-full text-xs font-black font-fredoka flex items-center gap-1 shadow-sm">
                      <CheckCircle2 size={14} />
                      <span>COMPLETED</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    {/* Floating Island Vector Diorama */}
                    <div className="shrink-0 group-hover:scale-105 transition-transform">
                      <WorldIslandIllustration worldId={world.id} size="md" />
                    </div>

                    {/* World Info & Stats */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5 flex-wrap">
                        <span
                          className="font-fredoka text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full text-white shadow-xs"
                          style={{ backgroundColor: world.themeColor }}
                        >
                          World 0{world.number}
                        </span>
                        <span className="font-fredoka text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                          {totalWorldLevels} STAGES
                        </span>
                      </div>

                      <h2 className="font-fredoka text-2xl sm:text-3xl font-black text-[#26324A] group-hover:text-[#6C5CE7] transition-colors">
                        {world.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-bold text-gray-600 font-nunito mt-0.5">
                        {world.skillLabel}
                      </p>

                      {/* Candy Progress Bar */}
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex-1 bg-gray-100 h-4 rounded-full p-0.5 border-2 border-gray-200 shadow-inner overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300 shadow-xs"
                            style={{
                              width: `${(completedCount / totalWorldLevels) * 100}%`,
                              backgroundColor: world.themeColor,
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-1 font-fredoka text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 shrink-0">
                          <Star size={13} className="fill-amber-400 stroke-amber-500" />
                          <span>
                            {worldStars} / {maxStars}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Arcade Play Arrow Circle Button */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform mt-2 sm:mt-0"
                      style={{ backgroundColor: world.themeColor }}
                    >
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: For Parents / Tina Teacher */}
        <div className="w-full max-w-xl bg-gradient-to-r from-pink-50 via-purple-50 to-amber-50 p-5 rounded-3xl border-4 border-pink-200 shadow-xl flex items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👩‍🏫</span>
            <div>
              <span className="font-fredoka text-base font-black text-[#26324A] block">
                Meet Tina Teacher
              </span>
              <span className="text-xs font-bold text-gray-600 font-nunito">
                Friendly individual 1-on-1 English lessons for your child!
              </span>
            </div>
          </div>
          <Link
            to="/parents"
            className="px-4 py-2.5 bg-gradient-to-r from-[#FF7285] to-[#E65A6E] text-white hover:brightness-105 font-fredoka font-black text-xs sm:text-sm rounded-2xl shadow-md border-b-3 border-[#C9384E] shrink-0 transition-all active:translate-y-0.5 active:border-b-1"
          >
            For Parents
          </Link>
        </div>
      </main>

      <BadgesModal isOpen={isBadgesOpen} onClose={() => setIsBadgesOpen(false)} />
    </div>
  );
};
