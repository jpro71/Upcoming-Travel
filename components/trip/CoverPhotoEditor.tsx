"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  tripId: number;
};

export default function CoverPhotoEditor({ tripId }: Props) {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`/api/trips/${tripId}/cover`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();

        console.error(text);

        throw new Error(text);
      }

      router.refresh();
    } catch (err: any) {
      console.error(err);

      alert(err.message ?? "Unable to update cover photo.");
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="rounded-xl bg-black/60 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-black/75 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "📷 Change Cover"}
      </button>
    </>
  );
}