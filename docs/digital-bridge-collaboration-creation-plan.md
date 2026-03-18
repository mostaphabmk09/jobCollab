# Digital Bridge — Collaboration Opportunity Creation Module Implementation Plan

## Purpose

This document is a **phase-by-phase implementation plan** for the **Collaboration Opportunity Creation** module of Digital Bridge.

This plan is intentionally focused **only on the creation flow** for a collaboration opportunity.

It does **not** cover freelancer or salaried hiring flows.
It is centered around the idea:

> A user has a project, idea, or business opportunity and wants to publish a structured collaboration post to find the right person to build with.

The plan is written so it can be used directly as an implementation guide for Codex.

---

# 1. Product Scope

## In scope

The module allows an authenticated user to:
- start creating a collaboration opportunity
- save progress as draft
- complete a guided multi-step creation wizard
- preview the final public post
- publish the opportunity
- later reopen and edit drafts

## Out of scope for now

- messaging system
- candidate applications flow
- matching engine
- notifications
- moderation tooling
- analytics dashboard
- freelancer missions
- salaried job postings

---

# 2. Core Product Direction

This is **not a job posting form**.

This is a **collaboration pitch builder**.

The UX should help the user transform a vague idea like:

> "I have a startup idea and I need the right person to build it with me"

into a structured opportunity page that answers:

- what is being built
- why collaboration is needed now
- what the collaborator will own
- what is being offered in return
- how the post will appear before publication

The tone of the flow should feel closer to:
- startup partnership
- project co-building
- strategic collaboration
- value exchange
- shared ownership / shared mission

not:
- employment recruitment
- HR hiring flow
- short freelance task board

---

# 3. Final Creation Flow to Implement

Use a **5-step wizard**.

## Step 1 — What are you building?
This step combines:
- project identity
- project description
- founder context
- why someone should care

### Fields
- `title` (required, UI label: Project title)
- `oneLinePitch` (required)
- `description` (required, UI label: Project description)
- `projectCategory` (required)
- `projectStage` (required)
- `founderContext` (optional but strongly encouraged)

### Notes
`founderContext` is where the poster explains what they already bring.
Examples:
- domain knowledge
- existing network
- validated need
- prototype already started
- traction
- sales capability
- industry experience

This replaces a separate "Why join you?" step.

### UX guidance
Each field should include helper text.

Examples:
- **title**: Clear working title for your opportunity
- **oneLinePitch**: Summarize your project in one sentence
- **description**: Explain the problem, the vision, and what makes this worth building
- **founderContext**: Tell future collaborators what you already bring to the table

---

## Step 2 — Why are you looking for someone now?
This step explains the real reason behind the collaboration request.

### Fields
- `collaborationReason` (required)
- `currentBlocker` (required)
- `urgencyLevel` (optional)

### Intent
This should clarify:
- what is missing today
- why the owner cannot move alone
- why now is the right time to open the opportunity

### Example prompts
- What is blocking progress today?
- Why is this the right moment to bring someone in?
- What complementary strength do you need?

---

## Step 3 — What will this person own?
This is the role definition step.

### Fields
- `collaborationType` (required)
- `roleTitle` (required)
- `expectedContribution` (required)
- `responsibilities` (required)
- `requiredSkills` (required, at least 1)
- `experienceLevel` (optional)
- `timeCommitment` (required)
- `decisionPower` (optional)

### Collaboration types allowed
Only collaboration-first types should be supported.

Recommended enum:
- `CO_FOUNDER`
- `ASSOCIATE`
- `STRATEGIC_PARTNER`
- `OPERATIONAL_PARTNER`
- `TECHNICAL_PARTNER`

If needed for MVP, keep only:
- `CO_FOUNDER`
- `ASSOCIATE`
- `TECHNICAL_PARTNER`

### Intent
This step should answer:
- who is needed
- what they will do
- how deeply they will be involved
- what part of the project they will own

### Helper text ideas
- **roleTitle**: Example: Technical Co-Founder, Growth Associate, Strategic Partner
- **expectedContribution**: Describe the type of value this person should bring
- **responsibilities**: What will they actually handle in the project?
- **timeCommitment**: What level of involvement do you expect?

---

## Step 4 — What are you offering?
This step defines the collaboration model.

