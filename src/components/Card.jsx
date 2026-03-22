import { motion } from "framer-motion";
export default function Card({ emoji, title, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="group w-[240px] p-5 rounded-2xl text-center
      bg-gradient-to-br from-[#020617]/90 to-[#020617]/60
      border border-cyan-400/30 backdrop-blur-md
      shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(34,211,238,0.2)]
      hover:scale-110 hover:-translate-y-1
      hover:border-cyan-300
      hover:shadow-[0_0_50px_rgba(34,211,238,0.6)]
      transition duration-300"
    >
      <div className="text-3xl mb-2 group-hover:scale-125 transition">
        {emoji}
      </div>

      <h3 className="text-white font-semibold">{title}</h3>
      <p className="text-gray-400 text-sm">{sub}</p>
    </motion.div>
  );
}