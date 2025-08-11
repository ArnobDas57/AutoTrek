// components/ItineraryResults.tsx
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ItineraryResultsProps {
  itinerary: string | null;
  loading: boolean;
  onDownload: () => void;
}

export default function ItineraryResults({
  loading,
  itinerary,
  onDownload,
}: ItineraryResultsProps) {
  if (loading) return <LoadingSpinner />;
  if (!itinerary) return null;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg animated-fade-in space-y-4">
      <h2 className="text-xl font-bold text-white">Your Itinerary</h2>
      <pre className="text-gray-200 whitespace-pre-wrap">{itinerary}</pre>
      <button
        onClick={onDownload}
        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition"
      >
        Download PDF
      </button>
    </div>
  );
}
