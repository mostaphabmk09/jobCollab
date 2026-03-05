"use client";

import Link from "next/link";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Building2,
  Sparkles,
  Star,
  Handshake,
  Search,
  Rocket,
  Globe,
  ChevronRight,
  Home,
  DollarSign,
  Briefcase,
  UserPlus,
  MapPin,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
const LIGHT_COLORS = {
  pageBg: "#f2f4ff",
  navBg: "rgba(255,255,255,0.90)",
  cardBg: "#ffffff",
  cardBgSolid: "#ffffff",
  cardBgAlt: "#f8f9ff",
  border: "rgba(99,102,241,0.13)",
  borderHover: "rgba(99,102,241,0.28)",
  borderAccent: "rgba(99,102,241,0.3)",
  text: "#0f172a",
  textMuted: "#4b5563",
  textSubtle: "#6b7280",
  textFaint: "#9ca3af",
  tagBg: "rgba(99,102,241,0.07)",
  tagBorder: "rgba(99,102,241,0.14)",
  tagText: "#6366F1",
  badgeBg: "rgba(99,102,241,0.06)",
  badgeBorder: "rgba(99,102,241,0.12)",
  badgeText: "#6366F1",
  inputBg: "#ffffff",
  inputBorder: "rgba(0,0,0,0.13)",
  hoverBg: "#f5f6ff",
  hoverBgStrong: "rgba(99,102,241,0.07)",
  sectionAlt: "#eef0ff",
  divider: "rgba(0,0,0,0.07)",
  overlayBg: "rgba(0,0,0,0.5)",
  shadow: "0 8px 32px rgba(99,102,241,0.13)",
  shadowSm: "0 2px 10px rgba(0,0,0,0.07)",
  heroGrid: "rgba(99,102,241,0.05)",
  heroGlow: "rgba(99,102,241,0.13)",
  heroGlow2: "rgba(59,130,246,0.08)",
  heroGlow3: "rgba(16,185,129,0.06)",
  sidebarBg: "#f8f9ff",
  statsBg: "#eef0ff",
} as const;

/* â”€â”€ Images â”€â”€ */
const IMG_COWORKING =
  "https://images.unsplash.com/photo-1758691737138-7b9b1884b1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3dvcmtpbmclMjBzcGFjZSUyMHBlb3BsZSUyMHdvcmtpbmclMjB0b2dldGhlcnxlbnwxfHx8fDE3NzI0Njk3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_REALESTATE =
  "https://images.unsplash.com/photo-1758612120966-b20c01160c7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwYXJjaGl0ZWN0dXJlJTIwYWVyaWFsJTIwZHJvbmV8ZW58MXx8fHwxNzcyNDY5NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_INVEST =
  "https://images.unsplash.com/photo-1591453214154-c95db71dbd83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZW50dXJlJTIwY2FwaXRhbCUyMGludmVzdG1lbnQlMjBtZWV0aW5nJTIwaGFuZHNoYWtlfGVufDF8fHx8MTc3MjQ2OTcxMnww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_STARTUP =
  "https://images.unsplash.com/photo-1759884247160-27b8465544b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbSUyMGJyYWluc3Rvcm1pbmclMjB3aGl0ZWJvYXJkJTIwb2ZmaWNlfGVufDF8fHx8MTc3MjQ2OTcxMnww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_APARTMENT =
  "https://images.unsplash.com/photo-1759722668087-efcc63c91ed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGRlc2lnbiUyMGJyaWdodCUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcyNDY5NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080";

/* â”€â”€ Data â”€â”€ */
const STATS = [
  { value: "1 200+", label: "Membres actifs", icon: Users },
  { value: "350+", label: "Projets lancés", icon: Rocket },
  { value: "200M+", label: "Financements", icon: TrendingUp },
  { value: "180+", label: "Biens immobiliers", icon: Building2 },
];

