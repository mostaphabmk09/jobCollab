"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calculator, Coins, MapPinned } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {
  createRealEstateOpportunity,
  getRealEstateOpportunity,
  updateRealEstateOpportunity,
} from "@/lib/real-estate-api";

const fieldClassName =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100";

const sectionClassName =
  "rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.45)]";

const initialForm = {
  city: "",
  propertyType: "",
  purpose: "",
  totalBudget: "",
  partners: "",
  title: "",
  description: "",
};

export default function AchatPage() {
  const { accessToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const opportunityId =
    searchParams.get("id") || searchParams.get("opportunityId");

  const [mode, setMode] = useState("define");
  const [form, setForm] = useState(initialForm);
  const [isLoadingOpportunity, setIsLoadingOpportunity] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isEditMode = Boolean(opportunityId);

  const investment =
    form.totalBudget && form.partners
      ? Number(form.totalBudget) / Number(form.partners)
      : 0;

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
          propertyType: opportunity.immobilier.propertyType ?? "",
          purpose: opportunity.immobilier.purpose ?? "",
          totalBudget:
            opportunity.immobilier.totalBudget !== null
              ? String(opportunity.immobilier.totalBudget)
              : "",
          partners:
            opportunity.immobilier.partners !== null
              ? String(opportunity.immobilier.partners)
              : "",
          title: opportunity.title ?? "",
          description: opportunity.description ?? "",
        });
        setMode(
          opportunity.immobilier.investmentMode === "DISCUSS"
            ? "discuss"
            : "define",
        );
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
      axis: "ACHAT" as const,
      title: form.title,
      description: form.description,
      city: form.city,
      propertyType: form.propertyType,
      purpose: form.purpose || undefined,
      investmentMode: mode === "define" ? ("DEFINE" as const) : ("DISCUSS" as const),
      totalBudget:
        mode === "define" && form.totalBudget
          ? Number(form.totalBudget)
          : undefined,
      partners:
        mode === "define" && form.partners ? Number(form.partners) : undefined,
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
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ed_0%,#eff6ff_35%,#eef2ff_100%)] px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-12">
          <div className="space-y-6 md:col-span-8">
            <section className="overflow-hidden rounded-[32px] border border-white/80 bg-slate-950 p-8 text-white shadow-[0_28px_80px_-40px_rgba(15,23,42,0.6)]">
              <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
                <div className="space-y-4">
                  <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
                    Immobilier
                  </span>
                  <div className="space-y-3">
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                      {isEditMode
                        ? "Modifier une opportunite d&apos;achat."
                        : "Creer une opportunite d&apos;achat."}
                    </h1>
                    <p className="max-w-xl text-sm leading-6 text-slate-300">
                      Trouvez un partenaire pour investir dans un bien immobilier,
                      avec une interface plus claire pour cadrer le projet.
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
                  <div className="flex items-center gap-3">
                    <MapPinned className="h-5 w-5 text-amber-200" />
                    <span>Ville, type de bien et objectif clairement visibles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Coins className="h-5 w-5 text-amber-200" />
                    <span>Bloc investissement plus lisible</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calculator className="h-5 w-5 text-amber-200" />
                    <span>Calcul automatique conserve</span>
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

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                    Etape 1
                  </p>
                  <h2 className="text-xl font-semibold text-slate-950">
                    Informations du bien
                  </h2>
                  <p className="text-sm leading-6 text-slate-500">
                    Gardez les memes attributs, avec un habillage plus editorial.
                  </p>
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

                  <select
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    className={fieldClassName}
                    required
                  >
                    <option value="">Type de bien</option>
                    <option>Appartement</option>
                    <option>Villa</option>
                    <option>Riad</option>
                    <option>Studio</option>
                    <option>Terrain</option>
                  </select>

                  <select
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    className={`md:col-span-2 ${fieldClassName}`}
                  >
                    <option value="">Objectif du projet</option>
                    <option>Location longue duree</option>
                    <option>Location Airbnb</option>
                    <option>Achat pour revente</option>
                    <option>Projet mixte</option>
                  </select>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                    Etape 2
                  </p>
                  <h2 className="text-xl font-semibold text-slate-950">
                    Investissement
                  </h2>
                  <p className="text-sm leading-6 text-slate-500">
                    Le mode de saisie reste identique, avec un toggle plus net.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="grid gap-3 md:grid-cols-2">
                    <label
                      className={`cursor-pointer rounded-2xl border px-4 py-4 text-sm transition ${
                        mode === "define"
                          ? "border-amber-300 bg-amber-50 text-amber-950 shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={mode === "define"}
                        onChange={() => setMode("define")}
                        className="sr-only"
                      />
                      <span className="block font-medium">
                        Definir l&apos;investissement
                      </span>
                      <span className="mt-1 block text-xs leading-5 opacity-80">
                        Budget et nombre d investisseurs renseignes directement.
                      </span>
                    </label>

                    <label
                      className={`cursor-pointer rounded-2xl border px-4 py-4 text-sm transition ${
                        mode === "discuss"
                          ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={mode === "discuss"}
                        onChange={() => setMode("discuss")}
                        className="sr-only"
                      />
                      <span className="block font-medium">
                        Discuter avec le partenaire
                      </span>
                      <span className="mt-1 block text-xs leading-5 opacity-80">
                        Les conditions sont fixees au moment de l echange.
                      </span>
                    </label>
                  </div>

                  {mode === "define" && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        type="number"
                        name="totalBudget"
                        value={form.totalBudget}
                        placeholder="Budget total"
                        onChange={handleChange}
                        className={fieldClassName}
                      />

                      <input
                        type="number"
                        name="partners"
                        value={form.partners}
                        placeholder="Nombre investisseurs"
                        onChange={handleChange}
                        className={fieldClassName}
                      />
                    </div>
                  )}

                  {mode === "define" && investment > 0 && (
                    <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                        Calcul automatique
                      </p>
                      <p className="mt-2 text-sm text-slate-700">
                        Chaque investisseur doit apporter
                        <span className="ml-2 text-lg font-semibold text-slate-950">
                          {investment.toLocaleString()} DH
                        </span>
                      </p>
                    </div>
                  )}

                  {mode === "discuss" && (
                    <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-500">
                      Les conditions d&apos;investissement seront discutees avec le
                      partenaire.
                    </p>
                  )}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                    Etape 3
                  </p>
                  <h2 className="text-xl font-semibold text-slate-950">
                    Description
                  </h2>
                </div>

                <div className="space-y-4">
                  <input
                    name="title"
                    value={form.title}
                    placeholder="Titre de l&apos;opportunite"
                    onChange={handleChange}
                    className={fieldClassName}
                    required
                  />

                  <textarea
                    name="description"
                    value={form.description}
                    rows={5}
                    placeholder="Decrivez votre projet..."
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
                <div className="border-b border-slate-100 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                    Apercu
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950">
                    Opportunite d&apos;achat
                  </h3>
                </div>

                <div className="space-y-4 px-6 py-6 text-sm text-slate-700">
                  {form.city && <p>Ville : {form.city}</p>}
                  {form.propertyType && <p>Type : {form.propertyType}</p>}
                  {form.purpose && <p>Objectif : {form.purpose}</p>}
                  {mode === "define" && form.totalBudget && (
                    <p>Budget : {Number(form.totalBudget).toLocaleString()} DH</p>
                  )}
                  {mode === "define" && form.partners && (
                    <p>Investisseurs : {form.partners}</p>
                  )}
                  {mode === "define" && investment > 0 && (
                    <p className="font-semibold text-slate-950">
                      Par partenaire : {investment.toLocaleString()} DH
                    </p>
                  )}
                  {mode === "discuss" && (
                    <p className="text-slate-500">
                      Investissement a discuter avec le partenaire
                    </p>
                  )}
                  {form.title && (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Titre
                      </p>
                      <p className="mt-2 font-medium text-slate-950">
                        {form.title}
                      </p>
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
