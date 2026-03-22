import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function JoinTrip() {
  const [inputCode, setInputCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (inputCode.trim().length === 6) {
      // Navigate to preferences and pass the code in the URL
      navigate(`/preferences?code=${inputCode.toUpperCase()}`);
    } else {
      alert("Please enter a valid 6-character code");
    }
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-white flex flex-col items-center justify-center px-6">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="fixed top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2"
      >
        ← Back
      </button>

      <div className="text-center mb-12">
        <p className="text-cyan-400 tracking-[0.3em] text-xs font-bold mb-4">GROUP TRAVEL</p>
        <h1 className="text-5xl font-bold mb-4">Join a Trip</h1>
        <p className="text-gray-400">Enter the trip code shared by your group organizer</p>
      </div>

      {/* The Join Card */}
      <div className="relative w-full max-w-md">
        {/* The large "01" decoration */}
        
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl shadow-2xl">
          <label className="block text-gray-400 text-xs tracking-widest mb-6 uppercase">Trip Code</label>
          
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            placeholder="X X X X X X"
            maxLength={6}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 text-center text-2xl font-bold tracking-[0.5em] focus:border-cyan-400 outline-none transition mb-8"
          />

          <button
            onClick={handleJoin}
            className="w-full py-4 bg-orange-400 hover:bg-orange-500 text-black font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(251,146,60,0.3)]"
          >
            Join Trip →
          </button>
        </div>
      </div>

      <p className="mt-8 text-gray-500 text-sm">
        Don't have a code? <span onClick={() => navigate('/preferences')} className="text-cyan-400 cursor-pointer hover:underline">Start a new trip instead</span>
      </p>
    </div>
  );
}