### Fields
- `offerType` (required)
- `offerDescription` (required)
- `equityMin` (optional)
- `equityMax` (optional)
- `revenueShareDetails` (optional)
- `financialContributionExpected` (required boolean)
- `financialContributionDescription` (optional)
- `termsFlexibility` (required)

### Offer types allowed
Recommended enum:
- `EQUITY`
- `REVENUE_SHARE`
- `PARTNERSHIP`
- `CONTRIBUTION_BASED_SHARE`
- `TO_DISCUSS`

### Intent
This step should make the value exchange clear.

Examples:
- equity-based co-building
- revenue-share partnership
- operational partnership with shared upside
- terms open for discussion depending on profile

### Conditional behavior
- If `offerType = EQUITY`, show `equityMin` and `equityMax`
- If `financialContributionExpected = true`, show `financialContributionDescription`
- If `offerType = REVENUE_SHARE`, show `revenueShareDetails`

---

## Step 5 — Review and publish
This step is a final preview before publication.

### Features
- full structured preview card/page
- edit buttons per completed section
- validation summary
- save draft button
- publish button

### Preview sections
- What are you building?
- Why are you looking for someone now?
- What will this person own?
- What are you offering?

### Final checks before publish
- all required fields completed
- at least one required skill present
- post status can transition to `PUBLISHED`

---

# 4. Adjusted Data Model for the Current Prisma Architecture

This project already uses a scalable core structure:
- `Opportunity` as the shared root entity
- `CollaborationOpportunity`, `FinancementOpportunity`, and `ImmobilierOpportunity` as extension tables

That architecture is good and should be kept.

For the collaboration creation wizard, the best approach is **not** to replace the current design with a standalone collaboration table.
Instead, adapt the existing schema so that:
- shared fields stay on `Opportunity`
- collaboration-specific creation fields live on `CollaborationOpportunity`
- drafts are supported cleanly
- publishing is validated in backend logic

---

## Data model strategy to keep

### Keep on `Opportunity`
These are shared fields that make sense across all opportunity types:
- `id`
- `type`
- `authorId`
- `title`
- `description`
- `location`
- `status`
- timestamps

### Add or adjust on `Opportunity`
To support the collaboration creation wizard:
- make `title` nullable for drafts
- make `description` nullable for drafts
- add `oneLinePitch`
- add `completionPercent`
- add `publishedAt`
- expand `OpportunityStatus` to support draft/publish lifecycle

### Keep on `CollaborationOpportunity`
All collaboration-only fields from the wizard should live here.
This includes:
- project metadata specific to collaboration
- why the collaboration is needed now
- collaborator role and ownership expectations
- offer and value exchange fields

---

## Important implementation rule

For a multi-step wizard with drafts, many fields must be nullable at database level.

That is intentional.

The database should allow incomplete draft records.
The backend publish endpoint should enforce that all required fields are present before the status changes to `PUBLISHED`.

So the validation strategy should be:
- Prisma: flexible enough for draft saving
- DTOs: validate each step payload
- Publish service: validate all required fields globally before publish

---

## Adjusted Prisma schema for the current project

Use the following schema shape as the reference implementation.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

//////////////////////////////////////////////////////
// ENUMS
//////////////////////////////////////////////////////

enum Role {
  USER
  ADMIN
}

enum ProfileType {
  INDIVIDUAL
  ENTREPRENEUR
  INVESTOR
  AGENCY
  COMPANY
}

enum Interest {
  COLLABORATION
  FINANCEMENT
  IMMOBILIER
}

enum OpportunityType {
  COLLABORATION
  FINANCEMENT
  IMMOBILIER
}

enum OpportunityStatus {
  DRAFT
  PUBLISHED
  PAUSED
  CLOSED
  ARCHIVED
}

enum ApplicationStatus {
  PENDING
  ACCEPTED
  REJECTED
}

enum ProjectStage {
  IDEA
  CONCEPT_VALIDATED
  PROTOTYPE
  MVP
  EARLY_USERS
  REVENUE
}

enum UrgencyLevel {
  LOW
  MEDIUM
  HIGH
}

enum CollaborationType {
  CO_FOUNDER
  ASSOCIATE
  STRATEGIC_PARTNER
  OPERATIONAL_PARTNER
  TECHNICAL_PARTNER
}

enum ExperienceLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  EXPERT
}

enum TimeCommitment {
  FLEXIBLE
  PART_TIME
  FULL_TIME
}

enum DecisionPower {
  ADVISORY
  SHARED
  STRONG_OWNERSHIP
}

