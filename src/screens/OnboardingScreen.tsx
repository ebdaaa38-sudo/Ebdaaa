import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, TrendingUp, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { Logo } from '../components/Logo';

export const OnboardingScreen: React.FC = () => {
  const { lang, navigateTo, t } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: t('onboarding.title1'),
      desc: t('onboarding.desc1'),
      icon: Send,
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400',
    },
    {
      title: t('onboarding.title2'),
      desc: t('onboarding.desc2'),
      icon: TrendingUp,
      gradient: 'from-amber-500/20 to-yellow-500/20',
      iconColor: 'text-amber-400',
    },
    {
      title: t('onboarding.title3'),
      desc: t('onboarding.desc3'),
      icon: ShieldCheck,
      gradient: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-400',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      navigateTo('login');
    }
  };

  const handleSkip = () => {
    navigateTo('login');
  };

  const NextIcon = lang === 'ar' ? ArrowLeft : ArrowRight;
  const ActiveIcon = slides[currentSlide].icon;

  return (
    <div className="flex-1 w-full flex flex-col justify-between p-6 bg-slate-950 text-slate-100 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <Logo size="sm" showTagline={false} />
        <button
          onClick={handleSkip}
          className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
        >
          {t('onboarding.skip')}
        </button>
      </div>

      {/* Main Slide Content */}
      <div className="flex flex-col items-center text-center my-auto py-6">
        <div
          className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${slides[currentSlide].gradient} border border-slate-700/50 flex items-center justify-center mb-8 shadow-2xl relative`}
        >
          <div className="absolute inset-0 rounded-3xl bg-slate-900/60 backdrop-blur-xs" />
          <ActiveIcon className={`w-12 h-12 relative z-10 ${slides[currentSlide].iconColor}`} />
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3 max-w-xs leading-snug">
          {slides[currentSlide].title}
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed px-4">
          {slides[currentSlide].desc}
        </p>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Action Controls */}
      <div className="space-y-3 pb-4">
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>
            {currentSlide === slides.length - 1 ? t('onboarding.getStarted') : t('onboarding.next')}
          </span>
          <NextIcon className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigateTo('login')}
          className="w-full py-2.5 text-center text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
        >
          {t('onboarding.login')}
        </button>
      </div>
    </div>
  );
};
