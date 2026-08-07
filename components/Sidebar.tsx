const menuItems = [
  { label: "Dashboard", icon: "⌂" },
  { label: "Trips", icon: "▣" },
  { label: "Travel Map", icon: "⌖" },
  { label: "Bucket List", icon: "☆" },
  { label: "Documents", icon: "▤" },
  { label: "Statistics", icon: "▥" },
  { label: "Settings", icon: "⚙" },
];

export default function Sidebar() {
  return (
    <aside className="min-h-[calc(100vh-118px)] w-[220px] shrink-0 bg-gradient-to-b from-[#9E1B28] to-[#B01E2D] text-white">
      <div className="p-5">
        <h2 className="mb-5 border-b border-[#D4AF37] pb-3 text-lg font-bold text-[#F1C54B]">
          Navigation
        </h2>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition ${
                index === 0
                  ? "bg-[#E4B63F] text-[#1A1A1A] shadow-sm"
                  : "hover:bg-white/10 hover:text-[#F5E9D2]"
              }`}
            >
              <span className="w-5 text-center text-xl leading-none">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
