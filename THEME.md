# Light & Dark Theme

**Rule:** never hard-code colors like `bg-white`.

Define **semantic colors**, then map them to Light and Dark palettes.

The exact colors can be finalized later during the UI design stage. The values below are the recommended starting point.

---

## Semantic colors

Do not write:

```tsx
<View className="bg-white" />
```

Define these tokens instead:

| Token | Role |
| --- | --- |
| Background | App / screen background |
| Surface | Raised panels, sheets, secondary areas |
| Card | Cards and grouped content |
| Primary | Brand / primary actions |
| Secondary | Secondary actions and accents |
| Text | Primary readable text |
| TextMuted | Secondary / supporting text |
| Border | Dividers and outlines |
| Success | Correct answers, completed goals |
| Warning | Caution, incomplete, approaching limits |
| Error | Wrong answers, validation, failures |

Use these tokens everywhere: screens, components, charts, and NativeWind classes.

---

## Two themes

### ☀️ Light

| Token | Value |
| --- | --- |
| Background | `#F8FAFC` |
| Surface | `#FFFFFF` |
| Text | `#0F172A` |
| Muted | `#64748B` |
| Border | `#E2E8F0` |
| Primary | Brand color |

### 🌙 Dark

| Token | Value |
| --- | --- |
| Background | `#0F172A` |
| Surface | `#1E293B` |
| Text | `#F8FAFC` |
| Muted | `#94A3B8` |
| Border | `#334155` |
| Primary | Brand color |

Card, Secondary, Success, Warning, and Error should follow the same Light / Dark split once brand and feedback colors are chosen.

---

## Appearance options

Give users **3 options**. Default is **System**.

```
Appearance

○ Light
○ Dark
● System
```

| Option | Behavior |
| --- | --- |
| Light | Always use the light theme |
| Dark | Always use the dark theme |
| System *(default)* | Follow the phone appearance |

If the user’s phone is in dark mode → the app uses dark mode.

If the phone is in light mode → the app uses light mode.

---

## How it should work

1. Define semantic color tokens once.
2. Map those tokens to Light and Dark values.
3. Default appearance to **System**.
4. Persist the user’s choice (Light / Dark / System) in settings.
5. Never hard-code `white`, `black`, or one-off hex values in screens.

This keeps the IELTS Mentor UI consistent across Home, Practice, Mentor, Progress, and Profile.
