import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wifi,
  Smartphone,
  Maximize2,
  Minimize2,
  Globe,
  ShieldCheck,
  Circle,
  Square,
  Triangle,
} from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  const {
    lang,
    setLanguage,
    currentScreen,
    navigateTo,
    goBack,
    isAdmin,
    previewDevice,
    setPreviewDevice,
    quickToast,
  } = useApp();

  const [currentTime, setCurrentTime] = useState<string>('');
  const [batteryLevel] = useState<number>(89);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const toggleLang = () => {
    setLanguage(lang === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start sm:py-4 px-0 sm:px-4 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Controller Bar: Device Frame Toggle, Language Switcher, Admin Shortcut */}
      <header className="w-full max-w-lg mb-2 sm:mb-3 px-3 py-2 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800/80 flex items-center justify-between text-xs shadow-xl z-50">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Android OS 15</span>
          </div>

          <button
            onClick={() => setPreviewDevice(previewDevice === 'phone' ? 'full' : 'phone')}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title={previewDevice === 'phone' ? 'Fullscreen Mobile' : 'Phone Frame'}
          >
            {previewDevice === 'phone' ? (
              <>
                <Maximize2 className="w-3 h-3" />
                <span className="text-[11px]">Full</span>
              </>
            ) : (
              <>
                <Minimize2 className="w-3 h-3" />
                <span className="text-[11px]">Frame</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Language Switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-medium transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}</span>
          </button>

          {/* Admin Dashboard Quick Access */}
          <button
            onClick={() => navigateTo('admin')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              currentScreen === 'admin'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{lang === 'ar' ? 'لوحة الإدارة' : 'Admin'}</span>
          </button>
        </div>
      </header>

      {/* Android Device Shell Container */}
      <main
        className={`w-full relative transition-all duration-300 flex flex-col ${
          previewDevice === 'phone'
            ? 'max-w-[430px] h-[92vh] sm:h-[880px] rounded-[42px] border-[8px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-slate-700/50 overflow-hidden bg-slate-900'
            : 'max-w-xl min-h-[95vh] rounded-none sm:rounded-2xl border-0 sm:border sm:border-slate-800 overflow-hidden bg-slate-900 shadow-2xl'
        }`}
      >
        {/* Android Status Bar */}
        <div className="w-full h-8 bg-slate-950 text-slate-300 px-5 flex items-center justify-between text-[11px] font-semibold tracking-wider select-none shrink-0 z-40 border-b border-slate-800/40">
          {/* Time */}
          <div className="flex items-center gap-1">
            <span>{currentTime || '12:00'}</span>
          </div>

          {/* Android Center Camera Punch-hole */}
          <div className="w-3.5 h-3.5 rounded-full bg-slate-950 ring-2 ring-slate-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          </div>

          {/* Status Icons: 5G, Wifi, Battery */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-emerald-400 font-bold">5G</span>
            <Wifi className="w-3 h-3 text-slate-300" />
            {/* Battery Indicator */}
            <div className="flex items-center gap-1">
              <div className="w-5 h-2.5 rounded-[3px] border border-slate-400 p-0.5 flex items-center">
                <div
                  className="h-full bg-emerald-400 rounded-[1px]"
                  style={{ width: `${batteryLevel}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400">{batteryLevel}%</span>
            </div>
          </div>
        </div>

        {/* Screen Viewport Content Area */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col bg-slate-950">
          {children}
        </div>

        {/* Android System Navigation Bar at the Bottom */}
        <div className="w-full h-8 bg-slate-950 flex items-center justify-center shrink-0 z-40 border-t border-slate-800/50">
          {previewDevice === 'phone' ? (
            /* Modern Android Gesture Bar */
            <div
              onClick={() => goBack()}
              className="w-32 h-1 bg-slate-600 hover:bg-slate-400 rounded-full cursor-pointer transition-colors"
              title="Android Gesture Pill (Click to Go Back)"
            />
          ) : (
            /* Traditional 3-Button Navigation on Full view */
            <div className="w-full px-12 flex items-center justify-between text-slate-500">
              <button
                onClick={() => goBack()}
                className="p-1 hover:text-slate-300 cursor-pointer"
                title="Back"
              >
                <Triangle className="w-3.5 h-3.5 rotate-[-90deg] fill-current" />
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="p-1 hover:text-slate-300 cursor-pointer"
                title="Home"
              >
                <Circle className="w-3.5 h-3.5 fill-current" />
              </button>
              <button
                onClick={() => navigateTo('history')}
                className="p-1 hover:text-slate-300 cursor-pointer"
                title="Recent Apps"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          )}
        </div>

        {/* Toast Notification Alert */}
        {quickToast && (
          <div className="absolute top-12 left-4 right-4 z-50 animate-bounce flex items-center justify-center">
            <div className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl shadow-emerald-500/30 border border-emerald-400/40 text-center">
              {quickToast}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
