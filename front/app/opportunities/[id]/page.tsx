"use client";

import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";

type Opportunity = {
  id: number;
  title: string;
  description: string;
  type: string;
  domaine: string;
  budget?: string;
  location: string;
  author: string;
  date: string;
};

const mockData: Opportunity[] = [
  {
    id: 1,
    title: "Cherche partenaire pour restaurant healthy premium",
    description:
      "Projet déjà rentable avec un chiffre d'affaires mensuel stable.\n\nNous cherchons un partenaire stratégique pour expansion nationale.\n\nBusiness model validé – fort potentiel de croissance.\n\nVision long terme sur 5 ans.",
    type: "Partenariat",
    domaine: "Restauration",
    budget: "50k - 100k MAD",
    location: "Casablanca",
    author: "Yassine",
    date: "Il y a 2 jours",
  },
];

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [favorite, setFavorite] = useState(false);

  const opportunity = mockData.find(
    (item) => item.id === Number(id)
  );

  if (!opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Opportunité introuvable.
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* HERO */}
      <div className="relative bg-gradient-to-br from-[#4338ca] via-[#6d28d9] to-[#9333ea] text-white py-20 px-6 overflow-hidden">

        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-8">

          <div className="space-y-6 max-w-3xl">
            <span className="bg-white/20 backdrop-blur px-4 py-1 rounded-full text-xs font-semibold">
              {opportunity.type}
            </span>

            <h1 className="text-3xl md:text-4xl font-extrabold leading-snug tracking-tight">
              {opportunity.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm text-white/80">
              <span>📍 {opportunity.location}</span>
              <span>🏷 {opportunity.domaine}</span>
              <span>🕒 {opportunity.date}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setFavorite(!favorite)}
              className="flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-purple-50 transition shadow-sm"
            >
              <span className="text-base">
                {favorite ? "❤️" : "🤍"}
              </span>
              <span>
                {favorite ? "Sauvegardé" : "Sauvegarder"}
              </span>
            </button>

            <button className="bg-white/20 backdrop-blur px-5 py-2 rounded-xl text-sm font-semibold hover:bg-white/30 transition">
              🔗 Partager
            </button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">

          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">À propos du projet</h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              {opportunity.description.split("\n").map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Pourquoi investir ?</h2>

            <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-700">
              <div className="flex gap-3">
                <span className="text-green-500">✔</span>
                <p>Business model validé et rentable</p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-500">✔</span>
                <p>Marché en forte croissance</p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-500">✔</span>
                <p>Expansion nationale</p>
              </div>
              <div className="flex gap-3">
                <span className="text-green-500">✔</span>
                <p>Vision stratégique long terme</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <p className="text-sm text-slate-500">Budget estimé</p>
              <p className="font-bold text-lg text-slate-900">
                {opportunity.budget}
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <p className="text-sm text-slate-500">Domaine</p>
              <p className="font-bold text-lg text-slate-900">
                {opportunity.domaine}
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <p className="text-sm text-slate-500">Localisation</p>
              <p className="font-bold text-lg text-slate-900">
                {opportunity.location}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-8">

          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm sticky top-28">

            <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-2 rounded-xl text-center">
              🔥 Opportunité active – forte demande
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                {opportunity.author.charAt(0)}
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  {opportunity.author}
                </p>
                <p className="text-sm text-slate-500">
                  Membre depuis 2024
                </p>
              </div>
            </div>

            <button
              disabled={!user}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 font-semibold hover:scale-[1.02] hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              {user
                ? "🚀 Contacter le porteur maintenant"
                : "🔐 Connectez-vous pour contacter"}
            </button>

            <p className="text-xs text-slate-500 text-center mt-3">
              Réponse moyenne en moins de 24h
            </p>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-3xl p-6 text-sm text-indigo-700">
            🔒 Les échanges sont sécurisés via Digital Bridge.
          </div>
        </div>
      </div>
    </div>
  );
}