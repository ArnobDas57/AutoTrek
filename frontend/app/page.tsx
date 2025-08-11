import Header from "../components/Header";
import Footer from "../components/Footer";
import ItineraryForm from "../components/ItineraryForm";
import ItineraryResults from "../components/ItineraryResults";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-yellow-100">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
            circle at top center,
            rgba(173, 109, 244, 0.5),
            transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="flex justify-center flex-col mx-50 z-20">
        <Header />
      </div>
      <main className="flex-grow p-6 max-w-4xl mx-auto">
        <ItineraryForm setItinerary={setItinerary} setLoading={setLoading} />
        <ItineraryResults itinerary={itinerary} loading={loading} />
      </main>

      <Footer />
    </div>
  );
}
