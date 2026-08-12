import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinTrip() {
  const [inputCode, setInputCode] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleJoin = async () => {
    const cleanCode = inputCode.trim().toUpperCase();
    const cleanName = name.trim();

    // Frontend validation
    if (!cleanName) {
      setError("Please enter your name.");
      return;
    }

    if (cleanCode.length !== 6) {
      setError("Please enter a valid 6-character trip code.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const API_URL =import.meta.env.VITE_API_URL;
      const response = await fetch(
        `${API_URL}/api/trips/${cleanCode}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: cleanName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to join trip.");
      }

      // Trip successfully joined
      navigate(
  `/preferences?code=${data.trip.tripCode}&memberId=${data.trip.memberId}&name=${encodeURIComponent(cleanName)}`
);
    } catch (err) {
      console.error("Join trip error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
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
        <p className="text-cyan-400 tracking-[0.3em] text-xs font-bold mb-4">
          GROUP TRAVEL
        </p>

        <h1 className="text-5xl font-bold mb-4">
          Join a Trip
        </h1>

        <p className="text-gray-400">
          Enter the trip code shared by your group organizer
        </p>
      </div>

      {/* Join Card */}
      <div className="relative w-full max-w-md">

        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl shadow-2xl">

          {/* NAME */}
          <label className="block text-gray-400 text-xs tracking-widest mb-3 uppercase">
            Your Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 focus:border-cyan-400 outline-none transition mb-6"
          />

          {/* TRIP CODE */}
          <label className="block text-gray-400 text-xs tracking-widest mb-3 uppercase">
            Trip Code
          </label>

          <input
            type="text"
            value={inputCode}
            onChange={(e) =>
              setInputCode(e.target.value.toUpperCase())
            }
            placeholder="X X X X X X"
            maxLength={6}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 text-center text-2xl font-bold tracking-[0.5em] focus:border-cyan-400 outline-none transition mb-6"
          />

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-sm text-center mb-5">
              ⚠️ {error}
            </p>
          )}

          {/* JOIN BUTTON */}
          <button
            onClick={handleJoin}
            disabled={loading}
            className={`w-full py-4 text-black font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(251,146,60,0.3)]
              ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-orange-400 hover:bg-orange-500"
              }
            `}
          >
            {loading ? "Joining..." : "Join Trip →"}
          </button>
        </div>
      </div>

      <p className="mt-8 text-gray-500 text-sm">
        Don't have a code?{" "}
        <span
          onClick={() => navigate("/createTrip")}
          className="text-cyan-400 cursor-pointer hover:underline"
        >
          Start a new trip instead
        </span>
      </p>
    </div>
  );
}