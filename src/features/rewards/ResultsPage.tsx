import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getLevelById, getNextLevel } from '../../data/worlds.data';
import { useGameStore } from '../../store/game.store';
import { calculateStars, calculateCoinsEarned, formatEncouragement } from '../../services/scoring.service';
import { fireCelebrationConfetti } from '../../services/confetti.service';
import { audioService } from '../../services/audio.service';
import { StarRating } from '../../components/ui/StarRating';
import { TeacherTinaPortrait } from '../../components/game/TeacherTinaPortrait';
import { ParentButton } from '../../components/game/ParentButton';
import { Button } from '../../components/ui/Button';
import { RotateCcw, ArrowRight, Home, Sparkles, Award } from 'lucide-react';
import { BADGES } from '../../data/badges.data';

export const ResultsPage: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const levelInfo = getLevelById(levelId || '');
  const completeLevel = useGameStore((state) => state.completeLevel);
  const completedLevelIds = useGameStore((state) => state.completedLevelIds);
  const reducedMotion = useGameStore((state) => state.settings.reducedMotion);

  const hasRecordedRef = useRef(false);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  // Retrieve state passed from ExercisePage
  const navState = (location.state as { correctFirstTry?: number; totalQuestions?: number }) || {};
  const correctFirstTry = navState.correctFirstTry ?? 5;
  const totalQuestions = navState.totalQuestions ?? 5;

  const stars = calculateStars(correctFirstTry, totalQuestions);
  const coins = calculateCoinsEarned(stars);

  useEffect(() => {
    if (!levelInfo || hasRecordedRef.current) return;
    hasRecordedRef.current = true;

    // Trigger celebration sounds & confetti
    audioService.playSoundEffect('star');
    fireCelebrationConfetti(reducedMotion);

    // Persist completed level result to Zustand store
    const result = completeLevel({
      levelId: levelInfo.level.id,
      worldId: levelInfo.world.id,
      correctFirstTry,
      totalQuestions,
      stars,
      coinsEarned: coins,
      didacticSummary: levelInfo.level.didacticTakeaway,
      completedAt: new Date().toISOString(),
    });

    if (result.newlyUnlockedBadges.length > 0) {
      setTimeout(() => {
        setNewBadges(result.newlyUnlockedBadges);
      }, 0);
    }
  }, [levelInfo, completeLevel, correctFirstTry, totalQuestions, stars, coins, reducedMotion]);

  if (!levelInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="font-fredoka text-2xl font-bold mb-4">Level not found!</h2>
        <Button variant="purple" onClick={() => navigate('/map')}>
          Back to Map
        </Button>
      </div>
    );
  }

  const { level, world } = levelInfo;
  const next = getNextLevel(level.id);
  const encouragement = formatEncouragement(stars);

  const unlockedBadgeObjs = BADGES.filter((b) => newBadges.includes(b.id));

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#70A6FF] via-[#FFF2D6] to-[#FFF9F0] flex flex-col items-center justify-center p-4 select-none relative overflow-hidden">
      {/* Decorative Star Sparks */}
      <div className="absolute top-10 left-10 text-5xl opacity-40 animate-pulse pointer-events-none">
        ⭐
      </div>
      <div className="absolute top-16 right-12 text-6xl opacity-40 animate-pulse pointer-events-none">
        ✨
      </div>

      {/* Top Bar with For Parents Button */}
      <div className="w-full max-w-lg flex items-center justify-end mb-2 z-20">
        <ParentButton size="sm" />
      </div>

      <div className="w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-[#FFB547] shadow-2xl flex flex-col items-center text-center relative z-10">
        {/* Arcade Victory Header */}
        <div className="mb-2">
          <div className="inline-flex items-center gap-1.5 font-fredoka text-xs font-black uppercase tracking-widest text-[#6C5CE7] bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200">
            <Sparkles size={14} /> {world.title} • Stage 0{level.levelNumber}
          </div>
          <h1 className="font-fredoka text-4xl sm:text-5xl font-black text-[#FFB547] mt-2 drop-shadow-sm">
            STAGE CLEARED! 🏆
          </h1>
          <p className="font-nunito font-black text-sm sm:text-base text-gray-700 mt-1">
            {encouragement}
          </p>
        </div>

        {/* Teacher Tina Celebration & Animated Golden Star Reveal */}
        <div className="my-3 flex flex-col items-center">
          <div className="hover:scale-105 transition-transform flex flex-col items-center">
            <TeacherTinaPortrait
              photo="reading"
              variant="avatar"
              size="lg"
              altText="Teacher Tina celebration"
            />
            <span className="font-fredoka text-xs font-black text-[#6C5CE7] bg-purple-100 px-3 py-1 rounded-full mt-2 shadow-2xs">
              Teacher Tina: "I'm so proud of you!" ⭐
            </span>
          </div>
          <div className="mt-2 bg-amber-50 px-5 py-2 rounded-2xl border-2 border-amber-200 shadow-sm">
            <StarRating stars={stars} size="lg" animated={true} />
          </div>
        </div>

        {/* Score & Coins Summary Cards */}
        <div className="w-full grid grid-cols-2 gap-3 my-2">
          <div className="bg-amber-50/90 p-3.5 rounded-2xl border-2 border-amber-200 shadow-2xs">
            <span className="text-xs font-black text-amber-800 font-fredoka uppercase">
              First Try Correct
            </span>
            <div className="font-fredoka text-2xl font-black text-[#26324A] mt-0.5">
              {correctFirstTry} / {totalQuestions}
            </div>
          </div>

          <div className="bg-emerald-50/90 p-3.5 rounded-2xl border-2 border-emerald-200 shadow-2xs">
            <span className="text-xs font-black text-emerald-800 font-fredoka uppercase">
              Coins Earned
            </span>
            <div className="font-fredoka text-2xl font-black text-[#26324A] mt-0.5">
              +{coins} 🪙
            </div>
          </div>
        </div>

        {/* Didactic Achievement Highlight Callout */}
        <div className="w-full bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-2xl border-2 border-purple-200 my-3 text-left shadow-2xs">
          <span className="font-fredoka text-xs font-black text-[#6C5CE7] uppercase tracking-wide block mb-1">
            Didactic Milestone 🎓
          </span>
          <p className="font-nunito text-sm font-bold text-[#26324A] leading-snug">
            {level.didacticTakeaway}
          </p>
        </div>

        {/* Badge Unlocked Popup Alert */}
        {unlockedBadgeObjs.length > 0 && (
          <div className="w-full bg-gradient-to-r from-amber-100 to-yellow-100 p-4 rounded-2xl border-3 border-[#FFB547] my-2 text-left flex items-center gap-3 shadow-md animate-bounce">
            <span className="text-4xl shrink-0">🏆</span>
            <div>
              <span className="font-fredoka text-xs font-black text-amber-800 uppercase block">
                New Badge Unlocked!
              </span>
              <span className="font-fredoka text-base font-black text-[#26324A]">
                {unlockedBadgeObjs[0].title}
              </span>
              <p className="text-xs text-gray-700 font-nunito font-semibold leading-tight">
                {unlockedBadgeObjs[0].description}
              </p>
            </div>
          </div>
        )}

        {/* Grand Finale Certificate Notification */}
        {completedLevelIds.length >= 15 && (
          <div className="w-full bg-gradient-to-r from-yellow-100 via-amber-100 to-yellow-200 p-4 rounded-3xl border-3 border-yellow-400 shadow-lg my-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <span className="text-4xl shrink-0">🎓</span>
              <div>
                <span className="font-fredoka text-xs font-black text-amber-900 uppercase block">
                  Grand Quest Completed! 🏆
                </span>
                <span className="font-fredoka text-base font-black text-[#26324A] block leading-tight">
                  You Unlocked Teacher Tina's Certificate!
                </span>
                <span className="text-xs text-gray-700 font-nunito font-bold block leading-tight mt-0.5">
                  Officially qualified for 1-on-1 private lessons!
                </span>
              </div>
            </div>
            <Button
              variant="gold"
              size="md"
              onClick={() => navigate('/certificate')}
              icon={<Award size={18} />}
              className="w-full sm:w-auto shrink-0 shadow-md whitespace-nowrap"
            >
              CLAIM CERTIFICATE 📜
            </Button>
          </div>
        )}

        {/* Action Controls */}
        <div className="w-full flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            variant="white"
            size="md"
            onClick={() => navigate(`/level/${level.id}`)}
            className="flex-1 font-black shadow-md"
            icon={<RotateCcw size={18} />}
          >
            PLAY AGAIN
          </Button>

          {next ? (
            <Button
              variant="purple"
              size="lg"
              onClick={() => navigate(`/level/${next.level.id}`)}
              className="flex-1 font-black shadow-xl"
              icon={<ArrowRight size={20} />}
            >
              NEXT STAGE
            </Button>
          ) : (
            <Button
              variant="green"
              size="lg"
              onClick={() => navigate('/map')}
              className="flex-1 font-black shadow-xl"
              icon={<Home size={20} />}
            >
              BACK TO MAP
            </Button>
          )}
        </div>

        {/* For Parents Teacher Tina Footer Card */}
        <div className="mt-5 pt-4 border-t border-gray-100 w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-gray-500">
          <span>Ready for personalized 1-on-1 lessons?</span>
          <ParentButton size="sm" />
        </div>
      </div>
    </div>
  );
};
