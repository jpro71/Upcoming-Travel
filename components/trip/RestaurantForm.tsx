"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createRestaurant,
  updateRestaurant,
} from "@/lib/restaurantService";

import { Restaurant } from "@/types/trip";

type Props = {
  tripId: number;

  defaultReservationDate: string;

  restaurant?: Restaurant;
  isEditing?: boolean;
};

export default function RestaurantForm({
  tripId,
  defaultReservationDate,
  restaurant,
  isEditing = false,
}: Props) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [restaurantName, setRestaurantName] = useState(
    restaurant?.restaurantName ?? ""
  );

  const [address, setAddress] = useState(
    restaurant?.address ?? ""
  );

  const [phone, setPhone] = useState(
    restaurant?.phone ?? ""
  );

  const [reservationDate, setReservationDate] = useState(
    restaurant?.reservationDate ?? defaultReservationDate
  );

  const [reservationTime, setReservationTime] = useState(
    restaurant?.reservationTime ?? ""
  );

  const [confirmationNumber, setConfirmationNumber] =
    useState(
      restaurant?.confirmationNumber ?? ""
    );

  const [notes, setNotes] = useState(
    restaurant?.notes ?? ""
  );

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!restaurantName.trim()) {
      alert("Restaurant name is required.");
      return;
    }

    setSaving(true);

    try {
      const restaurantRecord: Restaurant = {
        id: restaurant?.id ?? 0,

        tripId,

        restaurantName,
        address: address || undefined,
        phone: phone || undefined,

        reservationDate: reservationDate || undefined,
        reservationTime: reservationTime || undefined,

        confirmationNumber:
          confirmationNumber || undefined,

        notes: notes || undefined,

        createdAt: restaurant?.createdAt,
        updatedAt: restaurant?.updatedAt,
      };

      if (isEditing) {
        await updateRestaurant(restaurantRecord);
      } else {
        await createRestaurant(restaurantRecord);
      }

      router.push(`/trip/${tripId}`);
      router.refresh();

    } catch (err: any) {

      alert(
        err.message ??
          `Unable to ${
            isEditing ? "update" : "save"
          } restaurant.`
      );

    } finally {

      setSaving(false);

    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white p-8 shadow-md"
    >

      <div>

        <label className="mb-2 block font-semibold">
          Restaurant Name *
        </label>

        <input
          value={restaurantName}
          onChange={(e) =>
            setRestaurantName(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 p-3"
          required
        />

      </div>

      <div>

        <label className="mb-2 block font-semibold">
          Address
        </label>

        <input
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 p-3"
        />

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-semibold">
            Reservation Date
          </label>

          <input
            type="date"
            value={reservationDate}
            onChange={(e) =>
              setReservationDate(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold">
            Reservation Time
          </label>

          <input
            type="time"
            value={reservationTime}
            onChange={(e) =>
              setReservationTime(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          />

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-semibold">
            Confirmation Number
          </label>

          <input
            value={confirmationNumber}
            onChange={(e) =>
              setConfirmationNumber(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold">
            Phone Number
          </label>

          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          />

        </div>

      </div>

      <div>

        <label className="mb-2 block font-semibold">
          Notes
        </label>

        <textarea
          rows={5}
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 p-3"
        />

      </div>

      <div className="flex justify-end">

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {saving
            ? (isEditing
                ? "Updating..."
                : "Saving...")
            : (isEditing
                ? "Update Restaurant"
                : "Save Restaurant")}
        </button>

      </div>

    </form>
  );
}