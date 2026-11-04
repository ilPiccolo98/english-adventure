import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { TINA_CONFIG } from '../../data/teacher.config';
import { Mail, Sparkles, CheckCircle2, ArrowRight, Play } from 'lucide-react';

interface ParentQuickModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResumeStage?: () => void;
}

export const ParentQuickModal: React.FC<ParentQuickModalProps> = ({
  isOpen,
  onClose,
  onResumeStage,
}) => {
  const navigate = useNavigate();

  const email = TINA_CONFIG.email || 'teachertina.english@gmail.com';

  const getEmailLink = () => {
    const subject = encodeURIComponent('Inquiry: 1-on-1 English Lessons with Teacher Tina');
    const body = encodeURIComponent(
      'Hello Teacher Tina! I am exploring English Adventure with my child and would like to ask about your 1-on-1 private lessons and availability.'
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleGoToFullPage = () => {
    onClose();
    navigate('/parents');
  };

  const handleResume = () => {
    onClose();
    if (onResumeStage) {
      onResumeStage();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Information for Parents 👨‍👩‍👧"
    >
      <div className="space-y-4 py-1 text-center sm:text-left">
        {/* Teacher Tina Mini Header */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 bg-gradient-to-r from-pink-50 via-purple-50 to-amber-50 p-4 rounded-3xl border-2 border-pink-200">
          <div className="w-16 h-20 rounded-2xl overflow-hidden border-3 border-yellow-300 shadow-md shrink-0 bg-white">
            <img
              src={TINA_CONFIG.photos.thumbsUp}
              alt="Teacher Tina"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="flex-1 space-y-1">
            <div className="inline-flex items-center gap-1 text-[11px] font-fredoka font-bold text-[#6C5CE7] bg-white px-2 py-0.5 rounded-full border border-purple-200 uppercase">
              <Sparkles size={12} /> {TINA_CONFIG.role}
            </div>
            <h3 className="font-fredoka text-xl font-black text-[#26324A] leading-tight">
              Meet Teacher Tina
            </h3>
            <p className="font-nunito text-xs font-bold text-gray-600 leading-snug">
              Individual 1-on-1 English tutoring adapted to your child's pace.
            </p>
          </div>
        </div>

        {/* Individual Lessons Only Notice */}
        <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200 text-xs font-nunito font-semibold text-gray-700 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-black font-fredoka text-[#6C5CE7]">
            <CheckCircle2 size={16} className="text-[#35C98A]" />
            <span>100% Individual 1-on-1 Lessons Only</span>
          </div>
          <p className="text-gray-600">
            No crowded groups or rushed schedules. Your child receives personalized pronunciation support and conversational confidence.
          </p>
        </div>

        {/* Contact Action */}
        <div>
          <a
            href={getEmailLink()}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#6C5CE7] hover:bg-[#5644D4] text-white font-fredoka font-bold text-sm rounded-2xl shadow-md border-b-3 border-[#4A3EB5] transition-all cursor-pointer"
          >
            <Mail size={18} />
            <span>Email Teacher Tina ({email})</span>
          </a>
        </div>

        {/* Bottom Dual Navigation Buttons */}
        <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5">
          <Button
            variant="green"
            size="md"
            onClick={handleResume}
            className="flex-1 shadow-md"
            icon={<Play size={18} className="fill-white" />}
          >
            Keep Playing Stage
          </Button>

          <Button
            variant="purple"
            size="md"
            onClick={handleGoToFullPage}
            className="flex-1 shadow-md"
            icon={<ArrowRight size={18} />}
          >
            Full Teacher Page
          </Button>
        </div>
      </div>
    </Modal>
  );
};

