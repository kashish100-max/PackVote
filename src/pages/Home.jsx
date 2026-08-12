import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import { motion } from "framer-motion";
import { Users, Brain, MapPin } from "lucide-react";
import WhyCards from "../components/WhyCards";
import ConceptSection from "../components/ConceptSection";

export default function Home() {
  return (
    <div>
      <Navbar />
        <Carousel />
        <ConceptSection />

<div className="py-28 px-6 md:px-20">

  {/* TITLE */}
  <div className="text-center mb-20" id="how">
    <p className="text-cyan-400 text-sm tracking-widest mb-4">
  SIMPLE PROCESS
</p>

<h2 className="text-4xl md:text-5xl font-bold mb-4">
  <span className="text-white">How </span>
  <span className="text-cyan-400">PackVote </span>
  <span className="text-orange-400">Works</span>
</h2>
    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
      Plan smarter, faster, and together. Your perfect group trip in 3 simple steps.
    </p>
  </div>

  {/* CARDS */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="grid md:grid-cols-3 gap-10"
  >

    {/* CARD 1 */}
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl 
    hover:scale-105 transition duration-500 
    hover:border-[#22d3ee]/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">

      <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-xl bg-[#22d3ee]/10">
        <Users className="text-[#22d3ee]" />
      </div>

      <h3 className="text-xl font-semibold mb-3">
        Everyone Shares Preferences
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        Each group member enters their budget, dream climate, favorite activities, and travel style.
      </p>

      <span className="absolute top-6 right-6 text-white/10 text-5xl font-bold">
        01
      </span>
    </div>

    {/* CARD 2 */}
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl 
    hover:scale-105 transition duration-500 
    hover:border-[#f97316]/40 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)]">

      <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-xl bg-[#f97316]/10">
        <Brain className="text-[#f97316]" />
      </div>

      <h3 className="text-xl font-semibold mb-3">
        AI Analyzes & Scores
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        Our ML system finds common ground and ranks destinations for the best group match.
      </p>

      <span className="absolute top-6 right-6 text-white/10 text-5xl font-bold">
        02
      </span>
    </div>

    {/* CARD 3 */}
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl 
    hover:scale-105 transition duration-500 
    hover:border-[#22c55e]/40 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]">

      <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-xl bg-[#22c55e]/10">
        <MapPin className="text-[#22c55e]" />
      </div>

      <h3 className="text-xl font-semibold mb-3">
        Get Your Perfect Itinerary
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        Get a personalized itinerary with activities, food, and experiences for everyone.
      </p>

      <span className="absolute top-6 right-6 text-white/10 text-5xl font-bold">
        03
      </span>
    </div>

  </motion.div>
</div>

      <WhyCards />

<div className="relative bg-transparent">

  {/* TOP FADE (ADD HERE) */}
  <div className="absolute top-0 left-0 w-full h-20 bg-transparent"></div>
        <motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="py-20 px-10 text-center bg-transparent"
>
  <h2 className="text-4xl font-bold mb-4">
    Travel Planning Made Easy
  </h2>
  <p className="text-gray-400 max-w-xl mx-auto">
    PackVote helps your group choose the best destination based on everyone's preferences.
  </p>
</motion.div>
</div>
      <Footer />
    </div>
  );
}