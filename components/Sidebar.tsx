export default function Sidebar() {
  const menuItems = [
    "Dashboard",
    "Trips",
    "Travel Map",
    "Bucket List",
    "Documents",
    "Statistics",
    "Settings",
  ];

  return (
    <aside className="w-52 min-h-screen border-r border-slate-700 bg-slate-900 text-white">
      <div className="p-5">
        <h2 className="mb-6 text-lg font-bold">Navigation</h2>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item}
              className="w-full rounded-lg px-4 py-3 text-left transition hover:bg-slate-800"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}