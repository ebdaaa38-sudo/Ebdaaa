import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  TrendingUp,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Clock,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';

export const ExchangeRatesScreen: React.FC = () => {
  const { lang, rates, currencies, navigateTo, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRates = rates.filter((r) => {
    const currency = currencies.find((c) => c.code === r.currencyCode);
    const q = searchQuery.toLowerCase();
    return (
      r.currencyCode.toLowerCase().includes(q) ||
      currency?.nameEn.toLowerCase().includes(q) ||
      currency?.nameAr.includes(q) ||
      currency?.countryEn.toLowerCase().includes(q) ||
      currency?.countryAr.includes(q)
    );
  });

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('rates.title')}
        subtitle={t('rates.subtitle')}
        showBack={true}
        rightAction={
          <button
            onClick={() => navigateTo('admin')}
            className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold cursor-pointer"
          >
            {lang === 'ar' ? 'تعديل (إدارة)' : 'Edit Rates'}
          </button>
        }
      />

      <div className="p-4 flex-1 space-y-3.5">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder={t('rates.searchCurrency')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 ps-10 pe-4 text-xs text-slate-100 placeholder-slate-500 outline-hidden focus:border-emerald-500"
          />
        </div>

        {/* Live Market Bar */}
        <div className="flex items-center justify-between text-xs px-1 text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t('rates.updatedAt')} (SAR Base)</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {filteredRates.length} {lang === 'ar' ? 'عملة' : 'Currencies'}
          </span>
        </div>

        {/* Currency Rates Cards List */}
        <div className="space-y-2.5">
          {filteredRates.map((r) => {
            const currency = currencies.find((c) => c.code === r.currencyCode);
            const isPositive = r.change24h >= 0;

            return (
              <div
                key={r.currencyCode}
                className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800/80 transition-all flex flex-col space-y-2.5"
              >
                {/* Top Row: Flag, Name, and 24h Trend */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{currency?.flag || '🌐'}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white font-mono">
                          {r.currencyCode}
                        </span>
                        <span className="text-xs text-slate-400">
                          {lang === 'ar' ? currency?.nameAr : currency?.nameEn}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {lang === 'ar' ? currency?.countryAr : currency?.countryEn}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold font-mono ${
                      isPositive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    <span>{isPositive ? `+${r.change24h}%` : `${r.change24h}%`}</span>
                  </div>
                </div>

                {/* Bottom Row: Buy Rate & Sell Rate */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/70">
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/50 flex flex-col">
                    <span className="text-[10px] font-semibold text-slate-400">
                      {t('rates.buyRate')}
                    </span>
                    <span className="text-sm font-black font-mono text-emerald-400">
                      {r.buyRate >= 1 ? r.buyRate.toFixed(3) : r.buyRate.toFixed(4)} SAR
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/50 flex flex-col">
                    <span className="text-[10px] font-semibold text-slate-400">
                      {t('rates.sellRate')}
                    </span>
                    <span className="text-sm font-black font-mono text-slate-200">
                      {r.sellRate >= 1 ? r.sellRate.toFixed(3) : r.sellRate.toFixed(4)} SAR
                    </span>
                  </div>
                </div>

                {/* High/Low bar */}
                <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 font-mono">
                  <span>
                    {t('rates.low')}: {r.low24h}
                  </span>
                  <span>{r.lastUpdated}</span>
                  <span>
                    {t('rates.high')}: {r.high24h}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
