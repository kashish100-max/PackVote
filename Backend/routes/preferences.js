const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const express = require("express");
const router = express.Router();
const Preference = require("../models/Preference");

// ✅ SAVE DATA
router.post("/save", async (req, res) => {
  try {
    const newData = new Preference(req.body);
    await newData.save();
    res.json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ GET DATA BY TRIP CODE
router.get("/:tripCode", async (req, res) => {
  try {
    const data = await Preference.find({ tripCode: req.params.tripCode });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/recommend/:tripCode", async (req, res) => {
  try {
    const users = await Preference.find({ tripCode: req.params.tripCode });

    let predictions = [];

    for (let user of users) {

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
  mood: user.mood,
  budget: Number(user.budget),
  duration: Number(user.duration),
  climate: user.climate,
  travel_style: user.travelStyle,

  food_preference: user.food,
  distance_preference: user.distance
})
      });

      const text = await response.text();
console.log("ML RESPONSE:", text);

if (!text.startsWith("{")) {
  console.error("Invalid response from ML");
  continue;
}

// ✅ Update this part in your preferences.js
const result = JSON.parse(text);

// Use spread operator (...) to push individual cities, not the whole array
if (Array.isArray(result.recommendations)) {
  predictions.push(...result.recommendations); 
} else {
  predictions.push(result.recommendations);
}

console.log(`Updated Predictions List:`, predictions);
    }

    // 🔥 Voting logic
    const freq = {};

    predictions.forEach(place => {
      freq[place] = (freq[place] || 0) + 1;
    });

    const top3 = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(item => item[0]);

    res.json({ recommendations: top3 });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;