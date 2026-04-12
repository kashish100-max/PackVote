import { useState } from "react";
import Card from "./Card";
import ArrowRight from "./ArrowRight";
import ArrowLeft from "./ArrowLeft";
import ArrowDown from "./ArrowDown";

export default function Pipeline() {
  const [hovered, setHovered] = useState(null);

  // Define which arrows/nodes light up per hovered card
  const highlights = {
    users:       { cards: ["users", "ai"], arrows: ["users-ai"] },
    ai:          { cards: ["ai", "score"], arrows: ["ai-score"] },
    score:       { cards: ["score", "destination"], arrows: ["score-destination"] },
    destination: { cards: ["destination", "itinerary"], arrows: ["destination-itinerary"] },
    itinerary:   { cards: ["itinerary"], arrows: [] },
  };

  const active = hovered ? highlights[hovered] : { cards: [], arrows: [] };
  const isCard = (id) => active.cards.includes(id);
  const isArrow = (id) => active.arrows.includes(id);

  return (
    <div className="hidden md:flex justify-center w-full">
      <div className="relative w-[520px] h-[600px]">

        {/* USERS */}
        <div
          className="absolute top-0 left-0 cursor-pointer"
          onMouseEnter={() => setHovered("users")}
          onMouseLeave={() => setHovered(null)}
        >
          <Card emoji="👤" title="Users" sub="Preferences" highlighted={isCard("users")} />
        </div>

        {/* AI */}
        <div
          className="absolute top-0 right-0 cursor-pointer"
          onMouseEnter={() => setHovered("ai")}
          onMouseLeave={() => setHovered(null)}
        >
          <Card emoji="🧠" title="AI" sub="Processing" highlighted={isCard("ai")} />
        </div>

        {/* USERS → AI */}
        <div className="absolute top-[55px] left-[215px]">
          <ArrowRight highlighted={isArrow("users-ai")} />
        </div>

        {/* DESTINATION */}
        <div
          className="absolute top-[200px] left-0 cursor-pointer"
          onMouseEnter={() => setHovered("destination")}
          onMouseLeave={() => setHovered(null)}
        >
          <Card emoji="📍" title="Destination" sub="Best Match" highlighted={isCard("destination")} />
        </div>

        {/* SCORE */}
        <div
          className="absolute top-[200px] right-0 cursor-pointer"
          onMouseEnter={() => setHovered("score")}
          onMouseLeave={() => setHovered(null)}
        >
          <Card emoji="📊" title="Score" sub="Ranking" highlighted={isCard("score")} />
        </div>

        {/* AI ↓ SCORE */}
        <div className="absolute top-[115px] right-[90px]">
            <br></br> 
          <ArrowDown highlighted={isArrow("ai-score")} />
        </div>

        {/* SCORE → DESTINATION */}
        <div className="absolute top-[253px] right-[215px]">
          <ArrowLeft highlighted={isArrow("score-destination")} />
        </div>

        {/* ITINERARY */}
        <div
          className="absolute top-[400px] left-0 cursor-pointer"
          onMouseEnter={() => setHovered("itinerary")}
          onMouseLeave={() => setHovered(null)}
        >
          <Card emoji="🗺️" title="Itinerary" sub="Final Plan" highlighted={isCard("itinerary")} />
        </div>

        {/* DESTINATION ↓ ITINERARY */}
        <div className="absolute top-[310px] left-[90px]">
            <br></br>
          <ArrowDown highlighted={isArrow("destination-itinerary")} />
        </div>

      </div>
    </div>
  );
}