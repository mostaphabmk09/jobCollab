export type OpportunityStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "PAUSED"
  | "CLOSED"
  | "ARCHIVED";

export type ProjectStage =
  | "IDEA"
  | "CONCEPT_VALIDATED"
  | "PROTOTYPE"
  | "MVP"
  | "EARLY_USERS"
  | "REVENUE";

export type CollaborationType =
  | "CO_FOUNDER"
  | "ASSOCIATE"
  | "STRATEGIC_PARTNER"
  | "OPERATIONAL_PARTNER"
  | "TECHNICAL_PARTNER";

export type CollaborationNeedType = "FINANCEMENT" | "PLACEMENT" | "MATERIAL" | "OPERATOR";

export type OfferType =
  | "EQUITY"
  | "REVENUE_SHARE"
  | "PARTNERSHIP"
  | "CONTRIBUTION_BASED_SHARE"
  | "TO_DISCUSS";

export type TermsFlexibility = "FIXED" | "NEGOTIABLE" | "VERY_FLEXIBLE";

export type CollaborationDetails = {
  id: string;
  opportunityId: string;
  projectCategory: string | null;
  projectStage: ProjectStage | null;
  requirements: CollaborationRequirement[];
  offerType: OfferType | null;
  offerDescription: string | null;
  equityMin: number | null;
  equityMax: number | null;
  revenueShareDetails: string | null;
  financialContributionExpected: boolean;
  financialContributionDescription: string | null;
  termsFlexibility: TermsFlexibility | null;
  createdAt: string;
  updatedAt: string;
};

export type CollaborationRequirement = {
  id: string;
  collaborationOpportunityId: string;
  collaborationType: CollaborationType;
  needTypes: CollaborationNeedType[];
  createdAt: string;
  updatedAt: string;
};

export type StepCompletion = {
  step1: boolean;
  step2: boolean;
  step3: boolean;
};

export type CollaborationOpportunity = {
  id: string;
  title: string | null;
  oneLinePitch: string | null;
  description: string | null;
  type: "COLLABORATION";
  location: string | null;
  status: OpportunityStatus;
  completionPercent: number;
  publishedAt: string | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  collaboration: CollaborationDetails | null;
  missingFields: string[];
  isPublishReady: boolean;
  stepCompletion: StepCompletion;
  preview: {
    building: Record<string, unknown>;
    collaboration: Record<string, unknown>;
    offer: Record<string, unknown>;
  };
};

export type Step1Payload = {
  title: string;
  oneLinePitch: string;
  description: string;
  projectCategory: string;
  projectStage: ProjectStage;
};

export type Step2Payload = {
  requirements: Array<{
    collaborationType: CollaborationType;
    needTypes: CollaborationNeedType[];
  }>;
};

export type Step4Payload = {
  offerType: OfferType;
  offerDescription: string;
  equityMin?: number;
  equityMax?: number;
  revenueShareDetails?: string;
  financialContributionExpected: boolean;
  financialContributionDescription?: string;
  termsFlexibility: TermsFlexibility;
};
