import group from "../assets/images/group.jpg";
import vote from "../assets/images/vote.jpg";
import ai from "../assets/images/ai.jpg";
import overwhelmed from "../assets/images/overwhelmed.jpg";
import itinerary from "../assets/images/travel_itenary.jpg";
import groupSize from "../assets/images/group_size.jpg";

import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WhyCards() {
  const scrollRef = useRef(null);

  // 🔹 Arrow scroll
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  // 🔥 AUTO SCROLL
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 320,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 DRAG SCROLL
  let isDown = false;
  let startX;
  let scrollLeftVal;

  const handleMouseDown = (e) => {
    isDown = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftVal = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    isDown = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftVal - walk;
  };

  const cards = [
    {
      img: group,
      title: "No More Group Arguments",
      desc: "Everyone shares preferences without pressure.",
    },
    {
      img: vote,
      title: "Every Vote Counts",
      desc: "Fair decisions. No one dominates.",
    },
    {
      img: ai,
      title: "Smart Recommendations",
      desc: "Find the best destination for everyone.",
    },
    {
      img: overwhelmed,
      title: "Saves Time",
      desc: "No more endless research and confusion.",
    },
    {
      img: itinerary,
      title: "Instant Itinerary",
      desc: "Get a ready-to-use travel plan instantly.",
    },
    {
      img: groupSize,
      title: "Works for Any Group",
      desc: "From 2 to 20+ people easily.",
    },
  ];

  return (
    <div className="py-28 bg-transparent relative" id="why">

      {/* WIDTH CONTROL */}
      <div className="max-w-[1200px] mx-auto">

        {/* TITLE */}
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm tracking-widest mb-4">
  WHY CHOOSE US
</p>

<h2 className="text-4xl md:text-5xl font-bold mb-4">
  <span className="text-white">Why </span>
  <span className="text-cyan-400">PackVote?</span>
</h2>

<p className="text-gray-400">
  Group travel planning is broken. We fixed it.
</p>
        </div>

        {/* CAROUSEL */}
        <div className="relative">

          {/* LEFT ARROW */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 
            w-10 h-10 rounded-full bg-black/40 backdrop-blur-md 
            flex items-center justify-center text-white 
            hover:bg-black/60 transition"
          >
            <ChevronLeft size={20} />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 
            w-10 h-10 rounded-full bg-black/40 backdrop-blur-md 
            flex items-center justify-center text-white 
            hover:bg-black/60 transition"
          >
            <ChevronRight size={20} />
          </button>

          {/* SCROLL CONTAINER */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-6 overflow-x-auto scroll-smooth px-6 no-scrollbar snap-x snap-mandatory cursor-grab"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative min-w-[280px] md:min-w-[320px] h-[380px] 
                rounded-2xl overflow-hidden group cursor-pointer snap-center
                shadow-lg hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition duration-300"
              >

                {/* IMAGE */}
                <img
                  src={card.img}
                  className="w-full h-full object-cover 
                  transition duration-500 ease-in-out 
                  group-hover:scale-110 group-hover:brightness-110"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* BORDER GLOW */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10"></div>

                {/* TEXT */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-lg font-semibold mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {card.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}