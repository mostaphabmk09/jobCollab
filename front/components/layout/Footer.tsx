import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(0,0,0,0.07)",
        padding: "48px 0 32px",
        backgroundColor: "#f2f4ff",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-11 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3 flex items-center gap-2.5">
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                DB
              </div>
              <span className="text-base font-bold text-slate-900">
                Digital{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #818CF8, #C084FC)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Bridge
                </span>
              </span>
            </div>
            <p className="m-0 text-sm leading-relaxed text-slate-500">
              La plateforme qui connecte entrepreneurs, investisseurs et acteurs
              immobiliers.
            </p>
          </div>

          {[
            {
              title: "Plateforme",
              links: ["Opportunites", "Collaboration", "Financement", "Immobilier"],
            },
            {
              title: "Compte",
              links: ["Se connecter", "S inscrire", "Dashboard", "Profil"],
            },
            {
              title: "Entreprise",
              links: ["A propos", "Blog", "Contact", "CGU"],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-xs font-bold tracking-wide text-slate-500 uppercase">
                {col.title}
              </p>
              <div className="flex flex-col gap-2">
                {col.links.map((label) => (
                  <Link
                    key={label}
                    href="#"
                    className="text-sm text-slate-500 transition hover:text-slate-900"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-black/10 pt-6 sm:flex-row">
          <p className="m-0 text-xs text-slate-400">
            Copyright {new Date().getFullYear()} Digital Bridge. Tous droits
            reserves.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: "Confidentialite", href: "#" },
              { label: "Conditions", href: "#" },
              { label: "Cookies", href: "#" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs text-slate-400 transition hover:text-slate-600"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
