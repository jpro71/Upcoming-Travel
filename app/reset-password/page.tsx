"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setError("");
    setSuccess(false);

    if (password.length < 8) {
      setError(
        "Your new password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setSaving(true);

    try {
      const { error: updateError } =
        await supabase.auth.updateUser({
          password,
        });

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);

      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 2000);
    } catch (err) {
      console.error(
        "Unable to reset password:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to reset password."
      );
    } finally {
      setSaving(false);
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
            Reset Your Password
          </h1>

          <p className="mt-2 text-[#6B6B6B]">
            Choose a new password for your
            PortalPuffin account.
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

          {success ? (
            <div className="rounded-xl bg-green-50 p-4 text-sm text-green-800">
              <div className="font-semibold">
                Password updated successfully.
              </div>

              <div className="mt-1">
                Returning you to the login page...
              </div>
            </div>
          ) : (
            <>
              <div>
                <label className="mb-2 block font-semibold">
                  New Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className={inputClass}
                  autoComplete="new-password"
                  required
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block font-semibold">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className={inputClass}
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-7 w-full rounded-xl bg-[#B01E2D] px-6 py-3 font-semibold text-white transition hover:bg-[#8F1724] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Updating Password..."
                  : "Update Password"}
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