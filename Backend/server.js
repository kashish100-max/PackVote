require("dotenv").config(); // Sabse upar hona chahiye

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// ROUTES
// ===============================
const preferenceRoutes = require("./routes/preferences");
app.use("/api/preferences", preferenceRoutes);

// ===============================
// DB CONNECTION
// ===============================
// process.env use karne se ye secure ho jata hai
const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/packvote";

mongoose.connect(dbURI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });

// ===============================
// TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("PackVote Backend is running 🚀");
});

// ===============================
// START SERVER
// ===============================
// Port hamesha dynamic rakho
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});