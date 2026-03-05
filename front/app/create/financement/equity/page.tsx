"use client";

import { useState } from "react";

export default function CreateEquityFinancementPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState("");
  const [equity, setEquity] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Investissement (Equity)
          </h1>

          <p className="text-slate-500">
            L’investisseur deviendra partenaire avec un pourcentage du projet.
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

          {/* Détails investissement */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">

            <h2 className="font-semibold text-lg">
              Détails de l’investissement
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
              value={equity}
              onChange={(e) => setEquity(e.target.value)}
              placeholder="Pourcentage proposé (%)"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            <div className="text-xs text-slate-500">
              Exemple : 100 000 MAD contre 20% du projet.
            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24 h-fit">

          <h3 className="font-semibold text-lg mb-4">
            Résumé
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

          {equity && (
            <p className="text-sm text-slate-600">
              Equity : {equity}%
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