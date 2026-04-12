const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ⏳ Helper delay function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fallbackData = {
  "Varanasi": {
    summary: "Discover the spiritual heart of India through ancient ghats and divine evening prayers.",
    days: [
      { day: 1, title: "Ghats & Spirituality", activities: ["Morning: Sunrise Boat Ride on Ganges", "Afternoon: Kashi Vishwanath Temple", "Evening: Ganga Aarti at Dashashwamedh Ghat"], meals: "Varanasi Tamatar Chaat & Jalebi" }
    ]
  },
  "Amritsar": {
    summary: "A journey of faith at the Golden Temple and history at the Wagah Border.",
    days: [
      { day: 1, title: "Spirit & Valor", activities: ["Morning: Golden Temple", "Afternoon: Partition Museum", "Evening: Wagah Border Ceremony"], meals: "Amritsari Kulcha" }
    ]
  },
  "Ajmer Sharif": {
    summary: "Seek blessings at the holy Dargah and explore the serene Ana Sagar Lake.",
    days: [
      { day: 1, title: "Devotion & Serenity", activities: ["Morning: Khwaja Moinuddin Chishti Dargah", "Afternoon: Adhai Din Ka Jhonpra", "Evening: Sunset at Ana Sagar Lake"], meals: "Sohen Halwa & Biryani" }
    ]
  },
  "Tirupati": {
    summary: "A sacred pilgrimage to the abode of Lord Venkateswara amidst the Tirumala hills.",
    days: [
      { day: 1, title: "Divine Darshan", activities: ["Morning: Tirumala Temple Visit", "Afternoon: Silathoranam Rock", "Evening: Kapila Theertham Waterfalls"], meals: "Traditional Tirupati Laddu" }
    ]
  },
  "Vaishno Devi": {
    summary: "A soulful trek through the Trikuta mountains to the holy cave shrine.",
    days: [
      { day: 1, title: "The Holy Trek", activities: ["Morning: Start trek from Katra", "Afternoon: Ardhkuwari Darshan", "Evening: Main Bhavan Darshan"], meals: "Satvik Food at Shrine" }
    ]
  },
  "Bodh Gaya": {
    summary: "Trace the footsteps of Buddha at the place of his enlightenment.",
    days: [
      { day: 1, title: "Enlightenment Path", activities: ["Morning: Mahabodhi Temple", "Afternoon: Great Buddha Statue", "Evening: Meditation at Bodhi Tree"], meals: "Local Bihari Cuisine" }
    ]
  },
  "Manali": {
    summary: "Escape to the snow-capped peaks and adventurous trails of the Beas Valley.",
    days: [
      { day: 1, title: "Mountain Adventure", activities: ["Morning: Rohtang Pass/Solang Valley", "Afternoon: Hadimba Temple", "Evening: Old Manali Cafe Hopping"], meals: "Siddus & Thukpa" }
    ]
  },
  "Leh": {
    summary: "High-altitude desert landscapes, ancient monasteries, and azure lakes.",
    days: [
      { day: 1, title: "Monasteries & Magic", activities: ["Morning: Shanti Stupa", "Afternoon: Leh Palace", "Evening: Magnetic Hill & Confluence"], meals: "Ladakhi Skyu" }
    ]
  },
  "Spiti": {
    summary: "The middle land between India and Tibet, offering raw Himalayan beauty.",
    days: [
      { day: 1, title: "Remote Wonders", activities: ["Morning: Key Monastery", "Afternoon: Kibber Village", "Evening: Stargazing in Langza"], meals: "Spitian Butter Tea" }
    ]
  },
  "Kasol": {
    summary: "Relax by the Parvati River in India's own 'Little Greece'.",
    days: [
      { day: 1, title: "Riverside Vibes", activities: ["Morning: Chalal Trek", "Afternoon: Manikaran Sahib", "Evening: Riverside Relaxation"], meals: "Israeli Hummus & Falafel" }
    ]
  },
  "Auli": {
    summary: "India’s premier skiing destination with breathtaking views of Nanda Devi.",
    days: [
      { day: 1, title: "Skiing & Peaks", activities: ["Morning: Cable Car Ride", "Afternoon: Skiing Lesson", "Evening: Gurso Bugyal Trek"], meals: "Garhwali Cuisine" }
    ]
  },
  "Goa": {
    summary: "Pristine beaches, Portuguese history, and a party vibe like no other.",
    days: [
      { day: 1, title: "Sun, Surf & Sand", activities: ["Morning: Baga Beach Water Sports", "Afternoon: Fort Aguada", "Evening: Shack Party"], meals: "Goan Prawn Curry" }
    ]
  },
  "Gokarna": {
    summary: "The laid-back alternative to Goa with OM-shaped beaches and temples.",
    days: [
      { day: 1, title: "Beach Trekking", activities: ["Morning: Mahabaleshwar Temple", "Afternoon: Om Beach to Half Moon Beach Trek", "Evening: Sunset at Kudle"], meals: "Seafood Platter" }
    ]
  },
  "Kerala": {
    summary: "Glide through the backwaters and witness the lush greenery of God's Own Country.",
    days: [
      { day: 1, title: "Backwater Bliss", activities: ["Morning: Alleppey Houseboat Cruise", "Afternoon: Paddy Field Walk", "Evening: Kathakali Performance"], meals: "Sadya on Banana Leaf" }
    ]
  },
  "Andaman": {
    summary: "Turquoise waters, coral reefs, and the historical Cellular Jail.",
    days: [
      { day: 1, title: "Island Life", activities: ["Morning: Radhanagar Beach", "Afternoon: Scuba Diving", "Evening: Light & Sound Show at Cellular Jail"], meals: "Fresh Crab Curry" }
    ]
  },
  "Coorg": {
    summary: "The 'Scotland of India' filled with coffee plantations and misty hills.",
    days: [
      { day: 1, title: "Coffee & Nature", activities: ["Morning: Abbey Falls", "Afternoon: Coffee Plantation Tour", "Evening: Raja’s Seat Sunset"], meals: "Pandi Curry & Akki Roti" }
    ]
  },
  "Ooty": {
    summary: "A nostalgic hill station experience with toy trains and botanical gardens.",
    days: [
      { day: 1, title: "Tea & Trains", activities: ["Morning: Nilgiri Toy Train", "Afternoon: Ooty Lake Boat Ride", "Evening: Doddabetta Peak"], meals: "Ooty Varkey & Chocolates" }
    ]
  },
  "Jaipur": {
    summary: "Explore the royal grandeur of the Pink City's forts and palaces.",
    days: [
      { day: 1, title: "Royal Heritage", activities: ["Morning: Amber Fort Elephant Ride", "Afternoon: Hawa Mahal & City Palace", "Evening: Chokhi Dhani Dinner"], meals: "Dal Baati Churma" }
    ]
  },
  "Udaipur": {
    summary: "The City of Lakes, offering a romantic getaway in royal Rajasthan.",
    days: [
      { day: 1, title: "Lakeside Luxury", activities: ["Morning: City Palace", "Afternoon: Lake Pichola Boat Ride", "Evening: Bagore Ki Haveli Dance Show"], meals: "Laal Maas" }
    ]
  },
  "Hampi": {
    summary: "Step back in time at the boulder-strewn ruins of the Vijayanagara Empire.",
    days: [
      { day: 1, title: "Stone Chariots & Ruins", activities: ["Morning: Virupaksha Temple", "Afternoon: Vittala Temple", "Evening: Sunset at Hemakuta Hill"], meals: "South Indian Thali" }
    ]
  },
  "Dubai": {
    summary: "A futuristic oasis of skyscrapers, luxury shopping, and desert safaris.",
    days: [
      { day: 1, title: "Modern Wonders", activities: ["Morning: Burj Khalifa Observation Deck", "Afternoon: Dubai Mall Shopping", "Evening: Fountain Show & Marina Walk"], meals: "Shawarma & Mandi" }
    ]
  },
  "Paris": {
    summary: "The City of Lights, known for its art, fashion, and iconic monuments.",
    days: [
      { day: 1, title: "Art & Icons", activities: ["Morning: Louvre Museum", "Afternoon: Eiffel Tower", "Evening: Seine River Cruise"], meals: "Croissants & Escargot" }
    ]
  },
  "Bali": {
    summary: "Tropical paradise with lush rice terraces and vibrant spiritual culture.",
    days: [
      { day: 1, title: "Ubud Culture", activities: ["Morning: Tegalalang Rice Terrace", "Afternoon: Sacred Monkey Forest", "Evening: Ubud Palace Dance"], meals: "Nasi Goreng" }
    ]
  }
};

