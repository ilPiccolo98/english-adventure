import React from 'react';
import type { AvatarId, Difficulty } from '../../types/game.types';
import { AvatarDisplay } from '../icons/GameIcons';
import { TINA_CONFIG } from '../../data/teacher.config';
import { Star, Award, CheckCircle2, Sparkles } from 'lucide-react';

interface CertificateCardProps {
  playerName: string;
  avatar: AvatarId;
  totalStars: number;
  totalCoins: number;
  difficulty?: Difficulty;
  completionDate?: string;
  className?: string;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  playerName,
  avatar,
  totalStars,
  totalCoins,
  difficulty = 'little',
  completionDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }),
  className = '',
}) => {
  return (
    <div
      id="certificate-print-area"
      className={`relative w-full max-w-3xl bg-[#FFFDF9] text-[#26324A] p-6 sm:p-10 rounded-3xl border-8 border-double border-[#D4AF37] shadow-2xl overflow-hidden print:border-8 print:shadow-none print:m-0 print:p-8 print:max-w-none print:rounded-none select-none ${className}`}
    >
      {/* Decorative Golden Corner Accents */}
      <div className="absolute top-2 left-2 text-[#D4AF37] text-2xl select-none pointer-events-none">
        ⚜️
      </div>
      <div className="absolute top-2 right-2 text-[#D4AF37] text-2xl select-none pointer-events-none">
        ⚜️
      </div>
      <div className="absolute bottom-2 left-2 text-[#D4AF37] text-2xl select-none pointer-events-none">
        ⚜️
      </div>
      <div className="absolute bottom-2 right-2 text-[#D4AF37] text-2xl select-none pointer-events-none">
        ⚜️
      </div>

      {/* Subtle Guilloché / Watermark Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8D5A3_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

      {/* Certificate Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FAF5E6] border-2 border-[#D4AF37] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#996515] shadow-xs">
          <Award size={16} /> Official Certificate of Achievement
        </div>

        {/* Main Title */}
        <div className="space-y-1">
          <h1 className="font-fredoka text-3xl sm:text-5xl font-black text-[#5644D4] tracking-tight drop-shadow-xs">
            ENGLISH ADVENTURE
          </h1>
          <h2 className="font-fredoka text-xl sm:text-2xl font-black text-[#D4AF37] tracking-wider uppercase">
            Master Explorer Diploma
          </h2>
        </div>

        {/* Certificate Text */}
        <p className="font-nunito text-xs sm:text-sm text-gray-600 font-semibold max-w-lg leading-relaxed">
          This is to proudly certify that
        </p>

        {/* Recipient Name & Avatar Presentation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-gradient-to-r from-purple-50 via-amber-50 to-pink-50 px-8 py-3 rounded-2xl border-2 border-[#D4AF37]/50 shadow-inner w-full max-w-md">
          <AvatarDisplay avatar={avatar} size="md" />
          <div className="text-center sm:text-left">
            <span className="font-fredoka text-2xl sm:text-4xl font-black text-[#26324A] tracking-wide block">
              {playerName || 'Explorer'}
            </span>
            <span className="text-xs font-bold text-[#6C5CE7] font-nunito uppercase tracking-wider block">
              {difficulty === 'little' ? '🐣 Little Explorer Track (Ages 5–7)' : '🚀 Super Explorer Track (Ages 8–10)'}
            </span>
          </div>
        </div>

        {/* Achievement Statement */}
        <p className="font-nunito text-xs sm:text-sm text-gray-700 font-bold max-w-xl leading-relaxed">
          has successfully traversed all <strong>5 Magical Worlds</strong> (Vocabulary Island, Grammar Castle, Pronunciation Jungle, Reading Forest, and Listening Cave), completed all <strong>15 Stages</strong>, and demonstrated outstanding curiosity, dedication, and speaking confidence in the English language!
        </p>

        {/* Golden Private Tutoring Eligibility Seal */}
        <div className="w-full max-w-lg bg-gradient-to-r from-[#FFF5DC] via-[#FFF9E6] to-[#FFF5DC] p-3.5 sm:p-4 rounded-2xl border-2 border-[#D4AF37] shadow-sm flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FFD54F] to-[#FFA000] text-white flex items-center justify-center text-2xl shadow-md shrink-0 border-2 border-white">
            🎓
          </div>
          <div className="text-left">
            <span className="font-fredoka text-xs sm:text-sm font-black text-[#996515] uppercase tracking-wide block flex items-center gap-1">
              Officially Qualified for 1-on-1 Lessons <CheckCircle2 size={15} className="text-[#35C98A]" />
            </span>
            <span className="text-[11px] sm:text-xs font-nunito font-bold text-gray-700 block leading-tight">
              Certified ready for personalized individual private English lessons with Teacher Tina!
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="w-full max-w-md grid grid-cols-3 gap-2 pt-1 font-fredoka">
          <div className="bg-amber-50/80 p-2 rounded-xl border border-amber-200">
            <span className="text-[10px] text-amber-700 uppercase font-black block">Stages</span>
            <span className="text-base sm:text-lg font-black text-[#26324A]">15 / 15 ✅</span>
          </div>
          <div className="bg-purple-50/80 p-2 rounded-xl border border-purple-200">
            <span className="text-[10px] text-purple-700 uppercase font-black block">Stars</span>
            <span className="text-base sm:text-lg font-black text-[#26324A]">{totalStars} / 45 ⭐</span>
          </div>
          <div className="bg-emerald-50/80 p-2 rounded-xl border border-emerald-200">
            <span className="text-[10px] text-emerald-700 uppercase font-black block">Coins</span>
            <span className="text-base sm:text-lg font-black text-[#26324A]">{totalCoins} 🪙</span>
          </div>
        </div>

        {/* Signatures & Teacher Tina Seal */}
        <div className="w-full pt-4 border-t-2 border-dashed border-[#D4AF37]/50 flex items-center justify-between gap-4 mt-2 px-2 sm:px-6">
          {/* Left: Date & Seal */}
          <div className="text-left">
            <span className="text-[10px] font-bold text-gray-400 font-nunito uppercase block">
              Date of Issue
            </span>
            <span className="font-fredoka text-xs sm:text-sm font-bold text-[#26324A] block">
              {completionDate}
            </span>
            <span className="text-[10px] text-emerald-600 font-bold block flex items-center gap-0.5">
              <Sparkles size={10} /> Verified Record
            </span>
          </div>

          {/* Center: Official Teacher Tina Seal */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-3 border-[#D4AF37] shadow-md bg-purple-100">
              <img
                src={TINA_CONFIG.photos.thumbsUp}
                alt="Teacher Tina Official Seal"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="text-[9px] font-black text-[#D4AF37] font-fredoka uppercase mt-1 tracking-wider">
              Official Seal
            </span>
          </div>

          {/* Right: Signature */}
          <div className="text-right">
            <span className="text-[10px] font-bold text-gray-400 font-nunito uppercase block">
              Instructor & Mentor
            </span>
            <span className="font-fredoka text-base sm:text-xl font-black text-[#6C5CE7] italic block tracking-wide">
              Teacher Tina
            </span>
            <span className="text-[10px] font-nunito font-bold text-gray-600 block">
              Certified English Teacher
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

