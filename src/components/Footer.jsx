import { Instagram, Twitter, Globe } from "lucide-react";

export default function Footer() {

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      // Agar section nahi milta (jaise results page pe), toh home pe bhej sakte ho
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer className="mt-24 px-6 py-12 bg-black text-white border-t border-white/10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold mb-3 cursor-pointer" onClick={() => scrollToSection("home")}>
            <span className="text-white">Pack</span>
            <span className="text-cyan-400">Vote</span>
          </h2>

          <p className="text-sm text-gray-400 leading-relaxed">
            Plan smarter, faster, and together.  
            PackVote uses AI to simplify group travel decisions.
          </p>

          <p className="text-xs text-gray-500 mt-3">
            Making group planning effortless.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li onClick={() => scrollToSection("home")} 
                className="hover:text-cyan-400 cursor-pointer transition">
              Home
            </li>
            <li onClick={() => scrollToSection("about")} 
                className="hover:text-cyan-400 cursor-pointer transition">
              About
            </li>
            <li onClick={() => scrollToSection("working")} 
                className="hover:text-cyan-400 cursor-pointer transition">
              Process
            </li>
            <li onClick={() => scrollToSection("why-us")} 
                className="hover:text-cyan-400 cursor-pointer transition">
              Advantage
            </li>
            <li onClick={() => scrollToSection("team")} 
                className="hover:text-cyan-400 cursor-pointer transition">
              Team
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>

          <p className="text-gray-400 text-sm hover:text-cyan-400 cursor-pointer transition">
            packvote@gmail.com
          </p>

          <div className="flex gap-4 mt-5">
            {/* Social Links - Added target="_blank" logic simulation */}
            <a href="https://google.com" target="_blank" rel="noreferrer"
               className="w-9 h-9 bg-white/5 border border-white/10 
               flex items-center justify-center rounded-full 
               hover:bg-cyan-400/10 hover:scale-110 transition cursor-pointer">
              <Globe size={16} className="text-gray-400 hover:text-cyan-400" />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer"
               className="w-9 h-9 bg-white/5 border border-white/10 
               flex items-center justify-center rounded-full 
               hover:bg-cyan-400/10 hover:scale-110 transition cursor-pointer">
              <Instagram size={16} className="text-gray-400 hover:text-cyan-400" />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer"
               className="w-9 h-9 bg-white/5 border border-white/10 
               flex items-center justify-center rounded-full 
               hover:bg-cyan-400/10 hover:scale-110 transition cursor-pointer">
              <Twitter size={16} className="text-gray-400 hover:text-cyan-400" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 text-xs mt-12 border-t border-white/5 pt-6">
        © 2026 PackVote — Smart Group Travel Planning
      </div>

    </footer>
  );
}