"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const profileTypes = [
  { id: "INDIVIDUAL", label: "👤 Particulier", description: "Travailleur indépendant" },
  { id: "ENTREPRENEUR", label: "🚀 Entrepreneur", description: "Créateur de projet" },
  { id: "INVESTOR", label: "💰 Investisseur", description: "Cherche à investir" },
  { id: "AGENCY", label: "🏢 Agence", description: "Agence professionnelle" },
  { id: "COMPANY", label: "🏢 Société", description: "Entreprise établie" },
];

const interestsList = [
  { id: "COLLABORATION", label: "🤝 Collaboration", description: "Cherche des partenaires" },
  { id: "IMMOBILIER", label: "🏡 Immobilier", description: "Projets immobiliers" },
];

export default function OnboardingModal({
  onComplete,
}: {
  onComplete: (data: {
    profileType: string;
    interests: string[];
  }) => Promise<boolean>;
}) {
  const [profileType, setProfileType] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (id: string) => {
    if (interests.includes(id)) {
      setInterests(interests.filter((i) => i !== id));
    } else {
      setInterests([...interests, id]);
    }
  };

  const canContinue = profileType && interests.length > 0;

  const handleContinue = async () => {
    if (!canContinue) return;
    setSubmitting(true);
    setError(null);
    try {
      const ok = await onComplete({
        profileType: profileType!,
        interests,
      });
      if (!ok) {
        setError("Impossible de sauvegarder, réessayez.");
      }
    } catch (e) {
      console.error(e);
      setError("Erreur réseau");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl border border-slate-200 p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-2 bg-indigo-100 rounded-full mb-3">
            <span className="text-2xl">🚀</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            Bienvenue !
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Complétez votre profil pour commencer
          </p>
        </div>

        {/* Profile Type Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-bold text-slate-900">1</span>
            <h3 className="text-sm font-semibold text-slate-800">Qui êtes-vous ?</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {profileTypes.map((type) => {
              const selected = profileType === type.id;

              return (
                <button
                  key={type.id}
                  onClick={() => setProfileType(type.id)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 text-center
                    ${
                      selected
                        ? "border-indigo-600 bg-indigo-50 shadow-md"
                        : "border-slate-200 bg-white hover:border-indigo-300"
                    }
                  `}
                >
                  <div className="text-lg mb-1">{type.label.split(" ")[0]}</div>
                  <div className="text-xs font-medium text-slate-700 leading-tight">{type.label.split(" ").slice(1).join(" ")}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interests Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-bold text-slate-900">2</span>
            <h3 className="text-sm font-semibold text-slate-800">Vos intérêts</h3>
          </div>

          <div className="space-y-2">
            {interestsList.map((interest) => {
              const selected = interests.includes(interest.id);

              return (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-2
                    ${
                      selected
                        ? "border-indigo-600 bg-indigo-50 shadow-md"
                        : "border-slate-200 bg-white hover:border-indigo-300"
                    }
                  `}
                >
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                    ${
                      selected
                        ? "bg-indigo-600 border-indigo-600"
                        : "border-slate-300"
                    }
                  `}>
                    {selected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <div className="flex-1 text-sm">
                    <div className="font-semibold text-slate-900">{interest.label}</div>
                    <div className="text-xs text-slate-500">{interest.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Action Button */}
        <button
          disabled={!canContinue || submitting}
          onClick={handleContinue}
          className={`w-full px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2
            ${
              canContinue && !submitting
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
            }
          `}
        >
          {submitting ? (
            <>
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Chargement...
            </>
          ) : (
            <>
              Continuer
              <span className="text-base">→</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
}