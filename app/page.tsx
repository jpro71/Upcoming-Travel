import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <Header />

      <div className="max-w-7xl mx-auto p-8">
        <div className="rounded-2xl bg-white shadow-lg p-8">
          <div className="text-sm uppercase tracking-widest text-slate-500">
            Next Adventure
          </div>

          <h2 className="text-5xl font-bold mt-3">
            Norwegian Prima
          </h2>

          <p className="text-xl text-slate-600 mt-3">
            November 8 – November 12, 2026
          </p>

          <div className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-white text-xl font-semibold">
            99 Days Remaining
          </div>
        </div>
      </div>
    </main>
  );
}