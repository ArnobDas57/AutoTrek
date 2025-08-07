import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative bg-white">
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
        <h1 className="text-6xl text-violet-800 font-bold">AutoTrek</h1>
        <h3 className="text-3xl text-black font-bold">
          Travel Planning Itinerary Generator
        </h3>
      </div>
    </div>
  );
}
