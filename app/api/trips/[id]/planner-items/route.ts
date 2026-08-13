import { NextResponse } from "next/server";

import { enableTripPlannerItem } from "@/lib/tripServerService";
import { PlannerItems } from "@/types/trip";

const allowedItems: (keyof PlannerItems)[] = [
  "flights",
  "rentalCar",
  "hotel",
  "restaurants",
  "documents",
];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tripId = Number(id);

    if (!Number.isInteger(tripId) || tripId <= 0) {
      return NextResponse.json(
        { error: "Invalid trip ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const item = body?.item as keyof PlannerItems;

    if (!allowedItems.includes(item)) {
      return NextResponse.json(
        { error: "Invalid planner item." },
        { status: 400 }
      );
    }

    await enableTripPlannerItem(tripId, item);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Unable to enable trip planner item:",
      error
    );

    return NextResponse.json(
      { error: "Unable to add item to trip." },
      { status: 500 }
    );
  }
}