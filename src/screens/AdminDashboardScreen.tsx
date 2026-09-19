import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  SlidersHorizontal,
  TrendingUp,
  Users,
  Send,
  Save,
  CheckCircle2,
  RefreshCw,
  Search,
  DollarSign,
  AlertTriangle,
  ArrowUpDown,
} from 'lucide-react';
import { TransferStatus } from '../types';

export const AdminDashboardScreen: React.FC = () => {
  const { lang, rates, updateExchangeRate, transactions, updateTransactionStatus, showToast, t } =
    useApp();

  const [activeTab, setActiveTab] = useState<'rates' | 'transfers' | 'overview'>('rates');

  // Local state for editing rates
  const [editingRates, setEditingRates] = useState(
    rates.reduce((acc, curr) => {
      acc[curr.currencyCode] = { buy: curr.buyRate, sell: curr.sellRate };
      return acc;
    }, {} as Record<string, { buy: number; sell: number }>)
  );

  const handleRateInputChange = (code: string, field: 'buy' | 'sell', val: number) => {
    setEditingRates((prev) => ({
      ...prev,
      [code]: {
        ...prev[code],
        [field]: val,
      },
    }));
  };

  const handleSaveRate = (code: string) => {
    const item = editingRates[code];
    if (item) {
      updateExchangeRate(code, item.buy, item.sell);
      showToast(
        lang === 'ar'
          ? `تم تحديث سعر صرف ${code} بنجاح`
          : `Exchange rate for ${code} updated successfully`
      );
    }
  };

  const handleStatusChange = (refNumber: string, newStatus: TransferStatus) => {
    updateTransactionStatus(refNumber, newStatus);
    showToast(
      lang === 'ar'
        ? `تم تحديث حالة الحوالة ${refNumber} إلى ${t(`tracking.status.${newStatus}`)}`
        : `Transfer ${refNumber} status changed to ${newStatus}`
    );
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('admin.title')}
        subtitle={t('admin.subtitle')}
        showBack={true}
      />

      {/* Admin Tab Switcher */}
      <div className="px-4 pt-3 pb-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-1">
        {[
          { id: 'rates', labelKey: 'admin.manageRates', icon: TrendingUp },
          { id: 'transfers', labelKey: 'admin.manageTransfers', icon: Send },
          { id: 'overview', labelKey: 'admin.systemStats', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="truncate">{t(tab.labelKey)}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 flex-1 space-y-4">
        {activeTab === 'rates' && (
          /* TAB 1: Exchange Rates Editor */
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-bold text-slate-200">{t('admin.rateUpdateNotice')}</span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Feed
              </span>
            </div>

            <div className="space-y-2.5">
              {rates.map((r) => {
                const currentVals = editingRates[r.currencyCode] || {
                  buy: r.buyRate,
                  sell: r.sellRate,
                };
                return (
                  <div
                    key={r.currencyCode}
                    className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black font-mono text-white">
                          {r.currencyCode}
                        </span>
                        <span className="text-[11px] text-slate-400">/ SAR</span>
                      </div>

                      <button
                        onClick={() => handleSaveRate(r.currencyCode)}
                        className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow cursor-pointer"
                      >
                        <Save className="w-3 h-3" />
                        <span>{t('admin.saveChanges')}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-slate-400">
                          {t('rates.buyRate')} (SAR)
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={currentVals.buy}
                          onChange={(e) =>
                            handleRateInputChange(
                              r.currencyCode,
                              'buy',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-1.5 px-2.5 text-xs font-mono font-bold text-emerald-400 outline-hidden focus:border-emerald-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-slate-400">
                          {t('rates.sellRate')} (SAR)
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={currentVals.sell}
                          onChange={(e) =>
                            handleRateInputChange(
                              r.currencyCode,
                              'sell',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-1.5 px-2.5 text-xs font-mono font-bold text-slate-200 outline-hidden focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'transfers' && (
          /* TAB 2: Remittance Status Operations */
          <div className="space-y-3">
            <div className="text-xs text-slate-400 px-1">
              {lang === 'ar'
                ? 'تحكم بحالات الحوالات لتجربة التتبع المباشر للعميل'
                : 'Manage remittance statuses to simulate real-time client tracking'}
            </div>

            <div className="space-y-2.5">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-black font-mono text-emerald-400">
                        {tx.refNumber}
                      </span>
                      <p className="text-xs font-bold text-white mt-0.5">{tx.beneficiaryName}</p>
                      <p className="text-[10px] text-slate-400">
                        {tx.sendAmount} {tx.sendCurrency} → {tx.receiveAmount} {tx.receiveCurrency}
                      </p>
                    </div>

                    <div className="text-end">
                      <span className="text-[10px] text-slate-500 block">{tx.date}</span>
                      <span className="text-[10px] text-slate-400">
                        {tx.destinationCountry}
                      </span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-slate-400">
                      {lang === 'ar' ? 'تحديث الحالة:' : 'Set Status:'}
                    </span>

                    <select
                      value={tx.status}
                      onChange={(e) =>
                        handleStatusChange(tx.refNumber, e.target.value as TransferStatus)
                      }
                      className="bg-slate-950 border border-slate-700 rounded-xl py-1.5 px-3 text-xs font-bold text-amber-400 outline-hidden cursor-pointer"
                    >
                      <option value="Pending">{t('tracking.status.Pending')}</option>
                      <option value="Processing">{t('tracking.status.Processing')}</option>
                      <option value="Sent">{t('tracking.status.Sent')}</option>
                      <option value="Ready for Collection">
                        {t('tracking.status.Ready for Collection')}
                      </option>
                      <option value="Completed">{t('tracking.status.Completed')}</option>
                      <option value="Rejected">{t('tracking.status.Rejected')}</option>
                      <option value="Cancelled">{t('tracking.status.Cancelled')}</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'overview' && (
          /* TAB 3: Operational System Stats */
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400">{t('admin.todayVolume')}</span>
                <p className="text-lg font-black text-emerald-400 font-mono">SAR 2,840,150</p>
                <span className="text-[9px] text-emerald-400 font-bold">+14.2% vs yesterday</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400">{t('admin.activeUsers')}</span>
                <p className="text-lg font-black text-white font-mono">18,492</p>
                <span className="text-[9px] text-slate-400">99.98% uptime</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400">{t('admin.completedTransfers')}</span>
                <p className="text-lg font-black text-white font-mono">1,429</p>
                <span className="text-[9px] text-emerald-400 font-bold">Avg speed: 4.2 min</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400">{t('admin.amlAlerts')}</span>
                <p className="text-lg font-black text-emerald-400 font-mono">0 Clean</p>
                <span className="text-[9px] text-emerald-400 font-bold">100% Compliance</span>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-white">EbdAaa Clearing Engine</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Connected to Central Remittance Switch, SWIFT GPI, and Partner Bank Payout Gateways in
                Saudi Arabia, UAE, Egypt, Yemen, Jordan, Pakistan, India, and Philippines.
              </p>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};
