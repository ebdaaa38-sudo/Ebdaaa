import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ArrowRight, Bell, Shield, Globe } from 'lucide-react';
import { ScreenName } from '../types';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = true,
  rightAction,
  onBack,
}) => {
  const { lang, setLanguage, goBack, navigateTo, notifications } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md px-4 py-3 border-b border-slate-800/80 sticky top-0 z-30 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Go Back"
          >
            <BackIcon className="w-4 h-4" />
          </button>
        )}

        <div className="flex flex-col">
          <h1 className="text-base font-bold text-slate-100 tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-slate-400 leading-tight truncate max-w-[200px] xs:max-w-[240px]">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {rightAction ? (
          rightAction
        ) : (
          <>
            {/* Quick Language Switch Icon */}
            <button
              onClick={() => setLanguage(lang === 'ar' ? 'en' : 'ar')}
              className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700 border border-slate-700/40 flex items-center justify-center text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
              {lang === 'ar' ? 'EN' : 'عر'}
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => navigateTo('notifications')}
              className="relative w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700 border border-slate-700/40 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-slate-900 animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </>
        )}
      </div>
    </header>
  );
};
