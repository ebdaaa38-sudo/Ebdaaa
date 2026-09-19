import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  Search,
  Filter,
  ArrowUpRight,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
} from 'lucide-react';
import { Transaction } from '../types';

export const TransactionHistoryScreen: React.FC = () => {
  const { lang, transactions, setSelectedTransaction, navigateTo, t } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'transfer' | 'exchange' | 'completed' | 'pending'>('all');

  const filtered = transactions.filter((tx) => {
    // Type/Status filter
    if (filterType === 'transfer' && tx.type !== 'transfer') return false;
    if (filterType === 'exchange' && tx.type !== 'exchange') return false;
    if (filterType === 'completed' && tx.status !== 'Completed') return false;
    if (filterType === 'pending' && tx.status === 'Completed') return false;

    // Search query
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      tx.refNumber.toLowerCase().includes(q) ||
      tx.beneficiaryName.toLowerCase().includes(q) ||
      tx.sendCurrency.toLowerCase().includes(q) ||
      tx.receiveCurrency.toLowerCase().includes(q) ||
      String(tx.sendAmount).includes(q)
    );
  });

  const handleSelectTx = (tx: Transaction) => {
    setSelectedTransaction(tx);
    navigateTo('details');
  };

  const ChevronIcon = lang === 'ar' ? ChevronLeft : ChevronRight;

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('history.title')}
        subtitle={t('history.subtitle')}
        showBack={true}
      />

      <div className="p-4 flex-1 space-y-3.5">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder={t('history.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 ps-10 pe-4 text-xs text-slate-100 placeholder-slate-500 outline-hidden focus:border-emerald-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', labelKey: 'history.filterAll' },
            { id: 'transfer', labelKey: 'history.filterTransfer' },
            { id: 'exchange', labelKey: 'history.filterExchange' },
            { id: 'completed', labelKey: 'history.filterCompleted' },
            { id: 'pending', labelKey: 'history.filterPending' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterType === f.id
                  ? 'bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
              {t('history.noRecords')}
            </div>
          ) : (
            filtered.map((tx) => {
              const isTransfer = tx.type === 'transfer';
              const statusBadge =
                tx.status === 'Completed'
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : tx.status === 'Ready for Collection'
                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  : tx.status === 'Cancelled' || tx.status === 'Rejected'
                  ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                  : 'bg-blue-500/15 text-blue-400 border-blue-500/30';

              return (
                <div
                  key={tx.id}
                  onClick={() => handleSelectTx(tx)}
                  className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800/80 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isTransfer
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {isTransfer ? (
                        <ArrowUpRight className="w-5 h-5" />
                      ) : (
                        <RefreshCw className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                        {tx.beneficiaryName}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {tx.refNumber} • {tx.date}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {t(`transfer.${tx.payoutMethod}`)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-xs font-black font-mono text-white">
                      -{tx.sendAmount.toLocaleString()} {tx.sendCurrency}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      +{tx.receiveAmount.toLocaleString()} {tx.receiveCurrency}
                    </span>
                    <span
                      className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border mt-1 ${statusBadge}`}
                    >
                      {t(`tracking.status.${tx.status}`)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
