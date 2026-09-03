# Bandmate Backend — Implementation Spec

You are implementing the real backend for the **Bandmate — IELTS Mentor** application.

The React Native / Expo frontend is already implemented and currently uses typed mock services.

Your job is to build a production-ready backend that replaces the frontend mock services with real APIs while preserving the existing frontend behavior, UI, navigation, types, and service contracts.

---

## 1. Project organization

The repository must clearly separate frontend and backend responsibilities.

### Desired project structure

```
Bandmate_IELTS-Mentor-App/
├── frontend/
│   ├── src/
│   ├── assets/
│   ├── app.json
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── tests/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
│
├── docs/
│   ├── APP_DESCRIPTION.md
│   ├── FRONTEND_STACK.md
│   ├── THEME.md
│   ├── DEVELOPMENT_PLAN.md
│   ├── BACKEND_DEVELOPMENT_PLAN.md
│   ├── TRACKING.md
│   └── BACKEND_TRACKING.md
│
├── README.md
└── .gitignore
```

### Frontend move rules

First inspect the current repository structure.

The existing frontend may currently be located at the repository root.

**Do not immediately move the frontend.**

Before moving anything, inspect:

- `package.json`
- `app.json`
- Expo configuration
- TypeScript configuration
- Path aliases
- Imports
- Asset paths
- Scripts
- Metro configuration
- Babel configuration
- Native configuration
- Documentation paths

If moving the frontend into `frontend/` can be done safely, perform the move and update all required paths and scripts.

If moving the frontend could break Expo, imports, assets, or existing commands, **do not move it**. Instead:

- Keep the existing frontend structure unchanged.
- Create a separate top-level `backend/` folder.
- Document this decision in `BACKEND_TRACKING.md`.
- Do not damage or unnecessarily refactor the completed frontend.

The backend must **never** be placed inside the frontend `src/` directory.

The backend must be independently installable and runnable.

---

## 2. Source-of-truth files

Before writing code, inspect the actual repository and locate these files:

1. `BACKEND_DEVELOPMENT_PLAN.md`
2. `APP_DESCRIPTION.md`
3. `FRONTEND_STACK.md`
4. `THEME.md`
5. `DEVELOPMENT_PLAN.md`
6. `TRACKING.md`
7. `BACKEND_TRACKING.md`, if it already exists
8. Existing React Native / Expo source code
9. Existing frontend service interfaces
10. Existing TypeScript types
11. Existing hooks
12. Existing mock services
13. Existing API-related models
14. Existing navigation and screens
15. Existing design-system components
16. Existing mock datasets

If any document is located inside `docs/`, use that actual path.

Do not assume that a file exists at the repository root.

The frontend source code and its service contracts are extremely important.

The backend must be designed around the **existing frontend implementation**.

---

## 3. Product context

| Item | Value |
| --- | --- |
| Product name | Bandmate |
| Product concept | A personal AI IELTS mentor, not simply an IELTS question bank |
| AI mentor | Mira |

### Core product loop

```
Learn
→ Practice
→ Submit
→ AI feedback
→ Weakness detected
→ Study plan updated
→ Test
→ Repeat
```

### Core product question

> What should I practise today to get closer to my target band?

Mira must behave as a **specific IELTS tutor**.

Mira must **not** behave as a generic chatbot.

The backend should support the existing Bandmate experience rather than redesigning it.

---

## 4. Frontend compatibility

The existing frontend currently uses mock services behind typed interfaces.

### Intended architecture

```
Frontend screen
    ↓
Frontend service interface
    ↓
Mock service or real API service
    ↓
Backend REST API
```

The backend must allow this transition:

```
Mock Service
    ↓
Real API Service
```

with **minimal or zero screen-level changes**.

### Before implementing every backend module

1. Inspect the corresponding frontend service.
2. Inspect its TypeScript types.
3. Inspect hooks using the service.
4. Inspect mock response structures.
5. Inspect screens consuming those responses.
6. Identify loading, success, empty, and error states.
7. Match the existing response contract wherever reasonable.

