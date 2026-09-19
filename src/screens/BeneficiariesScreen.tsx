import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  Users,
  Plus,
  Search,
  Trash2,
  Edit2,
  Send,
  Building2,
  Banknote,
  Smartphone,
  Phone,
} from 'lucide-react';
import { Beneficiary, DeliveryMethod } from '../types';

export const BeneficiariesScreen: React.FC = () => {
  const { lang, beneficiaries, addBeneficiary, updateBeneficiary, deleteBeneficiary, navigateTo, t } =
    useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBen, setEditingBen] = useState<Beneficiary | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [country, setCountry] = useState('Egypt');
  const [phone, setPhone] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [relationship, setRelationship] = useState('Family');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('bankDeposit');

  const filtered = beneficiaries.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery)
  );

  const openAddModal = () => {
    setEditingBen(null);
    setName('');
    setCountry('Egypt');
    setPhone('');
    setBankName('');
    setAccountNumber('');
    setRelationship('Family');
    setDeliveryMethod('bankDeposit');
    setModalOpen(true);
  };

  const openEditModal = (b: Beneficiary) => {
    setEditingBen(b);
    setName(b.name);
    setCountry(b.country);
    setPhone(b.phone);
    setBankName(b.bankName);
    setAccountNumber(b.accountNumber);
    setRelationship(b.relationship);
    setDeliveryMethod(b.deliveryMethod);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBen) {
      updateBeneficiary(editingBen.id, {
        name,
        country,
        phone,
        bankName,
        accountNumber,
        relationship,
        deliveryMethod,
      });
    } else {
      addBeneficiary({
        name,
        country,
        phone,
        bankName,
        accountNumber,
        relationship,
        deliveryMethod,
      });
    }
    setModalOpen(false);
  };

  const getMethodIcon = (method: DeliveryMethod) => {
    switch (method) {
      case 'bankDeposit':
        return <Building2 className="w-3.5 h-3.5 text-blue-400" />;
      case 'cashPickup':
        return <Banknote className="w-3.5 h-3.5 text-amber-400" />;
      case 'mobileWallet':
        return <Smartphone className="w-3.5 h-3.5 text-teal-400" />;
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('beneficiaries.title')}
        subtitle={t('beneficiaries.subtitle')}
        showBack={true}
        rightAction={
          <button
            onClick={openAddModal}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('beneficiaries.addBeneficiary')}</span>
          </button>
        }
      />

      <div className="p-4 flex-1 space-y-3.5">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder={t('beneficiaries.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 ps-10 pe-4 text-xs text-slate-100 placeholder-slate-500 outline-hidden focus:border-emerald-500"
          />
        </div>

        {/* Beneficiaries Count */}
        <div className="text-xs text-slate-400 px-1 flex justify-between items-center">
          <span>{filtered.length} {lang === 'ar' ? 'مستفيد مسجل' : 'Saved Recipients'}</span>
        </div>

        {/* List */}
        <div className="space-y-2.5">
          {filtered.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
              <Users className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">{t('beneficiaries.noBeneficiaries')}</p>
            </div>
          ) : (
            filtered.map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl ${
                        b.avatarBg || 'bg-emerald-600'
                      } text-white font-black text-sm flex items-center justify-center shrink-0`}
                    >
                      {b.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-snug">{b.name}</h4>
                      <p className="text-[11px] text-slate-400">{b.country} • {b.relationship}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{b.phone}</p>
                    </div>
                  </div>

                  {/* Delivery Method Badge */}
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-300">
                    {getMethodIcon(b.deliveryMethod)}
                    <span>{t(`transfer.${b.deliveryMethod}`)}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="truncate max-w-[180px]">{b.bankName}</span>
                  <span className="font-mono text-slate-300">{b.accountNumber}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                  <button
                    onClick={() => navigateTo('transfer')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-bold cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>{t('home.sendMoneyNow')}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(b)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(t('beneficiaries.confirmDelete'))) {
                          deleteBeneficiary(b.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add / Edit Modal Overlay */}
      {modalOpen && (
        <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 space-y-3.5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">
                {editingBen
                  ? t('beneficiaries.editBeneficiary')
                  : t('beneficiaries.addBeneficiary')}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  {t('beneficiaries.fullName')}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    {t('beneficiaries.country')}
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    {t('beneficiaries.phone')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  {t('transfer.deliveryMethod')}
                </label>
                <select
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value as DeliveryMethod)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden cursor-pointer"
                >
                  <option value="bankDeposit">{t('transfer.bankDeposit')}</option>
                  <option value="cashPickup">{t('transfer.cashPickup')}</option>
                  <option value="mobileWallet">{t('transfer.mobileWallet')}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    {t('beneficiaries.bankName')}
                  </label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    {t('beneficiaries.relationship')}
                  </label>
                  <input
                    type="text"
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  {t('beneficiaries.accountNumber')}
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 cursor-pointer"
                >
                  {t('beneficiaries.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  {editingBen ? t('beneficiaries.update') : t('beneficiaries.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};
