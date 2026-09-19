# EbdAaa Exchange Mobile App (تطبيق صرافة إبداع)

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20Web-blue.svg)](https://capacitorjs.com)
[![Language](https://img.shields.io/badge/Language-Arabic%20(RTL)%20%7C%20English-amber.svg)](#)

A modern, production-grade Android financial mobile application built for **EbdAaa Exchange (شركة صرافة إبداع)**. The app supports international money transfers, real-time multi-currency exchange rates, recipient management, transaction tracking, interactive branch locator, robust OTP verification, and a built-in administrative exchange management dashboard.

---

## 🌟 Key Features (المميزات الرئيسية)

- **Bilingual & Bidirectional**: Full Arabic (RTL) and English (LTR) language support with instant toggle.
- **Android Mobile Native Shell**: Tailored mobile UX with status bar, dynamic navigation, bottom sheets, and haptic-feel interactions.
- **Comprehensive Flow (21 Screens)**:
  1. Animated Splash Screen & Brand Identity
  2. Multi-step Onboarding Tour
  3. Secure Login & Register (KYC Onboarding)
  4. Advanced OTP Screen (Auto-paste, 6-digit auto-verify, SMS & WhatsApp selector)
  5. Customer Home Dashboard with Live Balance & Tickers
  6. 4-Step Money Transfer Engine (Currency, Amount, Recipient, PIN Auth)
  7. Currency Exchange Calculator with 30-min Rate Lock
  8. Live Exchange Rates Board with 24h Trends
  9. Beneficiary Directory (Bank, Cash Pickup, Mobile Wallet)
  10. Real-time Remittance Tracker with 5-stage progress timeline
  11. Transaction History & Digital Receipts with QR code verification
  12. Branch Locator with live status & Google Maps navigation
  13. Notification Center for rate alerts and transfer statuses
  14. Profile & KYC Tier Management with daily transfer meters
  15. Admin Dashboard (Real-time buy/sell rate adjustments & status overrides)
- **PWA & Android Ready**: Manifest, standalone viewport, and Capacitor configuration pre-configured with package `com.ebdaaa.exchange`.

---

## 🚀 Quick Start (تشغيل المشروع محلياً)

### Prerequisites
- **Node.js**: v18 or higher
- **npm** or **bun** / **yarn**

### Installation
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Visit `http://localhost:3000` to interact with the mobile app in your browser.

---

## 📱 Android Build & Google Play Deployment (الرفع على متجر جوجل بلاي)

The repository includes `capacitor.config.json` pre-configured for Android builds.

### Step 1: Install Capacitor CLI & Core
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### Step 2: Build Web Assets
```bash
npm run build
```

### Step 3: Initialize Android Project
```bash
npx cap add android
npx cap sync
```

### Step 4: Open in Android Studio
```bash
npx cap open android
```

### Step 5: Generate Signed Android App Bundle (`.aab`)
1. In **Android Studio**, go to **Build** > **Generate Signed Bundle / APK**.
2. Select **Android App Bundle (.aab)** and click **Next**.
3. Create or select your keystore credentials.
4. Build the release bundle.
5. Upload the resulting `.aab` file directly to your [Google Play Console](https://play.google.com/console).

---

## 💼 White-Labeling & Client Sale Kit (التخصيص وإعادة البيع للعملاء)

This application is architected for turnkey white-label deployment for exchange houses, remittance brokers, and financial institutions:

1. **Brand Identity**:
   - Change company name and slogan in `metadata.json` and `src/components/Logo.tsx`.
   - Update color palette in `index.html` and Tailwind classes.
2. **Exchange Rates & Operations**:
   - Connect live rates to your backend API in `src/context/AppContext.tsx` or manage directly via the built-in `/admin` dashboard screen.
3. **SMS OTP Gateway**:
   - Easily connect SMS APIs (such as Taqnyat, Unifonic, Twilio, or Firebase Phone Auth) within `src/screens/OtpScreen.tsx`.

---

## 📄 License
Commercial License / Proprietary for Client Handover.