Do not blindly invent incompatible response shapes.

If a backend response must differ:

- Update the frontend API adapter / service layer.
- Do not rewrite the screens unnecessarily.
- Document the compatibility change in `BACKEND_TRACKING.md`.

Do not redesign the frontend.

Do not change existing UI behavior unless a real backend integration requires a clearly justified change.

Do not remove existing mock services until the corresponding real API integration has been tested.

---

## 5. Backend stack

Use:

- Node.js
- TypeScript
- Fastify
- PostgreSQL
- Prisma
- Redis
- BullMQ
- Zod
- JWT access and refresh authentication

Use a **modular monolith** architecture with background workers.

Keep AI provider integrations behind provider-independent interfaces.

Do not couple business logic directly to an AI provider SDK.

Do not introduce microservices prematurely.

---

## 6. Backend architecture

```
React Native / Expo
    ↓
REST API /api/v1
    ↓
Fastify
    ↓
Feature modules
    ↓
PostgreSQL / Redis / Object Storage
    ↓
AI workers
```

AI-heavy operations must use asynchronous jobs through Redis and BullMQ.

Examples:

- Writing evaluation
- Speaking transcription
- Speaking evaluation
- Diagnostic evaluation
- OCR
- Weakness analysis
- Study-plan generation
- Embeddings
- Notification jobs

Do not keep expensive AI operations running inside normal HTTP requests.

---

## 7. Backend project structure

Create a clean backend structure similar to:

```
backend/
├── src/
│   ├── config/
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
│   │   ├── notifications/
│   │   └── subscription/
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
│   ├── types/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── tests/
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

Each module should contain appropriate:

- Routes
- Request schemas
- Response schemas
- Controller / handler
- Service
- Repository / data access where appropriate
- Types
- Tests

Avoid giant controller files.

Avoid unnecessary abstractions.

---

## 8. Database

Use PostgreSQL with Prisma.

Design normalized and scalable schemas for:

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
- WritingDraft
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
- XPTransaction
- Streak
- Achievement
- UserAchievement
- LeagueMembership
- Notification
- NotificationPreference
- Subscription
- AIUsage
- AuditLog where appropriate

Use proper:

- Primary keys
- Foreign keys
- Unique constraints
- Indexes
- Created and updated timestamps
- Soft deletion where appropriate
- Enums where appropriate
- Cascade rules where appropriate

Every user-owned record must be protected by **authenticated ownership**.

Never allow one user to access another user’s records.

---

## 9. Authentication

Implement:

```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
GET  /api/v1/auth/me
```

Also support:

- Forgot password
- Reset password
- Change password
- Email verification

Use secure password hashing.

Use short-lived access tokens.

Use refresh-token rotation.

Store refresh tokens securely, preferably hashed.

Never expose secrets to the mobile application.

Never expose:

- Database credentials
- JWT secrets
- AI provider keys
- Storage credentials
- Internal system prompts
- Private service credentials

---

## 10. Profile and onboarding

Implement real persistence for:

- Name
- Email
- Profile
- Study goal
- Target band
- Exam date
- Academic or General Training
- Daily available minutes
- Current level
- Diagnostic result
- Onboarding completion state

Implement:

```
GET /api/v1/users/me
PATCH /api/v1/users/me

GET /api/v1/users/me/goals
PATCH /api/v1/users/me/goals
```

The backend must validate:

- Target band
- Exam date
- Daily available minutes
- IELTS type
- Current level

Do not trust the client for onboarding completion.

---

## 11. Diagnostic

The current frontend uses a **voice-first diagnostic**.

Do not invent a second onboarding diagnostic unless explicitly required.

Support:

```
POST /api/v1/diagnostics
GET  /api/v1/diagnostics/:id
GET  /api/v1/diagnostics/latest
```

Real flow:

```
Audio upload
→ Object storage
→ Speech-to-text
→ AI evaluation
→ Starting skill bands
→ Initial weaknesses
→ Initial study plan
```

All AI-generated scores must be labeled:

> AI estimated band — for practice purposes only.

Do not present AI estimates as official IELTS scores.

---

## 12. Content

Build database-backed content APIs for:

- Listening
- Reading
- Writing
- Speaking
- Vocabulary
- Grammar
- Mock tests

Do not hardcode content inside route handlers.

Use database-backed content.

Create development seed data based on the existing frontend mock datasets where appropriate.

Do not copy copyrighted Cambridge IELTS material.

Use original sample content or clearly marked licensed content.

---

## 13. Listening

Implement:

```
GET /api/v1/listening/tests
GET /api/v1/listening/tests/:id
GET /api/v1/listening/tests/:id/sections

