# Bandmate — IELTS Mentor · Development Tracking

Living document. Updated at the end of every phase.

- **Current phase:** 05 — Authentication + onboarding + diagnostic
- **Status:** Complete — typecheck, lint, and a signed-out-to-Today walkthrough all pass
- **Next phase:** 06 — Home + Practice hub (do not start without an explicit prompt)

---

## 1. Project overview

**Product:** Bandmate — a personal AI IELTS mentor, not an IELTS question bank.
**Mentor persona:** Mira — a named tutor with a red square "M" monogram, direct and specific in tone, never congratulatory.

**The one question every screen must answer:**
> What should I practise today to get closer to my target band?

**Core loop:**
```
Learn → Practice → Submit → AI feedback → Weakness detected → Plan re-cut → Test → Repeat
```

**Sources of truth**

| Concern | File |
| --- | --- |
| Product requirements | `APP_DESCRIPTION.md` |
| Technology stack | `FRONTEND_STACK.md` |
| Theme architecture | `THEME.md` |
| Visual language | `_ds/modernist-*/`, `Bandmate.dc.html`, `.thumbnail`, `ios-frame.jsx`, `android-frame.jsx` |

**Backend:** none. Every data source is a mock service behind a typed interface, so a real API can replace it without touching a screen.

---

## 2. Design direction (derived from the references)

The deck (`Bandmate.dc.html`) applies the **Modernist** design system to a phone. The rules it establishes:

