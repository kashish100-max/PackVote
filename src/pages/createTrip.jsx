import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =import.meta.env.VITE_API_URL;

export default function CreateTrip() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateTrip = async () => {
    const cleanName = name.trim();

    // Frontend validation
    if (!cleanName) {
      setError("Please enter your name.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Failed to create trip."
        );
      }

      // Make sure backend returned everything we need
      if (!data.trip?.tripCode || !data.trip?.memberId) {
        throw new Error("Invalid trip response from server.");
      }

      // Move creator to Preferences with their identity
      navigate(
        `/preferences?code=${data.trip.tripCode}&memberId=${data.trip.memberId}&name=${encodeURIComponent(
          data.trip.name
        )}`
      );
    } catch (err) {
      console.error("Create trip error:", err);
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

      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-cyan-400 tracking-[0.3em] text-xs font-bold mb-4">
          GROUP TRAVEL
        </p>

        <h1 className="text-5xl font-bold mb-4">
          Create a Trip
        </h1>

        <p className="text-gray-400">
          Start a trip and invite your group using a unique trip code
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md">
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl shadow-2xl">

          {/* Name */}
          <label className="block text-gray-400 text-xs tracking-widest mb-3 uppercase">
            Your Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateTrip();
              }
            }}
            placeholder="Enter your name"
            className={`w-full bg-black/40 border rounded-xl py-4 px-4 outline-none transition mb-5 ${
              error
                ? "border-red-500/70 focus:border-red-400"
                : "border-white/10 focus:border-cyan-400"
            }`}
          />

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm mb-5">
              ⚠️ {error}
            </p>
          )}

          {/* Create Button */}
          <button
            onClick={handleCreateTrip}
            disabled={loading}
            className={`w-full py-4 text-black font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(251,146,60,0.3)] ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-orange-400 hover:bg-orange-500"
            }`}
          >
            {loading ? "Creating Trip..." : "Create Trip →"}
          </button>
        </div>
      </div>

      <p className="mt-8 text-gray-500 text-sm">
        Already have a trip code?{" "}
        <span
          onClick={() => navigate("/joinTrip")}
          className="text-cyan-400 cursor-pointer hover:underline"
        >
          Join an existing trip
        </span>
      </p>
    </div>
  );
}