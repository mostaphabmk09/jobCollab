"use client";

import { useMemo, useState } from "react";

/* ===================== Utils ===================== */
const cn = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(" ");

/* ===================== Types ===================== */
type PostType =
  | "Partenariat"
  | "Financement"
  | "Conseils/Expériences"
  | "Job"
  | "Immobilier";

type Post = {
  id: number;
  title: string;
  city: string;
  type: PostType;
  budget: string;
  tags: string[];
  trust: number;
};

/* ===================== Categories ===================== */
const categories = [
  { id: "jobs", name: "Job", icon: "🧑‍💼" },
  { id: "partners", name: "Partenariat", icon: "🤝" },
  { id: "funding", name: "Financement", icon: "💰" },
  { id: "land", name: "Immobilier", icon: "🏡" },
  { id: "advice", name: "Conseils", icon: "📌" },
] as const;

/* ===================== Data ===================== */
const seedPosts: Post[] = [
  {
    id: 1,
    title: "Projet food maison — je cherche un partenaire marketing",
    city: "Casablanca",
    type: "Partenariat",
    budget: "Moyen",
    tags: ["food", "marketing", "partenaire"],
    trust: 4.6,
  },
  {
    id: 2,
    title: "Petit magasin — recherche associé pour investir",
    city: "Marrakech",
    type: "Financement",
    budget: "Faible",
    tags: ["commerce", "investissement", "associé"],
    trust: 4.2,
  },
  {
    id: 3,
    title:
      "Je veux parler avec des gens qui ont déjà lancé ce type de business",
    city: "Fès",
    type: "Conseils/Expériences",
    budget: "—",
    tags: ["documents", "expérience", "conseils"],
    trust: 4.8,
  },
];

/* ===================== Card ===================== */
function Card({ post }: { post: Post }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-900 leading-snug">
            {post.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            {post.city} • <span className="font-medium">{post.type}</span> •
            Budget: <span className="font-medium">{post.budget}</span>
          </p>
        </div>

        <div className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800 border border-amber-200">
          ⭐ {post.trust}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
          >
            #{t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 transition">
          Contacter
        </button>

        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition">
          Détails →
        </button>
      </div>
    </div>
  );
}

/* ===================== Main Section ===================== */
export default function OpportunitiesSection() {
  const [activeCat, setActiveCat] = useState<
    "all" | "jobs" | "partners" | "funding" | "land" | "advice"
  >("all");

  const posts = useMemo(() => {
    if (activeCat === "all") return seedPosts;

    return seedPosts.filter((p) => {
      if (activeCat === "jobs") return p.type === "Job";
      if (activeCat === "partners") return p.type === "Partenariat";
      if (activeCat === "funding") return p.type === "Financement";
      if (activeCat === "land") return p.type === "Immobilier";
      if (activeCat === "advice") return p.type === "Conseils/Expériences";

      return true;
    });
  }, [activeCat]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      {/* Categories */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold">Catégories</h2>
        <p className="mt-2 text-sm text-slate-600">
          Filtrer rapidement selon le type d’opportunité.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCat("all")}
            className={cn(
              "rounded-2xl px-4 py-2 text-sm font-semibold border transition",
              activeCat === "all"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white border-slate-200 hover:bg-slate-50",
            )}
          >
            Tout
          </button>

          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={cn(
                "flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold border transition",
                activeCat === c.id
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white border-slate-200 hover:bg-slate-50",
              )}
            >
              <span>{c.icon}</span>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mt-12 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">
            Dernières opportunités
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Exemples de cards — on ajoutera la page détails après.
          </p>
        </div>

        <button className="hidden sm:inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition">
          Publier une annonce
        </button>
      </div>

      {/* Cards */}
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {posts.map((p) => (
          <Card key={p.id} post={p} />
        ))}

        {posts.length === 0 && (
          <div className="md:col-span-3 rounded-2xl border border-slate-200 bg-white/70 p-8 text-center text-slate-600">
            Aucun résultat.
          </div>
        )}
      </div>
    </section>
  );
}