- **Zero radius everywhere.** No pills, no rounded cards, no floating chips.
- **Rules do the organising.** 2px dividers between sections, 1px between rows. Almost no shadow.
- **Red means "act" or "gap".** The accent is the primary action, the skill below target, and Mira's monogram. Never decoration. Ink carries everything else.
- **Archivo 900 for numbers.** Band scores get display size at −0.05em tracking — the band *is* the product.
- **Flush left.** Headings, copy, and labels inside wide buttons. Buttons are rectangles with a flush-left label and a trailing arrow.
- **Kicker labels.** 11px, 700 weight, 0.12em tracking, uppercase, muted — used above every section.
- **Ink inversion for emphasis.** The single most important block on a screen inverts to ink-on-ground (today's session, "the honest read", fix 01).
- **Mira's voice = a 4px accent left rule** with a heading and one short paragraph.

### Reconciling the references with THEME.md and FRONTEND_STACK.md

| Conflict | Resolution |
| --- | --- |
| `THEME.md` slate palette vs. Modernist ground/ink/red | `THEME.md` states its values are "a recommended starting point" and that colors are finalized at the design stage. Keep its **semantic-token architecture and Light/Dark/System rule**; take the **values** from the design system. |
| `FRONTEND_STACK.md` radius scale (8/12/16/20/999) vs. zero radius | Keep a centralized radius token scale so it stays tunable, but set every step to 0 per the design system. |
| `FRONTEND_STACK.md` progress ring / circular band score | The references never use a ring — band scores are display-size numerals and progress is a flat bar with a target rule. Do not build a ring. |
| `FRONTEND_STACK.md` charts / Skia / Lottie | The only charts in the references are flat bar columns (trajectory) and horizontal bars (skills), buildable with plain views + Reanimated. No chart library, Skia, or Lottie until a feature actually needs one. |
| Gluestack UI vs. a zero-radius rule-driven system | **Resolved — not used.** Its defaults would be overridden almost entirely. NativeWind + our own primitives instead. |

### Theme tokens (proposed values)

| Semantic token | Light | Dark |
| --- | --- | --- |
| `background` | `#F3F2F2` | `#201E1D` |
| `surface` | `#EAE9E9` | `#2D2B2B` |
| `card` | `#EAE9E9` | `#2D2B2B` |
| `text` | `#201E1D` | `#F3F2F2` |
| `textMuted` | `#605D5D` (neutral-700) | `#9B9797` (neutral-500) |
| `border` | `#D7D3D3` (neutral-300) | `#444141` (neutral-800) |
| `divider` | ink @ 40% | ground @ 25% |
| `primary` | `#EC3013` | `#EC3013` |
| `primaryPressed` | `#DD2B0F` (accent-600) | `#FF563C` (accent-400) |
| `onPrimary` | `#F3F2F2` | `#F3F2F2` |
| `inverseSurface` / `onInverse` | `#201E1D` / `#F3F2F2` | `#F3F2F2` / `#201E1D` |
| `success` | accent-free ink treatment (see note) | — |
| `warning` / `error` | `#AE1800` (accent-700) for text-size accent | `#FF9783` (accent-400) |
| `info` | `#605D5D` | `#9B9797` |

*Note on success/warning/error:* the design system is deliberately mono — there is no green. "Correct" is expressed with **ink** (fill or 2px border) and "wrong / gap / act" with **accent red**. `success`/`warning`/`error` tokens still exist so nothing hard-codes a color, but they map onto the ink/accent pair rather than introducing new hues. Body-size accent text uses `accent-700` for contrast, per the design system's own guidance.

**Typography:** Archivo (400/500/600/700/800/900). Headings and all numerals at 800–900 with negative tracking; body at 400–500.
**Spacing:** 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48.
**Radius:** all steps 0.
**Elevation:** three shadow steps defined but used almost nowhere (dialogs only).

---

## 3. Phase list

| # | Phase | Status |
| --- | --- | --- |
| 01 | Analyze & plan | ✅ Complete |
| 02 | Project foundation | ✅ Complete |
| 03 | Design system + light/dark/system theme | ✅ Complete |
| 04 | Navigation + app shell | ✅ Complete |
| 05 | Authentication + onboarding + diagnostic | ✅ Complete |
| 06 | Today (home) + Practice hub | ⬜ Not started |
| 07A | Listening | ⬜ Not started |
| 07B | Reading | ⬜ Not started |
| 07C | Writing | ⬜ Not started |
| 07D | Speaking | ⬜ Not started |
| 07E | Vocabulary + Grammar | ⬜ Not started |
| 08 | AI mentor (Mira) | ⬜ Not started |
| 09 | Mock tests + progress + weaknesses + mistakes | ⬜ Not started |
| 10 | Profile + settings | ⬜ Not started |
| 11 | UI polish | ⬜ Not started |
| 12 | QA + final verification | ⬜ Not started |

---

## 4. Navigation architecture (planned)

Five tabs, per `APP_DESCRIPTION.md` §32, using the deck's naming and tab-bar treatment:

```
TODAY        the default screen — adaptive session card, streak, Mira's flag
PRACTICE     choose your own — the six skills + saved mistakes
MOCK         full test, timed — lobby, sections, band report
MIRA         chat & the plan — daily check-in, live voice, ask anything
PROFILE      progress · mistakes · vocabulary · history · goals · settings
```

Progress lives **inside Profile** rather than as its own tab (decision §10.2). The Today header still links straight to the forecast, so the progress dashboard stays one tap from the default screen.

Cutting across all five: **onboarding + diagnostic** runs once before the tabs exist.

Route groups — ✅ built in Phase 04 except where noted:

```
src/app/
  _layout.tsx        root stack · theme · fonts · session hydration
  +not-found.tsx     ✅
  design-system.tsx  ✅ dev-only gallery, not in the tab bar
  (tabs)/            ✅ index (Today) · practice · mock · mira · profile
  practice/          ✅ listening · reading · writing · speaking · vocabulary · grammar
  mock/              ✅ lobby · report          (runner added in Phase 09)
  progress/          ✅ index · history · weaknesses   (league deferred, §10.4)
  profile/           ✅ goals · settings
  mistakes/          ✅ index                   (detail added in Phase 09)
  (modals)/          ✅ plan-change             (submit-confirm · explanation · filters as needed)
  (auth)/            ✅ welcome · sign-in · sign-up
  (onboarding)/      ✅ goal · target · time · diagnostic-intro · diagnostic · result
```

Each feature owns its own `_layout.tsx` — no single giant routing file. Every route above is typed: `expo-router`'s generated `Href` union is what validates each `router.push`, so a broken link fails at `tsc` rather than at runtime.

---

## 5. Screen checklist

Legend: ⬜ not started · 🟡 in progress · ✅ done

### Auth & onboarding — Phase 05
- ✅ Welcome / "I'm Mira, I'll be your tutor"
- ✅ Sign in (mock)
- ✅ Sign up (mock)
- ✅ Onboarding step 1 — why you're taking IELTS / study goal
- ✅ Onboarding step 2 — target band + test date + Academic / General Training
- ✅ Onboarding step 3 — daily time available
- ✅ Onboarding step 4 — current level / diagnostic hand-off
- ✅ Voice diagnostic (dark, 30s recording)
- ⏭️ Diagnostic sections — 10 listening, 10 reading, 1 writing task — **deferred.** The deck's diagnostic is voice-first and 90 seconds. Full skill papers are the Phase 07 runners, not a second onboarding quiz.
- ✅ Diagnostic result — "your starting point", per-skill bars, plan in one line
- ✅ Plan built / completion

### Today — Phase 06
- ⬜ Today dashboard — Mira's headline, today's session (ink block), forecast + mocks stats, Mira's flag
- ⬜ Session runner shell (chains today's tasks)
- ⬜ Session debrief

### Practice — Phase 06
- ⬜ Practice hub — six skills + saved mistakes

### Listening — Phase 07A
- ⬜ Test selection (sections, difficulty, timed)
- ⬜ Instructions
- ⬜ Player + question runner
- ⬜ Results / score / estimated band
- ⬜ Answer review with explanation
- ⬜ Transcript

### Reading — Phase 07B
- ⬜ Passage / test selection (Academic + General Training)
- ⬜ Passage + questions
- ⬜ Results
- ⬜ Answer review with explanation
- ⬜ Saved difficult questions

### Writing — Phase 07C
- ⬜ Task selection (Task 1 / Task 2, timed or untimed)
- ⬜ Task brief + instructions
- ⬜ Editor with sticky timer, word counter, auto-save, live flags
- ⬜ Submit confirmation (under-length warning)
- ⬜ Analyzing state
- ⬜ Evaluation report — overall band + four criteria
- ⬜ Sentence-level feedback
- ⬜ "Your paragraph, rewritten" + what changed and why
- ⬜ Rewrite-it-yourself exercise
- ⬜ Handwritten: capture → pages → OCR (simulated) → review text → submit

### Speaking — Phase 07D
- ⬜ Speaking setup / mode select
- ⬜ Part 1 · Part 2 (cue card + 1min prep) · Part 3
- ⬜ Live session — recorder, waveform, live coaching cards, live metrics
- ⬜ Debrief — band, four criteria, "the two fixes"
- ⬜ Transcript with timestamps ("hear yourself — 0:41")

### Vocabulary — Phase 07E
- ⬜ Categories
- ⬜ Word list
- ⬜ Word detail — meaning, example, synonyms, IELTS context
- ⬜ Practice / quiz
- ⬜ Spaced-repetition review session
- ⬜ Difficult words

### Grammar — Phase 07E
- ⬜ Categories
- ⬜ Lesson
- ⬜ Practice questions
- ⬜ Explanation
- ⬜ Result / practice again

### Mira — Phase 08
- ⬜ Chat — daily check-in, suggested prompts, action chips that add to the plan
- ⬜ Study plan view
- ⬜ Conversation history
- ⬜ Entry points into speaking / writing / vocabulary / grammar

### Mock tests & progress — Phase 09
- ⬜ Mock list
- ⬜ Mock lobby — timings, exam rules, Mira's prediction
- ⬜ Section runner (Listening → Reading → Writing → Speaking)
- ⬜ Band report — overall, four skills, honest read, question-type breakdown
- ⬜ Plan-change dialog (accept / keep my plan)
- ⬜ Progress dashboard — forecast, trajectory, per-band floor
- ⬜ Practice & score history
- ⬜ Weakness dashboard
- ⬜ League (opt-in) + streak
- ⬜ Mistake notebook — list, categories, detail, practice again

### Profile & settings — Phase 10
- ⬜ Profile hub — links to progress, mistakes, vocabulary, history, goals, settings
- ⬜ Goals — target band, exam date, daily target
- ⬜ Appearance — Light / Dark / System
- ⬜ Notifications
- ⬜ Account
- ⬜ Subscription (see open decision §10)

---

## 6. Component checklist

### Foundational — Phase 03
All in `src/components/ui`, exported from one barrel.

- ✅ `Screen` (safe areas, scroll variant, standard gutter)
- ✅ `Text` (displayLg / display / displaySm / numeral / h1–h4 / body / bodySm / label / kicker / caption)
- ✅ `Button` (primary / secondary / outline / ghost, flush-left label, leading + trailing icon, loading, disabled)
- ✅ `Card` (outlined / filled, optionally pressable)
- ✅ `Rule` (1px row, 2px section, 4px emphasis, accent option)
- ✅ `Tag` (neutral / accent / ink / outline)
- ✅ `Input` / `TextArea` (label, hint, error, focus rule)
- ✅ `SelectionRow` (radio / checkbox, accent-filled when selected)
- ✅ `SegmentedControl` (generic over the option union)
- ✅ `ProgressBar` (animated fill, optional target rule marker)
- ✅ `StepProgress` (segmented top bar)
- ✅ `Monogram` (Mira's red "M" and user initials, 3 sizes)
- ✅ `ListRow` (icon, description, value or chevron, custom accessory)
- ✅ `StatCell` (numeral + kicker, for ruled grids)
- ✅ `Dialog` (scrim, stacked actions)
- ✅ `BottomSheet` (slide-up, drag-to-dismiss, safe-area aware)
- ✅ `Skeleton` (opacity pulse)
- ✅ `EmptyState`
- ✅ `ErrorState` (pairs with `ServiceError`, optional retry)
- ✅ `InkPanel` (inverted emphasis block)
- ❌ `ProgressRing` — **not built.** Listed in `DEVELOPMENT_PLAN.md`, but the design language expresses progress as bars and rules and contains no circular geometry. Add it only if a screen genuinely needs one.

### Shell — Phase 04
In `src/components/layout`.

- ✅ `AppHeader` (kicker + title, optional back, optional trailing action, display / compact)
- ✅ `AppTabBar` (2px top rule, 3px accent rule over the active tab, haptic on change)
- ✅ `Placeholder` (a route that exists so navigation can be built before its feature — every one names the phase that replaces it)

### Auth & onboarding — Phase 05
- ✅ `OnboardingStep` (progress, back, pinned continue)
- ✅ `DateField` (Android dialog, iOS spinner sheet, web overlay picker)
- ✅ `ControlledInput` (React Hook Form + Zod)
- ✅ `MiraMark` (accent square, optional pulse rings)
- ✅ `Waveform` (listening bars)
- ✅ `SkillBar` (now vs. target rule; accent fill when the gap is a full band)

### IELTS-specific — Phases 06–09
- ⬜ `BandScore` (display numeral + delta)
- ✅ `SkillBar` (now vs. target rule) — built in Phase 05 for the diagnostic result
- ⬜ `SkillCard`
- ⬜ `SessionCard`
- ⬜ `MiraNote` (accent left rule + heading + body)
- ⬜ `CriterionRow`
- ⬜ `PlanTaskRow`
- ⬜ `AudioPlayer`
- ⬜ `TestTimer`
- ⬜ `TestProgress`
- ⬜ `QuestionCard`
- ⬜ `AnswerOption` (idle / selected / correct / wrong / dimmed)
- ⬜ `QuestionNavigator`
- ⬜ `ResultCard`
- ⬜ `MistakeRow`
- ⬜ `WritingEditor`
- ⬜ `WordCounter`
- ⬜ `InlineFlag` (underline + tint inside prose)
- ⬜ `SentenceFeedback`
- ⬜ `RewriteCompare`
- ⬜ `SpeakingRecorder` (mic control + state)
- ✅ `Waveform` — built in Phase 05 for the voice diagnostic
- ⬜ `CoachingCard`
- ⬜ `CueCard`
- ⬜ `Transcript`
- ⬜ `VocabularyCard`
- ⬜ `VocabularyDetail`
- ⬜ `GrammarLesson`
- ⬜ `GrammarQuestion`
- ⬜ `ExplanationCard`
- ⬜ `TrajectoryChart` (bar columns, dashed = projected)
- ⬜ `StreakStrip`
- ⬜ `LeagueRow`
- ⬜ `PlanChangeDialog`

---

## 7. Feature checklist

- ✅ Mock authentication + session persistence
- ✅ Onboarding capture: target band, test date, test type, study goal, daily minutes
- ✅ Voice diagnostic + estimated starting band
- ⬜ Adaptive daily plan (mock engine: weakest skill gets the most minutes)
- ⬜ Today's session chaining and debrief
- ⬜ Listening practice + results + transcript
- ⬜ Reading practice + results + explanations
- ⬜ Writing: typed submission, auto-save, draft recovery, AI evaluation, sentence feedback
- ⬜ Writing: handwritten submission with simulated OCR
- ⬜ Speaking: parts 1–3, recording, live coaching, debrief, transcript
- ⬜ Vocabulary + spaced-repetition review
- ⬜ Grammar lessons + practice
- ⬜ Mira chat with user context (band, target, weaknesses, recent practice)
- ⬜ AI states: thinking / typing / responding / error / retry
- ⬜ Full mock test flow + band report + plan change
- ⬜ Band forecast + trajectory + per-band floor
- ⬜ Weakness detection dashboard
- ⬜ Mistake notebook across all skills
- ⬜ Gamification: XP, streak, opt-in league (secondary, never leads)
- ⬜ Light / dark / system appearance, persisted
- ⬜ Haptics on answer, recording, completion
- ⬜ Loading / empty / error states on every data surface

**Explicitly out of scope for the mobile frontend:** admin panel (§28 — a separate web product), real backend, real AI/LLM, real speech-to-text, real OCR, real payments.

**Every AI-produced score must be labelled "AI estimated band — for practice purposes only."** Never presented as an official IELTS score.

---

## 8. Mock data & services checklist

### Service interfaces (mock now, API later)
- ✅ `authService` — contract + mock, session persisted; `completeOnboarding` flips the route-guard flag
- ✅ `diagnosticService` — voice sample / skip estimate; mock returns the §17 starting bands
- ⬜ `planService` (today's plan, plan changes)
- ⬜ `listeningService`
- ⬜ `readingService`
- ⬜ `writingService` (tasks, drafts, evaluation, OCR)
- ⬜ `speakingService` (topics, recording, evaluation)
- ⬜ `vocabularyService`
- ⬜ `grammarService`
- ⬜ `mockTestService`
- ⬜ `progressService` (forecast, history, analytics)
- ⬜ `weaknessService`
- ⬜ `mistakeService`
- ⬜ `mentorService` (Mira chat + contextual responses)
- ✅ `profileService` — contract + mock

### Mock data sets
- ✅ User profile + goals + streak + XP
- ⬜ Daily plan + session history
- ⬜ Listening tests (sections 1–4, all required question types, transcripts)
- ⬜ Reading passages (Academic + General Training, all required question types)
- ⬜ Writing tasks (Task 1 Academic + GT letters, Task 2 essay types) + model evaluations
- ⬜ Speaking topics (parts 1–3, cue cards) + model debriefs
- ⬜ Vocabulary (11 categories, word entries with synonyms/examples/IELTS context)
- ⬜ Grammar (11 categories, lessons, questions, explanations)
- ⬜ Mock tests + band reports
- ⬜ Mistake bank entries across all skills
- ⬜ Score history / trajectory
- ⬜ Mira conversation seeds + contextual response templates
- ⬜ League members

Rule: **no data literals inside screens.** Screens read from hooks; hooks read from services; services read from `mocks/`.

---

## 9. Theme checklist

- ✅ Semantic color tokens defined once (`src/theme/palette.ts`, 23 tokens)
- ✅ Light palette mapped
- ✅ Dark palette mapped
- ✅ Appearance modes: Light / Dark / **System (default)**
- ✅ Choice persisted (AsyncStorage via `src/lib/storage.ts`)
- ✅ Theme available to NativeWind classes and to imperative styles (one generated source)
- ✅ Typography scale centralized (12 variants in `tokens.ts`)
- ✅ Spacing scale centralized
- ✅ Radius scale centralized (all 0)
- ✅ Elevation centralized (`flat` and `overlay` only — the system is deliberately shadowless except for floating surfaces)
- ✅ Control sizing centralized (`sm` / `md` / `lg`, `minTouch` 44)
- ✅ Icon size scale centralized
- ✅ Navigation chrome theme-aware (headers, card background, status bar)
- ✅ No hard-coded hex outside the palette file
- ✅ Every foundational component rendered in both themes via the Phase 03 gallery

---

## 10. Open decisions

### Resolved

1. **Gluestack UI — not used.** `FRONTEND_STACK.md` recommends it, but the design system is zero-radius and rule-driven, so Gluestack's defaults would be overridden almost completely. Building on **NativeWind + our own primitives**, consistent with the stack doc's own "not 20 UI libraries" guidance.
2. **Profile is the fifth tab**, per `APP_DESCRIPTION.md` §32. Progress lives inside Profile, with a shortcut from the Today header.

### Still open

3. **Paywall / premium.** In `APP_DESCRIPTION.md` §27 and designed in the deck (2g), but no payments exist. Recommendation: **defer to a later phase**, build the screen as a static presentation if wanted.
4. **League / leaderboard.** Present in both §15 and the deck as opt-in. Recommendation: **build it in Phase 09**, sorted by effort within a shared target band, opt-out visible.

---

## 11. Testing checklist

Filled in from Phase 04 onward; verified in full at Phase 12.

- ✅ TypeScript passes with no errors
- ✅ Lint passes
- ✅ Metro produces an Android bundle
- ✅ Tailwind compiles the palette to `:root` / `.dark:root` variables
- ⬜ Every screen reachable; no dead ends
- ⬜ Back navigation correct on iOS and Android
- ⬜ Light theme verified on every screen
- ⬜ Dark theme verified on every screen
- ⬜ System theme follows the OS live
- ⬜ Safe areas correct (notch, dynamic island, gesture bar)
- ⬜ No layout overflow at small and large text sizes
- ⬜ Keyboard behavior in the writing editor and chat
- ⬜ Timers, audio, and recording states behave on background/foreground
- ✅ Form validation and error states
- ⬜ Loading / empty / error state on every data surface
- ⬜ Lists virtualized where long
- ⬜ Animations run on the UI thread
- ⬜ No debug logs, placeholder text, or unused files
- ⬜ UI depends only on service interfaces, never on mock modules directly

---

## 12. Phase log

### Phase 05 — Authentication + onboarding + diagnostic · ✅

**Auth is mock, behind a contract.** Sign-in and sign-up write an `AuthSession` through `services.auth`. Returning users skip onboarding; new accounts land in the four-step flow. Sign out lives in Profile → Settings and returns to welcome.

**The route guard is the product.** Root `Stack.Protected` swaps `(auth)` / `(onboarding)` / the tabs based on session, so an unauthorised route never mounts. Screens do not navigate to Today themselves — completing onboarding flips `hasCompletedOnboarding` and the guard does the rest.

**Onboarding asks only what the plan needs:** goal, target band, test date, Academic vs General Training, daily minutes. The date field refuses anything closer than a week and tells the learner what gain is realistic in the time they have.

**Diagnostic is voice-first**, matching the deck, not a four-paper exam. Thirty seconds on a dark capture screen (or a skip that estimates from the answers) produces a starting-point result: overall band, Mira's one-line read, per-skill bars with a target rule, and "the plan, in one line." Full listening / reading / writing papers are Phase 07.

**Decisions made during the build**

- **No 10+10+1 diagnostic quiz in onboarding.** `APP_DESCRIPTION.md` §17 lists those papers; the deck's diagnostic is a 90-second voice sample that returns a diagnosis. Rebuilding the skill runners here would duplicate Phase 07. Skip still produces a plan, so nobody is blocked.
- **Date picking is platform-native.** Android dialog, iOS spinner in a sheet, web overlay on the designed field. No custom calendar chrome.
- **Unrealistic targets are refused out loud** (`feasibility.ts`): five weeks per half band, minimum seven days. Credibility, not a paywall.
- **The capture screen is always dark**, even in light mode. It is a recording booth, not a page.
- **Audio capture is not wired yet.** Timing and duration are real; the sample itself arrives with the speaking module. The diagnostic service takes `seconds`, so a real upload drops in without changing the screen.

**Verified.** `tsc --noEmit` clean, `expo lint` clean. Walked signed-out → welcome → sign-up → four onboarding steps → skip diagnostic → result → Today, then Profile → Settings → sign out → welcome. Light theme on the flow; the capture screen is dark by design.

**Still to confirm on device.** Android date dialog, iOS spinner sheet, hardware back through the onboarding stack, and the 30-second capture with Expo Go's haptics.

### Phase 04 — Navigation + app shell · ✅

**Structure.** Five tabs — Today · Practice · Mock · Mira · Profile — in the deck's order, with Progress reached through Profile per decision §10.2. Each feature area owns a route folder and its own `_layout.tsx`. Modals are a route group, so `presentation: 'modal'` is declared once instead of at every call site.

**Headers are ours, not the navigator's.** `headerShown` is off everywhere. The design system's header is a typographic block above a 2px rule, which a native stack header cannot express, so `AppHeader` renders it and screens compose it directly.

**Tab bar** follows the deck exactly: a 2px rule across the top and a 3px accent rule above the active tab. No pill, no fill, no shadow. Tab changes fire a selection haptic.

**Decisions made during the build**

- **Tab bar props are typed structurally.** `AppTabBar` declares only the `state` and `navigation` fields it uses instead of importing `BottomTabBarProps`, keeping `@react-navigation/bottom-tabs` a transitive dependency. TypeScript still checks the call site through parameter contravariance.
- **The active tab label uses `primaryText`, not `primary`.** The deck tints both icon and label with the accent, but accent red on paper is about 3.9:1, under the 4.5:1 that 10px text needs. The icon and the rule carry the accent; the label uses the deeper red so it stays legible in both schemes.
- **Appearance moved to Profile → Settings** and is real, not a placeholder, because Phase 04's own test list includes theme switching and the gallery that previously hosted it is now dev-only.
- **Android hardware back returns to Today** (`backBehavior="initialRoute"`) rather than exiting from a secondary tab.
- **The gallery survives as `/design-system`**, reachable only from Profile. It is a development tool, not a product screen, and should be deleted before release.

**Verified.** `tsc --noEmit` clean, `expo lint` clean, Android Metro bundle produced (3445 modules). Typed routes are the real proof here: every `router.push` in the shell resolves against the generated `Href` union, so the whole route tree is checked at compile time.

**Worth knowing.** `expo export` does *not* regenerate `.expo/types/router.d.ts`; only the dev server does. After adding routes, run `npm start` once before trusting a typecheck, or stale route types will produce confusing errors.

**Not done, by design.** No feature content. `(auth)` and `(onboarding)` arrive in Phase 05, and the mock runner, mistake detail and remaining modals arrive with their own phases.

**Still to confirm on device.** Move between all five tabs, push into a practice area and come back with both the header control and the Android hardware button, open the plan-change modal and dismiss it, switch appearance in Profile → Settings and confirm the tab bar repaints, and check the tab bar clears the gesture bar on a device with no physical buttons.

### Phase 03 — Design system + theme · ✅

**Tokens.** The type scale is 12 variants (`display`, `displaySm`, `numeral`, `h1`–`h4`, `body`, `bodySm`, `label`, `kicker`, `caption`), each a complete family / size / line-height / tracking set. Headings track in, kickers track out hard. Also added: `elevation`, `control` sizing, `layout` gutters and `opacity` states.

**Colour.** Palette rebuilt on named ink / paper / grey / accent constants, so relationships are visible in the source instead of repeated hex. Added the `secondary` role `THEME.md` requires — in a mono system that is the ink pair, and the file says so rather than inventing a second hue. 23 tokens across both schemes.

**Components.** 20 primitives in `src/components/ui`, one barrel export. Colour always arrives through a semantic class or `useTheme()`; no component contains a hex value.

**Decisions made during the build**

- **`className` cannot be a function.** NativeWind types it as a string, so pressed states use the `active:` variant instead of Pressable's render-prop form. This typechecks but the failure mode is silent at runtime, so it is worth remembering.
- **Animated components take `style`, not `className`.** NativeWind's class interop does not extend to Reanimated's `Animated.View`, so `ProgressBar`, `Skeleton`, `Dialog` and `BottomSheet` read colours from `useTheme()`. This is exactly what that hook exists for.
- **`ProgressRing` not built**, see the component checklist.
- **Elevation is two steps, not a ramp.** Flat for everything on the page; a real shadow only for dialogs and sheets.
- Markdown docs moved to `docs/`; `README.md` stays at the repository root by convention.

**Verified.** `tsc --noEmit` clean, `expo lint` clean, Android Metro bundle produced (3410 modules).

**Not done, by design.** No feature screens. `src/app/index.tsx` is now a gallery that renders every primitive in one scroll so both themes can be checked in a single pass; Phase 04 replaces it with the real app shell.

**Still to confirm on device.** Walk the gallery in light and dark: type hierarchy reads correctly, button and row press states are visible in both, the dialog scrim and the sheet's drag-to-dismiss behave, and the progress bar animates rather than jumping.

### Phase 02 — Project foundation · ✅

Scaffolded on **Expo SDK 54** (React 19.1, React Native 0.81.5, Expo Router 6, typed routes and the React Compiler both on).

**Architecture**

```
Screen → hook → services.<domain> → contract → mock implementation → mocks/
```

`src/services/index.ts` is the only module that chooses between a mock and HTTP, driven by `EXPO_PUBLIC_API_URL`. Screens never import from `mocks/` and never call `fetch`. `ServiceError` normalises every failure into one shape so error and retry UI stays generic. Folder layout is documented in `README.md`.

**Theme infrastructure.** `src/theme/palette.ts` holds all 20 semantic tokens for both schemes and is the single source of truth. `npm run theme` regenerates `src/theme/global.css` from it, so the NativeWind classes and the imperative `useTheme()` values cannot drift. Appearance is Light / Dark / System with System as the default, persisted through `src/lib/storage.ts`, and the splash screen is held until theme, fonts and session have all settled.

**Decisions made during the build**

- Radius tokens exist but every step is `0px`, per the design system.
- Archivo is imported per weight (`@expo-google-fonts/archivo/400Regular`) rather than from the package root — the root re-exports all eighteen files and Metro was bundling ~2.2MB of unused fonts, including italics. Now five files, ~600KB.
- **SDK 54, not the latest.** Expo Go runs exactly one SDK, and the Play Store only serves Expo Go 54.x on the target device — newer builds raise the minimum Android version. The project was moved from SDK 57 down to 54 so it runs in stock Expo Go with no dev build. Revisit if we adopt a custom dev client.
- `@react-navigation/native` is a direct dependency. Expo Router 6 does not re-export `ThemeProvider` / `DarkTheme` / `DefaultTheme` (that arrived in a later version), and depending on a transitive copy is fragile.
- `babel-preset-expo` is an explicit devDependency. npm nested it under `node_modules/expo/`, and Babel resolves presets relative to the root `babel.config.js`, so the bundle failed with "Cannot find module 'babel-preset-expo'" until it was hoisted.
- Tailwind is pinned to v3 because NativeWind 4 does not support Tailwind v4.

**Verified.** `tsc --noEmit` clean, `expo lint` clean, `expo-doctor` 18/18, Android Metro bundle produced (1492 modules), and the compiled Tailwind output confirms `--css-interop-darkMode: class dark` with light variables on `:root` and dark on `.dark:root`.

**Not done, by design.** No feature screens. `src/app/index.tsx` is a temporary foundation-check screen that exercises the theme, fonts, service layer and query client in one place, and Phase 04 replaces it with the real app shell.

**Still to confirm on device.** Run `npm start` and check that switching Light / Dark / System repaints, that Archivo renders, and that the mock profile loads after its simulated latency.

### Phase 01 — Analyze & plan · ✅
Read `APP_DESCRIPTION.md`, `FRONTEND_STACK.md`, `THEME.md`, the Modernist design system, the Bandmate deck, and the iOS/Android frames. Produced the design direction, token proposal, navigation architecture, and the screen / component / feature / mock-data / theme / testing checklists above. Two decisions settled — no Gluestack, and Profile as the fifth tab with Progress inside it; two deferred (paywall, league). **No application code written.**