const AXES = [
  {
    id: "collaboration",
    icon: Users,
    label: "Collaboration",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)",
    glow: "rgba(59,130,246,0.3)",
    border: "rgba(59,130,246,0.22)",
    description:
      "Trouvez les talents ou partenaires idéaux pour faire avancer votre projet.",
    items: [
      {
        icon: UserPlus,
        label: "Associé",
        desc: "Rejoindre un projet existant",
      },
      { icon: Rocket, label: "Co-founder", desc: "Construire dà¨s le départ" },
      { icon: Briefcase, label: "Freelance", desc: "Mission spécifique" },
      { icon: Users, label: "Salarié", desc: "Contrat fixe" },
    ],
    image: IMG_STARTUP,
  },
  {
    id: "financement",
    icon: TrendingUp,
    label: "Financement",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
    glow: "rgba(16,185,129,0.3)",
    border: "rgba(16,185,129,0.22)",
    description:
      "Levez des fonds ou investissez dans des projets à  fort potentiel.",
    items: [
      { icon: TrendingUp, label: "Equity", desc: "Part du projet" },
      { icon: DollarSign, label: "Loan", desc: "Prêt remboursable" },
      { icon: Star, label: "Revenue share", desc: "Part des bénéfices" },
      { icon: Sparkles, label: "à discuter", desc: "Modà¨le personnalisé" },
    ],
    image: IMG_INVEST,
  },
  {
    id: "immobilier",
    icon: Building2,
    label: "Immobilier",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
    glow: "rgba(245,158,11,0.3)",
    border: "rgba(245,158,11,0.22)",
    description: "Investissez, gérez ou co-achetez des biens immobiliers.",
    items: [
      { icon: Home, label: "Achat en commun", desc: "Propriété partagée" },
      { icon: Globe, label: "Gestion Airbnb", desc: "Location saisonnià¨re" },
      { icon: Building2, label: "Sous-location", desc: "Rendement locatif" },
      {
        icon: TrendingUp,
        label: "Investissement",
        desc: "Patrimoine immobilier",
      },
    ],
    image: IMG_APARTMENT,
  },
];

const STEPS = [
  {
    num: "01",
    icon: UserPlus,
    title: "Créez votre profil",
    desc: "Indiquez votre type de profil (Entrepreneur, Investisseur, Agenceâ€¦) et vos centres d'intérêt.",
    color: "#6366F1",
  },
  {
    num: "02",
    icon: Search,
    title: "Explorez les opportunités",
    desc: "Parcourez les annonces filtrées par axe et trouvez les meilleures correspondances pour votre projet.",
    color: "#3B82F6",
  },
  {
    num: "03",
    icon: Handshake,
    title: "Connectez & collaborez",
    desc: "Entrez en contact, négociez et lancez vos projets grà¢ce à  notre systà¨me de messagerie intégré.",
    color: "#10B981",
  },
];

