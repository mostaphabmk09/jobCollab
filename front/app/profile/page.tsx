"use client";

import React, { useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle2, AlertCircle, Zap } from "lucide-react";

export default function ProfilePage() {
  const { user, accessToken } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    company: user?.company || "",
    position: user?.position || "",
    website: user?.website || "",
    city: user?.city || "",
    bio: user?.bio || "",
  });

  // Calculate profile completion percentage
  const profileCompletion = useMemo(() => {
    const fields = [
      formData.name,
      formData.phone,
      formData.company,
      formData.position,
      formData.website,
      formData.city,
      formData.bio,
      user?.profileType,
      user?.interests && user.interests.length > 0,
    ];
    const filled = fields.filter((f) => f && (typeof f === "string" ? f.trim() : f)).length;
    return Math.round((filled / fields.length) * 100);
  }, [formData, user?.profileType, user?.interests]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-700 font-medium">Vous devez être connecté pour voir votre profil.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("http://localhost:4000/users/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Erreur lors de la sauvegarde");
      }
      setSuccess("Profil mis à jour avec succès!");
      setTimeout(() => {
        setSuccess(null);
        setEditing(false);
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur réseau"
      );
    } finally {
      setSaving(false);
    }
  };

  const initials = (user.email || "?")
    .split("@")[0]
    .split(/[._-]/)
    .map((s) => s[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header with Avatar and Progress */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-6">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                {initials}
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900">
                  {user.name || "Utilisateur"}
                </h1>
                <p className="text-slate-500 mt-1">{user.email}</p>
                {user.profileType && (
                  <div className="mt-3 flex gap-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                      {user.profileType}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                if (editing) {
                  setEditing(false);
                } else {
                  setEditing(true);
                  setError(null);
                  setSuccess(null);
                }
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              {editing ? "Annuler" : "Modifier"}
            </button>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-slate-700">
                  Profil complété
                </span>
              </div>
              <span className="text-sm font-bold text-indigo-600">
                {profileCompletion}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Complétez votre profil pour améliorer votre visibilité
            </p>
          </div>
        </div>

        {/* Interests & Profile Type */}
        {(user.profileType || (user.interests && user.interests.length > 0)) && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
              Profil & Intérêts
            </h2>
            <div className="space-y-4">
              {user.profileType && (
                <div>
                  <p className="text-sm font-medium text-slate-600">Type de profil</p>
                  <p className="text-slate-900 font-semibold mt-1">{user.profileType}</p>
                </div>
              )}
              {user.interests && user.interests.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-slate-600">Intérêts</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.interests.map((interest: string) => (
                      <span
                        key={interest}
                        className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit Mode or View Mode */}
        {editing ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-8">
              Modifier mon profil
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                {success}
              </div>
            )}

            <div className="space-y-6">
              {/* Basic Info Section */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-200">
                  Informations de base
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nom complet"
                    value={formData.name}
                    onChange={handleChange}
                    className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Professional Info Section */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-200">
                  Informations professionnelles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="company"
                    placeholder="Entreprise"
                    value={formData.company}
                    onChange={handleChange}
                    className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="position"
                    placeholder="Poste / Rôle"
                    value={formData.position}
                    onChange={handleChange}
                    className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    name="website"
                    placeholder="Site web (https://...)"
                    value={formData.website}
                    onChange={handleChange}
                    className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="Ville"
                    value={formData.city}
                    onChange={handleChange}
                    className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Bio Section */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-3 border-b border-slate-200">
                  À propos
                </h3>
                <textarea
                  name="bio"
                  placeholder="Parlez-nous de vous, vos compétences, vos objectifs..."
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
                >
                  {saving ? "Enregistrement..." : "Enregistrer les modifications"}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* View Mode: Display Fields */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-8">
                Informations de base
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Nom
                  </p>
                  <p className="text-slate-900 font-semibold mt-2">
                    {formData.name || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Téléphone
                  </p>
                  <p className="text-slate-900 font-semibold mt-2">
                    {formData.phone || "—"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-8">
                Informations professionnelles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Entreprise
                  </p>
                  <p className="text-slate-900 font-semibold mt-2">
                    {formData.company || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Poste
                  </p>
                  <p className="text-slate-900 font-semibold mt-2">
                    {formData.position || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Site web
                  </p>
                  <p className="text-slate-900 font-semibold mt-2">
                    {formData.website ? (
                      <a
                        href={formData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        {formData.website}
                      </a>
                    ) : (
                      "—"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Ville
                  </p>
                  <p className="text-slate-900 font-semibold mt-2">
                    {formData.city || "—"}
                  </p>
                </div>
              </div>
            </div>

            {formData.bio && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">À propos</h2>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {formData.bio}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Other sections */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Mes opportunités</h3>
            <p className="text-sm text-slate-500">
              Les opportunités que vous avez créées apparaîtront ici.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Mes favoris</h3>
            <p className="text-sm text-slate-500">
              Vos opportunités sauvegardées apparaîtront ici.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
