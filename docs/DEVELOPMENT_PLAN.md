# IELTS Mentor App — Phase-by-Phase Development Plan

**Rule:** Do not jump to the next phase automatically. After each phase, review the result, run the app on Expo, then give the next prompt.

**Tracking:** Maintain `TRACKING.md` throughout all phases.

---

## Overall architecture

```
Phase 01  → Analyze & Plan
Phase 02  → Project Foundation
Phase 03  → Design System + Theme
Phase 04  → Navigation + App Shell
Phase 05  → Authentication + Onboarding
Phase 06  → Home + Practice
Phase 07  → IELTS Practice Modules
Phase 08  → AI Mentor + AI Feedback
Phase 09  → Tests + Progress + Mistakes
Phase 10  → Polish + QA + Finalization
```

Phase 07 is split into separate prompts so Listening, Reading, Writing, Speaking, Vocabulary, and Grammar are not built in one giant change.

Profile / Settings, UI polish, and QA are also separate phases.

---

## Recommended development order

```
01  Analyze
 ↓
02  Foundation
 ↓
03  Design System + Theme
 ↓
04  Navigation
 ↓
05  Auth + Onboarding
 ↓
06  Home + Practice
 ↓
07A Listening
 ↓
07B Reading
 ↓
07C Writing
 ↓
07D Speaking
 ↓
07E Vocabulary + Grammar
 ↓
08  AI Mentor
 ↓
09  Tests + Progress + Mistakes
 ↓
10  Profile + Settings
 ↓
11  UI Polish
 ↓
12  QA
```

### Why this order

There are dependencies between phases:

```
Foundation → Theme → Navigation → Onboarding → Home
```

Then:

```
Practice → Individual IELTS modules
```

Then:

```
Writing / Speaking → AI feedback
```

Then:

```
Tests → Progress → Weakness detection
```

Finally:

```
Everything → Polish → QA
```

This prevents a giant, tangled application.

---

## TRACKING.md

Create or update `TRACKING.md` in every phase.

It should contain:

- Project overview
- Phase list
- Screen checklist
- Component checklist
- Feature checklist
- Mock-data checklist
- Theme checklist
- Testing checklist

Mark completed work at the end of each phase. Do not start the next phase automatically.

---

## PHASE 01 — Analyze Requirements & Create Implementation Plan

**Goal:** Don’t build UI yet. First understand the entire project.

### Prompt

```
PHASE 01 — ANALYZE AND PLAN THE IELTS MENTOR APP

You are working on an IELTS Mentor React Native mobile application.

Before writing or modifying application code, thoroughly inspect and understand:

1. APP_DESCRIPTION.md
2. FRONTEND_STACK.md
3. THEME.md
4. _ds
5. .thumbnail
6. android-frame.jsx
7. Bandmate.dc.html
8. ios-frame.jsx
9. support.js

These files are the source of truth for the product requirements, frontend technology stack, theme, and visual/design references.

DO NOT start implementing the application yet.

Your task in this phase is to analyze the project and create a detailed implementation plan.

Identify:

- All required screens
- All required navigation flows
- All required features
- All required IELTS modules
- All AI-related frontend experiences
- All forms
- All test flows
- All writing submission flows
- All speaking flows
- All progress/analytics screens
- All profile/settings screens
- Required reusable components
- Required mock data
- Required mock services
- Required theme tokens
- Required state management
- Required API/service abstraction
- Required animations
- Required charts
- Required audio/recording UI
- Required loading/error/empty states

Compare the product requirements against the visual references.

IMPORTANT:

- Do not add features that are not required.
- If something exists in the design references but is not required by APP_DESCRIPTION.md, do not automatically add it.
- Identify reusable patterns from the references.
- Follow FRONTEND_STACK.md instead of inventing another technology stack.
- Follow THEME.md for theme implementation.

Create or update:

TRACKING.md

The tracking file should contain:

- Project overview
- Phase list
- Screen checklist
- Component checklist
- Feature checklist
- Mock-data checklist
- Theme checklist
- Testing checklist

At the end of this phase, provide a concise implementation plan and do not start Phase 02 automatically.
```

---

