"use client";

type StepActionsProps = {
  saving: boolean;
  onBack?: () => void;
  onPrimary: () => void;
  primaryLabel: string;
};

export function StepActions({
  saving,
  onBack,
  onPrimary,
  primaryLabel,
}: StepActionsProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
      <div>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            Previous step
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={onPrimary}
        disabled={saving}
        className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Saving..." : primaryLabel}
      </button>
    </div>
  );
}
