import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import {
  Download,
  Share2,
  Repeat,
  HelpCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  Calendar,
  Search,
} from 'lucide-react';
import { Logo } from '../components/Logo';

export const TransactionDetailsScreen: React.FC = () => {
  const {
    lang,
    selectedTransaction,
    setActiveTrackingRef,
    navigateTo,
    showToast,
    t,
  } = useApp();

  if (!selectedTransaction) {
    return (
      <div className="flex-1 w-full flex flex-col justify-center items-center p-6 bg-slate-950 text-slate-100 text-center">
        <p className="text-xs text-slate-400 mb-4">No transaction selected</p>
        <button
          onClick={() => navigateTo('history')}
          className="px-4 py-2 bg-emerald-500 rounded-xl text-slate-950 text-xs font-bold"
        >
          {t('nav.history')}
        </button>
      </div>
    );
  }

  const tx = selectedTransaction;

  const handleDownload = () => {
    showToast(
      lang === 'ar'
        ? `جاري تحميل إيصال التحويل ${tx.refNumber}.pdf`
        : `Downloading receipt ${tx.refNumber}.pdf`
    );
  };

  const handleShare = () => {
    showToast(
      lang === 'ar'
        ? `تم نسخ رابط الإيصال ${tx.refNumber}`
        : `Receipt ${tx.refNumber} link copied to clipboard`
    );
  };

  const handleTrack = () => {
    setActiveTrackingRef(tx.refNumber);
    navigateTo('tracking');
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('details.title')}
        subtitle={tx.refNumber}
        showBack={true}
        rightAction={
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        }
      />

      <div className="p-4 flex-1 space-y-4">
        {/* Official Receipt Card */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-2xl relative overflow-hidden">
          {/* Subtle watermark background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Logo size="xl" showTagline={false} />
          </div>

          {/* Receipt Top Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <Logo size="sm" showTagline={false} />
            <div className="text-end">
              <span className="text-[10px] text-slate-400 block font-mono">
                {tx.refNumber}
              </span>
              <span className="text-[10px] text-slate-500">{tx.date}</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">
                {t(`tracking.status.${tx.status}`)}
              </span>
            </div>

            <button
              onClick={handleTrack}
              className="text-[11px] font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Search className="w-3 h-3" />
              <span>{t('transfer.trackNow')}</span>
            </button>
          </div>

          {/* Amounts Display */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80">
            <div>
              <span className="text-[10px] text-slate-400">{t('details.amountSent')}</span>
              <p className="text-base font-black font-mono text-white">
                {tx.sendAmount.toLocaleString()} {tx.sendCurrency}
              </p>
            </div>
            <div className="text-end">
              <span className="text-[10px] text-slate-400">{t('transfer.receiveAmount')}</span>
              <p className="text-base font-black font-mono text-emerald-400">
                {tx.receiveAmount.toLocaleString()} {tx.receiveCurrency}
              </p>
            </div>
          </div>

          {/* Details Breakdown */}
          <div className="text-xs space-y-2.5 divide-y divide-slate-800/60 pt-1">
            <div className="flex justify-between pt-1 text-slate-300">
              <span className="text-slate-400">{t('transfer.senderName')}</span>
              <span className="font-bold">{tx.senderName}</span>
            </div>
            <div className="flex justify-between pt-2 text-slate-300">
              <span className="text-slate-400">{t('details.beneficiary')}</span>
              <span className="font-bold text-emerald-400">{tx.beneficiaryName}</span>
            </div>
            <div className="flex justify-between pt-2 text-slate-300">
              <span className="text-slate-400">{t('transfer.destination')}</span>
              <span>{tx.destinationCountry}</span>
            </div>
            <div className="flex justify-between pt-2 text-slate-300">
              <span className="text-slate-400">{t('details.payoutMethod')}</span>
              <span>{t(`transfer.${tx.payoutMethod}`)}</span>
            </div>
            <div className="flex justify-between pt-2 text-slate-300">
              <span className="text-slate-400">{t('details.rateApplied')}</span>
              <span className="font-mono">
                1 {tx.sendCurrency} = {tx.exchangeRate.toFixed(4)} {tx.receiveCurrency}
              </span>
            </div>
            <div className="flex justify-between pt-2 text-slate-300">
              <span className="text-slate-400">{t('details.fee')}</span>
              <span className="font-mono">
                {tx.fee.toFixed(2)} {tx.sendCurrency}
              </span>
            </div>
            <div className="flex justify-between pt-2 text-sm font-black text-white">
              <span>{t('details.totalPaid')}</span>
              <span className="font-mono text-emerald-400">
                {tx.totalPaid.toFixed(2)} {tx.sendCurrency}
              </span>
            </div>
          </div>

          {/* Security Seal */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <div className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('app.licensed')}</span>
            </div>
            <span className="font-mono">Central Financial Network Verification OK</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleDownload}
            className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{t('details.downloadReceipt')}</span>
          </button>

          <button
            onClick={() => navigateTo('transfer')}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            <Repeat className="w-4 h-4 text-emerald-400" />
            <span>{t('details.repeatTransfer')}</span>
          </button>

          <button
            onClick={() => navigateTo('help')}
            className="w-full py-2 text-center text-xs text-slate-400 hover:text-emerald-400 flex items-center justify-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t('details.needHelp')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
