import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Play, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/game.store';
import { TeacherTinaPortrait } from '../../components/game/TeacherTinaPortrait';
import { ParentButton } from '../../components/game/ParentButton';
import { Button } from '../../components/ui/Button';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const hasProfile = useGameStore((state) => state.hasInitializedProfile);
  const soundEnabled = useGameStore((state) => state.settings.soundEnabled);
  const toggleSound = useGameStore((state) => state.toggleSound);

  const handleStartPlay = () => {
    if (hasProfile) {
      navigate('/map');
    } else {
      navigate('/play/setup');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#70A6FF] via-[#B4E4FF] to-[#FFF9F0] flex flex-col justify-between relative overflow-hidden select-none">
      {/* 2D Arcade Skybox with Floating Cartoon Clouds and Stars */}
      <div className="absolute top-8 left-8 text-6xl opacity-70 animate-pulse pointer-events-none">
        ☁️
      </div>
      <div className="absolute top-24 right-12 text-7xl opacity-80 pointer-events-none">
        ☁️
      </div>
      <div className="absolute top-12 right-1/3 text-4xl opacity-75 pointer-events-none">
        ✨
      </div>
      <div className="absolute bottom-36 left-12 text-5xl opacity-50 pointer-events-none">
        🏝️
      </div>
      <div className="absolute bottom-28 right-16 text-5xl opacity-50 pointer-events-none">
        🏰
      </div>

      {/* Top Header Bar */}
      <header className="w-full max-w-5xl mx-auto px-4 py-4 flex items-center justify-between z-10">
        <button
          onClick={toggleSound}
          className={`px-3.5 py-2 rounded-2xl border-2 font-fredoka font-bold text-sm flex items-center gap-2 cursor-pointer transition-all shadow-md ${
            soundEnabled
              ? 'bg-white text-[#40BFE8] border-blue-200 hover:bg-blue-50'
              : 'bg-gray-100 text-gray-400 border-gray-300'
          }`}
          title={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          <span>{soundEnabled ? 'Sound ON' : 'Sound OFF'}</span>
        </button>

        <ParentButton size="md" />
      </header>

      {/* Main Arcade Hero Section */}
      <main className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center text-center my-auto z-10 py-4">
        {/* Arcade Title Plaque */}
        <div className="relative mb-3 flex flex-col items-center">
          <span className="font-fredoka text-xs sm:text-sm font-black text-amber-900 bg-gradient-to-r from-[#FFD54F] via-[#FFCA28] to-[#FFB300] px-5 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-2 border-2 border-amber-500 shadow-md mb-3">
            <Sparkles size={16} className="fill-white" /> 2D ARCADE LEARNING ADVENTURE
          </span>

          {/* 3D Layered Arcade Logo */}
          <div className="relative">
            <h1 className="font-fredoka text-5xl sm:text-7xl md:text-8xl font-black text-[#5644D4] tracking-tight drop-shadow-[0_8px_0_#311B92]">
              ENGLISH
            </h1>
            <h2 className="font-fredoka text-4xl sm:text-6xl md:text-7xl font-black text-[#FFB547] -mt-3 sm:-mt-5 tracking-tight drop-shadow-[0_8px_0_#C67D0A]">
              ADVENTURE
            </h2>
          </div>

          <p className="font-nunito text-base sm:text-xl font-black text-[#26324A] bg-white/80 backdrop-blur-xs px-6 py-2 rounded-2xl border-2 border-white/60 shadow-sm mt-3">
            Ready for an adventure? Learn English. Play. Explore! 🚀
          </p>
        </div>

        {/* Teacher Tina Presentation & Playful Speech Bubble */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-4 max-w-xl">
          <TeacherTinaPortrait
            photo="book"
            variant="card"
            size="sm"
            altText="Teacher Tina holding English book"
          />

          <div className="bg-white/95 p-5 rounded-3xl border-4 border-[#6C5CE7] shadow-2xl text-left relative max-w-xs">
            <div className="font-fredoka text-[#6C5CE7] text-xl font-black flex items-center gap-1.5">
              <span>Hi, Explorer!</span> <span>👋</span>
            </div>
            <p className="font-nunito text-sm sm:text-base text-[#26324A] font-bold mt-1 leading-snug">
              I am Teacher Tina! Complete all 15 stages across the 5 magical worlds to earn your official Certificate and qualify for private 1-on-1 lessons!
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-fredoka font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                🎓 Official Certificate Quest
              </span>
              <span className="text-xs font-fredoka font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full">
                👩‍🏫 1-on-1 Lessons
              </span>
            </div>
          </div>
        </div>

        {/* Big Juicy Arcade Play Button */}
        <div className="mt-3 w-full max-w-xs flex flex-col gap-3">
          <Button
            variant="gold"
            size="xl"
            onClick={handleStartPlay}
            className="w-full shadow-2xl tracking-wider text-2xl sm:text-3xl py-6 animate-pulse"
            icon={<Play size={32} className="fill-[#26324A]" />}
          >
            PLAY NOW!
          </Button>

          {hasProfile && (
            <Link
              to="/play/setup"
              className="font-fredoka text-sm text-[#6C5CE7] hover:underline font-bold bg-white/70 px-4 py-1.5 rounded-xl border border-purple-200 self-center"
            >
              Change Explorer Avatar or Level
            </Link>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto px-4 py-4 text-center z-10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#26324A] font-bold gap-2">
        <span>🎮 No Registration • 100% Free • Child-Safe English</span>
        <Link to="/parents" className="text-[#FF7285] hover:underline font-black">
          Meet Teacher Tina (Individual Lessons) →
        </Link>
      </footer>
    </div>
  );
};
