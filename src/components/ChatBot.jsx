import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hey there! I'm Pack AI, your intelligent travel companion 🌍\n\nI can help you plan group trips, explain how AI recommendations work, and answer any travel questions.\n\nWhat would you like to explore?`,
    },
  ]);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  function getReply(msg) {
    const m = msg.toLowerCase();

    if (m.includes("how does packvote") || m.includes("ai work")) {
      return `PackVote uses AI + group preferences to find the best destination.\n\nEach member shares their interests (like beaches, mountains, nightlife), and our system analyzes all inputs to suggest the most compatible destination for everyone.`;
    }
    if (m.includes("popular") || m.includes("destination")) {
      return `Some popular group travel destinations include:\n\n• Goa 🏖️ (beaches & nightlife)\n• Manali 🏔️ (mountains & adventure)\n• Jaipur 🏰 (culture & history)\n• Rishikesh 🚣 (rafting & nature)\n\nIt depends on your group's vibe!`;
    }
    if (m.includes("share my trip") || m.includes("invite")) {
      return `You can share your trip using a unique trip code.\n\nJust send the code to your friends — they can join, add preferences, and vote. It's super easy!`;
    }
    if (m.includes("compatibility")) {
      return `The compatibility score shows how well a destination matches your group's combined preferences.\n\nHigher score = better match for everyone 👍`;
    }
    if (m.includes("budget")) {
      return `Budget plays an important role in recommendations.\n\nWe try to suggest destinations that match your group's spending comfort — whether it's budget-friendly or premium trips.`;
    }
    if (m.includes("group")) {
      return `PackVote is designed for group trips 👥\n\nEveryone adds their preferences, and we find a destination that works best for the whole group.`;
    }
    if (m.includes("plan")) {
      return `I can help guide your trip planning!\n\nStart by creating a trip, invite your friends, and let everyone add their preferences — PackVote will handle the rest.`;
    }
    if (m.includes("recommend")) {
      return `We use AI + group preferences to suggest destinations that match everyone's interests.`;
    }

    return `I'm here to help you plan the perfect group trip 🌍\n\nTry asking me:\n• How does PackVote's AI work?\n• What are popular group destinations?\n• How do I share my trip with friends?\n• What does the compatibility score mean?`;
  }

  const sendMessage = (msg) => {
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: getReply(msg) }]);
      setTyping(false);
    }, 800);
  };

  const quickBtns = [
    "Help me plan a trip",
    "Explain my recommendations",
    "What destinations are popular?",
    "How does PackVote work?",
  ];

  return (
    <>
      {/* ── FLOATING BUTTON ── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
          style={{
            width: "52px",
            height: "52px",
            background: "#06b6d4",
            boxShadow: "0 0 24px rgba(6,182,212,0.5)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3C7.03 3 3 6.58 3 11c0 2.07.9 3.95 2.38 5.37L4 21l4.88-1.6A9.7 9.7 0 0 0 12 19c4.97 0 9-3.58 9-8s-4.03-8-9-8z"
              fill="white"
            />
          </svg>
        </button>
      )}

      {/* ── CHAT WINDOW ── */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-[9999] flex flex-col rounded-2xl overflow-hidden"
          style={{
            width: "340px",
            maxHeight: "520px",
            background: "#060d1a",
            border: "1px solid rgba(6,182,212,0.15)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.8), 0 0 0 1px rgba(6,182,212,0.06)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(6,182,212,0.04)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                style={{
                  background: "rgba(6,182,212,0.12)",
                  border: "1px solid rgba(6,182,212,0.25)",
                }}
              >
                ✨
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">Pack AI</p>
                <p className="text-xs" style={{ color: "#22d3ee" }}>
                  Your travel intelligence
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#0c1829 transparent" }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] shrink-0 mb-0.5"
                    style={{
                      background: "rgba(6,182,212,0.1)",
                      border: "1px solid rgba(6,182,212,0.2)",
                    }}
                  >
                    ✨
                  </div>
                )}
                <div
                  className="max-w-[78%] px-3 py-2.5 rounded-2xl text-sm whitespace-pre-line leading-relaxed"
                  style={
                    m.sender === "user"
                      ? {
                          background: "#06b6d4",
                          color: "#fff",
                          borderBottomRightRadius: "6px",
                        }
                      : {
                          background: "#0c1829",
                          border: "1px solid rgba(255,255,255,0.06)",
                          color: "#cbd5e1",
                          borderBottomLeftRadius: "6px",
                        }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Typing */}
            {typing && (
              <div className="flex items-end gap-2">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] shrink-0"
                  style={{
                    background: "rgba(6,182,212,0.1)",
                    border: "1px solid rgba(6,182,212,0.2)",
                  }}
                >
                  ✨
                </div>
                <div
                  className="px-4 py-3 rounded-2xl flex items-center gap-1"
                  style={{
                    background: "#0c1829",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderBottomLeftRadius: "6px",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Buttons */}
          <div
            className="px-4 py-2.5 flex flex-wrap gap-2 shrink-0"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {quickBtns.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-[11px] px-3 py-1.5 rounded-full transition-all hover:bg-cyan-500 hover:text-white"
                style={{
                  border: "1px solid rgba(6,182,212,0.35)",
                  color: "#22d3ee",
                  background: "transparent",
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3 shrink-0"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Ask Pack AI anything..."
              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-600"
              style={{ color: "#e2e8f0" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="flex items-center justify-center rounded-full transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              style={{
                width: "34px",
                height: "34px",
                background: input.trim() ? "#06b6d4" : "rgba(6,182,212,0.15)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
