import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";

export default function Result() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tripCode = queryParams.get("code");

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAI = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/preferences/recommend/${tripCode}`
        );
        const data = await res.json();

        setPlaces(data.recommendations || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (tripCode) fetchAI();
  }, [tripCode]);

  return (
    <div className="min-h-screen bg-[#050b14] text-white flex flex-col justify-between">

      <div className="px-6 pt-24 max-w-5xl mx-auto w-full">

        {/* HEADER */}
        <p className="text-cyan-400 text-sm tracking-widest mb-2">
          AI-POWERED
        </p>

        <h1 className="text-4xl font-bold mb-2">
          Top 3 Destinations for Your Group
        </h1>

        <p className="text-gray-400 mb-10">
          Based on your group's preferences
        </p>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-400">
            Generating recommendations...
          </p>
        )}

        {/* RESULTS */}
        {!loading && places.length > 0 && (
          <div className="space-y-8">

            {/* GROUP PICK */}
            <div className="p-6 rounded-2xl bg-white/5 border border-cyan-400/20 
            shadow-[0_0_30px_rgba(34,211,238,0.3)]">

              <p className="text-sm text-cyan-400 mb-2">
                🏆 GROUP PICK
              </p>

              <h2 className="text-2xl font-bold text-white">
                {places[0]}
              </h2>
            </div>

            {/* CARDS */}
            {places.map((place, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border transition
                ${
                  index === 0
                    ? "border-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.25)]"
                    : index === 1
                    ? "border-gray-400/30"
                    : "border-orange-400/30"
                }`}
              >

                <p className="text-sm text-gray-400 mb-2">
                  #{index + 1}{" "}
                  {index === 0
                    ? "BEST MATCH"
                    : index === 1
                    ? "RUNNER UP"
                    : "THIRD PLACE"}
                </p>

                <h3 className="text-2xl font-semibold text-cyan-400">
                  {place}
                </h3>

              </div>
            ))}

          </div>
        )}

        {/* EMPTY */}
        {!loading && places.length === 0 && (
          <p className="text-center text-gray-400">
            No recommendations found.
          </p>
        )}

      </div>

      <Footer />
    </div>
  );
}