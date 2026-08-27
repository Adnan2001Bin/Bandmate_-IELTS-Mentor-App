# Recommended React Native Frontend Stack

**Goal:** A modern, clean, premium educational-app look — not a pile of UI libraries.

**Ideal starting combination:**

```
Expo + TypeScript + Expo Router + NativeWind + Gluestack UI
+ Reanimated + Gesture Handler + Lucide Icons + SVG
+ TanStack Query + Zustand
```

Then add Skia, Lottie, charts, camera, and audio **only where the feature actually needs them**.

The key is not using 20 UI libraries. A strong design system, consistent typography/spacing, good animations, and well-designed IELTS-specific components will make the app look much more professional.

---

## Recommended Stack Overview

```
React Native + Expo
        │
        ├── Expo Router
        ├── NativeWind
        ├── Gluestack UI
        ├── React Native Reanimated
        ├── React Native Gesture Handler
        ├── React Native SVG
        ├── React Native Skia
        ├── Lucide Icons
        ├── TanStack Query
        ├── Zustand
        ├── React Hook Form + Zod
        └── Expo AV / Audio
```

You don’t need all of them. Use the sections below to choose.

---

## Table of Contents

1. [React Native + Expo](#1--react-native--expo)
2. [Expo Router](#2--expo-router)
3. [NativeWind](#3--nativewind)
4. [UI Component Library](#4--ui-component-library)
5. [React Native Reanimated](#5--react-native-reanimated)
6. [Gesture Handler](#6--gesture-handler)
7. [Icons](#7--icons)
8. [Charts & Progress](#8--charts--progress)
9. [SVG](#9--svg)
10. [React Native Skia](#10--react-native-skia)
11. [Audio / Speaking UI](#11--audio--speaking-ui)
12. [Writing Editor](#12--writing-editor)
13. [AI Chat UI](#13--ai-chat-ui)
14. [Lottie Animations](#14--lottie-animations)
15. [Illustrations](#15--illustrations)
16. [Design System](#16--design-system)
17. [Dark Mode](#17--dark-mode)
18. [Bottom Navigation](#18--bottom-navigation)
19. [Home Screen Design](#19--home-screen-design)
20. [Micro-interactions](#20--micro-interactions)
21. [Skeleton Loading](#21--skeleton-loading)
22. [Bottom Sheets](#22--bottom-sheets)
23. [Haptic Feedback](#23--haptic-feedback)
24. [Recommended UI Stack](#24--recommended-ui-stack)
25. [Guiding Principle](#25--guiding-principle)

---

## 1. ⚛️ React Native + Expo

Since the app needs to be tested on a phone, use **Expo**.

You get:

- Easy Android / iOS development
- Expo Go for quick testing
- Camera
- Audio
- Notifications
- File system
- Image picker
- Secure storage
- Haptics
- Device APIs

For this project, Expo is a very good starting point.

---

## 2. 🧭 Expo Router

Use **Expo Router** for navigation instead of manually configuring navigation everywhere.

File-based routes for login, onboarding, home, practice skills, mentor, and profile fit the IELTS Mentor application very well.

---

## 3. 🎨 NativeWind

For styling, strongly recommend **NativeWind**.

It gives a Tailwind-style approach:

```tsx
<View className="flex-1 bg-white px-5">
```

instead of creating lots of `StyleSheet` objects.

Create a consistent design system:

- Primary
- Secondary
- Background
- Surface
- Text
- Muted
- Success
- Warning
- Error

For an IELTS app, **consistency is extremely important**.

---

## 4. 🧩 UI Component Library — Gluestack UI

Use **Gluestack UI** with NativeWind.

It provides:

- Ready-made components
- Customizable design
- Forms
- Cards
- Dialogs
- Bottom sheets
- Inputs
- Buttons
- Tabs
- Modals

---

## 5. ✨ React Native Reanimated

This is a **must-have** for a polished app.

Use it for:

- Screen transitions
- Progress animations
- Score animations
- Streak animations
- Cards
- Bottom sheets
- Micro-interactions
- Loading states

### Example

When the user completes a test, animate the score instead of instantly showing `6.5`:

```
6.0
 ↓
6.1
 ↓
6.2
 ↓
6.3
 ↓
6.5 🎉
```

Small details like this make the application feel much more professional.

---

## 6. 👆 Gesture Handler

Use **React Native Gesture Handler** for:

- Swipe cards
- Swipe questions
- Bottom sheets
- Drag interactions
- Vocabulary cards
- Interactive components

It works particularly well with Reanimated.

---

## 7. 🎯 Icons

Use **Lucide Icons**.

Map skills to consistent vector icons — not emojis in the actual UI:

| Skill | Icon |
| --- | --- |
| Listening | `<HeadphonesIcon />` |
| Reading | `<BookOpenIcon />` |
| Writing | `<PencilIcon />` |
| Speaking | `<MicIcon />` |
| AI Mentor | `<BotIcon />` |
| Progress | `<ChartIcon />` |

This will make the UI look much more professional.

---

## 8. 📊 Charts & Progress

The app will need charts for:

- IELTS score
- Weekly progress
- Skill comparison
- Study time
- Vocabulary growth
- Mock test history

Use something like **react-native-gifted-charts**, or another maintained React Native chart library.

### Example

```
Your Progress

Band

7.5 ┤
7.0 ┤                 ●
6.5 ┤          ●
6.0 ┤     ●
5.5 ┤ ●
    └────────────────────
      W1  W2  W3  W4
```

The progress dashboard will benefit heavily from good charts.

---

## 9. 🎨 SVG

Use **react-native-svg** for custom graphics.

Useful for:

- Circular progress
- Band score rings
- Custom illustrations
- Progress indicators
- Charts
- Decorative elements

### Example

```
       ╭─────────╮
       │   6.5   │
       │  BAND   │
       ╰─────────╯
```

You can make this much more visually interesting with SVG.

---

## 10. 🚀 React Native Skia

Optional, but very powerful.

If you want really beautiful visuals:

- Animated graphs
- Interactive charts
- Background effects
- Particle effects
- Advanced progress animations
- Audio visualizations
- AI speaking waveform

Skia can make the app look much more premium.

**Don’t use it everywhere.** Use it only for areas where normal React Native isn’t enough.

---

## 11. 🎤 Audio / Speaking UI

The Speaking section needs special UI.

### Example

```
           🎤

      Listening...

     ───────●───────

       01:32 / 02:00

         [ Stop ]
```

Create:

- Voice waveform
- Recording animation
- Microphone animation
- Recording timer
- Playback UI

For Expo, use the **current Expo audio APIs** rather than old audio packages.

---

## 12. ✍️ Writing Editor

The writing editor is another important UI.

### Layout

```
┌─────────────────────────────┐
│ Task 2              38:42   │
├─────────────────────────────┤
│                             │
│ Some people believe that... │
│                             │
├─────────────────────────────┤
│ Your Answer                 │
│                             │
│ Technology has changed...   │
│                             │
│                             │
├─────────────────────────────┤
│ Words: 327                  │
│                             │
│             [ Submit ]      │
└─────────────────────────────┘
```

### Important UI features

- Sticky timer
- Word counter
- Keyboard-aware layout
- Auto-save indicator
- Character counter
- Submit confirmation
- Draft recovery

---

## 13. 🤖 AI Chat UI

The AI Mentor should **not** look like a generic ChatGPT clone.

Create an IELTS-specific interface.

### Example

```
┌─────────────────────────────┐
│ 🤖 IELTS Mentor             │
│                             │
│ Good evening, Adnan! 👋     │
│                             │
│ Your speaking improved      │
│ this week by 0.5 band.      │
│                             │
│ What would you like to      │
│ practice today?             │
│                             │
│ [ Speaking ] [ Writing ]    │
│ [ Vocabulary ] [ Grammar ]  │
│                             │
│ Ask me anything...          │
└─────────────────────────────┘
```

AI should know the user’s context and provide **contextual suggestions**.

---

## 14. 🪄 Lottie Animations

For small illustrations and celebrations, use **Lottie**.

Good places:

| Moment | Reward |
| --- | --- |
| Completed test | 🎉 |
| New personal best | 🏆 |
| Streak | 🔥 |
| Band improvement | 📈 |

Don’t overuse animations. Use them as **rewards**.

---

## 15. 🖼️ Illustrations

Have a consistent illustration style.

### Onboarding

- Student studying
- Student speaking
- Student reading
- AI mentor

### Empty states

> No tests completed yet.

### Success

> Great job! You improved your score.

A consistent illustration style makes the app feel like a real product.

---

## 16. 🎨 Design System

This is probably **more important than any individual library**.

Before building screens, define:

### Colors

- Primary
- Background
- Surface
- Text
- Muted
- Success
- Warning
- Error

### Typography

- Display
- Heading 1
- Heading 2
- Heading 3
- Body
- Body Small
- Caption
- Button

### Spacing

Use a consistent scale:

```
4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48
```

### Border radius

| Token | Value |
| --- | ---: |
| Small | 8 |
| Medium | 12 |
| Large | 16 |
| Card | 20 |
| Pill | 999 |

This prevents every screen from looking different.

---

## 17. 🌙 Dark Mode

Support dark mode **from the beginning**.

The design system should define:

| Token | Light | Dark |
| --- | --- | --- |
| Background | … | … |
| Surface | … | … |
| Text | … | … |
| Muted | … | … |
| Border | … | … |

Don’t build light mode first and then try to “add dark mode” later.

---

## 18. 📱 Bottom Navigation

Keep it simple.

```
┌────────────────────────────────────┐
│                                    │
│              CONTENT               │
│                                    │
├────────────────────────────────────┤
│  🏠       📚       🤖       📊     │
│ Home    Practice  Mentor  Progress │
└────────────────────────────────────┘
```

Profile can be accessed from the Home header.

You don’t need 6–7 bottom navigation items.

---

## 19. 🎯 Home Screen Design

The home screen should be **personalized**, not just a menu.

### Structure

```
Good Morning 👋

Target Band
┌──────────────────────────────┐
│        7.5                   │
│ Current: 6.5                 │
│ ████████████░░░░              │
└──────────────────────────────┘

🔥 12 Day Streak

Today's Plan
┌──────────────────────────────┐
│ 🎤 Speaking                  │
│ 15 minutes                   │
│ [ Start ]                    │
├──────────────────────────────┤
│ 📚 Vocabulary                │
│ 10 words                     │
│ [ Start ]                    │
└──────────────────────────────┘

🤖 AI Mentor
"You should focus on Speaking
Part 2 today."

[ Start Practice ]
```

This feels much more like a mentor than a traditional education app.

---

## 20. 🧠 Micro-interactions

These small things make the app feel premium.

| Event | Feedback |
| --- | --- |
| Correct answer | ✓ Correct — with a subtle animation |
| Wrong answer | ✕ Not quite |
| Completing daily goal | 🎉 Daily goal completed! |
| Improving band | 📈 New personal best! |
| Streak | 🔥 10 day streak |

---

## 21. Skeleton Loading

Don’t show `Loading...` everywhere.

Use skeletons:

```
┌─────────────────────────┐
│ ███████████████         │
│ ████████                │
│                         │
│ █████████████████       │
└─────────────────────────┘
```

This makes the application feel faster.

---

## 22. Bottom Sheets

Very useful for this app.

Use bottom sheets for:

- Question explanations
- AI feedback
- Filters
- Vocabulary details
- Test settings
- Submit confirmation
- Difficulty selection

Instead of navigating to a new screen every time.

---

## 23. Haptic Feedback

Use subtle haptics for:

- Correct answer
- Wrong answer
- Test completed
- Button interaction
- Recording started / stopped
- Achievement unlocked

This is small but makes mobile applications feel much better.

Expo provides haptic capabilities, so this fits the stack.

---

## 24. 🏆 Recommended UI Stack

If building the IELTS Mentor app, keep the stack like this:

### Core

- React Native
- Expo
- TypeScript
- Expo Router

### UI

- NativeWind
- Gluestack UI
- Lucide Icons
- React Native SVG

### Animation

- React Native Reanimated
- React Native Gesture Handler
- Lottie

### Advanced graphics

- React Native Skia *(only where needed)*

### Data / UI state

- TanStack Query
- Zustand
- React Hook Form
- Zod

### Media

- Expo Camera
- Expo Image Picker
- Expo Audio
- Expo Haptics
- Expo Notifications

### Charts

- React Native Gifted Charts

---

## 25. ⭐ Guiding Principle

If you want a modern, clean, premium educational-app look, start with:

**Expo + TypeScript + Expo Router + NativeWind + Gluestack UI + Reanimated + Gesture Handler + Lucide Icons + SVG + TanStack Query + Zustand.**

Then add Skia, Lottie, charts, camera, and audio only where the actual feature needs them.

The key isn’t using 20 UI libraries.

A strong design system, consistent typography/spacing, good animations, and well-designed IELTS-specific components will make the app look much more professional.
