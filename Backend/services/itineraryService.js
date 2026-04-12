const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ⏳ Helper delay function
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
          `❌ Error with ${modelName} (Attempt ${attempt}):`,
          error.message
        );

        // If last attempt → try next model
        if (attempt === maxRetries) {
          console.log(`⚠️ Switching model from ${modelName}`);
          break;
        }

        // ⏳ Wait before retry
        await delay(1000 * attempt); // exponential-ish backoff
      }
    }
  }

  // ❌ Final fallback
  return {
    summary: "⚠️ Servers are busy. Please try again in a moment.",
    days: [],
  };
}

module.exports = { generateItinerary };