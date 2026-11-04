import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { TINA_CONFIG } from '../../data/teacher.config';
import {
  MessageCircle,
  Mail,
  Copy,
  Check,
  Clock,
  Video,
  Sparkles,
  Heart,
  Award,
} from 'lucide-react';

interface TeacherContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
  lang?: 'en' | 'ar';
}

export const TeacherContactModal: React.FC<TeacherContactModalProps> = ({
  isOpen,
  onClose,
  initialMessage,
  lang = 'en',
}) => {
  const [copiedField, setCopiedField] = useState<'message' | 'email' | 'phone' | null>(null);

  const isAr = lang === 'ar';

  const defaultMessage =
    initialMessage ||
    (isAr
      ? 'مرحبًا تيتشر تينا! أود الاستفسار عن كورس تأسيس اللغة الإنجليزية للأطفال (معايير Cambridge) لطفلي.'
      : 'Hello Teacher Tina! I saw your English Foundation Course and would like to inquire about 1-on-1 private lessons for my child.');

  const displayEmail = TINA_CONFIG.email || 'teachertina.english@gmail.com';
  const displayPhone = TINA_CONFIG.whatsappNumber || '+1 (555) 328-8462';

  const getWhatsAppHref = () => {
    const rawNumber = TINA_CONFIG.whatsappNumber
      ? TINA_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')
      : '';
    const encodedText = encodeURIComponent(defaultMessage);
    if (rawNumber) {
      return `https://wa.me/${rawNumber}?text=${encodedText}`;
    }
    return `https://api.whatsapp.com/send?text=${encodedText}`;
  };

  const getEmailHref = () => {
    const subject = encodeURIComponent(
      isAr
        ? 'استفسار عن كورس تأسيس اللغة الإنجليزية للأطفال'
        : 'Inquiry: English Foundation Course for my Child'
    );
    const body = encodeURIComponent(defaultMessage);
    return `mailto:${displayEmail}?subject=${subject}&body=${body}`;
  };

  const handleCopy = (text: string, field: 'message' | 'email' | 'phone') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2500);
    });
  };

  const t = {
    modalTitle: isAr ? 'التواصل مع تيتشر تينا 👩‍🏫' : 'Contact Teacher Tina 👩‍🏫',
    certifiedBadge: isAr ? 'معلمة لغة إنجليزية معتمدة' : 'Certified English Teacher',
    teacherName: isAr ? 'تيتشر تينا' : 'Teacher Tina',
    greeting: isAr
      ? '«يسعدني جدًا مساعدة طفلك في رحلة تأسيس الإنجليزية بكل حب وثقة وفق معايير Cambridge CEFR. اختاري الطريقة الأنسب لك للتواصل!»'
      : '“I would love to help your child speak English with joy and confidence. Choose your preferred way to connect below!”',
    whatsappTitle: isAr ? 'محادثة مباشرة عبر واتساب' : 'WhatsApp Direct Chat',
    fastestTag: isAr ? 'الأسرع ردًا' : 'Fastest',
    whatsappDesc: isAr
      ? 'محادثة مباشرة لتنسيق الحصص الفردية والمواعيد'
      : TINA_CONFIG.whatsappNumber
      ? displayPhone
      : 'Direct message to schedule lessons',
    openChat: isAr ? 'فتح المحادثة' : 'Open Chat',
    emailTitle: isAr ? 'الاستفسار عبر البريد الإلكتروني' : 'Email Inquiry',
    sendEmail: isAr ? 'إرسال إيميل' : 'Send Email',
    suggestedLabel: isAr ? 'نموذج الرسالة المقترحة' : 'Suggested Message Template',
    copiedText: isAr ? 'تم النسخ!' : 'Copied!',
    copyText: isAr ? 'نسخ' : 'Copy',
    messageCopied: isAr ? 'تم نسخ الرسالة!' : 'Message Copied!',
    copyMessage: isAr ? 'نسخ الرسالة' : 'Copy Message',
    formatTitle: isAr ? 'حصص فردية 1-on-1' : '1-on-1 Online',
    formatDesc: isAr ? 'عبر Zoom / Google Meet' : 'Zoom / Google Meet',
    durationTitle: isAr ? '50–60 دقيقة للحصة' : '50–60 Minutes',
    durationDesc: isAr ? '3 حصص أسبوعيًا (12 شهريًا)' : '3 lessons per week (12/mo)',
    followUpTitle: isAr ? 'متابعة دورية مباشرة' : 'Direct Follow-Up',
    followUpDesc: isAr ? 'مباشرة مع تيتشر تينا' : 'Direct with Teacher Tina',
    footerNote: isAr
      ? 'رعاية تربوية مخصصة لكل طفل حسب وتيرته الفردية'
      : 'Gentle, personalized care tailored to each child’s pace',
    closeBtn: isAr ? 'إغلاق' : 'Close',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t.modalTitle}
      className={`max-w-xl ${isAr ? 'text-right' : 'text-left'}`}
    >
      <div className={`space-y-6 pt-2 ${isAr ? 'dir-rtl' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
        {/* ============================================================ */}
        {/* 👩‍🏫 TEACHER TINA HEADER CARD                                 */}
        {/* ============================================================ */}
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 p-4 rounded-3xl border-2 border-purple-200/80 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-[#6C5CE7] shadow-md shrink-0 bg-purple-100 ring-4 ring-purple-200/60">
            <img
              src={TINA_CONFIG.realPhotos.portrait}
              alt="Teacher Tina"
              className="w-full h-full object-cover object-[center_35%]"
            />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-fredoka font-black text-[#6C5CE7] bg-purple-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles size={12} />
              <span>{t.certifiedBadge}</span>
            </div>
            <h3 className="font-fredoka text-xl sm:text-2xl font-black text-[#26324A] leading-tight">
              {t.teacherName}
            </h3>
            <p className="font-nunito text-xs text-gray-600 font-bold leading-snug">
              {t.greeting}
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 📱 PRIMARY CONTACT CHANNELS (WhatsApp & Email)              */}
        {/* ============================================================ */}
        <div className="space-y-3">
          {/* WhatsApp Direct Option */}
          <div className="bg-emerald-50/80 rounded-2xl p-4 border-2 border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3 w-full sm:w-auto text-center sm:text-start">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
                <MessageCircle size={26} />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <span className="font-fredoka font-black text-sm text-[#26324A]">
                    {t.whatsappTitle}
                  </span>
                  <span className="text-[10px] bg-emerald-200/80 text-emerald-900 font-fredoka font-bold px-2 py-0.5 rounded-full">
                    {t.fastestTag}
                  </span>
                </div>
                <span className="text-xs font-nunito font-semibold text-gray-600 block">
                  {t.whatsappDesc}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <a
                href={getWhatsAppHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-fredoka font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>{t.openChat}</span>
              </a>

              {TINA_CONFIG.whatsappNumber && (
                <button
                  type="button"
                  onClick={() => handleCopy(displayPhone, 'phone')}
                  className="px-3 py-2.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-fredoka font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                  title="Copy Phone Number"
                >
                  {copiedField === 'phone' ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedField === 'phone' ? t.copiedText : t.copyText}</span>
                </button>
              )}
            </div>
          </div>

          {/* Email Option */}
          <div className="bg-purple-50/70 rounded-2xl p-4 border-2 border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3 w-full sm:w-auto text-center sm:text-start">
              <div className="w-12 h-12 rounded-2xl bg-[#6C5CE7] text-white flex items-center justify-center shrink-0 shadow-md">
                <Mail size={24} />
              </div>
              <div>
                <span className="font-fredoka font-black text-sm text-[#26324A] block">
                  {t.emailTitle}
                </span>
                <span className="text-xs font-nunito font-semibold text-gray-600 block break-all">
                  {displayEmail}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <a
                href={getEmailHref()}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#6C5CE7] hover:bg-[#5644D4] text-white font-fredoka font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <Mail size={16} />
                <span>{t.sendEmail}</span>
              </a>

              <button
                type="button"
                onClick={() => handleCopy(displayEmail, 'email')}
                className="px-3 py-2.5 rounded-xl bg-white hover:bg-purple-100 text-[#6C5CE7] border border-purple-300 font-fredoka font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                title="Copy Email Address"
              >
                {copiedField === 'email' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedField === 'email' ? t.copiedText : t.copyText}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 📝 PRE-FILLED MESSAGE TEMPLATE                               */}
        {/* ============================================================ */}
        <div className="bg-white rounded-2xl p-4 border-2 border-gray-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-fredoka font-black text-gray-600 uppercase tracking-wide">
              {t.suggestedLabel}
            </span>
            <button
              type="button"
              onClick={() => handleCopy(defaultMessage, 'message')}
              className="text-xs font-fredoka font-bold text-[#6C5CE7] hover:text-[#5644D4] flex items-center gap-1 cursor-pointer"
            >
              {copiedField === 'message' ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedField === 'message' ? t.messageCopied : t.copyMessage}</span>
            </button>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 font-nunito text-xs sm:text-sm text-gray-700 font-medium leading-relaxed italic">
            “{defaultMessage}”
          </div>
        </div>

        {/* ============================================================ */}
        {/* ℹ️ LESSON FORMAT & SCHEDULE SUMMARY                          */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center font-nunito">
          <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200 flex flex-col items-center">
            <Video size={20} className="text-amber-600 mb-1" />
            <span className="font-fredoka text-xs font-black text-[#26324A]">{t.formatTitle}</span>
            <span className="text-[11px] text-gray-600 font-semibold mt-0.5">
              {t.formatDesc}
            </span>
          </div>

          <div className="bg-purple-50/80 p-3 rounded-2xl border border-purple-200 flex flex-col items-center">
            <Clock size={20} className="text-[#6C5CE7] mb-1" />
            <span className="font-fredoka text-xs font-black text-[#26324A]">{t.durationTitle}</span>
            <span className="text-[11px] text-gray-600 font-semibold mt-0.5">
              {t.durationDesc}
            </span>
          </div>

          <div className="bg-pink-50/80 p-3 rounded-2xl border border-pink-200 flex flex-col items-center">
            <Award size={20} className="text-pink-600 mb-1" />
            <span className="font-fredoka text-xs font-black text-[#26324A]">{t.followUpTitle}</span>
            <span className="text-[11px] text-gray-600 font-semibold mt-0.5">
              {t.followUpDesc}
            </span>
          </div>
        </div>

        {/* Bottom Close Button */}
        <div className="pt-2 flex items-center justify-between border-t border-gray-100">
          <span className="text-xs font-nunito font-bold text-gray-500 flex items-center gap-1">
            <Heart size={14} className="text-pink-500 fill-pink-500" />
            <span>{t.footerNote}</span>
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-fredoka font-bold text-xs cursor-pointer transition-all"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </Modal>
  );
};
