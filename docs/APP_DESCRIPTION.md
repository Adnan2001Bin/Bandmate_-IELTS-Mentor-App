# AI IELTS Mentor — Complete App Description

**Product positioning:** Your Personal AI IELTS Mentor — not simply “an IELTS practice app.”

**Core question the app must always answer:**

> What should I practice today to get closer to my target IELTS band?

That is what turns a collection of IELTS exercises into a genuine AI-powered adaptive mentor.

---

## Core Learning Loop

```
Learn → Practice → Submit → Get AI Feedback → Track Weaknesses → Improve → Test Yourself → Repeat
```

Build a complete IELTS preparation platform where users practice **Listening**, **Reading**, **Writing**, and **Speaking**, while an AI/LLM-powered personal mentor continuously analyzes performance and creates personalized recommendations.

The AI must **not** be just a chatbot. It must understand the user’s:

- Practice history
- Scores
- Mistakes
- Weaknesses
- Target band
- Exam date

…and use that information to guide preparation.

---

## Table of Contents

1. [Home Dashboard](#1--home-dashboard)
2. [Listening](#2--listening)
3. [Reading](#3--reading)
4. [Writing](#4--writing)
5. [Speaking](#5--speaking)
6. [AI IELTS Mentor](#6--ai-ielts-mentor)
7. [AI Conversation Practice](#7--ai-conversation-practice)
8. [IELTS Vocabulary](#8--ielts-vocabulary)
9. [Smart Vocabulary Review](#9--smart-vocabulary-review)
10. [IELTS Grammar Practice](#10--ielts-grammar-practice)
11. [Daily Practice](#11--daily-practice)
12. [Full Mock Tests](#12--full-mock-tests)
13. [Progress Dashboard](#13--progress-dashboard)
14. [AI Weakness Detection](#14--ai-weakness-detection)
15. [Gamification](#15--gamification)
16. [Personalized Study Plan](#16--personalized-study-plan)
17. [Diagnostic Test](#17--diagnostic-test)
18. [Pronunciation Coach](#18--pronunciation-coach)
19. [Reading Content Library](#19--reading-content-library)
20. [Listening Content Library](#20--listening-content-library)
21. [Mistake Notebook](#21--mistake-notebook)
22. [AI Explain Everything](#22--ai-explain-everything)
23. [AI Writing Improvement](#23--ai-writing-improvement)
24. [AI Speaking Modes](#24--ai-speaking-modes)
25. [Smart Notifications](#25--smart-notifications)
26. [User Profile](#26--user-profile)
27. [Premium / Monetization](#27--premium--monetization)
28. [Admin Panel](#28--admin-panel)
29. [Recommended Technical Architecture](#29--recommended-technical-architecture)
30. [AI Architecture for the Mentor](#30--ai-architecture-for-the-mentor)
31. [AI Feature Priorities](#31--ai-feature-priorities)
32. [Recommended Mobile App Structure](#32--recommended-mobile-app-structure)
33. [Core Identity & User Journey](#33--core-identity--user-journey)

---

## 1. 🏠 Home Dashboard

The home screen should immediately tell the user **what they should do today**.

### Dashboard contents

- Current estimated band
- Target band
- Exam date
- Days remaining
- Today’s study goal
- Daily progress
- Current streak
- Recent scores
- Weakest skill
- Recommended practice
- Continue unfinished test
- AI Mentor shortcut

### Example

```
Good morning 👋

Your Target
Band 7.5

Current Estimated Band
6.5

Exam
45 days remaining

Today's Goal
35 minutes

✓ Vocabulary — 10 words
✓ Reading — 1 passage
□ Speaking — 15 minutes
□ Writing — Task 2

Recommended for you:
🎯 Practice Speaking Part 2
```

Recommendations must change based on the user’s performance.

---

## 2. 🎧 Listening

Provide complete IELTS-style listening preparation.

### Practice types

- Listening practice tests
- Full IELTS-style listening tests
- Section 1
- Section 2
- Section 3
- Section 4
- Difficulty levels
- Timed practice
- Full mock tests

### Question types

- Multiple choice
- Matching
- Form completion
- Sentence completion
- Note completion
- Table completion
- Flow-chart completion
- Map labeling
- Diagram labeling

### Audio features

- Play / pause
- Playback speed
- Progress bar
- Replay
- Volume control
- Section navigation

### After submission — results

- Correct answers
- Incorrect answers
- Score
- Estimated band
- Correct answer
- Explanation
- Transcript
- Mistake review

Users should be able to identify **exactly where they made mistakes**.

---

## 3. 📖 Reading

Support both:

- **Academic IELTS**
- **General Training IELTS**

### Practice

- Individual passages
- Full reading tests
- Timed practice
- Difficulty levels

### Question types

- Multiple choice
- True / False / Not Given
- Yes / No / Not Given
- Matching headings
- Matching information
- Matching sentence endings
- Sentence completion
- Summary completion
- Diagram labeling

### Important feature

Every question should provide:

**Question → Answer → Explanation**

Instead of simply:

```
❌ Wrong
```

show:

```
❌ Wrong
Correct answer: B
Why: The passage states that...
```

Users should also be able to **save difficult questions for later review**.

---

## 4. ✍️ Writing

Writing should be one of the strongest parts of the app because it can heavily utilize AI.

### Writing Task 1

**Academic**

- Line graph
- Bar chart
- Pie chart
- Table
- Process
- Map
- Mixed charts

**General Training**

- Formal letter
- Semi-formal letter
- Informal letter

### Writing Task 2

Support:

- Opinion essay
- Discussion essay
- Advantages / disadvantages
- Problem / solution
- Two-part question
- Agree / disagree

### Writing submission

Users should have multiple ways to submit their writing.

#### Method 1 — Type directly in the app (primary MVP)

User selects:

**Writing → Task 1 / Task 2 → Start Test**

The screen contains:

- Question
- Instructions
- Countdown timer
- Writing editor
- Word counter
- Auto-save
- Submit button

**Example**

```
IELTS Writing Task 2

You should spend about 40 minutes on this task.

Some people believe that...

Time remaining: 38:42

┌─────────────────────────────┐
│                             │
│ Write your answer here...   │
│                             │
│                             │
└─────────────────────────────┘

Words: 247 / 250

[ Submit Test ]
```

**Editor features**

- Multiline text
- Word count
- Character count
- Auto-save
- Resume unfinished test
- Timer
- Submit confirmation

If the user has written fewer than 250 words:

> You have written 247 words. IELTS recommends at least 250 words. Do you want to submit anyway?

#### Method 2 — Handwritten submission

Users can also practice writing on paper.

```
Take Photo
     ↓
Upload Page 1
Upload Page 2
Upload Page 3
     ↓
OCR / Handwriting Recognition
     ↓
Extracted Text
     ↓
User Reviews & Corrects
     ↓
Submit
     ↓
AI Evaluation
```

The app should allow users to:

- Take photos
- Upload multiple pages
- Crop images
- Retake photos
- Reorder pages

After OCR:

> We extracted your writing. Please review the text before submitting.

The user can correct OCR mistakes before evaluation.

### Writing auto-save

Writing tests can take up to an hour, so auto-save is important.

```
User writes
     ↓
Auto-save
     ↓
Local storage
     +
Backend synchronization
```

If the user closes the app:

> Continue unfinished writing test

They should be able to continue from where they stopped.

### Full writing mock test

For realistic exam practice:

```
Task 1          20 minutes
     ↓
Task 2          40 minutes
     ↓
Submit
```

For normal practice, users can optionally practice **without the timer**.

### AI writing evaluation

```
Writing Submission
        ↓
Word Count
        ↓
Grammar Analysis
        ↓
Vocabulary Analysis
        ↓
IELTS Rubric Analysis
        ↓
LLM Evaluation
        ↓
Scoring Engine
        ↓
Final Feedback
```

AI evaluates:

| Task | Criteria |
| --- | --- |
| Task 1 | Task Achievement |
| Task 2 | Task Response |
| Both | Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy |

#### Grammar analysis

Identify:

- Grammar mistakes
- Sentence structure
- Articles
- Prepositions
- Verb tense
- Subject-verb agreement
- Complex sentence errors

**Example**

```
❌ Technology have changed the way people communicate.
✅ Technology has changed the way people communicate.

Explain:
"Technology" is singular, so "has" should be used instead of "have."
```

#### Vocabulary analysis

Analyze:

- Repeated words
- Weak vocabulary
- Word choice
- Academic vocabulary
- Collocations
- Spelling
- Vocabulary range

**Example**

```
You used "important" 7 times.

Suggested alternatives:
- Significant
- Crucial
- Essential
- Substantial
```

The AI should also explain **when each alternative is appropriate**.

#### Coherence & cohesion

Analyze:

- Paragraph structure
- Topic sentences
- Linking words
- Logical flow
- Idea progression
- Referencing
- Repetition

**Example**

> Your main ideas are clear, but the transition between paragraphs 2 and 3 could be improved.

#### Task Achievement / Task Response

AI checks:

- Did the user answer the question?
- Did they address every part?
- Is their position clear?
- Are the ideas relevant?
- Are ideas sufficiently developed?
- Are examples provided?
- Are there missing ideas?
- Are there irrelevant ideas?

### Writing score

| Criterion | Estimated Band |
| --- | ---: |
| Task Response | 6.0 |
| Coherence & Cohesion | 6.5 |
| Lexical Resource | 6.5 |
| Grammatical Range & Accuracy | 6.0 |
| **Overall Estimated Band** | **6.5** |

The app should clearly say:

> **AI Estimated Band — for practice purposes only**

It should **not** present the AI result as an official IELTS score.

### Sentence-level feedback

The user can open their essay and see individual mistakes.

**Example**

```
Technology have changed the way people communicate.

Grammar
❌ have
✅ has

Reason:
"Technology" is a singular subject.
```

### Band improvement

After evaluation:

```
Current estimated band    6.5
Target                    7.0

How to improve

Task Response
Develop your main ideas with clearer explanations and specific examples.

Vocabulary
Reduce repetition and improve academic collocations.

Grammar
Practice articles and complex sentence structures.

Coherence
Improve transitions between ideas.
```

Then automatically recommend:

- 🎯 Grammar → Articles
- 🎯 Writing → Task 2 conclusions
- 🎯 Vocabulary → Education
- 🎯 Writing → Opinion Essay

### Writing mistake notebook

Every mistake can be saved.

**Example**

```
Grammar Mistake

❌ People is becoming...
✅ People are becoming...

Error:
Subject-verb agreement
```

After multiple submissions, AI can identify patterns.

```
Your most common writing problems

Articles — 17 mistakes
Subject-verb agreement — 12 mistakes
Prepositions — 10 mistakes
Complex sentences — 8 mistakes
```

This information is then used by the **AI Mentor**.

---

## 5. 🗣️ Speaking

Speaking should probably be the **biggest AI feature** in the application.

User taps: **Start Speaking Test**

The AI acts as an IELTS examiner.

### Part 1

AI asks questions such as:

> Where do you live?

User answers using their microphone.

AI continues with follow-up questions.

### Part 2

AI provides a cue card:

> Describe a memorable trip you have taken.

Then:

```
1 minute preparation
     ↓
2 minutes speaking
     ↓
AI evaluates the answer
```

### Part 3

AI asks deeper questions related to the topic.

### Speaking AI analysis

Analyze:

- Fluency
- Grammar
- Vocabulary
- Pronunciation
- Coherence
- Speaking speed
- Pauses
- Repeated words
- Filler words
- Sentence complexity

**Example**

```
Estimated Band: 6.5

You frequently use "actually", "basically", and "I think".

Try using more precise expressions.
```

### Speaking transcript

After speaking:

```
You said
I think this is very good because...

Better
I believe this is highly beneficial because...
```

The AI should **explain the improvement** rather than simply rewriting the answer.

---

## 6. 🤖 AI IELTS Mentor

This is the **core identity** of the application.

Don’t make AI just a chatbot.

Make it a personal IELTS coach that understands the user’s entire learning history.

The AI can access:

- Previous speaking tests
- Writing scores
- Reading scores
- Listening scores
- Vocabulary performance
- Grammar mistakes
- Speaking mistakes
- Writing mistakes
- Weak topics
- Study history
- Target band
- Exam date

### Example

**User**

> My speaking score is usually 5.5. How can I reach 7?

**AI responds**

```
Target: Band 7.0
Current estimated: 5.5
Target duration: 8 weeks

Your weaknesses
Fluency — Weak
Vocabulary — Moderate
Grammar — Weak
Pronunciation — Good

Today's plan
15 min vocabulary
20 min speaking
15 min grammar
10 min pronunciation
```

---

## 7. 💬 AI Conversation Practice

Users can have natural conversations with AI.

### Topics

- Travel
- Education
- Technology
- Environment
- Food
- Work
- Health
- Society
- Hobbies
- Family

### Example

**AI:** What kind of technology do you use every day?

User answers using voice.

**AI:** Interesting. How has technology changed the way you communicate with people?

### After the conversation — feedback

| Criterion | Score |
| --- | ---: |
| Fluency | 6.0 |
| Grammar | 6.5 |
| Vocabulary | 6.0 |
| Pronunciation | 7.0 |

---

## 8. 📚 IELTS Vocabulary

Create a dedicated vocabulary system.

### Categories

- Education
- Environment
- Technology
- Health
- Society
- Government
- Crime
- Economy
- Travel
- Work
- Science

### Example

**Significant**

- **Meaning:** Important or noticeable
- **Example:** Technology has had a significant impact on education.
- **Synonyms:** Important, Considerable, Substantial, Major

### AI features

- Examples
- Synonyms
- Antonyms
- IELTS-style sentences
- Mini quizzes
- Fill-in-the-blanks
- Personalized vocabulary recommendations

---

## 9. 🧠 Smart Vocabulary Review

Use a spaced-repetition system.

```
Day 1  → Learn
Day 2  → Review
Day 4  → Review
Day 7  → Review
Day 14 → Review
```

The system tracks:

- Words the user knows
- Words they forget
- Words they frequently misuse

Then automatically generates revision sessions.

---

## 10. 📈 IELTS Grammar Practice

Provide IELTS-focused grammar lessons.

### Categories

- Tenses
- Articles
- Prepositions
- Subject-verb agreement
- Conditionals
- Relative clauses
- Complex sentences
- Passive voice
- Modals
- Comparatives
- Conjunctions

Each lesson can contain:

```
Learn → Practice → AI Explanation → Review
```

---

## 11. 🎯 Daily Practice

The application should generate daily tasks.

### Example

```
Today's Goal

🔥 35 minutes

✅ 10 vocabulary words
⬜ 1 speaking practice
⬜ 1 reading passage
⬜ Writing Task 2 introduction

Progress: 40%
```

The daily plan should be **personalized based on weaknesses**.

---

## 12. 📝 Full Mock Tests

Create complete IELTS mock tests.

```
Full Test

Listening — 40 questions
     ↓
Reading — 40 questions
     ↓
Writing — Task 1 + Task 2
     ↓
Speaking — Part 1 + Part 2 + Part 3
```

Then calculate estimated scores.

| Skill | Band |
| --- | ---: |
| Listening | 7.5 |
| Reading | 7.0 |
| Writing | 6.5 |
| Speaking | 6.5 |
| **Overall** | **7.0** |

Also show:

```
🎯 Target: 7.5
Current: 7.0
Gap: 0.5
```

---

## 13. 📊 Progress Dashboard

Show:

**Overall**

- Current Band: 6.5
- Target Band: 7.5

And track:

- Weekly progress
- Monthly progress
- Practice time
- Tests completed
- Questions answered
- Accuracy
- Vocabulary learned
- Speaking sessions
- Writing submissions
- Average writing score
- Average speaking score

---

## 14. 🔍 AI Weakness Detection

This is one of the most important **differentiating features**.

Suppose the user completes 10 writing tests.

The system detects:

```
You frequently struggle with:

- Articles
- Complex sentences
- Linking words
- Task 2 conclusions
```

The app automatically recommends:

```
Recommended Practice

Grammar
→ Articles

Writing
→ Conclusions

Vocabulary
→ Academic linking words
```

The same system should work across **all four IELTS skills**.

---

## 15. 🏆 Gamification

To encourage consistent practice:

- XP
- Daily streak
- Badges
- Levels
- Weekly goals
- Achievements
- Leaderboard
- Practice streak

### Examples

- 🔥 12 Day Streak
- 🏆 Completed 50 Speaking Sessions
- 🎯 Writing Band 7 Achievement

Keep gamification **secondary to learning**.

---

## 16. 🗓️ Personalized Study Plan

During onboarding ask:

**Target Band**

- 5.5
- 6.0
- 6.5
- 7.0
- 7.5
- 8.0+

**Exam Date**

Example: 60 days remaining

**Current Level**

The user takes a diagnostic test.

Then AI creates:

### 60-Day IELTS Plan

**Week 1**

- Grammar foundation
- Basic vocabulary
- Speaking Part 1
- Reading fundamentals

**Week 2**

- Listening
- Writing Task 1
- Speaking Part 2

And so on.

The plan should **adapt based on new test results**.

---

## 17. 🧪 Diagnostic Test

Before creating the personalized plan:

### Assessment

- 10 Listening questions
- 10 Reading questions
- 1 Writing task
- 5-minute Speaking test

Then:

| Skill | Band |
| --- | ---: |
| Listening | 6.0 |
| Reading | 6.5 |
| Writing | 5.5 |
| Speaking | 5.5 |

AI generates the user’s initial roadmap.

---

## 18. 🔊 Pronunciation Coach

Dedicated pronunciation practice.

**Example**

Word: **Environment**

User says the word.

AI analyzes pronunciation.

```
Pronunciation: 82%

Try stressing the second syllable.
```

Eventually support:

- Phonetics
- Word-level pronunciation
- Sentence pronunciation
- Difficult sounds
- Accent clarity
- Intonation

---

## 19. 📰 Reading Content Library

Create an IELTS-focused content library.

### Categories

- Technology
- Environment
- Science
- History
- Education
- Psychology
- Business
- Society

Each article:

```
Read → Vocabulary → Questions → Explanation
```

AI can help generate practice questions from approved content, but the **core content should be curated and quality-controlled**.

---

## 20. 🎧 Listening Content Library

Include:

- Beginner
- Intermediate
- Advanced
- IELTS-style content

### Accents

- British
- American
- Australian
- Canadian

For copyrighted IELTS / Cambridge materials, use **only content you have the appropriate rights to use**.

---

## 21. 🔖 Mistake Notebook

Centralized mistake tracking across the entire app.

```
My Mistakes

├── Listening
├── Reading
├── Writing
│   ├── Grammar
│   ├── Vocabulary
│   └── Coherence
└── Speaking
    ├── Grammar
    ├── Vocabulary
    └── Pronunciation
```

The user can practice their mistakes repeatedly.

This data also feeds the **AI Mentor**.

---

## 22. 🤖 AI Explain Everything

Where appropriate, provide a **Why?** button.

| Context | Example |
| --- | --- |
| Reading | Why is B correct? |
| Grammar | Why is “has” correct? |
| Vocabulary | Why is “significant” better here? |
| Writing | Why did I receive Band 6? |
| Speaking | Why is my fluency score low? |

The AI should explain concepts in **simple language**.

---

## 23. 🔎 AI Writing Improvement

Users can select a sentence.

**Original**

> Technology is very good for students.

**Improved**

> Technology provides significant benefits to students by improving access to educational resources.

Then explain:

- Vocabulary improvement
- Sentence structure
- Grammar
- Academic style

The AI should focus on **teaching the improvement**, not simply rewriting the user’s entire essay.

---

## 24. 🗣️ AI Speaking Modes

| Mode | Behavior |
| --- | --- |
| Practice Mode | AI gives hints and corrections |
| Examiner Mode | AI behaves like an IELTS examiner |
| Challenge Mode | AI asks difficult Part 3 questions |
| Topic Mode | User chooses a topic |
| Random Test | AI chooses everything |

---

## 25. 🔔 Smart Notifications

Examples:

- 🔥 You’re on a 7-day streak!
- Your speaking practice is waiting.
- You have 20 vocabulary words to review.
- Your IELTS exam is 45 days away.
- You haven’t practiced writing this week.

Notifications should be based on the user’s **actual behavior** rather than generic notifications.

---

## 26. 👤 User Profile

Include:

- Name
- Target band
- Current estimated band
- Exam date
- Study goal
- Daily target
- Progress
- Streak
- Test history
- Subscription
- Settings

---

## 27. 💳 Premium / Monetization

### Free

- Limited daily questions
- Basic vocabulary
- Limited AI conversations
- Limited writing evaluations
- Limited speaking evaluations
- Basic progress tracking

### Premium

- Unlimited AI Mentor
- Unlimited speaking evaluation
- Unlimited writing evaluation
- Personalized study plan
- Full mock tests
- Advanced analytics
- AI conversation
- Pronunciation analysis
- Detailed weakness detection

---

## 28. 🛠️ Admin Panel

A web-based admin dashboard should manage the entire platform.

### Content management

- Reading passages
- Listening tests
- Questions
- Vocabulary
- Grammar lessons
- Writing topics
- Speaking topics
- Mock tests

### User management

- Users
- Subscriptions
- Activity
- Progress
- Test history

### AI management

- Prompt templates
- AI model configuration
- Token usage
- AI evaluation logs
- AI costs
- Evaluation quality monitoring

### Analytics

- Most practiced skill
- Most common mistakes
- Average band
- Average session time
- User retention
- Daily active users
- Premium conversion

---

## 29. 🧠 Recommended Technical Architecture

Mobile application built with **React Native**.

```
                    React Native / Expo
                            │
                            ▼
                       Node.js API
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
        PostgreSQL         Redis       Object Storage
             │
             ▼
         IELTS Data
             │
             ▼
          AI Service
             │
       ┌─────┼──────────────┐
       ▼     ▼              ▼
      LLM   Speech-to-Text  TTS
       │
       ▼
    AI Mentor
```

### Mobile

- React Native
- Expo
- TypeScript
- Expo Router
- TanStack Query
- Zustand
- React Hook Form
- Zod

### Backend

- Node.js
- Fastify or NestJS
- PostgreSQL
- Prisma
- Redis
- BullMQ

### AI

- LLM
- Speech-to-Text
- Text-to-Speech
- Embeddings
- Vector Database

### Storage

- Audio recordings
- Speaking recordings
- Handwritten images
- Writing submissions
- Profile images

---

## 30. 🔥 AI Architecture for the Mentor

The most important part is connecting all the user’s learning data.

```
                  User
                   │
                   ▼
            Practice Activity
                   │
        ┌──────────┼───────────┐
        ▼          ▼           ▼
     Writing    Speaking    Mock Tests
        │          │           │
        └──────────┼───────────┘
                   ▼
             Performance Data
                   │
                   ▼
            Weakness Detection
                   │
                   ▼
             User Skill Profile
                   │
                   ▼
               AI Mentor
                   │
        ┌──────────┼───────────┐
        ▼          ▼           ▼
   Study Plan   Daily Tasks   Feedback
        │          │           │
        └──────────┼───────────┘
                   ▼
              More Practice
```

This creates the core **adaptive learning loop**.

---

## 31. 🚀 AI Feature Priorities

Don’t try to build everything initially.

### Phase 1 — MVP

Build:

- User authentication
- IELTS onboarding
- Diagnostic test
- Listening practice
- Reading practice
- Writing practice
- Speaking practice
- Writing typed submission
- Writing AI evaluation
- AI Speaking Examiner
- AI Mentor chat
- Progress dashboard
- Mistake notebook
- Personalized daily practice

### Phase 2

Add:

- Handwritten writing submission + OCR
- Pronunciation analysis
- AI conversation practice
- Advanced vocabulary system
- Spaced repetition
- Weakness detection
- Adaptive study plan
- Advanced analytics
- Full mock tests

### Phase 3

Add:

- Voice AI conversation
- Advanced pronunciation coaching
- AI-generated practice content
- RAG-based IELTS knowledge assistant
- Advanced personalized learning
- Subscription system
- Admin analytics and AI monitoring

---

## 32. 📱 Recommended Mobile App Structure

Don’t put every feature in the bottom navigation.

Use **five primary tabs**:

### Home

```
Home
│
├── Today's Goal
├── Continue Learning
├── AI Mentor
├── Progress
└── Upcoming Test
```

### Practice

```
Practice
│
├── Listening
├── Reading
├── Writing
├── Speaking
├── Vocabulary
└── Grammar
```

### AI Mentor

```
AI Mentor
│
├── Chat
├── Speaking Practice
├── Writing Review
├── Study Plan
└── Ask IELTS
```

### Tests

```
Tests
│
├── Diagnostic Test
├── Mock Test
├── Listening Test
├── Reading Test
├── Writing Test
└── Speaking Test
```

### Profile

```
Profile
│
├── My Progress
├── Mistakes
├── Vocabulary
├── History
├── Goals
└── Settings
```

---

## 33. ⭐ Core Identity & User Journey

Position the product as:

> **Your Personal AI IELTS Mentor**

Not simply:

> “An IELTS practice app.”

### Ideal user journey

```
                    New User
                       │
                       ▼
                Set Target Band
                       │
                       ▼
                 Diagnostic Test
                       │
                       ▼
              AI Understands Level
                       │
                       ▼
              Personalized Study Plan
                       │
                       ▼
                  Daily Practice
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      Listening     Reading     Writing
                                     │
                                Type / Photo
                                     │
                                     ▼
                                AI Evaluation
                                     │
          ┌──────────────────────────┘
          ▼
       Speaking
          │
          ▼
    AI Examiner
          │
          ▼
   Performance Analysis
          │
          ▼
    Weakness Detection
          │
          ▼
    AI Updates Study Plan
          │
          ▼
     Targeted Practice
          │
          ▼
       Mock Test
          │
          ▼
     New Performance
          │
          └───────────────► Repeat
```

### The key differentiator

The app should continuously answer one question for the user:

> **What should I practice today to get closer to my target IELTS band?**

That is what turns it from a collection of IELTS exercises into a genuine AI-powered adaptive IELTS mentor.
