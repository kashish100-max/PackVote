import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Result() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tripCode = queryParams.get("code");

  const [places, setPlaces] = useState([]);
  const [groupConsensus, setGroupConsensus] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchAI = async () => {
      if (!tripCode) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const API_URL =import.meta.env.VITE_API_URL;
        const res = await fetch(
          `${API_URL}/api/preferences/recommend/${tripCode}`,
          {
            signal: abortController.signal,
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to generate recommendations");
        }

        setPlaces(data.recommendations || []);
        setGroupConsensus(data.groupConsensus || null);
        setItinerary(data.itinerary || null);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("RESULT FETCH ERROR:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAI();

    return () => abortController.abort();
  }, [tripCode]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

        .result-page {
          font-family: 'Poppins', sans-serif;
          min-height: 100vh;
          background: #04080f;
          color: #fff;
          width: 100%;
          padding: 0;
          margin: 0;
        }

        .full-content {
          width: 100%;
          padding: 40px 5%;
          box-sizing: border-box;
        }

        /* PODIUM SECTION */

        .podium-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          margin-bottom: 50px;
          align-items: end;
        }

        .podium-card {
          background: rgba(13, 25, 41, 0.8);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          backdrop-filter: blur(12px);
          transition: 0.3s;
        }

        .podium-card.winner {
          border: 2px solid #ff851b;
          box-shadow: 0 0 30px rgba(255, 133, 27, 0.2);
          transform: scale(1.05);
        }

        .podium-rank {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 12px;
          display: block;
        }

        .podium-name {
          font-size: 26px;
          font-weight: 800;
          margin: 5px 0;
        }

        /* ITINERARY LAYOUT */

        .itinerary-main-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 30px;
        }

        @media (max-width: 1024px) {
          .itinerary-main-grid {
            grid-template-columns: 1fr;
          }

          .podium-card.winner {
            transform: scale(1);
          }
        }

        .glass-panel {
          background: rgba(13, 25, 41, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 25px;
        }

        /* DAY TABS */

        .day-tab {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          cursor: pointer;
          text-align: left;
          margin-bottom: 12px;
          font-size: 15px;
          font-weight: 600;
          transition: 0.3s;
        }

        .day-tab.active {
          background: #06b6d4;
          color: #000;
          border-color: #06b6d4;
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
        }

        .activity-item {
          padding: 22px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.02);
          border-left: 4px solid #06b6d4;
          margin-bottom: 18px;
        }

        .activity-time {
          color: #ff851b;
          font-size: 13px;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: block;
        }

        /* CYAN GLOW BUTTON */

        .cyan-btn {
          display: inline-block;
          padding: 14px 35px;
          border-radius: 100px;
          background: transparent;
          border: 2px solid #06b6d4;
          color: #06b6d4;
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
          transition: 0.4s;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.1);
          margin-top: 40px;
        }

        .cyan-btn:hover {
          background: #06b6d4;
          color: #000;
          box-shadow: 0 0 25px rgba(6, 182, 212, 0.5);
        }

        /* LOADER */

        .loader {
          width: 55px;
          height: 55px;
          border: 4px solid rgba(6, 182, 212, 0.12);
          border-top: 4px solid #06b6d4;
          border-right: 4px solid #ff851b;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        .loading-content {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .loading-title {
          margin-top: 25px;
          font-size: 24px;
          font-weight: 800;
          color: #fff;
        }

        .loading-subtitle {
          margin-top: 10px;
          font-size: 14px;
          color: #94a3b8;
          max-width: 500px;
          line-height: 1.6;
        }

        .loading-steps {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 13px;
          color: #64748b;
        }

        .loading-step.active {
          color: #06b6d4;
          font-weight: 700;
        }

        /* PERCENTAGE BAR */

        .percentage-value {
          font-size: 13px;
          font-weight: 800;
        }

        .percentage-bar-container {
          width: 100%;
          height: 9px;
          background: rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
        }

        .percentage-bar {
          height: 100%;
          border-radius: 20px;
          transition: width 1s ease;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="result-page">
        <div className="full-content">

          {/* ================= LOADING ================= */}

          {loading ? (
            <div className="loading-content">

              <div className="loader" />

              <h2 className="loading-title">
                Creating Your Group Travel Plan
              </h2>

              <p className="loading-subtitle">
                Our ML model is analyzing everyone's preferences
                and Gemini is creating a personalized itinerary
                for your group.
              </p>

              <div className="loading-steps">

                <div className="loading-step active">
                  ✓ Analyzing group preferences
                </div>

                <div className="loading-step active">
                  ✓ Finding the best destination match
                </div>

                <div className="loading-step active">
                  ✨ Generating your personalized itinerary
                </div>

              </div>

            </div>
          ) : (

            <>
              {/* ================= HEADER ================= */}

              <div
                style={{
                  textAlign: "center",
                  marginBottom: "50px",
                }}
              >
                <h2
                  style={{
                    fontSize: "20px",
                    letterSpacing: "6px",
                    color: "#06b6d4",
                    fontWeight: "900",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  Group Voting Results
                </h2>

                <p
                  style={{
                    color: "#bdc4c5",
                    fontSize: "18px",
                    fontWeight: "600",
                    opacity: 0.9,
                    textShadow:
                      "0 0 10px rgba(6, 182, 212, 0.4)",
                  }}
                >
                  Trip Code: {tripCode}
                </p>
              </div>

              {/* ================= PODIUM ================= */}

              <div className="podium-container">

                {places[1] && (
                  <div className="podium-card">

                    <span
                      className="podium-rank"
                      style={{ color: "#94a3b8" }}
                    >
                      🥈 RUNNER UP
                    </span>

                    <h3 className="podium-name">
                      {places[1]}
                    </h3>

                  </div>
                )}

                <div className="podium-card winner">

                  <span
                    className="podium-rank"
                    style={{ color: "#ff851b" }}
                  >
                    🏆 GROUP'S TOP PICK
                  </span>

                  <h3
                    className="podium-name"
                    style={{
                      fontSize: "34px",
                      color: "#ff851b",
                    }}
                  >
                    {places[0] || "Generating..."}
                  </h3>

                  <div
                    style={{
                      fontSize: "13px",
                      marginTop: "10px",
                      color: "#06b6d4",
                      fontWeight: "700",
                    }}
                  >
                    ULTIMATE MATCH
                  </div>

                </div>

                {places[2] && (
                  <div className="podium-card">

                    <span
                      className="podium-rank"
                      style={{ color: "#94a3b8" }}
                    >
                      🥉 THIRD PLACE
                    </span>

                    <h3 className="podium-name">
                      {places[2]}
                    </h3>

                  </div>
                )}

              </div>

              {/* ================= GROUP PREFERENCE DISTRIBUTION ================= */}

              {groupConsensus?.results?.length > 0 && (
                <div
                  className="glass-panel"
                  style={{
                    marginBottom: "50px",
                    borderTop: "2px solid #ff851b",
                  }}
                >

                  <div style={{ marginBottom: "28px" }}>

                    <h3
                      style={{
                        color: "#ff851b",
                        fontSize: "16px",
                        letterSpacing: "2px",
                        fontWeight: "800",
                        marginBottom: "8px",
                      }}
                    >
                      GROUP PREFERENCE DISTRIBUTION
                    </h3>

                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "14px",
                        margin: 0,
                        lineHeight: "1.6",
                      }}
                    >
                      Individual ML predictions were aggregated
                      to show the relative preference strength
                      of the group's top destinations.
                    </p>

                  </div>

                  {groupConsensus.results.map(
                    (result, index) => {

                      /*
                       * Backend now sends:
                       *
                       * {
                       *   destination: "Amritsar",
                       *   percentage: 40
                       * }
                       *
                       * If percentage exists, use it.
                       * The fallback below keeps the UI
                       * compatible with the older votes response.
                       */

                      let percentage;

                      if (
                        typeof result.percentage === "number"
                      ) {
                        percentage = result.percentage;
                      } else {
                        const totalVotes =
                          groupConsensus.results.reduce(
                            (sum, item) =>
                              sum +
                              Number(item.votes || 0),
                            0
                          );

                        percentage =
                          totalVotes > 0
                            ? Math.round(
                                (Number(result.votes || 0) /
                                  totalVotes) *
                                  100
                              )
                            : 0;
                      }

                      return (
                        <div
                          key={result.destination}
                          style={{
                            marginBottom: "24px",
                          }}
                        >

                          {/* Destination + Percentage */}

                          <div
                            style={{
                              display: "flex",
                              justifyContent:
                                "space-between",
                              alignItems: "center",
                              marginBottom: "9px",
                            }}
                          >

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >

                              <span
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "800",
                                  color:
                                    index === 0
                                      ? "#ff851b"
                                      : "#94a3b8",
                                }}
                              >
                                {index === 0
                                  ? "🥇"
                                  : index === 1
                                  ? "🥈"
                                  : "🥉"}
                              </span>

                              <span
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "700",
                                  color: "#fff",
                                }}
                              >
                                {result.destination}
                              </span>

                            </div>

                            <span
                              className="percentage-value"
                              style={{
                                color:
                                  index === 0
                                    ? "#ff851b"
                                    : "#06b6d4",
                              }}
                            >
                              {percentage}%
                            </span>

                          </div>

                          {/* Percentage Bar */}

                          <div className="percentage-bar-container">

                            <div
                              className="percentage-bar"
                              style={{
                                width: `${percentage}%`,
                                background:
                                  index === 0
                                    ? "#ff851b"
                                    : "#06b6d4",
                              }}
                            />

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>
              )}

              {/* ================= ITINERARY ================= */}

              {itinerary &&
                itinerary.days &&
                itinerary.days.length > 0 && (

                  <div className="itinerary-main-grid">

                    {/* Sidebar */}

                    <div className="sidebar">

                      <div className="glass-panel">

                        <h4
                          style={{
                            fontSize: "15px",
                            marginBottom: "25px",
                            color: "#ff851b",
                            letterSpacing: "1px",
                          }}
                        >
                          EXPLORE DAYS
                        </h4>

                        {itinerary.days.map(
                          (day, idx) => (

                            <button
                              key={idx}
                              className={`day-tab ${
                                activeDay === idx
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                setActiveDay(idx)
                              }
                            >
                              Day {day.day}:{" "}
                              {day.title
                                .split(" ")
                                .slice(0, 2)
                                .join(" ")}
                              ...
                            </button>

                          )
                        )}

                      </div>

                    </div>

                    {/* Main Content */}

                    <div className="itinerary-content">

                      <div
                        className="glass-panel"
                        style={{
                          borderTop:
                            "2px solid #06b6d4",
                        }}
                      >

                        <div
                          style={{
                            marginBottom: "30px",
                          }}
                        >

                          <h2
                            style={{
                              fontSize: "28px",
                              fontWeight: "800",
                              margin: 0,
                            }}
                          >
                            {
                              itinerary.days[
                                activeDay
                              ].title
                            }
                          </h2>

                          <p
                            style={{
                              fontSize: "14px",
                              opacity: 0.7,
                              marginTop: "8px",
                              lineHeight: "1.6",
                            }}
                          >
                            {itinerary.summary}
                          </p>

                        </div>

                        {itinerary.days[
                          activeDay
                        ].activities?.map(
                          (act, i) => {

                            const [
                              time,
                              ...desc
                            ] = act.split(":");

                            return (
                              <div
                                key={i}
                                className="activity-item"
                              >

                                <span className="activity-time">
                                  {time}
                                </span>

                                <p
                                  style={{
                                    fontSize: "16px",
                                    opacity: 0.9,
                                    lineHeight: "1.7",
                                    margin: 0,
                                  }}
                                >
                                  {desc.join(":")}
                                </p>

                              </div>
                            );
                          }
                        )}

                      </div>

                    </div>

                  </div>
                )}

            </>
          )}

          {/* ================= BACK BUTTON ================= */}

          <div
            style={{
              textAlign: "center",
            }}
          >
            <Link
              to="/"
              className="cyan-btn"
            >
              ← PLAN ANOTHER ADVENTURE
            </Link>
          </div>

        </div>

        <Footer />

      </div>
    </>
  );
}