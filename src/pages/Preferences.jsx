import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import {
  Flower, Mountain, PartyPopper, Smile,
  Users, User, Home,
  Snowflake, Sun, Cloud,
  Utensils, MapPin, Copy, Heart,Salad,UtensilsCrossed,LandPlot,MapPinHouse
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Preferences() {

  const [tripCode, setTripCode] = useState("");
  const [name, setName] = useState("");
  const [mood, setMood] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [budget, setBudget] = useState(10000);
  const [duration, setDuration] = useState(3);
  const [budgetType, setBudgetType] = useState("");
  const [climate, setClimate] = useState("");
  const [food, setFood] = useState("");
  const [distance, setDistance] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const existingCode = queryParams.get("code");

  useEffect(() => {
  if (existingCode) {
    // If a code comes from the Join page, use it!
    setTripCode(existingCode);
  } else {
    // Otherwise, generate a new one (your current logic)
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setTripCode(newCode);
  }
}, [existingCode]);

  const copyCode = () => {
  navigator.clipboard.writeText(tripCode);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

  const required = [name, mood, travelStyle, budgetType, climate, food, distance];
  const navigate = useNavigate();

  const progress = useMemo(() => {
    const filled = required.filter(Boolean).length;
    return Math.round((filled / required.length) * 100);
  }, [required]);

  const handleSubmit = async () => {
    if (required.some(f => !f)) {
      setError("⚠️ Please fill all required fields");
      return;
    }

    const data = {
      tripCode, name, mood, travelStyle,
      budget, duration, budgetType,
      climate, food, distance
    };

    await fetch("http://localhost:5000/api/preferences/save", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
});
    navigate(`/Success?code=${tripCode}`);
  };

  const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const getBudgetType = (budget) => {
  if (budget <= 10000) return "Low";
  if (budget <= 30000) return "Medium";
  return "Luxury";
};

useEffect(() => {
  setBudgetType(getBudgetType(budget));
}, [budget]);

  const chip = (selected, value) =>
    `flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition
    ${
      selected === value
        ? "bg-cyan-400/20 border border-cyan-400 text-cyan-300"
        : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
    }`;

    useEffect(() => {
  if (!required.some(f => !f)) {
    setError("");
  }
}, [name, mood, travelStyle, budgetType, climate, food, distance]);

  return (
    <div className="bg-[#050b14] text-white">

      {/* TOP BAR */}
      <div className="fixed top-0 w-full px-6 py-4 bg-black/40 backdrop-blur-xl z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button onClick={() => window.history.back()} className="text-white/70">← Back</button>

          <div className="flex items-center gap-3">
            <div className="w-40 h-1 bg-white/10 rounded-full">
              <div style={{ width: `${progress}%` }}
                className="h-full bg-cyan-400 transition-all"></div>
            </div>
            <span className="text-sm text-white/60">{progress}%</span>
          </div>
        </div>
      </div>

      {/* TRIP CODE */}
      <div className="pt-28 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-cyan-400/10 to-blue-500/10 
        border border-cyan-400/20 rounded-2xl p-8 text-center shadow-[0_0_30px_rgba(34,211,238,0.2)]">

          <p className="text-xs text-cyan-400 tracking-widest mb-3">
            YOUR TRIP CODE
          </p>

          <div className="flex justify-center items-center gap-3 text-4xl font-bold tracking-widest">
  {tripCode}

  <Copy
    size={18}
    onClick={copyCode}
    className="cursor-pointer opacity-70 hover:opacity-100 hover:text-cyan-400 transition"
  />
</div>
{copied && (
  <p className="text-green-400 text-sm mt-2">
    Copied to clipboard!
  </p>
)}

          <p className="text-gray-400 text-sm mt-3">
            Share this code with your group
          </p>
        </div>
      </div>

      {/* HERO */}
      <div className="text-center mt-12 px-6">
        <h1 className="text-5xl font-bold">
          <span className="text-orange-400">Your Journey, Our AI</span>
          <br />
          <span className="text-white">Tell Us How </span>
          <span className="text-cyan-400">You Travel</span>
        </h1>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          Your inputs power our AI model to predict the best destination for your group.
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-5xl mx-auto px-6 mt-16 space-y-8">

        {/* NAME */}
        <motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="bg-white/5 border border-white/10 rounded-2xl p-6"
>
          <label className="text-gray-400 text-sm">
            Your Name *
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What should we call you?"
            className="w-full mt-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 outline-none"
          />
        </motion.div>

        {/* MOOD */}
        <motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="bg-white/5 border border-white/10 rounded-2xl p-6"
>
          <p className="mb-3">Mood *</p>
          <div className="flex gap-3 flex-wrap">
            {[
              { name: "Relax", icon: <Flower className="text-cyan-400" size={14}/> },
              { name: "Adventure", icon: <Mountain className="text-orange-400" size={14}/> },
              { name: "Party", icon: <PartyPopper className="text-pink-400" size={14}/> },
              { name: "Spiritual", icon: <Smile className="text-yellow-400" size={14}/> }
            ].map(item => (
              <div key={item.name} onClick={() => setMood(item.name)} className={chip(mood, item.name)}>
                {item.icon} {item.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* TRAVEL STYLE */}
        <motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="bg-white/5 border border-white/10 rounded-2xl p-6"
>
          <p className="mb-3">Travel Style *</p>
          <div className="flex gap-3 flex-wrap">
            {[
              { name: "Solo", icon: <User className="text-cyan-400" size={14}/> },
              { name: "Couple", icon: <Heart className="text-pink-400" size={14}/> },
              { name: "Friends", icon: <Users className="text-orange-400" size={14}/> },
              { name: "Family", icon: <Home className="text-green-400" size={14}/> }
            ].map(item => (
              <div key={item.name} onClick={() => setTravelStyle(item.name)} className={chip(travelStyle, item.name)}>
                {item.icon} {item.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* BUDGET + DURATION */}
        <motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="bg-white/5 border border-white/10 rounded-2xl p-6 grid md:grid-cols-2 gap-8"
>

          <div>
            <p>
  Budget ₹{budget} 
  <span className="ml-2 text-cyan-400">
    ({budgetType}) *
  </span>
</p>
            <input type="range" min="2000" max="50000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full accent-cyan-400 mt-2"
            />
          </div>

          <div>
            <p>Duration {duration} days</p>
            <input type="range" min="1" max="10"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full accent-orange-400 mt-2"
            />
          </div>

        </motion.div>

        {/* OTHER */}
        <motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="bg-white/5 border border-white/10 rounded-2xl p-6 grid md:grid-cols-3 gap-8"
>

          <div>
            <p>Climate *</p>
            <div className="flex gap-2 flex-wrap mt-2">
              {[
              { name: "Cold", icon: <Snowflake className="text-cyan-400" size={14}/> },
              { name: "Warm", icon: <Sun className="text-orange-400" size={14}/> },
              { name: "Moderate", icon: <Cloud className="text-blue-400" size={14}/> }
            ].map(item => (
              <div key={item.name} onClick={() => setClimate(item.name)} className={chip(climate, item.name)}>
                {item.icon} {item.name}
              </div>
            ))}
            </div>
          </div>

          <div>
            <p>Food *</p>
            <div className="flex gap-2 flex-wrap mt-2">
              {[
              { name: "Veg", icon: <Salad className="text-green-400" size={14}/> },
              { name: "Non-Veg", icon: <Utensils className="text-orange-400" size={14}/> },
              { name: "Mix", icon: <UtensilsCrossed className="text-purple-400" size={14}/> }
            ].map(item => (
              <div key={item.name} onClick={() => setFood(item.name)} className={chip(food, item.name)}>
                {item.icon} {item.name}
              </div>
            ))}
            </div>
          </div>

          <div>
            <p>Distance *</p>
            <div className="flex gap-2 flex-wrap mt-2">
              {[
              { name: "Nearby", icon: <MapPin className="text-pink-400" size={14}/> },
              { name: "Moderate", icon: <LandPlot className="text-green-400" size={14}/> },
              { name: "Far", icon: <MapPinHouse className="text-blue-400" size={14}/> }
            ].map(item => (
              <div key={item.name} onClick={() => setDistance(item.name)} className={chip(distance, item.name)}>
                {item.icon} {item.name}
              </div>
            ))}
            </div>
          </div>

        </motion.div>

        {error && <p className="text-red-400 text-center">{error}</p>}

        {/* CTA */}
        <motion.div className="text-center pt-10" variants={fadeUp} initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="px-10 py-4 rounded-full 
            bg-gradient-to-r from-cyan-400 to-blue-500 
            text-black font-semibold text-lg
            shadow-[0_0_20px_rgba(34,211,238,0.5)]"
          >
            Generate AI Trip Plan
          </motion.button>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
}