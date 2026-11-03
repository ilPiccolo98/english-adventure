import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  Mail,
  CheckCircle2,
  Award,
  Sparkles,
  ChevronDown,
  Gamepad2,
  ArrowRight,
  ShieldCheck,
  Star,
  Heart,
} from 'lucide-react';
import { TINA_CONFIG } from '../../data/teacher.config';
import { KidsArcadePlaque } from '../../components/landing/KidsArcadePlaque';

export const ParentLandingPage: React.FC = () => {
  const [activePhotoKey, setActivePhotoKey] = useState<
    'welcoming' | 'standing' | 'blackboard' | 'guidance' | 'portrait'
  >('welcoming');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const navigate = useNavigate();

  const getWhatsAppLink = (customText?: string) => {
    if (!TINA_CONFIG.whatsappNumber) return '#';
    const baseText =
      customText ||
      'Hello Teacher Tina! I saw your English courses page and would like to ask about 1-on-1 private lessons for my child.';
    const text = encodeURIComponent(baseText);
    return `https://wa.me/${TINA_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`;
  };

  const isAvailable =
    TINA_CONFIG.contactStatus === 'available' &&
    (TINA_CONFIG.whatsappNumber || TINA_CONFIG.email);

  const realGallery = [
    {
      key: 'welcoming' as const,
      src: TINA_CONFIG.realPhotos.welcoming,
      title: 'Warm Welcome & Course Books',
      desc: 'Teacher Tina welcomes young learners with vibrant illustrated books and high enthusiasm.',
    },
    {
      key: 'blackboard' as const,
      src: TINA_CONFIG.realPhotos.blackboard,
      title: 'Interactive Blackboard Teaching',
      desc: 'Phonics and vocabulary clearly taught with bilingual English & Arabic visual support on the board.',
    },
    {
      key: 'guidance' as const,
      src: TINA_CONFIG.realPhotos.guidance,
      title: 'Personalized Table Guidance',
      desc: 'Gentle, patient guidance: each child is supported step-by-step through their workbook.',
    },
    {
      key: 'standing' as const,
      src: TINA_CONFIG.realPhotos.standing,
      title: 'Positive Classroom Atmosphere',
      desc: 'A safe, joyful learning environment where the fear of making mistakes disappears.',
    },
    {
      key: 'portrait' as const,
      src: TINA_CONFIG.realPhotos.portrait,
      title: 'Trust & Rapport with Children',
      desc: 'A warm, empathetic mentor turning English into an effortless, lifelong passion.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FFFDF9] text-[#26324A] font-nunito flex flex-col selection:bg-purple-200">
      {/* ============================================================ */}
      {/* 🧭 TOP NAVBAR (Navigation & Direct Actions)                 */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C5CE7] to-[#8C7AE6] flex items-center justify-center text-white text-xl shadow-md border-2 border-white group-hover:scale-105 transition-transform">
              🏝️
            </div>
            <div className="flex flex-col text-left">
              <span className="font-fredoka font-black text-lg sm:text-xl text-[#26324A] leading-tight">
                English Adventure
              </span>
              <span className="font-fredoka text-[11px] font-bold text-[#6C5CE7] tracking-wider uppercase">
                with Teacher Tina
              </span>
            </div>
          </Link>

          {/* Center Quick Jump Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 font-fredoka text-sm font-bold text-gray-600">
            <a href="#method" className="hover:text-[#6C5CE7] transition-colors">
              The Method
            </a>
            <a href="#courses" className="hover:text-[#6C5CE7] transition-colors">
              Courses & Ages
            </a>
            <a href="#gallery" className="hover:text-[#6C5CE7] transition-colors">
              Classroom Photos
            </a>
            <a href="#why-1on1" className="hover:text-[#6C5CE7] transition-colors">
              Why 1-on-1?
            </a>
            <a href="#certificate-info" className="hover:text-[#6C5CE7] transition-colors">
              Grand Certificate
            </a>
            <a href="#faq" className="hover:text-[#6C5CE7] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right: Quick Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Quick Play Anchor Button */}
            <a
              href="#kids-play-zone"
              className="bg-amber-100 hover:bg-amber-200 text-amber-950 border-2 border-amber-300 px-3.5 py-1.5 rounded-2xl font-fredoka font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Gamepad2 size={16} />
              <span>Kids Play Zone</span>
            </a>

            {isAvailable && (
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3.5 py-1.5 rounded-2xl font-fredoka font-bold text-xs shadow-xs transition-all"
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 🧒 TOP ARCADE HERO PLAQUE (Central Kid Button: Free to Play) */}
      {/* ============================================================ */}
      <KidsArcadePlaque />

      {/* ============================================================ */}
      {/* 👨‍👩‍👧 PARENT HERO SECTION (Value Proposition & Trust)          */}
      {/* ============================================================ */}
      <section className="w-full py-12 sm:py-16 px-4 bg-gradient-to-b from-[#FFFDF9] to-[#F8F9FE] border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-[#6C5CE7] px-4 py-1.5 rounded-full text-xs sm:text-sm font-fredoka font-black uppercase tracking-wider shadow-2xs">
              <Sparkles size={16} />
              <span>INDIVIDUAL 1-ON-1 LESSONS & INTERACTIVE GAME</span>
            </div>

            <h1 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-black text-[#26324A] leading-[1.15] tracking-tight">
              Help Your Child Fall in Love with English with{' '}
              <span className="text-[#6C5CE7] underline decoration-amber-400 decoration-wavy">
                Teacher Tina
              </span>
            </h1>

            <p className="font-nunito text-base sm:text-lg text-gray-600 font-semibold leading-relaxed max-w-xl mx-auto lg:mx-0">
              A proven, joyful 2-pillar learning approach for children aged 5 to 10: autonomous practice through our 2D arcade video game + personalized 1-on-1 private lessons for authentic pronunciation and conversational confidence.
            </p>

            {/* Key Trust Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#35C98A] shrink-0" />
                <span className="font-fredoka font-bold text-xs sm:text-sm text-gray-700">
                  100% Individual Attention (No Crowded Groups)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#35C98A] shrink-0" />
                <span className="font-fredoka font-bold text-xs sm:text-sm text-gray-700">
                  Certified English Teacher for Children
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#35C98A] shrink-0" />
                <span className="font-fredoka font-bold text-xs sm:text-sm text-gray-700">
                  Specialized Phonics Care (e.g. P/B, V/F)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#35C98A] shrink-0" />
                <span className="font-fredoka font-bold text-xs sm:text-sm text-gray-700">
                  Joyful, Gentle & Non-Punitive Approach
                </span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {isAvailable ? (
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-fredoka font-black text-lg rounded-2xl shadow-xl border-b-4 border-[#1AA851] transform hover:scale-102 transition-all cursor-pointer"
                >
                  <MessageCircle size={24} />
                  <span>Chat with Teacher Tina on WhatsApp</span>
                </a>
              ) : (
                <a
                  href="#courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#6C5CE7] hover:bg-[#5644D4] text-white font-fredoka font-bold text-base rounded-2xl shadow-lg border-b-4 border-[#4A3EB5] transition-all"
                >
                  <span>Explore Courses & Details</span>
                  <ArrowRight size={18} />
                </a>
              )}

              <button
                onClick={() => navigate('/play')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-gray-50 text-[#6C5CE7] border-2 border-purple-200 font-fredoka font-bold text-base rounded-2xl shadow-xs transition-all"
              >
                <Gamepad2 size={20} />
                <span>Let Your Child Play First</span>
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
                      Teacher Tina
                    </span>
                    <span className="text-xs font-nunito font-bold text-gray-500 block">
                      Certified English Teacher for Children
                    </span>
                  </div>
                  <span className="text-xs font-fredoka font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    1-on-1 Lessons Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 🏛️ THE 2-PILLAR SYSTEM (Game + Private Lessons Synergy)      */}
      {/* ============================================================ */}
      <section id="method" className="w-full py-16 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-fredoka text-xs sm:text-sm font-black text-[#6C5CE7] bg-purple-50 px-4 py-1.5 rounded-full uppercase tracking-wider border border-purple-100">
              The Two-Pillar Method
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              Why Combine the Video Game with 1-on-1 Lessons?
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              Children learn fastest when learning feels natural, playful, and empowering. Here is how autonomous gaming and private tutoring work hand-in-hand:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1: The Video Game */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-6 sm:p-8 rounded-3xl border-3 border-amber-200 shadow-md relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-3xl shadow-sm border-2 border-white">
                  🎮
                </div>
                <h3 className="font-fredoka text-2xl font-black text-[#26324A]">
                  1. The Interactive Video Game
                </h3>
                <p className="font-nunito text-sm text-gray-700 font-semibold leading-relaxed">
                  Your child explores 5 magical worlds (Vocabulary, Grammar, Pronunciation, Reading, Listening) with 150 studio-recorded English voice activities, collecting stars and aiming for the Grand Diploma.
                </p>
                <ul className="space-y-2 pt-2 text-xs sm:text-sm font-fredoka font-bold text-gray-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                    <span>Zero pressure, non-punitive feedback</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                    <span>110 native studio English voice files</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                    <span>100% free with no distracting ads</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200/60">
                <button
                  onClick={() => navigate('/play')}
                  className="font-fredoka font-bold text-xs text-amber-900 bg-amber-200/80 hover:bg-amber-300 px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Gamepad2 size={16} />
                  <span>Launch Game Now →</span>
                </button>
              </div>
            </div>

            {/* Pillar 2: 1-on-1 Lessons */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50/50 p-6 sm:p-8 rounded-3xl border-3 border-purple-200 shadow-md relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#6C5CE7] text-white flex items-center justify-center text-3xl shadow-sm border-2 border-white">
                  👩‍🏫
                </div>
                <h3 className="font-fredoka text-2xl font-black text-[#26324A]">
                  2. 1-on-1 Private Lessons
                </h3>
                <p className="font-nunito text-sm text-gray-700 font-semibold leading-relaxed">
                  In private live video calls with Teacher Tina, your child activates everything learned in the game into natural, spoken communication. Every minute is tailored to their personality, eliminating shyness and hesitation.
                </p>
                <ul className="space-y-2 pt-2 text-xs sm:text-sm font-fredoka font-bold text-gray-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#6C5CE7] shrink-0" />
                    <span>Child speaks 80% of total lesson time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#6C5CE7] shrink-0" />
                    <span>Immediate, gentle pronunciation correction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#6C5CE7] shrink-0" />
                    <span>Personalized pace tailored to your child</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-200/60">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-fredoka font-bold text-xs text-purple-900 bg-purple-200/80 hover:bg-purple-300 px-4 py-2 rounded-xl transition-all inline-flex items-center gap-1.5"
                >
                  <MessageCircle size={16} />
                  <span>Inquire on WhatsApp →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 📚 COURSE TRACKS & AGES                                      */}
      {/* ============================================================ */}
      <section id="courses" className="w-full py-16 px-4 bg-[#F8F9FE] border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-fredoka text-xs sm:text-sm font-black text-amber-900 bg-amber-100 px-4 py-1.5 rounded-full uppercase tracking-wider border border-amber-200">
              Customized Programs
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              Teacher Tina’s 1-on-1 English Courses
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              Each learning track is specifically designed for your child’s cognitive developmental stage, prioritizing active speaking, phonics, and genuine confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TINA_CONFIG.courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-gray-100 hover:border-[#6C5CE7]/40 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Badge & Age */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{course.icon}</span>
                    <span className="font-fredoka text-xs font-black bg-purple-50 text-[#6C5CE7] px-3 py-1 rounded-full border border-purple-100">
                      {course.ageRange}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-fredoka font-black uppercase text-amber-600 tracking-wider">
                      {course.badge}
                    </span>
                    <h3 className="font-fredoka text-xl font-black text-[#26324A] mt-1 leading-snug">
                      {course.title.en}
                    </h3>
                    <p className="font-nunito text-xs text-gray-600 font-bold mt-1.5 leading-relaxed">
                      {course.tagline.en}
                    </p>
                  </div>

                  {/* Feature Checkmarks */}
                  <ul className="space-y-2 pt-2 border-t border-gray-100">
                    {course.features.en.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-bold text-gray-700">
                        <CheckCircle2 size={15} className="text-[#35C98A] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Course CTA */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a
                    href={getWhatsAppLink(
                      `Hello Teacher Tina! I would like details about the "${course.title.en}" course for my child.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-purple-50 hover:bg-[#6C5CE7] text-[#6C5CE7] hover:text-white font-fredoka font-bold text-xs sm:text-sm border-2 border-purple-200 hover:border-[#6C5CE7] transition-all cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>Inquire / Book on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 📸 AUTHENTIC CLASSROOM GALLERY (Real Photos of Teacher Tina) */}
      {/* ============================================================ */}
      <section id="gallery" className="w-full py-16 px-4 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-fredoka text-xs sm:text-sm font-black text-[#6C5CE7] bg-purple-50 px-4 py-1.5 rounded-full uppercase tracking-wider border border-purple-100">
              Real Classroom Moments
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              Inside Teacher Tina’s Real Classroom
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              No generic stock photos: see Teacher Tina in action with her young learners, engaging with textbooks, interactive blackboard activities, and smiling faces.
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
                <div className="md:col-span-7 space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 text-xs font-fredoka font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                    <Star size={14} className="fill-amber-600" />
                    <span>Real Classroom Snapshot</span>
                  </div>
                  <h3 className="font-fredoka text-2xl sm:text-3xl font-black text-[#26324A]">
                    {currentItem.title}
                  </h3>
                  <p className="font-nunito text-base text-gray-700 font-bold leading-relaxed max-w-lg">
                    {currentItem.desc}
                  </p>
                  <div className="pt-2">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-fredoka font-bold text-sm shadow-md transition-all"
                    >
                      <MessageCircle size={18} />
                      <span>Message Teacher Tina</span>
                    </a>
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
                className={`p-2 rounded-2xl border-3 text-left transition-all cursor-pointer flex flex-col items-center ${
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
      <section id="why-1on1" className="w-full py-16 px-4 bg-[#F8F9FE] border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-fredoka text-xs sm:text-sm font-black text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full uppercase tracking-wider border border-emerald-200">
              The Individual Advantage
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              Why Choose Exclusively 1-on-1 Lessons?
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              In the crucial early years of language acquisition, active speaking practice makes all the difference:
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-gray-200 shadow-lg overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b-2 border-gray-100 text-xs sm:text-sm font-fredoka font-black">
                  <th className="py-3 px-3 text-gray-500">
                    Teaching Feature
                  </th>
                  <th className="py-3 px-3 text-red-500 bg-red-50/50 rounded-t-xl text-center">
                    Group Classes (15–20 kids)
                  </th>
                  <th className="py-3 px-3 text-[#6C5CE7] bg-purple-50 rounded-t-xl text-center">
                    ⭐ Teacher Tina 1-on-1 Private
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm font-nunito font-bold divide-y divide-gray-100">
                <tr>
                  <td className="py-3.5 px-3 text-[#26324A]">
                    Speaking time per child
                  </td>
                  <td className="py-3.5 px-3 text-center text-red-600 bg-red-50/20">
                    2–3 minutes per hour
                  </td>
                  <td className="py-3.5 px-3 text-center text-[#6C5CE7] bg-purple-50/50 font-black">
                    80% of entire lesson (Active speaking)
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 text-[#26324A]">
                    Learning pace
                  </td>
                  <td className="py-3.5 px-3 text-center text-red-600 bg-red-50/20">
                    Rigid, one-size-fits-all
                  </td>
                  <td className="py-3.5 px-3 text-center text-[#6C5CE7] bg-purple-50/50 font-black">
                    100% personalized to your child’s speed
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 text-[#26324A]">
                    Shy or hesitant learners
                  </td>
                  <td className="py-3.5 px-3 text-center text-red-600 bg-red-50/20">
                    Often stay quiet and passive
                  </td>
                  <td className="py-3.5 px-3 text-center text-[#6C5CE7] bg-purple-50/50 font-black">
                    Nurtured with patience, warmth & praise
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 text-[#26324A]">
                    Phonics & Accent correction
                  </td>
                  <td className="py-3.5 px-3 text-center text-red-600 bg-red-50/20">
                    Overlooked in the crowd
                  </td>
                  <td className="py-3.5 px-3 text-center text-[#6C5CE7] bg-purple-50/50 font-black">
                    Targeted, playful & immediate
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
        className="w-full py-16 px-4 bg-white border-b border-gray-100"
      >
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#FFF5DC] via-[#FFF9E6] to-[#FFE8B2] p-8 sm:p-12 rounded-3xl border-4 border-[#D4AF37] shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-white px-3.5 py-1 rounded-full text-xs font-fredoka font-black uppercase tracking-wider shadow-xs">
              <Award size={16} />
              <span>OFFICIAL TEACHER TINA DIPLOMA</span>
            </div>

            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A] leading-tight">
              How the Grand Certificate Motivates Your Child
            </h2>

            <p className="font-nunito text-sm sm:text-base text-gray-700 font-semibold leading-relaxed">
              In our adventure, your child embarks on a grand quest: finishing all 15 stages across the 5 magical worlds to unlock the Official Certificate of Achievement. It proudly declares eligibility for 1-on-1 private lessons with Teacher Tina and is printable in high-resolution to frame on their bedroom wall!
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/certificate"
                className="bg-white hover:bg-gray-50 text-[#996515] border-2 border-[#D4AF37] px-5 py-2.5 rounded-2xl font-fredoka font-bold text-xs sm:text-sm shadow-xs transition-all"
              >
                Preview Certificate 📜
              </Link>
              <button
                onClick={() => navigate('/play')}
                className="bg-[#26324A] hover:bg-[#1A2333] text-white px-5 py-2.5 rounded-2xl font-fredoka font-bold text-xs sm:text-sm shadow-xs transition-all"
              >
                Start the Quest Now 🚀
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
      <section id="faq" className="w-full py-16 px-4 bg-[#F8F9FE] border-b border-gray-100">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="font-fredoka text-xs sm:text-sm font-black text-[#6C5CE7] bg-purple-50 px-4 py-1.5 rounded-full uppercase tracking-wider border border-purple-100">
              Frequently Asked Questions
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              Everything Parents Need to Know
            </h2>
          </div>

          <div className="space-y-3">
            {TINA_CONFIG.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/70"
                  >
                    <span className="font-fredoka text-base sm:text-lg font-bold text-[#26324A]">
                      {faq.q.en}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-[#6C5CE7] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-gray-100 font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
                      {faq.a.en}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 💬 FINAL CONVERSION FUNNEL CTA (WhatsApp Direct Booking)     */}
      {/* ============================================================ */}
      <section className="w-full py-16 px-4 bg-gradient-to-b from-white via-purple-50 to-pink-50 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#6C5CE7] mx-auto shadow-xl bg-purple-100">
            <img
              src={TINA_CONFIG.realPhotos.portrait}
              alt="Teacher Tina"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="space-y-2">
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              Connect Directly with Teacher Tina
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-bold max-w-lg mx-auto">
              Ready to discuss lesson schedules, availability, or an introductory chat for your child? Reach out with one tap on WhatsApp.
            </p>
          </div>

          {isAvailable ? (
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-fredoka font-black text-xl rounded-3xl shadow-2xl border-b-6 border-[#1AA851] transform hover:scale-103 transition-all cursor-pointer"
              >
                <MessageCircle size={28} />
                <span>Chat on WhatsApp</span>
              </a>

              {TINA_CONFIG.email && (
                <a
                  href={`mailto:${TINA_CONFIG.email}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 bg-[#6C5CE7] hover:bg-[#5644D4] text-white font-fredoka font-bold text-lg rounded-3xl shadow-lg border-b-4 border-[#4A3EB5] transition-all"
                >
                  <Mail size={22} />
                  <span>Email Teacher Tina</span>
                </a>
              )}
            </div>
          ) : (
            <div className="bg-amber-50 p-6 rounded-3xl border-2 border-dashed border-amber-300 max-w-md mx-auto">
              <span className="text-3xl block mb-2">📬</span>
              <h4 className="font-fredoka text-base font-bold text-[#26324A]">
                Contacts Coming Soon
              </h4>
              <p className="text-xs font-nunito font-semibold text-gray-600 mt-1">
                Teacher Tina’s direct WhatsApp contact will be listed here soon.
              </p>
            </div>
          )}

          <div className="pt-4 flex items-center justify-center gap-6 text-xs font-fredoka font-bold text-gray-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#35C98A]" />
              <span>100% Child Safe Experience</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Heart size={16} className="text-pink-500 fill-pink-500" />
              <span>1-on-1 Tutoring Only</span>
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
            <span>English Adventure & Teacher Tina • 1-on-1 Tutoring</span>
          </div>

          <div className="flex items-center gap-4 font-fredoka">
            <a href="#kids-play-zone" className="text-amber-400 hover:underline">
              Kids Game Zone 🎮
            </a>
            <Link to="/certificate" className="text-purple-300 hover:underline">
              Grand Certificate 📜
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
