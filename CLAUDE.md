# CLAUDE.md — Shannah Vendor App

This file provides AI assistants with essential context about the codebase structure, conventions, and development workflows for the **Shannah Vendor** app (`شنة للتجار`).

---

## Project Overview

**Shannah Vendor** is a React Native/Expo mobile application for home food vendors to manage their store, orders, inventory, wallet, and customer interactions. The app is Arabic-first with forced RTL layout.

- **App Name (Arabic):** شنة للتجار
- **Bundle ID:** com.shannah.vendor
- **Primary Color:** #7B2FBE (purple)
- **Status:** Prototype with mock data — no live backend yet

---

## Repository Structure

```
t8be8-altajer/
├── shannah-vendor/          # Main React Native/Expo application
│   ├── App.js               # Entry point (RTL setup, SafeAreaProvider)
│   ├── app.json             # Expo manifest (name, bundle IDs, permissions)
│   ├── package.json         # Dependencies and scripts
│   ├── index.js             # Expo registerRootComponent
│   ├── android/             # Android native configuration
│   ├── assets/              # Icons, splash screen, adaptive icons
│   └── src/
│       ├── screens/         # 32 screen components organized by user flow
│       │   ├── auth/        # LoginScreen, SignUpScreen, OTPVerification, PasswordReset, NewPassword
│       │   ├── setup/       # StoreInfo, IdentityVerification, StorePreferences, StoreLocation, SetupSuccess
│       │   ├── onboarding/  # OnboardingScreen (3-slide carousel)
│       │   ├── SplashScreen.js
│       │   └── main/
│       │       ├── HomeScreen.js
│       │       ├── orders/  # OrdersList, OrderDetails, OrderPreparation, OrderHandover, OrderCompleted, OrderTracking
│       │       ├── catalog/ # CatalogScreen, AddEditProductScreen
│       │       ├── wallet/  # WalletScreen, PaymentDetailsScreen
│       │       └── profile/ # ProfileScreen, StoreManagement, Notifications, Reviews, ReplyToReview, Promotions, CreatePromo, Chat, EducationalVideos
│       ├── navigation/
│       │   └── AppNavigator.js  # All 47 routes, Stack + Tab navigators
│       ├── store/
│       │   └── useStore.js      # Zustand global state store
│       ├── theme/
│       │   └── index.js         # Design tokens (COLORS, FONTS, SPACING, RADIUS, SHADOWS)
│       ├── components/
│       │   └── index.js         # Reusable UI components (~308 lines)
│       └── data/
│           └── mockData.js      # All mock data entities
├── images/                  # Design mockups and brand screenshots
└── README.md
```

---

## Technology Stack

| Category | Library / Version |
|---|---|
| Framework | React Native 0.83.2 |
| Runtime | Expo 55.0.4 |
| Language | JavaScript / JSX (no TypeScript) |
| State | Zustand 5.0.11 |
| Navigation | React Navigation 7.x (Stack + Bottom Tabs) |
| Maps | react-native-maps 1.27.1 |
| Animations | react-native-reanimated 4.2.2 |
| Gestures | react-native-gesture-handler 2.30.0 |
| Storage | @react-native-async-storage/async-storage 3.0.1 |
| Location | expo-location 55.1.2 |
| Image Picker | expo-image-picker 55.0.10 |
| Document Picker | expo-document-picker 55.0.8 |
| Icons | @expo/vector-icons 15.1.1 |

---

## Development Commands

All commands run from the `shannah-vendor/` directory:

```bash
cd shannah-vendor

# Start Expo development server
npm start

# Run on Android device/emulator
npm run android

# Run on iOS simulator (macOS only)
npm run ios

# Web preview
npm run web
```

> **Note:** There is no TypeScript, no test suite, no linter config, and no CI/CD. This is a prototype-stage project.

---

## Architecture & Key Conventions

### 1. Navigation Flow

```
SplashScreen (2s)
  └── OnboardingScreen (3 slides, shown once)
        └── Auth Stack (Login → SignUp → OTP → PasswordReset)
              └── Setup Stack (StoreInfo → Identity → Preferences → Location → Success)
                    └── Main Tab Navigator
                          ├── Home
                          ├── Orders
                          ├── Catalog
                          ├── Wallet
                          └── Profile
```

All routes are registered in `src/navigation/AppNavigator.js`. To add a new screen, import it there and add a `<Stack.Screen>` entry.

### 2. RTL (Right-to-Left) Layout

The app is **Arabic-first**. RTL is forced globally in `App.js`:

```js
import { I18nManager } from 'react-native';
I18nManager.forceRTL(true);
```

When writing UI code:
- Use `textAlign: 'right'` for Arabic text
- Use `flexDirection: 'row'` carefully — it reverses automatically in RTL
- Test all new screens in RTL context
- All labels, button text, and UI copy should be in Arabic

### 3. State Management (Zustand)

Single store in `src/store/useStore.js`. State slices include:

| Slice | Description |
|---|---|
| `isLoggedIn` | Auth state |
| `isSetupComplete` | Onboarding complete flag |
| `user` | Current user object |
| `store` | Vendor store info |
| `isOnline` | Store online/offline toggle |
| `orders` | Orders array |
| `products` | Catalog products array |
| `transactions` | Wallet transactions |
| `notifications` | Notification list |
| `reviews` | Customer reviews |
| `promotions` | Promotional codes |

