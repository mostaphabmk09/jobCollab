"use client";

import { useState } from "react";

export default function CreateLoanFinancementPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [interest, setInterest] = useState("");

  const totalToRepay =
    amount && interest
      ? (Number(amount) + (Number(amount) * Number(interest)) / 100).toFixed(0)
      : null;

  const monthly =
    totalToRepay && duration
      ? (Number(totalToRepay) / Number(duration)).toFixed(0)
      : null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Prêt à durée déterminée
          </h1>

          <p className="text-slate-500">
            Vous remboursez le capital avec un intérêt sur une période définie.
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

          {/* Détails prêt */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">

            <h2 className="font-semibold text-lg">
              Détails du prêt
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
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Durée remboursement (mois)"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            <input
              type="number"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              placeholder="Intérêt total (%)"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            {totalToRepay && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-700">
                Total à rembourser: <strong>{totalToRepay} MAD</strong>
                {monthly && (
                  <>
                    <br />
                    Mensualité estimée:{" "}
                    <strong>{monthly} MAD</strong>
                  </>
                )}
              </div>
            )}

          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24 h-fit">

          <h3 className="font-semibold text-lg mb-4">
            Résumé prêt
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

          {duration && (
            <p className="text-sm text-slate-600">
              Durée : {duration} mois
            </p>
          )}

          {interest && (
            <p className="text-sm text-slate-600">
              Intérêt : {interest}%
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