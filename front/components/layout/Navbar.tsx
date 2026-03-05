"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const links = [
    { label: "Accueil", href: "/" },
    { label: "Opportunites", href: "/opportunities" },
    { label: "Immobilier", href: "/immobilier" },
    { label: "Experiences", href: "/experiences" },
  ];

  const handleLogout = async () => {
    await logout();
    setDropdown(false);
    router.push("/");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    }

    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: `1px solid ${
          scrolled ? "rgba(99,102,241,0.13)" : "transparent"
        }`,
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Digital Bridge"
            className="h-11 w-11 rounded-2xl border object-contain p-1.5"
            style={{
              borderColor: "rgba(99,102,241,0.13)",
              backgroundColor: "#fff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
            }}
          />
          <div>
            <p className="leading-tight font-black text-slate-900">
              Digital{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #818CF8 0%, #C084FC 50%, #60A5FA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Bridge
              </span>
            </p>
            <p className="hidden text-xs text-slate-500 sm:block">
              Trouvez un partenaire
            </p>
          </div>
        </Link>

        <nav className="hidden gap-2 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-xl px-4 py-2 text-sm font-semibold transition hover:bg-[rgba(99,102,241,0.08)] hover:text-slate-900"
                style={{
                  color: active ? "#0f172a" : "#4b5563",
                  backgroundColor: active
                    ? "rgba(99,102,241,0.1)"
                    : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative flex items-center gap-3">
          <div className="hidden md:block">
            <Link href="/publish">
              <button
                className="rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                  boxShadow: "0 0 20px rgba(99,102,241,0.3)",
                }}
              >
                Publier
              </button>
            </Link>
          </div>

          {!user && (
            <Link
              href="/login"
              className="rounded-xl border border-[rgba(99,102,241,0.13)] bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[rgba(99,102,241,0.28)] hover:text-slate-900"
            >
              Connexion
            </Link>
          )}

          {user && (
            <>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white transition hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                }}
              >
                {user.email.charAt(0).toUpperCase()}
              </button>

              {dropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-16 w-64 rounded-3xl border bg-white p-5 shadow-2xl"
                  style={{ borderColor: "rgba(99,102,241,0.13)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
                      }}
                    >
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="max-w-[140px] truncate text-sm font-semibold text-slate-800">
                        {user.email}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  <div className="my-4 h-px bg-slate-200" />

                  <Link
                    href="/profile"
                    onClick={() => setDropdown(false)}
                    className="flex w-full items-center rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-indigo-100"
                  >
                    Mon profil
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Deconnexion
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