async function generateItinerary(destination, userPreferences) {
  const prompt = `
  You are a professional travel planner.

  Destination: ${destination}
  Duration: ${userPreferences.duration_days} days

  Rules:
  - Make itinerary realistic and not overloaded
  - Include morning, afternoon, evening
  - Add slightly unique/local experiences (not generic)
  - Maintain logical travel flow

  Output JSON only:
  {
    "summary": "2 line engaging summary",
    "days": [
      {
        "day": 1,
        "title": "Theme of the day",
        "activities": [
          "Morning: ...",
          "Afternoon: ...",
          "Evening: ..."
        ]
      }
    ]
  }
  `;

  // 🔁 Models priority list
  const models = [
    "gemini-2.5-flash", // primary (fast + smart)
    "gemini-2.0-flash", // fallback (more stable)
  ];

  const maxRetries = 3;

  for (let modelName of models) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🚀 Trying ${modelName} (Attempt ${attempt})`);

        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
        });

        const text = response.text;

        // 🧹 Clean response (remove markdown if any)
        const clean = text.replace(/```json|```/g, "");

        // 📦 Extract JSON safely
        const match = clean.match(/\{[\s\S]*\}/);
        if (!match) throw new Error("Invalid JSON format");

        const parsed = JSON.parse(match[0]);

        console.log("✅ Itinerary generated successfully");
        return parsed;

      } catch (error) {
  console.log(
    `❌ ${modelName} failed (Attempt ${attempt}):`,
    error.message
  );

  // 🔥 Handle quota error
  if (
    error.status === 429 ||
    error.message.includes("quota") ||
    error.message.includes("RESOURCE_EXHAUSTED")
  ) {
    console.log("⏳ Quota exceeded. Waiting 40s...");
    await delay(40000);
    continue;
  }

  if (attempt === maxRetries) {
    console.log(`⚠️ Switching model from ${modelName}`);
    break;
  }

  await delay(1000 * attempt);
}
    }
  }

  // ❌ Final fallback
  return {
    summary: `A wonderful trip to ${destination} tailored to your preferences.`,
    days: [
      { day: 1, title: "Welcome to " + destination, activities: ["Morning: Arrival & Hotel Check-in", "Afternoon: Explore Local Markets", "Evening: Relaxing Dinner"], meals: "Local Specialties" },
      { day: 2, title: "City Landmarks", activities: ["Morning: Major Landmark Visit", "Afternoon: Local Museum/Park", "Evening: Cultural Show"], meals: "Traditional Cuisine" }
    ]
  };
}

module.exports = { generateItinerary };

