"use client";

import { useState } from "react";

const profileTypes = [
  { id: "INDIVIDUAL", label: "👤 Particulier" },
  { id: "ENTREPRENEUR", label: "🚀 Entrepreneur" },
  { id: "INVESTOR", label: "💰 Investisseur" },
  { id: "AGENCY", label: "🏢 Agence" },
  { id: "COMPANY", label: "🏢 Société" },
];

const interestsList = [
  { id: "COLLABORATION", label: "🤝 Collaboration" },
  { id: "FINANCEMENT", label: "💰 Financement" },
  { id: "IMMOBILIER", label: "🏡 Immobilier" },
];

export default function OnboardingModal({
  onComplete,
}: {
  onComplete: (data: {
    profileType: string;
    interests: string[];
  }) => void;
}) {
  const [profileType, setProfileType] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    if (interests.includes(id)) {
      setInterests(interests.filter((i) => i !== id));
    } else {
      setInterests([...interests, id]);
    }
  };

  const canContinue = profileType && interests.length > 0;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10">

        <h2 className="text-2xl font-bold text-slate-900 text-center">
          Complétez votre profil
        </h2>
        <p className="text-slate-500 text-center mt-2 text-sm">
          Cela nous permet de personnaliser votre expérience
        </p>

        {/* Profile Type */}
        <div className="mt-10">
          <h3 className="font-semibold text-slate-800 mb-4">
            Qui êtes-vous ?
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {profileTypes.map((type) => {
              const selected = profileType === type.id;

              return (
                <button
                  key={type.id}
                  onClick={() => setProfileType(type.id)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition
                    ${
                      selected
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                        : "border-slate-200 hover:border-indigo-400"
                    }
                  `}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interests */}
        <div className="mt-10">
          <h3 className="font-semibold text-slate-800 mb-4">
            Ce qui vous intéresse ?
          </h3>

          <div className="flex flex-wrap gap-4">
            {interestsList.map((interest) => {
              const selected = interests.includes(interest.id);

              return (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`rounded-full px-6 py-2 text-sm font-medium border transition
                    ${
                      selected
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-slate-300 hover:border-indigo-500"
                    }
                  `}
                >
                  {interest.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            disabled={!canContinue}
            onClick={() =>
              onComplete({
                profileType: profileType!,
                interests,
              })
            }
            className={`px-8 py-3 rounded-2xl font-semibold transition
              ${
                canContinue
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