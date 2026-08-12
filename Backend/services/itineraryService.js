const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ⏳ Helper delay function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fallbackData = {
  "Varanasi": {
    summary: "Experience the timeless spiritual essence of Kashi, from ancient sunrise rituals to divine evening prayers.",
    days: [
      { day: 1, title: "Ghats & Spirituality", activities: ["Morning: Sunrise Boat Ride on Ganges", "Afternoon: Kashi Vishwanath Temple & Annapurna Mandir", "Evening: Grand Ganga Aarti at Dashashwamedh Ghat"], meals: "Varanasi Tamatar Chaat & Jalebi" },
      { day: 2, title: "History & Silk Heritage", activities: ["Morning: Sarnath (Buddha's First Sermon site)", "Afternoon: Ramnagar Fort & Museum", "Evening: Exploring Banarasi Silk Weaving Centers"], meals: "Kachori Sabzi & Baati Chokha" },
      { day: 3, title: "University & Hidden Lanes", activities: ["Morning: BHU Campus & New Vishwanath Temple", "Afternoon: Sankat Mochan & Tulsi Manas Mandir", "Evening: Street food crawl through narrow Manikarnika lanes"], meals: "Blue Lassi & Rabri" }
    ]
  },
  "Amritsar": {
    summary: "A journey through the soul of Punjab, blending deep spiritual devotion with heroic national history.",
    days: [
      { day: 1, title: "The Holy Precinct", activities: ["Morning: Golden Temple (Harmandir Sahib) Darshan", "Afternoon: Jallianwala Bagh Memorial", "Evening: Palki Sahib Ceremony at the Temple"], meals: "Amritsari Kulcha & Lassi" },
      { day: 2, title: "Patriotism & Borders", activities: ["Morning: Partition Museum (Town Hall)", "Afternoon: Durgiana Temple visit", "Evening: Wagah Border Beating Retreat Ceremony"], meals: "Beera Chicken or Kesar Da Dhaba Thali" },
      { day: 3, title: "Culture & Village Life", activities: ["Morning: Sadda Pind (Punjabi Cultural Village)", "Afternoon: Gobindgarh Fort Light & Sound Show", "Evening: Shopping for Phulkari at Hall Bazaar"], meals: "Makki di Roti & Sarson da Saag" }
    ]
  },
  "Ajmer Sharif": {
    summary: "Find peace in the Sufi soul of Ajmer and the sacred vibrations of the Pushkar valley.",
    days: [
      { day: 1, title: "Sufi Serenity", activities: ["Morning: Dargah Sharif of Khwaja Moinuddin Chishti", "Afternoon: Adhai Din Ka Jhonpra (Ancient Mosque)", "Evening: Boating at Ana Sagar Lake"], meals: "Ajmer Sohan Halwa & Biryani" },
      { day: 2, title: "Pushkar Day Trip", activities: ["Morning: Brahma Temple (Only one in the world)", "Afternoon: Hiking to Savitri Mata Temple", "Evening: Sunset Aarti at Pushkar Lake Ghats"], meals: "Pushkar Malpua & Dal Baati" },
      { day: 3, title: "Royal Architecture", activities: ["Morning: Taragarh Fort Hike", "Afternoon: Akbar's Palace & Museum", "Evening: Shopping for silver jewelry in local markets"], meals: "Traditional Rajasthani Thali" }
    ]
  },
  "Tirupati": {
    summary: "A divine ascent to the Seven Hills, seeking blessings from the Lord of the Universe.",
    days: [
      { day: 1, title: "The Divine Ascent", activities: ["Morning: Tirumala Venkateswara Temple Darshan", "Afternoon: Srivari Padalu (Lord's Footprints)", "Evening: Akasaganga Waterfalls"], meals: "Tirumala Laddu & Tamarind Rice" },
      { day: 2, title: "Temple Trails", activities: ["Morning: Padmavathi Amman Temple (Tiruchanur)", "Afternoon: Kapila Theertham Temple", "Evening: ISKCON Tirupati Temple"], meals: "Authentic Andhra Meals" },
      { day: 3, title: "Natural Wonders", activities: ["Morning: Silathoranam (Natural Stone Arch)", "Afternoon: Chandragiri Fort & Museum", "Evening: Talakona Waterfalls (Nature Walk)"], meals: "Pulihora & Curd Rice" }
    ]
  },
  "Vaishno Devi": {
    summary: "A soulful trek through the Trikuta mountains, where faith gives strength to every step.",
    days: [
      { day: 1, title: "The Holy Journey Begins", activities: ["Morning: Start 12km trek from Katra", "Afternoon: Ardhkuwari Darshan (The halfway cave)", "Evening: Reaching the Main Bhavan for Aarti"], meals: "Satvik Food (No Onion/Garlic)" },
      { day: 2, title: "The Peak Blessings", activities: ["Morning: Main Holy Cave Darshan", "Afternoon: Ropeway/Trek to Bhairon Nath Temple", "Evening: Resting at Bhavan/Trek down"], meals: "Rajma Chawal at Katra" },
      { day: 3, title: "Katra Relaxation", activities: ["Morning: Shopping for dry fruits & walnuts", "Afternoon: Relaxing foot massage in Katra", "Evening: Visit to Nau Devi Temple"], meals: "Local Dogra Cuisine" }
    ]
  },
  "Bodh Gaya": {
    summary: "Walk the path of enlightenment where Prince Siddhartha became the Buddha.",
    days: [
      { day: 1, title: "Under the Bodhi Tree", activities: ["Morning: Mahabodhi Temple Complex", "Afternoon: Meditation under the Bodhi Tree", "Evening: Great Buddha Statue (80ft)"], meals: "Local Bihari Litti Chokha" },
      { day: 2, title: "Monastery Tour", activities: ["Morning: Thai, Japanese & Tibetan Monasteries", "Afternoon: Archaeological Museum Bodhgaya", "Evening: Tergar Monastery visit"], meals: "Tibetan Momos & Thukpa" },
      { day: 3, title: "History & Caves", activities: ["Morning: Dungeshwari Cave Temples", "Afternoon: Sujata Stupa (Sujata Village)", "Evening: Riverside meditation at Niranjana River"], meals: "Simple Satvik Thali" }
    ]
  },
  "Manali": {
    summary: "Adventure meets tranquility in the lap of the Himalayas and the banks of the Beas.",
    days: [
      { day: 1, title: "Snow & Adventure", activities: ["Morning: Rohtang Pass or Solang Valley", "Afternoon: Paragliding and Snow Scooters", "Evening: Jogini Falls Trek"], meals: "Siddus with Ghee & Thukpa" },
      { day: 2, title: "Manali Culture", activities: ["Morning: Hadimba Devi Temple", "Afternoon: Manu Temple & Old Manali Walk", "Evening: Cafe hopping in Old Manali"], meals: "River Trout Fish or Pizza" },
      { day: 3, title: "Hot Springs & Market", activities: ["Morning: Vashisht Hot Water Springs", "Afternoon: Tibetan Monastery", "Evening: Shopping at Mall Road"], meals: "Gulab Jamun & Local Momos" }
    ]
  },
  "Leh": {
    summary: "Discover the rugged beauty of the high-altitude desert and ancient Buddhist culture.",
    days: [
      { day: 1, title: "Acclimatization & Local", activities: ["Morning: Rest for Altitude adjustment", "Afternoon: Shanti Stupa", "Evening: Leh Palace & Main Bazaar"], meals: "Ladakhi Skyu & Butter Tea" },
      { day: 2, title: "The Confluence & Hills", activities: ["Morning: Magnetic Hill & Gurudwara Pathar Sahib", "Afternoon: Sangam (Indus-Zanskar confluence)", "Evening: Hall of Fame War Museum"], meals: "Mokthuk & Tingmo" },
      { day: 3, title: "Monastery Trail", activities: ["Morning: Hemis & Thiksey Monasteries", "Afternoon: Shey Palace", "Evening: Stok Village walk"], meals: "Chutagi (Local Dumplings)" }
    ]
  },
  "Spiti": {
    summary: "Journey to the 'Middle Land'—a raw, untouched Himalayan desert with ancient secrets.",
    days: [
      { day: 1, title: "Kaza & Key", activities: ["Morning: Key Monastery (The Iconic Fort)", "Afternoon: Kibber Village (High altitude settlement)", "Evening: Stargazing in the clear Kaza sky"], meals: "Spitian Thali & Barley snacks" },
      { day: 2, title: "The Fossil Village", activities: ["Morning: Langza (The Buddha Statue village)", "Afternoon: Hikkim (Highest Post Office)", "Evening: Komic (Highest connected village)"], meals: "Thukpa & Butter Tea" },
      { day: 3, title: "Lake & Reflection", activities: ["Morning: Chandratal Lake (The Moon Lake)", "Afternoon: Dhankar Monastery & Fort", "Evening: Kunzum Pass view"], meals: "Instant Maggi & Local Bread" }
    ]
  },
  "Kasol": {
    summary: "Unwind by the gushing Parvati River in India's own scenic Little Greece.",
    days: [
      { day: 1, title: "Riverside Chilling", activities: ["Morning: Chalal Village Trek", "Afternoon: Parvati River Bank relaxation", "Evening: Exploring Kasol Market Cafes"], meals: "Israeli Hummus & Falafel" },
      { day: 2, title: "Spiritual Springs", activities: ["Morning: Manikaran Sahib Gurudwara", "Afternoon: Hot Water Springs Dip", "Evening: Shopping for hippie souvenirs"], meals: "Langar Food & Momos" },
      { day: 3, title: "The Pine Forest", activities: ["Morning: Tosh Village Trek", "Afternoon: Views of the glaciers", "Evening: Bonfire at a Riverside camp"], meals: "Waffles & Coffee" }
    ]
  },
  "Auli": {
    summary: "Experience India's premier skiing slopes with unmatched views of the Nanda Devi peak.",
    days: [
      { day: 1, title: "The Ropeway Experience", activities: ["Morning: Cable Car Ride from Joshimath", "Afternoon: Skiing lessons on the slopes", "Evening: Sunset views of Nanda Devi"], meals: "Garhwali Kafuli & Badi" },
      { day: 2, title: "Trek to the Lake", activities: ["Morning: Gurso Bugyal Trek", "Afternoon: Artificial Lake visit", "Evening: Photography session at the peaks"], meals: "Phaanu & Steamed Rice" },
      { day: 3, title: "Temple & Silence", activities: ["Morning: Narsingh Temple (Joshimath)", "Afternoon: Auli Gorson Trek", "Evening: Relaxing at the resort"], meals: "Hot Soup & Local Tea" }
    ]
  },
  "Goa": {
    summary: "From sun-kissed beaches to Portuguese charm, Goa is the ultimate tropical escape.",
    days: [
      { day: 1, title: "North Goa Fun", activities: ["Morning: Baga & Calangute Beach", "Afternoon: Water Sports at Candolim", "Evening: Sunburn/Clubbing at Tito's Lane"], meals: "Goan Fish Curry & Rice" },
      { day: 2, title: "Old Goa Heritage", activities: ["Morning: Basilica of Bom Jesus", "Afternoon: Panjim Latin Quarter (Fontainhas)", "Evening: Mandovi River Sunset Cruise"], meals: "Bebinca & Prawn Balchao" },
      { day: 3, title: "South Goa Peace", activities: ["Morning: Palolem or Colva Beach", "Afternoon: Cabo de Rama Fort", "Evening: Silent Noise Party or Shack Dinner"], meals: "Feni & Sea Food Platter" }
    ]
  },
  "Gokarna": {
    summary: "The soulful alternative to Goa, where the forest meets the OM-shaped coastline.",
    days: [
      { day: 1, title: "Beach Trekking", activities: ["Morning: Mahabaleshwar Temple visit", "Afternoon: Trekking from Kudle to Om Beach", "Evening: Sunset at Om Beach"], meals: "Seafood Pasta & Coconut Water" },
      { day: 2, title: "Hidden Gems", activities: ["Morning: Half Moon Beach boat ride", "Afternoon: Paradise Beach relaxation", "Evening: Stargazing on the cliffs"], meals: "Nutella Pancakes & Iced Coffee" },
      { day: 3, title: "Mirjan & History", activities: ["Morning: Mirjan Fort (Historical Green Fort)", "Afternoon: Kotitirtha (Holy Pond)", "Evening: Shopping for handicrafts in the temple street"], meals: "Kannada Style Thali" }
    ]
  },
  "Kerala": {
    summary: "Sail through emerald backwaters and breathe in the spice-scented mountain air.",
    days: [
      { day: 1, title: "Backwater Bliss", activities: ["Morning: Alleppey Houseboat Check-in", "Afternoon: Cruising through Vembanad Lake", "Evening: Shikara ride in narrow canals"], meals: "Karimeen Pollichathu (Pearl Spot Fish)" },
      { day: 2, title: "Tea Gardens of Munnar", activities: ["Morning: Eravikulam National Park", "Afternoon: Tea Museum & Plantation walk", "Evening: Kathakali performance at the center"], meals: "Kerala Sadya on Banana Leaf" },
      { day: 3, title: "The Chinese Nets", activities: ["Morning: Fort Kochi & Mattancherry Palace", "Afternoon: St. Francis Church", "Evening: Watching the Chinese Fishing Nets"], meals: "Puttu & Kadala Curry" }
    ]
  },
  "Andaman": {
    summary: "Turquoise lagoons and coral wonders in India's own exotic island paradise.",
    days: [
      { day: 1, title: "Havelock Island", activities: ["Morning: Radhanagar Beach (Asia's Best)", "Afternoon: Kayaking in Mangroves", "Evening: Beachside Bonfire"], meals: "Fresh Crab & Lobster" },
      { day: 2, title: "Underwater World", activities: ["Morning: Scuba Diving at Elephant Beach", "Afternoon: Snorkeling & Jet Skiing", "Evening: Dinner at a themed Cafe"], meals: "Coconut Prawn Curry" },
      { day: 3, title: "Port Blair History", activities: ["Morning: Cellular Jail (Kala Pani) visit", "Afternoon: Ross Island (Netaji Subhash Island)", "Evening: Light & Sound Show"], meals: "Burmese Style Noodles" }
    ]
  },
  "Coorg": {
    summary: "Breathe in the aroma of fresh coffee in the misty 'Scotland of India'.",
    days: [
      { day: 1, title: "Coffee & Falls", activities: ["Morning: Abbey Falls", "Afternoon: Coffee Plantation Tour & Tasting", "Evening: Raja's Seat Sunset view"], meals: "Pandi Curry (Pork) & Akki Roti" },
      { day: 2, title: "Tibetan Soul", activities: ["Morning: Namdroling Monastery (Golden Temple)", "Afternoon: Dubare Elephant Camp", "Evening: Cauvery River rafting (Seasonal)"], meals: "Bamboo Shoot Curry & Rice" },
      { day: 3, title: "Hills & Valleys", activities: ["Morning: Mandalpatti Jeep Safari", "Afternoon: Madikeri Fort", "Evening: Local spice shopping"], meals: "Kodava Style Chicken" }
    ]
  },
  "Ooty": {
    summary: "A nostalgic ride through tea gardens and colonial charm in the Nilgiri Hills.",
    days: [
      { day: 1, title: "The Toy Train", activities: ["Morning: Nilgiri Mountain Railway ride", "Afternoon: Ooty Botanical Gardens", "Evening: Boating at Ooty Lake"], meals: "Nilgiri Tea & Homemade Chocolates" },
      { day: 2, title: "Tea & Peaks", activities: ["Morning: Doddabetta Peak (Highest point)", "Afternoon: Tea Factory & Museum visit", "Evening: Rose Garden stroll"], meals: "Varkey & South Indian Thali" },
      { day: 3, title: "Coonoor Day Trip", activities: ["Morning: Sim's Park Coonoor", "Afternoon: Dolphin's Nose & Lamb's Rock", "Evening: High tea at a tea bungalow"], meals: "Chicken Chettinad" }
    ]
  },
  "Jaipur": {
    summary: "The Pink City—a royal symphony of massive forts, grand palaces, and vibrant bazaars.",
    days: [
      { day: 1, title: "Royal Forts", activities: ["Morning: Amber Fort Elephant Ride", "Afternoon: Panna Meena ka Kund (Stepwell)", "Evening: Jal Mahal view & Chokhi Dhani"], meals: "Dal Baati Churma" },
      { day: 2, title: "Palatial History", activities: ["Morning: Hawa Mahal & City Palace", "Afternoon: Jantar Mantar (UNESCO site)", "Evening: Shopping at Johari & Bapu Bazaar"], meals: "Pyaaz Kachori & Lassi" },
      { day: 3, title: "Panoramic Views", activities: ["Morning: Nahargarh Fort hike", "Afternoon: Jaigarh Fort (The Big Cannon)", "Evening: Dinner with a view of the Pink City"], meals: "Laal Maas & Bajra Roti" }
    ]
  },
  "Udaipur": {
    summary: "The City of Lakes—an elegant blend of romantic lakeside settings and royal Mewar history.",
    days: [
      { day: 1, title: "Lakeside Romance", activities: ["Morning: City Palace Complex", "Afternoon: Jagdish Temple", "Evening: Lake Pichola Sunset Boat Ride"], meals: "Udaipuri Kachori & Mewari Thali" },
      { day: 2, title: "Palaces & Gardens", activities: ["Morning: Saheliyon-ki-Bari", "Afternoon: Sajjangarh Monsoon Palace", "Evening: Bagore ki Haveli Folk Dance"], meals: "Ker Sangri & Gatte ki Sabzi" },
      { day: 3, title: "Modern & Vintage", activities: ["Morning: Vintage Car Museum", "Afternoon: Fateh Sagar Lake boating", "Evening: Dinner at a rooftop lakeside cafe"], meals: "Kulhad Coffee & Fried Snacks" }
    ]
  },
  "Hampi": {
    summary: "Lose yourself in the boulder-strewn landscape of the fallen Vijayanagara Empire.",
    days: [
      { day: 1, title: "The Stone Chariot", activities: ["Morning: Vittala Temple (Musical Pillars)", "Afternoon: Lotus Mahal & Elephant Stables", "Evening: Sunset at Hemakuta Hill"], meals: "Banana Leaf South Indian Thali" },
      { day: 2, title: "Riverside Ruins", activities: ["Morning: Virupaksha Temple", "Afternoon: Coracle ride in Tungabhadra River", "Evening: Achyutaraya Temple trek"], meals: "Ragi Mudde & Saaru" },
      { day: 3, title: "The Other Side", activities: ["Morning: Hippie Island (Anegundi)", "Afternoon: Anjanadri Hill (Hanuman's birthplace)", "Evening: Sanapur Lake cliff jumping"], meals: "Israeli Breakfast & Wood-fired Pizza" }
    ]
  },
  "Dubai": {
    summary: "A glittering oasis of futuristic engineering, luxury shopping, and desert adventure.",
    days: [
      { day: 1, title: "Burj & Fountains", activities: ["Morning: Burj Khalifa At the Top", "Afternoon: Dubai Mall & Aquarium", "Evening: Dubai Fountain Show & Marina Walk"], meals: "Mandi & Shawarma" },
      { day: 2, title: "Desert Safari", activities: ["Morning: Museum of the Future", "Afternoon: Desert Safari with Dune Bashing", "Evening: Belly dance & BBQ Dinner in desert camp"], meals: "Arabic Mezze Platter" },
      { day: 3, title: "Old & New Dubai", activities: ["Morning: Jumeirah Beach & Burj Al Arab view", "Afternoon: Gold & Spice Souks", "Evening: Palm Jumeirah & Atlantis tour"], meals: "Al Harees & Luqaimat" }
    ]
  },
  "Paris": {
    summary: "The City of Lights—where every street corner feels like a masterpiece of art and history.",
    days: [
      { day: 1, title: "Icons of Paris", activities: ["Morning: Eiffel Tower Summit", "Afternoon: Arc de Triomphe & Champs-Élysées", "Evening: Seine River Cruise at night"], meals: "Croissants & Escargot" },
      { day: 2, title: "Art & Culture", activities: ["Morning: Louvre Museum (Mona Lisa)", "Afternoon: Notre-Dame Cathedral", "Evening: Montmartre & Sacré-Cœur"], meals: "French Onion Soup & Crepes" },
      { day: 3, title: "Palace of Kings", activities: ["Morning: Day trip to Palace of Versailles", "Afternoon: The Hall of Mirrors & Gardens", "Evening: Latin Quarter exploration"], meals: "Ratatouille & Macarons" }
    ]
  },
  "Bali": {
    summary: "A tropical spiritual haven of lush rice terraces, ancient temples, and volcanic beaches.",
    days: [
      { day: 1, title: "Ubud Culture", activities: ["Morning: Tegalalang Rice Terrace & Swing", "Afternoon: Sacred Monkey Forest", "Evening: Ubud Traditional Dance show"], meals: "Nasi Goreng & Satay" },
      { day: 2, title: "Temples & Sunsets", activities: ["Morning: Lempuyang Temple (Gates of Heaven)", "Afternoon: Tirta Gangga Water Palace", "Evening: Tanah Lot Sunset"], meals: "Babi Guling or Vegan Buddha Bowls" },
      { day: 3, title: "Island Hopping", activities: ["Morning: Speedboat to Nusa Penida", "Afternoon: Kelingking Beach (T-Rex Bay)", "Evening: Dinner in Seminyak"], meals: "Gado Gado & Coconut Ice Cream" }
    ]
  }
};

