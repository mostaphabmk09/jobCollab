ALTER TYPE "CollaborationNeedType" ADD VALUE IF NOT EXISTS 'FINANCEMENT';

CREATE TABLE "CollaborationOpportunityRequirement" (
    "id" TEXT NOT NULL,
    "collaborationOpportunityId" TEXT NOT NULL,
    "collaborationType" "CollaborationType" NOT NULL,
    "needTypes" "CollaborationNeedType"[] DEFAULT ARRAY[]::"CollaborationNeedType"[] NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollaborationOpportunityRequirement_pkey" PRIMARY KEY ("id")
);

INSERT INTO "CollaborationOpportunityRequirement" (
    "id",
    "collaborationOpportunityId",
    "collaborationType",
    "needTypes",
    "createdAt",
    "updatedAt"
)
SELECT
    md5("id" || random()::text || clock_timestamp()::text),
    "id",
    "collaborationType",
    ARRAY["collaborationNeedType"]::"CollaborationNeedType"[],
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "CollaborationOpportunity"
WHERE "collaborationType" IS NOT NULL
  AND "collaborationNeedType" IS NOT NULL;

ALTER TABLE "CollaborationOpportunity"
    DROP COLUMN "collaborationType",
    DROP COLUMN "collaborationNeedType";

CREATE INDEX "CollaborationOpportunityRequirement_collaborationOpportunityId_idx"
ON "CollaborationOpportunityRequirement"("collaborationOpportunityId");

CREATE INDEX "CollaborationOpportunityRequirement_collaborationType_idx"
ON "CollaborationOpportunityRequirement"("collaborationType");

ALTER TABLE "CollaborationOpportunityRequirement"
ADD CONSTRAINT "CollaborationOpportunityRequirement_collaborationOpportunityId_fkey"
FOREIGN KEY ("collaborationOpportunityId")
REFERENCES "CollaborationOpportunity"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
