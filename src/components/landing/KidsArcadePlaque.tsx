import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, Trophy, Gamepad2, Stars } from 'lucide-react';
import { useGameStore } from '../../store/game.store';
import { TINA_CONFIG } from '../../data/teacher.config';

interface KidsArcadePlaqueProps {
  lang: 'it' | 'en';
}

export const KidsArcadePlaque: React.FC<KidsArcadePlaqueProps> = ({ lang }) => {
  const navigate = useNavigate();
  const hasProfile = useGameStore((state) => state.hasInitializedProfile);
  const completedStages = useGameStore((state) => state.completedLevelIds.length);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user scrolls down past 380px
      if (window.scrollY > 380) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLaunchGame = () => {
    if (hasProfile) {
      navigate('/map');
    } else {
      navigate('/play');
    }
  };

  const texts = {
    topBadge:
      lang === 'it'
        ? '🎮 AREA BAMBINI • 100% GRATIS & SENZA REGISTRAZIONE'
        : '🎮 KIDS PLAY ZONE • 100% FREE & CHILD-SAFE',
    mainTitle: 'ENGLISH ADVENTURE',
    subtitle:
      lang === 'it'
        ? 'Pronto per la tua avventura? Gioca nei 5 mondi magici e vinci il Gran Certificato!'
        : 'Ready for an adventure? Explore 5 magical worlds & win Teacher Tina’s Certificate!',
    playBtnPrimary: lang === 'it' ? 'GIOCA SUBITO!' : 'PLAY NOW!',
    playBtnSecondary: lang === 'it' ? 'Avventura Inglese 🚀' : 'English Adventure 🚀',
    resumeProgress:
      lang === 'it'
        ? `Hai completato ${completedStages}/15 livelli! Continua la missione 🏆`
        : `You completed ${completedStages}/15 stages! Continue your quest 🏆`,
    stickyTitle: lang === 'it' ? 'Il tuo bambino vuole giocare?' : 'Child wants to play?',
    stickyBtn: lang === 'it' ? 'GIOCA AL GIOCO 🎮' : 'PLAY GAME 🎮',
    badge1: lang === 'it' ? '🏝️ 5 Mondi 2D' : '🏝️ 5 2D Worlds',
    badge2: lang === 'it' ? '⭐ 150 Giochi Vocali' : '⭐ 150 Voice Games',
    badge3: lang === 'it' ? '📜 Certificato Finale' : '📜 Grand Diploma',
  };

  return (
    <>
      {/* ============================================================ */}
      {/* 🌟 MAIN TOP ARCADE HERO PLAQUE (Central & Impossible to Miss) */}
      {/* ============================================================ */}
      <section
        id="kids-play-zone"
        className="w-full relative overflow-hidden bg-gradient-to-b from-[#2A52BE] via-[#4A72E8] to-[#6C5CE7] pt-8 pb-10 px-4 text-white shadow-2xl border-b-6 border-amber-400"
      >
        {/* Animated Background Atmosphere */}
        <div className="absolute top-4 left-6 text-4xl opacity-40 animate-pulse pointer-events-none select-none">
          ☁️
        </div>
        <div className="absolute top-12 right-10 text-5xl opacity-40 pointer-events-none select-none">
          ☁️
        </div>
        <div className="absolute bottom-6 left-1/4 text-3xl opacity-30 pointer-events-none select-none">
          ✨
        </div>
        <div className="absolute top-16 right-1/4 text-3xl opacity-30 pointer-events-none select-none">
          ⭐
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          {/* Top Fun Plaque Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-950 px-4 sm:px-6 py-2 rounded-full font-fredoka font-black text-xs sm:text-sm tracking-wider uppercase shadow-lg border-2 border-white mb-4 animate-bounce">
            <Sparkles size={16} className="fill-amber-950" />
            <span>{texts.topBadge}</span>
            <Sparkles size={16} className="fill-amber-950" />
          </div>

          {/* Teacher Tina Thumbs-Up Avatar & Balloon Greeting */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-5 max-w-xl">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl overflow-hidden border-4 border-yellow-300 shadow-xl bg-white ring-4 ring-yellow-400/40">
                <img
                  src={TINA_CONFIG.photos.thumbsUp}
                  alt="Teacher Tina thumbs up"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="absolute -bottom-2 -right-2 text-xl select-none">👍</span>
            </div>

            <div className="bg-white/95 text-[#26324A] p-3.5 sm:p-4 rounded-3xl border-3 border-yellow-400 shadow-xl text-center sm:text-left">
              <div className="font-fredoka text-[#5644D4] font-black text-base sm:text-lg flex items-center justify-center sm:justify-start gap-1">
                <span>Teacher Tina:</span>
                <span className="text-amber-500">
                  {lang === 'it' ? '«Ciao Campione! 👋»' : '“Hi Explorer! 👋”'}
                </span>
              </div>
              <p className="font-nunito text-xs sm:text-sm font-bold text-gray-700 leading-snug mt-0.5">
                {texts.subtitle}
              </p>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 🚀 THE BIG CENTRAL CANDY PLAY BUTTON (High Gravity Action)    */}
          {/* ============================================================ */}
          <div className="w-full max-w-md my-2 flex flex-col items-center">
            <button
              onClick={handleLaunchGame}
              className="w-full group relative cursor-pointer select-none rounded-3xl p-1 bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-600 shadow-[0_12px_0_#996515,0_20px_25px_rgba(0,0,0,0.4)] active:translate-y-2 active:shadow-[0_4px_0_#996515] transition-all transform hover:scale-102"
              title={texts.playBtnPrimary}
            >
              <div className="bg-gradient-to-r from-[#FFD54F] via-[#FFCA28] to-[#FFA000] rounded-2xl py-5 px-6 sm:py-6 sm:px-8 border-4 border-white flex items-center justify-center gap-4 relative overflow-hidden">
                {/* Gloss highlight overlay */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/35 rounded-t-xl pointer-events-none" />

                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white text-amber-600 shadow-md flex items-center justify-center shrink-0 border-3 border-amber-300 group-hover:scale-110 transition-transform">
                  <Play size={36} className="fill-amber-500 translate-x-0.5" />
                </div>

                <div className="text-left flex flex-col">
                  <span className="font-fredoka text-2xl sm:text-4xl font-black text-[#26324A] tracking-tight drop-shadow-xs leading-none">
                    {texts.playBtnPrimary}
                  </span>
                  <span className="font-fredoka text-xs sm:text-base font-bold text-amber-950 uppercase tracking-wider mt-1 opacity-90 flex items-center gap-1">
                    <span>{texts.playBtnSecondary}</span>
                    <Stars size={14} className="text-amber-900 fill-amber-900" />
                  </span>
                </div>
              </div>
            </button>

            {/* Child Progress or Level Indicator */}
            {hasProfile && completedStages > 0 ? (
              <div className="mt-3 inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-fredoka font-black shadow-md border-2 border-white">
                <Trophy size={14} />
                <span>{texts.resumeProgress}</span>
              </div>
            ) : (
              <p className="mt-3 font-fredoka text-xs sm:text-sm text-yellow-200 font-bold drop-shadow-xs">
                {lang === 'it'
                  ? '✨ Tocca il pulsante e inizia subito a giocare • Nessun download'
                  : '✨ Tap the button to start playing right away • No download needed'}
              </p>
            )}
          </div>

          {/* Quick Pillars Badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 font-fredoka text-xs sm:text-sm font-bold text-white/95">
            <span className="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/30 flex items-center gap-1.5">
              {texts.badge1}
            </span>
            <span className="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/30 flex items-center gap-1.5">
              {texts.badge2}
            </span>
            <span className="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/30 flex items-center gap-1.5">
              {texts.badge3}
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 🎈 STICKY TOP MINI-BAR (Appears when scrolling to keep play ready) */}
      {/* ============================================================ */}
      {showSticky && (
        <aside
          aria-label="Kids Play Bar"
          className="fixed top-0 left-0 right-0 z-50 bg-[#26324A]/95 backdrop-blur-md border-b-3 border-amber-400 px-4 py-2.5 shadow-xl transition-all duration-300 animate-in slide-in-from-top-full"
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-yellow-300 shrink-0">
                <img
                  src={TINA_CONFIG.photos.thumbsUp}
                  alt="Teacher Tina"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="font-fredoka text-xs sm:text-sm font-bold text-white hidden sm:inline">
                {texts.stickyTitle}
              </span>
            </div>

            <button
              onClick={handleLaunchGame}
              className="bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-[#26324A] px-5 py-2 rounded-2xl font-fredoka font-black text-xs sm:text-sm flex items-center gap-2 shadow-md border-2 border-white cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
            >
              <Gamepad2 size={16} />
              <span>{texts.stickyBtn}</span>
            </button>
          </div>
        </aside>
      )}
    </>
  );
};