POST /api/v1/listening/attempts
PATCH /api/v1/listening/attempts/:id
POST /api/v1/listening/attempts/:id/submit

GET /api/v1/listening/attempts/:id/result
GET /api/v1/listening/attempts/:id/review
```

Support:

- Sections 1–4
- Question types
- Difficulty
- Timed mode
- Practice mode
- Audio metadata
- Transcript
- Explanations
- Score
- Estimated band
- Saved difficult questions

Never trust the client for:

- Correct answers
- Score
- Completion state

The server is authoritative.

---

## 14. Reading

Implement:

```
GET /api/v1/reading/tests
GET /api/v1/reading/tests/:id
GET /api/v1/reading/passages/:id

POST /api/v1/reading/attempts
PATCH /api/v1/reading/attempts/:id
POST /api/v1/reading/attempts/:id/submit

GET /api/v1/reading/attempts/:id/result
GET /api/v1/reading/attempts/:id/review
```

Support:

- Academic
- General Training
- Passages
- Required question types
- Explanations
- Saved difficult questions
- Practice mode
- Timed mode

The server must calculate the score.

---

## 15. Writing

Implement:

```
GET /api/v1/writing/tasks
GET /api/v1/writing/tasks/:id

POST /api/v1/writing/drafts
GET /api/v1/writing/drafts/:id
PATCH /api/v1/writing/drafts/:id
DELETE /api/v1/writing/drafts/:id

POST /api/v1/writing/submissions
GET /api/v1/writing/submissions/:id
GET /api/v1/writing/submissions/:id/evaluation
```

Support Task 1 Academic:

- Line graph
- Bar chart
- Pie chart
- Table
- Process
- Map
- Mixed chart

Support Task 1 General Training:

- Formal letter
- Semi-formal letter
- Informal letter

Support Task 2:

- Opinion
- Discussion
- Advantages / disadvantages
- Problem / solution
- Two-part question
- Agree / disagree

### Writing submission flow

```
Client
→ Create submission
→ Enqueue evaluation
→ Return submission ID
→ Worker evaluates
→ Save evaluation
→ Frontend polls or subscribes
→ Frontend receives result
```

AI evaluation must include:

- Task Response or Task Achievement
- Coherence and Cohesion
- Lexical Resource
- Grammatical Range and Accuracy

Also support:

- Estimated band
- Strengths
- Weaknesses
- Sentence-level feedback
- Rewritten paragraph
- Explanation of changes
- Rewrite-yourself exercise
- Recommended next practice

Validate every AI response using Zod.

Do not allow invalid AI output to be stored as a completed evaluation.

---

## 16. Speaking

Implement:

```
GET /api/v1/speaking/topics
GET /api/v1/speaking/topics/:id

POST /api/v1/speaking/sessions
GET /api/v1/speaking/sessions/:id

POST /api/v1/speaking/sessions/:id/recordings
POST /api/v1/speaking/sessions/:id/submit

