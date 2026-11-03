import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, Settings, Home } from 'lucide-react';
import { useGameStore } from '../../store/game.store';
import { AvatarDisplay } from '../icons/GameIcons';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { audioService } from '../../services/audio.service';

interface TopHUDProps {
  showBackHome?: boolean;
}

export const TopHUD: React.FC<TopHUDProps> = ({ showBackHome = true }) => {
  const navigate = useNavigate();
  const player = useGameStore((state) => state.player);
  const bestStars = useGameStore((state) => state.bestStarsByLevel);
  const totalCoins = useGameStore((state) => state.totalCoins);
  const soundEnabled = useGameStore((state) => state.settings.soundEnabled);
  const reducedMotion = useGameStore((state) => state.settings.reducedMotion);
  const toggleSound = useGameStore((state) => state.toggleSound);
  const toggleReducedMotion = useGameStore((state) => state.toggleReducedMotion);
  const resetProgress = useGameStore((state) => state.resetProgress);
  const setDifficulty = useGameStore((state) => state.setDifficulty);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [englishVoices, setEnglishVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');

  useEffect(() => {
    const updateVoices = () => {
      const voices = audioService.getEnglishVoices();
      setEnglishVoices(voices);
      const current = audioService.getSelectedVoice();
      if (current) {
        setSelectedVoiceName(current.name);
      }
    };

    updateVoices();
    const unsubscribe = audioService.onVoicesUpdated(updateVoices);
    return () => unsubscribe();
  }, []);

  const totalStars = Object.values(bestStars).reduce((sum, s) => sum + s, 0);

  const handleReset = () => {
    resetProgress();
    setConfirmReset(false);
    setIsSettingsOpen(false);
    navigate('/');
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voiceName = e.target.value;
    setSelectedVoiceName(voiceName);
    audioService.setVoiceByName(voiceName);
  };

  const handleTestVoice = () => {
    audioService.speak("Hello! I am Tina Teacher! Let's learn English together!");
  };

  return (
    <>
      <header className="w-full bg-white/90 backdrop-blur-md border-b-4 border-[#6C5CE7]/20 shadow-sm sticky top-0 z-40 px-3 py-2 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Avatar, Name & Path */}
          <div className="flex items-center gap-2 sm:gap-3">
            {showBackHome ? (
              <Link
                to="/map"
                className="p-2 bg-purple-50 text-[#6C5CE7] hover:bg-purple-100 rounded-2xl border-2 border-purple-200 transition-colors"
                title="Adventure Map"
                aria-label="Back to Map"
              >
                <Home size={22} />
              </Link>
            ) : null}

            <Link to="/play/setup" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <AvatarDisplay avatar={player.avatar} size="sm" />
              <div className="hidden xs:flex flex-col">
                <span className="font-fredoka text-sm sm:text-base font-bold text-[#26324A] leading-tight truncate max-w-[110px]">
                  {player.name}
                </span>
                <span className="text-[11px] font-bold text-[#6C5CE7] bg-purple-100 px-1.5 py-0.2 rounded-md uppercase tracking-wider">
                  {player.difficulty === 'little' ? 'Little Explorer' : 'Super Explorer'}
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Stars & Coins counters */}
          <div className="flex items-center gap-2 sm:gap-4 font-fredoka">
            <div className="flex items-center gap-1.5 bg-[#FFF9F0] px-3 py-1.5 rounded-2xl border-2 border-[#FFB547] shadow-xs">
              <span className="text-xl">⭐</span>
              <span className="font-black text-[#26324A] text-base sm:text-lg">{totalStars}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#FFF9F0] px-3 py-1.5 rounded-2xl border-2 border-[#35C98A] shadow-xs">
              <span className="text-xl">🪙</span>
              <span className="font-black text-[#26324A] text-base sm:text-lg">{totalCoins}</span>
            </div>
          </div>

          {/* Right: Sound, Badges & Settings */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={toggleSound}
              className={`p-2 rounded-2xl border-2 transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-blue-50 text-[#40BFE8] border-blue-200 hover:bg-blue-100'
                  : 'bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200'
              }`}
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
              aria-label={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>

            <Link
              to="/parents"
              className="px-2.5 py-1.5 bg-pink-50 text-[#FF7285] hover:bg-pink-100 font-fredoka text-xs sm:text-sm font-bold rounded-2xl border-2 border-pink-200 transition-colors"
              title="Information for Parents"
            >
              Parents
            </Link>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 bg-gray-50 text-[#26324A] hover:bg-gray-100 rounded-2xl border-2 border-gray-200 transition-colors cursor-pointer"
              title="Game Settings"
              aria-label="Game Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="Game Settings ⚙️">
        <div className="space-y-5 py-2">
          {/* Difficulty selector */}
          <div className="bg-white p-4 rounded-2xl border-2 border-purple-100">
            <label className="font-fredoka font-bold text-base text-[#26324A] block mb-2">
              Explorer Learning Path:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDifficulty('little')}
                className={`p-3 rounded-2xl font-fredoka font-bold text-sm text-center border-3 transition-all cursor-pointer ${
                  player.difficulty === 'little'
                    ? 'bg-[#6C5CE7] text-white border-[#5644D4] shadow-md'
                    : 'bg-gray-50 text-[#26324A] border-gray-200 hover:bg-purple-50'
                }`}
              >
                🐣 Little Explorer
                <span className="block text-[11px] font-normal opacity-90">Ages 5–7</span>
              </button>
              <button
                type="button"
                onClick={() => setDifficulty('super')}
                className={`p-3 rounded-2xl font-fredoka font-bold text-sm text-center border-3 transition-all cursor-pointer ${
                  player.difficulty === 'super'
                    ? 'bg-[#6C5CE7] text-white border-[#5644D4] shadow-md'
                    : 'bg-gray-50 text-[#26324A] border-gray-200 hover:bg-purple-50'
                }`}
              >
                🚀 Super Explorer
                <span className="block text-[11px] font-normal opacity-90">Ages 8–10</span>
              </button>
            </div>
          </div>

          {/* Tina Teacher Female Voice Selector & Native English Audio */}
          <div className="bg-white p-4 rounded-2xl border-2 border-purple-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-fredoka font-bold text-sm text-[#26324A] block">
                  Tina Teacher Voice (Native English 👩‍🏫)
                </span>
                <span className="text-xs text-emerald-600 font-bold font-nunito flex items-center gap-1">
                  ✓ Studio native English audio active
                </span>
              </div>
              <Button
                variant="purple"
                size="sm"
                onClick={handleTestVoice}
                icon={<Volume2 size={16} />}
              >
                Test Voice
              </Button>
            </div>

            <p className="text-[11px] text-gray-500 font-nunito leading-relaxed">
              Exercises play verified studio-recorded native English pronunciation clips.
            </p>

            {englishVoices.length > 0 && (
              <div className="pt-2 border-t border-gray-100">
                <label className="text-[11px] font-bold text-gray-600 block mb-1">
                  Secondary Browser TTS Engine:
                </label>
                <select
                  value={selectedVoiceName}
                  onChange={handleVoiceChange}
                  className="w-full p-2 rounded-xl border-2 border-gray-200 bg-gray-50 font-nunito text-xs font-semibold text-[#26324A] focus:border-[#6C5CE7] focus:outline-none"
                >
                  {englishVoices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Sound & Motion Toggles */}
          <div className="bg-white p-4 rounded-2xl border-2 border-purple-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-fredoka font-semibold text-[#26324A]">Sound Effects & Voice</span>
              <button
                type="button"
                onClick={toggleSound}
                className={`px-4 py-1.5 rounded-xl font-fredoka font-bold text-sm border-2 cursor-pointer ${
                  soundEnabled
                    ? 'bg-[#35C98A] text-white border-[#27AD72]'
                    : 'bg-gray-200 text-gray-600 border-gray-300'
                }`}
              >
                {soundEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="font-fredoka font-semibold text-[#26324A]">Reduced Animations</span>
              <button
                type="button"
                onClick={toggleReducedMotion}
                className={`px-4 py-1.5 rounded-xl font-fredoka font-bold text-sm border-2 cursor-pointer ${
                  reducedMotion
                    ? 'bg-[#35C98A] text-white border-[#27AD72]'
                    : 'bg-gray-200 text-gray-600 border-gray-300'
                }`}
              >
                {reducedMotion ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Reset progress */}
          <div className="bg-red-50/70 p-4 rounded-2xl border-2 border-red-100">
            <h4 className="font-fredoka font-bold text-red-600 mb-1">Reset Adventure Progress</h4>
            <p className="text-xs text-red-700 mb-3">
              This will clear stars, coins, and completed levels on this device.
            </p>
            {confirmReset ? (
              <div className="flex gap-2">
                <Button variant="white" size="sm" onClick={() => setConfirmReset(false)}>
                  Cancel
                </Button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-red-600 text-white font-fredoka font-bold text-sm rounded-xl hover:bg-red-700 cursor-pointer"
                >
                  Yes, Reset Everything
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="px-4 py-2 bg-white text-red-600 border-2 border-red-200 hover:bg-red-50 font-fredoka font-bold text-xs rounded-xl cursor-pointer"
              >
                Reset Progress...
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
