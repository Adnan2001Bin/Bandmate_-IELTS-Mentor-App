# Bandmate Backend — Development Plan

**PART 1 — Full Backend Requirements**

---

## 0. Backend Goal

The backend should turn the current mock-based Bandmate frontend into a real, scalable application.

The backend must support:

```
React Native / Expo
        │
        ▼
     REST API
        │
        ├── Authentication
        ├── User/Profile
        ├── Onboarding
        ├── Diagnostic
        ├── Daily Plan
        ├── Listening
        ├── Reading
        ├── Writing
        ├── Speaking
        ├── Vocabulary
        ├── Grammar
        ├── Mock Tests
        ├── Progress
        ├── Weaknesses
        ├── Mistakes
        ├── Mira / AI Mentor
        └── Notifications
        │
        ├──────── PostgreSQL
        ├──────── Redis
        ├──────── Object Storage
        └──────── AI Services
```

The core product loop remains:

```
Learn
 ↓
Practice
 ↓
Submit
 ↓
AI Feedback
 ↓
Weakness Detection
 ↓
Plan Re-cut
 ↓
Test
 ↓
Progress
 ↓
Repeat
```

This is the central behavior already established in the frontend tracking.

---

## Recommended Backend Stack

This part is the recommended backend architecture rather than something explicitly fixed by the frontend documents.

### Core

- Node.js
- TypeScript
- Fastify
- PostgreSQL
- Prisma ORM
- Redis
- BullMQ
- Zod
- JWT / access + refresh tokens

### AI

Provider-independent AI service layer:

```
AIService
 ├── LLM Provider
 ├── Speech-to-Text Provider
 ├── Text-to-Speech Provider
 ├── Embedding Provider
 └── OCR Provider
```

This prevents the entire application from becoming dependent on one AI provider.

### Storage

Use object storage for:

- Speaking recordings
- Diagnostic recordings
- Listening audio
- Writing handwritten images
- OCR images
- Other future media

PostgreSQL should store **metadata**, not large media files.

---

## Backend Phase List

| Phase | Backend Phase | Status |
| --- | --- | :---: |
| B01 | Backend foundation | ⬜ |
| B02 | Database architecture | ⬜ |
| B03 | Authentication | ⬜ |
| B04 | Profile + onboarding + diagnostic | ⬜ |
| B05 | Content management APIs | ⬜ |
| B06 | Listening | ⬜ |
| B07 | Reading | ⬜ |
| B08 | Writing + AI evaluation | ⬜ |
| B09 | Speaking + STT + AI evaluation | ⬜ |
| B10 | Vocabulary + Grammar | ⬜ |
| B11 | Daily plan + session engine | ⬜ |
| B12 | Mock tests + scoring | ⬜ |
| B13 | Progress + weaknesses + mistakes | ⬜ |
| B14 | Mira AI mentor + RAG | ⬜ |
| B15 | Gamification + notifications | ⬜ |
| B16 | Subscription / payments | ⬜ |
| B17 | Admin backend | ⬜ |
| B18 | Security + performance + testing | ⬜ |
| B19 | Deployment + production | ⬜ |

---

## B01 — Backend Foundation

**Goal:** Create the backend project without implementing business logic yet.

### Structure

```
backend/
├── src/
│   ├── app.ts
│   ├── server.ts
│   │
│   ├── config/
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── onboarding/
│   │   ├── diagnostic/
│   │   ├── plan/
│   │   ├── practice/
│   │   ├── listening/
│   │   ├── reading/
│   │   ├── writing/
│   │   ├── speaking/
│   │   ├── vocabulary/
│   │   ├── grammar/
│   │   ├── mock/
│   │   ├── progress/
│   │   ├── mistakes/
│   │   ├── mentor/
│   │   ├── gamification/
│   │   └── notifications/
│   │
│   ├── services/
│   │   ├── ai/
│   │   ├── storage/
│   │   ├── speech/
│   │   ├── ocr/
│   │   └── notifications/
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │   ├── redis/
│   │   └── queues/
│   │
│   ├── middleware/
│   ├── plugins/
│   ├── utils/
│   └── types/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── tests/
├── .env.example
├── docker-compose.yml
├── package.json
└── README.md
```

