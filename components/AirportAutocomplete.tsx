"use client";

import { useEffect, useState } from "react";
import { searchAirports } from "@/lib/flightService";

type Airport = {
  iata_code: string;
  airport_name: string;
  city: string;
  display_name: string;
};

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function AirportAutocomplete({
  label,
  value,
  onChange,
}: Props) {
  const [search, setSearch] = useState(value);
  const [results, setResults] = useState<Airport[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!search.trim()) {
        setResults([]);
        return;
      }

      try {
        const airports = await searchAirports(search);
        setResults(airports);
      } catch (err) {
        console.error(err);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="relative">

      <label className="mb-2 block font-semibold">
        {label}
      </label>

      <input
        value={search}
        onFocus={() => setShowResults(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          onChange(e.target.value);
        }}
        className="w-full rounded-xl border p-3"
        placeholder="Airport code, city or airport name"
      />

      {showResults && results.length > 0 && (

        <div className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-xl border bg-white shadow-lg">

          {results.map((airport) => (

            <button
              key={airport.iata_code}
              type="button"
              onClick={() => {
                setSearch(airport.display_name);
                onChange(airport.iata_code);
                setShowResults(false);
              }}
              className="block w-full border-b px-4 py-3 text-left hover:bg-slate-100"
            >
              <div className="font-semibold">
                {airport.display_name}
              </div>

              <div className="text-sm text-slate-500">
                {airport.city}
              </div>

            </button>

          ))}

        </div>

      )}

    </div>
  );
}