GET /api/v1/speaking/sessions/:id/result
GET /api/v1/speaking/sessions/:id/transcript
```

Support:

- Part 1
- Part 2
- Part 3

Part 2 must support:

- Cue card
- Preparation period
- Speaking period

### Real flow

```
Mobile recording
→ Object storage
→ Speech-to-text
→ Transcript
→ Audio / speech analysis
→ LLM evaluation
→ Result
```

Evaluate:

- Fluency and Coherence
- Lexical Resource
- Grammatical Range and Accuracy
- Pronunciation

Also analyze where technically possible:

- Pauses
- Filler words
- Repetitions
- Speaking rate
- Vocabulary diversity
- Grammar patterns
- Pronunciation signals

Do not claim pronunciation accuracy from transcript alone.

---

## 17. Vocabulary

Implement:

```
GET /api/v1/vocabulary/categories
GET /api/v1/vocabulary/words
GET /api/v1/vocabulary/words/:id
GET /api/v1/vocabulary/due
GET /api/v1/vocabulary/difficult

POST /api/v1/vocabulary/:wordId/review
POST /api/v1/vocabulary/:wordId/hard
DELETE /api/v1/vocabulary/:wordId/hard
```

Support spaced repetition.

Store:

- Review count
- Interval
- Difficulty
- Last reviewed date
- Next review date
- Status
- User-specific progress

The server determines the next review date.

Do not trust a client-provided next review date.

---

## 18. Grammar

Implement:

```
GET /api/v1/grammar/categories
GET /api/v1/grammar/lessons
GET /api/v1/grammar/lessons/:id
GET /api/v1/grammar/lessons/:id/questions

POST /api/v1/grammar/attempts
GET /api/v1/grammar/attempts/:id/result
```

Support:

- Lessons
- Questions
- Answers
- Explanations
- Results
- Practice again
- Mistake creation

---

## 19. Daily plan

Implement a real adaptive planning engine.

### Inputs

- Current skill bands
- Target band
- Exam date
- Daily available minutes
- Recent practice
- Recent scores
- Weaknesses
- Mistakes
- Vocabulary due items
- Grammar performance
- Writing evaluations
- Speaking evaluations
- Mock results

### Output

Personalized daily tasks.

The weakest and highest-impact areas should receive appropriate priority.

Implement:

```
GET /api/v1/plan/today
GET /api/v1/plan

POST /api/v1/plan/:id/change
POST /api/v1/plan/:id/accept
POST /api/v1/plan/:id/skip

POST /api/v1/plan/tasks/:id/complete
```

Do not make the plan purely random.

Keep planning logic testable as a standalone service.

The backend must calculate and validate task completion.

---

## 20. Mock tests

Implement:

```
GET /api/v1/mocks
GET /api/v1/mocks/:id
GET /api/v1/mocks/:id/lobby

POST /api/v1/mocks/:id/attempts
GET /api/v1/mock-attempts/:id
POST /api/v1/mock-attempts/:id/start

POST /api/v1/mock-attempts/:id/sections/:section/submit
POST /api/v1/mock-attempts/:id/submit

GET /api/v1/mock-attempts/:id/report
GET /api/v1/mock-attempts/:id/plan
```

Support:

- Listening
- Reading
- Writing
- Speaking

Generate:

- Overall estimated band
- Four skill bands
- Question-type performance
- Honest performance summary
- Weaknesses
- Recommended plan changes

All AI scores must be clearly marked as estimated and practice-only.

---

## 21. Progress

Implement:

```
GET /api/v1/progress
GET /api/v1/progress/current
GET /api/v1/progress/history
GET /api/v1/progress/trajectory
GET /api/v1/progress/forecast
GET /api/v1/progress/analytics
```

Calculate:

- Current band
- Target band
- Forecast
- Skill bands
- Trajectory
- Study time
- Practice count
- Accuracy
- Mock history
- Improvement
- Per-skill progress

Do not rely entirely on the LLM for numerical calculations.

Use **deterministic backend calculations**.

---

## 22. Weaknesses

Implement:

```
GET /api/v1/weaknesses
GET /api/v1/weaknesses/:id
```

Detect weaknesses from actual evidence:

- Repeated mistakes
- Low accuracy
- Low criterion scores
- Repeated writing problems
- Speaking fluency issues
- Vocabulary misses
- Grammar mistakes
- Question-type patterns

Store:

- Skill
- Category
- Severity
- Confidence
- Evidence
- Status
- Created timestamp
- Updated timestamp

Use AI to explain and prioritize weaknesses.

Do not make the entire weakness detection system dependent on free-form LLM output.

---

## 23. Mistake notebook

Implement:

```
GET /api/v1/mistakes
GET /api/v1/mistakes/:id
GET /api/v1/mistakes?skill=...

