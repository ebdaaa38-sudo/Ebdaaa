import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  User,
  ShieldCheck,
  Phone,
  Mail,
  FileText,
  Calendar,
  Award,
  CheckCircle2,
  Lock,
  Edit2,
  Share2,
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { lang, user, updateUser, showToast, navigateTo, t } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ fullName, phone, email });
    setIsEditing(false);
    showToast(lang === 'ar' ? 'تم حفظ بيانات الملف الشخصي بنجاح' : 'Profile updated successfully');
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('profile.title')}
        subtitle={t('profile.subtitle')}
        showBack={true}
        rightAction={
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? t('beneficiaries.cancel') : t('profile.editProfile')}</span>
          </button>
        }
      />

      <div className="p-4 flex-1 space-y-4">
        {/* Profile Header Hero */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 text-center relative overflow-hidden space-y-3">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-slate-950 font-black text-2xl flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/40">
            {user.fullName
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')}
          </div>

          <div>
            <h3 className="text-base font-bold text-white">{user.fullName}</h3>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{user.tier} {t('home.verifiedUser')}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-start text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/70">
              <span className="text-[10px] text-slate-400 block">{t('profile.membershipId')}</span>
              <span className="font-mono font-bold text-slate-200">EBD-884920</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/70">
              <span className="text-[10px] text-slate-400 block">{t('profile.memberSince')}</span>
              <span className="font-mono font-bold text-slate-200">{user.joinedDate}</span>
            </div>
          </div>
        </div>

        {/* Edit or View Info */}
        {isEditing ? (
          <form onSubmit={handleSave} className="p-4 rounded-3xl bg-slate-900 border border-emerald-500/40 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400">{t('profile.editProfile')}</h4>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">
                {t('profile.fullName')}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">
                {t('profile.phone')}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">
                {t('profile.email')}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-hidden focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
            >
              {t('beneficiaries.save')}
            </button>
          </form>
        ) : (
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {t('profile.personalInfo')}
            </h4>

            <div className="space-y-2.5 divide-y divide-slate-800/70">
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>{t('profile.phone')}</span>
                </div>
                <span className="font-mono font-bold text-white">{user.phone}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>{t('profile.email')}</span>
                </div>
                <span className="font-mono text-slate-200">{user.email}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>{t('profile.idNumber')}</span>
                </div>
                <span className="font-mono text-slate-300">{user.idNumber}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{t('profile.kycStatus')}</span>
                </div>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t('profile.kycVerified')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Transfer Limits & Tier Card */}
        <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-300">{t('profile.dailyLimit')}</span>
            <span className="font-mono font-black text-emerald-400">
              {(user.dailyLimit ?? 50000).toLocaleString()} {user.currency}
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[24%]" />
          </div>

          <div className="flex justify-between text-[10px] text-slate-500">
            <span>2,400 {user.currency} used today</span>
            <span>47,600 {user.currency} remaining</span>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