async function generateItinerary(destination, userPreferences) {
  console.log("🔍 Generating itinerary for:", destination);

  // --------------------------------------------------
  // 1. CHECK GEMINI API KEY
  // --------------------------------------------------

  // If API key is missing, don't even try the API.
  // Directly use destination-specific fallback if available.
  if (!process.env.GEMINI_API_KEY) {
    console.log(
      "⚠️ GEMINI_API_KEY not found. Using fallback itinerary."
    );

    if (fallbackData[destination]) {
      console.log(
        "✅ Using destination-specific fallback for:",
        destination
      );

      return fallbackData[destination];
    }

    return getGenericFallback(destination);
  }

  // --------------------------------------------------
  // 2. PREPARE GEMINI PROMPT
  // --------------------------------------------------

  const prompt = `You are a professional travel planner.

Create a personalized group travel itinerary for ${destination}.

The following data represents the entire travel group:

${JSON.stringify(userPreferences, null, 2)}

Important:
- Balance the preferences of the entire group.
- Do not optimize for only one member.
- Prioritize preferences shared by multiple members.
- Make reasonable compromises when preferences conflict.
- Respect the group's average budget and duration.
- Consider dietary preferences while suggesting meals.

Return ONLY valid JSON in this exact structure:

{
  "summary": "short summary of the group trip",
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "activities": [
        "Morning: activity",
        "Afternoon: activity",
        "Evening: activity"
      ],
      "meals": "Suggested meals"
    }
  ]
}

Do not include markdown or code fences.
`;

  // --------------------------------------------------
  // 3. TRY GEMINI
  // --------------------------------------------------

  const models = [
  "gemini-3.5-flash",
  "gemini-2.5-pro"
];

  for (let modelName of models) {
    try {
      console.log(`🚀 Trying AI Model: ${modelName}`);

      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
      });

      const text = response.text;

      if (!text) {
        throw new Error("Gemini returned an empty response");
      }

      // Remove markdown code fences if Gemini adds them
      const clean = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      // Extract JSON object
      const match = clean.match(/\{[\s\S]*\}/);

      if (!match) {
        throw new Error(
          "Gemini response did not contain valid JSON"
        );
      }

      let parsed;

      try {
        parsed = JSON.parse(match[0]);
      } catch (parseError) {
        throw new Error(
          `Invalid JSON returned by Gemini: ${parseError.message}`
        );
      }

      // --------------------------------------------------
      // 4. VALIDATE ITINERARY STRUCTURE
      // --------------------------------------------------

      if (
        !parsed ||
        typeof parsed.summary !== "string" ||
        !Array.isArray(parsed.days) ||
        parsed.days.length === 0
      ) {
        throw new Error(
          "Gemini returned an invalid itinerary structure"
        );
      }

      console.log(
        `✅ Gemini itinerary generated successfully using ${modelName}`
      );

      return parsed;

    } catch (error) {

      console.log(
        `❌ AI Failed for ${modelName}:`,
        error.message
      );

      // --------------------------------------------------
      // QUOTA / RATE LIMIT
      // --------------------------------------------------

      const errorMessage = error.message.toLowerCase();

      if (
        errorMessage.includes("quota") ||
        errorMessage.includes("429") ||
        errorMessage.includes("rate limit")
      ) {
        console.log(
          "⚠️ Gemini quota/rate limit reached."
        );

        // No point trying another model if the API quota
        // itself is exhausted.
        break;
      }

      // Otherwise continue to the next Gemini model
      console.log(
        "🔄 Trying next Gemini model..."
      );
    }
  }

  // --------------------------------------------------
  // 5. DESTINATION-SPECIFIC FALLBACK
  // --------------------------------------------------

  if (fallbackData[destination]) {
    console.log(
      "🛟 Gemini unavailable. Using destination-specific fallback for:",
      destination
    );

    return fallbackData[destination];
  }

  // --------------------------------------------------
  // 6. FINAL GENERIC FALLBACK
  // --------------------------------------------------

  return getGenericFallback(destination);
}


// --------------------------------------------------
// GENERIC FALLBACK
// --------------------------------------------------

function getGenericFallback(destination) {
  console.log(
    "🛠️ Serving Generic Fallback for:",
    destination
  );

  return {
    summary: `A specialized group exploration plan for ${destination}.`,

    days: [
      {
        day: 1,
        title: "Arrival & Exploration",
        activities: [
          "Hotel Check-in",
          "Local Market Walk",
          "Dinner at a top-rated local spot"
        ],
        meals: "Local Specialties"
      },

      {
        day: 2,
        title: "Top Landmarks",
        activities: [
          "Main Landmark Visit",
          "Photography Session",
          "Souvenir Shopping"
        ],
        meals: "Traditional Feast"
      }
    ]
  };
}

module.exports = { generateItinerary };

