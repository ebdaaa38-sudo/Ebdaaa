import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { Bell, CheckCheck, TrendingUp, Send, ShieldAlert, Clock } from 'lucide-react';

export const NotificationsScreen: React.FC = () => {
  const { lang, notifications, markAllNotificationsRead, t } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'rateAlert':
        return <TrendingUp className="w-4 h-4 text-amber-400" />;
      case 'transfer':
        return <Send className="w-4 h-4 text-emerald-400" />;
      case 'security':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      default:
        return <Bell className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('notifications.title')}
        subtitle={t('notifications.subtitle')}
        showBack={true}
        rightAction={
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>{t('notifications.markAllRead')}</span>
          </button>
        }
      />

      <div className="p-4 flex-1 space-y-2.5">
        {notifications.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
            {t('notifications.noNotifications')}
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                notif.read
                  ? 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                  : 'bg-slate-900 border-emerald-500/30 text-slate-200 shadow-md shadow-emerald-950/20'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  notif.read ? 'bg-slate-800' : 'bg-slate-800 border border-slate-700'
                }`}
              >
                {getIcon(notif.type)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4
                    className={`text-xs font-bold leading-tight ${
                      notif.read ? 'text-slate-300' : 'text-white'
                    }`}
                  >
                    {lang === 'ar' ? notif.titleAr : notif.titleEn}
                  </h4>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  )}
                </div>

                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {lang === 'ar' ? notif.messageAr : notif.messageEn}
                </p>

                <span className="text-[10px] text-slate-500 mt-1.5 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {notif.time}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};
