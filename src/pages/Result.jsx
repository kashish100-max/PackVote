import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Result() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tripCode = queryParams.get("code");

  const [places, setPlaces] = useState([]);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAI = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/preferences/recommend/${tripCode}`
        );
        const data = await res.json();
        setPlaces(data.recommendations || []);
        setItinerary(data.itinerary || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (tripCode) fetchAI();
  }, [tripCode]);

  const rankMeta = [
    { label: "🥈 Runner Up", score: "82%", barW: "w-[82%]", textColor: "text-slate-300", borderColor: "border-white/10", barColor: "bg-slate-400/60", scoreColor: "text-slate-300" },
    { label: "🥉 Third Place", score: "68%", barW: "w-[68%]", textColor: "text-orange-300", borderColor: "border-white/[0.06]", barColor: "bg-orange-400/60", scoreColor: "text-orange-300" },
  ];

  return (
    <div className="min-h-screen bg-[#060d1a] text-white flex flex-col justify-between relative overflow-hidden">

      {/* Background Orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-cyan-400 opacity-[0.08] blur-[100px]" />
        <div className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full bg-yellow-400 opacity-[0.08] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-violet-600 opacity-[0.07] blur-[100px]" />
      </div>

      <div className="relative z-10 px-5 pt-16 pb-16 max-w-2xl mx-auto w-full">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/25 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-cyan-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          AI-POWERED RESULTS
        </div>

        {/* Title */}
        <h1
          className="font-black leading-none tracking-tight mb-2 bg-gradient-to-br from-white via-white to-cyan-400 bg-clip-text text-transparent"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px,6vw,60px)", letterSpacing: "0.03em" }}
        >
          Your Group's<br />Top Picks
        </h1>

        <p className="text-[#6b7fa3] text-xs font-light mb-10">
          Based on everyone's preferences —{" "}
          <span className="text-cyan-400 font-medium">Trip Code: {tripCode}</span>
        </p>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-[#6b7fa3] text-xs tracking-wider">GENERATING RECOMMENDATIONS...</p>
          </div>
        )}

        {!loading && places.length > 0 && (
          <>
            {/* ── SECTION 1: DESTINATIONS ── */}

            {/* Winner Card */}
            <div className="relative mb-3 rounded-2xl border border-yellow-400/30 bg-gradient-to-br from-yellow-400/[0.07] to-cyan-400/[0.04] p-7 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-yellow-400/20 blur-[50px] pointer-events-none" />
              <p className="text-[10px] font-bold tracking-[0.18em] text-yellow-400 uppercase mb-2 flex items-center gap-2">
                <span>🏆</span> Group Pick · Best Match
              </p>
              <h2
                className="leading-none tracking-wide text-yellow-400 mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px,5vw,54px)" }}
              >
                {places[0]}
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[97%] rounded-full bg-gradient-to-r from-yellow-400 to-cyan-400" />
                </div>
                <span className="text-[11px] text-yellow-400/80 font-semibold">97% match</span>
              </div>
            </div>

            {/* Runner-up Cards */}
            <div className="grid grid-cols-2 gap-3 mb-0">
              {places.slice(1, 3).map((place, i) => {
                const meta = rankMeta[i];
                return (
                  <div key={i} className={`relative p-5 rounded-xl border bg-[#0c1829] overflow-hidden transition-all hover:-translate-y-1 hover:border-cyan-400/20 ${meta.borderColor}`}>
                    <span className="absolute top-2 right-3 text-4xl font-black opacity-[0.05] select-none pointer-events-none"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {i + 2}
                    </span>
                    <p className={`text-[10px] font-bold tracking-[0.14em] uppercase mb-1.5 ${meta.scoreColor}`}>{meta.label}</p>
                    <h3 className={`text-3xl font-black leading-none mb-4 tracking-wide ${meta.textColor}`}
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {place}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-[2px] bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${meta.barColor} ${meta.barW}`} />
                      </div>
                      <span className={`text-[10px] font-semibold opacity-60 ${meta.scoreColor}`}>{meta.score}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── SECTION 2: AI ITINERARY ── */}
            {itinerary && (
              <div className="mt-12">

                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <div className="inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-400/25 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-violet-400">
                    ✨ AI ITINERARY
                  </div>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                {/* Summary Quote */}
                {itinerary.summary && (
                  <div className="mb-5 px-5 py-4 rounded-xl bg-[#0c1829] border border-white/[0.06] border-l-4 border-l-violet-500">
                    <p className="text-[#a0b0c8] text-xs italic leading-relaxed">"{itinerary.summary}"</p>
                  </div>
                )}

                {/* Day Cards */}
                <div className="space-y-3">
                  {itinerary.days?.map((day, idx) => (
                    <div key={idx} className="rounded-xl bg-[#0c1829] border border-white/[0.06] overflow-hidden">

                      {/* Day Header */}
                      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.05]">
                        <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-[10px] font-bold text-violet-400 shrink-0">
                          {day.day}
                        </div>
                        <h4 className="text-sm font-semibold text-white">
                          {day.title || `Day ${day.day} — Exploration`}
                        </h4>
                      </div>

                      {/* Day Body */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/[0.05]">

                        {/* Activities */}
                        <div className="px-5 py-4">
                          <p className="text-[10px] font-bold tracking-[0.13em] text-cyan-400 uppercase mb-2">
                            📍 Activities
                          </p>
                          <ul className="space-y-1.5">
                            {day.activities?.map((act, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-[#a0b0c8] leading-relaxed">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 shrink-0" />
                                {act}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Meals */}
                        {day.meals && (
                          <div className="px-5 py-4">
                            <p className="text-[10px] font-bold tracking-[0.13em] text-orange-400 uppercase mb-2">
                              🍴 Food Suggestions
                            </p>
                            <p className="text-xs text-[#a0b0c8] leading-relaxed italic">{day.meals}</p>
                          </div>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── SECTION 3: HOW IT WORKS ── */}
            <div className="flex items-center gap-3 mt-10 mb-4">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[10px] font-bold tracking-[0.18em] text-[#6b7fa3] uppercase">How we picked these</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: "🧑‍🤝‍🧑", title: "Group Votes", desc: "Everyone's preferences aggregated equally" },
                { icon: "🤖", title: "Gradient Boosting ML", desc: "Destination scored via trained model" },
                { icon: "✨", title: "Gemini LLM", desc: "AI narrative & itinerary for the top pick" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#0c1829] border border-white/[0.06] text-center">
                  <div className="text-lg mb-1.5">{item.icon}</div>
                  <div className="text-[11px] font-semibold text-white mb-1">{item.title}</div>
                  <div className="text-[10px] text-[#6b7fa3] leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty */}
        {!loading && places.length === 0 && (
          <p className="text-center text-[#6b7fa3] py-20">No recommendations found.</p>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-400/30 bg-cyan-400/[0.06] text-cyan-400 text-xs font-semibold hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-all"
          >
            ← Plan another trip
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  );
}
