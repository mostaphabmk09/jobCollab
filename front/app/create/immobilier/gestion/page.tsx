"use client";

import { useState } from "react";

export default function CreateGestionPage() {
  const [managementType, setManagementType] = useState("complete");
  const [commission, setCommission] = useState(20);
  const [duration, setDuration] = useState(12);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Gestion Airbnb / Location
          </h1>

          {/* Type gestion */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">
              Type de gestion recherchée
            </h2>

            <select
              value={managementType}
              onChange={(e) =>
                setManagementType(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            >
              <option value="complete">
                Gestion complète (clé en main)
              </option>
              <option value="ameublement">
                Ameublement + mise en location
              </option>
              <option value="sous-location">
                Sous-location
              </option>
            </select>
          </div>

          {/* Infos bien */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">
              Informations du bien
            </h2>

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
              placeholder="Décrivez le bien (superficie, quartier, état...)"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />
          </div>

          {/* Conditions */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">
              Conditions de collaboration
            </h2>

            <div>
              <label className="text-sm font-medium">
                Commission proposée (%)
              </label>

              <input
                type="number"
                value={commission}
                onChange={(e) =>
                  setCommission(Number(e.target.value))
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Durée du contrat (mois)
              </label>

              <input
                type="number"
                value={duration}
                onChange={(e) =>
                  setDuration(Number(e.target.value))
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
              />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24 h-fit">
          <h3 className="font-semibold text-lg mb-4">
            Résumé
          </h3>

          <p className="text-sm text-slate-600 mb-2">
            Type: {managementType}
          </p>

          <p className="text-sm text-slate-600 mb-2">
            Commission: {commission}%
          </p>

          <p className="text-sm text-slate-600">
            Durée: {duration} mois
          </p>

          <button className="mt-6 w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Publier l’offre
          </button>
        </div>
      </div>
    </div>
  );
}