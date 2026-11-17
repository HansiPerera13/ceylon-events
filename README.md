# Ceylon Events 🇱🇰

**Name:** `GAHJ Perera`
**Student ID:** `FGS/MSc/CS/2025/020`
**Course:** COSC 64173 – Mobile Computing, Assignment 01 (University of Kelaniya)

🎥 **Demo video:** `<PASTE YOUR UNLISTED YOUTUBE / GOOGLE DRIVE LINK HERE>`

---

## 1. What is the application?

**Ceylon Events** is a multi-screen React Native (Expo, JavaScript) app for discovering and bookmarking local events in Sri Lanka – music nights, food festivals, cultural shows, sports and tech meetups.

**Problem it solves:** Event information is scattered across social media posts and posters. This app gathers events in one place, lets users filter by category, bookmark the ones they care about, and get a notification/reminder so they don't forget them.

## 2. Screens and their purpose

There are **4 screens** (plus 2 modals):

| # | Screen | File | Purpose |
|---|--------|------|---------|
| 1 | Events (tab) | `app/(tabs)/events/index.js` | Lists all events in a `FlatList`; **Filter modal** to filter by category; heart icon to bookmark. |
| 2 | Event Details (stack) | `app/(tabs)/events/[id].js` | Full event info, add/remove favorite, schedule a reminder (10 s), back button. |
| 3 | Favorites (tab) | `app/(tabs)/favorites.js` | Shows bookmarked events (shared state); **confirmation modal** before removing. |
| 4 | Status (tab) | `app/(tabs)/settings.js` | Shows live AppState, number of background→foreground returns, and a "test notification" button. |

**Modals:** Category filter (bottom sheet) on screen 1; "Remove favorite?" confirmation on screen 3.

## 3. Core React Native components used

| Component | Where used |
|-----------|-----------|
| `View`, `Text` | All screens and components |
| `Image` | `src/components/EventCard.js`, `events/[id].js` (event photos) |
| `Pressable` | Cards, heart icon, filter/confirm/reminder buttons (all screens) |
| `FlatList` | `events/index.js` (all events), `favorites.js` (bookmarked events) |
| `Modal` | `events/index.js` (filter), `favorites.js` (confirm removal) |
| `ScrollView` | `events/[id].js` |
| `Alert` | `events/[id].js` (reminder confirmation) |
| `AppState` | `src/context/AppContext.js` |

Hard-coded data lives in `src/data/events.js` (10 events with titles, categories, dates, venues, prices and descriptions).

## 4. Expo Router structure

```
app/
├── _layout.js              # Root Stack + AppProvider (global state) + WelcomeBackBanner
└── (tabs)/
    ├── _layout.js          # Tab navigator: Events | Favorites | Status
    ├── events/             # NESTED STACK inside the Events tab
    │   ├── _layout.js      # Stack layout (header + back button)
    │   ├── index.js        # /events          -> event list
    │   └── [id].js         # /events/:id      -> dynamic detail screen
    ├── favorites.js        # /favorites
    └── settings.js         # /settings (Status)
src/
├── components/             # EventCard, WelcomeBackBanner
├── context/AppContext.js   # shared state + AppState listener
├── data/events.js          # hard-coded data
└── services/notifications.js
```

- **Tabs:** `app/(tabs)/_layout.js` uses `<Tabs>`; the Favorites tab shows a badge with the count.
- **Nested stack:** `events/_layout.js` uses `<Stack>`; pressing a card does `router.push('/events/<id>')`, and the header back arrow / "Back to events" button calls `router.back()`.
- Favorites can also open `/events/<id>` – back returns correctly.

## 5. State management

`src/context/AppContext.js` creates a React Context built on `useState`. It holds `favorites` (array of event ids) and exposes `toggleFavorite`, `removeFavorite` and `isFavorite`. Because the provider wraps the whole app in `app/_layout.js`, a heart tapped on the Events list or Detail screen instantly appears on the Favorites tab and updates its badge.

## 6. AppState (background → foreground)

In `AppContext.js`, `AppState.addEventListener('change', ...)` compares the previous state with the next one. When it goes from `inactive`/`background` to `active`, the app:
- increments a "foreground count",
- stores the time of the last resume,
- shows a "👋 Welcome back!" banner for ~3.5 s.

These values are also shown on the **Status** tab. The listener is removed in the `useEffect` cleanup.

## 7. Local notifications – research & implementation

**Approach:**
1. Read the Expo docs for `expo-notifications` and learned that local notifications need (a) a notification handler, (b) user permission, and (c) an Android notification channel.
2. Installed with `npx expo install expo-notifications` and added it to `plugins` in `app.json`.
3. Created `src/services/notifications.js`:
   - `setNotificationHandler` so alerts display while the app is open.
   - `setupNotifications()` requests permission and creates the Android channel (called once at startup).
   - `sendNow()` – immediate notification (`trigger: null`).
   - `scheduleReminder()` – scheduled notification using a `TIME_INTERVAL` trigger.
4. Wired them to the UI:
   - Bookmarking an event → **"Event bookmarked! 🎉"** (immediate).
   - "Remind me in 10 seconds" on the detail screen → scheduled reminder.
   - "Send test notification" on the Status tab.
5. Tested on a real device; the reminder is visible even if the app is put in the background after scheduling.

> Note: Notifications must be tested on a physical device or emulator with notification permission granted.

## 8. Run the project locally

```bash
# 1. Clone
git clone <YOUR-REPO-URL>
cd ceylon-events

# 2. Install dependencies
npm install
npx expo install --fix      # aligns package versions with your Expo SDK

# 3. Start
npx expo start
```
Then scan the QR code with **Expo Go** (Android/iOS), or press `a` (Android emulator) / `i` (iOS simulator).

## 9. Demo checklist (what the video shows)
- [x] Explanation of the populated event data
- [x] Navigating between tabs and opening a detail screen (and going back)
- [x] Favoriting an event and seeing it on the Favorites tab
- [x] AppState: background → foreground banner + counter
- [x] Local notification ("Event bookmarked!" and the 10-second reminder)
