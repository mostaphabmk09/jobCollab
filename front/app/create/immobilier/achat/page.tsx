"use client";

import { useState } from "react";

export default function CreateAchatImmobilierPage() {
  const [mode, setMode] = useState<"equal" | "custom">("equal");
  const [partners, setPartners] = useState(2);
  const [customShares, setCustomShares] = useState<number[]>([50, 50]);

  const totalPercentage = customShares.reduce(
    (acc, val) => acc + Number(val || 0),
    0
  );

  const handlePartnerChange = (value: number) => {
    setPartners(value);
    setCustomShares(Array(value).fill(Math.floor(100 / value)));
  };

  const handleShareChange = (index: number, value: number) => {
    const updated = [...customShares];
    updated[index] = value;
    setCustomShares(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Achat immobilier en partenariat
          </h1>

          {/* Infos du bien */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">Informations du bien</h2>

            <input
              placeholder="Titre du projet"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            <textarea
              rows={4}
              placeholder="Description du projet..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            <input
              type="number"
              placeholder="Budget total (MAD)"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />
          </div>

          {/* Répartition */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">
              Structure de répartition
            </h2>

            <div>
              <label className="text-sm font-medium">
                Nombre total partenaires (incluant vous)
              </label>

              <input
                type="number"
                min={2}
                value={partners}
                onChange={(e) =>
                  handlePartnerChange(Number(e.target.value))
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
              />
            </div>

            {/* Mode selection */}
            <div className="flex gap-6 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={mode === "equal"}
                  onChange={() => setMode("equal")}
                />
                Répartition équilibrée
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={mode === "custom"}
                  onChange={() => setMode("custom")}
                />
                Répartition personnalisée
              </label>
            </div>

            {/* Equal mode */}
            {mode === "equal" && (
              <div className="bg-indigo-50 p-4 rounded-xl text-sm text-indigo-700">
                Chaque partenaire aura :
                <strong>
                  {" "}
                  {(100 / partners).toFixed(2)}%
                </strong>
              </div>
            )}

            {/* Custom mode */}
            {mode === "custom" && (
              <div className="space-y-4">
                {customShares.map((share, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >
                    <span className="w-28 text-sm">
                      Partenaire {index + 1}
                    </span>

                    <input
                      type="number"
                      value={share}
                      onChange={(e) =>
                        handleShareChange(
                          index,
                          Number(e.target.value)
                        )
                      }
                      className="w-24 rounded-xl border border-slate-300 px-3 py-2 text-sm"
                    />
                    %
                  </div>
                ))}

                <div
                  className={`text-sm font-medium ${
                    totalPercentage === 100
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  Total: {totalPercentage}%
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24 h-fit">
          <h3 className="font-semibold text-lg mb-4">
            Résumé de la répartition
          </h3>

          {mode === "equal" ? (
            <p className="text-sm text-slate-600">
              {partners} partenaires •{" "}
              {(100 / partners).toFixed(2)}% chacun
            </p>
          ) : (
            <div className="space-y-2 text-sm">
              {customShares.map((share, index) => (
                <p key={index}>
                  Partenaire {index + 1}: {share}%
                </p>
              ))}
            </div>
          )}

          <button
            disabled={
              mode === "custom" && totalPercentage !== 100
            }
            className="mt-6 w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            Publier le projet
          </button>
        </div>
      </div>
    </div>
  );
}