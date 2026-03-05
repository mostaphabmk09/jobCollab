"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const types = [
  {
    id: "associe",
    icon: "🤝",
    title: "Associé",
    subtitle: "Rejoindre un projet existant",
    description:
      "Partenaire qui intègre un projet déjà lancé pour participer à sa croissance et à sa gestion.",
    example:
      "Exemple : Restaurant déjà ouvert cherche un associé pour expansion.",
  },
  {
    id: "cofounder",
    icon: "🚀",
    title: "Co-Founder",
    subtitle: "Construire le projet dès le départ",
    description:
      "Partenaire fondateur impliqué dans la création du projet depuis le début.",
    example:
      "Exemple : Startup tech cherche CTO pour lancer le projet ensemble.",
  },
  {
    id: "freelance",
    icon: "💼",
    title: "Freelance",
    subtitle: "Mission ponctuelle ou flexible",
    description:
      "Professionnel indépendant engagé pour une tâche ou mission spécifique.",
    example:
      "Exemple : Création logo, marketing digital ou développement site web.",
  },
  {
    id: "salarie",
    icon: "🧑‍💻",
    title: "Salarié",
    subtitle: "Contrat fixe et engagement stable",
    description:
      "Employé recruté avec salaire mensuel et contrat régulier.",
    example:
      "Exemple : Recrutement serveur, manager ou développeur en CDI.",
  },
];

export default function ChooseCollaborationType() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <h1 className="text-3xl font-bold text-slate-900">
            Choisissez le type de collaboration
          </h1>
          <p className="text-slate-500 mt-3">
            Sélectionnez la formule qui correspond à votre besoin
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {types.map((type) => {
            const isSelected = selected === type.id;

            return (
              <div
                key={type.id}
                onClick={() => setSelected(type.id)}
                className={`cursor-pointer rounded-2xl border p-8 transition-all duration-300
                  ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50 shadow-lg scale-[1.02]"
                      : "border-slate-200 bg-white hover:shadow-md hover:scale-[1.01]"
                  }
                `}
              >
                <div className="text-4xl mb-4">{type.icon}</div>

                <h3 className="font-semibold text-xl text-slate-900">
                  {type.title}
                </h3>

                <p className="text-indigo-600 text-sm font-medium mt-1">
                  {type.subtitle}
                </p>

                <p className="text-sm text-slate-600 mt-3">
                  {type.description}
                </p>

                <p className="text-xs text-slate-500 mt-3 italic">
                  {type.example}
                </p>
              </div>
            );
          })}

        </div>

        <div className="text-center mt-14">
          <button
            disabled={!selected}
            onClick={() =>
              router.push(`/create/collaboration/${selected}`)
            }
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