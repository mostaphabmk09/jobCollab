"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getCollaborationOpportunity } from "@/features/collaboration-opportunities/api";
import { OpportunityCreationWizard } from "@/features/collaboration-opportunities/components/opportunity-creation-wizard";
import type { CollaborationOpportunity } from "@/features/collaboration-opportunities/types";

export default function EditCollaborationOpportunityPage() {
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
        const data = await getCollaborationOpportunity(params.id, accessToken);

        if (!cancelled) {
          setOpportunity(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load draft.");
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
          Loading collaboration wizard...
        </p>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="rounded-[32px] border border-rose-200 bg-rose-50 px-8 py-12 text-center shadow-sm">
        <p className="text-lg font-semibold text-rose-800">
          {error ?? "Unable to load this collaboration opportunity."}
        </p>
        <Link
          href="/dashboard/collaboration-opportunities"
          className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900"
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <OpportunityCreationWizard
      accessToken={accessToken!}
      initialOpportunity={opportunity}
      onOpportunityChange={setOpportunity}
    />
  );
}
