export default function CTASection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-slate-900 px-8 py-12 text-white shadow-xl">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            {/* LEFT */}
            <div className="md:col-span-8">
              <h3 className="text-2xl md:text-3xl font-black leading-tight">
                Vous avez une opportunité ?
              </h3>

              <p className="mt-3 text-white/80 text-sm md:text-base">
                Publiez votre annonce en quelques minutes et connectez-vous avec
                des partenaires sérieux et motivés.
              </p>
            </div>

            {/* RIGHT */}
            <div className="md:col-span-4 flex md:justify-end">
              <button className="w-full md:w-auto rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 hover:bg-slate-100 transition">
                Publier maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
