import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import {
  Lock,
  Mail,
  Fingerprint,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { lang, navigateTo, setIsLoggedIn, showToast, t } = useApp();
  const [identifier, setIdentifier] = useState('+966 50 123 4567');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [pinMode, setPinMode] = useState(false);
  const [pin, setPin] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      showToast(lang === 'ar' ? 'يرجى إدخال البيانات كاملة' : 'Please enter all credentials');
      return;
    }
    // Navigate to OTP screen for two-factor security as requested in prompt!
    navigateTo('otp');
  };

  const handleBiometricLogin = () => {
    showToast(
      lang === 'ar'
        ? 'تم التحقق من البصمة بنجاح! مرحباً بك'
        : 'Biometric verification successful! Welcome'
    );
    setIsLoggedIn(true);
    setTimeout(() => {
      navigateTo('home');
    }, 400);
  };

  const handlePinInput = (num: string) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      if (nextPin.length === 4) {
        setTimeout(() => {
          showToast(lang === 'ar' ? 'تم الدخول بالرمز السريع بنجاح' : 'Quick PIN accepted!');
          setIsLoggedIn(true);
          navigateTo('home');
        }, 300);
      }
    }
  };

  const NextIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="flex-1 w-full flex flex-col justify-between p-6 bg-slate-950 text-slate-100 overflow-y-auto">
      {/* Top Branding */}
      <div className="flex flex-col items-center pt-4 pb-6 text-center">
        <Logo size="lg" showTagline={false} />
        <h2 className="text-2xl font-black tracking-tight text-white mt-4">
          {t('auth.loginTitle')}
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">{t('auth.loginSubtitle')}</p>
      </div>

      {pinMode ? (
        /* Quick 4-Digit PIN Keypad Screen */
        <div className="flex-1 flex flex-col items-center justify-center my-auto py-2">
          <p className="text-sm font-semibold text-slate-300 mb-6 flex items-center gap-1.5">
            <KeyRound className="w-4 h-4 text-emerald-400" />
            <span>{t('auth.quickPin')}</span>
          </p>

          {/* 4 PIN Dots */}
          <div className="flex gap-4 mb-8">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  pin.length > idx
                    ? 'bg-emerald-400 ring-4 ring-emerald-500/30 scale-110'
                    : 'bg-slate-800 border border-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-[280px]">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handlePinInput(digit)}
                className="w-16 h-16 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xl font-bold text-slate-100 flex items-center justify-center active:scale-90 transition-all mx-auto cursor-pointer"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={handleBiometricLogin}
              className="w-16 h-16 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto cursor-pointer"
              title="Biometrics"
            >
              <Fingerprint className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => handlePinInput('0')}
              className="w-16 h-16 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xl font-bold text-slate-100 flex items-center justify-center active:scale-90 transition-all mx-auto cursor-pointer"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => setPin((prev) => prev.slice(0, -1))}
              className="w-16 h-16 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-400 flex items-center justify-center mx-auto cursor-pointer"
            >
              {lang === 'ar' ? 'حذف' : 'DEL'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setPinMode(false)}
            className="text-xs text-emerald-400 hover:underline mt-6 font-medium cursor-pointer"
          >
            {lang === 'ar' ? 'تسجيل الدخول بكلمة المرور' : 'Use Password Instead'}
          </button>
        </div>
      ) : (
        /* Standard Credentials Form */
        <form onSubmit={handleLogin} className="flex-1 flex flex-col justify-center space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              {t('auth.phoneOrEmail')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-3 ps-10 pe-4 text-sm text-slate-100 placeholder-slate-500 transition-all outline-hidden"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">{t('auth.password')}</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-3 ps-10 pe-10 text-sm text-slate-100 placeholder-slate-500 transition-all outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 end-0 pe-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500/20"
              />
              <span>{t('auth.rememberMe')}</span>
            </label>
            <button
              type="button"
              onClick={() =>
                showToast(
                  lang === 'ar'
                    ? 'تم إرسال رابط إعادة التعيين لهاتفك'
                    : 'Reset link sent to your registered phone'
                )
              }
              className="text-emerald-400 hover:underline font-medium cursor-pointer"
            >
              {t('auth.forgotPassword')}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all mt-2 cursor-pointer"
          >
            <span>{t('auth.loginButton')}</span>
            <NextIcon className="w-4 h-4" />
          </button>

          {/* Biometric and PIN alternatives */}
          <div className="pt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleBiometricLogin}
              className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <Fingerprint className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'البصمة' : 'Biometric'}</span>
            </button>

            <button
              type="button"
              onClick={() => setPinMode(true)}
              className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ar' ? 'رمز PIN' : 'Quick PIN'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Footer Register Link */}
      <div className="pt-6 pb-2 text-center">
        <p className="text-xs text-slate-400">
          {t('auth.noAccount')}{' '}
          <button
            type="button"
            onClick={() => navigateTo('register')}
            className="text-emerald-400 font-bold hover:underline cursor-pointer"
          >
            {t('auth.register')}
          </button>
        </p>
      </div>
    </div>
  );
};
