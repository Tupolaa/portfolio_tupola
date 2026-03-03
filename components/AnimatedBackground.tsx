export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0a]">
      {/* Large cyan blob - top left */}
      <div
        className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 221, 0.15) 0%, transparent 70%)",
          animation: "blob1 8s ease-in-out infinite",
        }}
      />
      {/* Blue blob - top right */}
      <div
        className="absolute -top-20 -right-20 h-[450px] w-[450px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(30, 144, 255, 0.18) 0%, transparent 70%)",
          animation: "blob2 10s ease-in-out infinite",
        }}
      />
      {/* Purple blob - center left */}
      <div
        className="absolute top-[30%] -left-20 h-[550px] w-[550px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
          animation: "blob3 12s ease-in-out infinite",
        }}
      />
      {/* Teal blob - center right */}
      <div
        className="absolute top-[40%] -right-32 h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(14, 181, 241, 0.14) 0%, transparent 70%)",
          animation: "blob4 9s ease-in-out infinite",
        }}
      />
      {/* Cyan light - mid page */}
      <div
        className="absolute top-[55%] left-[20%] h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 221, 0.1) 0%, transparent 70%)",
          animation: "blob2 11s ease-in-out infinite reverse",
        }}
      />
      {/* Deep blue blob - bottom left */}
      <div
        className="absolute -bottom-32 -left-20 h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.16) 0%, transparent 70%)",
          animation: "blob1 13s ease-in-out infinite reverse",
        }}
      />
      {/* Warm purple - bottom right */}
      <div
        className="absolute -bottom-20 -right-32 h-[450px] w-[450px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
          animation: "blob3 10s ease-in-out infinite reverse",
        }}
      />
      {/* Small bright accent - floating */}
      <div
        className="absolute top-[15%] left-[60%] h-[250px] w-[250px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 221, 0.08) 0%, transparent 60%)",
          animation: "blob4 7s ease-in-out infinite",
        }}
      />
      {/* Small blue accent - floating lower */}
      <div
        className="absolute top-[70%] left-[45%] h-[300px] w-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(14, 181, 241, 0.1) 0%, transparent 60%)",
          animation: "blob1 8s ease-in-out infinite",
        }}
      />
      {/* Subtle noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}
