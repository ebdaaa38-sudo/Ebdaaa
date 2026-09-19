import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Send, RefreshCw, TrendingUp, User, Users, Clock } from 'lucide-react';
import { ScreenName } from '../types';

export const BottomNavigation: React.FC = () => {
  const { currentScreen, navigateTo, t } = useApp();

  const navItems: { screen: ScreenName; labelKey: string; icon: React.FC<{ className?: string }> }[] = [
    { screen: 'home', labelKey: 'nav.home', icon: Home },
    { screen: 'rates', labelKey: 'nav.rates', icon: TrendingUp },
    { screen: 'transfer', labelKey: 'nav.transfer', icon: Send },
    { screen: 'exchange', labelKey: 'nav.exchange', icon: RefreshCw },
    { screen: 'history', labelKey: 'nav.history', icon: Clock },
  ];

  return (
    <nav className="w-full bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/90 px-3 py-1.5 shrink-0 z-30">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          const isTransfer = item.screen === 'transfer';
          const Icon = item.icon;

          if (isTransfer) {
            return (
              <button
                key={item.screen}
                onClick={() => navigateTo(item.screen)}
                className="relative -top-3 flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-emerald-500/40 ring-4 ring-slate-950 scale-105'
                      : 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-900/50 ring-4 ring-slate-950 hover:brightness-110'
                  }`}
                >
                  <Send className="w-5 h-5 -rotate-45" />
                </div>
                <span
                  className={`text-[10px] font-bold mt-1 ${
                    isActive ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {t(item.labelKey)}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.screen}
              onClick={() => navigateTo(item.screen)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-emerald-400' : ''
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full" />
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 font-medium ${
                  isActive ? 'font-bold text-emerald-400' : 'text-slate-400'
                }`}
              >
                {t(item.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
