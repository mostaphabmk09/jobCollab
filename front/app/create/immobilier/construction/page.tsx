"use client";

import { useState } from "react";

export default function CreateConstructionPage() {
  const [hasLand, setHasLand] = useState(true);
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

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Projet de construction
          </h1>

          {/* Terrain Section */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">
              Situation du terrain
            </h2>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={hasLand}
                  onChange={() => setHasLand(true)}
                />
                Je possède déjà le terrain
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!hasLand}
                  onChange={() => setHasLand(false)}
                />
                Je cherche terrain + partenaires
              </label>
            </div>

            {hasLand && (
              <input
                type="number"
                placeholder="Valeur estimée du terrain (MAD)"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
              />
            )}
          </div>

          {/* Budget Construction */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">
              Budget construction
            </h2>

            <input
              type="number"
              placeholder="Budget total construction (MAD)"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm">
              <option>Maison individuelle</option>
              <option>Immeuble locatif</option>
              <option>Villa</option>
              <option>Projet mixte</option>
            </select>
          </div>

          {/* Répartition */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">
              Répartition des parts
            </h2>

            <input
              type="number"
              min={2}
              value={partners}
              onChange={(e) =>
                handlePartnerChange(Number(e.target.value))
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            <div className="flex gap-6 mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={mode === "equal"}
                  onChange={() => setMode("equal")}
                />
                Équilibrée
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={mode === "custom"}
                  onChange={() => setMode("custom")}
                />
                Personnalisée
              </label>
            </div>

            {mode === "equal" && (
              <div className="bg-indigo-50 p-4 rounded-xl text-sm text-indigo-700">
                {(100 / partners).toFixed(2)}% chacun
              </div>
            )}

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

        {/* RIGHT PANEL */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24 h-fit">
          <h3 className="font-semibold text-lg mb-4">
            Résumé projet
          </h3>

          <p className="text-sm text-slate-600 mb-2">
            {hasLand
              ? "Terrain déjà disponible"
              : "Recherche terrain + partenaires"}
          </p>

          {mode === "equal" ? (
            <p className="text-sm text-slate-600">
              {partners} associés •{" "}
              {(100 / partners).toFixed(2)}% chacun
            </p>
          ) : (
            customShares.map((share, index) => (
              <p key={index} className="text-sm">
                Partenaire {index + 1}: {share}%
              </p>
            ))
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