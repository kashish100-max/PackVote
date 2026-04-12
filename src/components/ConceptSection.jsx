import { motion } from "framer-motion";
import Pipeline from "./pipeline";

export default function ConceptSection() {
  const steps = [
    {
      title: "Many Minds. One Map.",
      desc: "Every traveler shares what they love — beaches or mountains, chill or adventure, budget or luxury. PackVote listens to every voice without bias.",
    },
    {
      title: "Intelligence Takes the Lead.",
      desc: "Instead of averaging opinions, PackVote intelligently finds the best destination that satisfies the whole group — not just the loudest choice.",
    },
    {
      title: "Your Perfect Trip, Instantly.",
      desc: "A complete itinerary is generated — curated, day-by-day, tailored to your group’s preferences. No confusion. No compromises.",
    },
  ];

  return (
    <div className="py-32" id="about">

      {/* TOP TEXT */}
      <div className="max-w-4xl mx-auto text-center mb-20 px-6">

        <p className="text-sm tracking-widest text-cyan-400 mb-4">
          THE CONCEPT
        </p>

        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Built by{" "}
          <span className="text-cyan-400">People</span>,  
          Powered by{" "}
          <span className="text-orange-400">Smart Decisions</span>.
        </h2>

        <p className="text-gray-400 text-lg">
          PackVote removes the chaos of group travel planning. Everyone shares preferences,
          and the platform intelligently finds the best common destination — no debates required.
        </p>
      </div>

      {/* STEPS */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* left content  */}
        <div className="space-y-20">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex gap-6 items-start"
          >

            {/* SIDE LINE */}
            <div className="flex flex-col items-center mt-2">
              <div className="w-[2px] h-10 bg-cyan-400"></div>
              <div className="w-[2px] h-10 bg-cyan-400/30"></div>
            </div>

            {/* TEXT */}
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                {step.title}
              </h3>

              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                {step.desc}
              </p>
            </div>

          </motion.div>
        ))}
        </div>

        {/* right content  */}
        <Pipeline />

      </div>
    </div>
  );
}