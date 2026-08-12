const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

// 🤖 PACK AI CHATBOT
router.post("/query", async (req, res) => {
  try {
    const { message } = req.body;

    // 1. Validate user message
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    // 2. Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
    });

    // 3. Pack AI system prompt
    const prompt = `
You are Pack AI, the intelligent travel assistant
inside PackVote, a group travel recommendation platform.

Your job is to help users with:
- Group trip planning
- Travel destinations
- Travel preferences
- Budgets
- Itinerary ideas
- PackVote features
- How PackVote's AI recommendation system works

Important rules:
- Keep answers concise and useful.
- Be friendly but professional.
- Stay travel-focused.
- Do not invent PackVote features that are not mentioned by the user.
- If the question is unrelated to travel or PackVote, politely redirect the user.
- Give practical recommendations rather than unnecessarily long explanations.

User Question:
${message.trim()}
`;

    // 4. Generate Gemini response
    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    // 5. Make sure Gemini actually returned something
    if (!text || !text.trim()) {
      return res.status(502).json({
        success: false,
        error: "Pack AI did not return a response",
      });
    }

    // 6. Send response to frontend
    res.status(200).json({
      success: true,
      reply: text.trim(),
    });

  } catch (err) {
    console.error("❌ Chat API Error:", err.message);

    res.status(500).json({
      success: false,
      error: "Pack AI is temporarily unavailable",
    });
  }
});

module.exports = router;