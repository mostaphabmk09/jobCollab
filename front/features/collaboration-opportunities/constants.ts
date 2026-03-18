import type {
  CollaborationType,
  CollaborationNeedType,
  OfferType,
  ProjectStage,
  TermsFlexibility,
} from "./types";

export const projectStageOptions: Array<{ value: ProjectStage; label: string }> = [
  { value: "IDEA", label: "Idea" },
  { value: "CONCEPT_VALIDATED", label: "Concept validated" },
  { value: "PROTOTYPE", label: "Prototype" },
  { value: "MVP", label: "MVP" },
  { value: "EARLY_USERS", label: "Early users" },
  { value: "REVENUE", label: "Revenue" },
];

export const collaborationTypeOptions: Array<{
  value: CollaborationType;
  label: string;
}> = [
  { value: "CO_FOUNDER", label: "Co-founder" },
  { value: "ASSOCIATE", label: "Associate" },
  { value: "STRATEGIC_PARTNER", label: "Strategic partner" },
  { value: "OPERATIONAL_PARTNER", label: "Operational partner" },
  { value: "TECHNICAL_PARTNER", label: "Technical partner" },
];

export const collaborationNeedTypeOptions: Array<{
  value: CollaborationNeedType;
  label: string;
}> = [
  { value: "FINANCEMENT", label: "Financement" },
  { value: "PLACEMENT", label: "Placement / local" },
  { value: "MATERIAL", label: "Material / equipment" },
  { value: "OPERATOR", label: "Operator / employee-style execution" },
];

export const offerTypeOptions: Array<{ value: OfferType; label: string }> = [
  { value: "EQUITY", label: "Equity" },
  { value: "REVENUE_SHARE", label: "Revenue share" },
  { value: "PARTNERSHIP", label: "Partnership" },
  { value: "CONTRIBUTION_BASED_SHARE", label: "Contribution-based share" },
  { value: "TO_DISCUSS", label: "To discuss" },
];

export const termsFlexibilityOptions: Array<{
  value: TermsFlexibility;
  label: string;
}> = [
  { value: "FIXED", label: "Fixed" },
  { value: "NEGOTIABLE", label: "Negotiable" },
  { value: "VERY_FLEXIBLE", label: "Very flexible" },
];

export const stepLabels = [
  "What are you building?",
  "Collaboration setup",
  "Offer",
  "Review",
];

export const stepShortLabels = ["Build", "Setup", "Offer", "Review"];

export const collaborationTemplates = [
  {
    title: "Co-founder",
    subtitle: "Shared mission, shared ownership",
    description:
      "Use this when you need someone to build the venture with you from the ground up.",
  },
  {
    title: "Associate",
    subtitle: "Structured operational partnership",
    description:
      "Use this when the project exists and you need a high-trust partner to push it forward.",
  },
  {
    title: "Technical partner",
    subtitle: "Product and execution ownership",
    description:
      "Use this when the blocker is technical leadership, product delivery, or architecture.",
  },
];
