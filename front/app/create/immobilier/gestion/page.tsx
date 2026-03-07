"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Building2, Link2, Sparkles } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {
  createRealEstateOpportunity,
  getRealEstateOpportunity,
  updateRealEstateOpportunity,
} from "@/lib/real-estate-api";

const fieldClassName =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100";

const sectionClassName =
  "rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.45)]";

const initialForm = {
  city: "",
  district: "",
  propertyType: "",
  rooms: "",
  revenue: "",
  managementType: "",
  commission: "",
  airbnbLink: "",
  title: "",
  description: "",
};

export default function GestionAirbnbPage() {
  const { accessToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const opportunityId =
    searchParams.get("id") || searchParams.get("opportunityId");

  const [form, setForm] = useState(initialForm);
  const [isLoadingOpportunity, setIsLoadingOpportunity] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isEditMode = Boolean(opportunityId);

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
          revenue: opportunity.immobilier.revenue ?? "",
          managementType: opportunity.immobilier.managementType ?? "",
          commission: opportunity.immobilier.commission ?? "",
          airbnbLink: opportunity.immobilier.airbnbLink ?? "",
          title: opportunity.title ?? "",
          description: opportunity.description ?? "",
        });
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

  const getManagementDescription = () => {
    if (form.managementType === "complete")
      return "Le partenaire gere entierement le bien : annonce, voyageurs, check-in et optimisation.";

    if (form.managementType === "cohost")
      return "Le partenaire vous aide dans certaines taches (messages, optimisation ou calendrier).";

    if (form.managementType === "discuss")
      return "Les modalites de gestion seront definies avec le partenaire interesse.";

    return "";
  };

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
      axis: "GESTION" as const,
      title: form.title,
      description: form.description,
      city: form.city,
      district: form.district || undefined,
      propertyType: form.propertyType,
      rooms: form.rooms || undefined,
      revenue: form.revenue || undefined,
      managementType: form.managementType || undefined,
      commission:
        form.managementType && form.managementType !== "discuss"
          ? form.commission || undefined
          : undefined,
      airbnbLink: form.airbnbLink || undefined,
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
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#e0f2fe_0%,#eff6ff_36%,#eef2ff_100%)] px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-12">
          <div className="space-y-6 md:col-span-8">
            <section className="overflow-hidden rounded-[32px] border border-white/80 bg-[linear-gradient(135deg,#082f49_0%,#0f172a_55%,#111827_100%)] p-8 text-white shadow-[0_28px_80px_-40px_rgba(15,23,42,0.6)]">
              <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
                <div className="space-y-4">
                  <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
                    Immobilier
                  </span>
                  <div className="space-y-3">
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                      {isEditMode ? "Modifier Gestion Airbnb" : "Gestion Airbnb"}
                    </h1>
                    <p className="max-w-xl text-sm leading-6 text-slate-300">
                      Une page plus premium pour presenter la gestion locative
                      courte duree sans toucher a vos attributs de formulaire.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-sky-200" />
                    <span>Informations du bien immediatement lisibles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-sky-200" />
                    <span>Bloc gestion Airbnb mieux hierarchise</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link2 className="h-5 w-5 text-sky-200" />
                    <span>Lien Airbnb et commission mieux integres</span>
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

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                    Bien
                  </p>
                  <h2 className="text-xl font-semibold text-slate-950">
                    Informations du bien
                  </h2>
                  <p className="text-sm leading-6 text-slate-500">
                    Les champs et options restent identiques.
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

                  <input
                    type="text"
                    name="district"
                    value={form.district}
                    placeholder="Quartier (optionnel)"
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
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                    Gestion
                  </p>
                  <h2 className="text-xl font-semibold text-slate-950">
                    Gestion Airbnb
                  </h2>
                  <p className="text-sm leading-6 text-slate-500">
                    Le guidage visuel met en avant le type de gestion choisi.
                  </p>
                </div>

                <div className="space-y-4">
                  <select
                    name="revenue"
                    value={form.revenue}
                    onChange={handleChange}
                    className={fieldClassName}
                  >
                    <option value="">Revenu mensuel estime</option>
                    <option>Je ne sais pas</option>
                    <option>Moins de 10 000 DH</option>
                    <option>10 000 - 20 000 DH</option>
                    <option>20 000 - 40 000 DH</option>
                    <option>40 000+ DH</option>
                  </select>

                  <select
                    name="managementType"
                    value={form.managementType}
                    onChange={handleChange}
                    className={fieldClassName}
                  >
                    <option value="">Type de gestion</option>
                    <option value="complete">Gestion complete</option>
                    <option value="cohost">Co-host</option>
                    <option value="discuss">A discuter</option>
                  </select>

                  {form.managementType && (
                    <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-4 text-sm leading-6 text-sky-900">
                      {getManagementDescription()}
                    </div>
                  )}

                  {form.managementType !== "discuss" && form.managementType && (
                    <select
                      name="commission"
                      value={form.commission}
                      onChange={handleChange}
                      className={fieldClassName}
                    >
                      <option value="">Commission</option>
                      <option>10%</option>
                      <option>15%</option>
                      <option>20%</option>
                      <option>25%</option>
                      <option>30%</option>
                    </select>
                  )}

                  <div className="space-y-2">
                    <input
                      type="text"
                      name="airbnbLink"
                      value={form.airbnbLink}
                      placeholder="Lien Airbnb (optionnel)"
                      onChange={handleChange}
                      className={fieldClassName}
                    />
                    <p className="text-xs leading-5 text-slate-400">
                      Ajoutez le lien si votre bien est deja publie sur Airbnb.
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
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
                <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 to-cyan-50 px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                    Apercu
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950">
                    Gestion Airbnb
                  </h3>
                </div>

                <div className="space-y-3 px-6 py-6 text-sm text-slate-700">
                  {form.city && <p>Ville : {form.city}</p>}
                  {form.district && <p>Quartier : {form.district}</p>}
                  {form.propertyType && <p>Type : {form.propertyType}</p>}
                  {form.rooms && <p>Chambres : {form.rooms}</p>}
                  {form.revenue && <p>Revenu estime : {form.revenue}</p>}
                  {form.managementType && (
                    <p>
                      Gestion :
                      {form.managementType === "complete" && " Gestion complete"}
                      {form.managementType === "cohost" && " Co-host"}
                      {form.managementType === "discuss" && " A discuter"}
                    </p>
                  )}
                  {form.managementType !== "discuss" && form.commission && (
                    <p>Commission : {form.commission}</p>
                  )}
                  {form.airbnbLink && (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Lien Airbnb
                      </p>
                      <p className="mt-2 break-all text-slate-700">
                        {form.airbnbLink}
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
