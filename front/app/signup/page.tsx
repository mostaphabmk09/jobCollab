"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      // Register on backend
      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Erreur lors de l'inscription");
      }

      // Auto-login using context helper
      await login(form.email, form.password);

      // mark that onboarding should show once after signup
      try {
        localStorage.setItem("show_onboarding_after_signup", "true");
      } catch {
        /* ignore */
      }

      // Redirect to home
      router.push("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 lg:col-span-6 flex items-center">
          <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold">DB</div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Digital Bridge</h2>
                <p className="text-xs text-slate-500">Rejoignez notre communauté</p>
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-2xl font-black text-slate-900">Créer un compte</h1>
              <p className="mt-2 text-sm text-slate-500">Inscrivez-vous rapidement et commencez à publier vos projets.</p>
            </div>

            {/* <div className="mt-6 space-y-4">
              <button
                type="button"
                onClick={() => {
                  // Open backend OAuth route in a new window (backend must implement /auth/google)
                  window.open('http://localhost:4000/auth/google', '_blank', 'width=600,height=700');
                }}
                className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium hover:shadow-sm"
              >
                <Image src="/icons/google.svg" alt="Google" width={16} height={16} className="w-4 h-4" />
                Continuer avec Google
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <div className="text-xs text-slate-400">ou</div>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
            </div> */}

            <form onSubmit={handleSubmit} className="mt-4 space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-700">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Confirmer</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-60"
              >
                {loading ? "Inscription..." : "Créer un compte"}
              </button>

              {error && <p className="text-sm text-red-600 text-center mt-2">{error}</p>}
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">Déjà un compte ? <a href="/login" className="font-semibold text-indigo-600 hover:underline">Se connecter</a></p>
          </div>
        </div>

        <aside className="md:col-span-5 lg:col-span-6 hidden md:flex items-center">
          <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-500 to-sky-500 text-white p-8 shadow-lg">
            <div className="max-w-md">
              <h3 className="text-2xl font-extrabold">Commencez à collaborer</h3>
              <p className="mt-3 text-sm opacity-90">Publiez vos opportunités, trouvez des partenaires et développez vos projets.</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded">✓</span>
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
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
