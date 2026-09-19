import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import {
  Send,
  Building2,
  Banknote,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Share2,
  Search,
  Plus,
  Lock,
  Calendar,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { DeliveryMethod, Beneficiary, Transaction } from '../types';
import { INITIAL_USD_RATES } from '../data/initialData';

export const MoneyTransferScreen: React.FC = () => {
  const {
    lang,
    currencies,
    beneficiaries,
    addBeneficiary,
    addTransaction,
    setActiveTrackingRef,
    navigateTo,
    showToast,
    user,
    t,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Transfer Form State
  const [sendCurrency, setSendCurrency] = useState('SAR');
  const [receiveCurrency, setReceiveCurrency] = useState('EGP');
  const [sendAmount, setSendAmount] = useState<number>(2000);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('bankDeposit');
  const [purpose, setPurpose] = useState('familySupport');

  // Beneficiary Selection
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(
    beneficiaries[0] || null
  );
  const [showAddBenModal, setShowAddBenModal] = useState(false);
  const [newBenName, setNewBenName] = useState('');
  const [newBenCountry, setNewBenCountry] = useState('Egypt');
  const [newBenPhone, setNewBenPhone] = useState('');
  const [newBenBank, setNewBenBank] = useState('');
  const [newBenAccount, setNewBenAccount] = useState('');
  const [newBenRel, setNewBenRel] = useState('Family');

  // Security confirmation
  const [pin, setPin] = useState('');
  const [confirmedTx, setConfirmedTx] = useState<Transaction | null>(null);

  // Calculate Exchange Rate between sendCurrency and receiveCurrency using USD pivot
  const rate = useMemo(() => {
    const sendUsd = INITIAL_USD_RATES[sendCurrency] || 1.0;
    const receiveUsd = INITIAL_USD_RATES[receiveCurrency] || 1.0;
    // 1 unit of sendCurrency in USD = 1 / sendUsd
    // in receiveCurrency = (1 / sendUsd) * receiveUsd
    const calculated = (1 / sendUsd) * receiveUsd;
    return calculated;
  }, [sendCurrency, receiveCurrency]);

  const receiveAmount = useMemo(() => {
    return Number((sendAmount * rate).toFixed(2));
  }, [sendAmount, rate]);

  const transferFee = 15.0;
  const vat = 2.25;
  const totalPayable = sendAmount + transferFee + vat;

  const handleCreateBeneficiary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBenName || !newBenPhone) {
      showToast(lang === 'ar' ? 'يرجى إدخال اسم المستفيد ورقم الهاتف' : 'Please provide recipient name and phone');
      return;
    }
    const created = addBeneficiary({
      name: newBenName,
      country: newBenCountry,
      phone: newBenPhone,
      bankName: newBenBank || 'Central Payout Network',
      accountNumber: newBenAccount || 'CPN-984211',
      relationship: newBenRel,
      deliveryMethod,
    });
    setSelectedBeneficiary(created);
    setShowAddBenModal(false);
    // Reset form
    setNewBenName('');
    setNewBenPhone('');
    setNewBenBank('');
    setNewBenAccount('');
  };

  const handleConfirmTransfer = () => {
    if (pin !== '1234' && pin.length < 4) {
      showToast(lang === 'ar' ? 'رمز الأمان PIN غير صحيح. جرب 1234' : 'Invalid PIN. Try 1234');
      return;
    }

    if (!selectedBeneficiary) {
      showToast(lang === 'ar' ? 'يرجى اختيار المستفيد' : 'Please select a beneficiary');
      return;
    }

    const tx = addTransaction({
      type: 'transfer',
      senderName: user.fullName,
      beneficiaryName: selectedBeneficiary.name,
      sendAmount,
      sendCurrency,
      receiveAmount,
      receiveCurrency,
      exchangeRate: rate,
      fee: transferFee,
      vat,
      totalPaid: totalPayable,
      payoutMethod: deliveryMethod,
      status: 'Processing',
      destinationCountry: selectedBeneficiary.country,
      purpose: t(`transfer.${purpose}`),
    });

    setConfirmedTx(tx);
    setActiveTrackingRef(tx.refNumber);
    setStep(4);
  };

  const handleShareReceipt = () => {
    showToast(
      lang === 'ar'
        ? `تم نسخ رابط ومحتوى الإيصال ${confirmedTx?.refNumber}`
        : `Receipt ${confirmedTx?.refNumber} shared to clipboard`
    );
  };

  const NextIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('transfer.title')}
        subtitle={t(`transfer.step${step}`)}
        onBack={step > 1 && step < 4 ? () => setStep((prev) => (prev - 1) as any) : undefined}
      />

      {/* Stepper Progress Bar */}
      {step < 4 && (
        <div className="px-5 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <div
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                  step === s
                    ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-500/30 font-bold'
                    : step > s
                    ? 'bg-emerald-900/60 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {step > s ? '✓' : s}
              </div>
              <span
                className={`text-[10px] hidden sm:inline ${
                  step === s ? 'text-emerald-400 font-bold' : 'text-slate-400'
                }`}
              >
                {t(`transfer.step${s}`)}
              </span>
              {s < 3 && <div className="w-8 sm:w-16 h-0.5 bg-slate-800 mx-1" />}
            </div>
          ))}
        </div>
      )}

      {/* Main Step Body */}
      <div className="p-4 flex-1 space-y-4">
        {step === 1 && (
          /* STEP 1: Currencies & Amounts */
          <div className="space-y-4">
            {/* Sending Amount Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                <span>{t('transfer.sendAmount')}</span>
                <span>
                  {t('home.balanceCardTitle')}: {user.balance.toFixed(2)} {user.currency}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="50"
                  max="100000"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(Number(e.target.value) || 0)}
                  className="flex-1 bg-transparent text-2xl sm:text-3xl font-black text-white font-mono outline-hidden"
                />

                <select
                  value={sendCurrency}
                  onChange={(e) => setSendCurrency(e.target.value)}
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

            {/* Exchange Rate Badge */}
            <div className="flex items-center justify-center">
              <div className="px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-mono font-medium text-emerald-400 flex items-center gap-2">
                <span>1 {sendCurrency} =</span>
                <strong className="font-bold text-white">
                  {rate >= 1 ? rate.toFixed(3) : rate.toFixed(4)}
                </strong>
                <span>{receiveCurrency}</span>
              </div>
            </div>

            {/* Receiving Amount Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-medium text-slate-400">
                {t('transfer.receiveAmount')}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                  {receiveAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>

                <select
                  value={receiveCurrency}
                  onChange={(e) => setReceiveCurrency(e.target.value)}
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

            {/* Delivery Method Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200">
                {t('transfer.deliveryMethod')}
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bankDeposit', labelKey: 'transfer.bankDeposit', icon: Building2 },
                  { id: 'cashPickup', labelKey: 'transfer.cashPickup', icon: Banknote },
                  { id: 'mobileWallet', labelKey: 'transfer.mobileWallet', icon: Smartphone },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = deliveryMethod === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDeliveryMethod(item.id as DeliveryMethod)}
                      className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 mb-1.5 ${
                          isSelected ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      />
                      <span className="text-[10px] font-bold leading-tight">
                        {t(item.labelKey)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Purpose */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200">{t('transfer.purpose')}</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-hidden cursor-pointer"
              >
                <option value="familySupport">{t('transfer.familySupport')}</option>
                <option value="business">{t('transfer.business')}</option>
                <option value="education">{t('transfer.education')}</option>
                <option value="savings">{t('transfer.savings')}</option>
                <option value="medical">{t('transfer.medical')}</option>
              </select>
            </div>

            {/* Fees Breakdown Summary */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>{t('transfer.transferFee')}</span>
                <span className="font-mono text-slate-200">
                  {transferFee.toFixed(2)} {sendCurrency}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t('transfer.vat')} (15%)</span>
                <span className="font-mono text-slate-200">
                  {vat.toFixed(2)} {sendCurrency}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                <span>{t('transfer.totalPayable')}</span>
                <span className="font-mono text-emerald-400">
                  {totalPayable.toFixed(2)} {sendCurrency}
                </span>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{lang === 'ar' ? 'متابعة لاختيار المستفيد' : 'Continue to Beneficiary'}</span>
              <NextIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          /* STEP 2: Beneficiary Selection */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200">
                {t('transfer.selectBeneficiary')}
              </h3>
              <button
                onClick={() => setShowAddBenModal(true)}
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t('transfer.addNewBeneficiary')}</span>
              </button>
            </div>

            {/* Beneficiaries List */}
            <div className="space-y-2.5">
              {beneficiaries.map((b) => {
                const isSelected = selectedBeneficiary?.id === b.id;
                return (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBeneficiary(b)}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${
                          b.avatarBg || 'bg-emerald-600'
                        } text-white font-bold text-sm flex items-center justify-center`}
                      >
                        {b.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{b.name}</p>
                        <p className="text-[10px] text-slate-400">
                          {b.country} • {b.bankName}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono">{b.accountNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                            : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Add Beneficiary Modal / Drawer */}
            {showAddBenModal && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-emerald-400">
                    {t('beneficiaries.addBeneficiary')}
                  </h4>
                  <button
                    onClick={() => setShowAddBenModal(false)}
                    className="text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCreateBeneficiary} className="space-y-2.5">
                  <input
                    type="text"
                    placeholder={t('beneficiaries.fullName')}
                    value={newBenName}
                    onChange={(e) => setNewBenName(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder={t('beneficiaries.country')}
                      value={newBenCountry}
                      onChange={(e) => setNewBenCountry(e.target.value)}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden"
                    />
                    <input
                      type="tel"
                      placeholder={t('beneficiaries.phone')}
                      value={newBenPhone}
                      onChange={(e) => setNewBenPhone(e.target.value)}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder={t('beneficiaries.bankName')}
                      value={newBenBank}
                      onChange={(e) => setNewBenBank(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden"
                    />
                    <input
                      type="text"
                      placeholder={t('beneficiaries.accountNumber')}
                      value={newBenAccount}
                      onChange={(e) => setNewBenAccount(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow cursor-pointer"
                  >
                    {t('beneficiaries.save')}
                  </button>
                </form>
              </div>
            )}

            <button
              onClick={() => setStep(3)}
              disabled={!selectedBeneficiary}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{lang === 'ar' ? 'متابعة لمراجعة الحوالة' : 'Review & Confirm'}</span>
              <NextIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 3 && (
          /* STEP 3: Review & Security PIN Approval */
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {t('transfer.reviewDetails')}
              </h3>

              <div className="space-y-2 text-xs divide-y divide-slate-800/80">
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">{t('transfer.senderName')}</span>
                  <span className="font-bold text-white">{user.fullName}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">{t('transfer.beneficiaryName')}</span>
                  <span className="font-bold text-white">{selectedBeneficiary?.name}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">{t('transfer.destination')}</span>
                  <span className="font-medium text-slate-200">{selectedBeneficiary?.country}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">{t('transfer.deliveryMethod')}</span>
                  <span className="font-medium text-slate-200">
                    {t(`transfer.${deliveryMethod}`)}
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">{t('transfer.sendAmount')}</span>
                  <span className="font-mono font-bold text-white">
                    {sendAmount.toLocaleString()} {sendCurrency}
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">{t('transfer.exchangeRate')}</span>
                  <span className="font-mono text-slate-300">
                    1 {sendCurrency} = {rate.toFixed(4)} {receiveCurrency}
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">{t('transfer.receiveAmount')}</span>
                  <span className="font-mono font-black text-emerald-400 text-sm">
                    {receiveAmount.toLocaleString()} {receiveCurrency}
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">{t('transfer.transferFee')}</span>
                  <span className="font-mono text-slate-300">
                    {transferFee.toFixed(2)} {sendCurrency}
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">{t('transfer.estimatedArrival')}</span>
                  <span className="font-medium text-amber-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {t('transfer.withinMinutes')}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-black text-white">
                  <span>{t('transfer.totalPayable')}</span>
                  <span className="font-mono text-emerald-400">
                    {totalPayable.toFixed(2)} {sendCurrency}
                  </span>
                </div>
              </div>
            </div>

            {/* Security PIN Authorization Prompt */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Lock className="w-4 h-4" />
                <span>{t('transfer.securityPin')}</span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="password"
                  maxLength={4}
                  placeholder="PIN: 1234"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-4 text-center text-lg font-mono tracking-widest text-white outline-hidden focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setPin('1234')}
                  className="px-3 py-2 text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 rounded-xl border border-amber-500/20 cursor-pointer"
                >
                  {lang === 'ar' ? 'رمز تجريبي (1234)' : 'Use Demo (1234)'}
                </button>
              </div>
            </div>

            <button
              onClick={handleConfirmTransfer}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{t('transfer.confirmTransfer')}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 4 && confirmedTx && (
          /* STEP 4: Success Receipt & Tracking Code */
          <div className="space-y-4 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">{t('transfer.transferSuccess')}</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {t('transfer.transferSuccessDesc')}
              </p>
            </div>

            {/* Reference Number Box */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-1 max-w-xs mx-auto">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                {t('transfer.refNumber')}
              </span>
              <p className="text-lg font-black font-mono text-emerald-400 tracking-wider select-all">
                {confirmedTx.refNumber}
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2 text-start">
              <div className="flex justify-between text-slate-400">
                <span>{t('transfer.beneficiaryName')}:</span>
                <strong className="text-white">{confirmedTx.beneficiaryName}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t('transfer.receiveAmount')}:</span>
                <strong className="text-emerald-400 font-mono font-bold">
                  {confirmedTx.receiveAmount.toLocaleString()} {confirmedTx.receiveCurrency}
                </strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t('transfer.totalPayable')}:</span>
                <strong className="text-white font-mono">
                  {confirmedTx.totalPaid.toFixed(2)} {confirmedTx.sendCurrency}
                </strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t('transfer.estimatedArrival')}:</span>
                <strong className="text-amber-400">{t('transfer.withinMinutes')}</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigateTo('tracking')}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{t('transfer.trackNow')}</span>
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={handleShareReceipt}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{t('transfer.shareReceipt')}</span>
              </button>

              <button
                onClick={() => navigateTo('home')}
                className="w-full py-2 text-center text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                {t('transfer.done')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
