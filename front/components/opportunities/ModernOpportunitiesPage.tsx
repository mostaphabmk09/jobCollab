"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Users,
  TrendingUp,
  Building2,
  MapPin,
  Clock,
  Bookmark,
  ChevronDown,
  X,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
const LIGHT_COLORS = {
  pageBg: "#f2f4ff",
  cardBg: "#ffffff",
  cardBgSolid: "#ffffff",
  cardBgAlt: "#f8f9ff",
  border: "rgba(99,102,241,0.13)",
  borderHover: "rgba(99,102,241,0.28)",
  text: "#0f172a",
  textMuted: "#4b5563",
  textSubtle: "#6b7280",
  tagBg: "rgba(99,102,241,0.07)",
  tagBorder: "rgba(99,102,241,0.14)",
  tagText: "#6366F1",
  badgeBg: "rgba(99,102,241,0.06)",
  badgeText: "#6366F1",
  inputBg: "#ffffff",
  inputBorder: "rgba(0,0,0,0.13)",
  hoverBg: "#f5f6ff",
  sectionAlt: "#eef0ff",
  divider: "rgba(0,0,0,0.07)",
  shadow: "0 8px 32px rgba(99,102,241,0.13)",
  shadowSm: "0 2px 10px rgba(0,0,0,0.07)",
} as const;

type AxisType = "all" | "collaboration" | "financement" | "immobilier";

const ALL_OPPORTUNITIES = [
  {
    id: 1,
    axis: "collaboration" as AxisType,
    subtype: "Co-founder",
    title: "Startup FinTech â€“ Recherche CTO",
    desc: "Projet en phase de lancement, MVP prêt. Recherche un CTO passionné pour s'associer à  15% du capital.",
    tags: ["React", "Node.js", "PostgreSQL", "Fintech"],
    meta: "15% Equity",
    location: "Paris",
    time: "Il y a 2h",
    author: "Thomas D.",
    initials: "TD",
    avatarBg: "linear-gradient(135deg, #3B82F6, #6366F1)",
    typeColor: "#60A5FA",
    typeBg: "rgba(59,130,246,0.12)",
    hot: true,
  },
  {
    id: 2,
    axis: "financement" as AxisType,
    subtype: "Equity",
    title: "App SaaS B2B â€“ Levée Seed",
    desc: "SaaS de gestion RH ciblant les PME. Déjà  12 clients pilotes. Recherche â‚¬50K pour accélérer.",
    tags: ["SaaS", "B2B", "RH", "Seed"],
    meta: "â‚¬50,000",
    location: "Lyon",
    time: "Il y a 5h",
    author: "Sophie M.",
    initials: "SM",
    avatarBg: "linear-gradient(135deg, #10B981, #059669)",
    typeColor: "#34D399",
    typeBg: "rgba(16,185,129,0.12)",
    hot: false,
  },
  {
    id: 3,
    axis: "immobilier" as AxisType,
    subtype: "Achat en commun",
    title: "Appartement Paris 11à¨me â€“ Co-investissement",
    desc: "Appartement T3, 65mÂ², idéal pour gestion Airbnb. Recherche co-investisseur 50/50.",
    tags: ["Paris", "Airbnb", "T3", "65mÂ²"],
    meta: "7% /an est.",
    location: "Paris 11e",
    time: "Il y a 1j",
    author: "Marc L.",
    initials: "ML",
    avatarBg: "linear-gradient(135deg, #F59E0B, #D97706)",
    typeColor: "#FBBF24",
    typeBg: "rgba(245,158,11,0.12)",
    hot: true,
  },
  {
    id: 4,
    axis: "collaboration" as AxisType,
    subtype: "Associé",
    title: "Marketplace e-commerce mode durable",
    desc: "Marketplace pour la mode durable déjà  en beta. Besoin d'un associé business development avec réseau retail.",
    tags: ["E-commerce", "Mode", "B2C", "Growth"],
    meta: "10-20% Equity",
    location: "Bordeaux",
    time: "Il y a 8h",
    author: "Léa R.",
    initials: "LR",
    avatarBg: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    typeColor: "#60A5FA",
    typeBg: "rgba(59,130,246,0.12)",
    hot: false,
  },
  {
    id: 5,
    axis: "financement" as AxisType,
    subtype: "Revenue Share",
    title: "Application mobile bien-être â€“ â‚¬30K",
    desc: "App wellness avec 5K utilisateurs actifs. Cherche financement pour campagne marketing. Revenue share 8%/an.",
    tags: ["Mobile", "Wellness", "B2C", "Revenue Share"],
    meta: "â‚¬30,000",
    location: "Marseille",
    time: "Il y a 12h",
    author: "Karim B.",
    initials: "KB",
    avatarBg: "linear-gradient(135deg, #10B981, #3B82F6)",
    typeColor: "#34D399",
    typeBg: "rgba(16,185,129,0.12)",
    hot: false,
  },
  {
    id: 6,
    axis: "immobilier" as AxisType,
    subtype: "Gestion Airbnb",
    title: "Villa Cà´te d'Azur â€“ Partenaire Airbnb",
    desc: "Villa 4 chambres, Antibes. Propriétaire cherche gestionnaire Airbnb professionnel. 20% commission sur revenus.",
    tags: ["PACA", "Villa", "Airbnb", "Saisonnier"],
    meta: "20% commission",
    location: "Antibes",
    time: "Il y a 2j",
    author: "Claire V.",
    initials: "CV",
    avatarBg: "linear-gradient(135deg, #F59E0B, #EF4444)",
    typeColor: "#FBBF24",
    typeBg: "rgba(245,158,11,0.12)",
    hot: true,
  },
  {
    id: 7,
    axis: "collaboration" as AxisType,
    subtype: "Freelance",
    title: "Design UI/UX â€“ Application santé",
    desc: "Mission 3 mois pour refonte complà¨te de notre app santé (iOS/Android). Budget fixe + bonus au lancement.",
    tags: ["Figma", "UI/UX", "Mobile", "Santé"],
    meta: "â‚¬8,000 net",
    location: "Remote",
    time: "Il y a 3j",
    author: "Antoine P.",
    initials: "AP",
    avatarBg: "linear-gradient(135deg, #3B82F6, #06B6D4)",
    typeColor: "#60A5FA",
    typeBg: "rgba(59,130,246,0.12)",
    hot: false,
  },
  {
    id: 8,
    axis: "financement" as AxisType,
    subtype: "Loan",
    title: "Boulangerie artisanale â€“ Expansion",
    desc: "Boulangerie 3 étoiles cherche â‚¬20K pour ouvrir un 2à¨me point de vente. Remboursement sur 24 mois.",
    tags: ["Artisanat", "Alimentation", "PME", "Prêt"],
    meta: "â‚¬20,000",
    location: "Nantes",
    time: "Il y a 4j",
    author: "Marie F.",
    initials: "MF",
    avatarBg: "linear-gradient(135deg, #F59E0B, #10B981)",
    typeColor: "#34D399",
    typeBg: "rgba(16,185,129,0.12)",
    hot: false,
  },
  {
    id: 9,
    axis: "immobilier" as AxisType,
    subtype: "Investissement",
    title: "Immeuble de rapport Lille â€“ 6 lots",
    desc: "Immeuble entier à  rénover, 6 appartements. Rendement cible 9% aprà¨s travaux. Cherche co-investisseur 40%.",
    tags: ["Lille", "Immeuble", "Rénovation", "9%"],
    meta: "9% /an cible",
    location: "Lille",
    time: "Il y a 5j",
    author: "Julien T.",
    initials: "JT",
    avatarBg: "linear-gradient(135deg, #8B5CF6, #F59E0B)",
    typeColor: "#FBBF24",
    typeBg: "rgba(245,158,11,0.12)",
    hot: false,
  },
];

