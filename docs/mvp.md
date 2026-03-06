Digital Bridge — Team Next Steps (MVP Plan)

Goal of the MVP: Build the first working version of Digital Bridge where
users can create opportunities and other users can apply to them.

  ------------------------------------
  1. Backend Tasks (NestJS + Prisma)
  ------------------------------------

Authentication (already mostly done) - Ensure register/login/logout
works correctly - JWT access + refresh token - Protected routes

User Module - Get current user profile - Update profileType - Update
interests

Opportunities Module - Create opportunity - Get all opportunities
(feed) - Get opportunity by ID - Filter opportunities by type - Link
extension tables (collaboration, financement, immobilier)

Applications Module - Apply to opportunity - Get applications for an
opportunity - Accept / reject application

Database - Run Prisma migrations - Verify tables exist: User Opportunity
CollaborationOpportunity FinancementOpportunity ImmobilierOpportunity
Application

  ----------------------------------------
  2. Frontend Tasks (Next.js + Tailwind)
  ----------------------------------------

Auth Pages - /login - /register

Dashboard - Simple user dashboard

Opportunities Pages - /opportunities (list) - /opportunities/[id]
(details) - /opportunities/create

Create Opportunity Form Fields: - title - description - type - location

Conditional fields depending on type.

Opportunity Feed - Show cards with title, type, location - Filter by
type

Opportunity Details - Display opportunity data - Apply button

Apply Modal - Input: message - Submit application

Applications Page - Show applications received for user opportunities -
Accept / Reject buttons

  ----------------------
  3. UI / Design Tasks
  ----------------------

Design the following pages:

Landing Page - Platform explanation - Call to action (Create
opportunity)

Opportunity Card Design - Title - Type badge - Location - Short
description

Create Opportunity Form UI Opportunity Details UI Applications Dashboard
UI

  ------------------
  4. Team Workflow
  ------------------

Recommended team roles:

Backend Developer - NestJS modules - Prisma queries - API endpoints

Frontend Developer - Next.js pages - API integration - UI components

UI/UX Designer - Layouts - Design system - Page mockups

  -------------------------
  5. MVP Success Criteria
  -------------------------

The MVP is successful when users can:

-   Register and login
-   Create an opportunity
-   Browse opportunities
-   View opportunity details
-   Apply to opportunities
-   Manage received applications

  ---------------------------
  6. After MVP (Next Phase)
  ---------------------------

Planned features after MVP:

-   Messaging system
-   Notifications
-   Favorites
-   Reputation system
-   Smart matching algorithm

------------------------------------------------------------------------

End of document.
