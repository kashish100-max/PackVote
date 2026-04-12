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
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchAI = async () => {
      if (!tripCode) return;
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/preferences/recommend/${tripCode}`, {
          signal: abortController.signal
        });
        const data = await res.json();
        setPlaces(data.recommendations || []);
        setItinerary(data.itinerary || null);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
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
          .itinerary-main-grid { grid-template-columns: 1fr; }
          .podium-card.winner { transform: scale(1); }
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

        .loader {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(6, 182, 212, 0.1);
          border-top: 4px solid #06b6d4;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 100px auto;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="result-page">
        <div className="full-content">
          
          {loading ? (
            <div className="loader" />
          ) : (
            <>
              {/* HEADER SECTION */}
              <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 style={{ 
                  fontSize: '20px', 
                  letterSpacing: '6px', 
                  color: '#06b6d4', 
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}>
                  Group Voting Results
                </h2>
                <p style={{ 
                  color: '#bdc4c5', 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  opacity: 0.9,
                  textShadow: '0 0 10px rgba(6, 182, 212, 0.4)'
                }}>
                  Trip Code: {tripCode}
                </p>
              </div>

              {/* PODIUM SECTION */}
              <div className="podium-container">
                {places[1] && (
                  <div className="podium-card">
                    <span className="podium-rank" style={{ color: '#94a3b8' }}>🥈 RUNNER UP</span>
                    <h3 className="podium-name">{places[1]}</h3>
                  </div>
                )}

                <div className="podium-card winner">
                  <span className="podium-rank" style={{ color: '#ff851b' }}>🏆 GROUP'S TOP PICK</span>
                  <h3 className="podium-name" style={{ fontSize: '34px', color: '#ff851b' }}>{places[0]}</h3>
                  <div style={{ fontSize: '13px', marginTop: '10px', color: '#06b6d4', fontWeight: '700' }}>ULTIMATE MATCH</div>
                </div>

                {places[2] && (
                  <div className="podium-card">
                    <span className="podium-rank" style={{ color: '#94a3b8' }}>🥉 THIRD PLACE</span>
                    <h3 className="podium-name">{places[2]}</h3>
                  </div>
                )}
              </div>

              {/* ITINERARY SECTION */}
              {itinerary && (
                <div className="itinerary-main-grid">
                  
                  {/* Sidebar - Just Tabs now */}
                  <div className="sidebar">
                    <div className="glass-panel">
                      <h4 style={{ fontSize: '15px', marginBottom: '25px', color: '#ff851b', letterSpacing: '1px' }}>EXPLORE DAYS</h4>
                      {itinerary.days?.map((day, idx) => (
                        <button 
                          key={idx} 
                          className={`day-tab ${activeDay === idx ? "active" : ""}`}
                          onClick={() => setActiveDay(idx)}
                        >
                          Day {day.day}: {day.title.split(' ').slice(0,2).join(' ')}...
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="itinerary-content">
                    <div className="glass-panel" style={{ borderTop: '2px solid #06b6d4' }}>
                      <div style={{ marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>{itinerary.days[activeDay].title}</h2>
                        <p style={{ fontSize: '14px', opacity: 0.7, marginTop: '8px', lineHeight: '1.6' }}>{itinerary.summary}</p>
                      </div>

                      {itinerary.days[activeDay].activities?.map((act, i) => {
                        const [time, ...desc] = act.split(':');
                        return (
                          <div key={i} className="activity-item">
                            <span className="activity-time">{time}</span>
                            <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: '1.7', margin: 0 }}>{desc.join(':')}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}
            </>
          )}

          {/* BACK BUTTON WITH CYAN BORDER */}
          <div style={{ textAlign: 'center' }}>
            <Link to="/" className="cyan-btn">
              ← PLAN ANOTHER ADVENTURE
            </Link>
          </div>

        </div>
        <Footer />
      </div>
    </>
  );
}