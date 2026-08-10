"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function Header() {
  const router = useRouter();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Unable to sign out:", error);
      alert("Unable to sign out. Please try again.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-[#E7DDCA] bg-white">
      <div className="flex items-center justify-between px-8 py-4">
        <Link
          href="/dashboard"
          className="flex items-center"
        >
          <Image
            src="/images/logos/portalpuffin-logo.png"
            alt="PortalPuffin"
            width={220}
            height={80}
            className="h-auto w-auto max-w-[220px]"
            priority
          />
        </Link>

        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            className="rounded-lg border border-[#D4AF37] bg-white px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#F5E9D2]"
          >
            ⌕&nbsp; Search
          </button>

          <Link
            href="/new-trip"
            className="rounded-lg bg-[#B01E2D] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#8F1724]"
          >
            + Add Trip
          </Link>

          <Link
            href="/account"
            className="rounded-lg border border-[#D4AF37] bg-white px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#F5E9D2]"
          >
            Account
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-[#B01E2D] bg-white px-5 py-2.5 text-sm font-semibold text-[#B01E2D] transition hover:bg-[#FFF4F4]"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}