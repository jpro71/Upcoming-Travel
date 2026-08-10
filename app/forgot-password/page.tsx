"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setSending(true);
    setError("");
    setSent(false);

    try {
      const redirectTo = `${window.location.origin}/reset-password`;

      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo,
          }
        );

      if (resetError) {
        throw resetError;
      }

      setSent(true);
    } catch (err) {
      console.error(
        "Unable to send password reset email:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to send password reset email."
      );
    } finally {
      setSending(false);
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
            Forgot Your Password?
          </h1>

          <p className="mt-2 text-[#6B6B6B]">
            Enter your email address and we&apos;ll
            send you a password reset link.
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

          {sent && (
            <div className="mb-6 rounded-xl bg-green-50 p-4 text-sm text-green-800">
              <div className="font-semibold">
                Check your email
              </div>

              <div className="mt-1">
                If an account exists for that email
                address, you&apos;ll receive instructions
                for resetting your password.
              </div>
            </div>
          )}

          {!sent && (
            <>
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

              <button
                type="submit"
                disabled={sending}
                className="mt-7 w-full rounded-xl bg-[#B01E2D] px-6 py-3 font-semibold text-white transition hover:bg-[#8F1724] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sending
                  ? "Sending..."
                  : "Send Reset Link"}
              </button>
            </>
          )}
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="font-semibold text-[#8F1724] hover:underline"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}