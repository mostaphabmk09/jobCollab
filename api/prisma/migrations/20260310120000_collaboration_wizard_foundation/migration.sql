-- CreateEnum
CREATE TYPE "ProjectStage" AS ENUM (
    'IDEA',
    'CONCEPT_VALIDATED',
    'PROTOTYPE',
    'MVP',
    'EARLY_USERS',
    'REVENUE'
);

-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "CollaborationType" AS ENUM (
    'CO_FOUNDER',
    'ASSOCIATE',
    'STRATEGIC_PARTNER',
    'OPERATIONAL_PARTNER',
    'TECHNICAL_PARTNER'
);

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM (
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED',
    'EXPERT'
);

-- CreateEnum
CREATE TYPE "TimeCommitment" AS ENUM ('FLEXIBLE', 'PART_TIME', 'FULL_TIME');

-- CreateEnum
CREATE TYPE "DecisionPower" AS ENUM (
    'ADVISORY',
    'SHARED',
    'STRONG_OWNERSHIP'
);

-- CreateEnum
CREATE TYPE "OfferType" AS ENUM (
    'EQUITY',
    'REVENUE_SHARE',
    'PARTNERSHIP',
    'CONTRIBUTION_BASED_SHARE',
    'TO_DISCUSS'
);

-- CreateEnum
CREATE TYPE "TermsFlexibility" AS ENUM ('FIXED', 'NEGOTIABLE', 'VERY_FLEXIBLE');

-- Alter OpportunityStatus without losing existing OPEN values.
ALTER TYPE "OpportunityStatus" RENAME TO "OpportunityStatus_old";

CREATE TYPE "OpportunityStatus" AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'PAUSED',
    'CLOSED',
    'ARCHIVED'
);

ALTER TABLE "Opportunity" ALTER COLUMN "status" DROP DEFAULT;

ALTER TABLE "Opportunity"
ALTER COLUMN "status" TYPE "OpportunityStatus"
USING (
    CASE
        WHEN "status"::text = 'OPEN' THEN 'PUBLISHED'
        WHEN "status"::text = 'CLOSED' THEN 'CLOSED'
        WHEN "status"::text = 'ARCHIVED' THEN 'ARCHIVED'
    END
)::"OpportunityStatus";

ALTER TABLE "Opportunity" ALTER COLUMN "status" SET DEFAULT 'DRAFT';

DROP TYPE "OpportunityStatus_old";

-- Opportunity core fields for draft/publish workflow.
ALTER TABLE "Opportunity"
    ALTER COLUMN "title" DROP NOT NULL,
    ALTER COLUMN "description" DROP NOT NULL,
    ADD COLUMN "oneLinePitch" TEXT,
    ADD COLUMN "completionPercent" INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN "publishedAt" TIMESTAMP(3);

-- Collaboration wizard fields.
ALTER TABLE "CollaborationOpportunity"
    DROP COLUMN "equity",
    DROP COLUMN "teamSize",
    ADD COLUMN "projectCategory" TEXT,
    ADD COLUMN "projectStage" "ProjectStage",
    ADD COLUMN "founderContext" TEXT,
    ADD COLUMN "collaborationReason" TEXT,
    ADD COLUMN "currentBlocker" TEXT,
    ADD COLUMN "urgencyLevel" "UrgencyLevel",
    ADD COLUMN "collaborationType" "CollaborationType",
    ADD COLUMN "roleTitle" TEXT,
    ADD COLUMN "expectedContribution" TEXT,
    ADD COLUMN "responsibilities" TEXT,
    ADD COLUMN "experienceLevel" "ExperienceLevel",
    ADD COLUMN "timeCommitment" "TimeCommitment",
    ADD COLUMN "decisionPower" "DecisionPower",
    ADD COLUMN "offerType" "OfferType",
    ADD COLUMN "offerDescription" TEXT,
    ADD COLUMN "equityMin" DOUBLE PRECISION,
    ADD COLUMN "equityMax" DOUBLE PRECISION,
    ADD COLUMN "revenueShareDetails" TEXT,
    ADD COLUMN "financialContributionExpected" BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN "financialContributionDescription" TEXT,
    ADD COLUMN "termsFlexibility" "TermsFlexibility",
    ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

UPDATE "CollaborationOpportunity"
SET "requiredSkills" = ARRAY[]::TEXT[]
WHERE "requiredSkills" IS NULL;

ALTER TABLE "CollaborationOpportunity"
    ALTER COLUMN "requiredSkills" SET DEFAULT ARRAY[]::TEXT[],
    ALTER COLUMN "requiredSkills" SET NOT NULL,
    ALTER COLUMN "updatedAt" DROP DEFAULT;

-- Add updatedAt to existing extension tables.
ALTER TABLE "FinancementOpportunity"
    ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "FinancementOpportunity"
    ALTER COLUMN "updatedAt" DROP DEFAULT;

ALTER TABLE "ImmobilierOpportunity"
    ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "ImmobilierOpportunity"
    ALTER COLUMN "updatedAt" DROP DEFAULT;

-- Indexes for owner queries and public filters.
CREATE INDEX "Opportunity_authorId_idx" ON "Opportunity"("authorId");
CREATE INDEX "Opportunity_type_idx" ON "Opportunity"("type");
CREATE INDEX "Opportunity_status_idx" ON "Opportunity"("status");
CREATE INDEX "CollaborationOpportunity_projectStage_idx" ON "CollaborationOpportunity"("projectStage");
CREATE INDEX "CollaborationOpportunity_collaborationType_idx" ON "CollaborationOpportunity"("collaborationType");
CREATE INDEX "CollaborationOpportunity_offerType_idx" ON "CollaborationOpportunity"("offerType");
