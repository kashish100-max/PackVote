const dns = require("dns");

dns.setServers([
  "1.1.1.1",
  "8.8.8.8"
]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const preferenceRoutes = require("./routes/preferences");
const tripRouter = require("./routes/trips");
const chatRoutes = require("./routes/chat");

const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// ROUTES
// ===============================
app.use("/api/preferences", preferenceRoutes);
app.use("/api/trips", tripRouter);
app.use("/api/chat", chatRoutes);

// ===============================
// DB CONNECTION
// ===============================
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