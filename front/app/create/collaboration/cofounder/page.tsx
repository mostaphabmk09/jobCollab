"use client";

export default function CreateCofounderPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold text-slate-900">
          Recherche de Co-Founder
        </h1>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">

          <input
            placeholder="Idée ou projet"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
          />

          <textarea
            rows={4}
            placeholder="Vision long terme..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
          />

          <input
            type="number"
            placeholder="Equity proposé (%)"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
          />

          <button className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Publier
          </button>

        </div>
      </div>
    </div>
  );
}