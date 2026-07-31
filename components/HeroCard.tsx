export default function HeroCard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <img
        src="/images/norwegian-prima.jpg"
        alt="Norwegian Prima"
        className="h-72 w-full object-cover"
      />

      <div className="p-8">
        <div className="text-sm uppercase tracking-widest text-slate-500">
          Next Adventure
        </div>

        <h2 className="mt-3 text-5xl font-bold">
          Norwegian Prima
        </h2>

        <p className="mt-3 text-xl text-slate-600">
          November 8 – November 12, 2026
        </p>

        <div className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-white text-xl font-semibold">
          99 Days Remaining
        </div>
      </div>
    </div>
  );
}