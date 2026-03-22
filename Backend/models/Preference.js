const mongoose = require("mongoose");

const PreferenceSchema = new mongoose.Schema({
  tripCode: String,
  name: String,
  mood: String,
  travelStyle: String,
  budget: Number,
  duration: Number,
  budgetType: String,
  climate: String,
  food: String,
  distance: String
});

module.exports = mongoose.model("Preference", PreferenceSchema);