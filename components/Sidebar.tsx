export default function Sidebar() {
  return (
    <aside className="w-52 bg-slate-800 text-white min-h-screen">
      <div className="p-5">
        <h2 className="mb-8 text-lg font-bold">Navigation</h2>

        <nav className="space-y-2">
          <button className="w-full rounded-lg px-4 py-3 text-left hover:bg-slate-700">
            Dashboard
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left hover:bg-slate-700">
            Trips
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left hover:bg-slate-700">
            Travel Map
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left hover:bg-slate-700">
            Bucket List
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left hover:bg-slate-700">
            Documents
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left hover:bg-slate-700">
            Statistics
          </button>
        </nav>
      </div>
    </aside>
  );
}