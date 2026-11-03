import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TopHUD } from '../../components/game/TopHUD';
import { getWorldById } from '../../data/worlds.data';
import { useGameStore } from '../../store/game.store';
import { StarRating } from '../../components/ui/StarRating';
import { Button } from '../../components/ui/Button';
import { WorldIslandIllustration } from '../../components/game/WorldIslandIllustration';
import { ArrowLeft, Play, CheckCircle2 } from 'lucide-react';

export const WorldDetailPage: React.FC = () => {
  const { worldId } = useParams<{ worldId: string }>();
  const navigate = useNavigate();
  const world = getWorldById(worldId || '');

  const completedLevelIds = useGameStore((state) => state.completedLevelIds);
  const bestStars = useGameStore((state) => state.bestStarsByLevel);

  if (!world) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="font-fredoka text-2xl font-bold mb-4">World not found!</h2>
        <Button variant="purple" onClick={() => navigate('/map')}>
          Back to Map
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF9F0] via-[#FAF7FF] to-[#EFF6FF] flex flex-col select-none">
      <TopHUD showBackHome={true} />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 flex flex-col items-center">
        {/* Back Link */}
        <div className="w-full mb-4">
          <Link
            to="/map"
            className="inline-flex items-center gap-1.5 font-fredoka font-black text-sm text-[#6C5CE7] hover:underline bg-white/80 px-4 py-2 rounded-2xl border-2 border-purple-100 shadow-xs"
          >
            <ArrowLeft size={18} />
            <span>Back to Adventure Map</span>
          </Link>
        </div>

        {/* Floating Island Hero Banner */}
        <div
          className={`w-full rounded-3xl p-6 sm:p-8 border-4 shadow-2xl mb-8 bg-gradient-to-br ${world.bgGradient} flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden`}
          style={{ borderColor: world.borderColor }}
        >
          {/* Visual Floating Island Vector */}
          <div className="shrink-0 hover:scale-105 transition-transform">
            <WorldIslandIllustration worldId={world.id} size="md" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <span
                className="font-fredoka text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full text-white shadow-xs"
                style={{ backgroundColor: world.themeColor }}
              >
                World 0{world.number} • {world.skillLabel}
              </span>
              <span className="text-xs font-black text-[#26324A] bg-white/70 px-2 py-0.5 rounded-md">
                3 STAGES
              </span>
            </div>
            <h1 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              {world.title}
            </h1>
            <p className="text-xs sm:text-sm font-bold text-gray-700 font-nunito mt-1 leading-snug">
              {world.description}
            </p>
          </div>
        </div>

        {/* Arcade Stage Nodes List */}
        <div className="w-full flex flex-col gap-4">
          {world.levels.map((level) => {
            const isCompleted = completedLevelIds.includes(level.id);
            const stars = (bestStars[level.id] || 0) as 0 | 1 | 2 | 3;

            return (
              <div
                key={level.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-gray-200 hover:border-[#6C5CE7] transition-all shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Stage Icon Pod */}
                  <div
                    className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shrink-0 shadow-md border-3 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${world.themeColor}18`,
                      borderColor: world.borderColor,
                    }}
                  >
                    {level.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-fredoka text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md text-white shadow-2xs"
                        style={{ backgroundColor: world.themeColor }}
                      >
                        STAGE 0{level.levelNumber}
                      </span>
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          <CheckCircle2 size={12} />
                          <span>CLEARED</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-fredoka text-xl sm:text-2xl font-black text-[#26324A] mt-1 group-hover:text-[#6C5CE7] transition-colors">
                      {level.title}
                    </h3>
                    <p className="text-xs font-bold text-gray-500 font-nunito truncate">
                      {level.topic}
                    </p>
                  </div>
                </div>

                {/* Stars Slot & Play Stage Action */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="bg-amber-50/80 px-3 py-1.5 rounded-2xl border-2 border-amber-200 shadow-2xs">
                    <StarRating stars={stars} size="sm" />
                  </div>

                  <Button
                    variant={isCompleted ? 'white' : 'purple'}
                    size="md"
                    onClick={() => navigate(`/level/${level.id}`)}
                    className="min-w-[130px] font-black shadow-md tracking-wider"
                    icon={<Play size={18} className={isCompleted ? 'fill-[#26324A]' : 'fill-white'} />}
                  >
                    {isCompleted ? 'REPLAY' : 'PLAY STAGE'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