## PHASE 02 — Project Foundation

**Goal:** Set up the technical foundation.

Use this prompt after Phase 01 is complete.

### Prompt

```
PHASE 02 — PROJECT FOUNDATION

Now implement the technical foundation of the IELTS Mentor React Native application based on the analysis from Phase 01.

First re-check:

- APP_DESCRIPTION.md
- FRONTEND_STACK.md
- THEME.md
- TRACKING.md

Follow FRONTEND_STACK.md exactly.

Do not introduce unnecessary libraries.

Set up and organize:

- React Native / Expo configuration
- TypeScript
- Expo Router
- State management
- Server/API state management
- Form validation
- Theme infrastructure
- Utility structure
- Service structure
- Mock-data structure
- Component structure

Create a scalable professional folder structure.

The architecture should separate:

- Screens/routes
- Feature modules
- Reusable UI components
- IELTS-specific components
- AI components
- Services
- API abstraction
- Mock services
- State
- Hooks
- Types
- Constants
- Theme
- Utilities

The frontend must be backend-ready.

Do not implement the backend.

Create service interfaces so future backend APIs can replace mock implementations without changing UI components.

Create basic mock-service architecture.

Create/update TRACKING.md and mark completed tasks.

Do not build all application screens in this phase.

At the end, verify:

- TypeScript
- Imports
- Project structure
- Navigation foundation
- Dependencies
- Lint/type checking where available

Do not move to the next phase automatically.
```

---

## PHASE 03 — Design System + Light/Dark Theme

This phase is extremely important.

### Prompt

```
PHASE 03 — DESIGN SYSTEM AND THEME

Implement the complete visual foundation of the IELTS Mentor application.

Before implementation, inspect:

- THEME.md
- Design references
- Existing project styles
- TRACKING.md

Follow THEME.md as the primary theme source.

Create a centralized design system containing semantic tokens for:

- Background
- Surface
- Card
- Primary
- Secondary
- Text
- Muted text
- Border
- Success
- Warning
- Error
- Info

Also centralize:

- Typography
- Font sizes
- Font weights
- Spacing
- Border radius
- Shadows/elevation
- Icon sizing
- Component sizes

Implement:

- Light theme
- Dark theme
- System theme

Theme switching must work globally.

Do not hard-code colors inside individual screens/components unless there is a specific reason.

Create reusable foundational components such as:

- Button
- Text
- Card
- Input
- Badge
- Divider
- Avatar
- Progress bar
- Progress ring
- Modal
- Bottom sheet
- Skeleton
- Empty state
- Error state

Only create components that are actually required.

Use the visual references to create a polished, modern, calm educational design.

The UI should feel:

- Premium
- Professional
- Clean
- Modern
- Comfortable for long study sessions

Avoid:

- Excessive gradients
- Excessive glassmorphism
- Too many colors
- Unnecessary decorative elements

Verify every foundational component in both light and dark themes.

Update TRACKING.md.

Do not build feature-specific screens yet.
```

---

## PHASE 04 — Navigation + App Shell

Now create the actual application structure.

### Prompt

```
PHASE 04 — NAVIGATION AND APP SHELL

Implement the application's navigation architecture according to APP_DESCRIPTION.md and the design references.

Create the required navigation structure.

The high-level experience should generally support:

- Home
- Practice
- AI Mentor
- Tests
- Profile

But use APP_DESCRIPTION.md as the final source of truth.

Implement:

- Navigation
- Bottom tabs where required
- Stack navigation
- Nested routes
- Modal routes where appropriate
- Back navigation
- Header behavior
- Safe areas
- Status bar behavior
- Theme-aware navigation

Create the app shell.

Do not yet implement the detailed content of every feature.

Create route placeholders only where needed.

Make sure the navigation structure is scalable and does not become a single giant routing file.

Use professional route organization.

Test:

- Navigation between major sections
- Back navigation
- Theme switching
- Safe areas
- Android behavior
- iOS behavior where applicable

Update TRACKING.md.

Do not implement detailed IELTS functionality yet.
```

---

## PHASE 05 — Authentication + Onboarding

Now start building the user journey.

### Prompt

