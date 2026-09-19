import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  MapPin,
  Phone,
  Navigation,
  Clock,
  Search,
  CheckCircle2,
  Building2,
  Share2,
} from 'lucide-react';
import { Branch } from '../types';

export const BranchesScreen: React.FC = () => {
  const { lang, branches, showToast, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0]);

  const cities = ['all', 'Riyadh', 'Jeddah', 'Dubai', 'Dammam', 'Sanaa', 'Cairo'];

  const filtered = branches.filter((b) => {
    if (selectedCity !== 'all' && b.cityEn !== selectedCity) return false;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      b.nameEn.toLowerCase().includes(q) ||
      b.nameAr.includes(q) ||
      b.addressEn.toLowerCase().includes(q) ||
      b.addressAr.includes(q) ||
      b.cityEn.toLowerCase().includes(q) ||
      b.cityAr.includes(q)
    );
  });

  const handleCall = (phone: string, branchName: string) => {
    window.open(`tel:${phone.replace(/\s+/g, '')}`, '_self');
    showToast(lang === 'ar' ? `جاري الاتصال بـ ${branchName}` : `Calling ${branchName}...`);
  };

  const handleDirections = (branch: Branch) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}`;
    window.open(url, '_blank');
    showToast(
      lang === 'ar'
        ? `جاري فتح الاتجاهات إلى ${branch.nameAr}`
        : `Opening navigation to ${branch.nameEn}`
    );
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-between bg-slate-950 text-slate-100 overflow-y-auto">
      <Header
        title={t('branches.title')}
        subtitle={t('branches.subtitle')}
        showBack={true}
      />

      <div className="p-4 flex-1 space-y-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder={t('branches.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 ps-10 pe-4 text-xs text-slate-100 placeholder-slate-500 outline-hidden focus:border-emerald-500"
          />
        </div>

        {/* City Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCity(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCity === c
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {c === 'all' ? t('branches.allCities') : c}
            </button>
          ))}
        </div>

        {/* Interactive Map Visual Simulation */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-3 overflow-hidden relative shadow-lg">
          <div className="w-full h-36 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-850 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-800">
            {/* Map Grid Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(#10b981 1px, transparent 1px), radial-gradient(#64748b 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 10px',
              }}
            />

            {/* Pinned Branch Markers */}
            <div className="relative z-10 flex items-center gap-6">
              {branches.slice(0, 4).map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBranch(b)}
                  className={`flex flex-col items-center group transition-transform ${
                    selectedBranch?.id === b.id ? 'scale-125' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg cursor-pointer ${
                      selectedBranch?.id === b.id
                        ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/30 font-bold'
                        : 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-300 mt-1 bg-slate-950/80 px-1.5 py-0.5 rounded-md border border-slate-800">
                    {b.cityEn}
                  </span>
                </button>
              ))}
            </div>

            {/* Map overlay badge */}
            <div className="absolute top-2 start-2 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>
                {lang === 'ar' ? 'فروع صرافة إبداع المعتمدة' : 'EbdAaa Authorized Branches'}
              </span>
            </div>
          </div>
        </div>

        {/* Branches Cards List */}
        <div className="space-y-3">
          {filtered.map((branch) => {
            const isSelected = selectedBranch?.id === branch.id;
            return (
              <div
                key={branch.id}
                onClick={() => setSelectedBranch(branch)}
                className={`p-4 rounded-2xl border transition-all space-y-3 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-950/30'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Name & Status */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-white">
                      {lang === 'ar' ? branch.nameAr : branch.nameEn}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {lang === 'ar' ? branch.addressAr : branch.addressEn}
                    </p>
                  </div>

                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                      branch.isOpen
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {branch.isOpen ? t('branches.openNow') : t('branches.closed')}
                  </span>
                </div>

                {/* Working Hours & Phone */}
                <div className="space-y-1 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="text-[11px]">
                      {lang === 'ar' ? branch.hoursAr : branch.hoursEn}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="text-[11px] font-mono text-slate-300">{branch.phone}</span>
                  </div>
                </div>

                {/* Services badges */}
                <div className="flex flex-wrap gap-1">
                  {branch.services.map((srv) => (
                    <span
                      key={srv}
                      className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800 text-[10px]"
                    >
                      {t(`branches.${srv}`)}
                    </span>
                  ))}
                </div>

                {/* Call & Directions Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCall(branch.phone, lang === 'ar' ? branch.nameAr : branch.nameEn);
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('branches.call')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDirections(branch);
                    }}
                    className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{t('branches.directions')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
