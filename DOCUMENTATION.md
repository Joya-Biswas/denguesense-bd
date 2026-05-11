# DengueSense BD - Complete Documentation

> AI-Powered Dengue Outbreak Early Warning System for Bangladesh
> Built for the BEAR Summit 2026 AI App Development Challenge

---

## Table of Contents

1. [What Is This App?](#1-what-is-this-app)
2. [The Big Picture - How It All Fits Together](#2-the-big-picture)
3. [Technology Stack Explained](#3-technology-stack-explained)
4. [Project Structure - File by File](#4-project-structure)
5. [How the Code Functions](#5-how-the-code-functions)
6. [Screen-by-Screen Breakdown](#6-screen-by-screen-breakdown)
7. [Data Flow](#7-data-flow)
8. [How to Run the App](#8-how-to-run-the-app)
9. [How to Build the APK](#9-how-to-build-the-apk)
10. [Glossary - Tech Terms Explained Simply](#10-glossary)
11. [Common Questions People Will Ask You](#11-common-questions)

---

## 1. What Is This App?

**DengueSense BD** is a mobile application designed to help Bangladesh's public health officials predict and respond to dengue fever outbreaks before they become epidemics.

### The Problem It Solves
- Bangladesh suffers severe dengue outbreaks every monsoon season
- Health authorities currently react AFTER outbreaks happen, not before
- Community Health Workers (CHWs) collect data manually, often too late
- There is no unified system showing risk across all 48 Dhaka wards

### What This App Does
- **Predicts outbreaks** 7, 14, or 21 days in advance using AI
- **Maps risk** across all 48 Dhaka wards visually
- **Alerts officials** when intervention is needed
- **Tracks CHW reports** in real-time
- **Manages vector control** operations (fogging, larvicide)
- **Monitors satellite data** (temperature, rainfall, vegetation)
- **Analyzes trends** across years and demographics

### Who Uses It
- Public Health Officers (Bangladesh Ministry of Health)
- Community Health Workers (CHWs) in the field
- Vector Control Teams (mosquito control operations)
- Disease Surveillance Analysts
- Local Government Officials

---

## 2. The Big Picture

### How It Works (Simple Version)

```
┌─────────────────────────────────────────────────────┐
│  DATA SOURCES                                        │
│  • NASA satellite (temperature, rainfall, vegetation)│
│  • CHW field reports (fever cases, suspected dengue) │
│  • Historical case data                              │
└─────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│  AI MODEL (Spatio-Temporal Graph Neural Network)     │
│  Combines all signals to predict risk per ward       │
└─────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│  THE APP (What You Built)                            │
│  Shows predictions, alerts, and management tools     │
└─────────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────┐
│  ACTION                                              │
│  Officials deploy fogging, larvicide, awareness      │
│  campaigns BEFORE outbreaks happen                   │
└─────────────────────────────────────────────────────┘
```

### Important: This Is The Frontend Only
This app uses **realistic mock (fake) data** that simulates what the real AI model would produce. There is no actual backend or AI running. The app is a complete, production-quality demonstration of the user interface and user experience.

In a real deployment, the data store (`useDataStore.ts`) would fetch from a backend API instead of using static files.

---

## 3. Technology Stack Explained

Each technology was chosen for a specific reason. Here's what each one does:

### Core Framework

| Technology | Version | What It Does | Why We Use It |
|------------|---------|--------------|---------------|
| **React Native** | 0.81 | Lets you write one codebase that runs on iOS and Android | Native performance with web-like development |
| **Expo SDK** | 54 | Wrapper around React Native that simplifies setup, builds, and native features | No need to configure Xcode/Android Studio manually |
| **TypeScript** | 5.x (strict mode) | JavaScript with types - catches errors before runtime | Prevents bugs, makes code self-documenting |

### Navigation & Routing

| Technology | What It Does |
|------------|--------------|
| **Expo Router v3** | File-based routing (like Next.js) — every file in `/app` becomes a screen |
| **React Native Gesture Handler** | Native-feeling swipes, drags, and gestures |

### State Management

| Technology | What It Does |
|------------|--------------|
| **Zustand** | Stores app data globally so any screen can read/write it. Simpler than Redux. |

We have **two stores**:
- `useAppStore` - UI state (theme, language, sidebar)
- `useDataStore` - Domain data (wards, alerts, reports, etc.)

### Styling

| Technology | What It Does |
|------------|--------------|
| **NativeWind v4** | Tailwind CSS for React Native (utility-class styling) |
| **Tailwind CSS** | Pre-configured CSS classes like `bg-green-500`, `p-4` |

We mostly use inline `style={{ }}` props with the design system colors for direct control.

### Animations & Interactions

| Technology | What It Does |
|------------|--------------|
| **React Native Reanimated v3** | Smooth, 60fps animations running on the native UI thread |
| **Moti** | Easy animation API built on top of Reanimated |
| **Expo Haptics** | Vibrates the phone for tactile feedback (light/medium/heavy) |

### UI Elements

| Technology | What It Does |
|------------|--------------|
| **@expo/vector-icons** | 5,000+ icons (MaterialCommunityIcons, Ionicons) |
| **Victory Native XL** | Charts and data visualization |
| **React Native SVG** | Renders scalable vector graphics (used by charts) |

### Data Handling

| Technology | What It Does |
|------------|--------------|
| **date-fns** | Date math (e.g., "3 hours ago", "tomorrow at 5pm") |
| **expo-secure-store** | Encrypted storage for tokens and sensitive data |
| **expo-notifications** | Push notification handling |

---

## 4. Project Structure

```
denguesense-bd/
│
├── app/                          ← Every file here = a screen (Expo Router)
│   ├── _layout.tsx              ← Root layout (loads on app start)
│   │
│   ├── (tabs)/                   ← Bottom tab navigation group
│   │   ├── _layout.tsx          ← Defines the 5 bottom tabs
│   │   ├── index.tsx            ← Tab 1: Risk Map (the home screen)
│   │   ├── forecast.tsx         ← Tab 2: AI Forecast Engine
│   │   ├── alerts.tsx           ← Tab 3: Alert Centre
│   │   ├── reports.tsx          ← Tab 4: CHW Reports
│   │   └── more.tsx             ← Tab 5: More menu
│   │
│   ├── satellite.tsx             ← Satellite Data screen
│   ├── interventions.tsx         ← Vector Control Tracker
│   ├── analytics.tsx             ← Analytics & Reports
│   └── settings.tsx              ← App Settings
│
├── src/                          ← All non-screen code
│   │
│   ├── types/
│   │   └── index.ts             ← TypeScript interfaces (Ward, Alert, etc.)
│   │
│   ├── data/                     ← Mock data (simulates real API)
│   │   ├── wards.ts             ← 48 Dhaka wards
│   │   ├── forecasts.ts         ← Forecast data for 7/14/21 days
│   │   ├── satellite.ts         ← LST, rainfall, NDVI, water
│   │   ├── chw.ts               ← Community Health Worker reports
│   │   ├── alerts.ts            ← 15 alert objects
│   │   ├── interventions.ts     ← 12 vector control operations
│   │   └── analytics.ts         ← Season, demographic, drift data
│   │
│   ├── store/                    ← Zustand state management
│   │   ├── useAppStore.ts       ← Theme, language, UI state
│   │   └── useDataStore.ts      ← All app data + actions
│   │
│   ├── constants/
│   │   ├── colors.ts            ← Design system color palette
│   │   └── translations.ts      ← English + Bengali strings
│   │
│   ├── hooks/                    ← Reusable logic
│   │   ├── useTheme.ts          ← Returns dark/light colors
│   │   ├── useHaptics.ts        ← Wraps haptic feedback API
│   │   └── useCountAnimation.ts ← Animates numbers counting up
│   │
│   └── components/
│       ├── shared/               ← Used across multiple screens
│       │   ├── MetricCard.tsx   ← Stat box (icon + label + value)
│       │   ├── StatusBadge.tsx  ← Color-coded status pills
│       │   └── SectionHeader.tsx ← Page section titles
│       │
│       ├── ward/
│       │   ├── WardCard.tsx     ← Risk grid card
│       │   └── WardDetailSheet.tsx ← Bottom sheet popup
│       │
│       ├── charts/               ← Data visualizations
│       └── alerts/
│           └── AlertCard.tsx    ← Alert list row
│
├── assets/                       ← Images and fonts
│   ├── icon.png                  ← App icon
│   ├── adaptive-icon.png        ← Android adaptive icon
│   └── splash.png               ← Launch screen
│
├── android/                      ← Native Android project (auto-generated)
│
├── app.json                      ← Expo configuration (app name, package, etc.)
├── babel.config.js               ← JavaScript transpilation rules
├── tailwind.config.js            ← NativeWind / Tailwind setup
├── tsconfig.json                 ← TypeScript compiler options
├── eas.json                      ← APK build configuration
└── package.json                  ← Dependencies list
```

---

## 5. How the Code Functions

### The App Lifecycle (When Someone Opens the App)

1. **App launches** → Expo starts → splash screen appears
2. **`app/_layout.tsx` runs** → sets up the root navigation Stack
3. **Routes to `(tabs)/_layout.tsx`** → renders the bottom tab bar
4. **Default tab loads** → `app/(tabs)/index.tsx` (Risk Map screen)
5. **Risk Map screen** → reads wards data from `useDataStore`
6. **User interacts** → taps a ward → triggers haptic + opens modal
7. **User actions** → update state via store actions → UI re-renders

### State Management Pattern (Zustand)

Zustand is much simpler than Redux. Here's how it works:

**Defining a store:**
```typescript
// In useDataStore.ts
export const useDataStore = create((set) => ({
  alerts: [...],                          // The data
  acknowledgeAlert: (alertId) =>          // The action
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId ? { ...a, status: 'acknowledged' } : a
      ),
    })),
}));
```

**Using it in a screen:**
```typescript
// In any screen
const alerts = useDataStore((state) => state.alerts);
const acknowledgeAlert = useDataStore((state) => state.acknowledgeAlert);

// When user taps acknowledge:
<Button onPress={() => acknowledgeAlert(alert.id)} />
```

When state changes, **only the components that use that data re-render**. This is fast and efficient.

### Theme System

The `useTheme()` hook returns the right colors based on the device's dark/light mode:

```typescript
const { colors, isDark } = useTheme();
// colors.background, colors.text, colors.primary, etc.
```

Every component uses `colors.text` instead of hardcoded `#111827`, so dark mode works automatically.

### Internationalization (Bengali Support)

The `translations.ts` file holds two dictionaries — English and Bengali. The `useAppStore` tracks the current language:

```typescript
const language = useAppStore((state) => state.language);  // 'en' or 'bn'
const t = translations[language];

<Text>{t.riskMap}</Text>   // Renders "Risk Map" or "ঝুঁকি মানচিত্র"
```

When user toggles language in Settings → all text in the app updates instantly.

### Haptic Feedback Strategy

Haptics make the app feel "real" and premium. Strategy:

| Interaction | Haptic Level |
|-------------|-------------|
| Navigation tap, filter pill | **Light** |
| Card selection, button press, form submit | **Medium** |
| Critical action (deploy alert, emergency) | **Heavy + Notification** |

```typescript
const { light, medium, heavy } = useHaptics();
<TouchableOpacity onPress={() => { medium(); doAction(); }} />
```

---

## 6. Screen-by-Screen Breakdown

### Screen 1: Risk Map (`app/(tabs)/index.tsx`)
**The home screen.**

- **Header**: Logo + app name + notification bell
- **City Selector**: Dhaka / Chattogram / Sylhet pills
- **Summary Strip**: 4 metrics — Monitored, Critical, High, AUROC
- **Ward Grid**: 48 wards in 2-column grid, color-coded by risk
- **Bottom Sheet**: Tapping a ward opens detailed view with all metrics
- **Pull-to-refresh**: Drag down to simulate data refresh

**How it works:**
1. Reads `wards` array from `useDataStore`
2. `FlatList` with `numColumns={2}` renders each `WardCard`
3. Tapping a ward sets `selectedWardId` in local state
4. Modal opens showing detail view from the same `wards` array
5. Action buttons (Trigger Alert / Schedule Fogging) trigger haptics + close modal

### Screen 2: Forecast Engine (`app/(tabs)/forecast.tsx`)
**AI prediction visualization.**

- **Horizon Selector**: 7-day / 14-day / 21-day toggle
- **Forecast Chart**: Predicted vs actual cases (placeholder visualization)
- **Performance Metrics**: AUROC, Sensitivity, Specificity, F1 Score
- **Feature Importance**: Bar chart showing what drives predictions
- **Run New Forecast**: Button that simulates re-running the model

**How it works:**
1. `selectedHorizon` is stored in `useDataStore` (`'7day'` / `'14day'` / `'21day'`)
2. Different `forecasts` data is shown based on selection
3. "Run New Forecast" shows a 2-second loading state then re-renders

### Screen 3: Alert Centre (`app/(tabs)/alerts.tsx`)
**Manage health alerts.**

- **Summary**: Active count, response rate, avg response time
- **Filters**: Severity (Critical/High/Moderate) + Status (Pending/Acknowledged/Deployed/Resolved)
- **Alert List**: Color-coded cards with action buttons
- **Acknowledge Button**: Marks alert as reviewed
- **Deploy Button**: Triggers vector control, marks as deployed

**How it works:**
1. `useMemo` filters alerts by severity + status (efficient — only re-runs when filters change)
2. `acknowledgeAlert(id)` and `deployAlert(id)` are store actions that update the alert
3. Buttons disabled when status is `deployed` or `resolved`
4. Heavy haptic + notification when deploying (life-or-death importance)

### Screen 4: CHW Reports (`app/(tabs)/reports.tsx`)
**Field worker submissions.**

- **Summary**: Total reports, submitted, alerts triggered
- **Search Bar**: Filter by CHW name or ward
- **Report List**: Each report shows CHW, ward, fever count, dengue suspect count, status
- **Simulate New Report**: Button that adds a new row to the list

**How it works:**
1. `searchText` state filters list via `useMemo`
2. Each report row shows fever/dengue badges and status pill
3. "Simulate" creates a fake report with random values and prepends to the array

### Screen 5: More Menu (`app/(tabs)/more.tsx`)
**Navigation hub for non-tab screens.**

- 4 menu items: Satellite / Interventions / Analytics / Settings
- System Health panel: 5 pipeline stages with health dots
- Each menu item navigates to its respective screen via `router.push()`

### Screen 6: Satellite Data (`app/satellite.tsx`)
**Earth observation feeds.**

- Cards for LST (Land Surface Temperature), Rainfall, Water Body Index, NDVI
- Each card shows: current value, source, "Live" badge, export button
- 12-week trend chart placeholder

### Screen 7: Intervention Tracker (`app/interventions.tsx`)
**Vector control operations.**

- **Cost Summary**: Operations this month, total cost, cases averted
- **Coverage Bars**: Animated bars for Fogging / Larvicide / Awareness
- **Operations List**: Each operation card shows ward, type, team, cost
- **FAB (Floating Action Button)**: Opens modal to schedule new operation

### Screen 8: Analytics (`app/analytics.tsx`)
**Trends and reporting.**

- Season Comparison (5 years)
- Contribution Calendar (365-day grid)
- City Comparison (Dhaka vs Chattogram vs Sylhet)
- Demographic Donut (age groups)
- Model Drift Monitor (AUROC over time)
- Generate Report button

### Screen 9: Settings (`app/settings.tsx`)
**Configuration.**

- **Data Sources**: Toggle satellite, CHW, weather feeds
- **Notifications**: Push notification switch
- **Language**: English / বাংলা buttons
- **Model Management**: Retrain button (5-step animated progress)
- **App Info**: Version, build, model details

---

## 7. Data Flow

### Where Data Lives

```
src/data/*.ts (static mock files)
        ↓
useDataStore (Zustand store - in memory)
        ↓
Components read via useDataStore((s) => s.wards)
        ↓
User actions call store methods (acknowledgeAlert, etc.)
        ↓
Store updates → Components re-render
```

### Why This Pattern?
- **Easy to swap to real API later**: Replace static imports with `fetch()` calls
- **Testable**: All logic lives in pure functions
- **Predictable**: One source of truth for each piece of data
- **Performant**: Components subscribe only to slices they need

### Adding Real Backend Later (Future Work)

Replace this:
```typescript
import { wards } from '../data/wards';
// ... in store
wards: wards
```

With this:
```typescript
// In store
wards: [],
fetchWards: async () => {
  const response = await fetch('https://api.denguesense.bd/wards');
  set({ wards: await response.json() });
}
```

Everything else stays the same — components don't need to change.

---

## 8. How to Run the App

### Prerequisites

You need these installed on your computer:
- **Node.js 18+** (download from nodejs.org)
- **npm** (comes with Node.js)
- **Android Studio** (only needed for APK builds)
- **Expo Go app** on your phone (for instant testing — get from Play Store)

### First-Time Setup

```powershell
# 1. Navigate to the project folder
cd C:\Users\remix\OneDrive\Desktop\DengueProject\denguesense-bd

# 2. Install all dependencies
npm install --legacy-peer-deps
```

### Running in Development

```powershell
# Start the Expo dev server
npx expo start --clear
```

This opens a terminal showing:
- A QR code (scan with Expo Go app)
- Options: press `a` for Android emulator, `w` for web

### Testing on Your Phone (Easiest)

1. Install **Expo Go** from the Play Store on your Android phone
2. Make sure your phone and computer are on the same WiFi
3. Run `npx expo start` on your computer
4. Open Expo Go app and scan the QR code
5. The app loads on your phone in seconds

### Testing on Android Emulator

1. Open Android Studio → Device Manager → Create Virtual Device
2. Run `npx expo start --android`
3. App launches in the emulator automatically

---

## 9. How to Build the APK

An APK is the installable Android package file. There are two ways to build it:

### Method 1: Local Gradle Build (Used in This Project)

```powershell
# Step 1: Generate native Android code
cd C:\Users\remix\OneDrive\Desktop\DengueProject\denguesense-bd
npx expo prebuild --platform android

# Step 2: Set Android SDK location
# Edit android/local.properties to contain:
# sdk.dir=C:\\Users\\remix\\AppData\\Local\\Android\\sdk

# Step 3: Build the APK
cd android
.\gradlew.bat assembleRelease
```

The APK will be at:
```
android/app/build/outputs/apk/release/app-release.apk
```

### Method 2: EAS Build (Cloud Build, Requires Account)

```powershell
# Install EAS CLI
npm install -g eas-cli

# Configure (one-time)
npx eas build:configure

# Build
npx eas build --platform android --profile preview
```

EAS builds in the cloud and gives you a download link. Requires a free Expo account.

### Verifying the APK

A successful build produces an APK between **20MB and 80MB**. To install:
1. Copy the APK to your Android phone
2. Tap the file → Install
3. (You may need to enable "Install unknown apps" in Settings)

---

## 10. Glossary

**APK** — Android Package Kit. The installable app file format for Android, like `.exe` is for Windows.

**AUROC** — Area Under the Receiver Operating Characteristic curve. A metric (0–1) that measures how well an AI model distinguishes between outbreak/no-outbreak. 0.91 = excellent.

**Backend** — Server-side code (databases, APIs). Our app has none — it uses mock data.

**Bottom Sheet** — A panel that slides up from the bottom of the screen (like Google Maps' place details).

**CHW** — Community Health Worker. A field worker who visits homes, identifies fever cases, and submits reports.

**Component** — A reusable piece of UI (a button, a card, a screen).

**Dengue** — A mosquito-borne viral infection. Causes severe outbreaks in Bangladesh during monsoon.

**EAS** — Expo Application Services. Cloud build infrastructure for React Native apps.

**Expo** — A framework that simplifies React Native development.

**FlatList** — A React Native component that efficiently renders long scrollable lists.

**Gradle** — The build tool that compiles Android apps.

**Haptics** — Phone vibration patterns that provide tactile feedback.

**Hook** — A function in React that lets components reuse logic (e.g., `useState`, `useEffect`).

**LST** — Land Surface Temperature. Measured by satellites; used as input to predict mosquito breeding.

**MaterialCommunityIcons** — A free icon library with thousands of icons.

**Mock Data** — Fake but realistic data used for testing/demos when no real backend exists.

**Modal** — A popup window that overlays the main screen.

**NDVI** — Normalized Difference Vegetation Index. A satellite measure of plant health/coverage.

**npm** — Node Package Manager. Installs JavaScript libraries.

**React Native** — Framework for building native iOS/Android apps using React (web-style code).

**Reanimated** — Library for smooth animations on the native UI thread (60fps).

**ST-GNN** — Spatio-Temporal Graph Neural Network. The type of AI model used to predict outbreaks (we don't actually run one — we mock its outputs).

**State** — Data that can change over time in the app (e.g., the current alert filter).

**Store** — A central place where state is managed (Zustand store).

**TypeScript** — JavaScript with type checking. Catches errors before runtime.

**Vector Control** — Mosquito control activities (fogging, larvicide spraying).

**Ward** — A small administrative subdivision of Dhaka. We track 48 of them.

**Zustand** — A lightweight state management library.

---

## 11. Common Questions

### "What does this app actually do?"
It's a dengue outbreak early warning system for Bangladesh. It shows public health officials which neighborhoods (wards) in Dhaka are at risk of outbreaks, predicts what will happen in the next 7/14/21 days, and helps coordinate the response (fogging operations, alerts, CHW field reports).

### "Is the AI real?"
The app **simulates** AI outputs with realistic mock data. The infrastructure to display, manage, and act on AI predictions is fully built — but the actual ML model (an ST-GNN) would be a separate service that the app fetches from. This is a frontend prototype demonstrating the complete user experience.

### "Why React Native instead of native Android?"
React Native lets you build apps for both iOS and Android from one codebase, with about 90% of the performance of native code. For a country like Bangladesh where users are split between iOS and Android, this saves enormous development time. The Bangladesh Ministry of Health could deploy this same app to both platforms.

### "Why TypeScript?"
TypeScript catches bugs before users see them. When you misspell a property like `ward.naam` instead of `ward.name`, TypeScript flags it immediately. In a health app where mistakes can affect lives, this safety is critical.

### "Why Zustand instead of Redux?"
Zustand has 10x less boilerplate code than Redux for the same functionality. For an app of this size, Redux would add complexity without benefit.

### "How does dark mode work?"
The app reads the device's system preference (`useColorScheme()`). All components consume colors from `useTheme()` instead of hardcoded values, so the entire app adapts automatically.

### "How does Bengali language support work?"
Every visible string is in `translations.ts` keyed by both `en` and `bn`. Components fetch text via `t.riskMap` instead of hardcoding "Risk Map". Toggling the language in Settings changes the language code in `useAppStore`, which causes every screen to re-render with the new strings.

### "Why does the app feel so smooth?"
- **Reanimated v3** runs animations on the native thread (UI thread), not JavaScript thread — so even if JS is busy, animations stay at 60fps.
- **Haptic feedback** on every interaction makes it feel physically real.
- **`React.memo`** prevents unnecessary re-renders.
- **`useCallback` / `useMemo`** prevent recomputing expensive operations.
- **`FlatList`** virtualizes long lists (only renders visible items).

### "How would you scale this to a real product?"
1. **Add a backend** — replace `src/data/*.ts` with API calls.
2. **Train the actual ML model** — ST-GNN on real Bangladesh case data.
3. **Add authentication** — login for officials, role-based permissions.
4. **Add real-time push notifications** — deploy alerts via Firebase/Expo Push.
5. **Connect satellite APIs** — NASA MODIS, TRMM, etc.
6. **Build CHW data collection** — let field workers submit reports from this same app.
7. **Multi-city support** — extend beyond Dhaka to all of Bangladesh.

### "Why do you need so many libraries?"
Each one solves a specific problem you'd otherwise have to write yourself:
- Charts (Victory Native) — drawing graphs from scratch is weeks of work
- Icons (Vector Icons) — saves designing/exporting 100+ icons
- Date math (date-fns) — handling timezones, formatting is notoriously hard
- Animations (Reanimated) — native-thread animations are extremely complex
- Routing (Expo Router) — nested navigation is a major engineering challenge

### "How long would this take to build from scratch?"
For an experienced React Native developer: **4-6 weeks**. The architecture decisions (which state library, which charting library, theme system, i18n setup) typically take longer than the visible UI work.

### "Could this run on cheap phones?"
Yes. The app targets Android API level 24 (Android 7.0), released in 2016. With `FlatList` virtualization and `React.memo` optimization, it runs smoothly on low-end devices common in Bangladesh.

### "Where's the splash screen / app icon?"
The current build uses Expo's default splash and icon. In production, you'd add a custom green medical-cross icon at `assets/icon.png` (1024×1024) and a splash screen at `assets/splash.png`.

### "What if I want to change a feature?"
1. **UI change**: Edit the relevant file in `app/`.
2. **Data change**: Edit the mock file in `src/data/`.
3. **State logic change**: Edit `src/store/useDataStore.ts`.
4. **New translation**: Add a key to both `en` and `bn` in `src/constants/translations.ts`.
5. **New color**: Add to `src/constants/colors.ts`.

### "Is this production-ready?"
The architecture, code quality, and UX are production-ready. To deploy publicly you would need:
- Real backend with authentication
- Trained ML model
- App Store / Play Store listings
- Privacy policy and terms of service
- Localization beyond English/Bengali if needed
- Penetration testing
- HIPAA-equivalent health data compliance review

---

## Quick Reference: Key Commands

```powershell
# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npx expo start --clear

# Type-check the entire codebase
npx tsc --noEmit

# Generate Android native code
npx expo prebuild --platform android

# Build APK locally
cd android; .\gradlew.bat assembleRelease

# Build APK in cloud
npx eas build --platform android --profile preview
```

## Quick Reference: Key Files to Know

| File | What's In It |
|------|--------------|
| `app.json` | App name, package ID, permissions |
| `app/_layout.tsx` | Root navigation setup |
| `app/(tabs)/_layout.tsx` | Bottom tab bar config |
| `src/store/useDataStore.ts` | All app data and actions |
| `src/constants/colors.ts` | Color palette |
| `src/constants/translations.ts` | English + Bengali strings |
| `src/types/index.ts` | TypeScript interfaces |
| `package.json` | List of all dependencies |

---

**Built for BEAR Summit 2026 AI App Development Challenge**
**Project: DengueSense BD**
**Status: Frontend prototype, production-quality architecture**
