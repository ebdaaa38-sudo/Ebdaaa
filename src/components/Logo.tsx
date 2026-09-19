import React from 'react';
import { useApp } from '../context/AppContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = true, light = false }) => {
  const { lang } = useApp();

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className="flex items-center gap-3">
      {/* Brand Icon Badge */}
      <div
        className={`relative ${iconSizes[size]} rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center shrink-0`}
      >
        <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-amber-500/10 pointer-events-none" />

          {/* Dynamic Modern Exchange Insignia */}
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4/5 h-4/5 transform group-hover:scale-105 transition-transform"
          >
            {/* Geometric diamond star base */}
            <path
              d="M16 3L20 12L29 16L20 20L16 29L12 20L3 16L12 12L16 3Z"
              fill="url(#goldGradient)"
              opacity="0.25"
            />
            {/* Top Right Transfer Arrow */}
            <path
              d="M10 13H21M21 13L17 9M21 13L17 17"
              stroke="url(#emeraldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Bottom Left Exchange Arrow */}
            <path
              d="M22 19H11M11 19L15 23M11 19L15 15"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Core Golden Emblem */}
            <circle cx="16" cy="16" r="2.5" fill="#F59E0B" />

            <defs>
              <linearGradient id="emeraldGradient" x1="10" y1="9" x2="21" y2="17" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10B981" />
                <stop offset="1" stopColor="#34D399" />
              </linearGradient>
              <linearGradient id="goldGradient" x1="11" y1="15" x2="22" y2="23" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F59E0B" />
                <stop offset="1" stopColor="#FBBF24" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-black tracking-tight ${titleSizes[size]} ${
              light ? 'text-white' : 'text-slate-100'
            }`}
          >
            {lang === 'ar' ? 'صرافة إبداع' : 'EbdAaa Exchange'}
          </span>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            {lang === 'ar' ? 'EbdAaa' : 'إبداع'}
          </span>
        </div>

        {showTagline && (
          <span className="text-[11px] font-medium tracking-wide text-slate-400">
            {lang === 'ar' ? 'ثقة • سرعة • أمان' : 'Trust • Speed • Security'}
          </span>
        )}
      </div>
    </div>
  );
};
