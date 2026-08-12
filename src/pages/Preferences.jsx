import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import {
  Mountain, PartyPopper, Smile,
  Users, User, Home,
  Snowflake, Sun, Cloud,
  Utensils, MapPin, Copy, Heart, Salad, UtensilsCrossed,
  Flower2, BookOpen, Compass, Wallet,
  Volume2, Languages, Star, Sparkles, Tent
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const API_URL =import.meta.env.VITE_API_URL;


export default function Preferences() {
  const navigate = useNavigate();
  const [tripIntent, setTripIntent] = useState("");
  const [secondaryIntent, setSecondaryIntent] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [budget, setBudget] = useState(10000);
  const [duration, setDuration] = useState(3);
  const [budgetType, setBudgetType] = useState("");
  const [climate, setClimate] = useState("");
  const [food, setFood] = useState("");
  const [crowdPreference, setCrowdPreference] = useState("");
  const [languageComfort, setLanguageComfort] = useState("");
  const [priority, setPriority] = useState("");
  const [copied, setCopied] = useState(false);
  const [tripError, setTripError] = useState("");

  // errors only for the 5 important fields
  const [errors, setErrors] = useState({
    name: false,
    tripIntent: false,
    travelStyle: false,
    climate: false,
    priority: false,
  });

  const nameRef = useRef(null);
  const tripIntentRef = useRef(null);
  const travelStyleRef = useRef(null);
  const climateRef = useRef(null);
  const priorityRef = useRef(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const existingCode = queryParams.get("code");
  const memberIdFromUrl = queryParams.get("memberId");
  const memberName = queryParams.get("name");

  const [tripCode, setTripCode] = useState(existingCode || "");
  const [memberId, setMemberId] = useState(memberIdFromUrl || "");
  const [name, setName] = useState(memberName || "");

  useEffect(() => {
  const loadExistingTrip = async () => {
    try {
      if (!existingCode) return;

      const response = await fetch(
        `${API_URL}/api/trips/${existingCode}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Trip not found");
      }

      setTripCode(data.trip.tripCode);

    } catch (err) {
      console.error("Trip loading failed:", err);
      setTripError(err.message);
    }
  };

  loadExistingTrip();
}, [existingCode]);

  const copyCode = () => {
    navigator.clipboard.writeText(tripCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Progress tracks only the 5 important fields
  // budget is a slider so always has a value — always counts as filled
  const importantFilled = [name, tripIntent, travelStyle, climate, priority].filter(Boolean).length + 1;
  const progress = Math.round((importantFilled / 6) * 100);

  // Clear individual errors as user fills them
  useEffect(() => {
    if (name) setErrors(prev => ({ ...prev, name: false }));
  }, [name]);
  useEffect(() => {
    if (tripIntent) setErrors(prev => ({ ...prev, tripIntent: false }));
  }, [tripIntent]);
  useEffect(() => {
    if (travelStyle) setErrors(prev => ({ ...prev, travelStyle: false }));
  }, [travelStyle]);
  useEffect(() => {
    if (climate) setErrors(prev => ({ ...prev, climate: false }));
  }, [climate]);
  useEffect(() => {
    if (priority) setErrors(prev => ({ ...prev, priority: false }));
  }, [priority]);

  const handleSubmit = async () => {
    const newErrors = {
      name: !name,
      tripIntent: !tripIntent,
      travelStyle: !travelStyle,
      climate: !climate,
      priority: !priority,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      // scroll to the first field that has an error
      const refMap = {
        name: nameRef,
        tripIntent: tripIntentRef,
        travelStyle: travelStyleRef,
        climate: climateRef,
        priority: priorityRef,
      };
      for (const key of ["name", "tripIntent", "travelStyle", "climate", "priority"]) {
        if (newErrors[key] && refMap[key].current) {
          refMap[key].current.scrollIntoView({ behavior: "smooth", block: "center" });
          break;
        }
      }
      return;
    }

    let currentTripCode = tripCode;
    let currentMemberId = memberId;

    if (!currentTripCode) {
  if (!name.trim()) {
    alert("Please enter your name.");
    return;
  }

  try {
    const tripResponse = await fetch(`${API_URL}/api/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
      }),
    });

    const tripData = await tripResponse.json();

    if (!tripResponse.ok) {
      throw new Error(
        tripData.message || "Failed to create trip"
      );
    }

    currentTripCode = tripData.trip.tripCode;
    currentMemberId = tripData.trip.memberId;

    setTripCode(currentTripCode);
    setMemberId(currentMemberId);

  } catch (err) {
    console.error("Trip creation failed:", err);
    alert(err.message);
    return;
  }
}

    const data = {
      tripCode: currentTripCode,
      memberId: currentMemberId,
      name,
      trip_intent: tripIntent,
      secondary_intent: secondaryIntent,
      group_type: travelStyle,
      budget_per_person: budget,
      duration_days: duration,
      budgetType,
      climate_preference: climate,
      food_preference: food,
      crowd_preference: crowdPreference,
      language_comfort: languageComfort,
      priority
    };

      const response = await fetch(`${API_URL}/api/preferences/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(
        result.message || result.error || "Failed to save preferences"
      );
    }
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
    ${selected === value
      ? "bg-cyan-400/20 border border-cyan-400 text-cyan-300"
      : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
    }`;

  const cardBorder = (hasError) =>
    `bg-white/5 border rounded-2xl p-6 transition-all ${
      hasError ? "border-red-500/70 shadow-[0_0_12px_rgba(239,68,68,0.2)]" : "border-white/10"
    }`;

  const errorMsg = (msg) => (
    <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
      <span>⚠</span> {msg}
    </p>
  );

  const requiredBadge = (
    <span className="text-red-400 text-sm font-bold">*</span>
  );

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
          <p className="text-xs text-cyan-400 tracking-widest mb-3">YOUR TRIP CODE</p>
          {tripError ? (
  <div className="text-center">
    <p className="text-red-400 text-lg font-semibold">
      ⚠️ {tripError}
    </p>

    <p className="text-gray-400 text-sm mt-2">
      Please check the trip code and try again.
    </p>
  </div>
) : (
  <>
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
  </>
)}
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

        {/* NAME — REQUIRED */}
        <motion.div
          ref={nameRef}
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={cardBorder(errors.name)}
        >
          <label className="text-white text-sm flex items-center gap-2">
            Your Name {requiredBadge}
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What should we call you?"
            className={`w-full mt-2 px-5 py-3 rounded-xl bg-white/5 border outline-none transition
              ${errors.name ? "border-red-500/70 focus:border-red-400" : "border-white/10 focus:border-cyan-400"}`}
          />
          {errors.name && errorMsg("Name is required to identify you in the group.")}
        </motion.div>

        {/* PRIMARY TRIP INTENT — REQUIRED */}
        <motion.div
          ref={tripIntentRef}
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={cardBorder(errors.tripIntent)}
        >
          <p className="mb-3 flex items-center gap-2">Trip Vibe {requiredBadge}</p>
          <div className="flex gap-3 flex-wrap">
            {[
              { name: "Adventure",  icon: <Mountain className="text-orange-400" size={14}/> },
              { name: "Cultural",   icon: <BookOpen className="text-yellow-400" size={14}/> },
              { name: "Relaxation", icon: <Flower2 className="text-cyan-400" size={14}/> },
              { name: "Romantic",   icon: <Heart className="text-pink-400" size={14}/> },
              { name: "Spiritual",  icon: <Smile className="text-purple-400" size={14}/> },
              { name: "Party",      icon: <PartyPopper className="text-green-400" size={14}/> }
            ].map(item => (
              <div key={item.name} onClick={() => setTripIntent(item.name)} className={chip(tripIntent, item.name)}>
                {item.icon} {item.name}
              </div>
            ))}
          </div>
          {errors.tripIntent && errorMsg("Please select your trip vibe — it's the biggest factor in our AI model.")}
        </motion.div>

        {/* SECONDARY INTENT — OPTIONAL */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <p className="mb-1">Secondary Vibe <span className="text-white/40 text-sm ml-1">(optional)</span></p>
          <p className="text-gray-500 text-xs mb-3">Add a second flavour to your trip</p>
          <div className="flex gap-3 flex-wrap">
            {[
              { name: "Adventure",  icon: <Mountain className="text-orange-400" size={14}/> },
              { name: "Cultural",   icon: <BookOpen className="text-yellow-400" size={14}/> },
              { name: "Relaxation", icon: <Flower2 className="text-cyan-400" size={14}/> },
              { name: "Romantic",   icon: <Heart className="text-pink-400" size={14}/> },
              { name: "Spiritual",  icon: <Smile className="text-purple-400" size={14}/> },
              { name: "Party",      icon: <PartyPopper className="text-green-400" size={14}/> }
            ].map(item => (
              <div key={item.name} onClick={() => setSecondaryIntent(secondaryIntent === item.name ? "" : item.name)} className={chip(secondaryIntent, item.name)}>
                {item.icon} {item.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* TRAVEL STYLE — REQUIRED */}
        <motion.div
          ref={travelStyleRef}
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={cardBorder(errors.travelStyle)}
        >
          <p className="mb-3 flex items-center gap-2">Group Type {requiredBadge}</p>
          <div className="flex gap-3 flex-wrap">
            {[
              { name: "Solo",    icon: <User className="text-cyan-400" size={14}/> },
              { name: "Couple",  icon: <Heart className="text-pink-400" size={14}/> },
              { name: "Friends", icon: <Users className="text-orange-400" size={14}/> },
              { name: "Family",  icon: <Home className="text-green-400" size={14}/> }
            ].map(item => (
              <div key={item.name} onClick={() => setTravelStyle(item.name)} className={chip(travelStyle, item.name)}>
                {item.icon} {item.name}
              </div>
            ))}
          </div>
          {errors.travelStyle && errorMsg("Group type changes the entire recommendation — Friends vs Family matters a lot.")}
        </motion.div>

        {/* BUDGET + DURATION */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 grid md:grid-cols-2 gap-8"
        >
          <div>
            <p className="flex items-center gap-2">
              Budget ₹{budget}
              <span className="ml-1 text-cyan-400">({budgetType})</span>
              {requiredBadge}
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

        {/* CLIMATE + FOOD + CROWD */}
        <motion.div
          ref={climateRef}
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`rounded-2xl p-6 grid md:grid-cols-3 gap-8 transition-all ${
            errors.climate
              ? "bg-white/5 border border-red-500/70 shadow-[0_0_12px_rgba(239,68,68,0.2)]"
              : "bg-white/5 border border-white/10"
          }`}
        >
          <div>
            <p className="flex items-center gap-2">Climate {requiredBadge}</p>
            <div className="flex gap-2 flex-wrap mt-2">
              {[
                { name: "Cold",     icon: <Snowflake className="text-cyan-400" size={14}/> },
                { name: "Warm",     icon: <Sun className="text-orange-400" size={14}/> },
                { name: "Moderate", icon: <Cloud className="text-blue-400" size={14}/> }
              ].map(item => (
                <div key={item.name} onClick={() => setClimate(item.name)} className={chip(climate, item.name)}>
                  {item.icon} {item.name}
                </div>
              ))}
            </div>
            {errors.climate && errorMsg("Pahad ya Beach? Climate decide karta hai.")}
          </div>

          <div>
            <p>Food</p>
            <div className="flex gap-2 flex-wrap mt-2">
              {[
                { name: "Veg",     icon: <Salad className="text-green-400" size={14}/> },
                { name: "Non-Veg", icon: <Utensils className="text-orange-400" size={14}/> },
                { name: "Mixed",   icon: <UtensilsCrossed className="text-purple-400" size={14}/> }
              ].map(item => (
                <div key={item.name} onClick={() => setFood(item.name)} className={chip(food, item.name)}>
                  {item.icon} {item.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p>Crowd Preference</p>
            <div className="flex gap-2 flex-wrap mt-2">
              {[
                { name: "Peaceful", icon: <Tent className="text-pink-400" size={14}/> },
                { name: "Moderate", icon: <MapPin className="text-green-400" size={14}/> },
                { name: "Crowded",  icon: <Users className="text-blue-400" size={14}/> }
              ].map(item => (
                <div key={item.name} onClick={() => setCrowdPreference(item.name)} className={chip(crowdPreference, item.name)}>
                  {item.icon} {item.name}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* LANGUAGE + PRIORITY */}
        <motion.div
          ref={priorityRef}
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`rounded-2xl p-6 grid md:grid-cols-2 gap-8 transition-all ${
            errors.priority
              ? "bg-white/5 border border-red-500/70 shadow-[0_0_12px_rgba(239,68,68,0.2)]"
              : "bg-white/5 border border-white/10"
          }`}
        >
          <div>
            <p>Language Comfort</p>
            <div className="flex gap-2 flex-wrap mt-2">
              {[
                { name: "Hindi",     icon: <Volume2 className="text-orange-400" size={14}/> },
                { name: "English",   icon: <Languages className="text-cyan-400" size={14}/> },
                { name: "Bilingual", icon: <Sparkles className="text-yellow-400" size={14}/> }
              ].map(item => (
                <div key={item.name} onClick={() => setLanguageComfort(item.name)} className={chip(languageComfort, item.name)}>
                  {item.icon} {item.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2">Priority {requiredBadge}</p>
            <div className="flex gap-2 flex-wrap mt-2">
              {[
                { name: "Comfort",     icon: <Star className="text-yellow-400" size={14}/> },
                { name: "Exploration", icon: <Compass className="text-cyan-400" size={14}/> },
                { name: "Cost Saving", icon: <Wallet className="text-green-400" size={14}/> }
              ].map(item => (
                <div key={item.name} onClick={() => setPriority(item.name)} className={chip(priority, item.name)}>
                  {item.icon} {item.name}
                </div>
              ))}
            </div>
            {errors.priority && errorMsg("Comfort chahiye ya paisa bachana? Ye decision tree ka main node hai.")}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="text-center pt-10" variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true }}>
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