```
PHASE 05 — AUTHENTICATION AND ONBOARDING

Implement the authentication and onboarding frontend according to APP_DESCRIPTION.md.

There is NO real backend authentication.

Use mock authentication.

Implement only the authentication screens actually required by the product requirements.

Then create the onboarding flow.

The onboarding should collect the information required to personalize IELTS preparation, such as where required:

- Target band
- Current level
- Exam date
- Study goal
- Daily available study time
- IELTS type if required

Do not ask unnecessary questions.

Create a polished multi-step onboarding experience.

Include:

- Progress indicator
- Back/next navigation
- Validation
- Selection cards
- Date selection where required
- Completion state

After onboarding, route the user to the appropriate next step, such as diagnostic assessment or Home, according to APP_DESCRIPTION.md.

Use mock user data.

Create reusable onboarding components.

Make the entire flow work in both light and dark themes.

Update TRACKING.md.
```

---

## PHASE 06 — Home + Practice System

Now build the main learning experience.

### Prompt

```
PHASE 06 — HOME DASHBOARD AND PRACTICE SYSTEM

Implement the Home and Practice experiences according to APP_DESCRIPTION.md.

Home should feel like a personal IELTS dashboard, not a generic app homepage.

Use realistic mock data.

Implement the required sections such as:

- Current band
- Target band
- Progress
- Exam countdown
- Daily goal
- Recommended practice
- Continue learning
- AI recommendation
- Streak where required

Do not add unnecessary dashboard cards.

Practice should provide access to the required IELTS skills:

- Listening
- Reading
- Writing
- Speaking
- Vocabulary
- Grammar

Create reusable IELTS-specific components:

- SkillCard
- PracticeCard
- ProgressCard
- RecommendationCard
- BandScore
- PracticeStatus

Use mock services rather than hard-coded data inside screens.

The Home screen should demonstrate the core product idea:

Current level
→ Weakness
→ Recommended practice
→ Practice

Make all required interactions functional using mock data.

Update TRACKING.md.
```

---

## PHASE 07 — IELTS Practice Modules

This will probably be the largest phase.

Build **one skill at a time**. Recommended order:

```
Listening
 ↓
Reading
 ↓
Writing
 ↓
Speaking
 ↓
Vocabulary
 ↓
Grammar
```

Give the agent a separate prompt for each skill to avoid huge changes.

---

### PHASE 07A — Listening

### Prompt

```
PHASE 07A — IELTS LISTENING

Implement the complete IELTS Listening frontend according to APP_DESCRIPTION.md.

Implement only the required question types.

Create:

- Listening test selection
- Instructions
- Audio player
- Timer
- Question interface
- Question navigation
- Progress
- Answer selection
- Submit
- Results
- Score
- Explanation
- Transcript
- Mistake review

Use mock audio/data.

Create a mock listening service.

Do not hard-code questions directly into screens.

Create reusable:

- AudioPlayer
- TestTimer
- QuestionCard
- AnswerOption
- QuestionNavigator
- TestProgress
- ResultCard

The experience should feel like a real IELTS test.

Update TRACKING.md.
```

---

### PHASE 07B — Reading

### Prompt

```
PHASE 07B — IELTS READING

Implement the complete IELTS Reading frontend according to APP_DESCRIPTION.md.

Support the required question types.

Implement:

- Reading test selection
- Passage
- Questions
- Answer selection
- Question navigation
- Timer
- Progress
- Submit
- Results
- Score
- Explanation
- Mistake review

Optimize the UI for mobile reading.

Avoid unnecessarily tiny text.

Use mock reading content and a mock service.

Create reusable components instead of duplicating question UI.

Update TRACKING.md.
```

---

### PHASE 07C — Writing

This deserves a separate prompt.

### Prompt

