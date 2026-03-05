export default function RealEstateSection() {
  return (
    <section className="w-full bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* TITLE */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              Investir à plusieurs dans l’immobilier
            </h2>
            <p className="mt-2 text-slate-600">
              Trouvez un partenaire pour acheter un terrain, un appartement, ou
              lancer un projet Airbnb.
            </p>
          </div>

          <div className="flex gap-2">
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition">
              Voir tout
            </button>
            <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition">
              Publier un projet
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Terrain",
            "Appartement",
            "Airbnb",
            "Investissement",
            "Location",
          ].map((t) => (
            <button
              key={t}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              {t}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* ⭐ FEATURED CARD */}
          <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl border border-indigo-200 bg-white p-8 shadow-sm transition duration-500 ease-out hover:-translate-y-1 hover:shadow-xl">
            {/* Glow effect */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />
              <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
            </div>

            <div className="relative">
              {/* Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Opportunité mise en avant
                </div>

                <div className="flex gap-2">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                    Airbnb
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    50/50
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-6 text-2xl font-black text-slate-900 leading-tight">
                Recherche partenaire — Terrain pour projet Airbnb
              </h3>

              {/* Description */}
              <p className="mt-3 text-slate-600 leading-relaxed">
                Terrain destiné à un projet touristique. Objectif : achat à
                deux, aménagement et mise en location courte durée.
              </p>

              {/* Info grid */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: "📍 Ville", value: "Marrakech" },
                  { label: "💰 Budget total", value: "300k DH" },
                  { label: "🤝 Type partenariat", value: "50/50" },
                  { label: "⏳ Durée estimée", value: "Long terme" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className="font-bold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Montant recherché</span>
                  <span className="font-semibold">150k / 300k DH</span>
                </div>

                <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                  <div className="h-2 w-1/2 rounded-full bg-indigo-600" />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Ahmed</p>
                    <p className="text-xs text-slate-500">
                      Profil : 4.6 ⭐ • Répond rapidement
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition">
                    Détails
                  </button>

                  <button className="rounded-xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition">
                    Discuter
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE CARDS */}
          <div className="grid gap-6">
            {[
              {
                city: "Casablanca",
                title: "Appartement pour location",
                desc: "Appartement à acheter à deux pour location longue durée.",
                author: "Youssef",
                tag: "Appartement",
              },
              {
                city: "Agadir",
                title: "Projet Airbnb — Appartement",
                desc: "Recherche partenaire sérieux pour projet touristique.",
                author: "Sara",
                tag: "Airbnb",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-500 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500">
                    📍 {c.city}
                  </p>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    {c.tag}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-slate-900">
                  {c.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {c.desc}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Par: <span className="font-bold">{c.author}</span>
                  </span>

                  <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition">
                    Discuter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
