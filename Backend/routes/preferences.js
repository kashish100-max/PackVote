const express = require("express");
const router = express.Router();
const axios = require("axios");
const Trip = require("../models/Trip");

const Preference = require("../models/Preference");
const { generateItinerary } = require("../services/itineraryService");

// ✅ SAVE DATA
router.post("/save", async (req, res) => {
  try {
    const {
      tripCode,
      memberId,
      name,
      trip_intent,
      secondary_intent,
      group_type,
      budget_per_person,
      duration_days,
      budgetType,
      climate_preference,
      food_preference,
      crowd_preference,
      language_comfort,
      priority,
    } = req.body;

    // 1. Validate required fields
    if (
      !tripCode ||
      !memberId ||
      !name ||
      !trip_intent ||
      !group_type ||
      budget_per_person === undefined ||
      !climate_preference ||
      !priority
    ) {
      return res.status(400).json({
        success: false,
        message: "Required preference fields are missing",
      });
    }

    // 2. Find trip
    const trip = await Trip.findOne({
      tripCode: tripCode.trim().toUpperCase(),
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // 3. Verify member belongs to this trip
    const member = trip.members.id(memberId);

    if (!member) {
      return res.status(403).json({
        success: false,
        message: "Member does not belong to this trip",
      });
    }

    // 4. Prepare preference data
    const preferenceData = {
      trip: trip._id,
      tripCode: trip.tripCode,
      memberId: member._id,
      name: name.trim(),

      trip_intent,
      secondary_intent: secondary_intent || "None",
      group_type,
      budget_per_person: Number(budget_per_person),
      duration_days: Number(duration_days) || 3,
      budgetType,
      climate_preference,
      food_preference: food_preference || "Mixed",
      crowd_preference: crowd_preference || "Moderate",
      language_comfort: language_comfort || "English",
      priority,
    };

    // 5. Create OR update preference
    const preference = await Preference.findOneAndUpdate(
      {
        trip: trip._id,
        memberId: member._id,
      },
      preferenceData,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    // 6. Mark member as submitted
    member.status = "submitted";

    // 7. Check whether everyone has submitted
    const allSubmitted =
      trip.members.length > 0 &&
      trip.members.every(
        (member) => member.status === "submitted"
      );

    trip.status = allSubmitted
      ? "ready"
      : "collecting";

    await trip.save();

    // 8. Send response
    res.status(200).json({
      success: true,
      message: "Preferences saved successfully",
      preference,
      trip: {
        tripCode: trip.tripCode,
        status: trip.status,
        members: trip.members,
      },
    });

  } catch (err) {
    console.error("SAVE PREFERENCE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to save preferences",
      error: err.message,
    });
  }
});

// 🚀 MAIN ROUTE: RECOMMEND + ITINERARY
router.get("/recommend/:tripCode", async (req, res) => {
  try {
    const users = await Preference.find({
      tripCode: req.params.tripCode.toUpperCase(),
    });

    if (!users.length) {
      return res.status(404).json({
        success: false,
        error: "No users found for this trip",
      });
    }

    let predictions = [];
    let successfulPredictions = 0;
    let failedPredictions = [];

    // 🔥 CALL ML MODEL FOR EACH USER
    for (let user of users) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/predict",
          {
            trip_intent: user.trip_intent,
            secondary_intent: user.secondary_intent || "None",
            budget_per_person: Number(user.budget_per_person),
            duration_days: Number(user.duration_days),
            group_type: user.group_type,
            climate_preference: user.climate_preference,
            crowd_preference: user.crowd_preference,
            food_preference: user.food_preference,
            language_comfort: user.language_comfort,
            priority: user.priority,
          }
        );

        const result = response.data;

        // ML successfully returned recommendations
        if (
          result &&
          Array.isArray(result.recommendations) &&
          result.recommendations.length > 0
        ) {
          predictions.push(...result.recommendations);
          successfulPredictions++;
        } else {
          // ML responded but returned no recommendations
          failedPredictions.push({
            memberId: user.memberId,
            name: user.name,
            reason: "ML returned no recommendations",
          });
        }
      } catch (mlErr) {
        console.error(
          `ML prediction failed for ${user.name}:`,
          mlErr.message
        );

        failedPredictions.push({
          memberId: user.memberId,
          name: user.name,
          reason: "ML service unavailable",
        });
      }
    }

    // ❌ Nobody was successfully processed by ML
    if (successfulPredictions === 0) {
      return res.status(503).json({
        success: false,
        error:
          "Unable to generate recommendations because the ML service is unavailable.",
        groupStats: {
          totalMembers: users.length,
          successfulPredictions,
          failedPredictions: failedPredictions.length,
        },
        predictionErrors: failedPredictions,
      });
    }

    // 🔥 VOTING LOGIC (TOP 3)

    // Store vote count + first appearance order
    const voteMap = new Map();

    predictions.forEach((place, index) => {
      if (!voteMap.has(place)) {
        voteMap.set(place, {
          votes: 0,
          firstSeen: index,
        });
      }

      voteMap.get(place).votes++;
    });

    // Rank destinations
    const rankedDestinations = Array.from(voteMap.entries()).sort(
      (a, b) => {
        // 1. Higher votes first
        if (b[1].votes !== a[1].votes) {
          return b[1].votes - a[1].votes;
        }

        // 2. Tie → destination appearing earlier in predictions wins
        return a[1].firstSeen - b[1].firstSeen;
      }
    );

// SELECT TOP 3 DESTINATIONS

const top3Ranked = rankedDestinations.slice(0, 3);

// Keep destination names separately
const top3 = top3Ranked.map(
  ([destination]) => destination
);

// Total votes among the selected Top 3
const totalTop3Votes = top3Ranked.reduce(
  (sum, [, data]) => sum + data.votes,
  0
);

// Convert vote distribution into percentages
const votingResults = top3Ranked.map(
  ([destination, data]) => ({
    destination,
    percentage:
      totalTop3Votes > 0
        ? Math.round(
            (data.votes / totalTop3Votes) * 100
          )
        : 0,
  })
);

// First destination remains the group's Top Pick
const bestMatch = top3[0];

    // --------------------------------------------------
    // 🔥 AGGREGATE GROUP DATA FOR GEMINI
    // --------------------------------------------------

    const totalDuration = users.reduce(
      (sum, user) => sum + Number(user.duration_days || 3),
      0
    );

    const avgDuration = Math.round(
      totalDuration / users.length
    );

    const totalBudget = users.reduce(
      (sum, user) =>
        sum + Number(user.budget_per_person || 0),
      0
    );

    const avgBudget = Math.round(
      totalBudget / users.length
    );

    // --------------------------------------------------
    // 🔥 BUILD GROUP PREFERENCES FOR GEMINI
    // --------------------------------------------------

    const groupPreferences = {
      group_size: users.length,

      destination: bestMatch,

      average_budget_per_person: avgBudget,

      average_duration_days: avgDuration,

      members: users.map((user) => ({
        name: user.name,

        trip_intent: user.trip_intent,

        secondary_intent:
          user.secondary_intent || "None",

        group_type: user.group_type,

        budget_per_person:
          Number(user.budget_per_person),

        duration_days:
          Number(user.duration_days || 3),

        climate_preference:
          user.climate_preference,

        food_preference:
          user.food_preference || "Mixed",

        crowd_preference:
          user.crowd_preference || "Moderate",

        language_comfort:
          user.language_comfort || "English",

        priority: user.priority,
      })),
    };

    // --------------------------------------------------
    // 🤖 GENERATE GROUP-PERSONALIZED ITINERARY
    // --------------------------------------------------

    let aiPlan = null;

    if (bestMatch) {
      aiPlan = await generateItinerary(
        bestMatch,
        groupPreferences
      );
    }

    // --------------------------------------------------
    // ✅ FINAL RESPONSE
    // --------------------------------------------------

    res.json({
      success: true,

      recommendations: top3,

      groupConsensus: {
        topMatch: bestMatch,
        votingMethod: "Top-3 majority voting",
        results: votingResults
      },

      itinerary: aiPlan,

      groupStats: {
        totalMembers: users.length,
        successfulPredictions,
        failedPredictions:
          failedPredictions.length,
        avgDuration,
        avgBudget,
      },

      predictionErrors: failedPredictions,
    });
  } catch (err) {
    console.error("MAIN ROUTE ERROR:", err);

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

module.exports = router;