```
PHASE 07C — IELTS WRITING

Implement the complete IELTS Writing experience.

Support the Writing requirements defined in APP_DESCRIPTION.md.

Implement:

- Task selection
- Task 1 / Task 2
- Question/instructions
- Writing editor
- Timer
- Word count
- Draft saving
- Submit
- Submit confirmation
- Submission state
- Evaluation loading state
- Evaluation result
- Band score
- Criterion scores
- Strengths
- Weaknesses
- Sentence-level feedback
- Improvement recommendations
- Mistake tracking

The writing editor must support a realistic mobile writing experience.

Implement mock persistence for drafts.

Create a mock writing evaluation service.

The flow should be:

Writing Task
→ Write
→ Submit
→ Analyzing
→ Evaluation
→ Feedback
→ Weaknesses
→ Recommended Practice

Also prepare the frontend architecture for handwritten writing submission:

Take Photo
→ Upload Pages
→ OCR Processing
→ Review Text
→ Submit

If OCR is unavailable, simulate it with mock data.

Do not claim real OCR/AI processing.

Create reusable components:

- WritingEditor
- WordCounter
- WritingTimer
- WritingEvaluation
- CriterionScore
- FeedbackCard
- SentenceFeedback
- WeaknessCard

Update TRACKING.md.
```

---

### PHASE 07D — Speaking

### Prompt

```
PHASE 07D — IELTS SPEAKING

Implement the complete IELTS Speaking frontend.

Create:

- Speaking test setup
- Part 1
- Part 2
- Part 3
- Preparation timer
- Speaking timer
- Recording interface
- Microphone state
- Recording animation
- Waveform visualization where appropriate
- Stop recording
- Playback
- Submit
- AI analysis loading
- Results
- Band score
- Criterion breakdown
- Transcript
- Feedback
- Weaknesses
- Recommendations

Use mock recording/evaluation services if real backend/AI services aren't available.

The UI should feel like an IELTS examiner experience.

Create reusable:

- SpeakingRecorder
- RecordingTimer
- Waveform
- SpeakingQuestion
- Transcript
- SpeakingEvaluation
- CriterionScore

Update TRACKING.md.
```

---

### PHASE 07E — Vocabulary + Grammar

### Prompt

```
PHASE 07E — VOCABULARY AND GRAMMAR

Implement Vocabulary and Grammar according to APP_DESCRIPTION.md.

Vocabulary:

- Categories
- Word details
- Meaning
- Example
- Synonyms
- IELTS context
- Practice
- Review
- Difficult words
- Progress

Grammar:

- Grammar categories
- Lessons
- Questions
- Answer selection
- Explanation
- Results
- Practice again

Use mock data and services.

Create reusable:

- VocabularyCard
- VocabularyDetail
- GrammarLesson
- GrammarQuestion
- ExplanationCard
- PracticeResult

Do not add generic educational features that aren't required.

Update TRACKING.md.
```

---

## PHASE 08 — AI Mentor + AI Features

This is where the app’s main identity comes together.

### Prompt

```
PHASE 08 — AI IELTS MENTOR

Implement the complete AI Mentor frontend experience.

There is NO real AI backend in this phase.

Use mock AI services.

The AI Mentor should feel like a personal IELTS coach, not a generic chatbot.

Implement:

- AI Mentor home
- Chat
- Suggested actions
- Speaking practice entry
- Writing review entry
- Vocabulary help
- Grammar help
- Study recommendations
- Personalized feedback
- Conversation history where required

The mentor should use mock user context such as:

- Current band
- Target band
- Weaknesses
- Recent practice
- Recent test results

Create realistic contextual AI responses.

Example flow:

User:
"My speaking score is 5.5. How can I improve?"

AI:
- Identifies weaknesses
- Gives actionable recommendations
- Suggests today's practice
- Links to the relevant practice feature

Also implement mock AI states:

- Thinking
- Typing
- Responding
- Error
- Retry

Do not create a generic ChatGPT clone.

The UI should visually belong to the IELTS Mentor application.

Update TRACKING.md.
```

---

## PHASE 09 — Diagnostic + Mock Tests + Progress + Mistakes

### Prompt

