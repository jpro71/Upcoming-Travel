"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createHotel,
  updateHotel,
} from "@/lib/hotelService";

import { Hotel } from "@/types/trip";

type Props = {
  tripId: number;

  defaultCheckIn: string;
  defaultCheckOut: string;

  hotel?: Hotel;
  isEditing?: boolean;
};

export default function HotelForm({
  tripId,
  defaultCheckIn,
  defaultCheckOut,
  hotel,
  isEditing = false,
}: Props) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [hotelName, setHotelName] = useState(
    hotel?.hotelName ?? ""
  );

  const [address, setAddress] = useState(
    hotel?.address ?? ""
  );

  const [phone, setPhone] = useState(
    hotel?.phone ?? ""
  );

  const [checkIn, setCheckIn] = useState(
    hotel?.checkIn ?? defaultCheckIn
  );

  const [checkOut, setCheckOut] = useState(
    hotel?.checkOut ?? defaultCheckOut
  );

  const [confirmationNumber, setConfirmationNumber] =
    useState(
      hotel?.confirmationNumber ?? ""
    );

  const [notes, setNotes] = useState(
    hotel?.notes ?? ""
  );

  function handleCheckInChange(date: string) {
    setCheckIn(date);

    if (!checkOut || checkOut < date) {
      setCheckOut(date);
    }
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!hotelName.trim()) {
      alert("Hotel name is required.");
      return;
    }

    setSaving(true);

    try {
      const hotelRecord: Hotel = {
        id: hotel?.id ?? 0,

        tripId,

        hotelName,
        address,
        phone,

        checkIn,
        checkOut,

        confirmationNumber,

        notes,

        createdAt: hotel?.createdAt,
        updatedAt: hotel?.updatedAt,
      };

      if (isEditing) {
        await updateHotel(hotelRecord);
      } else {
        await createHotel(hotelRecord);
      }

      router.push(`/trip/${tripId}`);
      router.refresh();

    } catch (err: any) {

      alert(
        err.message ??
          `Unable to ${
            isEditing ? "update" : "save"
          } hotel.`
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
          Hotel Name *
        </label>

        <input
          value={hotelName}
          onChange={(e) =>
            setHotelName(e.target.value)
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
            Check-In
          </label>

          <input
            type="date"
            value={checkIn}
            onChange={(e) =>
              handleCheckInChange(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold">
            Check-Out
          </label>

          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) =>
              setCheckOut(e.target.value)
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
              setConfirmationNumber(
                e.target.value
              )
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
                ? "Update Hotel"
                : "Save Hotel")}
        </button>

      </div>

    </form>
  );
}