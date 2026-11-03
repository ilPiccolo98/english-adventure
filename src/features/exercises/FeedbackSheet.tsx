import React from 'react';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { TINA_CONFIG } from '../../data/teacher.config';

interface FeedbackSheetProps {
  status: 'correct' | 'incorrect';
  explanation?: string;
  onContinue: () => void;
}

export const FeedbackSheet: React.FC<FeedbackSheetProps> = ({
  status,
  explanation,
  onContinue,
}) => {
  const isCorrect = status === 'correct';

  const title = isCorrect ? 'AMAZING! 🎉' : 'Almost! Try again! 💪';

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 transition-transform duration-300 transform translate-y-0 shadow-2xl border-t-4 ${
        isCorrect
          ? 'bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 border-[#35C98A]'
          : 'bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border-[#FFB547]'
      }`}
      role="region"
      aria-label="Exercise Feedback"
    >
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          {/* Teacher Tina Thumbs-Up Photo */}
          <div className="relative shrink-0">
            <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-2xl overflow-hidden border-3 border-[#FFB547] bg-purple-50 shadow-md">
              <img
                src={TINA_CONFIG.photos.thumbsUp}
                alt="Teacher Tina thumbs up encouragement"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 text-base sm:text-lg drop-shadow-xs">
              👍
            </span>
          </div>

          <div>
            <span className="text-[11px] font-fredoka font-bold text-[#6C5CE7] block uppercase tracking-wider">
              Teacher Tina says:
            </span>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
              {isCorrect ? (
                <CheckCircle2 size={24} className="text-[#35C98A] shrink-0" />
              ) : (
                <AlertCircle size={24} className="text-[#EAA030] shrink-0" />
              )}
              <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-[#26324A]">
                {title}
              </h3>
            </div>
            {explanation && (
              <p className="text-sm sm:text-base text-[#26324A]/80 font-nunito font-semibold mt-1">
                {explanation}
              </p>
            )}
          </div>
        </div>

        <Button
          variant={isCorrect ? 'green' : 'gold'}
          size="lg"
          onClick={onContinue}
          className="w-full sm:w-auto shrink-0 shadow-lg"
          icon={<ArrowRight size={22} />}
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};
