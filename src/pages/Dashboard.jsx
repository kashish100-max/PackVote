import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";

export default function Dashboard() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tripCode = queryParams.get("code");

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [tripStatus, setTripStatus] = useState("collecting");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const API_URL =import.meta.env.VITE_API_URL;
        const res = await fetch(
          `${API_URL}/api/trips${tripCode}`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch trip");
        }

        // Trip API returns:
        // { success: true, trip: { members: [...] } }

        setUsers(data.trip.members || []);
        setTripStatus(data.trip.status);
      } catch (err) {
        console.error("Failed to fetch trip:", err);
        setError(err.message);
        setUsers([]);
      }
    };

    if (tripCode) {
      fetchUsers();
    }
  }, [tripCode]);

  return (
    <div className="min-h-screen bg-[#050b14] text-white flex flex-col justify-between">
      <div className="px-6 pt-24 max-w-5xl mx-auto w-full">

        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-2">
          Group Results
        </h1>

        <p className="text-gray-400 mb-8">
          Trip code:{" "}
          <span className="text-cyan-400">
            {tripCode}
          </span>
        </p>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8 text-red-400">
            {error}
          </div>
        )}

        {/* USERS */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">

          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Who's In
            </h2>

            <span className="text-cyan-400">
              {users.length} travelers
            </span>
          </div>

          <div className="flex gap-6 flex-wrap">
            {users.map((user, index) => (
              <div key={index} className="text-center">

                <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center mb-2">
                  {user.name?.charAt(0) || "?"}
                </div>

                <p className="text-sm text-gray-400">
                  {user.name || "Anonymous"}
                </p>

                <p className="text-xs mt-1">
                  {user.status === "submitted" ? (
                    <span className="text-green-400">
                      ✓ Submitted
                    </span>
                  ) : (
                    <span className="text-yellow-400">
                      ⏳ Pending
                    </span>
                  )}
                </p>

              </div>
            ))}
          </div>

          {users.length === 0 && !error && (
            <p className="text-gray-500 text-sm">
              No members have joined this trip yet.
            </p>
          )}
        </div>

        {/* BUTTON */}
       <button
  disabled={tripStatus !== "ready"}
  onClick={() =>
    (window.location.href = `/result?code=${tripCode}`)
  }
  className={`w-full py-4 rounded-xl font-semibold transition mb-8
    ${
      tripStatus === "ready"
        ? "bg-orange-400 text-black shadow-[0_20px_50px_rgba(251,146,60,0.45)] hover:shadow-[0_25px_60px_rgba(251,146,60,0.65)]"
        : "bg-gray-700 text-gray-400 cursor-not-allowed"
    }
  `}
>
  {tripStatus === "ready"
    ? "✨ Generate AI Recommendations"
    : "⏳ Waiting for all members"}
</button>

      </div>

      <Footer />
    </div>
  );
}