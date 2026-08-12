const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");

function generateTripCode() {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();
}

// CREATE A NEW TRIP
router.post("/", async (req, res, next) => {
  try {

    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    let tripCode;
    let existingTrip;

    // Keep generating until we get a unique code
    do {
      tripCode = generateTripCode();
      existingTrip = await Trip.findOne({ tripCode });
    } while (existingTrip);

    const trip = await Trip.create({
      tripCode,
      members: [
        {
          name: name.trim(),
          status: "pending",
        },
      ],
    });

    res.status(201).json({
      success: true,
      trip: {
        tripCode: trip.tripCode,
        tripId: trip._id,
        memberId: trip.members[0]._id,
        name: trip.members[0].name,
        status: trip.status,
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET A TRIP BY CODE
router.get("/:tripCode", async (req, res, next) => {
  try {
    const tripCode = req.params.tripCode.toUpperCase();

    const trip = await Trip.findOne({ tripCode });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.json({
      success: true,
      trip,
    });
  } catch (err) {
    next(err);
  }
});

// JOIN AN EXISTING TRIP
router.post("/:tripCode/join", async (req, res, next) => {
  try {
    const tripCode = req.params.tripCode.toUpperCase();
    const { name } = req.body;

    // 1. Validate name
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // 2. Find trip
    const trip = await Trip.findOne({ tripCode });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // 3. Add new member
    trip.members.push({
      name: name.trim(),
      status: "pending",
    });

    // 4. Save trip
    await trip.save();

    // 5. Get the newly created member
    const newMember = trip.members[trip.members.length - 1];

    // 6. Return memberId to frontend
    res.status(201).json({
      success: true,
      message: "Joined trip successfully",
      trip: {
        tripCode: trip.tripCode,
        tripId: trip._id,
        memberId: newMember._id,
        name: newMember.name,
        status: newMember.status,
      },
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;