enum OfferType {
  EQUITY
  REVENUE_SHARE
  PARTNERSHIP
  CONTRIBUTION_BASED_SHARE
  TO_DISCUSS
}

enum TermsFlexibility {
  FIXED
  NEGOTIABLE
  VERY_FLEXIBLE
}

//////////////////////////////////////////////////////
// USER
//////////////////////////////////////////////////////

model User {
  id             String        @id @default(uuid())
  email          String        @unique
  password       String
  role           Role          @default(USER)
  profileType    ProfileType?
  interests      Interest[]    @default([])
  refreshToken   String?

  opportunities  Opportunity[]
  applications   Application[]
  favorites      Favorite[]

  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
}

//////////////////////////////////////////////////////
// OPPORTUNITY CORE
//////////////////////////////////////////////////////

model Opportunity {
  id                String               @id @default(uuid())

  title             String?
  oneLinePitch      String?
  description       String?              @db.Text

  type              OpportunityType
  location          String?
  status            OpportunityStatus    @default(DRAFT)
  completionPercent Int                  @default(0)
  publishedAt       DateTime?

  authorId          String
  author            User                 @relation(fields: [authorId], references: [id], onDelete: Cascade)

  collaboration     CollaborationOpportunity?
  financement       FinancementOpportunity?
  immobilier        ImmobilierOpportunity?

  applications      Application[]
  favorites         Favorite[]

  createdAt         DateTime             @default(now())
  updatedAt         DateTime             @updatedAt

  @@index([authorId])
  @@index([type])
  @@index([status])
}

//////////////////////////////////////////////////////
// COLLABORATION OPPORTUNITY
//////////////////////////////////////////////////////

model CollaborationOpportunity {
  id                               String             @id @default(uuid())

  opportunityId                    String             @unique
  opportunity                      Opportunity        @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  projectCategory                  String?
  projectStage                     ProjectStage?
  founderContext                   String?            @db.Text

  collaborationReason              String?            @db.Text
  currentBlocker                   String?            @db.Text
  urgencyLevel                     UrgencyLevel?

  collaborationType                CollaborationType?
  roleTitle                        String?
  expectedContribution             String?            @db.Text
  responsibilities                 String?            @db.Text
  requiredSkills                   String[]           @default([])
  experienceLevel                  ExperienceLevel?
  timeCommitment                   TimeCommitment?
  decisionPower                    DecisionPower?

  offerType                        OfferType?
  offerDescription                 String?            @db.Text
  equityMin                        Float?
  equityMax                        Float?
  revenueShareDetails              String?            @db.Text
  financialContributionExpected    Boolean            @default(false)
  financialContributionDescription String?            @db.Text
  termsFlexibility                 TermsFlexibility?

  createdAt                        DateTime           @default(now())
  updatedAt                        DateTime           @updatedAt

  @@index([projectStage])
  @@index([collaborationType])
  @@index([offerType])
}

//////////////////////////////////////////////////////
// FINANCEMENT OPPORTUNITY
//////////////////////////////////////////////////////

model FinancementOpportunity {
  id               String      @id @default(uuid())

  opportunityId    String      @unique
  opportunity      Opportunity @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  investmentNeeded Float
  equityOffered    Float?
  revenueShare     Float?

  createdAt        DateTime    @default(now())
  updatedAt        DateTime    @updatedAt
}

//////////////////////////////////////////////////////
// IMMOBILIER OPPORTUNITY
//////////////////////////////////////////////////////

model ImmobilierOpportunity {
  id               String      @id @default(uuid())

  opportunityId    String      @unique
  opportunity      Opportunity @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  propertyType     String
  city             String
  investmentBudget Float
  expectedROI      Float?

  createdAt        DateTime    @default(now())
  updatedAt        DateTime    @updatedAt
}

//////////////////////////////////////////////////////
// APPLICATIONS
//////////////////////////////////////////////////////

model Application {
  id               String            @id @default(uuid())
  message          String?
  status           ApplicationStatus @default(PENDING)

  applicantId      String
  applicant        User              @relation(fields: [applicantId], references: [id], onDelete: Cascade)

  opportunityId    String
  opportunity      Opportunity       @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  createdAt        DateTime          @default(now())

  @@unique([applicantId, opportunityId])
}

//////////////////////////////////////////////////////
// FAVORITES
//////////////////////////////////////////////////////

