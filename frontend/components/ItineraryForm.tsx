import { useState } from "react";

export default function ItineraryForm({ setItinerary, setLoading }) {
  const [location, setLocation] = useState("");
  const [days, setDays] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setItinerary(null);

    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, days }),
      });

      const data = await res.json();
      setItinerary(data.itinerary);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md mb-6"
    >
      <label className="block mb-2">
        Destination:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full mt-1 rounded"
          placeholder="e.g. Tokyo, Japan"
          required
        />
      </label>

      <label className="block mb-4">
        Number of Days:
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="border p-2 w-full mt-1 rounded"
          min="1"
          required
        />
      </label>

      <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
      >
        Generate Itinerary
      </button>
    </form>
  );
}
