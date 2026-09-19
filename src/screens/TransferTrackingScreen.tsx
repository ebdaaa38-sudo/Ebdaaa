import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  Search,
  CheckCircle2,
  Clock,
  Send,
  Building2,
  Banknote,
  AlertCircle,
  XCircle,
  Share2,
  Calendar,
  User,
  ShieldCheck,
} from 'lucide-react';
import { TransferStatus } from '../types';

export const TransferTrackingScreen: React.FC = () => {
  const {
    lang,
    transactions,
    activeTrackingRef,
    setActiveTrackingRef,
    setSelectedTransaction,
    navigateTo,
    showToast,
    t,
  } = useApp();

  const [inputRef, setInputRef] = useState(activeTrackingRef || 'EBD-2026-9430');

  // Find transaction matching reference
  const currentTx = transactions.find(
    (tx) => tx.refNumber.toUpperCase().trim() === inputRef.toUpperCase().trim()
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.trim()) {
      showToast(lang === 'ar' ? 'يرجى إدخال رقم الحوالة' : 'Please enter reference number');
      return;
    }
    setActiveTrackingRef(inputRef.trim());
  };

  const handleSelectRecent = (ref: string) => {
    setInputRef(ref);
    setActiveTrackingRef(ref);
  };

  // Status progression steps in order
  const standardTimeline: TransferStatus[] = [
    'Pending',
    'Processing',
    'Sent',
    'Ready for Collection',
    'Completed',
  ];

  const getStatusIndex = (status: TransferStatus) => {
    if (status === 'Cancelled' || status === 'Rejected') return -1;
    return standardTimeline.indexOf(status);
  };

  const currentStatusIndex = currentTx ? getStatusIndex(currentTx.status) : 0;

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('tracking.title')}
        subtitle={t('tracking.subtitle')}
        showBack={true}
      />

      <div className="p-4 flex-1 space-y-4">
        {/* Tracking Search Input */}
        <form onSubmit={handleSearch} className="space-y-2">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder={t('tracking.enterRef')}
              value={inputRef}
              onChange={(e) => setInputRef(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 ps-10 pe-24 text-xs font-mono font-bold text-white placeholder-slate-500 outline-hidden focus:border-emerald-500 uppercase"
            />
            <button
              type="submit"
              className="absolute inset-y-1 end-1 px-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg flex items-center justify-center transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'تتبع' : 'Track'}
            </button>
          </div>
        </form>

        {/* Quick Recent Tracking Chips */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-400">
            {t('tracking.recentTransfers')}
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {transactions.slice(0, 4).map((tx) => (
              <button
                key={tx.refNumber}
                type="button"
                onClick={() => handleSelectRecent(tx.refNumber)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold shrink-0 transition-colors cursor-pointer ${
                  tx.refNumber === inputRef
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {tx.refNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Result */}
        {currentTx ? (
          <div className="space-y-4">
            {/* Main Status Hero Card */}
            <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {t('transfer.refNumber')}:
                  </span>
                  <p className="text-base font-black font-mono text-white">
                    {currentTx.refNumber}
                  </p>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    currentTx.status === 'Completed'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : currentTx.status === 'Cancelled' || currentTx.status === 'Rejected'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {t(`tracking.status.${currentTx.status}`)}
                </div>
              </div>

              {/* Amounts summary */}
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400">{t('transfer.sendAmount')}</span>
                  <p className="text-sm font-black text-white font-mono">
                    {currentTx.sendAmount.toLocaleString()} {currentTx.sendCurrency}
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  →
                </div>
                <div className="text-end">
                  <span className="text-[10px] text-slate-400">{t('transfer.receiveAmount')}</span>
                  <p className="text-sm font-black text-emerald-400 font-mono">
                    {currentTx.receiveAmount.toLocaleString()} {currentTx.receiveCurrency}
                  </p>
                </div>
              </div>

              {/* Recipient info */}
              <div className="text-xs text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('transfer.beneficiaryName')}:</span>
                  <span className="font-bold text-white">{currentTx.beneficiaryName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('transfer.destination')}:</span>
                  <span>{currentTx.destinationCountry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('details.date')}:</span>
                  <span className="font-mono text-slate-300">{currentTx.date}</span>
                </div>
              </div>
            </div>

            {/* Visual Step-by-Step Progression Timeline */}
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                {t('tracking.timeline')}
              </h4>

              {currentTx.status === 'Cancelled' || currentTx.status === 'Rejected' ? (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
                  <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                  <div>
                    <strong className="font-bold block">
                      {t(`tracking.status.${currentTx.status}`)}
                    </strong>
                    <span className="text-[11px] text-rose-300/80">
                      {lang === 'ar'
                        ? 'يرجى مراجعة خدمة العملاء أو التوجه لأقرب فرع للاستفسار أو استرداد الرصيد.'
                        : 'Please contact customer service or visit any branch for inquiry and refund.'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 relative ps-2">
                  {standardTimeline.map((stepStatus, idx) => {
                    const isCompleted = idx <= currentStatusIndex;
                    const isCurrent = idx === currentStatusIndex;

                    return (
                      <div key={stepStatus} className="flex items-start gap-3 relative">
                        {/* Connecting Line */}
                        {idx < standardTimeline.length - 1 && (
                          <div
                            className={`absolute start-3 top-6 w-0.5 h-8 transition-colors ${
                              idx < currentStatusIndex ? 'bg-emerald-500' : 'bg-slate-800'
                            }`}
                          />
                        )}

                        {/* Step Icon / Indicator */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold relative z-10 transition-all ${
                            isCompleted
                              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                              : 'bg-slate-800 text-slate-500 border border-slate-700'
                          } ${isCurrent ? 'ring-4 ring-emerald-500/20 scale-110' : ''}`}
                        >
                          {isCompleted ? '✓' : idx + 1}
                        </div>

                        {/* Step Description */}
                        <div className="flex-1">
                          <p
                            className={`text-xs font-bold leading-tight ${
                              isCurrent
                                ? 'text-emerald-400'
                                : isCompleted
                                ? 'text-slate-100'
                                : 'text-slate-500'
                            }`}
                          >
                            {t(`tracking.status.${stepStatus}`)}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {idx === 0 && 'Ref ID verified in exchange ledger'}
                            {idx === 1 && 'Anti-fraud & AML checks completed'}
                            {idx === 2 && 'Payout message sent to central network'}
                            {idx === 3 && 'Recipient can collect cash with valid ID'}
                            {idx === 4 && 'Funds successfully delivered to recipient'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* View Full Transaction Details Link */}
            <button
              onClick={() => {
                setSelectedTransaction(currentTx);
                navigateTo('details');
              }}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-slate-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('history.viewDetails')}</span>
            </button>
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <p className="text-xs text-slate-400">{t('tracking.notFound')}</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};
