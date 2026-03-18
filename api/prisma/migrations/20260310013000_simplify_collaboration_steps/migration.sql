-- CreateEnum
CREATE TYPE "CollaborationNeedType" AS ENUM ('PLACEMENT', 'MATERIAL', 'OPERATOR');

-- Simplify collaboration flow fields.
ALTER TABLE "CollaborationOpportunity"
    ADD COLUMN "collaborationNeedType" "CollaborationNeedType",
    DROP COLUMN "founderContext",
    DROP COLUMN "collaborationReason",
    DROP COLUMN "currentBlocker",
    DROP COLUMN "urgencyLevel",
    DROP COLUMN "roleTitle",
    DROP COLUMN "expectedContribution",
    DROP COLUMN "responsibilities",
    DROP COLUMN "requiredSkills",
    DROP COLUMN "experienceLevel",
    DROP COLUMN "timeCommitment",
    DROP COLUMN "decisionPower";

-- Remove enums no longer used by the simplified flow.
DROP TYPE "UrgencyLevel";
DROP TYPE "ExperienceLevel";
DROP TYPE "TimeCommitment";
DROP TYPE "DecisionPower";
