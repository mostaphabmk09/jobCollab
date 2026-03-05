"use client";

import { useRouter } from "next/navigation";

const modes = [
  {
    id: "achat",
    title: "Achat en partenariat",
    desc: "Acheter un terrain ou appartement avec un partenaire.",
    icon: "💰",
  },
  {
    id: "construction",
    title: "Construction",
    desc: "Construire sur un terrain existant avec des associés.",
    icon: "🏗️",
  },
  {
    id: "gestion",
    title: "Gestion Airbnb",
    desc: "Confier la gestion d’un bien à un partenaire.",
    icon: "🏠",
  },
  {
    id: "sous-location",
    title: "Sous-location",
    desc: "Chercher un partenaire pour exploiter un bien.",
    icon: "🔑",
  },
];

export default function ImmobilierModePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Quel type de projet immobilier ?
        </h1>

        <p className="text-slate-500 mb-10">
          Choisissez le scénario qui correspond à votre besoin.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {modes.map((mode) => (
            <div
              key={mode.id}
              onClick={() =>
                router.push(`/create/immobilier/${mode.id}`)
              }
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-400 transition cursor-pointer"
            >
              <div className="text-3xl mb-3">{mode.icon}</div>

              <h3 className="font-semibold text-lg text-slate-800">
                {mode.title}
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                {mode.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}