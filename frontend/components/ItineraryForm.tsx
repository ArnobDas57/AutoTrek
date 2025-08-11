// components/ItineraryForm.tsx
import React, { useState } from "react";

export default function ItineraryForm({
  setItinerary,
  setLoading,
}: {
  setItinerary: (t: string | null) => void;
  setLoading: (b: boolean) => void;
}) {
  const [days, setDays] = useState(5);
  const [location, setLocation] = useState("");
  const [month, setMonth] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !month) return;
    setLoading(true);
    setItinerary(null);

    try {
      const res = await fetch("/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days, location, month }),
      });
      const data = await res.json();
      setItinerary(data.itinerary);
    } catch {
      alert("Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
    >
      <label className="block relative">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="peer bg-gray-700 text-white p-3 rounded outline-none w-full"
          placeholder=" "
          required
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-400 transition-all pointer-events-none">
          Destination (e.g. Paris)
        </span>
      </label>

      <label className="block relative">
        <input
          type="number"
          min={1}
          max={30}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="peer bg-gray-700 text-white p-3 rounded outline-none w-full"
          placeholder=" "
          required
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-400 transition-all pointer-events-none">
          Days
        </span>
      </label>

      <label className="block relative">
        <input
          type="text"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="peer bg-gray-700 text-white p-3 rounded outline-none w-full"
          placeholder=" "
          required
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-indigo-400 transition-all pointer-events-none">
          Month
        </span>
      </label>

      <button
        type="submit"
        className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition"
      >
        Generate Itinerary
      </button>
    </form>
  );
}
