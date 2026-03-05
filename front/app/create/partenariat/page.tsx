"use client";

import { useState } from "react";

export default function CreatePartenariatPage() {
  const [type, setType] = useState("financier");
  const [capital, setCapital] = useState("");
  const [percentage, setPercentage] = useState("");
  const [profitMode, setProfitMode] = useState("ratio");

  const [remunerationMode, setRemunerationMode] = useState("salaire");
  const [salary, setSalary] = useState("");
  const [commission, setCommission] = useState("");
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Chercher un partenaire
          </h1>

          {/* Infos projet */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">
              Informations du projet
            </h2>

            <input
              placeholder="Titre du projet"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            <textarea
              rows={4}
              placeholder="Expliquez votre idée simplement..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />

            <input
              placeholder="Ville"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
            />
          </div>

          {/* Type partenaire */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-semibold text-lg">
              Quel type de partenaire cherchez-vous ?
            </h2>

            <div className="flex flex-col gap-4">

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={type === "financier"}
                  onChange={() => setType("financier")}
                />
                💰 Investisseur
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={type === "operationnel"}
                  onChange={() => setType("operationnel")}
                />
                ⚙️ Gestion / Travail
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={type === "mixte"}
                  onChange={() => setType("mixte")}
                />
                🤝 Les deux
              </label>

            </div>
          </div>

          {/* Financier */}
          {(type === "financier" || type === "mixte") && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="font-semibold text-lg">
                Conditions investissement
              </h2>

              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                placeholder="Montant recherché (MAD)"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
              />

              <select
                value={profitMode}
                onChange={(e) => setProfitMode(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
              >
                <option value="ratio">
                  Profit selon pourcentage
                </option>
                <option value="equal">
                  Profit partagé équitablement
                </option>
                <option value="later">
                  À discuter
                </option>
              </select>

              {profitMode === "ratio" && (
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  placeholder="Pourcentage proposé (%)"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
                />
              )}
            </div>
          )}

          {/* Opérationnel */}
          {(type === "operationnel" || type === "mixte") && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="font-semibold text-lg">
                Mode de rémunération
              </h2>

              <div className="space-y-4">

                {/* Salaire */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={remunerationMode === "salaire"}
                    onChange={() => setRemunerationMode("salaire")}
                  />
                  💵 Salaire mensuel
                </label>

                {remunerationMode === "salaire" && (
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="Salaire mensuel (MAD)"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
                  />
                )}

                {/* Commission */}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        checked={remunerationMode === "commission"}
                        onChange={() =>
                          setRemunerationMode("commission")
                        }
                      />
                      📊 Commission (%)
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        setTooltip(
                          tooltip === "commission"
                            ? null
                            : "commission"
                        )
                      }
                      className="text-slate-400 hover:text-indigo-600"
                    >
                      ℹ️
                    </button>
                  </div>

                  {remunerationMode === "commission" && (
                    <input
                      type="number"
                      value={commission}
                      onChange={(e) =>
                        setCommission(e.target.value)
                      }
                      placeholder="Commission (%)"
                      className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
                    />
                  )}

                  {tooltip === "commission" && (
                    <div className="absolute top-10 right-0 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-xs text-slate-600 z-50">
                      Commission = pourcentage sur les ventes
                      ou bénéfices. Pas de propriété dans le
                      projet.
                    </div>
                  )}
                </div>

                {/* Equity */}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        checked={remunerationMode === "equity"}
                        onChange={() =>
                          setRemunerationMode("equity")
                        }
                      />
                      📈 Equity (%)
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        setTooltip(
                          tooltip === "equity"
                            ? null
                            : "equity"
                        )
                      }
                      className="text-slate-400 hover:text-indigo-600"
                    >
                      ℹ️
                    </button>
                  </div>

                  {tooltip === "equity" && (
                    <div className="absolute top-10 right-0 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-xs text-slate-600 z-50">
                      Equity = pourcentage de propriété dans
                      le projet. Le partenaire devient
                      copropriétaire.
                    </div>
                  )}
                </div>

                {/* À discuter */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={remunerationMode === "later"}
                    onChange={() =>
                      setRemunerationMode("later")
                    }
                  />
                  🤝 À discuter
                </label>

              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24 h-fit">
          <h3 className="font-semibold text-lg mb-4">
            Résumé
          </h3>

          <p className="text-sm text-slate-600 mb-2">
            Type: {type}
          </p>

          {(type === "financier" || type === "mixte") && capital && (
            <p className="text-sm text-slate-600">
              Capital: {capital} MAD
            </p>
          )}

          {(type === "operationnel" || type === "mixte") && (
            <>
              {remunerationMode === "salaire" && salary && (
                <p className="text-sm text-slate-600">
                  Salaire: {salary} MAD / mois
                </p>
              )}

              {remunerationMode === "commission" && commission && (
                <p className="text-sm text-slate-600">
                  Commission: {commission}%
                </p>
              )}

              {remunerationMode === "equity" && (
                <p className="text-sm text-slate-600">
                  Rémunération en equity
                </p>
              )}

              {remunerationMode === "later" && (
                <p className="text-sm text-slate-600">
                  Conditions à discuter
                </p>
              )}
            </>
          )}

          <button className="mt-6 w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Publier mon projet
          </button>
        </div>

      </div>
    </div>
  );
}