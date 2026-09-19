import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { lang, navigateTo, t } = useApp();

  // Auto transition after 3.2 seconds if user doesn't click
  useEffect(() => {
    const timer = setTimeout(() => {
      navigateTo('onboarding');
    }, 3200);
    return () => clearTimeout(timer);
  }, [navigateTo]);

  const NextIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-between p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden text-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Regulatory Badge */}
      <div className="w-full flex items-center justify-center pt-6">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t('app.licensed')}</span>
        </div>
      </div>

      {/* Center Brand Identity */}
      <div className="flex flex-col items-center justify-center space-y-6 my-auto">
        <div className="animate-bounce">
          <Logo size="xl" showTagline={false} />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {lang === 'ar' ? 'صرافة إبداع' : 'EbdAaa Exchange'}
          </h1>
          <p className="text-emerald-400 font-bold text-sm sm:text-base tracking-widest uppercase">
            {t('app.tagline')}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs text-slate-400 font-medium tracking-wide">
            {lang === 'ar' ? 'جاري التحميل بأمان...' : 'Securing connection...'}
          </span>
        </div>
      </div>

      {/* Footer / Manual Next button */}
      <div className="w-full pb-6 space-y-4">
        <button
          onClick={() => navigateTo('onboarding')}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>{lang === 'ar' ? 'ابدأ الاستخدام' : 'Get Started'}</span>
          <NextIcon className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-slate-500 font-medium">
          {t('app.version')}
        </p>
      </div>
    </div>
  );
};
