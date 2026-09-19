import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  Globe,
  Fingerprint,
  Bell,
  Lock,
  FileText,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
  Sparkles,
  Layers,
  Share2,
  Copy,
  ExternalLink,
  Smartphone,
  Check,
  Briefcase,
  Store,
  Terminal,
  BadgeCheck,
  X,
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { lang, setLanguage, logout, navigateTo, showToast, t } = useApp();

  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [clientKitModalOpen, setClientKitModalOpen] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const sharedAppUrl = 'https://ais-pre-chopxarpgjeoogag43qew4-548836597413.europe-west3.run.app';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sharedAppUrl);
    setCopiedLink(true);
    showToast(lang === 'ar' ? 'تم نسخ رابط التطبيق بنجاح!' : 'App link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EbdAaa Exchange | صرافة إبداع',
          text: lang === 'ar' ? 'تطبيق صرافة إبداع للتحويلات وصرف العملات' : 'EbdAaa Exchange Mobile App',
          url: sharedAppUrl,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const ChevronIcon = lang === 'ar' ? ChevronLeft : ChevronRight;

  const handleLanguageChange = (newLang: 'en' | 'ar') => {
    setLanguage(newLang);
    showToast(newLang === 'ar' ? 'تم تفعيل اللغة العربية بالكامل' : 'English language activated');
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length === 4) {
      setPinModalOpen(false);
      setNewPin('');
      showToast(lang === 'ar' ? 'تم تحديث رمز PIN السري بنجاح' : 'Security PIN updated successfully');
    } else {
      showToast(lang === 'ar' ? 'الرمز يجب أن يتكون من 4 أرقام' : 'PIN must be 4 digits');
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('settings.title')}
        subtitle={t('settings.subtitle')}
        showBack={true}
      />

      <div className="p-4 flex-1 space-y-4">
        {/* Publish & Share App Card */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-amber-950/30 border border-emerald-500/30 space-y-3.5 shadow-lg shadow-emerald-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">
                  {lang === 'ar' ? 'نشر ومشاركة التطبيق' : 'Publish & Share App'}
                </h3>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {lang === 'ar' ? 'الرابط المباشر جاهز للنشر' : 'Live Share URL Ready'}
                </span>
              </div>
            </div>

            <a
              href={sharedAppUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title={lang === 'ar' ? 'فتح الرابط في نافذة جديدة' : 'Open in new tab'}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed">
            {lang === 'ar'
              ? 'تطبيق صرافة إبداع منشور ومتاح عبر الرابط المباشر أدناه. يمكنك مشاركته مع أي شخص، أو تثبيته على هاتفك كـ Web App، أو تصديره لمتجر Google Play.'
              : 'EbdAaa Exchange app is live and accessible via the link below. Share it with clients, install as a PWA, or export to Google Play Store.'}
          </p>

          {/* Link box */}
          <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-emerald-400 truncate select-all">
              {sharedAppUrl}
            </span>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{lang === 'ar' ? 'نسخ' : 'Copy'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleShareApp}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow"
              >
                <Share2 className="w-3 h-3" />
                <span>{lang === 'ar' ? 'مشاركة' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Publish Guide Options */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
              {lang === 'ar' ? 'طرق النشر المتاحة:' : 'Publishing Options:'}
            </span>

            <div className="grid grid-cols-1 gap-1.5 text-[11px]">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/70 flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-white">
                    {lang === 'ar' ? 'زر Share في AI Studio' : 'Share Button in AI Studio'}:
                  </strong>{' '}
                  <span className="text-slate-400">
                    {lang === 'ar'
                      ? 'اضغط زر "Share" في الشريط العلوي بالأعلى لتوليد رابط مشاركة عام لأي مستخدم.'
                      : 'Click the "Share" button at the top header to share this app directly with anyone.'}
                  </span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/70 flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-white">
                    {lang === 'ar' ? 'النشر على Cloud Run' : 'Deploy to Cloud Run'}:
                  </strong>{' '}
                  <span className="text-slate-400">
                    {lang === 'ar'
                      ? 'من قائمة الإعدادات (Settings)، يمكنك اختيار "Deploy to Cloud Run" لتشغيل التطبيق 24/7 على Google Cloud.'
                      : 'From the top Settings menu, select "Deploy to Cloud Run" for permanent 24/7 Google Cloud hosting.'}
                  </span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/70 flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-white">
                    {lang === 'ar' ? 'تصدير كـ تطبيق أندرويد (APK / Play Store)' : 'Export APK / Play Store'}:
                  </strong>{' '}
                  <span className="text-slate-400">
                    {lang === 'ar'
                      ? 'يمكنك تنزيل الكود عبر "Export to GitHub/ZIP" وربطه بأداة Capacitor لإنشاء ملف APK رسمي ونشره على متجر Google Play.'
                      : 'Download code via "Export to GitHub/ZIP" and wrap with Capacitor/Android Studio for Google Play.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Launch Detailed Guide Modal */}
            <button
              type="button"
              onClick={() => setClientKitModalOpen(true)}
              className="w-full mt-2 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 text-xs font-black flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-[0.98]"
            >
              <Briefcase className="w-4 h-4" />
              <span>
                {lang === 'ar'
                  ? 'دليل تظبيط OTP + رفع Google Play + تسليم العميل'
                  : 'Guide: OTP Setup + Google Play + Client Sale Kit'}
              </span>
            </button>
          </div>
        </div>

        {/* Language Selection Setting (Highlight Requirement) */}
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-slate-200">{t('settings.language')}</h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleLanguageChange('ar')}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                lang === 'ar'
                  ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-sm font-black">العربية</span>
              <span className="text-[10px] text-emerald-400 mt-0.5">RTL (اليمين لليسار)</span>
            </button>

            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-sm font-black">English</span>
              <span className="text-[10px] text-emerald-400 mt-0.5">LTR (Left-to-Right)</span>
            </button>
          </div>
        </div>

        {/* Security & Authentication Settings */}
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {t('settings.security')}
          </h3>

          <div className="space-y-3 divide-y divide-slate-800/80">
            {/* Biometrics Toggle */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-slate-300">
                <Fingerprint className="w-4 h-4 text-emerald-400" />
                <span>{t('settings.biometrics')}</span>
              </div>
              <button
                type="button"
                onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  biometricsEnabled ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform absolute top-1 ${
                    biometricsEnabled ? 'start-6' : 'start-1'
                  }`}
                />
              </button>
            </div>

            {/* Notifications Toggle */}
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2 text-slate-300">
                <Bell className="w-4 h-4 text-emerald-400" />
                <span>{t('settings.notifications')}</span>
              </div>
              <button
                type="button"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  notificationsEnabled ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform absolute top-1 ${
                    notificationsEnabled ? 'start-6' : 'start-1'
                  }`}
                />
              </button>
            </div>

            {/* Change PIN */}
            <div
              onClick={() => setPinModalOpen(true)}
              className="flex items-center justify-between pt-3 cursor-pointer hover:text-emerald-400 transition-colors"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>{t('settings.changePin')}</span>
              </div>
              <ChevronIcon className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>

        {/* Administration & Management Access */}
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {lang === 'ar' ? 'الإدارة والتحكم' : 'Administration & Control'}
          </h3>

          <button
            onClick={() => navigateTo('admin')}
            className="w-full p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 flex items-center justify-between text-amber-400 font-bold transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4 h-4" />
              <span>{t('admin.title')}</span>
            </div>
            <ChevronIcon className="w-4 h-4 text-amber-500" />
          </button>
        </div>

        {/* Legal & Help Links */}
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
          <button
            onClick={() => navigateTo('help')}
            className="w-full py-2.5 flex items-center justify-between text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>{t('settings.help')}</span>
            </div>
            <ChevronIcon className="w-4 h-4 text-slate-500" />
          </button>

          <button
            onClick={() => navigateTo('terms')}
            className="w-full py-2.5 flex items-center justify-between text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>{t('settings.terms')}</span>
            </div>
            <ChevronIcon className="w-4 h-4 text-slate-500" />
          </button>

          <button
            onClick={() => navigateTo('privacy')}
            className="w-full py-2.5 flex items-center justify-between text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-slate-400" />
              <span>{t('settings.privacy')}</span>
            </div>
            <ChevronIcon className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full py-3.5 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('settings.logout')}</span>
        </button>

        {/* App Version Info */}
        <div className="text-center text-[10px] text-slate-600 space-y-0.5 pt-1">
          <p>EbdAaa Exchange Mobile • v2.4.0 (Build 2026)</p>
          <p>{t('app.licensed')}</p>
        </div>
      </div>

      {/* Change PIN Modal */}
      {pinModalOpen && (
        <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3.5 shadow-2xl">
            <h4 className="text-xs font-bold text-white text-center">
              {t('settings.changePin')}
            </h4>
            <p className="text-[11px] text-slate-400 text-center">
              {lang === 'ar'
                ? 'أدخل الرمز السري الجديد المكون من 4 أرقام لتأكيد الحوالات'
                : 'Enter a 4-digit code to authorize transactions'}
            </p>

            <form onSubmit={handleSavePin} className="space-y-3">
              <input
                type="password"
                maxLength={4}
                autoFocus
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 text-center text-xl font-mono tracking-widest text-white outline-hidden focus:border-emerald-500"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPinModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-400 cursor-pointer"
                >
                  {t('beneficiaries.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md cursor-pointer"
                >
                  {t('beneficiaries.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Client Handover & Google Play Kit Modal */}
      {clientKitModalOpen && (
        <div className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col p-4 overflow-y-auto">
          <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">
                    {lang === 'ar' ? 'دليل تظبيط OTP ورفع Google Play وبيعه' : 'OTP, Google Play & Client Sale Kit'}
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    {lang === 'ar' ? 'جاهز للتسليم والإنتاج التجاري' : 'Production & Commercial Ready'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setClientKitModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Section 1: OTP Setup */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <BadgeCheck className="w-4 h-4" />
                <span>1. {lang === 'ar' ? 'تظبيط وتفعيل نظام الـ OTP' : 'OTP System Setup'}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {lang === 'ar'
                  ? 'تم تجهيز شاشة OTP في التطبيق بالكامل مع دعم اللصق التلقائي (Paste) والتأكيد التلقائي عند اكتمال 6 أرقام، واختيار الاستلام عبر SMS أو WhatsApp، وإشعار تجريبي فوري.'
                  : 'OTP screen is fully prepped with auto-paste, 6-digit auto-verify, SMS/WhatsApp delivery switcher, and instant simulation.'}
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-[10px] space-y-1 font-mono text-slate-400">
                <div className="text-amber-400 font-bold">بوابات إرسال الرسائل الجاهزة للربط:</div>
                <div>• Taqnyat SMS (السعودية والخليج) - HTTP API</div>
                <div>• Unifonic / Twilio SMS Gateway</div>
                <div>• Firebase Phone Auth (مجاني حتى 10,000 تحقق/شهر)</div>
              </div>
            </div>

            {/* Section 2: Google Play Deployment */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                <Store className="w-4 h-4" />
                <span>2. {lang === 'ar' ? 'رفع التطبيق على متجر Google Play' : 'Upload to Google Play'}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {lang === 'ar'
                  ? 'تم إعداد ملف capacitor.config.json باسم الحزمة com.ebdaaa.exchange. خطوات بناء ملف AAB المعتمد من جوجل:'
                  : 'Configured capacitor.config.json with package com.ebdaaa.exchange. Steps to build Google AAB bundle:'}
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-[10px] font-mono text-emerald-400 space-y-1">
                <div>1. npm run build</div>
                <div>2. npx cap add android</div>
                <div>3. npx cap sync</div>
                <div>4. npx cap open android</div>
                <div className="text-slate-400 font-sans text-[10px] pt-1">
                  {lang === 'ar'
                    ? 'في Android Studio: اختر Build > Generate Signed Bundle / APK > Android App Bundle وارفعه إلى Google Play Console.'
                    : 'In Android Studio: Build > Generate Signed Bundle > Android App Bundle.'}
                </div>
              </div>
            </div>

            {/* Section 3: Selling to Client */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Briefcase className="w-4 h-4" />
                <span>3. {lang === 'ar' ? 'بيع التطبيق للعميل وتسليمه' : 'Selling & Client Handover'}</span>
              </div>
              <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc list-inside">
                <li>
                  <strong className="text-white">تغيير الهوية (White Label):</strong> يمكنك تبديل اسم الصرافة واللوجو في ملف <code>metadata.json</code> و<code>src/components/Logo.tsx</code>.
                </li>
                <li>
                  <strong className="text-white">لوحة الإدارة للمدير (Admin):</strong> يمكن للعميل التحكم بأسعار بيع وشراء كافة العملات وحالات الحوالات عبر لوحة الإدارة المدمجة.
                </li>
                <li>
                  <strong className="text-white">نموذج التسعير المقترح:</strong> بيع التطبيق كـ (ترخيص مالي مخصص) بمبلغ 3,000 - 8,000 دولار، مع عقد صيانة واستضافة شهري 150 - 300 دولار.
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setClientKitModalOpen(false)}
              className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow cursor-pointer transition-colors"
            >
              {lang === 'ar' ? 'حسناً، فهمت وجاهز للبدء' : 'Got it, Ready to Proceed'}
            </button>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};
