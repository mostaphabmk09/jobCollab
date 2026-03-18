"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getCollaborationOpportunityPreview } from "@/features/collaboration-opportunities/api";
import { OpportunityPreview } from "@/features/collaboration-opportunities/components/opportunity-preview";
import type { CollaborationOpportunity } from "@/features/collaboration-opportunities/types";

export default function CollaborationOpportunityPreviewPage() {
  const params = useParams<{ id: string }>();
  const { accessToken } = useAuth();
  const [opportunity, setOpportunity] = useState<CollaborationOpportunity | null>(null);
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
        const data = await getCollaborationOpportunityPreview(params.id, accessToken);

        if (!cancelled) {
          setOpportunity(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load preview.");
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
  }, [accessToken, params.id]);

  if (loading) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white px-8 py-12 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-900">
          Loading collaboration preview...
        </p>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="rounded-[32px] border border-rose-200 bg-rose-50 px-8 py-12 text-center shadow-sm">
        <p className="text-lg font-semibold text-rose-800">
          {error ?? "Unable to load this preview."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Collaboration preview
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">
            Review before publish
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/dashboard/collaboration-opportunities/${opportunity.id}/edit`}
            className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700"
          >
            Back to editor
          </Link>
          <Link
            href="/dashboard/collaboration-opportunities"
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Dashboard
          </Link>
        </div>
      </div>

      <OpportunityPreview opportunity={opportunity} />
    </div>
  );
}
