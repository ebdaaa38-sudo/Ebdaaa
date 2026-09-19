import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { FileText, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const TermsScreen: React.FC = () => {
  const { lang, t } = useApp();

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('legal.termsTitle')}
        subtitle={t('legal.lastUpdated')}
        showBack={true}
      />

      <div className="p-4 flex-1 space-y-4 text-xs leading-relaxed text-slate-300">
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <FileText className="w-4 h-4" />
            <span>{lang === 'ar' ? '1. نطاق تقديم الخدمات المالية' : '1. Financial Services Scope'}</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {lang === 'ar'
              ? 'تخضع جميع عمليات التحويل المالي وصرافة العملات المنجزة عبر تطبيق صرافة إبداع للأنظمة والتعليمات المصرفية الصادرة عن البنك المركزي وهيئات الرقابة المالية ذات الاختصاص.'
              : 'All money remittances and foreign exchange executed through EbdAaa Exchange are subject to central bank monetary guidelines and regulatory authorities.'}
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>{lang === 'ar' ? '2. مكافحة غسل الأموال (AML)' : '2. Anti-Money Laundering (AML)'}</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {lang === 'ar'
              ? 'يلتزم العميل بتقديم بيانات صحيحة ومحدثة عن الهوية الشخصية ومصدر الأموال والغرض من التحويل. تحتفظ الشركة بالحق في تعليق أو طلب مستندات إضافية لأي معاملة غير اعتيادية.'
              : 'Users agree to provide true identity, legitimate source of funds, and valid purpose for remittances. EbdAaa reserves the right to hold and verify unusual transactions.'}
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>{lang === 'ar' ? '3. أسعار الصرف ورسوم التحويل' : '3. Exchange Rates & Tariffs'}</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {lang === 'ar'
              ? 'يتم تحديد أسعار الصرف بناءً على أسعار السوق الآنية لحظة تأكيد المعاملة برمز PIN. بمجرد تأكيد العملية يتم تثبيت السعر ولا يجوز المطالبة بفروقات تقلبات لاحقة.'
              : 'Exchange rates are locked upon entering the security PIN. Once confirmed, rates are fixed against market volatility.'}
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