### Requirements

- TypeScript strict mode
- Environment validation
- Global error handler
- Request ID
- Structured logging
- CORS
- Security headers
- Rate limiting
- API versioning

**API:**

```
/api/v1/...
```

**Health:**

```
GET /health
GET /health/ready
```

---

## B02 — Database Architecture

PostgreSQL should become the application’s source of truth.

### Main entities

- User
- Profile
- UserGoal
- Diagnostic
- DiagnosticResult
- StudyPlan
- PlanTask
- StudySession
- SessionTask
- ListeningTest
- ListeningSection
- ListeningQuestion
- ListeningAttempt
- ListeningAnswer
- ReadingTest
- ReadingPassage
- ReadingQuestion
- ReadingAttempt
- ReadingAnswer
- WritingTask
- WritingSubmission
- WritingEvaluation
- WritingSentenceFeedback
- WritingRewrite
- SpeakingTopic
- SpeakingSession
- SpeakingPart
- SpeakingRecording
- SpeakingTranscript
- SpeakingEvaluation
- VocabularyCategory
- VocabularyWord
- UserVocabulary
- VocabularyReview
- GrammarCategory
- GrammarLesson
- GrammarQuestion
- GrammarAttempt
- MockTest
- MockSection
- MockAttempt
- MockAnswer
- MockReport
- ProgressSnapshot
- SkillProgress
- Weakness
- Mistake
- MentorConversation
- MentorMessage
- MentorAction
- Achievement
- UserAchievement
- Streak
- XPTransaction
- LeagueMembership
- Notification
- NotificationPreference
- Subscription

### Important database relationships

```
User
 │
 ├── Profile
 ├── UserGoal
 ├── Diagnostic
 ├── StudyPlan
 ├── Attempts
 ├── WritingSubmissions
 ├── SpeakingSessions
 ├── Progress
 ├── Weaknesses
 ├── Mistakes
 ├── VocabularyProgress
 ├── MentorConversations
 ├── XP
 └── Subscription
```

Every user-owned record must have **ownership enforced** at the API/database layer.

### IELTS band data model

Do not store scores as random strings.

Use a numeric representation:

```
4.0
4.5
5.0
5.5
6.0
6.5
7.0
7.5
8.0
8.5
9.0
```

**Skill:**

```ts
type Skill =
  | "listening"
  | "reading"
  | "writing"
  | "speaking";
```

**Writing criteria:**

- `taskResponse`
- `coherenceCohesion`
- `lexicalResource`
- `grammaticalRangeAccuracy`

**Speaking:**

- `fluencyCoherence`
- `lexicalResource`
- `grammaticalRangeAccuracy`
- `pronunciation`

---

## B03 — Authentication

The frontend currently has mock authentication / session persistence.

Replace it with real authentication.

### Features

#### Sign up

```
POST /api/v1/auth/register
```

```json
{
  "name": "User",
  "email": "user@example.com",
  "password": "********"
}
```

#### Sign in

```
POST /api/v1/auth/login
```

#### Refresh

```
POST /api/v1/auth/refresh
```

#### Logout

```
POST /api/v1/auth/logout
```

#### Current user

```
GET /api/v1/auth/me
```

#### Password

```
POST /auth/forgot-password
POST /auth/reset-password
POST /auth/change-password
```

### Requirements

- Password hashing
- Access token
- Refresh token
- Refresh-token rotation
- Session / device management
- Email verification
- Account deletion
- Rate limiting
- Brute-force protection

Never expose to React Native:

- JWT secret
- Database credentials
- AI API keys
- Storage credentials
- Internal prompts

---

## B04 — Profile + Onboarding + Diagnostic

The frontend captures:

- Study goal
- Target band
- Test date
- Academic / General Training
- Daily available time
- Current level
- Diagnostic
- Starting band

These are explicitly part of the completed frontend flow.

### Profile APIs

```
GET /users/me
PATCH /users/me
```

### Goals

```
GET /users/me/goals
PATCH /users/me/goals
```

Example:

```json
{
  "targetBand": 7.0,
  "testType": "academic",
  "examDate": "2027-01-20",
  "dailyMinutes": 45,
  "studyGoal": "university"
}
```

