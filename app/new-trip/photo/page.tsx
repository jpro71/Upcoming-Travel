"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearDraft,
  createTrip,
  loadDraft,
} from "@/lib/tripService";
import { supabase } from "@/lib/supabase";

export default function TripPhotoPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const draft = loadDraft();

    if (!draft) {
      router.replace("/new-trip");
    }
  }, [router]);

  function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }

  function previous() {
    router.push("/new-trip/planner");
  }

  async function handleCreate(usePhoto: boolean) {
    if (creating) return;

    const draft = loadDraft();

    if (!draft) {
      alert("Your trip information could not be found.");
      router.push("/new-trip");
      return;
    }

    setCreating(true);

    try {
      const trip = await createTrip(draft);

      if (usePhoto && file) {
        const extension =
          file.name.split(".").pop()?.toLowerCase() || "jpg";

        const storagePath =
          `${trip.id}/cover-${Date.now()}.${extension}`;

        const { error: uploadError } =
          await supabase.storage
            .from("trip-covers")
            .upload(storagePath, file, {
              upsert: true,
            });

        if (uploadError) {
          throw uploadError;
        }

        const { error: updateError } = await supabase
          .from("trips")
          .update({
            cover_photo_path: storagePath,
          })
          .eq("id", trip.id);

        if (updateError) {
          throw updateError;
        }
      }

      clearDraft();

      router.push(`/trip/${trip.id}`);
      router.refresh();
    } catch (error) {
      console.error("Unable to create trip:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to create the trip."
      );

      setCreating(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F4EC] px-4 py-10">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[#E7DDCA] bg-white shadow-sm">
        <div className="border-b border-[#E7DDCA] bg-[#FFF9EE] p-8">
          <h1 className="text-3xl font-bold text-[#8F1724]">
            Trip Photo
          </h1>

          <p className="mt-2 text-[#5C554A]">
            Step 3 of 3 — Choose a cover photo for your trip.
          </p>
        </div>

        <div className="p-8 md:p-10">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-2 text-xl font-bold text-[#1A1A1A]">
              Cover Photo
            </h2>

            <p className="mb-6 text-[#5C554A]">
              Add a photo to make your trip easier to recognize,
              or skip this step and use the default image.
            </p>

            <label className="block cursor-pointer rounded-xl border-2 border-dashed border-[#D4AF37] bg-[#FFF9EE] p-8 text-center transition hover:bg-[#F5E9D2]">
              <div className="text-4xl">📷</div>

              <div className="mt-3 font-semibold text-[#8F1724]">
                Choose Photo
              </div>

              <div className="mt-1 text-sm text-[#5C554A]">
                JPG, PNG or another standard image format
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={selectPhoto}
                className="hidden"
                disabled={creating}
              />
            </label>

            {preview && (
              <div className="mt-8">
                <div className="mb-3 font-semibold text-[#1A1A1A]">
                  Preview
                </div>

                <img
                  src={preview}
                  alt="Trip cover preview"
                  className="h-72 w-full rounded-xl object-cover shadow-sm"
                />
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-[#E7DDCA] pt-6">
            <button
              type="button"
              onClick={previous}
              disabled={creating}
              className="rounded-lg border border-[#D4AF37] bg-white px-6 py-3 font-semibold text-[#8F1724] transition hover:bg-[#F5E9D2] disabled:opacity-50"
            >
              ← Previous
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleCreate(false)}
                disabled={creating}
                className="rounded-lg border border-[#D4AF37] bg-white px-6 py-3 font-semibold text-[#8F1724] transition hover:bg-[#F5E9D2] disabled:opacity-50"
              >
                {creating ? "Creating..." : "Skip Photo"}
              </button>

              <button
                type="button"
                onClick={() => handleCreate(true)}
                disabled={creating || !file}
                className="rounded-lg bg-[#B01E2D] px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-[#8F1724] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create Trip"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}