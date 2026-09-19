import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  Send,
  RefreshCw,
  TrendingUp,
  Calculator,
  Search,
  Users,
  Clock,
  MapPin,
  Bell,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { ScreenName, Transaction } from '../types';

export const HomeScreen: React.FC = () => {
  const {
    lang,
    user,
    navigateTo,
    rates,
    transactions,
    setSelectedTransaction,
    setActiveTrackingRef,
    notifications,
    t,
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const quickServices: {
    screen: ScreenName;
    titleKey: string;
    icon: React.FC<{ className?: string }>;
    bgGradient: string;
    iconColor: string;
  }[] = [
    {
      screen: 'transfer',
      titleKey: 'nav.transfer',
      icon: Send,
      bgGradient: 'from-emerald-500/15 to-teal-500/15 border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      screen: 'exchange',
      titleKey: 'nav.exchange',
      icon: RefreshCw,
      bgGradient: 'from-amber-500/15 to-yellow-500/15 border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    {
      screen: 'rates',
      titleKey: 'nav.rates',
      icon: TrendingUp,
      bgGradient: 'from-blue-500/15 to-indigo-500/15 border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      screen: 'calculator',
      titleKey: 'nav.calculator',
      icon: Calculator,
      bgGradient: 'from-purple-500/15 to-pink-500/15 border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      screen: 'tracking',
      titleKey: 'nav.tracking',
      icon: Search,
      bgGradient: 'from-cyan-500/15 to-sky-500/15 border-cyan-500/30',
      iconColor: 'text-cyan-400',
    },
    {
      screen: 'beneficiaries',
      titleKey: 'nav.beneficiaries',
      icon: Users,
      bgGradient: 'from-rose-500/15 to-orange-500/15 border-rose-500/30',
      iconColor: 'text-rose-400',
    },
    {
      screen: 'history',
      titleKey: 'nav.history',
      icon: Clock,
      bgGradient: 'from-indigo-500/15 to-violet-500/15 border-indigo-500/30',
      iconColor: 'text-indigo-400',
    },
    {
      screen: 'branches',
      titleKey: 'nav.branches',
      icon: MapPin,
      bgGradient: 'from-emerald-600/15 to-green-500/15 border-emerald-600/30',
      iconColor: 'text-emerald-400',
    },
  ];

  const handleTransactionClick = (tx: Transaction) => {
    setSelectedTransaction(tx);
    navigateTo('details');
  };

  const ChevronIcon = lang === 'ar' ? ChevronLeft : ChevronRight;

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      {/* Home Header */}
      <div className="px-5 pt-4 pb-3 bg-slate-900/80 border-b border-slate-800/80 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Logo size="sm" showTagline={false} />
        </div>

        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <button
            onClick={() => navigateTo('notifications')}
            className="relative w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/60 flex items-center justify-center text-slate-300 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-slate-900">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => navigateTo('profile')}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-slate-950 font-bold text-xs shadow-md shadow-emerald-900/30 cursor-pointer"
          >
            {user.fullName
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* User Greeting & Wallet Balance Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-emerald-500/30 p-5 shadow-2xl shadow-emerald-950/40 overflow-hidden">
          {/* Top subtle glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-slate-400 font-medium">
                {t('home.greeting')} <strong className="text-white font-bold">{user.fullName}</strong>
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-semibold text-emerald-400">
                  {t('home.verifiedUser')} ({user.tier})
                </span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[10px] font-mono font-bold text-amber-400">
              {user.currency}
            </span>
          </div>

          <div className="relative z-10 space-y-1 mb-5">
            <span className="text-[11px] font-medium text-slate-400">
              {t('home.balanceCardTitle')}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
                {user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-bold text-emerald-400">{user.currency}</span>
            </div>
          </div>

          {/* Action buttons inside card */}
          <div className="relative z-10 grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
            <button
              onClick={() => navigateTo('transfer')}
              className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t('home.sendMoneyNow')}</span>
            </button>

            <button
              onClick={() => navigateTo('exchange')}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('nav.exchange')}</span>
            </button>
          </div>
        </div>

        {/* Promo Announcement Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-emerald-500/10 border border-amber-500/30 p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-xs text-amber-200/90 font-medium leading-tight">
            {t('home.announcement')}
          </p>
        </div>

        {/* Quick Access Services Grid (8 Core Items Required) */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-slate-200 tracking-tight">
              {t('home.quickActions')}
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">8 Services</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {quickServices.map((srv) => {
              const Icon = srv.icon;
              return (
                <button
                  key={srv.screen}
                  onClick={() => navigateTo(srv.screen)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div
                    className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${srv.bgGradient} border flex items-center justify-center shadow-md transition-all group-hover:scale-105 group-active:scale-95`}
                  >
                    <Icon className={`w-5 h-5 ${srv.iconColor}`} />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-300 group-hover:text-emerald-400 mt-1.5 text-center leading-tight">
                    {t(srv.titleKey)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Currency Rates Preview Card */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-slate-200">{t('home.liveRates')}</h3>
            </div>
            <button
              onClick={() => navigateTo('rates')}
              className="text-[11px] font-semibold text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>{t('home.viewAll')}</span>
              <ChevronIcon className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {rates.slice(0, 3).map((r) => (
              <div
                key={r.currencyCode}
                className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono">{r.currencyCode}</span>
                  <span
                    className={`text-[9px] font-bold ${
                      r.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {r.change24h >= 0 ? `+${r.change24h}%` : `${r.change24h}%`}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>{t('rates.buyRate')}</span>
                  <strong className="text-slate-200 font-mono">{r.buyRate.toFixed(3)}</strong>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>{t('rates.sellRate')}</span>
                  <strong className="text-slate-200 font-mono">{r.sellRate.toFixed(3)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-slate-200">
              {t('home.recentTransactions')}
            </h3>
            <button
              onClick={() => navigateTo('history')}
              className="text-[11px] font-semibold text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>{t('home.viewAll')}</span>
              <ChevronIcon className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {transactions.slice(0, 3).map((tx) => {
              const isTransfer = tx.type === 'transfer';
              const statusColor =
                tx.status === 'Completed'
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : tx.status === 'Ready for Collection'
                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  : 'bg-blue-500/15 text-blue-400 border-blue-500/30';

              return (
                <div
                  key={tx.id}
                  onClick={() => handleTransactionClick(tx)}
                  className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isTransfer ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      {isTransfer ? (
                        <ArrowUpRight className="w-5 h-5" />
                      ) : (
                        <RefreshCw className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-100 truncate max-w-[150px] xs:max-w-[180px]">
                        {tx.beneficiaryName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {tx.refNumber} • {tx.date.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-xs font-black text-white font-mono">
                      -{tx.sendAmount.toLocaleString()} {tx.sendCurrency}
                    </span>
                    <span
                      className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border mt-1 ${statusColor}`}
                    >
                      {t(`tracking.status.${tx.status}`)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom App Navigation */}
      <BottomNavigation />
    </div>
  );
};
