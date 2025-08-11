import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white text-center p-3 mt-8">
      <p>© {new Date().getFullYear()} AI Itinerary Generator</p>
    </footer>
  );
};
