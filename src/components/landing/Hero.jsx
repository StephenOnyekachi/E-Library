
import { ArrowRight, Search } from "lucide-react";

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[680px] items-center overflow-hidden bg-gray-950"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      <div className="absolute inset-0 bg-gray-950/75" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Your Digital Library
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
            Discover. Read.
            <span className="block text-emerald-400">Learn.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
            Explore thousands of books across different topics and discover
            knowledge that helps you learn, grow, and achieve more.
          </p>

          <div className="mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl bg-white p-2 shadow-2xl sm:flex-row">
            <div className="flex flex-1 items-center gap-3 px-3">
              <Search size={21} className="text-gray-400" />

              <input
                type="text"
                placeholder="Search for a book, author or topic..."
                className="w-full bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400"
            >
              Search
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Technology", "Business", "Education", "Self Help", "Fiction"].map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  {category}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
