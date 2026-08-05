import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <div>
          <h1 className="text-3xl font-bold">Upcoming Travel</h1>
          <p className="text-sm text-slate-300">
            Shared Family Travel Dashboard
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-lg bg-slate-700 px-4 py-2 transition hover:bg-slate-600">
            Search
          </button>

          <Link
            href="/new-trip"
            className="rounded-lg bg-blue-600 px-5 py-2 font-semibold transition hover:bg-blue-700"
          >
            + Add Trip
          </Link>
        </div>
      </div>
    </header>
  );
}