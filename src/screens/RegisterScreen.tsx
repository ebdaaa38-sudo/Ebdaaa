import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import {
  User,
  CreditCard,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';

export const RegisterScreen: React.FC = () => {
  const { lang, navigateTo, updateUser, showToast, t } = useApp();

  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !nationalId || !password) {
      showToast(lang === 'ar' ? 'يرجى إكمال جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    if (password !== confirmPassword) {
      showToast(lang === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      showToast(lang === 'ar' ? 'يجب الموافقة على الشروط والأحكام' : 'You must accept the terms');
      return;
    }

    updateUser({
      fullName,
      nationalId,
      phoneNumber: phone,
      email: email || `${phone.replace(/\s+/g, '')}@ebdaaa.user`,
    });

    showToast(lang === 'ar' ? 'تم إنشاء الحساب، يرجى إدخال رمز التحقق' : 'Account created! Verify with OTP');
    navigateTo('otp');
  };

  const NextIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="flex-1 w-full flex flex-col justify-between p-6 bg-slate-950 text-slate-100 overflow-y-auto">
      {/* Top Branding */}
      <div className="flex flex-col items-center pt-2 pb-4 text-center">
        <Logo size="sm" showTagline={false} />
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-3">
          {t('auth.registerTitle')}
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">{t('auth.registerSubtitle')}</p>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleRegister} className="space-y-3.5 my-auto">
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-300">{t('auth.fullName')}</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-500">
              <User className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder={lang === 'ar' ? 'محمد عبدالله الغامدي' : 'Johnathan Doe'}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-2.5 ps-9 pe-3 text-xs text-slate-100 placeholder-slate-600 outline-hidden"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-300">{t('auth.nationalId')}</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-500">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="10XXXXXXXX"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-2.5 ps-9 pe-3 text-xs text-slate-100 placeholder-slate-600 outline-hidden"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-300">{t('auth.phoneNumber')}</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-500">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <input
              type="tel"
              placeholder="+966 50 XXX XXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-2.5 ps-9 pe-3 text-xs text-slate-100 placeholder-slate-600 outline-hidden"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-300">{t('auth.email')}</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-2.5 ps-9 pe-3 text-xs text-slate-100 placeholder-slate-600 outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300">{t('auth.password')}</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl py-2.5 px-3 text-xs text-slate-100 outline-hidden"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300">{t('auth.confirmPassword')}</label>
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl py-2.5 px-3 text-xs text-slate-100 outline-hidden"
              />
            </div>
          </div>
        </div>

        <div className="pt-1">
          <label className="flex items-start gap-2 text-xs text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500/20"
            />
            <span className="leading-tight">{t('auth.agreeTerms')}</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all mt-3 cursor-pointer"
        >
          <span>{t('auth.registerButton')}</span>
          <NextIcon className="w-4 h-4" />
        </button>
      </form>

      {/* Footer Back to Sign In */}
      <div className="pt-4 pb-2 text-center">
        <p className="text-xs text-slate-400">
          {t('auth.haveAccount')}{' '}
          <button
            type="button"
            onClick={() => navigateTo('login')}
            className="text-emerald-400 font-bold hover:underline cursor-pointer"
          >
            {t('auth.loginButton')}
          </button>
        </p>
      </div>
    </div>
  );
};
