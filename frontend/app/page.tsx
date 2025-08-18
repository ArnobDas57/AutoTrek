"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ItineraryForm from "../components/ItineraryForm";
import ItineraryResults from "../components/ItineraryResults";
import { useState } from "react";

export default function Home() {
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-yellow-200 via-white to-blue-200">
      {/* Decorative background gradients */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255, 255, 0, 0.25), transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(0, 123, 255, 0.25), transparent 60%)
          `,
          filter: "blur(100px)",
        }}
      />

      {/* Header */}
      <header className="flex justify-center py-8 z-10">
        <Header />
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center px-4 sm:px-6 lg:px-8 z-10">
        <div className="w-full max-w-4xl bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 md:p-10">
          <ItineraryForm setItinerary={setItinerary} setLoading={setLoading} />
          <div className="mt-8">
            <ItineraryResults
              itinerary={itinerary}
              loading={loading}
              onDownload={() => {
                if (itinerary) {
                  console.log("Downloading itinerary:", itinerary);
                }
              }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 z-10">
        <Footer />
      </footer>
    </div>
  );
}
