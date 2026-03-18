"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listMyCollaborationOpportunities } from "@/features/collaboration-opportunities/api";
import { collaborationTemplates } from "@/features/collaboration-opportunities/constants";
import type { CollaborationOpportunity } from "@/features/collaboration-opportunities/types";
import { useAuth } from "@/context/AuthContext";

export default function CollaborationOpportunitiesDashboardPage() {
  const { accessToken } = useAuth();
  const [opportunities, setOpportunities] = useState<CollaborationOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await listMyCollaborationOpportunities(accessToken);

        if (!cancelled) {
          setOpportunities(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load drafts.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  return (
    <div className="space-y-8">
      <section className="rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#134e4a_58%,#f59e0b_100%)] px-8 py-10 text-white shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
          Collaboration dashboard
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-black">Dedicated collaboration module</h1>
            <p className="mt-3 text-sm leading-7 text-white/85">
              This area is separated from freelance and salaried recruiting. Use it
              to create structured collaboration opportunities with drafts, step-based
              saving, and a publish review.
            </p>
          </div>
          <Link
            href="/dashboard/collaboration-opportunities/new"
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:opacity-90"
          >
            New collaboration opportunity
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {collaborationTemplates.map((template) => (
          <div
            key={template.title}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              {template.subtitle}
            </p>
            <h2 className="mt-3 text-xl font-bold text-slate-900">{template.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {template.description}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">My drafts and posts</h2>
            <p className="mt-2 text-sm text-slate-500">
              Open a draft to continue the wizard or review a published opportunity.
            </p>
          </div>
        </div>

        {loading && (
          <div className="mt-8 rounded-3xl bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
            Loading collaboration opportunities...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-3xl border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700">
            {error}
          </div>
        )}

        {!loading && !error && opportunities.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
            <p className="text-lg font-semibold text-slate-900">
              No collaboration opportunities yet
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Start the first draft inside this dedicated module.
            </p>
          </div>
        )}

        {!loading && !error && opportunities.length > 0 && (
          <div className="mt-8 grid gap-4">
            {opportunities.map((opportunity) => (
              <article
                key={opportunity.id}
                className="rounded-[28px] border border-slate-200 bg-slate-50 px-6 py-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold text-slate-900">
                        {opportunity.title ?? "Untitled collaboration draft"}
                      </h3>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {opportunity.status}
                      </span>
                      <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
                        {opportunity.completionPercent}% complete
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {opportunity.oneLinePitch ??
                        "Draft started. Continue the wizard to shape the collaboration pitch."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/dashboard/collaboration-opportunities/${opportunity.id}/edit`}
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
                    >
                      Open editor
                    </Link>
                    <Link
                      href={`/dashboard/collaboration-opportunities/${opportunity.id}/preview`}
                      className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
