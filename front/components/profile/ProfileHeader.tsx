"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import OnBoardingModal from "@/components/onboarding/OnBoardingModal";

export default function ProfileHeader() {
  const { user, accessToken } = useAuth();
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  const initials = (user.email || "?")
    .split("@")[0]
    .split(/[._-]/)
    .map((s) => s[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  const saveName = async () => {
    if (!name) return;
    setSaving(true);
    try {
      await fetch("http://localhost:4000/users/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name }),
      });
      // refresh the page to reload user data from server
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
      setEditingName(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
          {initials}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            {editingName ? (
              <>
                <input
                  className="border rounded px-3 py-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  className="bg-indigo-600 text-white px-3 py-2 rounded"
                  onClick={saveName}
                  disabled={saving}
                >
                  {saving ? "Enregistrement..." : "Enregistrer"}
                </button>
                <button
                  className="px-3 py-2 rounded"
                  onClick={() => setEditingName(false)}
                >
                  Annuler
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">
                  {user.name || "Utilisateur"}
                </h2>
                <button
                  className="ml-2 text-sm text-indigo-600"
                  onClick={() => {
                    setEditingName(true);
                    setName(user.name || "");
                  }}
                >
                  Modifier
                </button>
              </>
            )}
          </div>
          <div className="text-sm text-slate-500">{user.email}</div>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {user.profileType && (
              <span className="text-xs px-3 py-1 rounded-full bg-slate-100">
                {user.profileType}
              </span>
            )}
            {user.interests && user.interests.map((it: string) => (
              <span key={it} className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                {it}
              </span>
            ))}
          </div>
        </div>

        <div>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded"
            onClick={() => setShowOnboarding(true)}
          >
            Compléter mon profil
          </button>
        </div>
      </div>

      {showOnboarding && (
        <OnBoardingModal
          onComplete={async (data) => {
            try {
              const res = await fetch("http://localhost:4000/users/onboarding", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ ...data, name }),
              });
              if (!res.ok) return false;
              // refresh to get new data
              window.location.reload();
              return true;
            } catch (e) {
              console.error(e);
              return false;
            }
          }}
        />
      )}
    </div>
  );
}
