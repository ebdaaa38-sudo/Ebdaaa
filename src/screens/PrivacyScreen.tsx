import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { Shield, Lock, EyeOff } from 'lucide-react';

export const PrivacyScreen: React.FC = () => {
  const { lang, t } = useApp();

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('legal.privacyTitle')}
        subtitle={t('legal.lastUpdated')}
        showBack={true}
      />

      <div className="p-4 flex-1 space-y-4 text-xs leading-relaxed text-slate-300">
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Lock className="w-4 h-4" />
            <span>{lang === 'ar' ? '1. التشفير والحماية البنكية' : '1. Bank-Grade Encryption'}</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {lang === 'ar'
              ? 'يتم تشفير جميع حركات البيانات الحساسة وأرقام الحسابات باستخدام بروتوكولات TLS 1.3 وتشفير AES-256 بت المعياري للبنوك والمؤسسات المالية الدولية.'
              : 'All sensitive data and account details are transmitted using TLS 1.3 and stored with standard AES-256 bit financial grade encryption.'}
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <EyeOff className="w-4 h-4" />
            <span>{lang === 'ar' ? '2. عدم مشاركة البيانات الشخصية' : '2. Zero Unauthorized Data Sharing'}</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {lang === 'ar'
              ? 'تلتزم صرافة إبداع بعدم بيع أو تأجير بيانات العملاء لأي أطراف تسويقية ثالثة، وتقتصر مشاركة البيانات مع شبكات الصرف المعتمدة لغرض استكمال التسليم المالي فقط.'
              : 'EbdAaa Exchange never sells or shares your private data with marketing third parties. Data is only communicated to authorized payout networks for delivery fulfillment.'}
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Shield className="w-4 h-4" />
            <span>{lang === 'ar' ? '3. المصادقة الحيوية وحماية الجهاز' : '3. Biometric & Device Security'}</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {lang === 'ar'
              ? 'يتم حفظ مفاتيح المصادقة الحيوية (بصمة الإصبع أو الوجه) في منطقة الأمان المشفرة بجهازك (Secure Enclave / Android Keystore) دون تخزينها على خوادمنا.'
              : 'Biometric credentials remain securely isolated in your device hardware (Android Keystore) and are never uploaded to remote servers.'}
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
