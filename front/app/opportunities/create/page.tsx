"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const types = [
  { id: "collaboration", label: "Collaboration", icon: "💼" },
  // { id: "partenariat", label: "Partenariat", icon: "🤝" },
  { id: "financement", label: "Financement", icon: "💰" },
  { id: "immobilier", label: "Immobilier", icon: "🏡" },
  // { id: "autres", label: "Autres", icon: "✨" },
];

export default function CreateOpportunityPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const size = 380;
  const radius = 160;
  const gap = 6;
  const center = size / 2;

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angle: number
  ) => {
    const rad = ((angle - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const createPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(center, center, radius, endAngle - gap);
    const end = polarToCartesian(center, center, radius, startAngle + gap);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `
      M ${center} ${center}
      L ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}
      Z
    `;
  };

  return (
<div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center pt-6 px-6">
      <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
          Choisissez le type de projet
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Sélectionnez une catégorie pour commencer
        </p>
      </div>

      <div className="relative">

        {/* WHEEL */}
        <svg
          width={size}
          height={size}
          className={`drop-shadow-xl transition-all duration-500 ${
            selected ? "scale-90 opacity-30" : "scale-100 opacity-100"
          }`}
        >
          {types.map((type, index) => {
            const segmentAngle = 360 / types.length;
            const startAngle = index * segmentAngle;
            const endAngle = startAngle + segmentAngle;

            return (
              <g
                key={type.id}
                onClick={() => setSelected(type.id)}
                className="cursor-pointer"
              >
                <path
                  d={createPath(startAngle, endAngle)}
                  fill="white"
                  stroke="#e2e8f0"
                  strokeWidth={2}
                  className="transition-all duration-300 hover:fill-slate-100"
                />
              </g>
            );
          })}
        </svg>

        {/* LABELS */}
        {types.map((type, index) => {
          const segmentAngle = 360 / types.length;
          const angle = index * segmentAngle + segmentAngle / 2;
          const pos = polarToCartesian(center, center, radius - 70, angle);

          return (
            <div
              key={type.id}
              className={`absolute flex flex-col items-center justify-center 
                text-sm font-semibold pointer-events-none
                transition-all duration-500
                ${
                  selected
                    ? "opacity-0 scale-75"
                    : "opacity-100 scale-100"
                }
              `}
              style={{
                left: pos.x,
                top: pos.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="text-2xl mb-1">
                {type.icon}
              </span>
              {type.label}
            </div>
          );
        })}

        {/* SELECTED BIG CIRCLE */}
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center animate-fadeIn">

            <div className="w-[280px] h-[280px] rounded-full bg-emerald-50 border-4 border-emerald-400 shadow-2xl flex flex-col items-center justify-center transition-all duration-500 scale-100 text-center px-6">

  <div className="text-5xl mb-3">
    {types.find((t) => t.id === selected)?.icon}
  </div>

  <div className="text-lg font-bold text-emerald-700">
    {types.find((t) => t.id === selected)?.label}
  </div>

  <p className="text-sm text-slate-500 mt-2">
    Type sélectionné
  </p>

  <button
  onClick={() => setSelected(null)}
  className="mt-5 w-10 h-10 flex items-center justify-center 
             rounded-full border border-slate-300 
             text-xl font-bold text-slate-600 
             hover:bg-red-50 hover:text-red-600 hover:border-red-300
             transition-all duration-300 shadow-sm cursor-pointer"
>
  ✕
</button>

</div>
          </div>
        )}

        {/* CENTER LOGO (only when no selection) */}
        {!selected && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="logo"
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* CONTINUE BUTTON */}
      <div>
        <button
          disabled={!selected}
          onClick={() => router.push(`/create/${selected}`)}
          className={`px-8 py-3 rounded-2xl font-semibold transition
            ${
              selected
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-indigo-300 text-white cursor-not-allowed"
            }`}
        >
          Continuer →
        </button>
      </div>
    </div>
  );
}