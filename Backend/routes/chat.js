const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Environment variables se key uthayega
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/query", async (req, res) => {
  try {
    const { message } = req.body;

    // Model name check
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // AI ko guide karna ki wo Pack AI hai
    const prompt = `You are Pack AI, an intelligent travel assistant for the app PackVote. 
    Keep your answers short, helpful, and travel-focused.
    User Question: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (err) {
    // Ye message tere backend terminal mein dikhega
    console.error("❌ Chat API Error:", err.message);
    res.status(500).json({ error: "Gemini error: " + err.message });
  }
});

module.exports = router;