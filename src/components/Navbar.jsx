import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  const sections = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Working", id: "how" },
    { name: "Why Us", id: "why" },
    { name: "Team", id: "team" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      let current = "home";

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();

          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section.id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 
      w-[90%] max-w-6xl px-8 py-4 flex justify-between items-center 
      rounded-2xl transition-all duration-300 
      ${
        scrolled
          ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.4)]"
          : "bg-black/20 backdrop-blur-lg border border-white/5"
      }`}
    >
      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <Compass
          className="text-cyan-400 group-hover:rotate-12 transition duration-300"
          size={22}
        />
        <h1 className="text-lg font-bold">
          <span className="text-white">Pack</span>
          <span className="text-cyan-400">Vote</span>
        </h1>
      </div>

      {/* NAV LINKS */}
      <div className="flex gap-8 text-sm font-medium">
        {sections.map((item, index) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={index}
              onClick={() => scrollToSection(item.id)}
              className="relative group transition"
            >
              {/* TEXT */}
              <span
                className={`relative z-10 transition duration-300 
                ${
                  isActive
                    ? "text-cyan-400"
                    : "text-white/80 group-hover:text-cyan-400"
                }`}
              >
                {item.name}
              </span>

              {/* UNDERLINE */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-cyan-400 
                transition-all duration-300 
                ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </button>
          );
        })}
      </div>
    </div>
  );
}