### Diagnostic

```
POST /diagnostics
GET /diagnostics/:id
GET /diagnostics/latest
```

For the current diagnostic:

```
voice recording
      ↓
upload
      ↓
speech-to-text
      ↓
AI evaluation
      ↓
starting bands
      ↓
initial weaknesses
      ↓
first study plan
```

The frontend deliberately deferred the full listening / reading / writing onboarding diagnostic and kept the diagnostic **voice-first**. Preserve that decision.

---

## B05 — Content APIs

Create a proper content layer.

Content should **not** be hardcoded inside API controllers.

### Listening

```
ListeningTest
 └── Sections
      └── Questions
```

### Reading

```
ReadingTest
 └── Passages
      └── Questions
```

### Writing

```
WritingTask
```

### Speaking

```
SpeakingTopic
 ├── Part 1
 ├── Part 2
 └── Part 3
```

### Vocabulary

```
Category
 └── Words
```

### Grammar

```
Category
 └── Lessons
      └── Questions
```

The frontend already expects original listening sets, Academic / General Training reading, writing task types, speaking topics, vocabulary categories, and grammar categories.

---

## B06 — Listening Backend

The frontend supports sections, difficulty, timed mode, questions, results, explanations, and transcript.

### APIs

```
GET /listening/tests
GET /listening/tests/:id
GET /listening/tests/:id/sections
GET /listening/sections/:id
GET /listening/questions/:id
```

**Attempt:**

```
POST /listening/attempts
PATCH /listening/attempts/:id
POST /listening/attempts/:id/submit
GET /listening/attempts/:id/result
GET /listening/attempts/:id/review
```

### Backend scoring

Do **not** trust the client.

Client sends:

```json
{
  "questionId": "...",
  "answer": "B"
}
```

Backend determines:

```
correct answer
       ↓
score
       ↓
band conversion
       ↓
mistakes
       ↓
progress
```

The mobile app must never calculate the **authoritative** result.

---

## B07 — Reading Backend

The frontend supports Academic + General Training, passage questions, results, explanations, and saved difficult questions.

### APIs

```
GET /reading/tests
GET /reading/tests/:id
GET /reading/passages/:id
GET /reading/questions/:id
```

**Attempts:**

```
POST /reading/attempts
PATCH /reading/attempts/:id
POST /reading/attempts/:id/submit
GET /reading/attempts/:id/result
GET /reading/attempts/:id/review
```

**Saved questions:**

```
POST /reading/questions/:id/save
DELETE /reading/questions/:id/save
GET /reading/saved
```

---

## B08 — Writing + AI Evaluation

This is one of the most important backend phases.

The frontend already supports:

- Task 1 / Task 2
- Timed / untimed
- Drafts
- Submission
- AI evaluation
- Four criteria
- Sentence feedback
- Rewritten paragraph
- Rewrite exercise
- Handwritten / OCR flow

These are all already represented in the frontend.

### Task APIs

```
GET /writing/tasks
GET /writing/tasks/:id
```

### Draft

```
POST /writing/drafts
GET /writing/drafts/:id
PATCH /writing/drafts/:id
DELETE /writing/drafts/:id
```

### Submit

```
POST /writing/submissions
```

Example:

```json
{
  "taskId": "...",
  "answer": "...",
  "durationSeconds": 2400,
  "wordCount": 327
}
```

Backend:

```
Submission
    ↓
Save
    ↓
Queue AI evaluation
    ↓
Return submission ID
    ↓
AI Worker
    ↓
Evaluation
    ↓
Persist result
```

Do **not** keep the HTTP request open while the LLM evaluates.

### Writing AI result

```json
{
  "overallBand": 6.5,
  "criteria": {
    "taskResponse": 6.5,
    "coherenceCohesion": 6.0,
    "lexicalResource": 6.5,
    "grammaticalRangeAccuracy": 6.0
  },
  "strengths": [],
  "weaknesses": [],
  "nextPractice": [],
  "sentenceFeedback": [],
  "rewrite": {},
  "estimated": true
}
```

Every AI score must carry:

> **AI estimated band — for practice purposes only.**

