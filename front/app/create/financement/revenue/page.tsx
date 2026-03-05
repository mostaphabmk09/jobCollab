"use client";

import { useState } from "react";

export default function CreateRevenueFinancementPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState("");
  const [percent, setPercent] = useState("");
  const [targetReturn, setTargetReturn] = useState("");

  const estimatedReturn =
    amount && targetReturn
      ? (Number(amount) + (Number(amount) * Number(targetReturn)) / 100).toFixed(0)
      : null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Partage de revenus
          </h1>

          <p className="text-slate-500">
            L’investisseur reçoit un pourcentage des bénéfices jusqu’à atteindre un objectif défini.
          </p>

          {/* Infos projet */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">
              Informations du projet
            </h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre du projet"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre projet..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ville"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />
          </div>

          {/* Détails financiers */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">
              Conditions de partage
            </h2>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Montant recherché (MAD)"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            <input
              type="number"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              placeholder="Pourcentage sur bénéfices (%)"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            <input
              type="number"
              value={targetReturn}
              onChange={(e) => setTargetReturn(e.target.value)}
              placeholder="Objectif de retour total (%)"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            {estimatedReturn && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-700">
                L’investisseur recevra environ{" "}
                <strong>{estimatedReturn} MAD</strong> au total.
              </div>
            )}
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24 h-fit">

          <h3 className="font-semibold text-lg mb-4">
            Résumé partage
          </h3>

          {title && (
            <p className="text-sm text-slate-600">
              Projet : {title}
            </p>
          )}

          {amount && (
            <p className="text-sm text-slate-600">
              Montant : {amount} MAD
            </p>
          )}

          {percent && (
            <p className="text-sm text-slate-600">
              % bénéfices : {percent}%
            </p>
          )}

          {targetReturn && (
            <p className="text-sm text-slate-600">
              Objectif total : {targetReturn}%
            </p>
          )}

          <button className="mt-6 w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Publier la demande
          </button>

        </div>

      </div>
    </div>
  );
}