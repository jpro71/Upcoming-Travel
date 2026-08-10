import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8] text-[#1A1A1A]">
      {/* Navigation */}
      <header className="border-b border-[#E7DDCA] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Image
            src="/images/logos/portalpuffin-logo.png"
            alt="PortalPuffin"
            width={250}
            height={80}
            className="h-auto w-[220px]"
            priority
          />

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl border-2 border-[#B01E2D] px-5 py-2.5 font-semibold text-[#B01E2D] transition hover:bg-[#FFF4F4]"
            >
              Log In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
          <div>
            <div className="mb-5 inline-flex rounded-full bg-[#F5E9D2] px-4 py-2 text-sm font-bold text-[#8F1724]">
              Your trips. One organized place.
            </div>

            <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Plan the trip.
              <br />
              <span className="text-[#B01E2D]">
                Enjoy the journey.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-xl leading-8 text-[#6B6B6B]">
              PortalPuffin keeps your travel plans organized
              from the first idea through the trip home.
              Flights, hotels, rental cars, restaurants,
              documents and more — all together.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-xl bg-[#B01E2D] px-7 py-3.5 text-lg font-semibold text-white shadow-sm transition hover:bg-[#8F1724]"
              >
                Log In to PortalPuffin
              </Link>

              <a
                href="#features"
                className="rounded-xl border-2 border-[#D4AF37] bg-white px-7 py-3.5 text-lg font-semibold text-[#1A1A1A] transition hover:bg-[#FFF9EE]"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#F5E9D2]" />
            <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#D4AF37]/15" />

            <div className="relative rounded-3xl border border-[#E7DDCA] bg-white p-8 shadow-xl">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wider text-[#B01E2D]">
                    Everything together
                  </div>

                  <h2 className="mt-1 text-2xl font-bold">
                    Your travel command center
                  </h2>
                </div>

                <div className="text-4xl">
                  🧭
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  ["✈️", "Flights"],
                  ["🏨", "Hotels"],
                  ["🚗", "Rental Cars"],
                  ["🍽️", "Restaurants"],
                  ["🎟️", "Activities"],
                  ["📄", "Documents"],
                ].map(([icon, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-[#E7DDCA] bg-[#FFFDF8] p-5"
                  >
                    <div className="text-3xl">
                      {icon}
                    </div>

                    <div className="mt-3 font-semibold">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-y border-[#E7DDCA] bg-[#F5E9D2]/40"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold">
              Travel planning without the clutter
            </h2>

            <p className="mt-4 text-lg text-[#6B6B6B]">
              Keep the important details for every trip
              organized and easy to find.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="text-4xl">🗂️</div>

              <h3 className="mt-5 text-xl font-bold">
                Everything in One Place
              </h3>

              <p className="mt-3 leading-7 text-[#6B6B6B]">
                Keep reservations, transportation,
                documents and trip details connected to
                the trip where they belong.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="text-4xl">🧳</div>

              <h3 className="mt-5 text-xl font-bold">
                Built Around Your Trip
              </h3>

              <p className="mt-3 leading-7 text-[#6B6B6B]">
                Choose the planning tools you need for
                each trip without filling your dashboard
                with things you don't.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="text-4xl">🔐</div>

              <h3 className="mt-5 text-xl font-bold">
                Your Travel Plans
              </h3>

              <p className="mt-3 leading-7 text-[#6B6B6B]">
                PortalPuffin is being designed so your
                personal itineraries and travel details
                remain behind your account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#B01E2D] px-8 py-12 text-center text-white shadow-xl">
          <Image
            src="/images/logos/portalpuffin-logo.png"
            alt="PortalPuffin"
            width={220}
            height={70}
            className="mx-auto h-auto w-[200px] rounded-lg bg-white p-3"
          />

          <h2 className="mt-7 text-3xl font-bold">
            Where every trip comes together.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-lg text-white/85">
            One home for the details that make your
            travels happen.
          </p>

          <Link
            href="/login"
            className="mt-7 inline-block rounded-xl bg-[#D4AF37] px-7 py-3 font-bold text-[#1A1A1A] transition hover:bg-[#E1C35D]"
          >
            Log In
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E7DDCA] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-7 text-center text-sm text-[#6B6B6B] lg:px-10">
          © {new Date().getFullYear()} PortalPuffin
        </div>
      </footer>
    </main>
  );
}