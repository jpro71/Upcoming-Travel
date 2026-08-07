// Inside handleCreate(), replace the entire function with this.

async function handleCreate(skipPhoto = false) {
  const draft = loadDraft();

  if (!draft) {
    alert("Trip draft not found.");
    return;
  }

  setSaving(true);

  let createdTrip: Awaited<ReturnType<typeof createTrip>> | null = null;

  try {
    createdTrip = await createTrip(draft);

    if (!skipPhoto && file) {
      const extension = file.name.split(".").pop();
      const storagePath = `${createdTrip.id}/${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("trip-covers")
        .upload(storagePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { error: updateError } = await supabase
        .from("trips")
        .update({
          cover_photo_path: storagePath,
          cover_photo_filename: file.name,
        })
        .eq("id", createdTrip.id);

      if (updateError) {
        throw updateError;
      }
    }

    clearDraft();
    router.push(`/trip/${createdTrip.id}`);
  } catch (err: any) {
    console.error(err);

    // Roll back the trip if it was created.
    if (createdTrip) {
      try {
        await supabase
          .from("trips")
          .delete()
          .eq("id", createdTrip.id);
      } catch (rollbackError) {
        console.error("Rollback failed:", rollbackError);
      }
    }

    alert(err?.message ?? "Unable to create trip.");
  } finally {
    setSaving(false);
  }
}