"use client";

import { useEffect, useRef, useState } from "react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Yassine B.",
    role: "Projet restaurant – Casablanca",
    text: "لقيت شريك عبر المنصة وخدمنا مع بعضنا.",
  },
  {
    id: 2,
    name: "Khadija M.",
    role: "Commerce local – Rabat",
    text: "سولت الناس هنا وخديت خطوات واضحة.",
  },
  {
    id: 3,
    name: "Omar T.",
    role: "Investissement – Fès",
    text: "تعلمت بزاف قبل ما ندخل فشراكة.",
  },
  {
    id: 4,
    name: "Sara L.",
    role: "Projet Airbnb – Agadir",
    text: "تواصلت مع شخص جدي وبداينا كنخططو للمشروع.",
  },
];

export default function ExperiencesSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Auto scroll smooth
  useEffect(() => {
    if (paused) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      slider.scrollLeft += 1;

      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollLeft = 0;
      }
    }, 20);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section className="bg-slate-50 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Expériences réelles
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Des retours concrets de membres ayant collaboré via la plateforme.
          </p>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="flex gap-5 overflow-x-hidden">
          {testimonials.map((t) => (
            <div
              key={t.id}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="min-w-[300px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm text-slate-700 leading-relaxed">
                “{t.text}”
              </p>

              <div className="mt-4">
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
