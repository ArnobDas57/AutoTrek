import LoadingSpinner from "./LoadingSpinner";

export default function ItineraryResults({ itinerary, loading }) {
  if (loading) return <LoadingSpinner />;
  if (!itinerary) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Your AI-Generated Itinerary</h2>
      <pre className="whitespace-pre-wrap">{itinerary}</pre>
    </div>
  );
}
