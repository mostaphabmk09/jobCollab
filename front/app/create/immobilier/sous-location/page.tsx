"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BadgeCheck, BarChart3, House } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {
  createRealEstateOpportunity,
  getRealEstateOpportunity,
  updateRealEstateOpportunity,
} from "@/lib/real-estate-api";

const fieldClassName =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100";

const sectionClassName =
  "rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.45)]";

const initialForm = {
  city: "",
  district: "",
  propertyType: "",
  rooms: "",
  maxRent: "",
  exploitation: "",
  revenue: "",
  gestion: "",
  title: "",
  description: "",
};

export default function SousLocationPage() {
  const { accessToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const opportunityId =
    searchParams.get("id") || searchParams.get("opportunityId");

  const [form, setForm] = useState(initialForm);
  const [tags, setTags] = useState<string[]>([]);
  const [showStickyProgress, setShowStickyProgress] = useState(false);
  const [isLoadingOpportunity, setIsLoadingOpportunity] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isEditMode = Boolean(opportunityId);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyProgress(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!accessToken || !opportunityId) {
      return;
    }

    let ignore = false;

    const loadOpportunity = async () => {
      setIsLoadingOpportunity(true);
      setError(null);

      try {
        const opportunity = await getRealEstateOpportunity(
          opportunityId,
          accessToken,
        );

        if (ignore) {
          return;
        }

        setForm({
          city: opportunity.immobilier.city ?? "",
          district: opportunity.immobilier.district ?? "",
          propertyType: opportunity.immobilier.propertyType ?? "",
          rooms: opportunity.immobilier.rooms ?? "",
          maxRent: opportunity.immobilier.maxRent ?? "",
          exploitation: opportunity.immobilier.exploitation ?? "",
          revenue: opportunity.immobilier.revenue ?? "",
          gestion: "",
          title: opportunity.title ?? "",
          description: opportunity.description ?? "",
        });
        setTags(opportunity.immobilier.tags ?? []);
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err.message
              : "Impossible de charger l'opportunite.",
          );
        }
      } finally {
        if (!ignore) {
          setIsLoadingOpportunity(false);
        }
      }
    };

    loadOpportunity();

    return () => {
      ignore = true;
    };
  }, [accessToken, opportunityId]);

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else if (tags.length < 3) {
      setTags([...tags, tag]);
    }
  };

  const availableTags = [
    "Paiement garanti",
    "Gestion professionnelle",
    "Experience Airbnb",
    "Optimisation revenus",
    "Projet long terme",
    "Partenaire serieux",
  ];

  const filledFields = [
    form.city,
    form.propertyType,
    form.rooms,
    form.maxRent,
    form.exploitation,
    form.title,
    form.description,
  ].filter(Boolean).length;

  const totalFields = 7;
  const progress = Math.round((filledFields / totalFields) * 100);

  const progressColor =
    progress < 40 ? "bg-red-400" : progress < 70 ? "bg-yellow-400" : "bg-green-500";

  const submitLabel = useMemo(() => {
    if (isSubmitting) {
      return isEditMode ? "Mise a jour..." : "Publication...";
    }

    return isEditMode
      ? "Mettre a jour l'opportunite"
      : "Publier l'opportunite";
  }, [isEditMode, isSubmitting]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessToken) {
      setError("Vous devez etre connecte pour publier.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const payload = {
      axis: "SOUS_LOCATION" as const,
      title: form.title,
      description: form.description,
      city: form.city,
      district: form.district || undefined,
      propertyType: form.propertyType,
      rooms: form.rooms || undefined,
      maxRent: form.maxRent || undefined,
      exploitation: form.exploitation || undefined,
      revenue: form.revenue || undefined,
      tags,
    };

    try {
      const result = isEditMode
        ? await updateRealEstateOpportunity(opportunityId!, payload, accessToken)
        : await createRealEstateOpportunity(payload, accessToken);

      setSuccessMessage(
        isEditMode
          ? "Opportunite mise a jour avec succes."
          : "Opportunite creee avec succes.",
      );

      if (!isEditMode) {
        router.replace(`${pathname}?id=${result.id}`);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue pendant l'envoi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#dcfce7_0%,#eff6ff_36%,#ecfeff_100%)] px-6 py-10">
        {showStickyProgress && (
          <div className="fixed left-0 top-16 z-50 w-full border-b border-emerald-100 bg-white/95 px-6 py-3 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Progression {progress}%
              </span>
              <div className="h-2 flex-1 rounded-full bg-slate-200">
                <div
                  className={`h-2 rounded-full ${progressColor}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-12">
          <div className="space-y-6 md:col-span-8">
            <section className="overflow-hidden rounded-[32px] border border-white/80 bg-[linear-gradient(135deg,#052e16_0%,#14532d_35%,#0f172a_100%)] p-8 text-white shadow-[0_28px_80px_-40px_rgba(15,23,42,0.6)]">
              <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
                <div className="space-y-4">
                  <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
                    Immobilier
                  </span>
                  <div className="space-y-3">
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                      {isEditMode
                        ? "Modifier une annonce de sous-location"
                        : "Recherche appartement pour sous-location"}
                    </h1>
                    <p className="max-w-xl text-sm leading-6 text-emerald-50/80">
                      Le formulaire garde exactement ses attributs, avec un design
                      plus structure et un suivi de progression plus propre.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/5 p-5 text-sm text-slate-100">
                  <div className="flex items-center gap-3">
                    <House className="h-5 w-5 text-emerald-200" />
                    <span>Bloc bien recherche plus lisible</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-emerald-200" />
                    <span>Progression mieux mise en scene</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-emerald-200" />
                    <span>Tags conserves avec meilleure selection</span>
                  </div>
                </div>
              </div>
            </section>

            <form onSubmit={handleSubmit} className={`${sectionClassName} space-y-8`}>
              {isLoadingOpportunity && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  Chargement de l&apos;opportunite...
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </div>
              )}

              <div className="rounded-[24px] border border-emerald-100 bg-emerald-50/70 p-5">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  <span>Completude de l&apos;annonce</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-emerald-100">
                  <div
                    className={`h-2 rounded-full ${progressColor}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Completez votre annonce pour ameliorer sa visibilite.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Recherche
                  </p>
                  <h2 className="text-xl font-semibold text-slate-950">
                    Bien recherche
                  </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className={fieldClassName}
                    required
                  >
                    <option value="">Ville</option>
                    <option>Casablanca</option>
                    <option>Marrakech</option>
                    <option>Rabat</option>
                    <option>Tanger</option>
                    <option>Agadir</option>
                  </select>

                  <input
                    name="district"
                    value={form.district}
                    placeholder="Quartier"
                    onChange={handleChange}
                    className={fieldClassName}
                  />

                  <select
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    className={fieldClassName}
                    required
                  >
                    <option value="">Type de bien</option>
                    <option>Peu importe</option>
                    <option>Appartement</option>
                    <option>Villa</option>
                    <option>Riad</option>
                    <option>Studio</option>
                  </select>

                  <select
                    name="rooms"
                    value={form.rooms}
                    onChange={handleChange}
                    className={fieldClassName}
                  >
                    <option value="">Chambres</option>
                    <option>Peu importe</option>
                    <option>Studio</option>
                    <option>1 chambre</option>
                    <option>2 chambres</option>
                    <option>3 chambres</option>
                    <option>4+</option>
                  </select>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Budget
                  </p>
                  <h2 className="text-xl font-semibold text-slate-950">
                    Budget location
                  </h2>
                </div>

                <select
                  name="maxRent"
                  value={form.maxRent}
                  onChange={handleChange}
                  className={fieldClassName}
                >
                  <option value="">Loyer maximum</option>
                  <option>3000 - 5000 DH</option>
                  <option>5000 - 8000 DH</option>
                  <option>8000 - 12000 DH</option>
                  <option>12000+ DH</option>
                </select>
              </div>

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Exploitation
                  </p>
                  <h2 className="text-xl font-semibold text-slate-950">
                    Strategie
                  </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <select
                    name="exploitation"
                    value={form.exploitation}
                    onChange={handleChange}
                    className={fieldClassName}
                  >
                    <option value="">Type exploitation</option>
                    <option>Airbnb</option>
                    <option>Location courte duree</option>
                    <option>Mixte</option>
                  </select>

                  <select
                    name="revenue"
                    value={form.revenue}
                    onChange={handleChange}
                    className={fieldClassName}
                  >
                    <option value="">Revenu estime</option>
                    <option>Je ne sais pas</option>
                    <option>10k - 20k</option>
                    <option>20k - 40k</option>
                    <option>40k+</option>
                  </select>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Visibilite
                  </p>
                  <h2 className="text-xl font-semibold text-slate-950">
                    Mettez en avant votre projet
                  </h2>
                  <p className="text-sm leading-6 text-slate-500">
                    Selectionnez jusqu a 3 elements qui seront affiches sur votre
                    annonce.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                        tags.includes(tag)
                          ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Annonce
                  </p>
                  <h2 className="text-xl font-semibold text-slate-950">
                    Description
                  </h2>
                </div>

                <div className="space-y-4">
                  <input
                    name="title"
                    value={form.title}
                    placeholder="Titre de l&apos;annonce"
                    onChange={handleChange}
                    className={fieldClassName}
                    required
                  />

                  <textarea
                    name="description"
                    value={form.description}
                    rows={5}
                    placeholder="Decrivez votre recherche..."
                    onChange={handleChange}
                    className={`${fieldClassName} min-h-[140px] resize-none`}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-200 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoadingOpportunity}
                  className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitLabel}
                </button>
              </div>
            </form>
          </div>

          <aside className="md:col-span-4">
            <div className="sticky top-24 space-y-5">
              <section className="overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.45)]">
                <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Apercu
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950">
                    Annonce de sous-location
                  </h3>
                </div>

                <div className="space-y-3 px-6 py-6 text-sm text-slate-700">
                  {form.city && <p>Ville : {form.city}</p>}
                  {form.propertyType && <p>Type : {form.propertyType}</p>}
                  {form.rooms && <p>Chambres : {form.rooms}</p>}
                  {form.maxRent && <p>Loyer max : {form.maxRent}</p>}
                  {form.exploitation && <p>Exploitation : {form.exploitation}</p>}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </main>
    </ProtectedRoute>
  );
}
