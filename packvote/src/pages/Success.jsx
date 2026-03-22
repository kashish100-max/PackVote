import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

export default function Success() {

  const [tripCode, setTripCode] = useState("");
  const [copied, setCopied] = useState(false);

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const codeFromURL = queryParams.get("code");

useEffect(() => {
  if (codeFromURL) {
    setTripCode(codeFromURL);
  }
}, [codeFromURL]);

  const copyCode = () => {
    navigator.clipboard.writeText(tripCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#050b14] text-white">

      {/* MAIN */}
      <div className="flex flex-col items-center justify-center flex-1 
      px-6 pt-28 pb-20 text-center max-w-xl mx-auto">

        {/* CHECK ICON */}
        <div className="w-20 h-20 rounded-full 
        bg-cyan-400/10 flex items-center justify-center mb-8
        shadow-[0_0_30px_rgba(34,211,238,0.25)]">
          <Check className="text-cyan-400" size={34} />
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-semibold mb-4">
          Preferences Saved!
        </h1>

        {/* SUBTEXT */}
        <p className="text-gray-400 mb-8">
          Share your trip code with friends so they can join.
        </p>

        {/* CODE BOX */}
        <div className="flex items-center gap-3 px-6 py-3 rounded-xl 
bg-white/5 border border-white/10 mb-6 backdrop-blur-xl
shadow-[0_0_25px_rgba(34,211,238,0.6)]">

          <span className="text-xl font-bold tracking-widest text-cyan-400">
            {tripCode}
          </span>

          <Copy
            size={18}
            onClick={copyCode}
            className="cursor-pointer hover:text-cyan-400 transition"
          />
        </div>

        {copied && (
          <p className="text-green-400 text-sm mb-4">
            Copied!
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={() => window.location.href = `/dashboard?code=${tripCode}`}
          className="w-full py-4 rounded-xl 
          bg-orange-400 text-black font-semibold 
          transition mb-6
          shadow-[0_10px_30px_rgba(251,146,60,0.4)]
          hover:shadow-[0_15px_40px_rgba(251,146,60,0.6)]
          hover:scale-[1.02]"
        >
          View Group Results →
        </button>

        {/* BACK */}
        <button
          onClick={() => window.location.href = "/"}
          className="text-gray-400 hover:text-white text-sm"
        >
          ← Back to home
        </button>

      </div>

      <Footer />
    </div>
  );
}