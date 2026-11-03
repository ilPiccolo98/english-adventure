import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  Mail,
  CheckCircle2,
  Award,
  Sparkles,
  Heart,
  ChevronDown,
  Gamepad2,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { TINA_CONFIG } from '../../data/teacher.config';
import { KidsArcadePlaque } from '../../components/landing/KidsArcadePlaque';

export const ParentLandingPage: React.FC = () => {
  const [lang, setLang] = useState<'it' | 'en'>('it');
  const [activePhotoKey, setActivePhotoKey] = useState<
    'welcoming' | 'standing' | 'blackboard' | 'guidance' | 'portrait'
  >('welcoming');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const navigate = useNavigate();

  const getWhatsAppLink = (customText?: string) => {
    if (!TINA_CONFIG.whatsappNumber) return '#';
    const baseText =
      customText ||
      (lang === 'it'
        ? 'Ciao Teacher Tina! Ho visto la pagina dei corsi e vorrei informazioni sulle lezioni individuali di inglese per mio figlio/a.'
        : 'Hello Teacher Tina! I saw your English courses and would like to ask about 1-on-1 private lessons for my child.');
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
      title: {
        it: 'Accoglienza e Materiali Didattici',
        en: 'Warm Welcome & Course Books',
      },
      desc: {
        it: 'Teacher Tina accoglie i bambini con entusiasmo e materiali illustrati a misura di bambino.',
        en: 'Teacher Tina welcomes young learners with vibrant illustrated books.',
      },
    },
    {
      key: 'blackboard' as const,
      src: TINA_CONFIG.realPhotos.blackboard,
      title: {
        it: 'Spiegazione Interattiva alla Lavagna',
        en: 'Interactive Blackboard Teaching',
      },
      desc: {
        it: 'Vocaboli e fonetica presentati chiaramente con supporto bilingue (Inglese / Arabo).',
        en: 'Phonics and vocabulary clearly taught with bilingual English & Arabic support.',
      },
    },
    {
      key: 'guidance' as const,
      src: TINA_CONFIG.realPhotos.guidance,
      title: {
        it: 'Guida Individuale al Tavolo',
        en: 'Personalized Table Guidance',
      },
      desc: {
        it: 'Attenzione paziente per ogni esercizio: ogni bambino è seguito passo dopo passo.',
        en: 'Gentle, patient guidance: each child is supported step-by-step.',
      },
    },
    {
      key: 'standing' as const,
      src: TINA_CONFIG.realPhotos.standing,
      title: {
        it: 'Ambiente di Classe Positivo',
        en: 'Positive Classroom Atmosphere',
      },
      desc: {
        it: 'Uno spazio sicuro, allegro e stimolante dove la paura di sbagliare scompare.',
        en: 'A safe, joyful learning space where the fear of mistakes disappears.',
      },
    },
    {
      key: 'portrait' as const,
      src: TINA_CONFIG.realPhotos.portrait,
      title: {
        it: 'Sintonia e Fiducia con i Bambini',
        en: 'Trust & Rapport with Children',
      },
      desc: {
        it: 'Un rapporto empatico e incoraggiante che trasforma l’inglese in una passione spontanea.',
        en: 'An empathetic relationship turning English into an effortless joy.',
      },
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FFFDF9] text-[#26324A] font-nunito flex flex-col selection:bg-purple-200">
      {/* ============================================================ */}
      {/* 🧭 TOP NAVBAR (Navigation, Language Switcher & Direct CTA)   */}
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
              {lang === 'it' ? 'Il Metodo' : 'Method'}
            </a>
            <a href="#courses" className="hover:text-[#6C5CE7] transition-colors">
              {lang === 'it' ? 'Corsi & Età' : 'Courses'}
            </a>
            <a href="#gallery" className="hover:text-[#6C5CE7] transition-colors">
              {lang === 'it' ? 'Foto Reali' : 'Classroom'}
            </a>
            <a href="#why-1on1" className="hover:text-[#6C5CE7] transition-colors">
              {lang === 'it' ? 'Perché 1-on-1' : 'Why 1-on-1'}
            </a>
            <a href="#certificate-info" className="hover:text-[#6C5CE7] transition-colors">
              {lang === 'it' ? 'Certificato' : 'Certificate'}
            </a>
            <a href="#faq" className="hover:text-[#6C5CE7] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right: Language Toggle & Kid Button Link */}
          <div className="flex items-center gap-2.5">
            {/* Language Toggle Button */}
            <div className="bg-gray-100 p-1 rounded-2xl flex items-center border border-gray-200">
              <button
                type="button"
                onClick={() => setLang('it')}
                className={`px-2.5 py-1 rounded-xl text-xs font-fredoka font-bold transition-all cursor-pointer ${
                  lang === 'it'
                    ? 'bg-white text-[#6C5CE7] shadow-xs'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🇮🇹 IT
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-xl text-xs font-fredoka font-bold transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white text-[#6C5CE7] shadow-xs'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🇬🇧 EN
              </button>
            </div>

            {/* Quick Play Anchor Button */}
            <a
              href="#kids-play-zone"
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 px-3.5 py-1.5 rounded-2xl font-fredoka font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Gamepad2 size={16} />
              <span className="hidden sm:inline">
                {lang === 'it' ? 'Area Bambini' : 'Kids Play'}
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 🧒 TOP ARCADE HERO PLAQUE (Central Kid Button: Free to Play) */}
      {/* ============================================================ */}
      <KidsArcadePlaque lang={lang} />

      {/* ============================================================ */}
      {/* 👨‍👩‍👧 PARENT HERO SECTION (Value Proposition & Trust)          */}
      {/* ============================================================ */}
      <section className="w-full py-12 sm:py-16 px-4 bg-gradient-to-b from-[#FFFDF9] to-[#F8F9FE] border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-[#6C5CE7] px-4 py-1.5 rounded-full text-xs sm:text-sm font-fredoka font-black uppercase tracking-wider shadow-2xs">
              <Sparkles size={16} />
              <span>
                {lang === 'it'
                  ? 'LEZIONI INDIVIDUALI 1-ON-1 & VIDEOGIOCO INTERATTIVO'
                  : 'INDIVIDUAL 1-ON-1 LESSONS & INTERACTIVE GAME'}
              </span>
            </div>

            <h1 className="font-fredoka text-3xl sm:text-5xl lg:text-6xl font-black text-[#26324A] leading-[1.15] tracking-tight">
              {lang === 'it' ? (
                <>
                  Fai innamorare tuo figlio dell'inglese con{' '}
                  <span className="text-[#6C5CE7] underline decoration-amber-400 decoration-wavy">
                    Teacher Tina
                  </span>
                </>
              ) : (
                <>
                  Help your child fall in love with English with{' '}
                  <span className="text-[#6C5CE7] underline decoration-amber-400 decoration-wavy">
                    Teacher Tina
                  </span>
                </>
              )}
            </h1>

            <p className="font-nunito text-base sm:text-lg text-gray-600 font-semibold leading-relaxed max-w-xl mx-auto lg:mx-0">
              {lang === 'it'
                ? 'Un metodo innovativo a due pilastri per bambini dai 5 ai 10 anni: pratica autonoma e divertente con il nostro videogioco arcade 2D + lezioni private 1-on-1 per sviluppare pronuncia autentica e sicurezza nel parlato.'
                : 'A joyful 2-pillar learning approach for children aged 5 to 10: autonomous practice through our 2D arcade video game + personalized 1-on-1 private lessons for real pronunciation and conversational confidence.'}
            </p>

            {/* Key Trust Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#35C98A] shrink-0" />
                <span className="font-fredoka font-bold text-xs sm:text-sm text-gray-700">
                  {lang === 'it'
                    ? '100% Attenzione Individuale (Zero gruppi)'
                    : '100% Individual Attention (No groups)'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#35C98A] shrink-0" />
                <span className="font-fredoka font-bold text-xs sm:text-sm text-gray-700">
                  {lang === 'it'
                    ? 'Insegnante Certificata di Inglese'
                    : 'Certified English Teacher'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#35C98A] shrink-0" />
                <span className="font-fredoka font-bold text-xs sm:text-sm text-gray-700">
                  {lang === 'it'
                    ? 'Supporto Fonetico Mirato (Es. P/B, V/F)'
                    : 'Phonics Care for Arabic Learners'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#35C98A] shrink-0" />
                <span className="font-fredoka font-bold text-xs sm:text-sm text-gray-700">
                  {lang === 'it'
                    ? 'Metodo Gentile Senza Pressione'
                    : 'Joyful & Gentle, Non-Punitive'}
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
                  <span>
                    {lang === 'it' ? 'Scrivi a Teacher Tina su WhatsApp' : 'Chat with Teacher Tina'}
                  </span>
                </a>
              ) : (
                <a
                  href="#courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#6C5CE7] hover:bg-[#5644D4] text-white font-fredoka font-bold text-base rounded-2xl shadow-lg border-b-4 border-[#4A3EB5] transition-all"
                >
                  <span>{lang === 'it' ? 'Scopri i Corsi e Dettagli' : 'Explore Courses'}</span>
                  <ArrowRight size={18} />
                </a>
              )}

              <button
                onClick={() => navigate('/play')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-gray-50 text-[#6C5CE7] border-2 border-purple-200 font-fredoka font-bold text-base rounded-2xl shadow-xs transition-all"
              >
                <Gamepad2 size={20} />
                <span>
                  {lang === 'it' ? 'Fai Provare il Gioco al Bambino' : 'Let Your Child Play First'}
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
                  className="w-full h-80 sm:h-96 object-cover object-top"
                />

                {/* Floating Real Proof Card */}
                <div className="p-4 bg-white/95 backdrop-blur-md border-t-2 border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="font-fredoka text-sm font-black text-[#26324A] block">
                      Teacher Tina
                    </span>
                    <span className="text-xs font-nunito font-bold text-gray-500 block">
                      {lang === 'it'
                        ? 'Docente Certificata & Esperta per Bambini'
                        : 'Certified English Teacher for Children'}
                    </span>
                  </div>
                  <span className="text-xs font-fredoka font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    {lang === 'it' ? '1-on-1 Disponibile' : '1-on-1 Ready'}
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
              {lang === 'it' ? 'Il Metodo a Doppio Pilastro' : 'The Two-Pillar Method'}
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              {lang === 'it'
                ? 'Perché unire il Videogioco alle Lezioni 1-on-1?'
                : 'Why Combine the Video Game with 1-on-1 Lessons?'}
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              {lang === 'it'
                ? 'I bambini imparano più in fretta quando si sentono protagonisti. Ecco come il gioco e le lezioni private si completano alla perfezione:'
                : 'Children learn fastest when learning feels natural and fun. Here is how our game and private tutoring work together:'}
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
                  {lang === 'it' ? '1. Il Videogioco Interattivo' : '1. The Interactive Video Game'}
                </h3>
                <p className="font-nunito text-sm text-gray-700 font-semibold leading-relaxed">
                  {lang === 'it'
                    ? 'Tuo figlio gioca in autonomia esplorando 5 mondi tematici (Vocabolario, Grammatica, Pronuncia, Lettura, Ascolto) con 150 attività vocali native in studio, vincendo stelle e il Gran Certificato finale.'
                    : 'Your child plays independently through 5 magical worlds (Vocabulary, Grammar, Pronunciation, Reading, Listening) with 150 studio-recorded English voice challenges, earning stars and the Grand Diploma.'}
                </p>
                <ul className="space-y-2 pt-2 text-xs sm:text-sm font-fredoka font-bold text-gray-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                    <span>
                      {lang === 'it'
                        ? 'Zero pressione, zero punteggi negativi'
                        : 'Non-punitive, zero fear of mistakes'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                    <span>
                      {lang === 'it'
                        ? '110 audio nativi inglesi registrati'
                        : '110 native English studio audio files'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
                    <span>
                      {lang === 'it'
                        ? '100% gratuito e senza pubblicità'
                        : '100% free with no distracting ads'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200/60">
                <button
                  onClick={() => navigate('/play')}
                  className="font-fredoka font-bold text-xs text-amber-900 bg-amber-200/80 hover:bg-amber-300 px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Gamepad2 size={16} />
                  <span>{lang === 'it' ? 'Avvia il Gioco Subito →' : 'Launch Game Now →'}</span>
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
                  {lang === 'it' ? '2. Le Lezioni Private 1-on-1' : '2. 1-on-1 Private Lessons'}
                </h3>
                <p className="font-nunito text-sm text-gray-700 font-semibold leading-relaxed">
                  {lang === 'it'
                    ? 'Con Teacher Tina in videochiamata privata, il bambino mette in pratica tutto ciò che ha visto nel gioco. Niente classi rumorose: ogni minuto è dedicato a stimolare la conversazione e la sicurezza.'
                    : 'In live private video sessions, Teacher Tina unlocks conversational speaking. No noisy classrooms: every minute is tailored to ignite confidence and spontaneous communication.'}
                </p>
                <ul className="space-y-2 pt-2 text-xs sm:text-sm font-fredoka font-bold text-gray-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#6C5CE7] shrink-0" />
                    <span>
                      {lang === 'it'
                        ? 'Il bambino parla l’80% del tempo'
                        : 'Child speaks 80% of total lesson time'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#6C5CE7] shrink-0" />
                    <span>
                      {lang === 'it'
                        ? 'Correzione fonetica gentile in tempo reale'
                        : 'Real-time gentle phonetics correction'}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#6C5CE7] shrink-0" />
                    <span>
                      {lang === 'it'
                        ? 'Piano didattico personalizzato su misura'
                        : 'Custom learning pace adapted to your child'}
                    </span>
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
                  <span>
                    {lang === 'it' ? 'Richiedi Info su WhatsApp →' : 'Inquire on WhatsApp →'}
                  </span>
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
              {lang === 'it' ? 'Programmi su Misura' : 'Customized Programs'}
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              {lang === 'it'
                ? 'I Corsi Individuali di Teacher Tina'
                : 'Teacher Tina’s 1-on-1 English Courses'}
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              {lang === 'it'
                ? 'Ogni percorso è studiato specificamente per le diverse fasi cognitive dei bambini, con enfasi su conversazione, fonetica e sicurezza.'
                : 'Every course track is carefully tailored to your child’s cognitive stage, prioritizing conversation, phonics, and genuine confidence.'}
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
                      {course.title[lang]}
                    </h3>
                    <p className="font-nunito text-xs text-gray-600 font-bold mt-1.5 leading-relaxed">
                      {course.tagline[lang]}
                    </p>
                  </div>

                  {/* Feature Checkmarks */}
                  <ul className="space-y-2 pt-2 border-t border-gray-100">
                    {course.features[lang].map((feat, idx) => (
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
                      lang === 'it'
                        ? `Ciao Teacher Tina! Vorrei informazioni sul corso "${course.title.it}" per mio figlio.`
                        : `Hello Teacher Tina! I would like details about the "${course.title.en}" course for my child.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-purple-50 hover:bg-[#6C5CE7] text-[#6C5CE7] hover:text-white font-fredoka font-bold text-xs sm:text-sm border-2 border-purple-200 hover:border-[#6C5CE7] transition-all cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>{lang === 'it' ? 'Prenota / Chiedi Info' : 'Inquire / Book'}</span>
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
              {lang === 'it' ? 'Foto Autentiche in Classe' : 'Real Classroom Photos'}
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              {lang === 'it'
                ? 'All’Interno della Classe di Teacher Tina'
                : 'Inside Teacher Tina’s Real Classroom'}
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              {lang === 'it'
                ? 'Nessuna immagine finta: ecco Teacher Tina all’opera con i suoi piccoli studenti, tra quaderni, lavagna e tanta allegria.'
                : 'No generic stock photos: see Teacher Tina in action with her young learners, engaging with textbooks, blackboard activities, and smiling faces.'}
            </p>
          </div>

          {/* Active Featured Photo Spotlight */}
          {(() => {
            const currentItem =
              realGallery.find((g) => g.key === activePhotoKey) || realGallery[0];
            return (
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-4 border-purple-200/60 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 rounded-2xl overflow-hidden shadow-lg border-3 border-white max-h-96 bg-gray-100">
                  <img
                    src={currentItem.src}
                    alt={currentItem.title[lang]}
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <div className="md:col-span-5 space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 text-xs font-fredoka font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                    <Star size={14} className="fill-amber-600" />
                    <span>{lang === 'it' ? 'Scatto dal Vivo' : 'Live Classroom'}</span>
                  </div>
                  <h3 className="font-fredoka text-2xl font-black text-[#26324A]">
                    {currentItem.title[lang]}
                  </h3>
                  <p className="font-nunito text-sm text-gray-700 font-bold leading-relaxed">
                    {currentItem.desc[lang]}
                  </p>
                  <div className="pt-2">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-fredoka font-bold text-xs sm:text-sm shadow-md"
                    >
                      <MessageCircle size={16} />
                      <span>{lang === 'it' ? 'Scrivi a Teacher Tina' : 'Message Teacher Tina'}</span>
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
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-2 bg-gray-100">
                  <img
                    src={photo.src}
                    alt={photo.title[lang]}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="font-fredoka text-xs font-bold text-[#26324A] text-center line-clamp-1">
                  {photo.title[lang]}
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
              {lang === 'it' ? 'Il Vantaggio Esclusivo' : 'The Individual Advantage'}
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              {lang === 'it'
                ? 'Perché Scegliere Solo Lezioni 1-on-1?'
                : 'Why Choose Exclusively 1-on-1 Lessons?'}
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              {lang === 'it'
                ? 'Nei primi anni di apprendimento linguistico, la sicurezza nel parlare fa tutta la differenza:'
                : 'In the formative years of language learning, speaking confidence makes all the difference:'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-gray-200 shadow-lg overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b-2 border-gray-100 text-xs sm:text-sm font-fredoka font-black">
                  <th className="py-3 px-3 text-gray-500">
                    {lang === 'it' ? 'Aspetto Didattico' : 'Feature'}
                  </th>
                  <th className="py-3 px-3 text-red-500 bg-red-50/50 rounded-t-xl text-center">
                    {lang === 'it' ? 'Corsi di Gruppo (15–20 bambini)' : 'Group Classes (15–20 kids)'}
                  </th>
                  <th className="py-3 px-3 text-[#6C5CE7] bg-purple-50 rounded-t-xl text-center">
                    {lang === 'it'
                      ? '⭐ Teacher Tina 1-on-1 Privato'
                      : '⭐ Teacher Tina 1-on-1 Private'}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm font-nunito font-bold divide-y divide-gray-100">
                <tr>
                  <td className="py-3.5 px-3 text-[#26324A]">
                    {lang === 'it' ? 'Tempo effettivo di conversazione' : 'Speaking time per child'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-red-600 bg-red-50/20">
                    {lang === 'it' ? '2–3 minuti per ora' : '2–3 minutes per hour'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-[#6C5CE7] bg-purple-50/50 font-black">
                    {lang === 'it' ? '80% della lezione (Attivo)' : '80% of entire lesson (Active)'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 text-[#26324A]">
                    {lang === 'it' ? 'Ritmo di apprendimento' : 'Learning pace'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-red-600 bg-red-50/20">
                    {lang === 'it' ? 'Rigido per tutti' : 'Rigid, one-size-fits-all'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-[#6C5CE7] bg-purple-50/50 font-black">
                    {lang === 'it'
                      ? 'Adattato al secondo sul tuo bambino'
                      : '100% personalized to your child'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 text-[#26324A]">
                    {lang === 'it' ? 'Bambini timidi o insicuri' : 'Shy or hesitant learners'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-red-600 bg-red-50/20">
                    {lang === 'it' ? 'Restano spesso in silenzio' : 'Often stay quiet and passive'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-[#6C5CE7] bg-purple-50/50 font-black">
                    {lang === 'it'
                      ? 'Rassicurati con affetto e pazienza'
                      : 'Gentle, nurturing encouragement'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 text-[#26324A]">
                    {lang === 'it' ? 'Correzione della pronuncia' : 'Phonics & Accent correction'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-red-600 bg-red-50/20">
                    {lang === 'it' ? 'Generica o assente' : 'Overlooked in crowd'}
                  </td>
                  <td className="py-3.5 px-3 text-center text-[#6C5CE7] bg-purple-50/50 font-black">
                    {lang === 'it'
                      ? 'Puntuale, immediata e divertente'
                      : 'Targeted, playful & immediate'}
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
              <span>
                {lang === 'it'
                  ? 'IL PREMIO UFFICIALE DI TEACHER TINA'
                  : 'OFFICIAL TEACHER TINA DIPLOMA'}
              </span>
            </div>

            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A] leading-tight">
              {lang === 'it'
                ? 'Come il Gran Certificato Motiva Tuo Figlio'
                : 'How the Grand Certificate Motivates Your Child'}
            </h2>

            <p className="font-nunito text-sm sm:text-base text-gray-700 font-semibold leading-relaxed">
              {lang === 'it'
                ? 'Nel videogioco, tuo figlio affronta una grande missione: completare tutti i 15 stage nei 5 mondi per sbloccare il Gran Certificato di Teacher Tina. Il diploma recita l’idoneità ufficiale per le lezioni private 1-on-1 ed è pronto per essere stampato e incorniciato in camera sua!'
                : 'In our adventure, your child embarks on a grand quest: finishing all 15 stages across the 5 magical worlds to unlock the Official Certificate of Achievement. It proudly declares eligibility for 1-on-1 private lessons with Teacher Tina and is printable in high-resolution!'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/certificate"
                className="bg-white hover:bg-gray-50 text-[#996515] border-2 border-[#D4AF37] px-5 py-2.5 rounded-2xl font-fredoka font-bold text-xs sm:text-sm shadow-xs transition-all"
              >
                {lang === 'it' ? 'Anteprima Certificato 📜' : 'Preview Certificate 📜'}
              </Link>
              <button
                onClick={() => navigate('/play')}
                className="bg-[#26324A] hover:bg-[#1A2333] text-white px-5 py-2.5 rounded-2xl font-fredoka font-bold text-xs sm:text-sm shadow-xs transition-all"
              >
                {lang === 'it' ? 'Inizia la Missione nel Gioco 🚀' : 'Start the Quest Now 🚀'}
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
              {lang === 'it' ? 'Domande Frequenti' : 'Frequently Asked Questions'}
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
              {lang === 'it' ? 'Tutto Ciò che i Genitori Chiedono' : 'What Parents Want to Know'}
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
                      {faq.q[lang]}
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
                      {faq.a[lang]}
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
              {lang === 'it'
                ? 'Parla Direttamente con Teacher Tina'
                : 'Connect Directly with Teacher Tina'}
            </h2>
            <p className="font-nunito text-sm sm:text-base text-gray-600 font-bold max-w-lg mx-auto">
              {lang === 'it'
                ? 'Vuoi conoscere le disponibilità, gli orari o organizzare un primo incontro conoscitivo per tuo figlio? Scrivici con un tocco su WhatsApp.'
                : 'Ready to discuss lesson schedules, availability, or an introductory chat for your child? Reach out with one tap on WhatsApp.'}
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
                <span>
                  {lang === 'it' ? 'Scrivimi su WhatsApp' : 'Chat on WhatsApp'}
                </span>
              </a>

              {TINA_CONFIG.email && (
                <a
                  href={`mailto:${TINA_CONFIG.email}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 bg-[#6C5CE7] hover:bg-[#5644D4] text-white font-fredoka font-bold text-lg rounded-3xl shadow-lg border-b-4 border-[#4A3EB5] transition-all"
                >
                  <Mail size={22} />
                  <span>Email</span>
                </a>
              )}
            </div>
          ) : (
            <div className="bg-amber-50 p-6 rounded-3xl border-2 border-dashed border-amber-300 max-w-md mx-auto">
              <span className="text-3xl block mb-2">📬</span>
              <h4 className="font-fredoka text-base font-bold text-[#26324A]">
                {lang === 'it' ? 'Contatti in Configurazione' : 'Contacts Coming Soon'}
              </h4>
              <p className="text-xs font-nunito font-semibold text-gray-600 mt-1">
                {lang === 'it'
                  ? 'Il numero WhatsApp e i canali diretti di Teacher Tina saranno configurati a breve.'
                  : 'Teacher Tina’s direct WhatsApp contact will be listed here soon.'}
              </p>
            </div>
          )}

          <div className="pt-4 flex items-center justify-center gap-6 text-xs font-fredoka font-bold text-gray-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#35C98A]" />
              <span>{lang === 'it' ? '100% Sicuro per Bambini' : 'Child Safe & COPPA'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Heart size={16} className="text-pink-500 fill-pink-500" />
              <span>{lang === 'it' ? 'Solo Lezioni 1-on-1' : '1-on-1 Tutoring Only'}</span>
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
              {lang === 'it' ? 'Area Gioco Bambini 🎮' : 'Kids Game Zone 🎮'}
            </a>
            <Link to="/certificate" className="text-purple-300 hover:underline">
              {lang === 'it' ? 'Gran Certificato 📜' : 'Grand Certificate 📜'}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