model Favorite {
  id               String      @id @default(uuid())

  userId           String
  user             User        @relation(fields: [userId], references: [id], onDelete: Cascade)

  opportunityId    String
  opportunity      Opportunity @relation(fields: [opportunityId], references: [id], onDelete: Cascade)

  createdAt        DateTime    @default(now())

  @@unique([userId, opportunityId])
}
```

---

## Field ownership mapping

To avoid confusion during implementation, use this ownership mapping.

### Stored on `Opportunity`
- `title`
- `oneLinePitch`
- `description`
- `type`
- `location`
- `status`
- `completionPercent`
- `publishedAt`

### Stored on `CollaborationOpportunity`
- `projectCategory`
- `projectStage`
- `founderContext`
- `collaborationReason`
- `currentBlocker`
- `urgencyLevel`
- `collaborationType`
- `roleTitle`
- `expectedContribution`
- `responsibilities`
- `requiredSkills`
- `experienceLevel`
- `timeCommitment`
- `decisionPower`
- `offerType`
- `offerDescription`
- `equityMin`
- `equityMax`
- `revenueShareDetails`
- `financialContributionExpected`
- `financialContributionDescription`
- `termsFlexibility`

---

## Migration notes for Codex

Codex should apply the collaboration changes with the smallest possible break to the current schema.

### Required schema changes
- change `Opportunity.title` from required to optional
- add `Opportunity.oneLinePitch`
- change `Opportunity.description` from required to optional
- change `OpportunityStatus` values from `OPEN/CLOSED/ARCHIVED` to draft-oriented states
- add `Opportunity.completionPercent`
- add `Opportunity.publishedAt`
- replace minimal collaboration fields with wizard fields in `CollaborationOpportunity`
- add `updatedAt` to extension tables where missing

### Important note about old statuses
If there is already seeded or production data using `OPEN`, handle the enum migration carefully.
Possible strategy:
- map old `OPEN` to `PUBLISHED`
- keep `CLOSED` and `ARCHIVED`
- introduce new `DRAFT` and `PAUSED`

---

## Service-level implementation rule

When creating a collaboration opportunity:
1. create `Opportunity` first with:
   - `type = COLLABORATION`
   - `status = DRAFT`
   - nullable `title`, `description`, `oneLinePitch`
2. create linked `CollaborationOpportunity`
3. save each step independently
4. compute and update `completionPercent`
5. publish only if the required fields from all steps are present

---

# 5. Backend Implementation Plan (NestJS + Prisma)

## Module structure

Recommended module structure:

```txt
src/
  collaboration-opportunities/
    collaboration-opportunities.module.ts
    collaboration-opportunities.controller.ts
    collaboration-opportunities.service.ts
    dto/
      create-collaboration-opportunity.dto.ts
      update-collaboration-opportunity-step1.dto.ts
      update-collaboration-opportunity-step2.dto.ts
      update-collaboration-opportunity-step3.dto.ts
      update-collaboration-opportunity-step4.dto.ts
      publish-collaboration-opportunity.dto.ts
    validators/
    mappers/
