import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { Calculator, ArrowUpDown, Send, Sparkles, RefreshCw } from 'lucide-react';
import { INITIAL_USD_RATES } from '../data/initialData';

export const CurrencyCalculatorScreen: React.FC = () => {
  const { lang, currencies, navigateTo, t } = useApp();

  const [baseCurrency, setBaseCurrency] = useState('SAR');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [amount, setAmount] = useState<number>(1000);

  const rate = useMemo(() => {
    const baseUsd = INITIAL_USD_RATES[baseCurrency] || 1.0;
    const targetUsd = INITIAL_USD_RATES[targetCurrency] || 1.0;
    return (1 / baseUsd) * targetUsd;
  }, [baseCurrency, targetCurrency]);

  const inverseRate = useMemo(() => {
    return rate > 0 ? 1 / rate : 0;
  }, [rate]);

  const result = useMemo(() => {
    return Number((amount * rate).toFixed(2));
  }, [amount, rate]);

  const quickAmounts = [100, 500, 1000, 2500, 5000];

  const handleSwap = () => {
    const temp = baseCurrency;
    setBaseCurrency(targetCurrency);
    setTargetCurrency(temp);
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('calculator.title')}
        subtitle={t('calculator.subtitle')}
        showBack={true}
      />

      <div className="p-4 flex-1 space-y-4">
        {/* Interactive Converter Card */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          {/* Base Currency Input */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400">
              {t('calculator.baseCurrency')}
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xl font-black font-mono text-white outline-hidden focus:border-emerald-500"
              />
              <select
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl py-3 px-3 text-xs font-bold text-white outline-hidden cursor-pointer"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Amount Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmount(amt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors shrink-0 cursor-pointer ${
                  amount === amt
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {amt.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleSwap}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 transition-transform active:scale-90 cursor-pointer"
              title="Swap"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

          {/* Target Currency Result */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400">
              {t('calculator.targetCurrency')}
            </span>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl py-3 px-4 text-xl font-black font-mono text-emerald-400 truncate">
                {result.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl py-3 px-3 text-xs font-bold text-white outline-hidden cursor-pointer"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Rate Comparison Card */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span>{t('rates.updatedAt')}</span>
            <span className="font-mono font-bold text-slate-200">
              1 {baseCurrency} = {rate >= 1 ? rate.toFixed(4) : rate.toFixed(5)} {targetCurrency}
            </span>
          </div>

          <div className="flex justify-between items-center text-slate-400">
            <span>{t('calculator.inverseRate')}</span>
            <span className="font-mono font-bold text-slate-300">
              1 {targetCurrency} = {inverseRate >= 1 ? inverseRate.toFixed(4) : inverseRate.toFixed(5)}{' '}
              {baseCurrency}
            </span>
          </div>
        </div>

        {/* Send Money with these values */}
        <button
          onClick={() => navigateTo('transfer')}
          className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>{t('home.sendMoneyNow')}</span>
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
};
