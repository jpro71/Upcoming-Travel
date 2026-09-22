"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = { tripId: number };
type ShareRow = { share_token: string; is_enabled: boolean };

export default function ShareTripButton({ tripId }: Props) {
  const [open, setOpen] = useState(false);
  const [share, setShare] = useState<ShareRow | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    void loadShare();
  }, [open]);

  async function loadShare() {
    setLoading(true);
    setMessage("");
    const { data, error } = await supabase
      .from("trip_shares")
      .select("share_token,is_enabled")
      .eq("trip_id", tripId)
      .maybeSingle();
    if (error) setMessage(error.message);
    else setShare(data);
    setLoading(false);
  }

  async function enableSharing() {
    setLoading(true);
    setMessage("");
    const { data, error } = share
      ? await supabase
          .from("trip_shares")
          .update({ is_enabled: true })
          .eq("trip_id", tripId)
          .select("share_token,is_enabled")
          .single()
      : await supabase
          .from("trip_shares")
          .insert({ trip_id: tripId, is_enabled: true })
          .select("share_token,is_enabled")
          .single();
    if (error) setMessage(error.message);
    else setShare(data);
    setLoading(false);
  }

  async function disableSharing() {
    setLoading(true);
    setMessage("");
    const { data, error } = await supabase
      .from("trip_shares")
      .update({ is_enabled: false })
      .eq("trip_id", tripId)
      .select("share_token,is_enabled")
      .single();
    if (error) setMessage(error.message);
    else setShare(data);
    setLoading(false);
  }

  async function copyLink() {
    if (!share?.share_token) return;
    const url = `${window.location.origin}/share/${share.share_token}`;
    await navigator.clipboard.writeText(url);
    setMessage("Share link copied.");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-slate-800 shadow backdrop-blur transition hover:bg-white"
      >
        ↗ Share Trip
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Share this trip</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Friends and family can view a read-only itinerary without signing in. Documents, confirmation numbers, and costs are not shared.
                </p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-2xl text-slate-400 hover:text-slate-700" aria-label="Close">×</button>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-slate-500">Sharing</div>
                  <div className={`mt-1 font-semibold ${share?.is_enabled ? "text-green-700" : "text-slate-700"}`}>
                    {loading ? "Loading..." : share?.is_enabled ? "ON" : "OFF"}
                  </div>
                </div>
                {!share?.is_enabled ? (
                  <button type="button" disabled={loading} onClick={enableSharing} className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50">Enable Sharing</button>
                ) : (
                  <button type="button" disabled={loading} onClick={disableSharing} className="rounded-xl border border-red-300 px-4 py-2 font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50">Disable Sharing</button>
                )}
              </div>

              {share?.is_enabled && (
                <div className="mt-5">
                  <div className="text-sm font-medium text-slate-700">Share link</div>
                  <div className="mt-2 flex gap-2">
                    <input readOnly value={typeof window === "undefined" ? "" : `${window.location.origin}/share/${share.share_token}`} className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700" />
                    <button type="button" onClick={copyLink} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Copy Link</button>
                  </div>
                </div>
              )}
            </div>

            {message && <div className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">{message}</div>}
          </div>
        </div>
      )}
    </>
  );
}
