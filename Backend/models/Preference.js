const mongoose = require("mongoose");

const PreferenceSchema = new mongoose.Schema({
  // 1. Identification (Zaroori hai record ke liye)
  tripCode: { 
    type: String, 
    required: true, 
    index: true 
  },
  name: { 
    type: String, 
    required: true 
  },

  // 2. Primary Features (Random Forest ke liye MANDATORY)
  trip_intent: { 
    type: String, 
    required: true 
  },
  group_type: { 
    type: String, 
    required: true 
  },
  budget_per_person: { 
    type: Number, 
    required: true 
  },
  climate_preference: { 
    type: String, 
    required: true 
  },
  priority: { 
    type: String, 
    required: true 
  },

  // 3. Secondary Features (Random Forest ke liye OPTIONAL with Defaults)
  // Inhe user khali chhod sakta hai, par ML ko value "None" ya common category milegi
  secondary_intent: { 
    type: String, 
    default: "None" 
  },
  duration_days: { 
    type: Number, 
    default: 3 // Default duration
  },
  food_preference: { 
    type: String, 
    default: "Mixed" 
  },
  crowd_preference: { 
    type: String, 
    default: "Moderate" 
  },
  language_comfort: { 
    type: String, 
    default: "English" 
  },

  // Metadata
  budgetType: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },

  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

PreferenceSchema.index(   // it will stop the duplicate preferences document 
  { trip: 1, memberId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Preference", PreferenceSchema);