Usage in screens:

```js
import useStore from '../store/useStore';

const MyScreen = () => {
  const { orders, updateOrder } = useStore();
  // ...
};
```

Mutations are defined as functions inside the store's `set()` call. Add new actions there.

### 4. Theme System

Import from `src/theme/index.js`:

```js
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    ...SHADOWS.card,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.sizes.lg,
    color: COLORS.text,
  },
});
```

**Key COLORS:**
- `COLORS.primary` — #7B2FBE (purple, main brand)
- `COLORS.secondary` — #F97316 (orange, accents)
- `COLORS.background` — page background
- `COLORS.text` — primary text
- `COLORS.textSecondary` — secondary/muted text
- `COLORS.success`, `COLORS.error`, `COLORS.warning` — status colors
- Order status colors: `COLORS.statusNew`, `COLORS.statusPreparing`, `COLORS.statusReady`, `COLORS.statusDelivery`, `COLORS.statusCompleted`

### 5. Reusable Components

All components are in `src/components/index.js`. Available components:

| Component | Usage |
|---|---|
| `PrimaryButton` | Main CTA buttons (supports `outline`, `disabled` props) |
| `AppInput` | Text inputs with RTL support, icon, multiline |
| `Card` | Shadow-enabled container |
| `StatusBadge` | Order status chip with Arabic label |
| `ScreenHeader` | Navigation header with back button |
| `TabSelector` | Segmented tab switcher |
| `Divider` | Horizontal separator |
| `RowItem` | Row with label/value layout |
| `EmptyState` | Placeholder UI for empty lists |

Example:
```js
import { PrimaryButton, AppInput, Card } from '../components';

<Card>
  <AppInput
    label="اسم المنتج"
    value={name}
    onChangeText={setName}
  />
  <PrimaryButton title="حفظ" onPress={handleSave} />
</Card>
```

### 6. Mock Data

All application data lives in `src/data/mockData.js`. Available exports:

- `MOCK_STORE` — vendor store info
- `MOCK_ORDERS` — 5 orders with various statuses
- `MOCK_PRODUCTS` — 3 sample products
- `MOCK_TRANSACTIONS` — payment history
- `MOCK_NOTIFICATIONS` — 7 notification entries
- `MOCK_REVIEWS` — 3 customer reviews
- `MOCK_PROMOTIONS` — 3 promo codes
- `CATEGORIES` — product categories (Arabic labels)
- `DECLINE_REASONS` — order decline reasons (Arabic)
- `DAYS` — days of the week (Arabic)

When adding new features, add corresponding mock data here before connecting to a real API.

---

## Screen Development Patterns

Every screen follows this structure:

```js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../../theme';
import { PrimaryButton, ScreenHeader } from '../../components';
import useStore from '../../store/useStore';

const MyNewScreen = ({ navigation }) => {
  const { someState, someAction } = useStore();
  const [localState, setLocalState] = useState('');

  return (
    <View style={styles.container}>
      <ScreenHeader title="عنوان الشاشة" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* screen content */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
  },
});

export default MyNewScreen;
```

**Important conventions:**
- Always use `COLORS`, `SPACING`, `FONTS`, `RADIUS` from theme — never hardcode values
- Use `ScrollView` for content that may overflow
- Use `ScreenHeader` component for consistent navigation headers
- All text must be in Arabic
- Handle SafeArea via `SafeAreaView` or use the global provider

---

## Adding a New Screen

1. Create the screen file in the appropriate `src/screens/<flow>/` directory
2. Import and register it in `src/navigation/AppNavigator.js`:
   ```js
   import MyNewScreen from '../screens/main/MyNewScreen';
   // Inside the Stack.Navigator:
   <Stack.Screen name="MyNewScreen" component={MyNewScreen} />
   ```
3. Navigate to it from another screen:
   ```js
   navigation.navigate('MyNewScreen', { param: value });
   ```

---

## Permissions

The following Android permissions are declared in `app.json`:

- `ACCESS_FINE_LOCATION` — store location setup
- `ACCESS_COARSE_LOCATION` — store location setup
- `CAMERA` — product photo capture
- `READ_EXTERNAL_STORAGE` / `WRITE_EXTERNAL_STORAGE` — image/document upload

Expo plugins handle permission flows for `expo-location` and `expo-image-picker`.

---

## Known Limitations & Future Work

- **No backend:** All data is mocked in `mockData.js`. API integration is the next major milestone.
- **No authentication:** Login/signup flows are UI-only with no real auth.
- **No error handling:** No try-catch blocks or error boundaries exist yet.
- **No tests:** No testing infrastructure is set up.
- **No TypeScript:** The codebase is plain JavaScript.
- **No CI/CD:** Builds are done manually via Expo CLI.
- **APK excluded from repo:** The debug APK exceeds GitHub's 100MB limit.

---

## Git Workflow

- Default branch: `master`
- Development PRs are merged into `master`
- APK files (`.apk`) are excluded via root `.gitignore`
- Node modules, Expo cache, and Android build artifacts are gitignored inside `shannah-vendor/`