That requirement is explicitly in the tracking.

---

## B09 — Speaking + Speech AI

This is another major backend feature.

Current frontend speaking is intentionally simulated: the timer / waveform are real, but there is no real microphone capture or STT yet.

Backend should make this real.

### Flow

```
Mobile microphone
       ↓
Audio file
       ↓
Object Storage
       ↓
Speaking Session
       ↓
Speech-to-Text
       ↓
Transcript
       ↓
Speech analysis
       ↓
LLM evaluation
       ↓
Speaking result
```

### APIs

```
GET /speaking/topics
GET /speaking/topics/:id
POST /speaking/sessions
GET /speaking/sessions/:id
POST /speaking/sessions/:id/recordings
POST /speaking/sessions/:id/submit
GET /speaking/sessions/:id/result
GET /speaking/sessions/:id/transcript
```

### Speaking AI

Evaluate:

- Fluency & Coherence
- Lexical Resource
- Grammatical Range & Accuracy
- Pronunciation

Also analyze:

- Words per minute
- Pause frequency
- Long pauses
- Fillers
- Repetition
- Hesitation
- Sentence length
- Vocabulary diversity
- Grammar patterns
- Pronunciation signals

**Important:** Do not pretend transcript alone can accurately evaluate pronunciation.

Use dedicated speech / audio analysis where possible.

---

## B10 — Vocabulary + Grammar

The frontend already has vocabulary categories, word details, quizzes, SRS, difficult words, grammar lessons, questions, explanations, and results.

### Vocabulary

```
GET /vocabulary/categories
GET /vocabulary/words
GET /vocabulary/words/:id
GET /vocabulary/due
GET /vocabulary/difficult
POST /vocabulary/:wordId/review
POST /vocabulary/:wordId/hard
DELETE /vocabulary/:wordId/hard
```

### SRS

Store:

- `lastReviewedAt`
- `nextReviewAt`
- `interval`
- `reviewCount`
- `difficulty`
- `status`

Backend calculates the next review date.

Do **not** trust the phone’s clock / calculation.

### Grammar

```
GET /grammar/categories
GET /grammar/lessons
GET /grammar/lessons/:id
GET /grammar/lessons/:id/questions
POST /grammar/attempts
GET /grammar/attempts/:id/result
```

---

## B11 — Daily Plan + Session Engine

This is the heart of Bandmate.

The frontend currently has an adaptive plan where the weakest skill receives the most time.

Backend should replace the mock engine.

### Inputs

- Target band
- Current bands
- Exam date
- Daily minutes
- Recent practice
- Weaknesses
- Mistakes
- Skill accuracy
- Practice frequency
- Vocabulary status
- Recent writing scores
- Recent speaking scores
- Mock results

### Output

```
Today's Plan
 ├── Task 1
 ├── Task 2
 ├── Task 3
 └── Task 4
```

Example:

```json
{
  "date": "2026-09-02",
  "totalMinutes": 45,
  "tasks": [
    {
      "skill": "speaking",
      "type": "fluency",
      "minutes": 20
    },
    {
      "skill": "vocabulary",
      "type": "review",
      "minutes": 10
    },
    {
      "skill": "writing",
      "type": "task2",
      "minutes": 15
    }
  ]
}
```

### APIs

```
GET /plan/today
GET /plan
POST /plan/:id/accept
POST /plan/:id/change
POST /plan/:id/skip
POST /plan/tasks/:id/complete
GET /sessions/today
POST /sessions
PATCH /sessions/:id
POST /sessions/:id/complete
GET /sessions/:id/debrief
```

---

## B12 — Mock Tests + Scoring

Frontend mock flow:

```
Lobby
 ↓
Listening
 ↓
Reading
 ↓
Writing
 ↓
Speaking
 ↓
Analyzing
 ↓
Band Report
 ↓
Plan Recommendation
```

The current frontend intentionally uses a model script rather than pretending it contains a complete official Cambridge paper. The real backend should preserve that honesty until actual licensed / authored content exists.

### APIs

