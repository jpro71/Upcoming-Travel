import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tripId = Number(id);

    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    const extension = file.name.split(".").pop() ?? "jpg";
    const storagePath = `${tripId}/${Date.now()}.${extension}`;

    // Get existing cover photo so we can delete it
    const { data: existingTrip } = await supabase
      .from("trips")
      .select("cover_photo_path")
      .eq("id", tripId)
      .single();

    if (existingTrip?.cover_photo_path) {
      await supabase.storage
        .from("trip-covers")
        .remove([existingTrip.cover_photo_path]);
    }

    const { error: uploadError } = await supabase.storage
      .from("trip-covers")
      .upload(storagePath, file, {
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    const { error: updateError } = await supabase
      .from("trips")
      .update({
        cover_photo_path: storagePath,
        cover_photo_filename: file.name,
      })
      .eq("id", tripId);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        error: err.message ?? "Unexpected server error.",
      },
      {
        status: 500,
      }
    );
  }
}