import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  CheckCircle2,
  Award,
  Sparkles,
  ChevronDown,
  Gamepad2,
  ShieldCheck,
  Star,
  Heart,
  Clock,
  Calendar,
  GraduationCap,
  Users2,
  BookOpen,
  PenTool,
  Mic,
  Headphones,
} from 'lucide-react';
import { TINA_CONFIG } from '../../data/teacher.config';
import { KidsArcadePlaque } from '../../components/landing/KidsArcadePlaque';
import { TeacherContactModal } from '../../components/landing/TeacherContactModal';

export const ParentLandingPage: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ar'>(() => {
    const saved = localStorage.getItem('tina_landing_lang');
    return saved === 'ar' || saved === 'en' ? saved : 'en';
  });

  const [activePhotoKey, setActivePhotoKey] = useState<
    'welcoming' | 'standing' | 'blackboard' | 'guidance' | 'portrait'
  >('welcoming');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');

  const navigate = useNavigate();
  const isAr = lang === 'ar';

  const handleLanguageChange = (newLang: 'en' | 'ar') => {
    setLang(newLang);
    localStorage.setItem('tina_landing_lang', newLang);
  };

  const handleOpenContact = (customMessage?: string) => {
    const defaultMsg = isAr
      ? 'مرحبًا تيتشر تينا! أود الاستفسار عن كورس تأسيس اللغة الإنجليزية للأطفال (معايير Cambridge) لطفلي.'
      : 'Hello Teacher Tina! I saw your English Foundation Course and would like to ask about 1-on-1 private lessons for my child.';
    setContactInitialMessage(customMessage || defaultMsg);
    setIsContactModalOpen(true);
  };

  const realGallery = [
    {
      key: 'welcoming' as const,
      src: TINA_CONFIG.realPhotos.welcoming,
      title: isAr ? 'استقبال دافئ وكتب تعليمية ممتعة' : 'Warm Welcome & Course Books',
      desc: isAr
        ? 'تستقبل تيتشر تينا الأطفال بحماس وكتب مصورة مصممة خصيصًا لتأسيس القراءة بطريقة تفاعلية.'
        : 'Teacher Tina welcomes young learners with vibrant illustrated books and high enthusiasm.',
    },
    {
      key: 'blackboard' as const,
      src: TINA_CONFIG.realPhotos.blackboard,
      title: isAr ? 'شرح تفاعلي على السبورة (إنجليزي وعربي)' : 'Interactive Blackboard Teaching',
      desc: isAr
        ? 'توضيح مخارج الأصوات والكلمات مع مراعاة المقارنة بين الإنجليزية والعربية لتسهيل الفهم.'
        : 'Phonics and vocabulary clearly taught with bilingual English & Arabic visual support on the board.',
    },
    {
      key: 'guidance' as const,
      src: TINA_CONFIG.realPhotos.guidance,
      title: isAr ? 'توجيه فردي ومتابعة خطوة بخطوة' : 'Personalized Table Guidance',
      desc: isAr
        ? 'رعاية وتوجيه صبور: كل طفل يحصل على اهتمام كامل لتعزيز مهارات الكتابة والقراءة دون استعجال.'
        : 'Gentle, patient guidance: each child is supported step-by-step through their workbook.',
    },
    {
      key: 'standing' as const,
      src: TINA_CONFIG.realPhotos.standing,
      title: isAr ? 'بيئة تعليمية إيجابية ومحفزة' : 'Positive Classroom Atmosphere',
      desc: isAr
        ? 'مكان آمن ومبهج حيث يختفي الخوف من الخطأ وتتحول دراسة الإنجليزية إلى متعة مستمرة.'
        : 'A safe, joyful learning environment where the fear of making mistakes disappears.',
    },
    {
      key: 'portrait' as const,
      src: TINA_CONFIG.realPhotos.portrait,
      title: isAr ? 'ألفة وبناء ثقة متبادلة مع الطفل' : 'Trust & Rapport with Children',
      desc: isAr
        ? 'علاقة إنسانية محفزة تجعل الطفل يحب اللغة ويشعر بالراحة الكاملة أثناء التحدث.'
        : 'A warm, empathetic mentor turning English into an effortless, lifelong passion.',
    },
  ];

  const fc = TINA_CONFIG.foundationCourse;

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`min-h-screen w-full bg-[#FFFDF9] text-[#26324A] font-nunito flex flex-col selection:bg-purple-200 ${
        isAr ? 'font-sans' : ''
      }`}
    >
      {/* ============================================================ */}
      {/* 🧭 TOP NAVBAR (Navigation, Language Switcher & Direct CTA)   */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C5CE7] to-[#8C7AE6] flex items-center justify-center text-white text-xl shadow-md border-2 border-white group-hover:scale-105 transition-transform shrink-0">
              🏝️
            </div>
            <div className="flex flex-col text-start">
              <span className="font-fredoka font-black text-lg sm:text-xl text-[#26324A] leading-tight">
                English Adventure
              </span>
              <span className="font-fredoka text-[11px] font-bold text-[#6C5CE7] tracking-wider uppercase">
                {isAr ? 'مع تيتشر تينا' : 'with Teacher Tina'}
              </span>
            </div>
          </Link>

          {/* Center Quick Jump Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 font-fredoka text-sm font-bold text-gray-600">
            <a href="#foundation-course" className="hover:text-[#6C5CE7] transition-colors">
              {isAr ? 'الكورس التأسيسي' : 'Foundation Course'}
            </a>
            <a href="#skills" className="hover:text-[#6C5CE7] transition-colors">
              {isAr ? 'المهارات الأربع' : '4 Skills'}
            </a>
            <a href="#structure" className="hover:text-[#6C5CE7] transition-colors">
              {isAr ? 'نظام الدراسة' : 'Study System'}
            </a>
            <a href="#levels" className="hover:text-[#6C5CE7] transition-colors">
              {isAr ? 'مستويات الكورس' : 'Levels & Pace'}
            </a>
            <a href="#gallery" className="hover:text-[#6C5CE7] transition-colors">
              {isAr ? 'صور حقيقية' : 'Classroom'}
            </a>
            <a href="#faq" className="hover:text-[#6C5CE7] transition-colors">
              {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
            </a>
          </nav>

          {/* Right: Language Switcher & Quick Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher Pill Toggle */}
            <div className="bg-gray-100 p-1 rounded-2xl flex items-center border border-gray-200 shadow-2xs">
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 rounded-xl text-xs font-fredoka font-bold transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white text-[#6C5CE7] shadow-xs scale-102'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🇬🇧 EN
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('ar')}
                className={`px-3 py-1 rounded-xl text-xs font-fredoka font-bold transition-all cursor-pointer ${
                  lang === 'ar'
                    ? 'bg-white text-[#6C5CE7] shadow-xs scale-102'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🇸🇦 العربية
              </button>
            </div>

            {/* Quick Play Anchor Button */}
            <a
              href="#kids-play-zone"
              className="bg-amber-100 hover:bg-amber-200 text-amber-950 border-2 border-amber-300 px-3.5 py-1.5 rounded-2xl font-fredoka font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Gamepad2 size={16} />
              <span className="hidden sm:inline">
                {isAr ? 'منطقة الأطفال' : 'Kids Play Zone'}
              </span>
            </a>

            {/* Contact Button */}
            <button
              type="button"
              onClick={() => handleOpenContact()}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#6C5CE7] hover:bg-[#5644D4] text-white px-3.5 py-1.5 rounded-2xl font-fredoka font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <Mail size={16} />
              <span>{isAr ? 'راسلنا عبر الإيميل' : 'Email Teacher Tina'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 🧒 TOP ARCADE HERO PLAQUE (Central Kid Button: Free to Play) */}
      {/* ============================================================ */}
      <KidsArcadePlaque lang={lang} />

      {/* ============================================================ */}
      {/* 👨‍👩‍👧 PARENT HERO SECTION (Cambridge CEFR Foundation Program)   */}
      {/* ============================================================ */}
      <section
        id="foundation-course"
        className="w-full py-12 sm:py-16 px-4 bg-gradient-to-b from-[#FFFDF9] to-[#F8F9FE] border-b border-gray-100"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Start Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-[#6C5CE7] px-4 py-1.5 rounded-full text-xs sm:text-sm font-fredoka font-black uppercase tracking-wider shadow-2xs">
              <GraduationCap size={16} />
              <span>
                {isAr
                  ? 'وفقًا لمعايير CAMBRIDGE CEFR الأكاديمية'
                  : 'ACCORDING TO CAMBRIDGE CEFR STANDARDS'}
              </span>
            </div>

            <h1 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-black text-[#26324A] leading-[1.15] tracking-tight">
              {fc.title[lang]}
            </h1>

            <p className="font-nunito text-base sm:text-lg text-gray-700 font-semibold leading-relaxed max-w-xl mx-auto lg:mx-0">
              {fc.subtitle[lang]}
            </p>

            <div className="bg-amber-50/80 p-4 rounded-2xl border-2 border-amber-200 text-start">
              <span className="font-fredoka text-xs font-black text-amber-900 uppercase block mb-1">
                {isAr ? '🔤 منهج الصوتيات (Phonics Approach):' : '🔤 The Phonics Foundation:'}
              </span>
              <p className="font-nunito text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                {fc.phonicsDescription[lang]}
              </p>
            </div>

            {/* Key Trust Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-start max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#35C98A] shrink-0" />
                <span className="font-fredoka font-bold text-xs sm:text-sm text-gray-700">
                  {isAr ? 'تنمية المهارات الأربع الأساسية معًا' : 'All 4 Essential Skills Developed'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#35C98A] shrink-0" />
                <span className="font-fredoka font-bold text-xs sm:text-sm text-gray-700">
                  {isAr ? 'حصص فردية 50–60 دقيقة 1-on-1' : '50–60 Min Individual 1-on-1 Lessons'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#35C98A] shrink-0" />
                <span className="font-fredoka font-bold text-xs sm:text-sm text-gray-700">
                  {isAr ? '3 حصص أسبوعيًا (12 شهريًا)' : '3 Lessons / Week (12 / Month)'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#35C98A] shrink-0" />
                <span className="font-fredoka font-bold text-xs sm:text-sm text-gray-700">
                  {isAr ? 'متابعة دورية مباشرة مع تيتشر تينا' : 'Direct Follow-Up with Teacher Tina'}
                </span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                type="button"
                onClick={() => handleOpenContact()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#6C5CE7] hover:bg-[#5644D4] text-white font-fredoka font-black text-lg rounded-2xl shadow-xl border-b-4 border-[#4A3EB5] transform hover:scale-102 transition-all cursor-pointer"
              >
                <Mail size={24} />
                <span>
                  {isAr ? 'تواصل مع تيتشر تينا عبر البريد الإلكتروني' : 'Email Teacher Tina'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/play')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-gray-50 text-[#6C5CE7] border-2 border-purple-200 font-fredoka font-bold text-base rounded-2xl shadow-xs transition-all cursor-pointer"
              >
                <Gamepad2 size={20} />
                <span>
                  {isAr ? 'ابدأ تجربة اللعبة التعليمية مجانًا' : 'Let Your Child Play First (Free)'}
                </span>
              </button>
            </div>
          </div>

          {/* Right Real Photo Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer Decorative Gradient Ring */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-amber-300 via-pink-300 to-purple-400 rounded-3xl blur-md opacity-40 animate-pulse pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                <img
                  src={TINA_CONFIG.realPhotos.welcoming}
                  alt="Teacher Tina in classroom"
                  className="w-full h-96 sm:h-[480px] object-cover object-center"
                />

                {/* Floating Real Proof Card */}
                <div className="p-4 bg-white/95 backdrop-blur-md border-t-2 border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="font-fredoka text-sm font-black text-[#26324A] block">
                      {isAr ? 'تيتشر تينا' : 'Teacher Tina'}
                    </span>
                    <span className="text-xs font-nunito font-bold text-gray-500 block">
                      {isAr
                        ? 'معلمة معتمدة لتأسيس الأطفال وفق معايير Cambridge'
                        : 'Certified English Teacher for Children (Cambridge CEFR)'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenContact()}
                    className="text-xs font-fredoka font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1 rounded-full border border-emerald-200 cursor-pointer transition-colors"
                  >
                    {isAr ? 'الحصص متاحة' : '1-on-1 Ready'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 📖 THE 4 ESSENTIAL SKILLS (القراءة والكتابة والتحدث والاستماع) */}
      {/* ============================================================ */}
      <section id="skills" className="w-full py-16 px-4 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-fredoka text-xs sm:text-sm font-black text-[#6C5CE7] bg-purple-50 px-4 py-1.5 rounded-full uppercase tracking-wider border border-purple-100">
              {isAr ? 'المهارات اللغوية الأساسية' : 'The 4 Core Pillars'}
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              {isAr
                ? 'تنمية جميع المهارات الأساسية معًا في كل حصة'
                : 'Developing All Four Essential Language Skills'}
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              {isAr
                ? 'لا تقتصر الحصة على القراءة والكتابة فقط، بل تتضمن أنشطة تفاعلية شاملة لضمان التطور المتوازن للطفل:'
                : 'Lessons go far beyond dry rote learning. Every single session incorporates interactive activities targeting balanced progress across all 4 areas:'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fc.skills.map((skill) => {
              const iconsMap: Record<string, React.ReactNode> = {
                reading: <BookOpen className="text-amber-600" size={28} />,
                writing: <PenTool className="text-purple-600" size={28} />,
                speaking: <Mic className="text-emerald-600" size={28} />,
                listening: <Headphones className="text-blue-600" size={28} />,
              };

              return (
                <div
                  key={skill.id}
                  className="bg-gradient-to-b from-white to-gray-50/70 p-6 rounded-3xl border-3 border-gray-200/80 hover:border-[#6C5CE7] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3 text-start">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center shadow-xs">
                      {iconsMap[skill.id] || <Sparkles size={28} />}
                    </div>
                    <h3 className="font-fredoka text-xl font-black text-[#26324A]">
                      {skill.name[lang]}
                    </h3>
                    <p className="font-nunito text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed">
                      {skill.description[lang]}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs font-fredoka font-bold text-[#6C5CE7]">
                    <Sparkles size={14} />
                    <span>{isAr ? 'تدريب تفاعلي مستمر' : 'Active Practice'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ⏱️ STUDY STRUCTURE & SYSTEM (نظام الدراسة)                   */}
      {/* ============================================================ */}
      <section id="structure" className="w-full py-16 px-4 bg-[#F8F9FE] border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-fredoka text-xs sm:text-sm font-black text-amber-900 bg-amber-100 px-4 py-1.5 rounded-full uppercase tracking-wider border border-amber-200">
              {isAr ? 'نظام الدراسة' : 'Course Structure'}
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              {isAr
                ? 'تنظيم أكاديمي مدروس لراحة الطفل واستيعابه'
                : 'Structured for Maximum Child Focus & Academic Growth'}
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              {isAr
                ? 'تم تصميم نظام الحصص بعناية لمراعاة قدرة الطفل على التركيز وضمان التدرج الأكاديمي السليم:'
                : 'Carefully planned scheduling that balances attention spans with consistent, proven progress:'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Duration */}
            <div className="bg-white p-6 rounded-3xl border-3 border-amber-200 shadow-md text-start space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black">
                <Clock size={24} />
              </div>
              <h3 className="font-fredoka text-lg font-black text-[#26324A]">
                {isAr ? 'مدة الحصة' : 'Lesson Duration'}
              </h3>
              <p className="font-nunito text-xs sm:text-sm font-bold text-gray-700 leading-relaxed">
                {fc.structure.duration[lang]}
              </p>
            </div>

            {/* 2. Frequency */}
            <div className="bg-white p-6 rounded-3xl border-3 border-purple-200 shadow-md text-start space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#6C5CE7] flex items-center justify-center font-black">
                <Calendar size={24} />
              </div>
              <h3 className="font-fredoka text-lg font-black text-[#26324A]">
                {isAr ? 'عدد الحصص' : 'Frequency'}
              </h3>
              <p className="font-nunito text-xs sm:text-sm font-bold text-gray-700 leading-relaxed">
                {fc.structure.frequency[lang]}
              </p>
            </div>

            {/* 3. Standards */}
            <div className="bg-white p-6 rounded-3xl border-3 border-emerald-200 shadow-md text-start space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                <GraduationCap size={24} />
              </div>
              <h3 className="font-fredoka text-lg font-black text-[#26324A]">
                {isAr ? 'المنهج والمعايير' : 'Academic Standards'}
              </h3>
              <p className="font-nunito text-xs sm:text-sm font-bold text-gray-700 leading-relaxed">
                {fc.structure.standard[lang]}
              </p>
            </div>

            {/* 4. Parent Communication */}
            <div className="bg-white p-6 rounded-3xl border-3 border-pink-200 shadow-md text-start space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center font-black">
                <Users2 size={24} />
              </div>
              <h3 className="font-fredoka text-lg font-black text-[#26324A]">
                {isAr ? 'متابعة ولي الأمر' : 'Parent Follow-Up'}
              </h3>
              <p className="font-nunito text-xs sm:text-sm font-bold text-gray-700 leading-relaxed">
                {fc.structure.parentFollowUp[lang]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 📈 LEVELS & ADAPTIVE PACING (مستويات الكورس والوتيرة الفردية)   */}
      {/* ============================================================ */}
      <section id="levels" className="w-full py-16 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-fredoka text-xs sm:text-sm font-black text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full uppercase tracking-wider border border-emerald-200">
              {isAr ? 'مستويات الكورس والوتيرة الخاصة' : 'Levels & Adaptive Pace'}
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              {isAr
                ? 'مرونة تعليمية تناسب وتيرة كل طفل'
                : 'Every Child Learns at Their Own Natural Pace'}
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              {fc.levels.intro[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
            {/* Standard Pace */}
            <div className="bg-gradient-to-b from-purple-50 to-white p-6 sm:p-7 rounded-3xl border-3 border-purple-200 shadow-md space-y-3">
              <span className="text-3xl block">⏳</span>
              <span className="font-fredoka text-xs font-black text-[#6C5CE7] uppercase tracking-wider">
                {isAr ? 'المتوسط العام' : 'Average Pace'}
              </span>
              <h3 className="font-fredoka text-xl font-black text-[#26324A]">
                {isAr ? '~3 أشهر لكل مستوى' : '~3 Months per Level'}
              </h3>
              <p className="font-nunito text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed">
                {isAr
                  ? 'المدة المتوازنة لإتقان مخارج الصوتيات، القراءة المتدرجة، وممارسة المحادثة بثقة تامة.'
                  : 'Balanced progression ensuring solid phonetic mastery, gradual reading comprehension, and speaking comfort.'}
              </p>
            </div>

            {/* Fast Track */}
            <div className="bg-gradient-to-b from-amber-50 to-white p-6 sm:p-7 rounded-3xl border-3 border-amber-200 shadow-md space-y-3">
              <span className="text-3xl block">🚀</span>
              <span className="font-fredoka text-xs font-black text-amber-800 uppercase tracking-wider">
                {isAr ? 'المسار السريع' : 'Fast Track'}
              </span>
              <h3 className="font-fredoka text-xl font-black text-[#26324A]">
                {isAr ? '~شهران عند الإتقان السريع' : '~2 Months Fast Track'}
              </h3>
              <p className="font-nunito text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed">
                {fc.levels.fastTrack[lang]}
              </p>
            </div>

            {/* Extended Care */}
            <div className="bg-gradient-to-b from-emerald-50 to-white p-6 sm:p-7 rounded-3xl border-3 border-emerald-200 shadow-md space-y-3">
              <span className="text-3xl block">🌱</span>
              <span className="font-fredoka text-xs font-black text-emerald-800 uppercase tracking-wider">
                {isAr ? 'تمديد مريح بدون استعجال' : 'Comfortable Extension'}
              </span>
              <h3 className="font-fredoka text-xl font-black text-[#26324A]">
                {isAr ? 'تمديد مرن حسب الحاجة' : 'Flexible Extension'}
              </h3>
              <p className="font-nunito text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed">
                {fc.levels.extendedCare[lang]}
              </p>
            </div>
          </div>

          {/* Philosophy Banner */}
          <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 p-6 rounded-3xl border-2 border-purple-200 text-center">
            <p className="font-fredoka text-base sm:text-lg font-black text-[#26324A] leading-relaxed">
              💡 {fc.levels.philosophy[lang]}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 📸 AUTHENTIC CLASSROOM GALLERY (Real Photos of Teacher Tina) */}
      {/* ============================================================ */}
      <section id="gallery" className="w-full py-16 px-4 bg-[#F8F9FE] border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-fredoka text-xs sm:text-sm font-black text-[#6C5CE7] bg-purple-50 px-4 py-1.5 rounded-full uppercase tracking-wider border border-purple-100">
              {isAr ? 'لقطات حقيقية من الفصل' : 'Real Classroom Moments'}
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              {isAr
                ? 'داخل فصل تيتشر تينا الحقيقي مع الأطفال'
                : 'Inside Teacher Tina’s Real Classroom'}
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              {isAr
                ? 'شاهد تيتشر تينا في فصلها الدراسي الفعلي مع الأطفال، بين الكتب والسبورة التفاعلية باللغتين العربية والإنجليزية.'
                : 'See Teacher Tina in her genuine teaching environment with young students, working with textbooks, blackboard phonics, and joyful faces.'}
            </p>
          </div>

          {/* Active Featured Photo Spotlight */}
          {(() => {
            const currentItem =
              realGallery.find((g) => g.key === activePhotoKey) || realGallery[0];
            return (
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-4 border-purple-200/60 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 flex justify-center">
                  <div className="w-full max-w-sm aspect-[3/4] sm:h-[460px] rounded-2xl overflow-hidden shadow-lg border-3 border-white bg-slate-100 relative group">
                    <img
                      src={currentItem.src}
                      alt={currentItem.title}
                      className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="md:col-span-7 space-y-4 text-center md:text-start">
                  <div className="inline-flex items-center gap-1.5 text-xs font-fredoka font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                    <Star size={14} className="fill-amber-600" />
                    <span>{isAr ? 'لقطة من داخل الفصل' : 'Real Classroom Snapshot'}</span>
                  </div>
                  <h3 className="font-fredoka text-2xl sm:text-3xl font-black text-[#26324A]">
                    {currentItem.title}
                  </h3>
                  <p className="font-nunito text-base text-gray-700 font-bold leading-relaxed max-w-lg">
                    {currentItem.desc}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleOpenContact()}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#6C5CE7] hover:bg-[#5644D4] text-white font-fredoka font-bold text-sm shadow-md transition-all cursor-pointer"
                    >
                      <Mail size={18} />
                      <span>{isAr ? 'مراسلة تيتشر تينا عبر الإيميل' : 'Email Teacher Tina'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Thumbnail Gallery Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {realGallery.map((photo) => (
              <button
                key={photo.key}
                type="button"
                onClick={() => setActivePhotoKey(photo.key)}
                className={`p-2 rounded-2xl border-3 text-start transition-all cursor-pointer flex flex-col items-center ${
                  activePhotoKey === photo.key
                    ? 'border-[#6C5CE7] bg-purple-50 ring-3 ring-purple-200 shadow-md scale-102'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-2 bg-gray-100">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <span className="font-fredoka text-xs font-bold text-[#26324A] text-center line-clamp-1">
                  {photo.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ⚖️ WHY 1-ON-1 ONLY? (Comparison Matrix vs Groups)            */}
      {/* ============================================================ */}
      <section id="why-1on1" className="w-full py-16 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-fredoka text-xs sm:text-sm font-black text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full uppercase tracking-wider border border-emerald-200">
              {isAr ? 'الميزة التنافسية للدروس الفردية' : 'The Individual Advantage'}
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              {isAr
                ? 'لماذا نعتمد الحصص الفردية 1-on-1 فقط؟'
                : 'Why Choose Exclusively 1-on-1 Lessons?'}
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              {isAr
                ? 'في مرحلة التأسيس الأولى، يصنع وقت التحدث الفردي الفارق الجذري في ثقة الطفل وطلاقته:'
                : 'In the crucial early years of language acquisition, active speaking practice makes all the difference:'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-gray-200 shadow-lg overflow-x-auto">
            <table className="w-full text-start border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b-2 border-gray-100 text-xs sm:text-sm font-fredoka font-black">
                  <th className="py-3 px-3 text-gray-500">
                    {isAr ? 'عنصر التقييم' : 'Teaching Feature'}
                  </th>
                  <th className="py-3 px-3 text-red-500 bg-red-50/50 rounded-t-xl text-center">
                    {isAr ? 'المجموعات الكبيرة (15–20 طفلاً)' : 'Group Classes (15–20 kids)'}
                  </th>
                  <th className="py-3 px-3 text-[#6C5CE7] bg-purple-50 rounded-t-xl text-center">
                    {isAr ? '⭐ حصص 1-on-1 مع تيتشر تينا' : '⭐ Teacher Tina 1-on-1 Private'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm font-nunito font-bold divide-y divide-gray-100">
                <tr>
                  <td className="py-3.5 px-3 text-[#26324A]">
                    {isAr ? 'وقت التحدث الفعلي للطفل' : 'Speaking time per child'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-red-600 bg-red-50/20">
                    {isAr ? '2–3 دقائق في الساعة' : '2–3 minutes per hour'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-[#6C5CE7] bg-purple-50/50 font-black">
                    {isAr ? '80% من كامل مدة الحصة (تحدث فعال)' : '80% of entire lesson (Active speaking)'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 text-[#26324A]">
                    {isAr ? 'سرعة ووتيرة التعلم' : 'Learning pace'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-red-600 bg-red-50/20">
                    {isAr ? 'وتيرة موحدة وثابتة للجميع' : 'Rigid, one-size-fits-all'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-[#6C5CE7] bg-purple-50/50 font-black">
                    {isAr ? 'مخصصة 100% وفق قدرة واستيعاب الطفل' : '100% personalized to your child’s speed'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 text-[#26324A]">
                    {isAr ? 'الأطفال الخجولون' : 'Shy or hesitant learners'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-red-600 bg-red-50/20">
                    {isAr ? 'يميلون للصمت والانعزال' : 'Often stay quiet and passive'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-[#6C5CE7] bg-purple-50/50 font-black">
                    {isAr ? 'احتواء وتشجيع دافئ يبني ثقتهم' : 'Nurtured with patience, warmth & praise'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 text-[#26324A]">
                    {isAr ? 'تصحيح الصوتيات والنطق' : 'Phonics & Accent correction'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-red-600 bg-red-50/20">
                    {isAr ? 'يضيع في زحام الفصل' : 'Overlooked in the crowd'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-[#6C5CE7] bg-purple-50/50 font-black">
                    {isAr ? 'مباشر، دقيق، وممتع دون إحراج' : 'Targeted, playful & immediate'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 📜 GRAND CERTIFICATE REWARD PROGRAM                          */}
      {/* ============================================================ */}
      <section
        id="certificate-info"
        className="w-full py-16 px-4 bg-[#F8F9FE] border-b border-gray-100"
      >
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#FFF5DC] via-[#FFF9E6] to-[#FFE8B2] p-8 sm:p-12 rounded-3xl border-4 border-[#D4AF37] shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4 text-start">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-white px-3.5 py-1 rounded-full text-xs font-fredoka font-black uppercase tracking-wider shadow-xs">
              <Award size={16} />
              <span>{isAr ? 'شهادة التخرج الرسمية' : 'OFFICIAL TEACHER TINA DIPLOMA'}</span>
            </div>

            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A] leading-tight">
              {isAr
                ? 'كيف تحفز شهادة التخرج طفلك على إتمام المغامرة؟'
                : 'How the Grand Certificate Motivates Your Child'}
            </h2>

            <p className="font-nunito text-sm sm:text-base text-gray-700 font-semibold leading-relaxed">
              {isAr
                ? 'في لعبة "English Adventure"، يخوض طفلك مهمة ممتعة بإكمال 15 مستوى عبر 5 عوالم سحرية لفتح شهادة التخرج الرسمية من تيتشر تينا، والتي تعلن جاهزيته للحصص الفردية وقابلة للطباعة بجودة عالية لتعليقها في غرفته!'
                : 'In our adventure, your child embarks on a grand quest: finishing all 15 stages across the 5 magical worlds to unlock the Official Certificate of Achievement. It proudly declares eligibility for 1-on-1 private lessons with Teacher Tina and is printable in high-resolution to frame on their bedroom wall!'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/certificate"
                className="bg-white hover:bg-gray-50 text-[#996515] border-2 border-[#D4AF37] px-5 py-2.5 rounded-2xl font-fredoka font-bold text-xs sm:text-sm shadow-xs transition-all"
              >
                {isAr ? 'معاينة الشهادة 📜' : 'Preview Certificate 📜'}
              </Link>
              <button
                type="button"
                onClick={() => navigate('/play')}
                className="bg-[#26324A] hover:bg-[#1A2333] text-white px-5 py-2.5 rounded-2xl font-fredoka font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
              >
                {isAr ? 'ابدأ المهمة في اللعبة 🚀' : 'Start the Quest Now 🚀'}
              </button>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-white border-4 border-[#D4AF37] p-3 shadow-2xl flex flex-col items-center justify-center text-center transform rotate-2 hover:rotate-0 transition-transform">
              <span className="text-5xl mb-2">🎓</span>
              <span className="font-fredoka text-xs font-black text-[#996515] uppercase tracking-wide">
                Master Explorer
              </span>
              <span className="font-nunito text-[10px] font-bold text-gray-500">
                Teacher Tina Seal
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ❓ FAQ SECTION (Accordion)                                   */}
      {/* ============================================================ */}
      <section id="faq" className="w-full py-16 px-4 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="font-fredoka text-xs sm:text-sm font-black text-[#6C5CE7] bg-purple-50 px-4 py-1.5 rounded-full uppercase tracking-wider border border-purple-100">
              {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              {isAr ? 'كل ما يهم أولياء الأمور معرفته' : 'Everything Parents Need to Know'}
            </h2>
          </div>

          <div className="space-y-3">
            {TINA_CONFIG.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              const questionText = isAr ? (faq.q.ar || faq.q.en) : faq.q.en;
              const answerText = isAr ? (faq.a.ar || faq.a.en) : faq.a.en;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-start flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/70"
                  >
                    <span className="font-fredoka text-base sm:text-lg font-bold text-[#26324A]">
                      {questionText}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-[#6C5CE7] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-gray-100 font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed text-start">
                      {answerText}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ✉️ FINAL CONVERSION FUNNEL CTA (Direct Email Inquiry)        */}
      {/* ============================================================ */}
      <section className="w-full py-16 px-4 bg-gradient-to-b from-white via-purple-50 to-pink-50 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#6C5CE7] mx-auto shadow-xl bg-purple-100 ring-4 ring-purple-200/60">
            <img
              src={TINA_CONFIG.realPhotos.portrait}
              alt="Teacher Tina"
              className="w-full h-full object-cover object-[center_35%]"
            />
          </div>

          <div className="space-y-2">
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              {isAr ? 'تواصل مباشرة مع تيتشر تينا' : 'Connect Directly with Teacher Tina'}
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-bold max-w-lg mx-auto">
              {isAr
                ? 'هل ترغب في تنسيق المواعيد، حجز تقييم مستوى أولي، أو الاستفسار عن كورس التأسيس لطفلك؟ تواصل معنا مباشرة عبر البريد الإلكتروني.'
                : 'Ready to discuss lesson schedules, availability, or an introductory chat for your child? Reach out directly via email.'}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center">
            <button
              type="button"
              onClick={() => handleOpenContact()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#6C5CE7] hover:bg-[#5644D4] text-white font-fredoka font-black text-xl rounded-3xl shadow-2xl border-b-6 border-[#4A3EB5] transform hover:scale-103 transition-all cursor-pointer"
            >
              <Mail size={26} />
              <span>{isAr ? 'مراسلة تيتشر تينا عبر الإيميل' : 'Email Teacher Tina'}</span>
            </button>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs font-fredoka font-bold text-gray-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#35C98A]" />
              <span>{isAr ? 'بيئة آمنة للأطفال 100%' : '100% Child Safe Experience'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Heart size={16} className="text-pink-500 fill-pink-500" />
              <span>{isAr ? 'حصص فردية 1-on-1 فقط' : '1-on-1 Tutoring Only'}</span>
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 🦶 FOOTER                                                    */}
      {/* ============================================================ */}
      <footer className="w-full bg-[#26324A] text-white py-8 px-4 text-center">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-nunito font-bold text-gray-300">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏝️</span>
            <span>
              {isAr
                ? 'مغامرة الإنجليزية مع تيتشر تينا • كورس التأسيس الشامل (Cambridge CEFR)'
                : 'English Adventure & Teacher Tina • Foundation Course (Cambridge CEFR)'}
            </span>
          </div>

          <div className="flex items-center gap-4 font-fredoka">
            <a href="#kids-play-zone" className="text-amber-400 hover:underline">
              {isAr ? 'منطقة ألعاب الأطفال 🎮' : 'Kids Game Zone 🎮'}
            </a>
            <Link to="/certificate" className="text-purple-300 hover:underline">
              {isAr ? 'شهادة التخرج 📜' : 'Grand Certificate 📜'}
            </Link>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* 📱 TEACHER TINA CONTACT & BOOKING MODAL                      */}
      {/* ============================================================ */}
      <TeacherContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        initialMessage={contactInitialMessage}
        lang={lang}
      />
    </div>
  );
};
