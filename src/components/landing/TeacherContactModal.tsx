import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { TINA_CONFIG } from '../../data/teacher.config';
import {
  Mail,
  Copy,
  Check,
  Clock,
  Video,
  Sparkles,
  Heart,
  Award,
  Send,
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
  const [copiedField, setCopiedField] = useState<'message' | 'email' | null>(null);

  const isAr = lang === 'ar';

  const defaultMessage =
    initialMessage ||
    (isAr
      ? 'مرحبًا تيتشر تينا! أود الاستفسار عن كورس تأسيس اللغة الإنجليزية للأطفال (معايير Cambridge) لطفلي وتنسيق المواعيد المتاحة.'
      : 'Hello Teacher Tina! I saw your English Foundation Course and would like to inquire about 1-on-1 private lessons for my child and check your availability.');

  const displayEmail = TINA_CONFIG.email || 'teachertina.english@gmail.com';

  const getEmailHref = () => {
    const subject = encodeURIComponent(
      isAr
        ? 'استفسار عن كورس تأسيس اللغة الإنجليزية للأطفال (Cambridge CEFR)'
        : 'Inquiry: English Foundation Course for Children (Cambridge CEFR)'
    );
    const body = encodeURIComponent(defaultMessage);
    return `mailto:${displayEmail}?subject=${subject}&body=${body}`;
  };

  const handleCopy = (text: string, field: 'message' | 'email') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2500);
    });
  };

  const t = {
    modalTitle: isAr
      ? 'التواصل مع تيتشر تينا عبر البريد الإلكتروني 👩‍🏫'
      : 'Email Teacher Tina 👩‍🏫',
    certifiedBadge: isAr ? 'معلمة لغة إنجليزية معتمدة' : 'Certified English Teacher',
    teacherName: isAr ? 'تيتشر تينا' : 'Teacher Tina',
    greeting: isAr
      ? '«يسعدني جدًا مساعدة طفلك في رحلة تأسيس الإنجليزية بكل حب وثقة وفق معايير Cambridge CEFR. راسليني عبر البريد الإلكتروني مباشرة أو انسخي العنوان أدناه!»'
      : '“I would love to help your child speak English with joy and confidence. Send me an email directly or copy my address below!”',
    emailCardTitle: isAr ? 'البريد الإلكتروني المباشر' : 'Direct Email Address',
    personalInboxTag: isAr ? 'صندوق بريد شخصي' : 'Personal Inbox',
    openEmailBtn: isAr ? 'فتح تطبيق البريد وكتابة رسالة' : 'Open Email App & Compose',
    copyEmailBtn: isAr ? 'نسخ عنوان البريد' : 'Copy Email Address',
    emailCopiedText: isAr ? 'تم نسخ عنوان البريد!' : 'Email Address Copied!',
    suggestedLabel: isAr
      ? 'نموذج الرسالة المقترحة (لنسخها في Gmail أو Outlook)'
      : 'Suggested Message Template (for Gmail, Outlook, etc.)',
    copyTemplateBtn: isAr ? 'نسخ نص الرسالة' : 'Copy Message Text',
    templateCopiedText: isAr ? 'تم نسخ نص الرسالة!' : 'Message Copied!',
    responseTimeNote: isAr
      ? '⚡ يتم الرد شخصيًا على جميع استفسارات أولياء الأمور عبر البريد الإلكتروني خلال 24 ساعة.'
      : '⚡ Teacher Tina personally responds to all parent email inquiries within 24 hours.',
    formatTitle: isAr ? 'حصص فردية 1-on-1' : '1-on-1 Online',
    formatDesc: isAr ? 'عبر Zoom / Google Meet' : 'Zoom / Google Meet',
    durationTitle: isAr ? '50–60 دقيقة للحصة' : '50–60 Minutes',
    durationDesc: isAr ? '3 حصص أسبوعيًا (12 شهريًا)' : '3 lessons per week (12/mo)',
    followUpTitle: isAr ? 'متابعة دورية مباشرة' : 'Direct Follow-Up',
    followUpDesc: isAr ? 'مباشرة عبر البريد الإلكتروني' : 'Direct via Email',
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
        {/* ✉️ PRIMARY EMAIL CHANNEL (Exclusive Contact Method)          */}
        {/* ============================================================ */}
        <div className="bg-gradient-to-br from-purple-50/90 via-white to-pink-50/60 rounded-3xl p-5 border-2 border-purple-200 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-[#6C5CE7] text-white flex items-center justify-center shrink-0 shadow-lg shadow-purple-200">
                <Mail size={26} />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <span className="font-fredoka font-black text-sm sm:text-base text-[#26324A]">
                    {t.emailCardTitle}
                  </span>
                  <span className="text-[10px] bg-purple-100 text-[#6C5CE7] font-fredoka font-black px-2 py-0.5 rounded-full uppercase">
                    {t.personalInboxTag}
                  </span>
                </div>
                <span className="font-mono text-sm sm:text-base font-bold text-[#6C5CE7] block break-all mt-0.5 select-all">
                  {displayEmail}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <a
              href={getEmailHref()}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-[#6C5CE7] hover:bg-[#5644D4] text-white font-fredoka font-bold text-sm shadow-md border-b-3 border-[#4A3EB5] transition-all cursor-pointer"
            >
              <Send size={16} />
              <span>{t.openEmailBtn}</span>
            </a>

            <button
              type="button"
              onClick={() => handleCopy(displayEmail, 'email')}
              className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl border-2 font-fredoka font-bold text-sm shadow-2xs transition-all cursor-pointer ${
                copiedField === 'email'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white hover:bg-purple-50 border-purple-200 text-[#6C5CE7]'
              }`}
            >
              {copiedField === 'email' ? <Check size={16} /> : <Copy size={16} />}
              <span>{copiedField === 'email' ? t.emailCopiedText : t.copyEmailBtn}</span>
            </button>
          </div>

          <div className="bg-purple-100/50 p-2.5 rounded-xl text-center">
            <span className="text-xs font-nunito font-bold text-purple-900 block">
              {t.responseTimeNote}
            </span>
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
              <span>{copiedField === 'message' ? t.templateCopiedText : t.copyTemplateBtn}</span>
            </button>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 font-nunito text-xs sm:text-sm text-gray-700 font-medium leading-relaxed italic select-all">
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