POST /api/v1/mistakes/:id/practice
PATCH /api/v1/mistakes/:id
```

Every mistake should preserve:

- Original question
- User answer
- Correct answer
- Explanation
- Skill
- Category
- Source attempt
- Recommended practice route

“Practice again” must lead to a real relevant drill.

---

## 24. Mira AI mentor

Implement:

```
GET /api/v1/mentor/conversations
POST /api/v1/mentor/conversations

GET /api/v1/mentor/conversations/:id
GET /api/v1/mentor/conversations/:id/messages

POST /api/v1/mentor/conversations/:id/messages
```

Mira must have access to appropriate user context:

- Current band
- Target band
- Weaknesses
- Recent practice
- Mistakes
- Today’s plan
- Exam date
- Study goal

Create an AI context builder.

```
PostgreSQL
    ↓
User facts

Vector knowledge
    ↓
IELTS educational knowledge

LLM
    ↓
Reasoning and response generation
```

Mira must not behave as a generic chatbot.

Use structured AI outputs.

Validate every AI response.

---

## 25. RAG

Use PostgreSQL with **pgvector** initially unless another vector database is clearly justified.

RAG content may include:

- IELTS guidance
- Grammar knowledge
- Vocabulary knowledge
- Writing guidance
- Speaking guidance
- Educational explanations
- Original learning material

Do not put user transactional data into the vector database as the primary source of truth.

User facts remain in PostgreSQL.

---

## 26. AI service layer

Create provider-independent interfaces:

- `AIProvider`
- `LLMProvider`
- `SpeechToTextProvider`
- `TextToSpeechProvider`
- `EmbeddingProvider`
- `OCRProvider`

Create services:

- `WritingEvaluator`
- `SpeakingEvaluator`
- `DiagnosticEvaluator`
- `MentorService`
- `WeaknessAnalyzer`
- `StudyPlanGenerator`
- `ExplanationGenerator`
- `VocabularyAssistant`
- `GrammarAssistant`

Do not scatter AI SDK calls throughout feature modules.

Do not make business logic depend directly on one AI provider.

---

## 27. AI jobs

Use BullMQ.

Create queues such as:

- `writing-evaluation`
- `speaking-transcription`
- `speaking-evaluation`
- `diagnostic-evaluation`
- `weakness-analysis`
- `study-plan`
- `embedding`
- `ocr`
- `notifications`

Each job must have:

- Status
- Retries
- Timeout
- Error handling
- Structured logging
- Idempotency where needed
- Failure handling
- Retry strategy

Do not duplicate evaluations if the same job is retried.

---

## 28. Storage

Use object storage for:

- Audio
- Speaking recordings
- Handwritten images
- OCR inputs
- Listening media

Never store large binary media directly in PostgreSQL.

Implement signed upload and download URLs.

Validate:

- MIME type
- File extension
- File size
- Ownership
- Upload expiration
- File purpose

Never expose private storage credentials to the mobile app.

---

## 29. Gamification

Implement:

- XP
- Streak
- Achievements
- League

Use XP transactions rather than arbitrary client-side XP updates.

The backend must calculate XP.

League must be:

- Opt-in
- Secondary
- Effort / XP based
- Never the primary product focus

---

## 30. Notifications

Create:

- `Notification`
- `NotificationPreference`

Support future notifications for:

- Daily practice reminder
- Streak reminder
- Vocabulary due
- Plan reminder
- AI evaluation complete
- Achievement

Notification delivery should use background jobs where appropriate.

---

## 31. Subscriptions

Keep subscription and payment architecture isolated.

Do not make payment implementation a dependency for the core application.

When implemented:

- Premium limits must be enforced on the backend.
- The client must not determine premium status.
- Subscription webhooks must be validated.
- Subscription events must be idempotent.

---

## 32. Admin

Admin is a **separate web product**.

Build backend APIs for:

- Users
- Content
- IELTS questions
- Writing tasks
- Speaking topics
- Vocabulary
- Grammar
- AI configuration
- AI usage
- Analytics
- Subscriptions

Implement role-based authorization.

Do not mix admin permissions with normal user permissions.

---

## 33. API design

Use:

```
/api/v1
```

Return consistent responses.

### Success response

```json
{
  "data": {},
  "meta": {}
}
```

### Error response

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "...",
    "details": {}
  }
}
```

