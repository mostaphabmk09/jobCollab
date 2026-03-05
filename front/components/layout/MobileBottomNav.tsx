"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const links = [
    { label: "Accueil", href: "/", icon: "🏠" },
    { label: "Opportunités", href: "/opportunities", icon: "💼" },
    { label: "Immobilier", href: "/immobilier", icon: "🏢" },
    { label: "Expériences", href: "/experiences", icon: "⭐" },
  ];

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t shadow-lg"
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      <div className="flex justify-around py-2">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex flex-col items-center text-xs font-medium transition ${
                isActive
                  ? "text-indigo-600"
                  : "text-slate-500 hover:text-indigo-500"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>

              {/* Active indicator */}
              {isActive && (
                <span className="mt-1 h-1 w-6 rounded-full bg-indigo-600" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}