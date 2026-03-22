import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";

export default function Dashboard() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tripCode = queryParams.get("code");

  const [users, setUsers] = useState([]);

  // fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:5000/api/preferences/${tripCode}`);
      const data = await res.json();
      setUsers(data);
    };

    if (tripCode) fetchUsers();
  }, [tripCode]);


  return (
    <div className="min-h-screen bg-[#050b14] text-white flex flex-col justify-between">

      <div className="px-6 pt-24 max-w-5xl mx-auto w-full">

        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-2">Group Results</h1>
        <p className="text-gray-400 mb-8">
          Trip code: <span className="text-cyan-400">{tripCode}</span>
        </p>

        {/* USERS */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Who's In</h2>
            <span className="text-cyan-400">{users.length} travelers</span>
          </div>

          <div className="flex gap-6 flex-wrap">
            {users.map((user, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center mb-2">
                  {user.name?.charAt(0) || "?"}
                </div>
                <p className="text-sm text-gray-400">{user.name || "Anonymous"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <button
  onClick={() => window.location.href = `/result?code=${tripCode}`}
  className="w-full py-4 rounded-xl bg-orange-400 text-black font-semibold
  shadow-[0_20px_50px_rgba(251,146,60,0.45)]
  hover:shadow-[0_25px_60px_rgba(251,146,60,0.65)]
  transition mb-8"
>
  ✨ Generate AI Recommendations
</button>

      </div>

      <Footer />
    </div>
  );
}