Use correct HTTP status codes.

Validate all:

- Request bodies
- Route params
- Query strings
- Uploaded files

Use Zod for validation.

---

## 34. Seed data

Create development seed data based on the existing frontend mock content.

Seed:

- Development user
- Profile
- Goals
- Diagnostic
- Listening content
- Reading content
- Writing tasks
- Speaking topics
- Vocabulary
- Grammar
- Mock tests
- Mistakes
- Progress
- Mira conversation data

Do not copy copyrighted IELTS material.

Use original sample content.

Seed data must be deterministic and safe to run in development.

---

## 35. Testing

Every module must include tests.

Test:

- Validation
- Authentication
- Authorization
- Ownership
- Database operations
- Scoring
- SRS
- Weakness detection
- Plan generation
- AI response validation
- Queue processing
- Error handling

Add integration tests for important flows.

### Important end-to-end flows

1. Register → onboarding → diagnostic → plan
2. Login → Today → complete session
3. Listening → submit → score → mistake
4. Reading → submit → score → progress
5. Writing → submit → AI evaluation → weakness
6. Speaking → upload → STT → AI evaluation
7. Vocabulary → review → next due date
8. Grammar → practice → mistake
9. Mock → four sections → report
10. Mistake → practice again
11. Mira → contextual response
12. Progress → forecast → trajectory

---

## 36. Security

Never trust mobile input for:

- Score
- XP
- Premium status
- User ID
- Correct answers
- Permissions
- Completion state
- Ownership
- Subscription state

The backend must be authoritative.

Implement:

- Rate limiting
- Authorization
- Ownership checks
- Secure tokens
- Password hashing
- Request validation
- File validation
- AI usage limits
- Audit logging
- Secure secrets
- CORS configuration
- Security headers
- Safe error responses

Do not log:

- Passwords
- Access tokens
- Refresh tokens
- AI / API secrets
- Private user content unnecessarily

---

## 37. Observability

Implement structured logging.

Track:

- Request ID
- Endpoint
- HTTP status
- Latency
- Errors
- User ID where appropriate
- AI feature
- AI model
- Token usage
- AI cost
- Queue duration
- Job status

Use environment-based logging configuration.

---

## 38. Environment configuration

Create:

`backend/.env.example`

Include configuration placeholders for:

- `NODE_ENV`
- `PORT`
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `ACCESS_TOKEN_EXPIRY`
- `REFRESH_TOKEN_EXPIRY`
- `CORS_ORIGIN`
- Object storage configuration
- AI provider configuration
- Email provider configuration
- Application URL

Never commit real secrets.

Validate required environment variables during startup.

---

## 39. Implementation phases

Follow `BACKEND_DEVELOPMENT_PLAN.md`.

Implement **only one phase at a time**.

Recommended order:

| Phase | Scope |
| --- | --- |
| B01 | Backend foundation |
| B02 | Database and Prisma |
| B03 | Authentication |
| B04 | Profile, onboarding, and diagnostic |
| B05 | Content management APIs |
| B06 | Listening |
| B07 | Reading |
| B08 | Writing and AI evaluation |
| B09 | Speaking, STT, and AI evaluation |
| B10 | Vocabulary and Grammar |
| B11 | Daily plan and session engine |
| B12 | Mock tests and scoring |
| B13 | Progress, weaknesses, and mistakes |
| B14 | Mira AI mentor and RAG |
| B15 | Gamification and notifications |
| B16 | Subscription and payments |
| B17 | Admin backend |
| B18 | Security, performance, and testing |
| B19 | Deployment and production readiness |

