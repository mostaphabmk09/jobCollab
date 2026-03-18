"use client";

type ProgressItem = {
  label: string;
  done: boolean;
  active: boolean;
};

type CompletionMeterProps = {
  value: number;
  status: string;
  progressItems: ProgressItem[];
  missingFieldsCount: number;
  isPublishReady: boolean;
};

function formatStatusLabel(status: string) {
  return status.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function CompletionMeter({
  value,
  status,
  progressItems,
  missingFieldsCount,
  isPublishReady,
}: CompletionMeterProps) {
  const completedSteps = progressItems.filter((item) => item.done).length;
  const nextPendingStep = progressItems.find((item) => !item.done);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Progress
          </p>
          <div className="mt-2 flex items-end gap-2">
            <p className="text-3xl font-black text-slate-900">{value}%</p>
            <p className="pb-1 text-xs font-medium text-slate-500">
              {completedSteps}/{progressItems.length} done
            </p>
          </div>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-slate-600">
          {formatStatusLabel(status)}
        </span>
      </div>

      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#0f172a_0%,#0f766e_48%,#14b8a6_78%,#f59e0b_100%)] transition-all duration-300"
          style={{ width: `${Math.max(6, value)}%` }}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            isPublishReady
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {isPublishReady
            ? "Ready for publish"
            : `${missingFieldsCount} missing field${
                missingFieldsCount === 1 ? "" : "s"
              }`}
        </span>

        {nextPendingStep && (
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
            Next: {nextPendingStep.label}
          </span>
        )}
      </div>
    </div>
  );
}
