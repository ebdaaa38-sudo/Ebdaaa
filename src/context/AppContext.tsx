import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ScreenName,
  TransferStatus,
  ExchangeRate,
  Currency,
  Beneficiary,
  Transaction,
  Branch,
  AppNotification,
  UserProfile,
} from '../types';
import {
  SUPPORTED_CURRENCIES,
  INITIAL_EXCHANGE_RATES,
  INITIAL_BENEFICIARIES,
  INITIAL_TRANSACTIONS,
  INITIAL_BRANCHES,
  INITIAL_NOTIFICATIONS,
  INITIAL_USER,
} from '../data/initialData';
import { getTranslation, Language } from '../locales/i18n';

interface AppContextType {
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
  currentScreen: ScreenName;
  screenHistory: ScreenName[];
  navigateTo: (screen: ScreenName) => void;
  goBack: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
  user: UserProfile;
  updateUser: (fields: Partial<UserProfile>) => void;
  currencies: Currency[];
  rates: ExchangeRate[];
  updateRate: (currencyCode: string, buyRate: number, sellRate: number) => void;
  updateExchangeRate: (currencyCode: string, buyRate: number, sellRate: number) => void;
  beneficiaries: Beneficiary[];
  addBeneficiary: (b: Omit<Beneficiary, 'id'>) => Beneficiary;
  updateBeneficiary: (id: string, b: Partial<Beneficiary>) => void;
  deleteBeneficiary: (id: string) => void;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id' | 'refNumber' | 'date'>) => Transaction;
  updateTransactionStatus: (refNumber: string, status: TransferStatus) => void;
  selectedTransaction: Transaction | null;
  setSelectedTransaction: (tx: Transaction | null) => void;
  branches: Branch[];
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  markAllNotificationsRead: () => void;
  addBroadcastNotification: (titleEn: string, titleAr: string, messageEn: string, messageAr: string) => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  activeTrackingRef: string;
  setActiveTrackingRef: (ref: string) => void;
  previewDevice: 'phone' | 'full';
  setPreviewDevice: (mode: 'phone' | 'full') => void;
  quickToast: string | null;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language initialization: default to Arabic as requested by client (صرافة إبداع)
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('ebdaaa_lang');
    return (saved === 'en' || saved === 'ar') ? saved : 'ar';
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenName>('splash');
  const [screenHistory, setScreenHistory] = useState<ScreenName[]>(['splash']);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('ebdaaa_logged_in') === 'true';
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ebdaaa_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [rates, setRates] = useState<ExchangeRate[]>(() => {
    const saved = localStorage.getItem('ebdaaa_rates');
    return saved ? JSON.parse(saved) : INITIAL_EXCHANGE_RATES;
  });

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(() => {
    const saved = localStorage.getItem('ebdaaa_beneficiaries');
    return saved ? JSON.parse(saved) : INITIAL_BENEFICIARIES;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('ebdaaa_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [branches] = useState<Branch[]>(INITIAL_BRANCHES);

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('ebdaaa_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [activeTrackingRef, setActiveTrackingRef] = useState<string>('EBD-2026-9430');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [previewDevice, setPreviewDevice] = useState<'phone' | 'full'>('phone');
  const [quickToast, setQuickToast] = useState<string | null>(null);

  // Sync language with HTML dir and lang
  const setLanguage = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('ebdaaa_lang', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Sync data to localStorage
  useEffect(() => {
    localStorage.setItem('ebdaaa_logged_in', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('ebdaaa_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ebdaaa_rates', JSON.stringify(rates));
  }, [rates]);

  useEffect(() => {
    localStorage.setItem('ebdaaa_beneficiaries', JSON.stringify(beneficiaries));
  }, [beneficiaries]);

  useEffect(() => {
    localStorage.setItem('ebdaaa_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('ebdaaa_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const showToast = (msg: string) => {
    setQuickToast(msg);
    setTimeout(() => setQuickToast(null), 3000);
  };

  const navigateTo = (screen: ScreenName) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen);
    } else {
      // Fallback
      setCurrentScreen('home');
      setScreenHistory(['home']);
    }
  };

  const updateUser = (fields: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...fields }));
  };

  const updateRate = (currencyCode: string, buyRate: number, sellRate: number) => {
    setRates((prev) =>
      prev.map((r) =>
        r.currencyCode === currencyCode
          ? {
              ...r,
              buyRate,
              sellRate,
              lastUpdated: 'Just now (Admin)',
            }
          : r
      )
    );
    showToast(lang === 'ar' ? 'تم تحديث سعر الصرف بنجاح' : 'Rate updated successfully');
  };

  const addBeneficiary = (b: Omit<Beneficiary, 'id'>): Beneficiary => {
    const newBen: Beneficiary = {
      ...b,
      id: `ben-${Date.now()}`,
      avatarBg: ['bg-emerald-600', 'bg-blue-600', 'bg-purple-600', 'bg-amber-600', 'bg-teal-600'][
        Math.floor(Math.random() * 5)
      ],
    };
    setBeneficiaries((prev) => [newBen, ...prev]);
    showToast(lang === 'ar' ? 'تمت إضافة المستفيد بنجاح' : 'Beneficiary added successfully');
    return newBen;
  };

  const updateBeneficiary = (id: string, b: Partial<Beneficiary>) => {
    setBeneficiaries((prev) => prev.map((item) => (item.id === id ? { ...item, ...b } : item)));
    showToast(lang === 'ar' ? 'تم تحديث بيانات المستفيد' : 'Beneficiary updated');
  };

  const deleteBeneficiary = (id: string) => {
    setBeneficiaries((prev) => prev.filter((item) => item.id !== id));
    showToast(lang === 'ar' ? 'تم حذف المستفيد' : 'Beneficiary removed');
  };

  const addTransaction = (tx: Omit<Transaction, 'id' | 'refNumber' | 'date'>): Transaction => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const refNumber = `EBD-2026-${randomCode}`;
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`,
      refNumber,
      date: dateStr,
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Deduct user balance and limit
    setUser((prev) => ({
      ...prev,
      balance: Math.max(0, prev.balance - (tx.totalPaid || tx.sendAmount)),
      usedLimit: (prev.usedLimit ?? 0) + tx.sendAmount,
    }));

    // Add push notification for this transfer
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'transfer',
      titleEn: `Transfer ${refNumber} Initiated`,
      titleAr: `تم إنشاء الحوالة رقم ${refNumber}`,
      messageEn: `Your transfer of ${tx.sendAmount} ${tx.sendCurrency} to ${tx.beneficiaryName} is being processed.`,
      messageAr: `حوالتك بمبلغ ${tx.sendAmount} ${tx.sendCurrency} لصالح ${tx.beneficiaryName} قيد المعالجة الآن.`,
      date: 'Just now',
      read: false,
      refNumber,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    return newTx;
  };

  const updateTransactionStatus = (refNumber: string, status: TransferStatus) => {
    setTransactions((prev) =>
      prev.map((item) => (item.refNumber === refNumber ? { ...item, status } : item))
    );

    // Notify user
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'transfer',
      titleEn: `Transfer ${refNumber} Updated`,
      titleAr: `تحديث مسار الحوالة ${refNumber}`,
      messageEn: `Status updated to: ${status}`,
      messageAr: `تم تحديث حالة الحوالة إلى: ${getTranslation('ar', `tracking.status.${status}`)}`,
      date: 'Just now',
      read: false,
      refNumber,
    };
    setNotifications((prev) => [notif, ...prev]);
    showToast(lang === 'ar' ? `تم تغيير حالة الحوالة إلى ${status}` : `Transfer status changed to ${status}`);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast(lang === 'ar' ? 'تم تحديد جميع الإشعارات كمقروءة' : 'All notifications marked as read');
  };

  const addBroadcastNotification = (
    titleEn: string,
    titleAr: string,
    messageEn: string,
    messageAr: string
  ) => {
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'system',
      titleEn,
      titleAr,
      messageEn,
      messageAr,
      date: 'Just now',
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);
    showToast(lang === 'ar' ? 'تم إرسال التعميم لجميع الأجهزة' : 'Announcement broadcasted successfully');
  };

  const t = (path: string, params?: Record<string, string | number>) => {
    return getTranslation(lang, path, params);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLanguage,
        t,
        currentScreen,
        screenHistory,
        navigateTo,
        goBack,
        isLoggedIn,
        setIsLoggedIn,
        user,
        updateUser,
        currencies: SUPPORTED_CURRENCIES,
        rates,
        updateRate,
        updateExchangeRate: updateRate,
        beneficiaries,
        addBeneficiary,
        updateBeneficiary,
        deleteBeneficiary,
        transactions,
        addTransaction,
        updateTransactionStatus,
        selectedTransaction,
        setSelectedTransaction,
        branches,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        markAllNotificationsRead: markAllNotificationsAsRead,
        addBroadcastNotification,
        isAdmin,
        setIsAdmin,
        activeTrackingRef,
        setActiveTrackingRef,
        previewDevice,
        setPreviewDevice,
        quickToast,
        toastMessage: quickToast,
        showToast,
        logout: () => {
          setIsLoggedIn(false);
          localStorage.removeItem('ebdaaa_logged_in');
          navigateTo('login');
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