```

---

## API endpoints to implement

### Create empty draft
`POST /collaboration-opportunities`

Creates a draft record owned by the current authenticated user.

Response:
- `id`
- `status = DRAFT`
- timestamps

### Get draft / existing opportunity
`GET /collaboration-opportunities/:id`

Restrictions:
- owner can always access
- public users should only access published posts through a separate public route later

### Update Step 1
`PATCH /collaboration-opportunities/:id/step-1`

### Update Step 2
`PATCH /collaboration-opportunities/:id/step-2`

### Update Step 3
`PATCH /collaboration-opportunities/:id/step-3`

### Update Step 4
`PATCH /collaboration-opportunities/:id/step-4`

### Get preview
`GET /collaboration-opportunities/:id/preview`

### Publish
`PATCH /collaboration-opportunities/:id/publish`

### Save as draft explicitly
Optional endpoint:
`PATCH /collaboration-opportunities/:id/save-draft`

### List my opportunities
`GET /me/collaboration-opportunities`

Filters later:
- drafts only
- published only

---

## Backend rules

### Ownership rules
- only the owner can edit a draft
- only the owner can publish their own opportunity
- only draft or paused opportunities can be edited freely
- if already published, editing rules can be restricted later

### Publish rules
Before publish, validate:
- all required fields from steps 1 to 4 are present
- `requiredSkills.length >= 1`
- if `offerType = EQUITY`, at least one equity field is present
- if `financialContributionExpected = true`, description is required

### Completion calculation
Add a service helper to compute `completionPercent`.

Suggested simple scoring:
- Step 1 complete = 30
- Step 2 complete = 20
- Step 3 complete = 30
- Step 4 complete = 20

If all complete => `completionPercent = 100`

---

## DTO recommendations

### `create-collaboration-opportunity.dto.ts`
Create empty draft with minimal payload or no body.

### `update-collaboration-opportunity-step1.dto.ts`
```ts
title: string;
oneLinePitch: string;
description: string;
projectCategory: string;
projectStage: ProjectStage;
founderContext?: string;
```

### `update-collaboration-opportunity-step2.dto.ts`
```ts
collaborationReason: string;
currentBlocker: string;
urgencyLevel?: UrgencyLevel;
```

### `update-collaboration-opportunity-step3.dto.ts`
```ts
collaborationType: CollaborationType;
roleTitle: string;
expectedContribution: string;
responsibilities: string;
requiredSkills: string[];
experienceLevel?: ExperienceLevel;
timeCommitment: TimeCommitment;
decisionPower?: DecisionPower;
```

### `update-collaboration-opportunity-step4.dto.ts`
```ts
offerType: OfferType;
offerDescription: string;
equityMin?: number;
equityMax?: number;
revenueShareDetails?: string;
financialContributionExpected: boolean;
financialContributionDescription?: string;
termsFlexibility: TermsFlexibility;
```

---

# 6. Frontend Implementation Plan (Next.js App Router)

## Page structure

Recommended routes:

```txt
/app/dashboard/collaboration-opportunities/new/page.tsx
/app/dashboard/collaboration-opportunities/[id]/edit/page.tsx
/app/dashboard/collaboration-opportunities/[id]/preview/page.tsx
/app/dashboard/collaboration-opportunities/page.tsx
```

---

## UI architecture

Recommended frontend structure:

```txt
src/
  features/
    collaboration-opportunities/
      components/
        creation/
          opportunity-creation-wizard.tsx
          step-1-project-info.tsx
          step-2-collaboration-reason.tsx
          step-3-role-ownership.tsx
          step-4-offer.tsx
          step-5-review-publish.tsx
          opportunity-preview.tsx
          step-navigation.tsx
          completion-meter.tsx
      hooks/
        use-collaboration-opportunity.ts
        use-create-collaboration-opportunity.ts
        use-update-step-1.ts
        use-update-step-2.ts
        use-update-step-3.ts
        use-update-step-4.ts
        use-publish-collaboration-opportunity.ts
      schemas/
        step-1.schema.ts
        step-2.schema.ts
        step-3.schema.ts
        step-4.schema.ts
      types/
