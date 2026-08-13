"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Dashboard",
    icon: "⌂",
    href: "/dashboard",
  },
  {
    label: "Trips",
    icon: "▣",
    href: "/my-trips",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-[calc(100vh-118px)] w-[220px] shrink-0 bg-gradient-to-b from-[#9E1B28] to-[#B01E2D] text-white lg:block">
      <div className="p-5">
        <h2 className="mb-5 border-b border-[#D4AF37] pb-3 text-lg font-bold text-[#F1C54B]">
          Navigation
        </h2>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition ${
                  isActive
                    ? "bg-[#E4B63F] text-[#1A1A1A] shadow-sm"
                    : "hover:bg-white/10 hover:text-[#F5E9D2]"
                }`}
              >
                <span className="w-5 text-center text-xl leading-none">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}