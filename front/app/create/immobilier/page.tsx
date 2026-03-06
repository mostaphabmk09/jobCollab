"use client";

import { useRouter } from "next/navigation";
import { Building2, Home, KeyRound } from "lucide-react";

export default function ImmobilierMenuPage() {
  const router = useRouter();

  const options = [
    {
      title: "Achat en partenariat",
      description:
        "Achetez un bien avec un partenaire et partagez investissement et bénéfices.",
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      path: "immobilier/achat",
    },
    {
      title: "Gestion Airbnb",
      description:
        "Confiez la gestion de votre bien Airbnb à un partenaire et maximisez vos revenus.",
      icon: <Home className="w-6 h-6 text-blue-600" />,
      path: "immobilier/airbnb",
    },
    {
      title: "Sous-location",
      description:
        "Trouvez un partenaire pour exploiter un bien en sous-location.",
      icon: <KeyRound className="w-6 h-6 text-blue-600" />,
      path: "immobilier/sous-location",
    },
  ];

  return (
    <div className="px-6 pt-10 pb-16">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <div className="mb-10">
          <span className="text-sm font-semibold text-blue-600 uppercase">
            Immobilier
          </span>

          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            Choisissez le type d’opportunité immobilière
          </h1>

          <p className="text-gray-500 mt-2">
            Sélectionnez le type de partenariat immobilier que vous souhaitez créer.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {options.map((option) => (
            <button
              key={option.title}
              onClick={() => router.push(option.path)}
              className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:border-blue-500 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                {option.icon}
                <h3 className="font-semibold text-gray-900">
                  {option.title}
                </h3>
              </div>

              <p className="text-sm text-gray-500">
                {option.description}
              </p>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}