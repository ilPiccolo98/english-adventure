import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/game.store';
import { CertificateCard } from '../../components/game/CertificateCard';
import { ParentButton } from '../../components/game/ParentButton';
import { fireCelebrationConfetti } from '../../services/confetti.service';
import { audioService } from '../../services/audio.service';
import { TINA_CONFIG } from '../../data/teacher.config';
import {
  Printer,
  Mail,
  ArrowLeft,
  Sparkles,
  Lock,
  Compass,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const CertificatePage: React.FC = () => {
  const navigate = useNavigate();
  const player = useGameStore((state) => state.player);
  const completedLevelIds = useGameStore((state) => state.completedLevelIds);
  const bestStars = useGameStore((state) => state.bestStarsByLevel);
  const totalCoins = useGameStore((state) => state.totalCoins);
  const reducedMotion = useGameStore((state) => state.settings.reducedMotion);

  const completedCount = completedLevelIds.length;
  const isComplete = completedCount >= 15;
  const totalStars = Object.values(bestStars).reduce((sum, s) => sum + s, 0);

  useEffect(() => {
    if (isComplete) {
      if (!reducedMotion) {
        fireCelebrationConfetti();
      }
      audioService.playSoundEffect('correct');
    }
  }, [isComplete, reducedMotion]);

  const handlePrint = () => {
    window.print();
  };

  const getEmailCertificateLink = () => {
    const email = TINA_CONFIG.email || 'teachertina.english@gmail.com';
    const subject = encodeURIComponent(
      `Grand Certificate of English Achievement: ${player.name} (${totalStars} Stars) - 1-on-1 Lessons Inquiry`
    );
    const body = encodeURIComponent(
      `Hello Teacher Tina!\n\n` +
        `My child ${player.name} has just successfully completed all 15 stages across all 5 worlds in English Adventure and earned the official Grand Certificate of English Achievement with ${totalStars} stars and ${totalCoins} coins!\n\n` +
        `We would love to schedule 1-on-1 individual lessons with you to continue building a strong English foundation according to Cambridge CEFR standards.\n\n` +
        `Please let us know your available days and schedules.\n\n` +
        `Best regards,\n` +
        `Parent of ${player.name}`
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF9F0] via-[#FAF6EE] to-[#F5ECE0] py-6 px-4 flex flex-col items-center select-none print:bg-white print:p-0">
      {/* Top Navigation Bar (Hidden during printing) */}
      <div className="w-full max-w-3xl flex items-center justify-between gap-3 mb-6 print:hidden">
        <Link
          to="/map"
          className="inline-flex items-center gap-1.5 font-fredoka font-bold text-xs sm:text-sm text-[#6C5CE7] hover:underline bg-white px-4 py-2 rounded-2xl border-2 border-purple-100 shadow-xs"
        >
          <ArrowLeft size={18} />
          <span>Back to Map</span>
        </Link>

        <ParentButton size="sm" />
      </div>

      {/* Main Content Area */}
      {isComplete ? (
        <div className="w-full max-w-3xl flex flex-col items-center space-y-6">
          {/* Celebratory Banner (Hidden during printing) */}
          <div className="text-center space-y-1 print:hidden">
            <div className="inline-flex items-center gap-1.5 bg-[#FFB547] text-[#26324A] font-fredoka font-black text-xs uppercase px-4 py-1.5 rounded-full shadow-xs">
              <Sparkles size={14} /> Congratulations Explorer!
            </div>
            <h1 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              YOUR OFFICIAL CERTIFICATE IS READY! 🎓
            </h1>
            <p className="font-nunito text-xs sm:text-sm font-bold text-gray-600 max-w-md mx-auto">
              You finished all 15 stages! You can print your diploma or share it with Teacher Tina to schedule private 1-on-1 lessons.
            </p>
          </div>

          {/* Action Buttons Toolbar (Hidden during printing) */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 print:hidden">
            <Button
              variant="gold"
              size="md"
              onClick={handlePrint}
              icon={<Printer size={20} />}
              className="w-full sm:w-auto shadow-lg"
            >
              Print / Save as PDF 🖨️
            </Button>

            <a
              href={getEmailCertificateLink()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#6C5CE7] hover:bg-[#5644D4] text-white font-fredoka font-bold text-base rounded-2xl shadow-lg border-b-4 border-[#4A3EB5] transition-all"
            >
              <Mail size={20} />
              <span>Email Teacher Tina to Book 1-on-1 Lessons</span>
            </a>
          </div>

          {/* Certificate Display Card */}
          <CertificateCard
            playerName={player.name}
            avatar={player.avatar}
            totalStars={totalStars}
            totalCoins={totalCoins}
            difficulty={player.difficulty}
          />
        </div>
      ) : (
        /* Quest In-Progress Preview State */
        <div className="w-full max-w-xl flex flex-col items-center text-center space-y-6 my-auto">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 border-4 border-amber-300 flex items-center justify-center text-4xl shadow-md">
            <Lock size={36} className="text-amber-700" />
          </div>

          <div className="space-y-2">
            <span className="font-fredoka text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              Grand Quest In Progress
            </span>
            <h1 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              Unlock Teacher Tina's Certificate! 🎓
            </h1>
            <p className="font-nunito text-sm sm:text-base font-bold text-gray-600 max-w-md mx-auto leading-relaxed">
              Complete all 15 stages across the 5 magical worlds to earn your official Certificate of Achievement and qualify for private 1-on-1 lessons with Teacher Tina!
            </p>
          </div>

          {/* Progress Tracker Box */}
          <div className="w-full bg-white p-5 rounded-3xl border-3 border-amber-200 shadow-md space-y-3">
            <div className="flex items-center justify-between font-fredoka text-sm">
              <span className="font-bold text-gray-600">Your Progress</span>
              <span className="font-black text-[#6C5CE7]">
                {completedCount} of 15 Stages Completed
              </span>
            </div>
            <div className="w-full bg-gray-100 h-4 rounded-full p-0.5 border border-gray-200 overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-400 to-[#6C5CE7] transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round((completedCount / 15) * 100))}%` }}
              />
            </div>
            <p className="text-xs font-nunito font-bold text-amber-800">
              Only {15 - completedCount} more {15 - completedCount === 1 ? 'stage' : 'stages'} to go! You can do it! 🚀
            </p>
          </div>

          <Button
            variant="purple"
            size="lg"
            onClick={() => navigate('/map')}
            icon={<Compass size={22} />}
            className="w-full max-w-xs shadow-xl"
          >
            Continue Adventure
          </Button>
        </div>
      )}
    </div>
  );
};

