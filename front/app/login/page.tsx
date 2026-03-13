"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);
  setError(null);

  try {
    await login(email, password);

    // ✅ Redirect l home page
    router.push("/");

  } catch {
    setError("Email ou mot de passe incorrect");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: form card */}
        <div className="md:col-span-7 lg:col-span-6 flex items-center">
          <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold">DB</div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Digital Bridge</h2>
                <p className="text-xs text-slate-500">Connectez-vous et commencez à collaborer</p>
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-2xl font-black text-slate-900">Connexion</h1>
              <p className="mt-2 text-sm text-slate-500">Entrez vos identifiants pour accéder à votre compte</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Adresse e-mail
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2 text-slate-700">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                  <span>Se souvenir de moi</span>
                </label>
                <Link href="/forgot" className="text-indigo-600 hover:underline">Mot de passe oublié ?</Link>
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-60"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Pas encore de compte ?{' '}
              <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">Créer un compte</Link>
            </div>

          </div>
        </div>

        {/* Right: Info / visual */}
        <aside className="md:col-span-5 lg:col-span-6 hidden md:flex items-center">
          <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-500 to-sky-500 text-white p-8 shadow-lg">
            <div className="max-w-md">
              <h3 className="text-2xl font-extrabold">Rejoignez une communauté de créateurs</h3>
              <p className="mt-3 text-sm opacity-90">Trouver des partenaires, publier des projets, et recevoir des opportunités adaptées.</p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded">
                    ✓
                  </span>
                  <span className="text-sm font-medium">Projets & collaborations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded">✓</span>
                  <span className="text-sm font-medium">Visibilité pour vos offres</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded">✓</span>
                  <span className="text-sm font-medium">Réseautage intelligent</span>
                </li>
              </ul>

              <div className="mt-8 text-xs opacity-90">Sécurité et confidentialité intégrées — nous n&apos;accédons jamais à vos mots de passe.</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}