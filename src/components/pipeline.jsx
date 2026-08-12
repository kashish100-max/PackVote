import { useState } from "react";
import Card from "./Card";
import ArrowDown from "./ArrowDown";

export default function Pipeline() {
  const [hovered, setHovered] = useState(null);

  const highlights = {
    users: {
      cards: ["users", "ai"],
      arrows: ["users-ai"],
    },

    ai: {
      cards: ["users", "ai", "consensus"],
      arrows: ["users-ai", "ai-consensus"],
    },

    consensus: {
      cards: ["ai", "consensus", "destination"],
      arrows: ["ai-consensus", "consensus-destination"],
    },

    destination: {
      cards: ["consensus", "destination", "itinerary"],
      arrows: [
        "consensus-destination",
        "destination-itinerary",
      ],
    },

    itinerary: {
      cards: ["destination", "itinerary"],
      arrows: ["destination-itinerary"],
    },
  };

  const active = hovered
    ? highlights[hovered]
    : { cards: [], arrows: [] };

  const isCard = (id) =>
    active.cards.includes(id);

  const isArrow = (id) =>
    active.arrows.includes(id);

  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex flex-col items-center w-full max-w-[420px]">

        {/* =============================== */}
        {/* STEP 1 — GROUP PREFERENCES */}
        {/* =============================== */}

        <div
          className="cursor-pointer"
          onMouseEnter={() => setHovered("users")}
          onMouseLeave={() => setHovered(null)}
        >
          <Card
            emoji="👥"
            title="Group"
            sub="Preferences"
            highlighted={isCard("users")}
          />
        </div>

        {/* ARROW */}

        <div className="py-6">
          <ArrowDown
            highlighted={isArrow("users-ai")}
          />
        </div>

        {/* =============================== */}
        {/* STEP 2 — ML MODEL */}
        {/* =============================== */}

        <div
          className="cursor-pointer"
          onMouseEnter={() => setHovered("ai")}
          onMouseLeave={() => setHovered(null)}
        >
          <Card
            emoji="🧠"
            title="ML Model"
            sub="Individual Predictions"
            highlighted={isCard("ai")}
          />
        </div>

        {/* ARROW */}

        <div className="py-6">
          <ArrowDown
            highlighted={isArrow("ai-consensus")}
          />
        </div>

        {/* =============================== */}
        {/* STEP 3 — CONSENSUS */}
        {/* =============================== */}

        <div
          className="cursor-pointer"
          onMouseEnter={() => setHovered("consensus")}
          onMouseLeave={() => setHovered(null)}
        >
          <Card
            emoji="📊"
            title="Consensus"
            sub="Top-3 Voting"
            highlighted={isCard("consensus")}
          />
        </div>

        {/* ARROW */}

        <div className="py-6">
          <ArrowDown
            highlighted={isArrow(
              "consensus-destination"
            )}
          />
        </div>

        {/* =============================== */}
        {/* STEP 4 — DESTINATION */}
        {/* =============================== */}

        <div
          className="cursor-pointer"
          onMouseEnter={() =>
            setHovered("destination")
          }
          onMouseLeave={() => setHovered(null)}
        >
          <Card
            emoji="📍"
            title="Destination"
            sub="Group Top Pick"
            highlighted={isCard("destination")}
          />
        </div>

        {/* ARROW */}

        <div className="py-6">
          <ArrowDown
            highlighted={isArrow(
              "destination-itinerary"
            )}
          />
        </div>

        {/* =============================== */}
        {/* STEP 5 — GEMINI */}
        {/* =============================== */}

        <div
          className="cursor-pointer"
          onMouseEnter={() =>
            setHovered("itinerary")
          }
          onMouseLeave={() => setHovered(null)}
        >
          <Card
            emoji="✨"
            title="Gemini"
            sub="Personalized Itinerary"
            highlighted={isCard("itinerary")}
          />
        </div>

      </div>
    </div>
  );
}