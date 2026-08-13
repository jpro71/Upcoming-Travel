"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="relative border-b border-slate-200 bg-white">
      <div className="flex min-h-[86px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:h-[clamp(150px,20vh,220px)] lg:px-8 lg:py-3">
        <Link
          href="/dashboard"
          className="flex min-w-0 items-center"
        >
          <Image
            src="/images/logos/portalpuffin-logo-header.png"
            alt="PortalPuffin"
            width={1153}
            height={381}
            className="h-auto w-[190px] sm:w-[260px] lg:w-[clamp(440px,42vw,680px)]"
            priority
          />
        </Link>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            href="/new-trip"
            className="rounded-xl bg-[#B01E2D] px-5 py-3 font-semibold text-white transition hover:bg-[#8F1724]"
          >
            + Add Trip
          </Link>

          <Link
            href="/account"
            className="rounded-xl bg-[#E4B63F] px-5 py-3 font-semibold text-[#1A1A1A] transition hover:bg-[#D4A62F]"
          >
            Account
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-xl bg-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-300"
          >
            Sign Out
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Link
            href="/new-trip"
            className="rounded-lg bg-[#B01E2D] px-3 py-2 text-sm font-semibold text-white"
          >
            + Trip
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-2xl font-semibold text-slate-700"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute right-4 top-[76px] z-50 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl lg:hidden">
          <nav className="p-2">
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Dashboard
            </Link>

            <Link
              href="/dashboard#upcoming-trips"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Trips
            </Link>

            <Link
              href="/account"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Account
            </Link>

            <div className="my-1 border-t border-slate-200" />

            <button
              type="button"
              onClick={handleSignOut}
              className="block w-full rounded-lg px-4 py-3 text-left font-semibold text-[#B01E2D] hover:bg-slate-100"
            >
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}