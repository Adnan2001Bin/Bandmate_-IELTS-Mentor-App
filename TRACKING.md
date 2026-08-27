# Bandmate — IELTS Mentor · Development Tracking

Living document. Updated at the end of every phase.

- **Current phase:** 01 — Analyze & Plan
- **Status:** Complete (analysis only — no application code written yet)
- **Next phase:** 02 — Project Foundation (do not start without an explicit prompt)

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
| 02 | Project foundation | ⬜ Not started |
| 03 | Design system + light/dark/system theme | ⬜ Not started |
| 04 | Navigation + app shell | ⬜ Not started |
| 05 | Authentication + onboarding + diagnostic | ⬜ Not started |
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

Route groups:

```
app/
  (auth)/          welcome · sign-in · sign-up
  (onboarding)/    steps · voice diagnostic · diagnostic sections · result
  (tabs)/          today · practice · mock · mira · profile
  practice/        listening/ reading/ writing/ speaking/ vocabulary/ grammar/
  mock/            lobby · runner · report
  progress/        forecast · history · weaknesses · league
  profile/         goals · appearance · notifications · account
  mistakes/        list · detail
  (modals)/        plan-change · submit-confirm · explanation · filters
```

Each feature owns its own route folder — no single giant routing file.

---

## 5. Screen checklist

Legend: ⬜ not started · 🟡 in progress · ✅ done

### Auth & onboarding — Phase 05
- ⬜ Welcome / "I'm Mira, I'll be your tutor"
- ⬜ Sign in (mock)
- ⬜ Sign up (mock)
- ⬜ Onboarding step 1 — why you're taking IELTS / study goal
- ⬜ Onboarding step 2 — target band + test date + Academic / General Training
- ⬜ Onboarding step 3 — daily time available
- ⬜ Onboarding step 4 — current level / diagnostic hand-off
- ⬜ Voice diagnostic (dark, 30s recording)
- ⬜ Diagnostic sections — 10 listening, 10 reading, 1 writing task
- ⬜ Diagnostic result — "your starting point", per-skill bars, plan in one line
- ⬜ Plan built / completion

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
- ⬜ `Screen` (safe areas, status-bar mode, scroll variants)
- ⬜ `Text` (display / h1–h4 / body / bodySm / kicker / caption / numeral)
- ⬜ `Button` (primary / secondary / ghost / icon, flush-left label, trailing icon)
- ⬜ `Card`
- ⬜ `Rule` (2px section divider, 1px row divider)
- ⬜ `Tag`
- ⬜ `Input` / `TextArea`
- ⬜ `SelectionRow` (radio-style option row, accent-filled when selected)
- ⬜ `SegmentedControl`
- ⬜ `ProgressBar` (with optional target rule marker)
- ⬜ `StepProgress` (segmented top bar)
- ⬜ `Monogram` (Mira's red "M" and user initials)
- ⬜ `ListRow`
- ⬜ `StatCell` (numeral + kicker, in a ruled grid)
- ⬜ `Dialog`
- ⬜ `BottomSheet`
- ⬜ `Skeleton`
- ⬜ `EmptyState`
- ⬜ `ErrorState`
- ⬜ `InkPanel` (inverted emphasis block)

### IELTS-specific — Phases 06–09
- ⬜ `BandScore` (display numeral + delta)
- ⬜ `SkillBar` (now vs. target rule)
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
- ⬜ `Waveform`
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

- ⬜ Mock authentication + session persistence
- ⬜ Onboarding capture: target band, test date, test type, study goal, daily minutes
- ⬜ Voice diagnostic + estimated starting band
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
- ⬜ `authService`
- ⬜ `onboardingService`
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
- ⬜ `profileService`

### Mock data sets
- ⬜ User profile + goals + streak + XP
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

- ⬜ Semantic color tokens defined once
- ⬜ Light palette mapped
- ⬜ Dark palette mapped
- ⬜ Appearance modes: Light / Dark / **System (default)**
- ⬜ Choice persisted
- ⬜ Theme available to NativeWind classes and to imperative styles
- ⬜ Typography scale centralized
- ⬜ Spacing scale centralized
- ⬜ Radius scale centralized (all 0)
- ⬜ Shadow steps centralized
- ⬜ Icon size scale centralized
- ⬜ Navigation chrome theme-aware (tab bar, headers, status bar)
- ⬜ No hard-coded hex outside the token file
- ⬜ Every foundational component verified in both themes

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

- ⬜ TypeScript passes with no errors
- ⬜ Lint passes
- ⬜ Every screen reachable; no dead ends
- ⬜ Back navigation correct on iOS and Android
- ⬜ Light theme verified on every screen
- ⬜ Dark theme verified on every screen
- ⬜ System theme follows the OS live
- ⬜ Safe areas correct (notch, dynamic island, gesture bar)
- ⬜ No layout overflow at small and large text sizes
- ⬜ Keyboard behavior in the writing editor and chat
- ⬜ Timers, audio, and recording states behave on background/foreground
- ⬜ Form validation and error states
- ⬜ Loading / empty / error state on every data surface
- ⬜ Lists virtualized where long
- ⬜ Animations run on the UI thread
- ⬜ No debug logs, placeholder text, or unused files
- ⬜ UI depends only on service interfaces, never on mock modules directly

---

## 12. Phase log

### Phase 01 — Analyze & plan · ✅
Read `APP_DESCRIPTION.md`, `FRONTEND_STACK.md`, `THEME.md`, the Modernist design system, the Bandmate deck, and the iOS/Android frames. Produced the design direction, token proposal, navigation architecture, and the screen / component / feature / mock-data / theme / testing checklists above. Two decisions settled — no Gluestack, and Profile as the fifth tab with Progress inside it; two deferred (paywall, league). **No application code written.**