const FEATURED = [
  {
    id: 1,
    typeBg: "rgba(59,130,246,0.12)",
    typeColor: "#60A5FA",
    subtype: "Co-founder",
    title: "Startup FinTech â€“ Recherche CTO",
    desc: "MVP prêt. Recherche un CTO passionné pour s'associer à  15% du capital.",
    tags: ["React", "Node.js", "Fintech"],
    meta: "15% Equity",
    metaColor: "#60A5FA",
    author: "Thomas D.",
    initials: "TD",
    avatarBg: "linear-gradient(135deg, #3B82F6, #6366F1)",
    location: "Paris",
    time: "Il y a 2h",
    image: IMG_STARTUP,
  },
  {
    id: 2,
    typeBg: "rgba(16,185,129,0.12)",
    typeColor: "#34D399",
    subtype: "Equity",
    title: "App SaaS B2B â€“ Levée de fonds Seed",
    desc: "SaaS RH ciblant les PME. 12 clients pilotes. Recherche â‚¬50K pour accélérer.",
    tags: ["SaaS", "B2B", "RH"],
    meta: "â‚¬50,000",
    metaColor: "#34D399",
    author: "Sophie M.",
    initials: "SM",
    avatarBg: "linear-gradient(135deg, #10B981, #059669)",
    location: "Lyon",
    time: "Il y a 5h",
    image: IMG_INVEST,
  },
  {
    id: 3,
    typeBg: "rgba(245,158,11,0.12)",
    typeColor: "#FBBF24",
    subtype: "Achat en commun",
    title: "Appartement Paris 11à¨me â€“ Co-investissement",
    desc: "T3, 65mÂ², idéal Airbnb. Recherche co-investisseur 50/50.",
    tags: ["Paris", "Airbnb", "T3"],
    meta: "7% /an est.",
    metaColor: "#FBBF24",
    author: "Marc L.",
    initials: "ML",
    avatarBg: "linear-gradient(135deg, #F59E0B, #D97706)",
    location: "Paris 11e",
    time: "Il y a 1j",
    image: IMG_APARTMENT,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.11 } },
};

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export function LandingPage() {
  const c = LIGHT_COLORS;
  return (
    <div
      style={{ backgroundColor: c.pageBg, transition: "background-color 0.3s" }}
    >
      <HeroSection />
      <StatsSection />
      <AxesSection />
      <HowItWorksSection />
      <FeaturedSection />
      <CTASection />
    </div>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HeroSection() {
  const isDark = false;
  const c = LIGHT_COLORS;

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${c.heroGrid} 1px, transparent 1px), linear-gradient(90deg, ${c.heroGrid} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "600px",
          background: `radial-gradient(ellipse, ${c.heroGlow} 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          background: `radial-gradient(ellipse, ${c.heroGlow2} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "-5%",
          width: "400px",
          height: "400px",
          background: `radial-gradient(ellipse, ${c.heroGlow3} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* â”€â”€ Left: Text â”€â”€ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col"
            style={{ gap: "28px" }}
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <div
                className="inline-flex items-center gap-2"
                style={{
                  padding: "6px 14px",
                  borderRadius: "100px",
                  border: "1px solid rgba(99,102,241,0.35)",
                  backgroundColor: "rgba(99,102,241,0.1)",
                  width: "fit-content",
                }}
              >
                <Sparkles
                  style={{ width: "13px", height: "13px", color: "#818CF8" }}
                />
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    color: "#A5B4FC",
                    letterSpacing: "0.02em",
                  }}
                >
                  Plateforme de connexion économique
                </span>
              </div>
            </motion.div>

            {/* Headline â€” NEW TEXT */}
            <motion.div variants={fadeUp}>
              <h1
                style={{
                  fontSize: "clamp(2.6rem, 5vw, 4rem)",
                  fontWeight: 800,
                  lineHeight: 1.08,
                  color: c.text,
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                Trouvez le bon partenaire{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #818CF8 0%, #C084FC 50%, #60A5FA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
                >
                  pour chaque projet.
                </span>
              </h1>
            </motion.div>

            {/* Subtitle â€” NEW TEXT */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.72,
                color: c.textMuted,
                margin: 0,
                maxWidth: "500px",
              }}
            >
              Collaboration, financement, immobilier et colocation. Un
              ecosysteme qui connecte les{" "}
              <span style={{ color: c.text, fontWeight: 500 }}>talents</span>,
              le <span style={{ color: c.text, fontWeight: 500 }}>capital</span>{" "}
              et les{" "}
              <span style={{ color: c.text, fontWeight: 500 }}>ambitions</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center"
              style={{ gap: "12px" }}
            >
              <Link href="/opportunities" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 28px",
                    background:
                      "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "0 0 30px rgba(99,102,241,0.35)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 0 42px rgba(99,102,241,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(99,102,241,0.35)";
                  }}
                >
                  Découvrir les opportunités
                  <ArrowRight style={{ width: "16px", height: "16px" }} />
                </button>
              </Link>
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 24px",
                  background: c.cardBg,
                  color: c.textMuted,
                  border: `1px solid ${c.border}`,
                  borderRadius: "10px",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: c.shadowSm,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = c.text;
                  e.currentTarget.style.borderColor = "#6366F1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = c.textMuted;
                  e.currentTarget.style.borderColor = c.border;
                }}
              >
                En savoir plus
                <ChevronRight style={{ width: "15px", height: "15px" }} />
              </button>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              variants={fadeUp}
              className="flex items-center"
              style={{ gap: "14px" }}
            >
              <div className="flex">
                {["#6366F1", "#3B82F6", "#10B981", "#F59E0B", "#EC4899"].map(
                  (color, i) => (
                    <div
                      key={i}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${color}, ${color}99)`,
                        border: `2px solid ${c.pageBg}`,
                        marginLeft: i === 0 ? 0 : "-9px",
                        boxShadow: `0 0 10px ${color}44`,
                      }}
                    />
                  ),
                )}
              </div>
              <p
                style={{ fontSize: "0.82rem", color: c.textSubtle, margin: 0 }}
              >
                <span style={{ color: c.text, fontWeight: 600 }}>
                  1 200+ membres
                </span>{" "}
                nous font confiance
              </p>
            </motion.div>

            {/* Axis badges */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap"
              style={{ gap: "8px" }}
            >
              {[
                {
                  label: "Collaboration",
                  color: "#3B82F6",
                  bg: "rgba(59,130,246,0.1)",
                  border: "rgba(59,130,246,0.25)",
                },
                {
                  label: "Financement",
                  color: "#10B981",
                  bg: "rgba(16,185,129,0.1)",
                  border: "rgba(16,185,129,0.25)",
                },
                {
                  label: "Immobilier",
                  color: "#F59E0B",
                  bg: "rgba(245,158,11,0.1)",
                  border: "rgba(245,158,11,0.25)",
                },
                {
                  label: "Colocation",
                  color: "#8B5CF6",
                  bg: "rgba(139,92,246,0.1)",
                  border: "rgba(139,92,246,0.25)",
                },
              ].map((badge) => (
                <span
                  key={badge.label}
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: badge.color,
                    backgroundColor: badge.bg,
                    border: `1px solid ${badge.border}`,
                    padding: "4px 11px",
                    borderRadius: "100px",
                  }}
                >
                  {badge.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* â”€â”€ Right: Image mosaic â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:grid"
            style={{
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "auto auto",
              gap: "14px",
              position: "relative",
            }}
          >
            {/* Main large image â€” spans 2 rows on left */}
            <div
              style={{
                gridColumn: "1",
                gridRow: "1 / 3",
                borderRadius: "20px",
                overflow: "hidden",
                border: `1px solid ${c.border}`,
                boxShadow: isDark
                  ? "0 40px 80px rgba(0,0,0,0.55), 0 0 60px rgba(99,102,241,0.1)"
                  : "0 20px 60px rgba(99,102,241,0.18)",
                position: "relative",
                height: "440px",
              }}
            >
              <ImageWithFallback
                src={IMG_COWORKING}
                alt="Collaboration"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isDark
                    ? "linear-gradient(180deg, transparent 50%, rgba(5,9,19,0.6) 100%)"
                    : "linear-gradient(180deg, transparent 60%, rgba(99,102,241,0.15) 100%)",
                }}
              />
              {/* Label overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "14px",
                  left: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 12px",
                  borderRadius: "10px",
                  backgroundColor: isDark
                    ? "rgba(5,9,19,0.75)"
                    : "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${c.border}`,
                }}
              >
                <Users
                  style={{ width: "14px", height: "14px", color: "#3B82F6" }}
                />
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: c.text,
                  }}
                >
                  Collaboration
                </span>
              </div>
            </div>

            {/* Top-right image */}
            <div
              style={{
                gridColumn: "2",
                gridRow: "1",
                borderRadius: "16px",
                overflow: "hidden",
                border: `1px solid ${c.border}`,
                boxShadow: c.shadowSm,
                position: "relative",
                height: "200px",
              }}
            >
              <ImageWithFallback
                src={IMG_REALESTATE}
                alt="Immobilier"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isDark
                    ? "rgba(5,9,19,0.35)"
                    : "rgba(245,158,11,0.08)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 10px",
                  borderRadius: "8px",
                  backgroundColor: isDark
                    ? "rgba(5,9,19,0.75)"
                    : "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${c.border}`,
                }}
              >
                <Building2
                  style={{ width: "12px", height: "12px", color: "#F59E0B" }}
                />
                <span
                  style={{ fontSize: "0.7rem", fontWeight: 600, color: c.text }}
                >
                  Immobilier
                </span>
              </div>
            </div>

            {/* Bottom-right image */}
            <div
              style={{
                gridColumn: "2",
                gridRow: "2",
                borderRadius: "16px",
                overflow: "hidden",
                border: `1px solid ${c.border}`,
                boxShadow: c.shadowSm,
                position: "relative",
                height: "226px",
              }}
            >
              <ImageWithFallback
                src={IMG_INVEST}
                alt="Financement"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isDark
                    ? "rgba(5,9,19,0.35)"
                    : "rgba(16,185,129,0.08)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 10px",
                  borderRadius: "8px",
                  backgroundColor: isDark
                    ? "rgba(5,9,19,0.75)"
                    : "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)",
                  border: `1px solid ${c.border}`,
                }}
              >
                <TrendingUp
                  style={{ width: "12px", height: "12px", color: "#10B981" }}
                />
                <span
                  style={{ fontSize: "0.7rem", fontWeight: 600, color: c.text }}
                >
                  Financement
                </span>
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                bottom: "-16px",
                left: "-28px",
                backgroundColor: c.cardBgSolid,
                border: `1px solid ${c.border}`,
                borderRadius: "14px",
                padding: "14px 18px",
                backdropFilter: "blur(12px)",
                boxShadow: c.shadow,
                zIndex: 10,
              }}
            >
              <div className="flex items-center" style={{ gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #10B981, #059669)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TrendingUp
                    style={{ width: "18px", height: "18px", color: "white" }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.68rem",
                      color: c.textSubtle,
                      margin: 0,
                    }}
                  >
                    Financement total
                  </p>
                  <p
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 800,
                      color: c.text,
                      margin: 0,
                    }}
                  >
                    2,400+
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating notification */}
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
              style={{
                position: "absolute",
                top: "-14px",
                right: "-14px",
                backgroundColor: c.cardBgSolid,
                border: `1px solid rgba(99,102,241,0.25)`,
                borderRadius: "13px",
                padding: "11px 15px",
                backdropFilter: "blur(12px)",
                boxShadow: c.shadow,
                zIndex: 10,
              }}
            >
              <div className="flex items-center" style={{ gap: "8px" }}>
                <div className="flex">
                  {[IMG_COWORKING, IMG_STARTUP, IMG_INVEST].map((img, index) => (
                    <div
                      key={img}
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: `1.5px solid ${c.cardBgSolid}`,
                        marginLeft: index === 0 ? 0 : "-7px",
                        boxShadow: "0 0 0 1px rgba(99,102,241,0.2)",
                      }}
                    >
                      <ImageWithFallback
                        src={img}
                        alt="Membre"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: c.text,
                  }}
                >
                  +12 nouveaux membres
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.68rem",
                  color: c.textSubtle,
                  margin: "3px 0 0 28px",
                }}
              >
                aujourd&apos;hui
              </p>
            </motion.div>

            {/* Middle floating badge */}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: "-20px",
                transform: "translateY(-50%)",
                backgroundColor: c.cardBgSolid,
                border: `1px solid rgba(245,158,11,0.3)`,
                borderRadius: "10px",
                padding: "8px 12px",
                boxShadow: c.shadowSm,
                zIndex: 10,
              }}
            >
              <div className="flex items-center" style={{ gap: "6px" }}>
                <MapPin
                  style={{ width: "12px", height: "12px", color: "#F59E0B" }}
                />
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: c.text,
                  }}
                >
                  180+ biens
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ STATS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function StatsSection() {
  const c = LIGHT_COLORS;
  return (
    <section
      style={{
        borderTop: `1px solid ${c.divider}`,
        borderBottom: `1px solid ${c.divider}`,
        backgroundColor: c.statsBg,
        padding: "44px 0",
        transition: "all 0.3s",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex flex-col items-center text-center"
              style={{
                padding: "20px 24px",
                borderRight: i < 3 ? `1px solid ${c.divider}` : "none",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(1.9rem, 3vw, 2.5rem)",
                  fontWeight: 800,
                  color: c.text,
                  margin: 0,
                  letterSpacing: "-0.03em",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: c.textSubtle,
                  margin: "5px 0 0 0",
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ AXES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function AxesSection() {
  const isDark = false;
  const c = LIGHT_COLORS;
  return (
    <section
      style={{
        padding: "100px 0",
        backgroundColor: c.pageBg,
        transition: "background-color 0.3s",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="text-center"
          style={{ marginBottom: "64px" }}
        >
          <motion.div variants={fadeUp}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 14px",
                borderRadius: "100px",
                border: `1px solid ${c.border}`,
                backgroundColor: c.badgeBg,
                fontSize: "0.78rem",
                fontWeight: 500,
                color: c.badgeText,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Les 3 axes
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              color: c.text,
              letterSpacing: "-0.02em",
              margin: "0 0 16px 0",
              lineHeight: 1.2,
            }}
          >
            Un ecosysteme complet pour{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818CF8, #C084FC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              vos ambitions
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "1rem",
              color: c.textMuted,
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Trois piliers pour connecter idées, capital et immobilier en un seul
            endroit.
          </motion.p>
        </motion.div>

        <div className="flex flex-col" style={{ gap: "20px" }}>
          {AXES.map((axis, index) => {
            const Icon = axis.icon;
            return (
              <motion.div
                key={axis.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                style={{
                  borderRadius: "20px",
                  border: `1px solid ${axis.border}`,
                  backgroundColor: c.cardBg,
                  overflow: "hidden",
                  boxShadow: c.shadowSm,
                  transition: "box-shadow 0.3s",
                }}
              >
                <div
                  className={`grid ${index % 2 === 1 ? "lg:grid-cols-[1fr_38%]" : "lg:grid-cols-[38%_1fr]"}`}
                >
                  {/* Image */}
                  <div
                    style={{
                      order: index % 2 === 1 ? 2 : 1,
                      position: "relative",
                      minHeight: "260px",
                    }}
                    className="hidden lg:block"
                  >
                    <ImageWithFallback
                      src={axis.image}
                      alt={axis.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(${index % 2 === 1 ? "270deg" : "90deg"}, ${c.cardBg} 0%, ${isDark ? "rgba(13,20,38,0.25)" : "rgba(255,255,255,0.15)"} 50%, transparent 100%)`,
                      }}
                    />
                  </div>
                  {/* Content */}
                  <div
                    style={{
                      order: index % 2 === 1 ? 1 : 2,
                      padding: "36px 40px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "22px",
                    }}
                  >
                    <div className="flex items-center" style={{ gap: "12px" }}>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: axis.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 0 20px ${axis.glow}`,
                        }}
                      >
                        <Icon
                          style={{
                            width: "22px",
                            height: "22px",
                            color: "white",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: axis.color,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {axis.label}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                        fontWeight: 700,
                        color: c.text,
                        margin: 0,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                      }}
                    >
                      {axis.description}
                    </h3>
                    <div className="grid grid-cols-2" style={{ gap: "10px" }}>
                      {axis.items.map((item) => {
                        const ItemIcon = item.icon;
                        const rgb =
                          axis.color === "#3B82F6"
                            ? "59,130,246"
                            : axis.color === "#10B981"
                              ? "16,185,129"
                              : "245,158,11";
                        return (
                          <div
                            key={item.label}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "9px",
                              padding: "11px 12px",
                              borderRadius: "10px",
                              backgroundColor: c.cardBgAlt,
                              border: `1px solid ${c.border}`,
                            }}
                          >
                            <div
                              style={{
                                width: "26px",
                                height: "26px",
                                borderRadius: "7px",
                                backgroundColor: `rgba(${rgb},0.13)`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <ItemIcon
                                style={{
                                  width: "13px",
                                  height: "13px",
                                  color: axis.color,
                                }}
                              />
                            </div>
                            <div>
                              <p
                                style={{
                                  fontSize: "0.8rem",
                                  fontWeight: 600,
                                  color: c.text,
                                  margin: 0,
                                }}
                              >
                                {item.label}
                              </p>
                              <p
                                style={{
                                  fontSize: "0.7rem",
                                  color: c.textSubtle,
                                  margin: "2px 0 0 0",
                                }}
                              >
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <Link
                      href="/opportunities"
                      style={{ textDecoration: "none", marginTop: "4px" }}
                    >
                      <button
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "9px 18px",
                          background: axis.gradient,
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          cursor: "pointer",
                          boxShadow: `0 0 18px ${axis.glow}`,
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "0.85")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                      >
                        Explorer {axis.label}{" "}
                        <ArrowRight style={{ width: "14px", height: "14px" }} />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ HOW IT WORKS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HowItWorksSection() {
  const c = LIGHT_COLORS;
  return (
    <section
      style={{
        padding: "100px 0",
        backgroundColor: c.sectionAlt,
        borderTop: `1px solid ${c.divider}`,
        borderBottom: `1px solid ${c.divider}`,
        transition: "all 0.3s",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="text-center"
          style={{ marginBottom: "64px" }}
        >
          <motion.div variants={fadeUp}>
            <span
              style={{
                display: "inline-block",
                padding: "5px 14px",
                borderRadius: "100px",
                border: `1px solid ${c.border}`,
                backgroundColor: c.badgeBg,
                fontSize: "0.78rem",
                fontWeight: 500,
                color: c.badgeText,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Comment à§a marche
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 800,
              color: c.text,
              letterSpacing: "-0.02em",
              margin: "0 0 16px 0",
              lineHeight: 1.2,
            }}
          >
            Lancez-vous en{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818CF8, #60A5FA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              3 étapes
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "1rem",
              color: c.textMuted,
              maxWidth: "460px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Une expérience simple et guidée pour connecter rapidement avec les
            bonnes personnes.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid md:grid-cols-3"
          style={{ gap: "20px" }}
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                variants={fadeUp}
                style={{ position: "relative" }}
              >
                {i < 2 && (
                  <div
                    className="hidden md:block"
                    style={{
                      position: "absolute",
                      top: "36px",
                      right: "-10px",
                      width: "20px",
                      height: "2px",
                      background: `linear-gradient(90deg, ${step.color}44, transparent)`,
                      zIndex: 1,
                    }}
                  />
                )}
                <div
                  style={{
                    padding: "28px 30px",
                    borderRadius: "16px",
                    backgroundColor: c.cardBg,
                    border: `1px solid ${c.border}`,
                    height: "100%",
                    transition:
                      "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                    boxShadow: c.shadowSm,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = `${step.color}55`;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = `0 12px 32px ${step.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = c.border;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = c.shadowSm;
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: step.color,
                      marginBottom: "18px",
                      opacity: 0.75,
                    }}
                  >
                    à‰TAPE {step.num}
                  </div>
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "12px",
                      backgroundColor: `${step.color}18`,
                      border: `1px solid ${step.color}33`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "18px",
                    }}
                  >
                    <Icon
                      style={{
                        width: "22px",
                        height: "22px",
                        color: step.color,
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: c.text,
                      margin: "0 0 10px 0",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: c.textMuted,
                      margin: 0,
                      lineHeight: 1.65,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ FEATURED â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function FeaturedSection() {
  const c = LIGHT_COLORS;
  return (
    <section
      style={{
        padding: "100px 0",
        backgroundColor: c.pageBg,
        transition: "background-color 0.3s",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between"
          style={{ marginBottom: "44px", gap: "20px" }}
        >
          <div>
            <motion.div variants={fadeUp}>
              <span
                style={{
                  display: "inline-block",
                  padding: "5px 14px",
                  borderRadius: "100px",
                  border: `1px solid ${c.border}`,
                  backgroundColor: c.badgeBg,
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  color: c.badgeText,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Sélection du moment
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 800,
                color: c.text,
                letterSpacing: "-0.02em",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Opportunités récentes
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link href="/opportunities" style={{ textDecoration: "none" }}>
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "9px 18px",
                  background: c.cardBg,
                  color: c.textMuted,
                  border: `1px solid ${c.border}`,
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: c.shadowSm,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = c.text;
                  e.currentTarget.style.borderColor = "#6366F1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = c.textMuted;
                  e.currentTarget.style.borderColor = c.border;
                }}
              >
                Voir tout{" "}
                <ArrowRight style={{ width: "14px", height: "14px" }} />
              </button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "18px" }}
        >
          {FEATURED.map((opp) => (
            <motion.div key={opp.id} variants={fadeUp}>
              <FeaturedCard opp={opp} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCard({ opp }: { opp: (typeof FEATURED)[0] }) {
  const c = LIGHT_COLORS;
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
      <div
        style={{
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          height: "150px",
          border: `1px solid ${c.border}`,
        }}
      >
        <ImageWithFallback
          src={opp.image}
          alt={opp.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(15,23,42,0.35) 100%)",
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 600,
            color: opp.typeColor,
            backgroundColor: opp.typeBg,
            padding: "3px 9px",
            borderRadius: "5px",
          }}
        >
          {opp.subtype}
        </span>
        <span style={{ fontSize: "0.7rem", color: c.textSubtle }}>
          {opp.time}
        </span>
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
      <div
        className="flex items-center justify-between"
        style={{
          marginTop: "auto",
          paddingTop: "10px",
          borderTop: `1px solid ${c.divider}`,
        }}
      >
        <div className="flex items-center" style={{ gap: "9px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: opp.avatarBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{ fontSize: "0.62rem", fontWeight: 700, color: "white" }}
            >
              {opp.initials}
            </span>
          </div>
          <div>
            <p
              style={{
                fontSize: "0.77rem",
                fontWeight: 500,
                color: c.text,
                margin: 0,
              }}
            >
              {opp.author}
            </p>
            <p style={{ fontSize: "0.67rem", color: c.textSubtle, margin: 0 }}>
              {opp.location}
            </p>
          </div>
        </div>
        <p
          style={{
            fontSize: "0.8rem",
            fontWeight: 700,
            color: opp.metaColor,
            margin: 0,
          }}
        >
          {opp.meta}
        </p>
      </div>
    </div>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function CTASection() {
  const isDark = false;
  const c = LIGHT_COLORS;
  return (
    <section
      style={{
        padding: "80px 0",
        backgroundColor: c.sectionAlt,
        borderTop: `1px solid ${c.divider}`,
        transition: "all 0.3s",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            borderRadius: "24px",
            background: isDark
              ? "linear-gradient(135deg, #0F1A3A 0%, #1A0F3A 50%, #0A1929 100%)"
              : "linear-gradient(135deg, #EEF0FF 0%, #F5F0FF 50%, #EEF5FF 100%)",
            border: `1px solid ${isDark ? "rgba(99,102,241,0.25)" : "rgba(99,102,241,0.2)"}`,
            padding: "clamp(40px, 6vw, 72px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "300px",
              background:
                "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "54px",
                height: "54px",
                borderRadius: "15px",
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                boxShadow: "0 0 28px rgba(99,102,241,0.4)",
                marginBottom: "26px",
              }}
            >
              <Globe
                style={{ width: "24px", height: "24px", color: "white" }}
              />
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 800,
                color: c.text,
                letterSpacing: "-0.02em",
                margin: "0 0 16px 0",
                lineHeight: 1.2,
              }}
            >
              Prêt à  rejoindre{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818CF8, #C084FC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Digital Bridge ?
              </span>
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: c.textMuted,
                maxWidth: "480px",
                margin: "0 auto 36px",
                lineHeight: 1.7,
              }}
            >
              Rejoignez 1 200+ membres qui collaborent, se financent et
              investissent ensemble. Votre prochaine opportunité n&apos;attend
              que vous.
            </p>
            <Link href="/opportunities" style={{ textDecoration: "none" }}>
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 28px",
                  background:
                    "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 0 30px rgba(99,102,241,0.4)",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Créer mon compte gratuitement{" "}
                <ArrowRight style={{ width: "16px", height: "16px" }} />
              </button>
            </Link>
            <p
              style={{
                fontSize: "0.78rem",
                color: c.textSubtle,
                marginTop: "14px",
              }}
            >
              Inscription gratuite Â· Aucune carte requise
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ FOOTER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