const AXES_TABS = [
  { id: "all", label: "Tout", icon: Sparkles, color: "#818CF8" },
  {
    id: "collaboration",
    label: "Collaboration",
    icon: Users,
    color: "#3B82F6",
  },
  {
    id: "financement",
    label: "Financement",
    icon: TrendingUp,
    color: "#10B981",
  },
  { id: "immobilier", label: "Immobilier", icon: Building2, color: "#F59E0B" },
];

const AXIS_COLORS: Record<string, { color: string; label: string }> = {
  collaboration: { color: "#3B82F6", label: "Collaboration" },
  financement: { color: "#10B981", label: "Financement" },
  immobilier: { color: "#F59E0B", label: "Immobilier" },
};

const SORT_OPTIONS = [
  "Plus récents",
  "Plus populaires",
  "Montant croissant",
  "Montant décroissant",
];

export function OpportunitiesPage() {
  const [activeAxis, setActiveAxis] = useState<AxisType>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Plus récents");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const c = LIGHT_COLORS;

  const filtered = ALL_OPPORTUNITIES.filter((opp) => {
    const matchAxis = activeAxis === "all" || opp.axis === activeAxis;
    const matchSearch =
      search === "" ||
      opp.title.toLowerCase().includes(search.toLowerCase()) ||
      opp.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchAxis && matchSearch;
  });

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div
      style={{
        backgroundColor: c.pageBg,
        minHeight: "100vh",
        paddingTop: "80px",
        transition: "background-color 0.3s",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: `1px solid ${c.divider}`,
          padding: "48px 0 32px",
          backgroundColor: c.sectionAlt,
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "200px",
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ position: "relative" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p
              style={{
                fontSize: "0.78rem",
                fontWeight: 500,
                color: c.textSubtle,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 10px 0",
              }}
            >
              Explorer la plateforme
            </p>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: c.text,
                letterSpacing: "-0.02em",
                margin: "0 0 12px 0",
                lineHeight: 1.2,
              }}
            >
              Toutes les{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818CF8, #C084FC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Opportunités
              </span>
            </h1>
            <p
              style={{
                fontSize: "0.95rem",
                color: c.textMuted,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {ALL_OPPORTUNITIES.length} opportunités disponibles Â· Filtrez par
              axe, secteur ou montant
            </p>
          </motion.div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ padding: "32px 16px 64px" }}
      >
        {/* Search + sort */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center"
          style={{ gap: "12px", marginBottom: "24px" }}
        >
          <div style={{ flex: 1, position: "relative" }}>
            <Search
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "16px",
                color: c.textSubtle,
              }}
            />
            <input
              type="text"
              placeholder="Rechercher une opportunité, un tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px 12px 42px",
                backgroundColor: c.inputBg,
                border: `1px solid ${c.inputBorder}`,
                borderRadius: "10px",
                color: c.text,
                fontSize: "0.875rem",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = c.inputBorder)
              }
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: c.textSubtle,
                  padding: "2px",
                }}
              >
                <X style={{ width: "14px", height: "14px" }} />
              </button>
            )}
          </div>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 16px",
                backgroundColor: c.cardBg,
                border: `1px solid ${c.border}`,
                borderRadius: "10px",
                color: c.textMuted,
                fontSize: "0.875rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                boxShadow: c.shadowSm,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = c.hoverBg)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = c.cardBg)
              }
            >
              <SlidersHorizontal style={{ width: "15px", height: "15px" }} />
              {sortBy}
              <ChevronDown
                style={{ width: "13px", height: "13px", opacity: 0.6 }}
              />
            </button>
            {showSortMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  right: 0,
                  backgroundColor: c.cardBgSolid,
                  border: `1px solid ${c.border}`,
                  borderRadius: "10px",
                  overflow: "hidden",
                  zIndex: 50,
                  minWidth: "200px",
                  boxShadow: c.shadow,
                }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSortBy(opt);
                      setShowSortMenu(false);
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 16px",
                      fontSize: "0.875rem",
                      color: sortBy === opt ? "#818CF8" : c.textMuted,
                      backgroundColor:
                        sortBy === opt ? "rgba(99,102,241,0.1)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (sortBy !== opt)
                        e.currentTarget.style.backgroundColor = c.hoverBg;
                    }}
                    onMouseLeave={(e) => {
                      if (sortBy !== opt)
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Axes tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap"
          style={{ gap: "8px", marginBottom: "28px" }}
        >
          {AXES_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAxis === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAxis(tab.id as AxisType)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: isActive
                    ? `1px solid ${tab.color}44`
                    : `1px solid ${c.border}`,
                  backgroundColor: isActive ? `${tab.color}14` : c.cardBg,
                  color: isActive ? tab.color : c.textMuted,
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: c.shadowSm,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = `${tab.color}33`;
                    e.currentTarget.style.backgroundColor = `${tab.color}0D`;
                    e.currentTarget.style.color = tab.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = c.border;
                    e.currentTarget.style.backgroundColor = c.cardBg;
                    e.currentTarget.style.color = c.textMuted;
                  }
                }}
              >
                <Icon style={{ width: "15px", height: "15px" }} />
                {tab.label}
                <span
                  style={{
                    fontSize: "0.7rem",
                    backgroundColor: isActive ? `${tab.color}22` : c.badgeBg,
                    color: isActive ? tab.color : c.badgeText,
                    padding: "1px 7px",
                    borderRadius: "100px",
                    fontWeight: 600,
                  }}
                >
                  {tab.id === "all"
                    ? ALL_OPPORTUNITIES.length
                    : ALL_OPPORTUNITIES.filter((o) => o.axis === tab.id).length}
                </span>
              </button>
            );
          })}
        </motion.div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "0.8rem", color: c.textSubtle, margin: 0 }}>
            {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
            {search && (
              <span>
                {" "}
                pour "<span style={{ color: c.textMuted }}>{search}</span>"
              </span>
            )}
          </p>
        </div>

        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "18px" }}
          >
            {filtered.map((opp, i) => (
              <motion.div
                key={opp.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <OpportunityCard
                  opp={opp}
                  saved={savedIds.includes(opp.id)}
                  onSave={() => toggleSave(opp.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              padding: "80px 24px",
              borderRadius: "16px",
              border: `1px solid ${c.border}`,
              backgroundColor: c.cardBgAlt,
            }}
          >
            <Search
              style={{
                width: "40px",
                height: "40px",
                color: c.textSubtle,
                margin: "0 auto 16px",
              }}
            />
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 500,
                color: c.textMuted,
                margin: "0 0 6px 0",
              }}
            >
              Aucune opportunité trouvée
            </p>
            <p style={{ fontSize: "0.85rem", color: c.textSubtle, margin: 0 }}>
              Essayez un autre terme ou changez de filtre
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function OpportunityCard({
  opp,
  saved,
  onSave,
}: {
  opp: (typeof ALL_OPPORTUNITIES)[0];
  saved: boolean;
  onSave: () => void;
}) {
  const c = LIGHT_COLORS;
  const axisInfo = AXIS_COLORS[opp.axis];
  return (
    <div
      style={{
        padding: "22px",
        borderRadius: "16px",
        backgroundColor: c.cardBg,
        border: `1px solid ${c.border}`,
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        cursor: "pointer",
        transition: "all 0.25s",
        height: "100%",
        position: "relative",
        boxShadow: c.shadowSm,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = c.borderHover;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = c.shadow;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = c.border;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = c.shadowSm;
      }}
    >
      {opp.hot && (
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "3px 8px",
            borderRadius: "100px",
            backgroundColor: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.25)",
          }}
        >
          <Star style={{ width: "10px", height: "10px", color: "#F87171" }} />
          <span
            style={{ fontSize: "0.65rem", fontWeight: 600, color: "#F87171" }}
          >
            HOT
          </span>
        </div>
      )}
      <div
        className="flex items-center justify-between"
        style={{ paddingRight: opp.hot ? "60px" : "0" }}
      >
        <div className="flex items-center" style={{ gap: "8px" }}>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              color: opp.typeColor,
              backgroundColor: opp.typeBg,
              padding: "3px 9px",
              borderRadius: "5px",
            }}
          >
            {opp.subtype}
          </span>
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 600,
              color: axisInfo.color,
              opacity: 0.7,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {axisInfo.label}
          </span>
        </div>
      </div>
      <div>
        <h3
          style={{
            fontSize: "0.97rem",
            fontWeight: 600,
            color: c.text,
            margin: "0 0 7px 0",
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
          }}
        >
          {opp.title}
        </h3>
        <p
          style={{
            fontSize: "0.82rem",
            color: c.textMuted,
            margin: 0,
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {opp.desc}
        </p>
      </div>
      <div className="flex flex-wrap" style={{ gap: "5px" }}>
        {opp.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "0.68rem",
              fontWeight: 500,
              color: c.tagText,
              backgroundColor: c.tagBg,
              border: `1px solid ${c.tagBorder}`,
              padding: "2px 7px",
              borderRadius: "4px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center" style={{ gap: "12px" }}>
        <div className="flex items-center" style={{ gap: "4px" }}>
          <MapPin
            style={{ width: "11px", height: "11px", color: c.textSubtle }}
          />
          <span style={{ fontSize: "0.72rem", color: c.textSubtle }}>
            {opp.location}
          </span>
        </div>
        <div className="flex items-center" style={{ gap: "4px" }}>
          <Clock
            style={{ width: "11px", height: "11px", color: c.textSubtle }}
          />
          <span style={{ fontSize: "0.72rem", color: c.textSubtle }}>
            {opp.time}
          </span>
        </div>
      </div>
      <div
        className="flex items-center justify-between"
        style={{
          marginTop: "auto",
          paddingTop: "12px",
          borderTop: `1px solid ${c.divider}`,
        }}
      >
        <div className="flex items-center" style={{ gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: opp.avatarBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{ fontSize: "0.6rem", fontWeight: 700, color: "white" }}
            >
              {opp.initials}
            </span>
          </div>
          <span
            style={{ fontSize: "0.78rem", fontWeight: 500, color: c.textMuted }}
          >
            {opp.author}
          </span>
        </div>
        <div className="flex items-center" style={{ gap: "8px" }}>
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: opp.typeColor,
            }}
          >
            {opp.meta}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSave();
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: saved ? "#818CF8" : c.textSubtle,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!saved) e.currentTarget.style.color = c.textMuted;
            }}
            onMouseLeave={(e) => {
              if (!saved) e.currentTarget.style.color = c.textSubtle;
            }}
          >
            <Bookmark
              style={{
                width: "15px",
                height: "15px",
                fill: saved ? "#818CF8" : "none",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
