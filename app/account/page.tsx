"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function AccountPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setEmail(user.email ?? "");
      setFirstName(user.user_metadata?.first_name ?? "");
      setLastName(user.user_metadata?.last_name ?? "");
      setLoading(false);
    }

    loadUser();
  }, [router]);

  async function handleProfileSave(event: FormEvent) {
    event.preventDefault();

    setSavingProfile(true);
    setProfileMessage("");
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const emailChanged =
        email.trim().toLowerCase() !==
        (user.email ?? "").toLowerCase();

      const { error: updateError } =
        await supabase.auth.updateUser({
          email: emailChanged ? email.trim() : undefined,
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            display_name: `${firstName.trim()} ${lastName.trim()}`.trim(),
          },
        });

      if (updateError) {
        throw updateError;
      }

      setProfileMessage(
        emailChanged
          ? "Account updated. Check your email to confirm the new email address."
          : "Account information updated."
      );
    } catch (err) {
      console.error("Unable to update account:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update account."
      );
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePasswordSave(event: FormEvent) {
    event.preventDefault();

    setSavingPassword(true);
    setPasswordMessage("");
    setError("");

    if (newPassword.length < 8) {
      setError(
        "Your new password must be at least 8 characters."
      );
      setSavingPassword(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("The passwords do not match.");
      setSavingPassword(false);
      return;
    }

    try {
      const { error: updateError } =
        await supabase.auth.updateUser({
          password: newPassword,
        });

      if (updateError) {
        throw updateError;
      }

      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Password updated successfully.");
    } catch (err) {
      console.error("Unable to update password:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update password."
      );
    } finally {
      setSavingPassword(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();

    router.push("/");
    router.refresh();
  }

  const inputClass =
    "w-full rounded-xl border border-[#D9C9AA] bg-white p-3 text-[#1A1A1A] outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25";

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F1E7]">
        <div className="text-lg font-semibold text-[#6B6B6B]">
          Loading account...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F1E7] px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <Link href="/dashboard">
            <Image
              src="/images/logos/portalpuffin-logo.png"
              alt="PortalPuffin"
              width={260}
              height={100}
              className="mx-auto h-auto w-auto max-w-full"
              priority
            />
          </Link>

          <h1 className="mt-6 text-3xl font-bold text-[#1A1A1A]">
            Account Settings
          </h1>

          <p className="mt-2 text-[#6B6B6B]">
            Manage your PortalPuffin account information.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleProfileSave}
          className="rounded-2xl border border-[#E7DDCA] bg-white p-8 shadow-lg"
        >
          <h2 className="text-xl font-bold">
            Profile
          </h2>

          {profileMessage && (
            <div className="mt-5 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-800">
              {profileMessage}
            </div>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold">
                First Name
              </label>

              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
                autoComplete="given-name"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Last Name
              </label>

              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block font-semibold">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              autoComplete="email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={savingProfile}
            className="mt-7 rounded-xl bg-[#B01E2D] px-6 py-3 font-semibold text-white transition hover:bg-[#8F1724] disabled:opacity-50"
          >
            {savingProfile
              ? "Saving..."
              : "Save Account Information"}
          </button>
        </form>

        <form
          onSubmit={handlePasswordSave}
          className="mt-8 rounded-2xl border border-[#E7DDCA] bg-white p-8 shadow-lg"
        >
          <h2 className="text-xl font-bold">
            Change Password
          </h2>

          {passwordMessage && (
            <div className="mt-5 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-800">
              {passwordMessage}
            </div>
          )}

          <div className="mt-6">
            <label className="mb-2 block font-semibold">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
              autoComplete="new-password"
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
            />
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="mt-7 rounded-xl bg-[#1A1A1A] px-6 py-3 font-semibold text-white transition hover:bg-black disabled:opacity-50"
          >
            {savingPassword
              ? "Updating..."
              : "Change Password"}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="font-semibold text-[#8F1724] hover:underline"
          >
            ← Back to Dashboard
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-xl border border-red-300 bg-white px-5 py-2.5 font-semibold text-red-700 transition hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}