Do not jump ahead.

Do not implement future phases early just because they are related.

---

## 40. Phase execution process

At the beginning of every phase:

1. Read `BACKEND_DEVELOPMENT_PLAN.md`.
2. Read the relevant frontend services.
3. Read the relevant frontend types.
4. Read the relevant hooks and screens.
5. Inspect existing backend code.
6. Identify dependencies.
7. Identify required database changes.
8. Define the API contract.
9. Implement the current phase.
10. Add validation.
11. Add authorization.
12. Add tests.
13. Run typecheck.
14. Run lint.
15. Run relevant tests.
16. Run migrations where required.
17. Run seed data where applicable.
18. Update `BACKEND_TRACKING.md`.
19. Document known issues.
20. Stop after completing the current phase.

Do not automatically start the next phase.

---

## 41. Backend tracking

Create and maintain:

`docs/BACKEND_TRACKING.md`

The tracking file must include:

- Current phase
- Phase status
- Completed tasks
- In-progress tasks
- Remaining tasks
- Blocked tasks
- Files created
- Files changed
- Database changes
- API endpoints implemented
- Frontend contracts inspected
- Tests added
- Commands executed
- Test results
- Known limitations
- Decisions and assumptions
- Next recommended phase

Use these statuses:

- Not started
- In progress
- Blocked
- Completed
- Deferred

After every phase:

- Update `BACKEND_TRACKING.md`.
- Record exact completed work.
- Record incomplete work honestly.
- Record failed tests.
- Record unresolved issues.
- Do not mark unimplemented functionality as completed.
- Do not silently skip errors.
- Do not start the next phase automatically.

Also preserve the existing frontend `TRACKING.md`.

Do not replace frontend tracking with backend tracking.

---

## 42. Database migration rules

Use Prisma migrations.

During development, use:

```
npx prisma migrate dev
```

Do not reset the database unless explicitly requested.

Do not manually modify production database structure.

Do not use destructive migrations without explicit approval.

Use proper production migration workflows for deployment.

---

## 43. Definition of done

A backend phase is complete only when:

- Implementation exists.
- Required database schema exists.
- Migrations work.
- Required API routes work.
- Request validation exists.
- Response validation exists where applicable.
- Authentication exists where required.
- Authorization exists.
- Ownership checks exist.
- Frontend contract is compatible.
- Error states are handled.
- Tests exist.
- Typecheck passes.
- Lint passes.
- Relevant tests pass.
- Seed data works where applicable.
- Documentation is updated.
- `BACKEND_TRACKING.md` is updated.
- Existing completed phases are not broken.
- Existing frontend functionality is not broken.

Do not mark a phase complete merely because the server starts.

---

## 44. Final implementation report

After completing the current phase, report:

1. Current phase completed
2. Features implemented
3. Files created
4. Files changed
5. Database changes
6. API endpoints added
7. Frontend services and contracts inspected
8. Tests added
9. Commands executed
10. Test results
11. Known issues
12. Deferred work
13. `BACKEND_TRACKING.md` updates
14. Next recommended phase

Then stop.

Do not implement the next phase without a new explicit instruction.

---

## 45. Final principle

The backend should support the existing Bandmate experience, **not redesign it**.

The frontend already defines the user experience.

The backend provides:

```
DATA
+ AUTHENTICATION
+ BUSINESS LOGIC
+ SCORING
+ PROGRESS
+ WEAKNESS DETECTION
+ AI
+ STORAGE
+ QUEUES
```

Keep the system:

- Modular
- Typed
- Secure
- Testable
- Provider-independent
- Backend-authoritative
- Scalable
- Maintainable
- Compatible with the existing React Native frontend

Implement **one phase at a time** and stop after completing the current phase.
