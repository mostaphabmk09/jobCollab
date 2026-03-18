"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createCollaborationOpportunityDraft } from "@/features/collaboration-opportunities/api";
import { useAuth } from "@/context/AuthContext";

export default function NewCollaborationOpportunityPage() {
  const { accessToken } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    let cancelled = false;

    const createDraft = async () => {
      try {
        const draft = await createCollaborationOpportunityDraft(accessToken);

        if (!cancelled) {
          router.replace(`/dashboard/collaboration-opportunities/${draft.id}/edit`);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to create collaboration draft.",
          );
        }
      }
    };

    void createDraft();

    return () => {
      cancelled = true;
    };
  }, [accessToken, router]);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white px-8 py-12 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">
        Preparing collaboration draft
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        Creating the isolated collaboration workspace and moving you into the wizard.
      </p>

      {error && (
        <div className="mx-auto mt-6 max-w-xl rounded-3xl border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700">
          {error}
        </div>
      )}
    </div>
  );
}
