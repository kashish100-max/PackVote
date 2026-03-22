const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/packvote")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("API is working");
});

// routes
app.use("/api/preferences", require("./routes/preferences"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});