"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Home, KeyRound } from "lucide-react";

const options = [
  {
    title: "Achat en partenariat",
    description:
      "Achetez un bien avec un partenaire et partagez investissement et benefices.",
    icon: Building2,
    path: "immobilier/achat",
    accent: "from-amber-400/20 via-orange-300/10 to-transparent",
  },
  {
    title: "Gestion Airbnb",
    description:
      "Confiez la gestion de votre bien Airbnb a un partenaire et maximisez vos revenus.",
    icon: Home,
    path: "immobilier/gestion",
    accent: "from-sky-400/20 via-cyan-300/10 to-transparent",
  },
  {
    title: "Sous-location",
    description:
      "Trouvez un partenaire pour exploiter un bien en sous-location.",
    icon: KeyRound,
    path: "immobilier/sous-location",
    accent: "from-emerald-400/20 via-teal-300/10 to-transparent",
  },
];

export default function ImmobilierMenuPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ed_0%,#eef4ff_35%,#e8eefc_100%)] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[32px] border border-white/70 bg-white/75 p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                Immobilier
              </span>
              <div className="space-y-3">
                <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                  Choisissez le format qui correspond a votre projet immobilier.
                </h1>
                <p className="max-w-xl text-sm leading-6 text-slate-600 md:text-base">
                  Gardez le meme parcours de creation, avec une presentation plus
                  nette pour orienter l utilisateur avant le formulaire.
                </p>
              </div>
            </div>

            <div className="grid gap-3 rounded-[28px] border border-slate-200/80 bg-slate-950 p-5 text-sm text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Trois parcours
              </p>
              <p className="text-lg font-medium text-white">
                Achat, gestion ou sous-location.
              </p>
              <p className="leading-6 text-slate-300">
                Chaque parcours conserve ses champs actuels et sa logique
                specifique. Seule la couche visuelle evolue.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {options.map((option) => {
            const Icon = option.icon;

            return (
              <button
                key={option.title}
                onClick={() => router.push(option.path)}
                className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/80 p-6 text-left shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-32px_rgba(15,23,42,0.4)]"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-br ${option.accent}`}
                />
                <div className="relative flex h-full flex-col gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Creer
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                      {option.title}
                    </h2>
                    <p className="text-sm leading-6 text-slate-600">
                      {option.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-2 text-sm font-medium text-slate-900">
                    Continuer
                    <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            );
          })}
        </section>
      </div>
    </main>
  );
}
