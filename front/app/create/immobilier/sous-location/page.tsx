"use client";

import { useState } from "react";

export default function CreateSousLocationPage() {
  const [model, setModel] = useState<"fixe" | "partage">("fixe");
  const [rent, setRent] = useState(5000);
  const [percentage, setPercentage] = useState(50);
  const [duration, setDuration] = useState(12);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Sous-location / Exploitation
          </h1>

          {/* Model Selection */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">Modèle de collaboration</h2>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={model === "fixe"}
                  onChange={() => setModel("fixe")}
                />
                Loyer fixe mensuel
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={model === "partage"}
                  onChange={() => setModel("partage")}
                />
                Partage des bénéfices
              </label>
            </div>

            {model === "fixe" && (
              <div>
                <label className="text-sm font-medium">
                  Loyer mensuel demandé (MAD)
                </label>
                <input
                  type="number"
                  value={rent}
                  onChange={(e) => setRent(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
                />
              </div>
            )}

            {model === "partage" && (
              <div>
                <label className="text-sm font-medium">
                  Pourcentage du propriétaire (%)
                </label>
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
                />
              </div>
            )}
          </div>

          {/* Infos bien */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">Informations du bien</h2>

            <input
              placeholder="Ville"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm">
              <option>Appartement</option>
              <option>Villa</option>
              <option>Studio</option>
              <option>Maison</option>
            </select>

            <textarea
              rows={4}
              placeholder="Description du bien..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />
          </div>

          {/* Duration */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">Durée du contrat</h2>

            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24 h-fit">
          <h3 className="font-semibold text-lg mb-4">Résumé collaboration</h3>

          {model === "fixe" ? (
            <p className="text-sm text-slate-600">
              Loyer fixe: {rent} MAD / mois
            </p>
          ) : (
            <p className="text-sm text-slate-600">
              Partage: {percentage}% propriétaire
            </p>
          )}

          <p className="text-sm text-slate-600 mt-2">Durée: {duration} mois</p>

          <button className="mt-6 w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Publier l’offre
          </button>
        </div>
      </div>
    </div>
  );
}
