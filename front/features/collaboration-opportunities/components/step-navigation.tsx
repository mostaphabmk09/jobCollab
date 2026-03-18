"use client";

import type { StepCompletion } from "../types";

type StepNavigationProps = {
  activeStep: number;
  labels: string[];
  stepCompletion: StepCompletion;
  onStepChange: (step: number) => void;
};

const completionByStep: Array<keyof StepCompletion | null> = [
  "step1",
  "step2",
  "step3",
  null,
];

export function StepNavigation({
  activeStep,
  labels,
  stepCompletion,
  onStepChange,
}: StepNavigationProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-2.5 shadow-sm">
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {labels.map((label, index) => {
          const step = index + 1;
          const completionKey = completionByStep[index];
          const done = completionKey ? stepCompletion[completionKey] : false;
          const active = step === activeStep;

          return (
            <button
              key={label}
              type="button"
              onClick={() => onStepChange(step)}
              className={`min-w-[118px] flex-1 rounded-2xl border px-3 py-2 text-left transition ${
                active
                  ? "border-teal-500 bg-teal-50"
                  : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                      active
                        ? "bg-teal-600 text-white"
                        : done
                          ? "bg-emerald-600 text-white"
                          : "bg-white text-slate-600"
                    }`}
                  >
                    {step}
                  </span>
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {label}
                  </p>
                </div>

                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    done
                      ? "bg-emerald-500"
                      : active
                        ? "bg-teal-500"
                        : "bg-slate-300"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
