import Link from "next/link";

export default function HeroSection() {
  return (
<section className="relative bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-900 text-white">      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:150px_150px]" />

      {/* Soft overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/5 via-indigo-900/10 to-indigo-950/40" />

      <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-14 md:pt-14 md:pb-16 grid gap-8 md:grid-cols-2 items-center">
        {/* LEFT SIDE */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Confiance + expériences + opportunités
          </div>

          <h1 className="mt-4 text-2xl md:text-2xl font-black leading-snug">
            Trouvez les bonnes personnes
            <br />
            pour lancer votre projet
          </h1>

          <p className="mt-3 text-white/90 text-sm md:text-base leading-normal">
            Une plateforme pour créer des partenariats, trouver du financement,
            recruter et apprendre via des expériences réelles.
          </p>

          {/* Highlight card */}
          <div className="mt-8 rounded-3xl border border-emerald-400/40 bg-emerald-500/10 p-6 backdrop-blur-md shadow-xl">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-emerald-500 text-xl">
                🏡
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-lg">
                  Investir à plusieurs dans l’immobilier
                </h3>

                <p className="mt-1 text-sm text-white/85">
                  Trouvez un partenaire pour acheter un terrain, un appartement
                  ou lancer un projet Airbnb.
                </p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {["Terrain", "Appartement", "Airbnb", "Partenariat"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/15 px-3 py-1"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <button className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition">
                Explorer
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mt-6 rounded-2xl bg-white/10 backdrop-blur-md p-3 border border-white/15">
            <div className="flex gap-3">
              <input
                placeholder="Rechercher: partenariat, financement..."
                className="w-full rounded-xl bg-white/90 px-4 py-2.5 text-sm text-slate-900 outline-none"
              />
              <button className="rounded-xl bg-black/70 px-6 py-2.5 text-sm font-semibold text-white hover:bg-black/80 transition">
                Rechercher
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:block">
          <div className="rounded-3xl bg-white/10 backdrop-blur border border-white/20 p-6 shadow-xl space-y-6">
            <p className="text-sm font-semibold">⭐ Sécurité & confiance</p>

            <ul className="mt-4 space-y-3 text-sm text-white/90">
              <li>✔ Avis basés sur des expériences</li>
              <li>✔ Système de signalement</li>
              <li>✔ (Plus tard) profils vérifiés</li>
            </ul>

            <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4">
              <p className="text-sm font-semibold">MVP</p>
              <p className="mt-1 text-sm text-white/85">
                Commencer simple: publier une annonce + recherche + contact +
                notes.
              </p>
            </div>

            <Link
              href="/signup"
              className="rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-100 transition"
            >
              Créer un compte
            </Link>
            {/* <Link
              href="/signup"
              className="rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-100 transition"
            >
              Créer un compte
            </Link> */}
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: "Annonces", value: "120+" },
              { label: "Expériences", value: "80+" },
              { label: "Utilisateurs", value: "1.5k+" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-4 text-center"
              >
                <p className="text-lg font-extrabold">{s.value}</p>
                <p className="text-xs text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