```
GET /mocks
GET /mocks/:id
GET /mocks/:id/lobby

POST /mocks/:id/attempts
GET /mock-attempts/:id
POST /mock-attempts/:id/start

POST /mock-attempts/:id/sections/:section/submit

POST /mock-attempts/:id/submit
GET /mock-attempts/:id/report
GET /mock-attempts/:id/plan
POST /mock-attempts/:id/plan/accept
POST /mock-attempts/:id/plan/keep
```

---

## B13 — Progress + Weaknesses + Mistakes

This phase turns Bandmate into an actual mentor instead of a question bank.

The frontend already includes forecast, trajectory, skill progress, history, weaknesses, and the cross-skill mistake notebook.

### Progress

```
GET /progress
GET /progress/current
GET /progress/history
GET /progress/trajectory
GET /progress/analytics
GET /progress/forecast
```

Response:

```json
{
  "currentBand": 6.0,
  "targetBand": 7.0,
  "forecastBand": 6.5,
  "skills": {
    "listening": 6.5,
    "reading": 6.0,
    "writing": 5.5,
    "speaking": 5.5
  }
}
```

### Weakness detection

Don’t simply ask the LLM:

> “What is the user’s weakness?”

Create **deterministic signals** first.

Example:

```
Speaking:
fluency
 ↓
5 recent sessions
 ↓
4 show excessive pauses
 ↓
weakness = fluency
confidence = 0.87
```

Then AI can explain it.

Store:

- `skill`
- `category`
- `severity`
- `confidence`
- `evidence`
- `firstDetectedAt`
- `lastDetectedAt`
- `status`

**Status:**

- `active`
- `improving`
- `resolved`
- `held`

### Mistake notebook

```
GET /mistakes
GET /mistakes/:id
GET /mistakes?skill=grammar
POST /mistakes/:id/practice
PATCH /mistakes/:id
```

Mistake:

```json
{
  "skill": "grammar",
  "category": "articles",
  "questionId": "...",
  "userAnswer": "...",
  "correctAnswer": "...",
  "explanation": "...",
  "practiceRoute": "/grammar/lessons/..."
}
```

The frontend specifically expects **“why”** and **“practice again”**, rather than merely showing “Correct!”.

---

## B14 — Mira AI Mentor + RAG

This is the most important AI architecture.

The frontend’s Mira is designed as a **contextual tutor**, not a generic ChatGPT clone. It uses band, target, weaknesses, and recent practice context.

### Architecture

```
                  ┌──────────────┐
                  │ PostgreSQL   │
                  │ User facts   │
                  └──────┬───────┘
                         │
                         ▼
                  Context Builder
                         │
                  ┌──────┴───────┐
                  │              │
                  ▼              ▼
            User Context      RAG Search
                               │
                               ▼
                         IELTS Knowledge
                               │
                  ┌────────────┴────────────┐
                  │                         │
                  ▼                         ▼
             System Prompt              Retrieved Docs
                  │                         │
                  └────────────┬────────────┘
                               ▼
                              LLM
                               │
                               ▼
                         Structured Result
                               │
                               ▼
                           Mira API
```

### What belongs in PostgreSQL?

- User
- Target
- Current band
- Practice history
- Weaknesses
- Mistakes
- Study plan
- Scores
- Goals

### What belongs in Vector DB / pgvector?

- IELTS guidance
- Grammar knowledge
- Vocabulary explanations
- Writing guidance
- Speaking guidance
- Question explanations
- Educational material

### What belongs in the LLM?

- Reasoning
- Feedback
- Personalized explanations
- Recommendations
- Conversation
- Study-plan suggestions

### Mira APIs

```
GET /mentor/conversations
POST /mentor/conversations
GET /mentor/conversations/:id
GET /mentor/conversations/:id/messages
POST /mentor/conversations/:id/messages
POST /mentor/actions
```

Example:

```json
{
  "message": "What should I practice today?"
}
```

Backend constructs:

```
Current band: 6.0
Target: 7.0
Weakness: Speaking fluency
Exam date: ...
Today's available time: 45 min
Recent practice: ...
Mistakes: ...
Today's plan: ...
```

Then sends that context to Mira.

### Structured AI output

Do not let AI return uncontrolled text when the application expects data.

For example:

