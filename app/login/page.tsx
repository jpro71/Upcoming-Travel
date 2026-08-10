"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoggingIn(true);
    setError("");

    try {
      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (signInError) {
        throw signInError;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Unable to log in:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to log in."
      );

      setLoggingIn(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#D9C9AA] bg-white p-3 text-[#1A1A1A] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25";

  return (
    <main className="min-h-screen bg-[#F7F1E7] px-6 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <Link href="/">
            <Image
              src="/images/logos/portalpuffin-logo.png"
              alt="PortalPuffin"
              width={300}
              height={120}
              className="mx-auto h-auto w-auto max-w-full"
              priority
            />
          </Link>

          <h1 className="mt-8 text-3xl font-bold text-[#1A1A1A]">
            Welcome Back
          </h1>

          <p className="mt-2 text-[#6B6B6B]">
            Log in to access your travel plans.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#E7DDCA] bg-white p-8 shadow-lg"
        >
          {error && (
            <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block font-semibold">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className={inputClass}
              autoComplete="email"
              required
            />
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <label className="font-semibold">
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-[#8F1724] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className={inputClass}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loggingIn}
            className="mt-7 w-full rounded-xl bg-[#B01E2D] px-6 py-3 font-semibold text-white transition hover:bg-[#8F1724] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loggingIn
              ? "Logging In..."
              : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="font-semibold text-[#8F1724] hover:underline"
          >
            ← Back to PortalPuffin
          </Link>
        </div>
      </div>
    </main>
  );
}