```

---

## Wizard behavior

### First load
On `/new`:
- create an empty draft immediately
- redirect to `/dashboard/collaboration-opportunities/:id/edit`
- open step 1 by default

Alternative:
- first show step 1 locally
- create record on first save

Recommended: create draft early for easier autosave and recovery.

---

## Form strategy

Use:
- React Hook Form
- Zod
- step-specific schemas
- autosave or explicit save buttons

Recommended UX:
- each step has `Save and continue`
- previous step button
- top progress indicator
- right-side or bottom preview summary

---

## Step-by-step UI details

### Step 1 UI
Sections:
- Project identity
- Project vision
- Founder context

Components:
- input: project title
- input: one-line pitch
- textarea: project description
- select: category
- select: project stage
- textarea: founder context

Display helper text under each field.

### Step 2 UI
Sections:
- Why collaboration now?
- What is blocked?

Components:
- textarea: collaboration reason
- textarea: current blocker
- select or radio: urgency

### Step 3 UI
Sections:
- Role
- Ownership
- Skills and involvement

Components:
- select: collaboration type
- input: role title
- textarea: expected contribution
- textarea: responsibilities
- tag input or multiselect: required skills
- select: experience level
- select: time commitment
- select: decision power

### Step 4 UI
Sections:
- Value exchange
- Terms

Components:
- select: offer type
- textarea: offer description
- conditional input pair: equity min / max
- conditional textarea: revenue share details
- switch: financial contribution expected
- conditional textarea: financial contribution description
- select: terms flexibility

### Step 5 UI
Sections:
- full preview
- validation status
- actions

Actions:
- save draft
- go back to edit section
- publish

---

# 7. Suggested Validation Rules

## Step 1
- `title`: min 5, max 120
- `oneLinePitch`: min 10, max 180
- `description`: min 80
- `projectCategory`: required
- `projectStage`: required
- `founderContext`: optional, max 1000

## Step 2
- `collaborationReason`: min 40
- `currentBlocker`: min 20
- `urgencyLevel`: optional

## Step 3
- `collaborationType`: required
- `roleTitle`: min 3, max 100
- `expectedContribution`: min 40
- `responsibilities`: min 40
- `requiredSkills`: array min 1 max 15
- `experienceLevel`: optional
- `timeCommitment`: required
- `decisionPower`: optional

## Step 4
- `offerType`: required
- `offerDescription`: min 20
- if `offerType = EQUITY`, at least `equityMin` or `equityMax` required
- if both equity values provided, `equityMin <= equityMax`
- if `financialContributionExpected = true`, `financialContributionDescription` required
- `termsFlexibility`: required

---

# 8. Preview Mapping Rules

The preview step should not just dump raw fields.
It should format them into readable public sections.

## Section 1 — What are you building?
Use:
- `title`
- `oneLinePitch`
- `description`
- `projectCategory`
- `projectStage`
- `founderContext`

## Section 2 — Why are you looking for someone now?
Use:
- `collaborationReason`
- `currentBlocker`
- `urgencyLevel`

## Section 3 — What will this person own?
Use:
- `collaborationType`
- `roleTitle`
- `expectedContribution`
- `responsibilities`
- `requiredSkills`
- `experienceLevel`
- `timeCommitment`
- `decisionPower`

## Section 4 — What are you offering?
Use:
- `offerType`
- `offerDescription`
- `equityMin`
- `equityMax`
- `revenueShareDetails`
- `financialContributionExpected`
- `financialContributionDescription`
- `termsFlexibility`

---

# 9. Phase-by-Phase Delivery Plan

## Phase 1 — Database and backend foundation
### Goal
Create the model, enums, migration, module, service, and draft creation endpoint.

### Tasks
- create Prisma model `CollaborationOpportunity`
- add enums
- generate migration
- add NestJS module
- add service and controller
- implement `POST /collaboration-opportunities`
- implement `GET /collaboration-opportunities/:id`
- enforce owner access

### Deliverable
A user can create and retrieve an empty draft opportunity.

### Acceptance criteria
- authenticated user can create draft
- draft is stored in DB
- owner can fetch draft
- non-owner cannot access private draft

---

## Phase 2 — Step endpoints and backend validations
### Goal
Implement backend update endpoints for each wizard step.

### Tasks
- create DTOs for step 1 to 4
- implement PATCH endpoints for each step
- validate fields with `class-validator` or Zod on backend
- update `completionPercent`
- keep record in `DRAFT`

### Deliverable
Each step can be saved independently.

### Acceptance criteria
- valid payload updates correct fields
- invalid payload returns clear validation errors
- completion percent updates correctly
- partial updates do not erase unrelated step data

---

## Phase 3 — Frontend wizard shell
### Goal
Build the creation wizard UI and connect it to the draft record.

### Tasks
- create `/new` page
- create draft on entry
- redirect to `/[id]/edit`
- create wizard layout
- create progress indicator
- implement step navigation
- wire each step to API

### Deliverable
A user can navigate all steps and save content to backend.

### Acceptance criteria
- user enters creation flow and draft is created
- step values persist after refresh
- next/previous navigation works
- validation messages are visible on each step

---

## Phase 4 — Full preview and publish flow
### Goal
Build the review page and publish logic.

### Tasks
- create preview component
- map fields into formatted public-style preview
- show missing required sections
- implement publish endpoint
- set `status = PUBLISHED`
- set `publishedAt`

### Deliverable
A completed draft can be reviewed and published.

### Acceptance criteria
- incomplete draft cannot be published
- complete draft can be published
- preview reflects latest saved data
- status changes correctly after publish

---

## Phase 5 — Draft management quality improvements
### Goal
Make the flow reliable and comfortable to use.

### Tasks
- add explicit save draft action
- add unsaved changes warning
- add autosave debounce optionally
- add draft list page
- show draft/published status badges
- allow reopening existing draft for editing

### Deliverable
Users can safely manage incomplete creation flows.

### Acceptance criteria
- draft can be resumed later
- user sees draft status clearly
- accidental refresh does not lose saved data

---

## Phase 6 — UX polish and content quality improvements
### Goal
Improve clarity and post quality.

### Tasks
- add helper text for all fields
- add completion meter
- add lightweight field examples/placeholders
- improve preview typography and section layout
- add required skills tag input polish
- add conditional inputs polish for offer type

### Deliverable
Creation flow feels guided and premium.

### Acceptance criteria
- users understand what to write in each field
- conditional sections appear only when relevant
- preview looks close to final public display

---

# 10. Codex Execution Checklist

Use this exact execution order.

## Backend checklist
- [ ] Add Prisma enums
- [ ] Add `CollaborationOpportunity` model
- [ ] Create migration
- [ ] Generate Prisma client
- [ ] Create NestJS module/controller/service
- [ ] Implement create draft endpoint
- [ ] Implement get opportunity endpoint
- [ ] Implement step 1 update endpoint
- [ ] Implement step 2 update endpoint
- [ ] Implement step 3 update endpoint
- [ ] Implement step 4 update endpoint
- [ ] Implement publish endpoint
- [ ] Add owner authorization checks
- [ ] Add completion percent helper
- [ ] Add publish guard validation

## Frontend checklist
- [ ] Create `/new` route
- [ ] Create edit route by opportunity id
- [ ] Create wizard container
- [ ] Create progress stepper
- [ ] Build Step 1 form
- [ ] Build Step 2 form
- [ ] Build Step 3 form
- [ ] Build Step 4 form
- [ ] Build Step 5 preview page
- [ ] Connect forms to API
- [ ] Add validation with Zod
- [ ] Add save and continue behavior
- [ ] Add loading/error states
- [ ] Add publish action

---

# 11. Recommended API Payload Examples

## Create draft
### Request
```json
{}
```

### Response
```json
{
  "id": "clb_xxx",
  "status": "DRAFT",
  "completionPercent": 0,
  "createdAt": "2026-03-09T10:00:00.000Z",
  "updatedAt": "2026-03-09T10:00:00.000Z"
}
```

---

## Step 1 update payload
```json
{
  "title": "Technical co-founder wanted for B2B logistics startup",
  "oneLinePitch": "We are building a platform to simplify freight coordination for small businesses.",
  "description": "The project aims to solve inefficient freight coordination for small and medium businesses by providing a simple digital workflow for quotes, scheduling, and communication.",
  "projectCategory": "Logistics",
  "projectStage": "MVP",
  "founderContext": "I bring strong industry knowledge, client access, and early validation from logistics operators."
}
```

## Step 2 update payload
```json
{
  "collaborationReason": "I need a partner to help transform the validated concept into a strong, scalable product.",
  "currentBlocker": "The project cannot move fast enough without technical product ownership.",
  "urgencyLevel": "HIGH"
}
```

## Step 3 update payload
```json
{
  "collaborationType": "CO_FOUNDER",
  "roleTitle": "Technical Co-Founder",
  "expectedContribution": "Own product architecture and help lead technical execution.",
  "responsibilities": "Build and evolve the MVP, define the technical roadmap, and participate in core product decisions.",
  "requiredSkills": ["React", "Node.js", "PostgreSQL"],
  "experienceLevel": "ADVANCED",
  "timeCommitment": "FULL_TIME",
  "decisionPower": "STRONG_OWNERSHIP"
}
```

## Step 4 update payload
```json
{
  "offerType": "EQUITY",
  "offerDescription": "This is a long-term equity-based collaboration with strong product ownership.",
  "equityMin": 15,
  "equityMax": 30,
  "financialContributionExpected": false,
  "termsFlexibility": "NEGOTIABLE"
}
```

---

# 12. Suggested Nice-to-Have Items After MVP

Only after the base flow is stable:
- autosave with debounce
- draft duplication
- content quality meter
- AI writing assistance
- anonymous preview mode
- tag suggestions for skills
- saved progress banner

---

# 13. Final Recommendation for Codex

Implement the module in this order:

1. database model and enums
2. backend draft and step endpoints
3. frontend wizard shell
4. step forms and validation
5. preview and publish
6. draft management polish

Do not start with advanced automation.
First make the experience reliable, clear, and easy to complete.

The most important success criterion is:

> A user with only an idea should be able to create and publish a convincing collaboration opportunity without feeling like they are filling an HR form.
