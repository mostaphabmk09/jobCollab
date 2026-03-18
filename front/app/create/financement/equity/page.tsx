"use client";

import { useState } from "react";

export default function CreateEquityFinancementPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [projectStage, setProjectStage] = useState("");

  const [amount, setAmount] = useState("");
  const [minimumInvestment, setMinimumInvestment] = useState("");
  const [fundingDeadline, setFundingDeadline] = useState("");

  const [equity, setEquity] = useState("");

  const [founderContribution, setFounderContribution] = useState("");
  const [useOfFunds, setUseOfFunds] = useState("");

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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Localisation (ville, pays)"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            <div className="grid sm:grid-cols-2 gap-3">
              <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm">
                <option value="">Sélectionner l&apos;industrie</option>
                <option>Food</option>
                <option>Retail</option>
                <option>Services</option>
                <option>Technology</option>
                <option>Real Estate</option>
                <option>Fashion</option>
                <option>Other</option>
              </select>
              <select value={projectStage} onChange={(e) => setProjectStage(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm">
                <option value="">Stage du projet</option>
                <option>IDEA</option>
                <option>STARTING</option>
                <option>OPERATING</option>
                <option>GROWING</option>
              </select>
            </div>

          </div>

          {/* Détails investissement */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">

            <h2 className="font-semibold text-lg">
              Détails de l’investissement
            </h2>

            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Montant recherché"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
              />
              <input
                type="number"
                value={minimumInvestment}
                onChange={(e) => setMinimumInvestment(e.target.value)}
                placeholder="Investissement minimum"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="date"
                value={fundingDeadline}
                onChange={(e) => setFundingDeadline(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
              />
              <input
                type="number"
                value={equity}
                onChange={(e) => setEquity(e.target.value)}
                placeholder="Pourcentage proposé (%)"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
              />
            </div>

            <div className="text-xs text-slate-500">
              Exemple : 100 000 MAD contre 20% du projet.
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <input type="number" value={founderContribution} onChange={(e) => setFounderContribution(e.target.value)} placeholder="Apport fondateur ($)" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
              <input value={useOfFunds} onChange={(e) => setUseOfFunds(e.target.value)} placeholder="Utilisation des fonds" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
            </div>

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

          {title && <p className="text-sm text-slate-600">Projet : {title}</p>}
          {location && <p className="text-sm text-slate-600">Localisation : {location}</p>}
          {industry && <p className="text-sm text-slate-600">Industrie : {industry}</p>}
          {amount && <p className="text-sm text-slate-600">Montant : {amount}</p>}
          {minimumInvestment && <p className="text-sm text-slate-600">Min. investissement : {minimumInvestment}</p>}
          {equity && <p className="text-sm text-slate-600">Equity : {equity}%</p>}
          {founderContribution && <p className="text-sm text-slate-600">Apport fondateur : {founderContribution}</p>}

          <button className="mt-6 w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Publier la demande
          </button>

        </div>

      </div>
    </div>
  );
}