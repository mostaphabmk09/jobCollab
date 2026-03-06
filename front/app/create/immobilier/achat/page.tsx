"use client";

import { useState } from "react";

export default function AchatPartenariatPage() {

  const [mode, setMode] = useState("define");

  const [form, setForm] = useState({
    city: "",
    propertyType: "",
    totalBudget: "",
    partners: "",
    title: "",
    description: "",
  });

  const investment =
    form.totalBudget && form.partners
      ? Number(form.totalBudget) / Number(form.partners)
      : 0;

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="px-6 py-12 bg-gray-50 min-h-screen">

      <div className="max-w-4xl mx-auto">

        {/* Header */}

        <div className="mb-8">

          <span className="text-xs font-semibold text-orange-500 uppercase">
            Immobilier
          </span>

          <h1 className="text-2xl font-semibold mt-2">
            Achat en partenariat
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Publiez une opportunité pour acheter un bien avec un partenaire.
          </p>

        </div>

        {/* Form Card */}

        <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-8 shadow-sm">

          {/* Informations */}

          <div>

            <h2 className="text-sm font-semibold mb-5">
              Informations du bien
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <div>

                <label className="text-xs text-gray-500 mb-1 block">
                  Ville
                </label>

                <select
                  name="city"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                >

                  <option>Choisir une ville</option>
                  <option>Casablanca</option>
                  <option>Marrakech</option>
                  <option>Rabat</option>
                  <option>Tanger</option>
                  <option>Agadir</option>

                </select>

              </div>

              <div>

                <label className="text-xs text-gray-500 mb-1 block">
                  Type de bien
                </label>

                <select
                  name="propertyType"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >

                  <option>Type</option>
                  <option>Appartement</option>
                  <option>Villa</option>
                  <option>Riad</option>
                  <option>Studio</option>
                  <option>Terrain</option>

                </select>

              </div>

            </div>

          </div>

          {/* Investissement */}

          <div className="border-t pt-6">

            <h2 className="text-sm font-semibold mb-4">
              Investissement
            </h2>

            <div className="flex gap-6 mb-6">

              <label className="flex items-center gap-2 text-sm">

                <input
                  type="radio"
                  checked={mode === "define"}
                  onChange={() => setMode("define")}
                />

                Définir l’investissement

              </label>

              <label className="flex items-center gap-2 text-sm">

                <input
                  type="radio"
                  checked={mode === "discuss"}
                  onChange={() => setMode("discuss")}
                />

                Discuter avec le partenaire

              </label>

            </div>

            {mode === "define" && (

              <div className="grid md:grid-cols-2 gap-4">

                <div>

                  <label className="text-xs text-gray-500 mb-1 block">
                    Budget total
                  </label>

                  <input
                    type="number"
                    name="totalBudget"
                    placeholder="1000000"
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />

                </div>

                <div>

                  <label className="text-xs text-gray-500 mb-1 block">
                    Investisseurs (vous inclus)
                  </label>

                  <input
                    type="number"
                    name="partners"
                    placeholder="2"
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />

                </div>

              </div>

            )}

            {mode === "define" && investment > 0 && (

              <div className="mt-4 bg-gray-100 border rounded-lg px-4 py-3 text-sm">

                Chaque investisseur apporte
                <span className="font-semibold ml-2">
                  {investment.toLocaleString()} DH
                </span>

              </div>

            )}

            {mode === "discuss" && (

              <div className="text-sm text-gray-500">

                Les conditions d’investissement seront discutées directement
                avec les partenaires intéressés.

              </div>

            )}

          </div>

          {/* Description */}

          <div className="border-t pt-6">

            <h2 className="text-sm font-semibold mb-4">
              Description
            </h2>

            <div className="space-y-4">

              <input
                name="title"
                placeholder="Titre de l’opportunité"
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />

              <textarea
                name="description"
                rows={4}
                placeholder="Décrivez votre projet..."
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />

            </div>

          </div>

          {/* Submit */}

          <div className="flex justify-end pt-6 border-t">

            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">

              Publier l’opportunité

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}