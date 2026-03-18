"use client";

import { useEffect, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import {
  publishCollaborationOpportunity,
  updateCollaborationOpportunityStep1,
  updateCollaborationOpportunityStep2,
  updateCollaborationOpportunityStep4,
} from "../api";
import {
  collaborationNeedTypeOptions,
  collaborationTypeOptions,
  offerTypeOptions,
  projectStageOptions,
  stepLabels,
  stepShortLabels,
  termsFlexibilityOptions,
} from "../constants";
import type {
  CollaborationNeedType,
  CollaborationOpportunity,
  CollaborationType,
  OfferType,
  ProjectStage,
  TermsFlexibility,
} from "../types";
import { CompletionMeter } from "./completion-meter";
import { Field, SelectField, TextareaField } from "./form-fields";
import { OpportunityPreview } from "./opportunity-preview";
import { StepActions } from "./step-actions";
import { StepNavigation } from "./step-navigation";

type WizardProps = {
  accessToken: string;
  initialOpportunity: CollaborationOpportunity;
  onOpportunityChange: (opportunity: CollaborationOpportunity) => void;
};

type Step1Form = {
  title: string;
  oneLinePitch: string;
  description: string;
  projectCategory: string;
  projectStage: ProjectStage;
};

type RequirementRow = {
  collaborationType: CollaborationType;
  needTypes: CollaborationNeedType[];
};

type Step2Form = {
  requirements: RequirementRow[];
};

type Step3Form = {
  offerType: OfferType;
  offerDescription: string;
  equityMin: string;
  equityMax: string;
  revenueShareDetails: string;
  financialContributionExpected: boolean;
  financialContributionDescription: string;
  termsFlexibility: TermsFlexibility;
};

const defaultRequirementRow: RequirementRow = {
  collaborationType: "CO_FOUNDER",
  needTypes: ["PLACEMENT"],
};

function findInitialStep(opportunity: CollaborationOpportunity) {
  if (!opportunity.stepCompletion.step1) return 1;
  if (!opportunity.stepCompletion.step2) return 2;
  if (!opportunity.stepCompletion.step3) return 3;
  return 4;
}

function parseNumber(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const numeric = Number(trimmed);
  return Number.isNaN(numeric) ? undefined : numeric;
}

function getOptionLabel<T extends string>(
  options: ReadonlyArray<{ value: T; label: string }>,
  value: T,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function buildStep1Form(opportunity: CollaborationOpportunity): Step1Form {
  return {
    title: opportunity.title ?? "",
    oneLinePitch: opportunity.oneLinePitch ?? "",
    description: opportunity.description ?? "",
    projectCategory: opportunity.collaboration?.projectCategory ?? "",
    projectStage: opportunity.collaboration?.projectStage ?? "IDEA",
  };
}

function buildStep2Form(opportunity: CollaborationOpportunity): Step2Form {
  const requirements = opportunity.collaboration?.requirements ?? [];

  if (requirements.length === 0) {
    return {
      requirements: [defaultRequirementRow],
    };
  }

  return {
    requirements: requirements.map((requirement) => ({
      collaborationType: requirement.collaborationType,
      needTypes: requirement.needTypes,
    })),
  };
}

function buildStep3Form(opportunity: CollaborationOpportunity): Step3Form {
  return {
    offerType: opportunity.collaboration?.offerType ?? "TO_DISCUSS",
    offerDescription: opportunity.collaboration?.offerDescription ?? "",
    equityMin:
      opportunity.collaboration?.equityMin !== null &&
      opportunity.collaboration?.equityMin !== undefined
        ? String(opportunity.collaboration.equityMin)
        : "",
    equityMax:
      opportunity.collaboration?.equityMax !== null &&
      opportunity.collaboration?.equityMax !== undefined
        ? String(opportunity.collaboration.equityMax)
        : "",
    revenueShareDetails: opportunity.collaboration?.revenueShareDetails ?? "",
    financialContributionExpected:
      opportunity.collaboration?.financialContributionExpected ?? false,
    financialContributionDescription:
      opportunity.collaboration?.financialContributionDescription ?? "",
    termsFlexibility: opportunity.collaboration?.termsFlexibility ?? "NEGOTIABLE",
  };
}

export function OpportunityCreationWizard({
  accessToken,
  initialOpportunity,
  onOpportunityChange,
}: WizardProps) {
  const [opportunity, setOpportunity] = useState(initialOpportunity);
  const [activeStep, setActiveStep] = useState(() => findInitialStep(initialOpportunity));
  const [savingStep, setSavingStep] = useState<number | null>(null);
  const [publishLoading, setPublishLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [step1, setStep1] = useState(() => buildStep1Form(initialOpportunity));
  const [step2, setStep2] = useState(() => buildStep2Form(initialOpportunity));
  const [step3, setStep3] = useState(() => buildStep3Form(initialOpportunity));

  useEffect(() => {
    setOpportunity(initialOpportunity);
    setStep1(buildStep1Form(initialOpportunity));
    setStep2(buildStep2Form(initialOpportunity));
    setStep3(buildStep3Form(initialOpportunity));
  }, [initialOpportunity]);

  const updatedAtLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(opportunity.updatedAt)),
    [opportunity.updatedAt],
  );

  const relationSummaries = useMemo(
    () =>
      step2.requirements.map((requirement) => ({
        collaborationTypeLabel: getOptionLabel(
          collaborationTypeOptions,
          requirement.collaborationType,
        ),
        needLabels: requirement.needTypes.map((needType) =>
          getOptionLabel(collaborationNeedTypeOptions, needType),
        ),
      })),
    [step2.requirements],
  );

  const completedSetupSteps = useMemo(
    () => Object.values(opportunity.stepCompletion).filter(Boolean).length,
    [opportunity.stepCompletion],
  );

  const totalNeedSignals = useMemo(
    () =>
      step2.requirements.reduce(
        (sum, requirement) => sum + requirement.needTypes.length,
        0,
      ),
    [step2.requirements],
  );

  const progressItems = useMemo(
    () => [
      {
        label: stepShortLabels[0],
        done: opportunity.stepCompletion.step1,
        active: activeStep === 1,
      },
      {
        label: stepShortLabels[1],
        done: opportunity.stepCompletion.step2,
        active: activeStep === 2,
      },
      {
        label: stepShortLabels[2],
        done: opportunity.stepCompletion.step3,
        active: activeStep === 3,
      },
      {
        label: stepShortLabels[3],
        done: opportunity.isPublishReady,
        active: activeStep === 4,
      },
    ],
    [activeStep, opportunity.isPublishReady, opportunity.stepCompletion],
  );

  function handleOpportunityUpdate(updated: CollaborationOpportunity) {
    setOpportunity(updated);
    onOpportunityChange(updated);
  }

  async function handleSaveStep1() {
    setSavingStep(1);
    setError(null);

    try {
      const updated = await updateCollaborationOpportunityStep1(
        opportunity.id,
        accessToken,
        step1,
      );

      handleOpportunityUpdate(updated);
      setActiveStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save step 1.");
    } finally {
      setSavingStep(null);
    }
  }

  async function handleSaveStep2() {
    setSavingStep(2);
    setError(null);

    try {
      const updated = await updateCollaborationOpportunityStep2(
        opportunity.id,
        accessToken,
        {
          requirements: step2.requirements.map((requirement) => ({
            collaborationType: requirement.collaborationType,
            needTypes: requirement.needTypes,
          })),
        },
      );

      handleOpportunityUpdate(updated);
      setActiveStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save step 2.");
    } finally {
      setSavingStep(null);
    }
  }

  async function handleSaveStep3() {
    setSavingStep(3);
    setError(null);

    try {
      const updated = await updateCollaborationOpportunityStep4(
        opportunity.id,
        accessToken,
        {
          offerType: step3.offerType,
          offerDescription: step3.offerDescription,
          equityMin: parseNumber(step3.equityMin),
          equityMax: parseNumber(step3.equityMax),
          revenueShareDetails: step3.revenueShareDetails || undefined,
          financialContributionExpected: step3.financialContributionExpected,
          financialContributionDescription:
            step3.financialContributionDescription || undefined,
          termsFlexibility: step3.termsFlexibility,
        },
      );

      handleOpportunityUpdate(updated);
      setActiveStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save the offer step.");
    } finally {
      setSavingStep(null);
    }
  }

  async function handlePublish() {
    setPublishLoading(true);
    setError(null);

    try {
      const updated = await publishCollaborationOpportunity(
        opportunity.id,
        accessToken,
      );
      handleOpportunityUpdate(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to publish.");
    } finally {
      setPublishLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)]">
        <div className="rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#eff6ff_52%,#ecfeff_100%)] p-4 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Collaboration module
                </span>
                <span className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
                  {relationSummaries.length} relation
                  {relationSummaries.length === 1 ? "" : "s"} mapped
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                  {completedSetupSteps}/3 complete
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 font-mono text-[11px] text-slate-600">
                  {opportunity.id}
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                  Saved {updatedAtLabel}
                </span>
              </div>

              <h1 className="mt-2 text-lg font-black text-slate-900 md:text-xl">
                Collaboration setup now supports multiple relations
              </h1>
            </div>

            <div className="flex flex-wrap gap-2 xl:justify-end">
              <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700">
                {totalNeedSignals} need signal{totalNeedSignals === 1 ? "" : "s"}
              </span>
              <Link
                href={`/dashboard/collaboration-opportunities/${opportunity.id}/preview`}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
              >
                Open preview
              </Link>
              <Link
                href="/dashboard/collaboration-opportunities"
                className="rounded-full border border-transparent bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Back to drafts
              </Link>
            </div>
          </div>
        </div>

        <CompletionMeter
          value={opportunity.completionPercent}
          status={opportunity.status}
          progressItems={progressItems}
          missingFieldsCount={opportunity.missingFields.length}
          isPublishReady={opportunity.isPublishReady}
        />
      </div>

      <StepNavigation
        activeStep={activeStep}
        labels={stepShortLabels}
        stepCompletion={opportunity.stepCompletion}
        onStepChange={setActiveStep}
      />

      {error && (
        <div className="rounded-[24px] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          {activeStep === 1 && (
            <Step1Panel
              step1={step1}
              setStep1={setStep1}
              saving={savingStep === 1}
              onSave={handleSaveStep1}
            />
          )}

          {activeStep === 2 && (
            <Step2Panel
              step2={step2}
              setStep2={setStep2}
              saving={savingStep === 2}
              onBack={() => setActiveStep(1)}
              onSave={handleSaveStep2}
            />
          )}

          {activeStep === 3 && (
            <Step3Panel
              step3={step3}
              setStep3={setStep3}
              saving={savingStep === 3}
              onBack={() => setActiveStep(2)}
              onSave={handleSaveStep3}
            />
          )}

          {activeStep === 4 && (
            <div className="space-y-6">
              <OpportunityPreview opportunity={opportunity} />
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Review and publish
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Review the relation rows and the offer, then publish.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveStep(3)}
                      className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
                    >
                      Back to edit
                    </button>
                    <button
                      type="button"
                      onClick={handlePublish}
                      disabled={publishLoading}
                      className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {publishLoading ? "Publishing..." : "Publish opportunity"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Wizard health</p>
            <div className="mt-4 grid gap-3">
              {stepLabels.slice(0, 3).map((label, index) => {
                const key = `step${index + 1}` as keyof CollaborationOpportunity["stepCompletion"];
                const done = opportunity.stepCompletion[key];

                return (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"
                  >
                    <span className="text-sm font-medium text-slate-700">{label}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        done
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {done ? "Complete" : "Needs work"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <OpportunityPreview opportunity={opportunity} />
        </div>
      </div>
    </div>
  );
}

function Step1Panel({
  step1,
  setStep1,
  saving,
  onSave,
}: {
  step1: Step1Form;
  setStep1: Dispatch<SetStateAction<Step1Form>>;
  saving: boolean;
  onSave: () => void;
}) {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Step 1
      </p>
      <h2 className="mt-3 text-2xl font-bold text-slate-900">
        What are you building?
      </h2>

      <div className="mt-8 grid gap-6">
        <Field
          label="Project title"
          value={step1.title}
          onChange={(value) => setStep1((current) => ({ ...current, title: value }))}
        />
        <Field
          label="One-line pitch"
          value={step1.oneLinePitch}
          onChange={(value) =>
            setStep1((current) => ({ ...current, oneLinePitch: value }))
          }
        />
        <TextareaField
          label="Project description"
          value={step1.description}
          onChange={(value) =>
            setStep1((current) => ({ ...current, description: value }))
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Field
            label="Project category"
            value={step1.projectCategory}
            onChange={(value) =>
              setStep1((current) => ({ ...current, projectCategory: value }))
            }
          />
          <SelectField
            label="Project stage"
            value={step1.projectStage}
            options={projectStageOptions}
            onChange={(value) =>
              setStep1((current) => ({
                ...current,
                projectStage: value as ProjectStage,
              }))
            }
          />
        </div>
      </div>

      <StepActions saving={saving} onPrimary={onSave} primaryLabel="Save and continue" />
    </div>
  );
}

function Step2Panel({
  step2,
  setStep2,
  saving,
  onBack,
  onSave,
}: {
  step2: Step2Form;
  setStep2: Dispatch<SetStateAction<Step2Form>>;
  saving: boolean;
  onBack: () => void;
  onSave: () => void;
}) {
  function updateRequirement(
    index: number,
    updater: (requirement: RequirementRow) => RequirementRow,
  ) {
    setStep2((current) => ({
      ...current,
      requirements: current.requirements.map((requirement, currentIndex) =>
        currentIndex === index ? updater(requirement) : requirement,
      ),
    }));
  }

  function addRequirementRow() {
    setStep2((current) => ({
      ...current,
      requirements: [...current.requirements, defaultRequirementRow],
    }));
  }

  function removeRequirementRow(index: number) {
    setStep2((current) => ({
      ...current,
      requirements:
        current.requirements.length === 1
          ? current.requirements
          : current.requirements.filter((_, currentIndex) => currentIndex !== index),
    }));
  }

  function toggleNeedType(index: number, needType: CollaborationNeedType) {
    updateRequirement(index, (requirement) => {
      const isSelected = requirement.needTypes.includes(needType);

      return {
        ...requirement,
        needTypes: isSelected
          ? requirement.needTypes.filter((currentNeedType) => currentNeedType !== needType)
          : [...requirement.needTypes, needType],
      };
    });
  }

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Step 2
      </p>
      <h2 className="mt-3 text-2xl font-bold text-slate-900">
        Collaboration setup
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Add one row per collaboration profile. Each row links a collaboration type
        to one or more concrete needs.
      </p>

      <div className="mt-8 space-y-5">
        {step2.requirements.map((requirement, index) => (
          <div
            key={`${requirement.collaborationType}-${index}`}
            className="rounded-[28px] border border-slate-200 bg-slate-50 p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-900">
                Relation row {index + 1}
              </p>
              <button
                type="button"
                onClick={() => removeRequirementRow(index)}
                disabled={step2.requirements.length === 1}
                className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Remove
              </button>
            </div>

            <div className="mt-5">
              <SelectField
                label="Collaboration type"
                value={requirement.collaborationType}
                options={collaborationTypeOptions}
                onChange={(value) =>
                  updateRequirement(index, (current) => ({
                    ...current,
                    collaborationType: value as CollaborationType,
                  }))
                }
              />
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-900">What do you need?</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {collaborationNeedTypeOptions.map((option) => {
                  const selected = requirement.needTypes.includes(option.value);

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleNeedType(index, option.value)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        selected
                          ? "border-teal-600 bg-teal-50 text-teal-700"
                          : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={addRequirementRow}
          className="rounded-full border border-dashed border-slate-400 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-600"
        >
          + Add another relation
        </button>
      </div>

      <StepActions
        saving={saving}
        onBack={onBack}
        onPrimary={onSave}
        primaryLabel="Save and continue"
      />
    </div>
  );
}

function Step3Panel({
  step3,
  setStep3,
  saving,
  onBack,
  onSave,
}: {
  step3: Step3Form;
  setStep3: Dispatch<SetStateAction<Step3Form>>;
  saving: boolean;
  onBack: () => void;
  onSave: () => void;
}) {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Step 3
      </p>
      <h2 className="mt-3 text-2xl font-bold text-slate-900">
        What are you offering?
      </h2>

      <div className="mt-8 grid gap-6">
        <SelectField
          label="Offer type"
          value={step3.offerType}
          options={offerTypeOptions}
          onChange={(value) =>
            setStep3((current) => ({
              ...current,
              offerType: value as OfferType,
            }))
          }
        />
        <TextareaField
          label="Offer description"
          value={step3.offerDescription}
          onChange={(value) =>
            setStep3((current) => ({ ...current, offerDescription: value }))
          }
        />

        {step3.offerType === "EQUITY" && (
          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Equity min (%)"
              value={step3.equityMin}
              onChange={(value) =>
                setStep3((current) => ({ ...current, equityMin: value }))
              }
            />
            <Field
              label="Equity max (%)"
              value={step3.equityMax}
              onChange={(value) =>
                setStep3((current) => ({ ...current, equityMax: value }))
              }
            />
          </div>
        )}

        {step3.offerType === "REVENUE_SHARE" && (
          <TextareaField
            label="Revenue share details"
            value={step3.revenueShareDetails}
            onChange={(value) =>
              setStep3((current) => ({
                ...current,
                revenueShareDetails: value,
              }))
            }
          />
        )}

        <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-semibold text-slate-900">
                Financial contribution expected?
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Keep this only when money or capital is expected from the collaborator.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setStep3((current) => ({
                  ...current,
                  financialContributionExpected:
                    !current.financialContributionExpected,
                }))
              }
              className={`relative h-8 w-14 rounded-full transition ${
                step3.financialContributionExpected ? "bg-teal-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                  step3.financialContributionExpected ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>

          {step3.financialContributionExpected && (
            <div className="mt-5">
              <TextareaField
                label="Financial contribution details"
                value={step3.financialContributionDescription}
                onChange={(value) =>
                  setStep3((current) => ({
                    ...current,
                    financialContributionDescription: value,
                  }))
                }
              />
            </div>
          )}
        </div>

        <SelectField
          label="Terms flexibility"
          value={step3.termsFlexibility}
          options={termsFlexibilityOptions}
          onChange={(value) =>
            setStep3((current) => ({
              ...current,
              termsFlexibility: value as TermsFlexibility,
            }))
          }
        />
      </div>

      <StepActions
        saving={saving}
        onBack={onBack}
        onPrimary={onSave}
        primaryLabel="Save and continue"
      />
    </div>
  );
}
