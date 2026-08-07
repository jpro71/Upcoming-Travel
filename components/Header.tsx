import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b-2 border-[#D4AF37] bg-white shadow-sm">
      <div className="flex h-[176px] items-center justify-between gap-6 px-7">
        <Link
          href="/"
          aria-label="PortalPuffin home"
          className="flex h-full w-[520px] shrink-0 items-center"
        >
          <Image
            src="/images/logos/portalpuffin-logo.png"
            alt="PortalPuffin - Where every trip comes together"
            width={1536}
            height={512}
            priority
            className="block h-auto w-[520px] object-contain object-left"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-4">
          <button className="rounded-lg border border-[#D4AF37] bg-white px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-[#F5E9D2]">
            ⌕&nbsp; Search
          </button>

          <Link
            href="/new-trip"
            className="rounded-lg bg-[#B01E2D] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#8F1724]"
          >
            + Add Trip
          </Link>
        </div>
      </div>
    </header>
  );
}
