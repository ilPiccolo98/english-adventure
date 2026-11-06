import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TINA_CONFIG } from '../../data/teacher.config';
import { TeacherTinaPortrait } from '../../components/game/TeacherTinaPortrait';
import {
  ArrowLeft,
  Mail,
  CheckCircle2,
  Star,
  Sparkles,
  BookOpen,
  Image as ImageIcon,
} from 'lucide-react';

export const TeacherPage: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<
    'book' | 'welcome' | 'lesson' | 'reading' | 'thumbsUp'
  >('book');

  const email = TINA_CONFIG.email || 'easyeng111111@gmail.com';
  const getEmailLink = () => {
    const subject = encodeURIComponent('Inquiry: 1-on-1 English Lessons with Teacher Tina');
    const body = encodeURIComponent(
      'Hello Teacher Tina! I saw English Adventure and would like to ask about individual lessons for my child.'
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const galleryItems = [
    {
      id: 'book' as const,
      title: 'English Adventure Course',
      subtitle: 'Structured, child-friendly curriculum',
      src: TINA_CONFIG.photos.book,
    },
    {
      id: 'thumbsUp' as const,
      title: 'Positive Encouragement',
      subtitle: 'Celebrating every correct answer with a smile',
      src: TINA_CONFIG.photos.thumbsUp,
    },
    {
      id: 'welcome' as const,
      title: 'Warm Classroom Welcome',
      subtitle: 'Safe, encouraging learning space',
      src: TINA_CONFIG.photos.welcome,
    },
    {
      id: 'lesson' as const,
      title: 'Interactive Board Lessons',
      subtitle: 'Visual phonics, animals & vocabulary',
      src: TINA_CONFIG.photos.lesson,
    },
    {
      id: 'reading' as const,
      title: 'Proven Milestone Success',
      subtitle: 'Celebrating 3+ years of happy young learners',
      src: TINA_CONFIG.photos.reading,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF9F0] via-white to-[#FDF4F5] py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Navigation Back */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/map"
            className="inline-flex items-center gap-1.5 font-fredoka font-bold text-sm text-[#6C5CE7] hover:underline bg-white px-4 py-2 rounded-2xl border-2 border-purple-100 shadow-xs"
          >
            <ArrowLeft size={18} />
            <span>Back to Adventure Map</span>
          </Link>
          <span className="font-fredoka text-xs font-bold text-[#FF7285] bg-pink-50 px-3 py-1.5 rounded-full border border-pink-200">
            Information for Parents
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-pink-200 shadow-xl space-y-8">
          {/* Header Profile with Teacher Tina Photo */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left pb-6 border-b border-gray-100">
            <TeacherTinaPortrait
              photo={activePhoto}
              variant="card"
              size="sm"
              altText="Teacher Tina"
              className="shrink-0"
            />

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-purple-50 text-[#6C5CE7] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} /> {TINA_CONFIG.role}
              </div>
              <h1 className="font-fredoka text-3xl sm:text-4xl font-black text-[#26324A]">
                {TINA_CONFIG.title}
              </h1>
              <p className="font-fredoka text-lg text-[#FF7285] font-bold">
                {TINA_CONFIG.tagline}
              </p>
              <p className="font-nunito text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
                {TINA_CONFIG.methodologyDescription}
              </p>
            </div>
          </div>

          {/* Classroom Photo Gallery Showcase */}
          <div>
            <h3 className="font-fredoka text-xl font-bold text-[#26324A] mb-3 flex items-center gap-2">
              <ImageIcon size={20} className="text-[#6C5CE7]" />
              <span>Inside Teacher Tina's Learning Environment</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {galleryItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePhoto(item.id)}
                  className={`p-2 rounded-2xl border-3 transition-all cursor-pointer text-left flex flex-col items-center ${
                    activePhoto === item.id
                      ? 'border-[#6C5CE7] bg-purple-50 ring-2 ring-purple-200 shadow-md scale-102'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-1.5 bg-gray-100">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="font-fredoka text-xs font-bold text-[#26324A] text-center line-clamp-1">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Individual Lessons Only Notice */}
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 p-5 rounded-2xl border-2 border-purple-200 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-2xl shrink-0">
              🎯
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-fredoka text-lg font-bold text-[#26324A]">
                {TINA_CONFIG.lessonFormat}
              </h3>
              <p className="font-nunito text-xs sm:text-sm text-gray-700 font-semibold mt-0.5">
                Teacher Tina focuses exclusively on individual 1-on-1 tutoring. No crowded groups or rushed schedules. Your child receives 100% personalized attention at their own comfortable learning pace.
              </p>
            </div>
          </div>

          {/* Key Benefits Checklist */}
          <div>
            <h3 className="font-fredoka text-xl font-bold text-[#26324A] mb-3 flex items-center gap-2">
              <Star size={20} className="fill-[#FFB547] stroke-[#FFB547]" />
              <span>Why Learn with Teacher Tina?</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TINA_CONFIG.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-2xl bg-gray-50 border border-gray-100"
                >
                  <CheckCircle2 size={18} className="text-[#35C98A] shrink-0 mt-0.5" />
                  <span className="font-nunito text-sm font-bold text-[#26324A]">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* "Your Learning Journey" Section */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="font-fredoka text-xl font-bold text-[#26324A] mb-2 flex items-center gap-2">
              <BookOpen size={20} className="text-[#6C5CE7]" />
              <span>Your Child's Learning Journey</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-nunito mb-4">
              Here are the five core language competencies your child trains in English Adventure and refines during 1-on-1 lessons:
            </p>

            <div className="space-y-3">
              {TINA_CONFIG.learningJourney.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border-2 border-gray-200 flex items-center gap-3.5 shadow-2xs"
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="font-fredoka font-bold text-sm sm:text-base text-[#26324A]">
                      {item.skill}
                    </h4>
                    <p className="font-nunito text-xs text-gray-600 font-semibold">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Booking Section */}
          <div className="pt-6 border-t border-gray-100 text-center">
            <div className="max-w-md mx-auto space-y-3">
              <a
                href={getEmailLink()}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#6C5CE7] hover:bg-[#5644D4] text-white font-fredoka font-bold text-lg rounded-2xl shadow-lg border-b-4 border-[#4A3EB5] transition-all cursor-pointer"
              >
                <Mail size={22} />
                <span>Email Teacher Tina ({email})</span>
              </a>
              <p className="text-xs font-nunito font-semibold text-gray-500">
                Direct email inquiries for 1-on-1 private lesson schedules & Cambridge CEFR curriculum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
