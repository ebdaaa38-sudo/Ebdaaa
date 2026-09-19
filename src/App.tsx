import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AndroidFrame } from './components/AndroidFrame';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { OtpScreen } from './screens/OtpScreen';
import { HomeScreen } from './screens/HomeScreen';
import { MoneyTransferScreen } from './screens/MoneyTransferScreen';
import { CurrencyExchangeScreen } from './screens/CurrencyExchangeScreen';
import { ExchangeRatesScreen } from './screens/ExchangeRatesScreen';
import { CurrencyCalculatorScreen } from './screens/CurrencyCalculatorScreen';
import { BeneficiariesScreen } from './screens/BeneficiariesScreen';
import { TransferTrackingScreen } from './screens/TransferTrackingScreen';
import { TransactionHistoryScreen } from './screens/TransactionHistoryScreen';
import { TransactionDetailsScreen } from './screens/TransactionDetailsScreen';
import { BranchesScreen } from './screens/BranchesScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { HelpScreen } from './screens/HelpScreen';
import { TermsScreen } from './screens/TermsScreen';
import { PrivacyScreen } from './screens/PrivacyScreen';
import { AdminDashboardScreen } from './screens/AdminDashboardScreen';

const ScreenRouter: React.FC = () => {
  const { currentScreen, toastMessage } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'login':
        return <LoginScreen />;
      case 'register':
        return <RegisterScreen />;
      case 'otp':
        return <OtpScreen />;
      case 'home':
        return <HomeScreen />;
      case 'transfer':
        return <MoneyTransferScreen />;
      case 'exchange':
        return <CurrencyExchangeScreen />;
      case 'rates':
        return <ExchangeRatesScreen />;
      case 'calculator':
        return <CurrencyCalculatorScreen />;
      case 'beneficiaries':
        return <BeneficiariesScreen />;
      case 'tracking':
        return <TransferTrackingScreen />;
      case 'history':
        return <TransactionHistoryScreen />;
      case 'details':
        return <TransactionDetailsScreen />;
      case 'branches':
        return <BranchesScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'help':
        return <HelpScreen />;
      case 'terms':
        return <TermsScreen />;
      case 'privacy':
        return <PrivacyScreen />;
      case 'admin':
        return <AdminDashboardScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <AndroidFrame>
      {renderScreen()}

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="absolute bottom-20 inset-x-4 z-50 pointer-events-none flex justify-center animate-bounce">
          <div className="bg-slate-900/95 border border-emerald-500/60 text-white px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2 max-w-xs text-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </AndroidFrame>
  );
};

export default function App() {
  return (
    <AppProvider>
      <ScreenRouter />
    </AppProvider>
  );
}
