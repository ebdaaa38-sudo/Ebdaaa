import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export const HelpScreen: React.FC = () => {
  const { lang, showToast, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      qEn: 'How long does an international transfer take to arrive?',
      qAr: 'كم تستغرق الحوالة الدولية لتصل إلى المستفيد؟',
      aEn: 'Most transfers via EbdAaa Express Network are completed within 5 to 15 minutes for Cash Pickup and Mobile Wallets, and 1 to 2 business hours for direct bank deposits.',
      aAr: 'تصل معظم الحوالات عبر شبكة إبداع إكسبريس في غضون 5 إلى 15 دقيقة للحوالات النقدية والمحافظ الإلكترونية، وخلال 1 إلى 2 ساعة عمل للإيداع البنكي المباشر.',
    },
    {
      qEn: 'What documents are required to pick up cash at a branch or partner network?',
      qAr: 'ما هي المستندات المطلوبة لاستلام الحوالة النقدية من الفرع أو الوكيل؟',
      aEn: 'The beneficiary must present the original valid Government ID (National ID or Passport) and provide the 12-character Reference Number (e.g. EBD-2026-XXXX).',
      aAr: 'يجب على المستفيد إبراز أصل إثبات الهوية الساري (بطاقة الهوية الوطنية أو جواز السفر) وتزويد الموظف برقم الحوالة المرجعي (مثل EBD-2026-XXXX).',
    },
    {
      qEn: 'Can I cancel or modify a transfer after confirming it?',
      qAr: 'هل يمكنني إلغاء أو تعديل الحوالة بعد إرسالها؟',
      aEn: 'Yes, if the transfer status is still "Pending" or "Processing" or has not been collected yet. You can contact support or visit your nearest branch with your reference number.',
      aAr: 'نعم، ما دامت الحوالة في حالة "قيد المعالجة" أو "جاهزة للاستلام" ولم يتم سحبها بعد، يمكنك طلب الإلغاء واسترداد المبلغ عبر خدمة العملاء أو أقرب فرع.',
    },
    {
      qEn: 'How does EbdAaa Exchange protect my financial data and funds?',
      qAr: 'كيف تضمن صرافة إبداع حماية أموالي وبياناتي المالية؟',
      aEn: 'We operate under strict central bank regulatory licenses, using 256-bit bank-grade encryption, biometric authentication, and strict Anti-Money Laundering (AML) monitoring.',
      aAr: 'نعمل بترخيص رسمي خاضع لإشراف البنك المركزي، ونستخدم تشفيراً بنكياً 256-بت ومصادقة حيوية ورقابة صارمة لمكافحة غسل الأموال وحماية المعاملات.',
    },
    {
      qEn: 'Are there hidden fees when exchanging currencies?',
      qAr: 'هل هناك أي رسوم خفية عند إجراء صرافة العملات؟',
      aEn: 'No, EbdAaa Exchange offers 0% commission on standard retail counter currency exchange. What you see on the screen is the exact rate locked.',
      aAr: 'لا، تقدم صرافة إبداع عمولة 0% على تبديل العملات النقدية في الفروع بدون أي رسوم خفية. السعر المحسوب في الشاشة هو السعر الصافي الفعلي.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.qEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.qAr.includes(searchQuery) ||
      f.aEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.aAr.includes(searchQuery)
  );

  const handleSupportAction = (channel: string) => {
    showToast(
      lang === 'ar'
        ? `جاري تحويلك إلى خدمة عملاء صرافة إبداع (${channel})`
        : `Connecting you to EbdAaa Support via ${channel}...`
    );
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('help.title')}
        subtitle={t('help.subtitle')}
        showBack={true}
      />

      <div className="p-4 flex-1 space-y-4">
        {/* Support Channels Grid */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleSupportAction('WhatsApp')}
            className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 flex flex-col items-center text-center transition-colors cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400 mb-1" />
            <span className="text-[11px] font-bold text-white">
              {lang === 'ar' ? 'واتساب مباشر' : 'WhatsApp'}
            </span>
            <span className="text-[9px] text-emerald-400 font-semibold">24/7 Live</span>
          </button>

          <button
            type="button"
            onClick={() => handleSupportAction('Phone')}
            className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 flex flex-col items-center text-center transition-colors cursor-pointer"
          >
            <Phone className="w-5 h-5 text-blue-400 mb-1" />
            <span className="text-[11px] font-bold text-white">
              {lang === 'ar' ? 'اتصال مجاني' : 'Toll-Free'}
            </span>
            <span className="text-[9px] text-slate-400 font-mono">800-124-EBD</span>
          </button>

          <button
            type="button"
            onClick={() => handleSupportAction('Email')}
            className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 flex flex-col items-center text-center transition-colors cursor-pointer"
          >
            <Mail className="w-5 h-5 text-amber-400 mb-1" />
            <span className="text-[11px] font-bold text-white">
              {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Us'}
            </span>
            <span className="text-[9px] text-slate-400">support@ebdaaa</span>
          </button>
        </div>

        {/* Search FAQs */}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder={t('help.searchFaq')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 ps-10 pe-4 text-xs text-slate-100 placeholder-slate-500 outline-hidden focus:border-emerald-500"
          />
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider px-1">
            {lang === 'ar' ? 'الأسئلة الشائعة الأكثر تكراراً' : 'Frequently Asked Questions'}
          </h3>

          {filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full p-3.5 text-start flex items-center justify-between gap-2 cursor-pointer hover:bg-slate-850"
                >
                  <span className="text-xs font-bold text-white leading-snug">
                    {lang === 'ar' ? faq.qAr : faq.qEn}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-3.5 pb-3.5 pt-1 text-[11px] text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/40">
                    {lang === 'ar' ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
