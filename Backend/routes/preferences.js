const express = require("express");
const router = express.Router();
const axios = require("axios");

const Preference = require("../models/Preference");
const { generateItinerary } = require("../services/itineraryService");

// ✅ SAVE DATA
router.post("/save", async (req, res) => {
  try {
    const newData = new Preference(req.body);
    await newData.save();
    res.json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET DATA BY TRIP CODE
router.get("/:tripCode", async (req, res) => {
  try {
    const data = await Preference.find({ tripCode: req.params.tripCode });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🚀 MAIN ROUTE: RECOMMEND + ITINERARY
router.get("/recommend/:tripCode", async (req, res) => {
  try {
    const users = await Preference.find({ tripCode: req.params.tripCode });

    if (!users.length) {
      return res.status(404).json({ error: "No users found for this trip" });
    }

    let predictions = [];

    // 🔥 CALL ML MODEL FOR EACH USER
    for (let user of users) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/predict", {
          trip_intent: user.trip_intent,
          secondary_intent: user.secondary_intent || "None",
          budget_per_person: Number(user.budget_per_person),
          duration_days: Number(user.duration_days),
          group_type: user.group_type,
          climate_preference: user.climate_preference,
          crowd_preference: user.crowd_preference,
          food_preference: user.food_preference,
          language_comfort: user.language_comfort,
          priority: user.priority
        });

        const result = response.data;
        if (result && result.recommendations) {
          predictions.push(...result.recommendations);
        }
      } catch (mlErr) {
        console.error("ML Server connection failed for a user:", mlErr.message);
        // Agar ML server band hai toh hum is user ko skip karenge
      }
    }

    // 🔥 VOTING LOGIC (TOP 3)
    const freq = {};
    predictions.forEach(place => {
      freq[place] = (freq[place] || 0) + 1;
    });

    const top3 = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(item => item[0]);

    const bestMatch = top3[0] || "Explore India"; // Fallback if no predictions

    // 🔥 AGGREGATE GROUP DATA FOR LLM
    const leadUser = users[0];
    
    // Average Duration Calculation
    const totalDuration = users.reduce((sum, u) => sum + Number(u.duration_days), 0);
    const avgDuration = Math.round(totalDuration / users.length);

    // Average Budget Calculation (Better Context for AI)
    const totalBudget = users.reduce((sum, u) => sum + Number(u.budget_per_person), 0);
    const avgBudget = Math.round(totalBudget / users.length);

    // 🤖 GENERATE ITINERARY (LLM)
    let aiPlan = null;
    if (bestMatch) {
      aiPlan = await generateItinerary(bestMatch, {
        group_type: leadUser.group_type,
        duration_days: avgDuration,
        budget_per_person: avgBudget, // Using group average now
        trip_intent: leadUser.trip_intent,
        food_preference: leadUser.food_preference
      });
    }

    // ✅ FINAL RESPONSE (Matches Result.jsx expectations)
    res.json({
      recommendations: top3,
      itinerary: aiPlan,
      groupStats: {
        totalMembers: users.length,
        avgDuration,
        avgBudget
      }
    });

  } catch (err) {
    console.error("MAIN ROUTE ERROR:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;