export default function Card({ emoji, title, sub, highlighted }) {
  return (
    <div
      className={`group w-[200px] p-5 rounded-2xl text-center
      bg-gradient-to-br from-[#020617]/90 to-[#020617]/60
      border backdrop-blur-md
      transition duration-300
      ${highlighted
        ? "border-cyan-300 shadow-[0_0_50px_rgba(34,211,238,0.6)] scale-105"
        : "border-cyan-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(34,211,238,0.2)]"
      }`}
    >
      <div className={`text-3xl mb-2 transition ${highlighted ? "scale-125" : ""}`}>
        {emoji}
      </div>
      <h3 className="text-white font-semibold">{title}</h3>
      <p className="text-gray-400 text-sm">{sub}</p>
    </div>
  );
}