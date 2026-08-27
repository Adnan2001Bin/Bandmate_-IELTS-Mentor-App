# Bandmate — IELTS Mentor

A personal AI IELTS mentor built with Expo and React Native. There is no backend: every data source is a mock service behind a typed contract.

See `TRACKING.md` for phase-by-phase status, `APP_DESCRIPTION.md` for product requirements, and `DEVELOPMENT_PLAN.md` for the build order.

## Running it

```bash
npm install
npm start
```

Then open the project in Expo Go, or press `a` / `i` for a simulator.

| Script | What it does |
| --- | --- |
| `npm start` | Expo dev server |
| `npm run android` / `npm run ios` / `npm run web` | Start on a specific platform |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint via `expo lint` |
| `npm run format` | Prettier over `src/` |
| `npm run theme` | Regenerate `src/theme/global.css` from the palette |

## Stack

Expo SDK 54 · TypeScript · Expo Router · NativeWind · Reanimated · Gesture Handler · Lucide · SVG · TanStack Query · Zustand · React Hook Form + Zod.

The SDK is pinned to 54 because Expo Go supports exactly one SDK at a time and that is the newest build available on the target device. Upgrading the SDK requires a matching Expo Go, or a custom dev build.

Gluestack UI is deliberately not used — the Modernist design system is zero-radius and rule-driven, so its defaults would be overridden almost entirely. Skia, Lottie and a chart library are not installed either; nothing in the design references needs them yet.

## Structure

```
src/
  app/          Expo Router routes — file-based, one folder per feature area
  components/   ui/ (foundational) · ielts/ (skill-specific) · ai/ (Mira)
  features/     Feature modules: hooks, logic and local state per domain
  services/     api/ (HTTP client) · contracts/ (interfaces) · mock/ (implementations)
  mocks/        Raw mock data, imported only by services
  store/        Zustand stores — client state only
  lib/          Query client, device storage
  hooks/        Cross-cutting hooks
  theme/        Palette, tokens, provider, navigation theme
  types/        Shared domain types
  utils/        Pure helpers
```

## How data flows

```
Screen → hook → services.<domain> → contract → mock implementation → mocks/
```

Screens never import from `mocks/` and never call `fetch`. `src/services/index.ts` is the only module that decides whether a contract resolves to a mock or to HTTP, so pointing the app at a real API is a one-file change once `EXPO_PUBLIC_API_URL` is set (see `.env.example`).

## Theming

`src/theme/palette.ts` is the single source of truth for color. `npm run theme` regenerates `src/theme/global.css` from it, which is what NativeWind class names resolve against; `useTheme()` exposes the same values for navigation chrome, the status bar and SVG.

Appearance is Light / Dark / **System (default)**, persisted to device storage. Never hard-code a color in a screen — use a semantic class such as `bg-background` or `text-text-muted`.
