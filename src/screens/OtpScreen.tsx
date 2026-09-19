import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, RotateCcw, ArrowRight, ArrowLeft, MessageSquare, PhoneCall, CheckCircle2 } from 'lucide-react';
import { Logo } from '../components/Logo';

export const OtpScreen: React.FC = () => {
  const { lang, navigateTo, setIsLoggedIn, showToast, t, user } = useApp();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'sms' | 'whatsapp'>('sms');
  const [incomingSmsBanner, setIncomingSmsBanner] = useState<string | null>('482910');
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Hide simulated SMS banner after 8 seconds
  useEffect(() => {
    if (incomingSmsBanner) {
      const t = setTimeout(() => {
        setIncomingSmsBanner(null);
      }, 9000);
      return () => clearTimeout(t);
    }
  }, [incomingSmsBanner]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all 6 digits entered
    if (index === 5 && value) {
      const fullCode = newOtp.join('');
      if (fullCode.length === 6) {
        verifyCode(fullCode);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      inputRefs.current[5]?.focus();
      verifyCode(pastedData);
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    const newRandomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCountdown(45);
    setCanResend(false);
    setIncomingSmsBanner(newRandomCode);
    showToast(
      lang === 'ar'
        ? `تم إرسال رمز تحقق جديد عبر ${deliveryMethod === 'sms' ? 'رسالة SMS' : 'واتساب'}`
        : `New OTP sent via ${deliveryMethod === 'sms' ? 'SMS' : 'WhatsApp'}`
    );
  };

  const verifyCode = (code: string) => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      showToast(lang === 'ar' ? 'تم تأكيد الرمز بنجاح! مرحباً بك' : 'OTP verified successfully! Welcome');
      setIsLoggedIn(true);
      navigateTo('home');
    }, 600);
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) {
      showToast(lang === 'ar' ? 'يرجى إدخال كافة أرقام الرمز' : 'Please enter the complete 6-digit OTP');
      return;
    }
    verifyCode(code);
  };

  const fillCode = (c: string) => {
    const digits = c.split('');
    setOtp(digits);
    verifyCode(c);
  };

  const NextIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="flex-1 w-full flex flex-col justify-between p-6 bg-slate-950 text-slate-100 relative">
      {/* Simulated Push SMS notification on top */}
      {incomingSmsBanner && (
        <div className="absolute top-4 inset-x-4 z-50 animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="p-3 bg-slate-900/95 border border-emerald-500/50 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-300">
                  {lang === 'ar' ? 'رسالة نصية من صرافة إبداع' : 'SMS from EbdAaa Exchange'}
                </p>
                <p className="text-xs font-mono font-bold text-emerald-400">
                  {lang === 'ar' ? `رمز التحقق هو: ` : `Your OTP code is: `}
                  <span className="text-white font-black tracking-widest">{incomingSmsBanner}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => fillCode(incomingSmsBanner)}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[11px] font-black shrink-0 transition-colors shadow"
            >
              {lang === 'ar' ? 'تعبئة' : 'Use Code'}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <Logo size="sm" showTagline={false} />
        <button
          onClick={() => navigateTo('login')}
          className="text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
        >
          {t('nav.back')}
        </button>
      </div>

      {/* Main OTP content */}
      <div className="flex flex-col items-center text-center my-auto py-4">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5 shadow-xl text-emerald-400">
          <ShieldCheck className="w-10 h-10" />
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight mb-2">
          {t('auth.otpTitle')}
        </h2>

        <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-1">
          {t('auth.otpSubtitle')}
        </p>
        <p className="text-sm font-bold text-emerald-400 mb-4 font-mono">
          {user?.phoneNumber || '+966 50 123 4567'}
        </p>

        {/* Delivery Method Selector (SMS vs WhatsApp) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setDeliveryMethod('sms')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              deliveryMethod === 'sms'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'رسالة SMS' : 'SMS'}</span>
          </button>
          <button
            type="button"
            onClick={() => setDeliveryMethod('whatsapp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              deliveryMethod === 'whatsapp'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
          </button>
        </div>

        {/* 6 Digit Input boxes */}
        <div className="flex justify-center gap-2 sm:gap-2.5 mb-5" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-11 h-13 sm:w-12 sm:h-14 rounded-xl bg-slate-900 border text-center text-xl font-mono font-black text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-hidden ${
                digit ? 'border-emerald-500/80 bg-emerald-950/20' : 'border-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Quick Demo Helper Button */}
        <button
          type="button"
          onClick={() => fillCode('123456')}
          className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 px-3 py-1.5 rounded-full mb-5 transition-colors cursor-pointer"
        >
          {lang === 'ar' ? 'تعبئة الرمز التجريبي (123456)' : 'Auto-fill Test Code (123456)'}
        </button>

        {/* Resend Countdown */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-emerald-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('auth.resendCode')}</span>
            </button>
          ) : (
            <span>
              {t('auth.resendIn')}{' '}
              <strong className="text-white font-mono">{countdown}</strong>{' '}
              {t('auth.seconds')}
            </span>
          )}
        </div>
      </div>

      {/* Verify Button */}
      <div className="pb-4">
        <button
          disabled={isVerifying}
          onClick={handleVerify}
          className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
        >
          {isVerifying ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>{lang === 'ar' ? 'جاري التحقق...' : 'Verifying...'}</span>
            </span>
          ) : (
            <>
              <span>{t('auth.verifyButton')}</span>
              <NextIcon className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
