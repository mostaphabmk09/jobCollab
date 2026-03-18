"use client";

import type { CollaborationOpportunity } from "../types";

type OpportunityPreviewProps = {
  opportunity: CollaborationOpportunity;
};

function labelize(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function formatValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "Not provided";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "number") {
    return `${value}`;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return value.replace(/_/g, " ");
  }

  return "Not provided";
}

function PreviewSection({
  title,
  data,
}: {
  title: string;
  data: Record<string, unknown>;
}) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              {labelize(key)}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-800">
              {formatValue(value)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function OpportunityPreview({ opportunity }: OpportunityPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#134e4a_60%,#f59e0b_100%)] px-8 py-8 text-white shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
          Collaboration preview
        </p>
        <h2 className="mt-3 text-3xl font-black">
          {opportunity.title ?? "Untitled collaboration opportunity"}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/85">
          {opportunity.oneLinePitch ??
            "Use the wizard to turn your idea into a clear collaboration pitch."}
        </p>
      </div>

      {!opportunity.isPublishReady && (
        <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm font-semibold text-amber-900">
            Missing before publish
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {opportunity.missingFields.map((field) => (
              <span
                key={field}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-amber-800"
              >
                {labelize(field)}
              </span>
            ))}
          </div>
        </div>
      )}

      <PreviewSection
        title="What are you building?"
        data={opportunity.preview.building}
      />
      <PreviewSection
        title="Collaboration setup"
        data={opportunity.preview.collaboration}
      />
      <PreviewSection
        title="What are you offering?"
        data={opportunity.preview.offer}
      />
    </div>
  );
}
