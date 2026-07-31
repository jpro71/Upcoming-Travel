export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-6">
        <div>
          <h1 className="text-3xl font-bold">Upcoming Travel</h1>
          <p className="text-slate-300">
            Shared family travel dashboard
          </p>
        </div>

        <button className="rounded-lg bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-700 transition">
          + Add Trip
        </button>
      </div>
    </header>
  );
}