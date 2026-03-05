"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const types = [
  {
    id: "equity",
    title: "Investissement (Equity)",
    icon: "📈",
    description:
      "Un investisseur devient partenaire et possède un pourcentage du projet.",
  },
  {
    id: "loan",
    title: "Prêt à durée déterminée",
    icon: "🏦",
    description:
      "Vous remboursez le capital avec un intérêt sur une durée définie.",
  },
  {
    id: "revenue",
    title: "Partage de revenus",
    icon: "📊",
    description:
      "L’investisseur reçoit un pourcentage des bénéfices jusqu’à atteindre un objectif.",
  },
  {
    id: "later",
    title: "À discuter",
    icon: "🤝",
    description:
      "Les conditions seront discutées directement avec les investisseurs.",
  },
];

export default function ChooseFinancementType() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900">
            Choisissez le type de financement
          </h1>
          <p className="text-slate-500 mt-3">
            Sélectionnez la formule adaptée à votre projet
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {types.map((type) => {
            const isSelected = selected === type.id;

            return (
              <div
                key={type.id}
                onClick={() => setSelected(type.id)}
                className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300
                  ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50 shadow-lg scale-[1.02]"
                      : "border-slate-200 bg-white hover:shadow-md hover:scale-[1.01]"
                  }
                `}
              >
                <div className="text-3xl mb-3">{type.icon}</div>

                <h3 className="font-semibold text-lg text-slate-900">
                  {type.title}
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {type.description}
                </p>
              </div>
            );
          })}

        </div>

        <div className="text-center mt-12">
          <button
            disabled={!selected}
            onClick={() => router.push(`/create/financement/${selected}`)}
            className={`px-8 py-3 rounded-2xl font-semibold transition
              ${
                selected
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-indigo-300 text-white cursor-not-allowed"
              }
            `}
          >
            Continuer →
          </button>
        </div>

      </div>
    </div>
  );
}