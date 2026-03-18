"use client";

import Link from "next/link";
import { collaborationTemplates } from "@/features/collaboration-opportunities/constants";

export default function ChooseCollaborationType() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#134e4a_58%,#f59e0b_100%)] px-8 py-10 text-white shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
            Collaboration entry
          </p>
          <h1 className="mt-4 text-3xl font-black">
            Collaboration now lives in its own module
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/85">
            You are working on the collaboration part. This flow is now separated
            from freelance and salaried recruiting so the experience can stay focused
            on co-building, ownership, and value exchange.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard/collaboration-opportunities/new"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:opacity-90"
            >
              Start the collaboration wizard
            </Link>
            <Link
              href="/dashboard/collaboration-opportunities"
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Open collaboration dashboard
            </Link>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {collaborationTemplates.map((template) => (
            <article
              key={template.title}
              className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                {template.subtitle}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                {template.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {template.description}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
