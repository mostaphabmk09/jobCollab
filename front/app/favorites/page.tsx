"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";


type FavoriteItem = {
  id: number;
  title: string;
  description: string;
  category: "Opportunité" | "Immobilier";
  type: string;
  domaine: string;
  location: string;
  budget?: string;
  author: string;
  date: string;
};

const mockFavorites: FavoriteItem[] = [
  {
    id: 1,
    title: "Investisseur pour projet immobilier Airbnb",
    description:
      "Opportunité d’achat d’un appartement à Marrakech.",
    category: "Immobilier",
    type: "Financement",
    domaine: "Immobilier",
    location: "Marrakech",
    budget: "200k MAD",
    author: "Mehdi",
    date: "Il y a 1 semaine",
  },
  {
    id: 2,
    title: "Co-fondateur pour plateforme e-commerce",
    description:
      "Recherche partenaire technique pour lancer marketplace niche.",
    category: "Opportunité",
    type: "Partenariat",
    domaine: "E-commerce",
    location: "Tanger",
    author: "Amine",
    date: "Il y a 1 jour",
  },
  {
    id: 3,
    title: "Terrain pour projet villa moderne",
    description:
      "Terrain disponible pour projet immobilier premium.",
    category: "Immobilier",
    type: "Vente",
    domaine: "Terrain",
    location: "Agadir",
    budget: "350k MAD",
    author: "Youssef",
    date: "Il y a 4 jours",
  },
];

export default function FavoritesPage() {
  // const { user, loading } = useAuth();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");
  // const router = useRouter();

  // useEffect(() => {
  // if (!loading && !user) {
  //   router.replace("/login");
  // }
  //   }, [user, loading, router]);

  //   if (loading || !user) return null;

  // 🔢 Counts
  const totalCount = mockFavorites.length;
  const opportuniteCount = mockFavorites.filter(
    (item) => item.category === "Opportunité"
  ).length;
  const immobilierCount = mockFavorites.filter(
    (item) => item.category === "Immobilier"
  ).length;

  const filters = [
    { label: "Tous", icon: "🌍", count: totalCount },
    { label: "Opportunité", icon: "🚀", count: opportuniteCount },
    { label: "Immobilier", icon: "🏡", count: immobilierCount },
  ];

  const filtered = mockFavorites.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "Tous" || item.category === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
        <ProtectedRoute>
    
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
            Mes favoris
            <span className="text-lg">❤️</span>
          </h1>
          <p className="text-slate-600 mt-3">
            Retrouvez toutes vos opportunités sauvegardées.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Rechercher dans vos favoris..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 pl-12 pr-5 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.label}
              onClick={() => setActiveFilter(filter.label)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeFilter === filter.label
                  ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg"
                  : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{filter.icon}</span>
              {filter.label}

              <span
                className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeFilter === filter.label
                    ? "bg-white/20 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl border border-slate-200 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700">
                      {item.type}
                    </span>

                    <span className="text-xs text-slate-400">
                      {item.date}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">
                    {item.title}
                  </h2>

                  <p className="text-sm text-slate-600 mt-3 line-clamp-3">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 text-xs">
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-600">
                      📍 {item.location}
                    </span>

                    <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-600">
                      🏷 {item.domaine}
                    </span>

                    {item.budget && (
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                        💰 {item.budget}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
                      {item.author.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      {item.author}
                    </span>
                  </div>

                  <button className="text-base opacity-70 hover:opacity-100 transition hover:scale-110">
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20">
            <p className="text-slate-500 text-lg">
              Aucun favori trouvé.
            </p>
          </div>
        )}
      </div>
    </div>
        </ProtectedRoute>
    
  );
}