import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  ArrowUpDown,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  QrCode,
  MapPin,
} from 'lucide-react';
import { INITIAL_USD_RATES } from '../data/initialData';

export const CurrencyExchangeScreen: React.FC = () => {
  const { lang, currencies, rates, user, addTransaction, showToast, navigateTo, t } = useApp();

  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('SAR');
  const [amount, setAmount] = useState<number>(500);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Calculate conversion
  const rate = useMemo(() => {
    const fromUsd = INITIAL_USD_RATES[fromCurrency] || 1.0;
    const toUsd = INITIAL_USD_RATES[toCurrency] || 1.0;
    return (1 / fromUsd) * toUsd;
  }, [fromCurrency, toCurrency]);

  const convertedAmount = useMemo(() => {
    return Number((amount * rate).toFixed(2));
  }, [amount, rate]);

  const serviceFee = 0.0; // EbdAaa Exchange offers 0 commission on counter exchanges
  const netTotal = convertedAmount;

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleBookOrder = () => {
    const code = `EXC-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingCode(code);

    // Save transaction
    addTransaction({
      type: 'exchange',
      senderName: user.fullName,
      beneficiaryName: 'Self (Branch Cash Pickup)',
      sendAmount: amount,
      sendCurrency: fromCurrency,
      receiveAmount: netTotal,
      receiveCurrency: toCurrency,
      exchangeRate: rate,
      fee: 0,
      vat: 0,
      totalPaid: amount,
      payoutMethod: 'cashPickup',
      status: 'Ready for Collection',
      destinationCountry: 'Saudi Arabia',
      purpose: 'Currency Exchange Booking',
    });

    setIsBooked(true);
    showToast(lang === 'ar' ? 'تم حجز وتثبيت سعر الصرف لمدة 30 دقيقة' : 'Rate locked for 30 minutes!');
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('exchange.title')}
        subtitle={t('exchange.subtitle')}
        showBack={true}
      />

      <div className="p-4 flex-1 space-y-4">
        {isBooked ? (
          /* Booking Confirmation Card */
          <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/40 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">{t('exchange.orderBooked')}</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                {t('exchange.orderBookedDesc')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                {t('exchange.receiptCode')}
              </span>
              <p className="text-2xl font-black font-mono text-amber-400 tracking-wider">
                {bookingCode}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2 text-start">
              <div className="flex justify-between text-slate-400">
                <span>{t('exchange.from')}:</span>
                <strong className="text-white font-mono">
                  {amount.toLocaleString()} {fromCurrency}
                </strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t('exchange.netTotal')}:</span>
                <strong className="text-emerald-400 font-mono">
                  {netTotal.toLocaleString()} {toCurrency}
                </strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t('exchange.marketRate')}:</span>
                <strong className="text-slate-200 font-mono">
                  1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                </strong>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigateTo('branches')}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <MapPin className="w-4 h-4" />
                <span>{t('home.findBranch')}</span>
              </button>

              <button
                onClick={() => setIsBooked(false)}
                className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                {lang === 'ar' ? 'إجراء عملية صرافة أخرى' : 'Convert Another Currency'}
              </button>
            </div>
          </div>
        ) : (
          /* Currency Exchange Converter */
          <div className="space-y-4">
            {/* From Currency Input */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-medium text-slate-400">{t('exchange.from')}</span>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={amount}
                  min="1"
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="flex-1 bg-transparent text-2xl sm:text-3xl font-black text-white font-mono outline-hidden"
                />

                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-hidden cursor-pointer"
                >
                  {currencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Instant Swap Button */}
            <div className="flex items-center justify-center -my-2 relative z-10">
              <button
                type="button"
                onClick={handleSwap}
                className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30 flex items-center justify-center transition-transform active:rotate-180 cursor-pointer"
                title={t('exchange.instantSwap')}
              >
                <ArrowUpDown className="w-5 h-5" />
              </button>
            </div>

            {/* To Currency Result */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-medium text-slate-400">{t('exchange.to')}</span>

              <div className="flex items-center gap-3">
                <div className="flex-1 text-2xl sm:text-3xl font-black text-emerald-400 font-mono truncate">
                  {convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>

                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-hidden cursor-pointer"
                >
                  {currencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Breakdown Details Card */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs space-y-2.5">
              <div className="flex justify-between text-slate-400">
                <span>{t('exchange.marketRate')}:</span>
                <strong className="font-mono text-slate-200">
                  1 {fromCurrency} = {rate >= 1 ? rate.toFixed(4) : rate.toFixed(5)} {toCurrency}
                </strong>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>{t('exchange.spreadFee')}:</span>
                <span className="text-emerald-400 font-medium">{t('exchange.freeFee')}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>{t('transfer.totalPayable')}:</span>
                <strong className="font-mono text-slate-200">
                  {amount.toLocaleString()} {fromCurrency}
                </strong>
              </div>

              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                <span>{t('exchange.netTotal')}:</span>
                <strong className="font-mono text-emerald-400">
                  {netTotal.toLocaleString()} {toCurrency}
                </strong>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-2 border-t border-slate-800/60">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span>{t('exchange.lastUpdated')}</span>
              </div>
            </div>

            {/* Book Rate Button */}
            <button
              onClick={handleBookOrder}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{t('exchange.proceedOrder')}</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};
