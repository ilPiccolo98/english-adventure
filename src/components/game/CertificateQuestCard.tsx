import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { TINA_CONFIG } from '../../data/teacher.config';

interface CertificateQuestCardProps {
  completedCount: number;
  totalStages?: number;
}

export const CertificateQuestCard: React.FC<CertificateQuestCardProps> = ({
  completedCount,
  totalStages = 15,
}) => {
  const isComplete = completedCount >= totalStages;
  const progressPercent = Math.min(100, Math.round((completedCount / totalStages) * 100));

  return (
    <div
      className={`w-full max-w-xl rounded-3xl p-5 border-4 transition-all duration-300 shadow-xl ${
        isComplete
          ? 'bg-gradient-to-r from-[#FFF5DC] via-[#FFF9E6] to-[#FFE8B2] border-[#D4AF37] ring-4 ring-yellow-300/60'
          : 'bg-white/95 backdrop-blur-md border-[#6C5CE7]/30'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Icon & Description */}
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="relative shrink-0">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md border-2 ${
                isComplete
                  ? 'bg-gradient-to-tr from-[#FFD54F] to-[#FFA000] border-white text-white'
                  : 'bg-purple-100 border-purple-200 text-[#6C5CE7]'
              }`}
            >
              {isComplete ? '🎓' : '📜'}
            </div>
            <div className="w-6 h-6 rounded-full overflow-hidden border border-yellow-400 absolute -bottom-1 -right-1 shadow-xs">
              <img
                src={TINA_CONFIG.photos.thumbsUp}
                alt="Teacher Tina"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-fredoka text-xs font-black uppercase tracking-wider text-[#6C5CE7] bg-purple-100 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <Sparkles size={12} /> {isComplete ? 'Grand Quest Accomplished!' : 'Grand Quest Mission'}
              </span>
            </div>

            <h3 className="font-fredoka text-base sm:text-lg font-black text-[#26324A] mt-0.5 leading-snug">
              {isComplete
                ? 'Teacher Tina Certificate Unlocked! 🏆'
                : "Earn Teacher Tina's Official Certificate"}
            </h3>

            <p className="font-nunito text-xs font-bold text-gray-600 leading-tight mt-0.5">
              {isComplete
                ? 'You finished all 15 stages and qualified for 1-on-1 private lessons!'
                : `Complete all 15 stages across 5 worlds to qualify for private 1-on-1 lessons!`}
            </p>
          </div>
        </div>

        {/* Right: Action Button */}
        <div className="w-full sm:w-auto flex flex-col items-center sm:items-end gap-1.5 shrink-0">
          <Link
            to="/certificate"
            className={`w-full sm:w-auto px-5 py-2.5 rounded-2xl font-fredoka font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 ${
              isComplete
                ? 'bg-gradient-to-r from-[#FFB547] to-[#FFA000] text-[#26324A] hover:brightness-105 border-b-4 border-[#C67D0A] animate-pulse'
                : 'bg-[#6C5CE7] hover:bg-[#5644D4] text-white border-b-4 border-[#5644D4]'
            }`}
          >
            <Award size={16} />
            <span>{isComplete ? 'View My Certificate 📜' : 'View Quest 📜'}</span>
            <ChevronRight size={16} />
          </Link>
          <span className="text-[11px] font-fredoka font-bold text-gray-500">
            {completedCount} / {totalStages} Stages Done ({progressPercent}%)
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-full bg-gray-100 h-3.5 rounded-full p-0.5 border border-gray-200 overflow-hidden shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isComplete
              ? 'bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 shadow-xs'
              : 'bg-gradient-to-r from-purple-400 to-[#6C5CE7]'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

