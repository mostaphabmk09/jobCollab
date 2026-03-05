export default function DiscoverSection() {
  const features = [
    {
      icon: "🤝",
      title: "Partenariat",
      text: "Trouvez un associé sérieux pour lancer ou développer votre projet.",
    },
    {
      icon: "💰",
      title: "Financement",
      text: "Connectez-vous avec des investisseurs intéressés par votre idée.",
    },
    {
      icon: "🧑‍💼",
      title: "Job",
      text: "Recrutez des talents ou trouvez une opportunité professionnelle.",
    },
    {
      icon: "📌",
      title: "Conseils",
      text: "Apprenez des expériences réelles des autres membres.",
    },
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900">
            Découvrez la plateforme
          </h2>
          <p className="mt-4 text-slate-600">
            Des opportunités réelles, des échanges simples et une communauté
            basée sur la confiance.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm 
             text-center
             transition duration-500 ease-out 
             hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Icon */}
              <div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl 
             bg-indigo-50 text-2xl ring-1 ring-indigo-100 
             transition duration-500 
             group-hover:scale-110 group-hover:bg-indigo-100"
              >
                {f.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 font-bold text-slate-900 text-lg">
                {f.title}
              </h3>

              {/* Text */}
              <p className="mt-3 text-sm text-slate-600 leading-relaxed text-center">
                {f.text}
              </p>

              {/* subtle line */}
              <div className="mt-6 h-1 w-0 bg-indigo-600 transition-all duration-500 group-hover:w-10 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