```json
{
  "message": "...",
  "intent": "speaking",
  "recommendations": [
    {
      "type": "practice",
      "skill": "speaking",
      "topic": "fluency"
    }
  ],
  "actions": [],
  "confidence": 0.91
}
```

Validate AI output using **Zod** before storing / returning it.

### AI queue architecture

AI operations should use BullMQ / Redis.

```
API
 │
 ▼
Create Job
 │
 ▼
Redis
 │
 ▼
BullMQ Worker
 │
 ├── Writing Evaluation
 ├── Speaking STT
 ├── Speaking Evaluation
 ├── Diagnostic
 ├── Weakness Analysis
 ├── Study Plan
 ├── Embeddings
 └── OCR
```

This prevents expensive AI requests from blocking the mobile API.

---

## B15 — Gamification + Notifications

Frontend already includes:

- XP
- Streak
- League
- Achievements

The league is intentionally **opt-in** and secondary.

### XP

Create immutable transactions:

`XPTransaction`

Examples:

| Action | XP |
| --- | ---: |
| Completed listening | +10 |
| Completed reading | +10 |
| Writing submitted | +20 |
| Speaking session | +20 |
| Daily goal | +25 |
| Mock test | +50 |

Don’t simply store:

```
user.xp = 1000
```

Instead calculate from transactions, or maintain a cached total plus transactions.

### Streak

Track:

- `currentStreak`
- `longestStreak`
- `lastActivityDate`

Use **server timezone** rules.

### League

```
GET /league
POST /league/join
POST /league/leave
```

The frontend requirement is that it is opt-in and sorted by **XP / effort** rather than band.

---

## B16 — Subscription / Payments

This is intentionally later.

Tracking marks premium / paywall as an open decision and recommends deferring payments.

When implemented:

- Free
- Premium
- AI limits
- Writing evaluations / month
- Speaking evaluations / month
- Mentor messages / day
- Mock tests

Backend must **enforce limits**.

Never enforce premium only in React Native.

---

## B17 — Admin Backend

The frontend tracking explicitly treats the admin panel as a **separate web product**, not part of the mobile app.

Build admin APIs separately.

### Admin capabilities

- Dashboard
- Users
- IELTS Content
- Listening
- Reading
- Writing
- Speaking
- Vocabulary
- Grammar
- AI prompts
- AI configurations
- AI usage
- AI costs
- Reports
- Mistakes
- Weaknesses
- Subscriptions
- System settings

**Roles:**

- `user`
- `admin`
- `editor`
- `moderator`

---

## B18 — Security + Testing

### Security

Must have:

- HTTPS
- Password hashing
- JWT rotation
- Rate limiting
- Input validation
- Authorization
- Ownership checks
- File validation
- File size limits
- MIME validation
- AI usage limits
- API abuse protection
- SQL injection protection
- Secure CORS
- Secure headers
- Audit logs

### Especially important

Never allow:

```
GET /users/:id/progress
```

to return another user’s data just because the ID was changed.

Use authenticated ownership:

```
request.user.id
       ↓
database query
       ↓
WHERE userId = authenticatedUserId
```

### AI cost tracking

Create:

`AIUsage`

Store:

- `userId`
- `feature`
- `provider`
- `model`
- `requestTokens`
- `responseTokens`
- `totalTokens`
- `latencyMs`
- `estimatedCost`
- `status`
- `createdAt`

This becomes extremely important once writing / speaking / Mira are real.

---

## B19 — Production

### Deployment

```
Mobile App
    ↓
HTTPS
    ↓
Load Balancer / API
    ↓
Fastify
    │
    ├── PostgreSQL
    ├── Redis
    ├── Object Storage
    └── AI Providers
```

Separate:

- API Server
- Worker Server
- Database
- Redis
- Storage

Workers should process:

- AI
- STT
- OCR
- Embeddings
- Notifications
- Analytics

---

## Final Backend API Structure

Keep the API organized like this:

```
/api/v1

/auth
/users
/onboarding
/diagnostics

/plan
/sessions
/practice

/listening
/reading
/writing
/speaking
/vocabulary
/grammar

/mocks
/mock-attempts

/progress
/weaknesses
/mistakes

/mentor

/league
/gamification
/notifications

/subscription

/admin
```
