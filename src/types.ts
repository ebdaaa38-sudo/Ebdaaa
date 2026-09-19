export type ScreenName =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'register'
  | 'otp'
  | 'home'
  | 'transfer'
  | 'exchange'
  | 'rates'
  | 'calculator'
  | 'beneficiaries'
  | 'tracking'
  | 'history'
  | 'details'
  | 'branches'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'help'
  | 'terms'
  | 'privacy'
  | 'admin';

export type TransferStatus =
  | 'Pending'
  | 'Processing'
  | 'Sent'
  | 'Ready for Collection'
  | 'Completed'
  | 'Rejected'
  | 'Cancelled';

export type DeliveryMethod = 'bankDeposit' | 'cashPickup' | 'mobileWallet';

export interface Currency {
  code: string;
  nameEn: string;
  nameAr: string;
  symbol: string;
  flag: string;
  countryEn: string;
  countryAr: string;
}

export interface ExchangeRate {
  currencyCode: string;
  baseCode: string; // usually SAR or USD
  buyRate: number;
  sellRate: number;
  change24h: number; // percentage, e.g. +0.15 or -0.42
  high24h: number;
  low24h: number;
  lastUpdated: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  country: string;
  phone: string;
  bankName: string;
  accountNumber: string;
  relationship: string;
  deliveryMethod: DeliveryMethod;
  avatarBg?: string;
}

export interface Transaction {
  id: string;
  refNumber: string;
  date: string;
  type: 'transfer' | 'exchange';
  senderName: string;
  beneficiaryName: string;
  sendAmount: number;
  sendCurrency: string;
  receiveAmount: number;
  receiveCurrency: string;
  exchangeRate: number;
  fee: number;
  vat: number;
  totalPaid: number;
  payoutMethod: DeliveryMethod;
  status: TransferStatus;
  destinationCountry: string;
  purpose?: string;
}

export interface Branch {
  id: string;
  nameEn: string;
  nameAr: string;
  addressEn: string;
  addressAr: string;
  cityEn: string;
  cityAr: string;
  phone: string;
  hoursEn: string;
  hoursAr: string;
  isOpen: boolean;
  lat: number;
  lng: number;
  services: string[];
}

export interface AppNotification {
  id: string;
  type: string;
  titleEn: string;
  titleAr: string;
  messageEn: string;
  messageAr: string;
  date: string;
  time?: string;
  read: boolean;
  refNumber?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  phoneNumber?: string;
  phone?: string;
  email: string;
  nationalId?: string;
  idNumber?: string;
  tier: string;
  verified: boolean;
  monthlyLimit?: number;
  dailyLimit?: number;
  usedLimit?: number;
  balance: number;
  currency: string;
  joinedDate?: string;
  biometricsEnabled?: boolean;
  notificationsEnabled?: boolean;
  rateAlertsEnabled?: boolean;
  securityPin?: string;
}
