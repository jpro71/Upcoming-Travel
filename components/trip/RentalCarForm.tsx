"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createRentalCar,
  updateRentalCar,
} from "@/lib/rentalCarService";

import { RentalCar } from "@/types/trip";
import TimePicker from "@/components/trip/flight/TimePicker";

type Props = {
  tripId: number;
  rentalCar?: RentalCar;
  defaultPickupDate?: string;
  defaultDropoffDate?: string;
};

function extractDate(value?: string | null) {
  return value ? value.substring(0, 10) : "";
}

function extractTime(value?: string | null) {
  return value ? value.substring(11, 16) : "";
}

function combineDateTime(
  date: string,
  time: string
): string {
  return date
    ? `${date}T${time || "00:00"}:00`
    : "";
}

export default function RentalCarForm({
  tripId,
  rentalCar,
  defaultPickupDate,
  defaultDropoffDate,
}: Props) {
  const router = useRouter();

  const [rentalCompany, setRentalCompany] = useState(
    rentalCar?.rentalCompany ?? ""
  );

  const [confirmationNumber, setConfirmationNumber] =
    useState(rentalCar?.confirmationNumber ?? "");

  const [pickupLocation, setPickupLocation] = useState(
    rentalCar?.pickupLocation ?? ""
  );

  const [pickupDate, setPickupDate] = useState(
    extractDate(rentalCar?.pickupAt) ||
      defaultPickupDate ||
      ""
  );

  const [pickupTime, setPickupTime] = useState(
    extractTime(rentalCar?.pickupAt)
  );

  const [dropoffLocation, setDropoffLocation] = useState(
    rentalCar?.dropoffLocation ?? ""
  );

  const [dropoffDate, setDropoffDate] = useState(
    extractDate(rentalCar?.dropoffAt) ||
      defaultDropoffDate ||
      ""
  );

  const [dropoffTime, setDropoffTime] = useState(
    extractTime(rentalCar?.dropoffAt)
  );

  const [vehicleType, setVehicleType] = useState(
    rentalCar?.vehicleType ?? ""
  );

  const [totalCost, setTotalCost] = useState(
    rentalCar?.totalCost?.toString() ?? ""
  );

  const [notes, setNotes] = useState(
    rentalCar?.notes ?? ""
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handlePickupDateChange(date: string) {
    setPickupDate(date);

    if (!dropoffDate || dropoffDate < date) {
      setDropoffDate(date);
    }
  }

  function handlePickupTimeChange(time: string) {
    setPickupTime(time);

    if (!dropoffTime) {
      setDropoffTime(time);
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!rentalCompany.trim()) {
      setError("Rental company is required.");
      return;
    }

    if (
      pickupDate &&
      dropoffDate &&
      dropoffDate < pickupDate
    ) {
      setError(
        "Return date cannot be earlier than the pickup date."
      );
      return;
    }

    if (
      pickupDate &&
      dropoffDate &&
      pickupDate === dropoffDate &&
      pickupTime &&
      dropoffTime &&
      dropoffTime < pickupTime
    ) {
      setError(
        "Return time cannot be earlier than the pickup time."
      );
      return;
    }

    setSaving(true);
    setError("");

    try {
      const rentalCarData: RentalCar = {
        id: rentalCar?.id ?? 0,
        tripId,

        rentalCompany: rentalCompany.trim(),

        confirmationNumber:
          confirmationNumber.trim(),

        pickupLocation:
          pickupLocation.trim(),

        pickupAt: combineDateTime(
          pickupDate,
          pickupTime
        ),

        dropoffLocation:
          dropoffLocation.trim(),

        dropoffAt: combineDateTime(
          dropoffDate,
          dropoffTime
        ),

        vehicleType:
          vehicleType.trim(),

        totalCost:
          totalCost.trim() === ""
            ? undefined
            : Number(totalCost),

        notes: notes.trim(),

        createdAt: rentalCar?.createdAt,
        updatedAt: rentalCar?.updatedAt,
      };

      if (rentalCar) {
        await updateRentalCar(rentalCarData);
      } else {
        await createRentalCar(rentalCarData);
      }

      router.push(`/trip/${tripId}`);
      router.refresh();
    } catch (err) {
      console.error(
        "Unable to save rental car:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save the rental car."
      );

      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-8 shadow-md"
    >
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-semibold">
            Rental Company *
          </label>

          <input
            value={rentalCompany}
            onChange={(e) =>
              setRentalCompany(e.target.value)
            }
            className={inputClass}
            placeholder="Enterprise, Hertz, National..."
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Confirmation Number
          </label>

          <input
            value={confirmationNumber}
            onChange={(e) =>
              setConfirmationNumber(e.target.value)
            }
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Pickup Location
          </label>

          <input
            value={pickupLocation}
            onChange={(e) =>
              setPickupLocation(e.target.value)
            }
            className={inputClass}
            placeholder="Airport, hotel, address..."
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Vehicle Type
          </label>

          <input
            value={vehicleType}
            onChange={(e) =>
              setVehicleType(e.target.value)
            }
            className={inputClass}
            placeholder="Midsize SUV, Full Size..."
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Pickup Date
          </label>

          <input
            type="date"
            value={pickupDate}
            onChange={(e) =>
              handlePickupDateChange(e.target.value)
            }
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Pickup Time
          </label>

          <TimePicker
            value={pickupTime}
            onChange={handlePickupTimeChange}
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Return Location
          </label>

          <input
            value={dropoffLocation}
            onChange={(e) =>
              setDropoffLocation(e.target.value)
            }
            className={inputClass}
            placeholder="Airport, hotel, address..."
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Total Cost
          </label>

          <div className="relative">
            <span className="absolute left-3 top-3 text-slate-500">
              $
            </span>

            <input
              type="number"
              min="0"
              step="0.01"
              value={totalCost}
              onChange={(e) =>
                setTotalCost(e.target.value)
              }
              className={`${inputClass} pl-7`}
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Return Date
          </label>

          <input
            type="date"
            value={dropoffDate}
            min={pickupDate}
            onChange={(e) =>
              setDropoffDate(e.target.value)
            }
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Return Time
          </label>

          <TimePicker
            value={dropoffTime}
            onChange={setDropoffTime}
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-semibold">
            Notes
          </label>

          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            className={`${inputClass} min-h-32`}
            placeholder="Insurance, loyalty number, special instructions..."
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : rentalCar
              ? "Save Changes"
              : "Add Rental Car"}
        </button>
      </div>
    </form>
  );
}