```
PHASE 09 — TESTS, PROGRESS AND WEAKNESS SYSTEM

Implement the remaining assessment and progress features.

## Diagnostic Test

Create:

- Test introduction
- Skill sections
- Questions
- Writing
- Speaking
- Completion
- Estimated score
- Skill breakdown
- Recommended plan

Use mock scoring.

## Mock Tests

Implement the required mock-test experience.

Flow:

Listening
→ Reading
→ Writing
→ Speaking
→ Results

## Progress

Create:

- Current band
- Target band
- Skill scores
- Score history
- Practice history
- Required analytics
- Charts

## Weaknesses

Create a weakness dashboard.

Examples:

- Grammar
- Vocabulary
- Fluency
- Pronunciation
- Task response
- Coherence

## Mistake Notebook

Implement:

- Mistake list
- Categories
- Details
- Explanation
- Practice again

All data should come from mock services.

Do not hard-code data into screens.

Create reusable chart and analytics components.

Update TRACKING.md.
```

---

## PHASE 10 — Profile + Settings

### Prompt

```
PHASE 10 — PROFILE AND SETTINGS

Implement Profile and Settings according to APP_DESCRIPTION.md.

Include only required features.

Possible areas:

- Profile
- Target band
- Exam date
- Goals
- Study preferences
- Progress
- History
- Mistakes
- Vocabulary
- Appearance
- Notifications
- Account settings

Implement:

Light
Dark
System

using the existing theme system.

Do not create a second theme implementation.

Use reusable settings components.

Update TRACKING.md.
```

---

## PHASE 11 — Final UI Polish

This phase is important. Don’t skip it.

### Prompt

```
PHASE 11 — UI POLISH AND DESIGN REFINEMENT

Now review the entire IELTS Mentor application.

Do NOT add new features.

Do NOT expand scope.

Focus only on improving the existing implementation.

Compare the application against:

- APP_DESCRIPTION.md
- THEME.md
- Design references
- FRONTEND_STACK.md

Review every screen for:

- Typography
- Spacing
- Alignment
- Component consistency
- Border radius
- Shadows
- Colors
- Icons
- Empty states
- Loading states
- Error states
- Animations
- Button hierarchy
- Information hierarchy
- Dark mode
- Light mode
- Keyboard behavior
- Safe areas

Remove:

- Duplicate UI
- Unnecessary sections
- Unnecessary text
- Placeholder content
- Debug UI
- Inconsistent components
- Dead code

Make the app feel like a polished commercial mobile product.

Do not redesign the product unnecessarily.

Preserve the established design language.

Update TRACKING.md.
```

---

## PHASE 12 — QA + Final Verification

### Prompt

```
PHASE 12 — FINAL QA AND VERIFICATION

Perform a complete frontend QA pass.

Do not add new functionality.

Verify every required feature from APP_DESCRIPTION.md.

Check:

## Navigation

- Every required screen is reachable
- Back navigation works
- No dead-end screens

## UI

- Light theme works
- Dark theme works
- System theme works
- No layout overflow
- No broken components
- No missing icons/images

## IELTS

- Listening works
- Reading works
- Writing works
- Speaking works
- Vocabulary works
- Grammar works

## AI

- AI Mentor works
- Mock AI responses work
- Writing evaluation works
- Speaking evaluation works

## Tests

- Diagnostic test works
- Mock test works
- Results work

## Progress

- Dashboard works
- Scores display correctly
- Charts render
- Mistakes display

## Forms

- Validation works
- Error states work
- Submit states work

## Mock services

Verify the UI doesn't depend directly on mock data.

## Code quality

Check:

- TypeScript errors
- Lint errors
- Unused imports
- Duplicate components
- Huge files
- Poor naming
- Hard-coded API/data logic
- Hard-coded theme colors
- Unnecessary dependencies

## Performance

Check:

- Lists
- Charts
- Animations
- Images
- Re-renders

## Final cleanup

Remove:

- Debug logs
- Temporary components
- Placeholder text
- Unused files
- Unused dependencies

Update TRACKING.md with the final status.

At the end, provide a concise summary of:

1. What was implemented
2. What remains mocked
3. What backend APIs will be required later
4. Any known limitations
5. Final QA status
```

---

## How to use this plan

1. Copy the prompt for the current phase only.
2. After the agent finishes, review the result.
3. Run the app on your Expo phone.
4. Confirm `TRACKING.md` is updated.
5. Only then give the next phase prompt.

Do not let the agent automatically jump to the next phase. That keeps control over the UI and architecture.
