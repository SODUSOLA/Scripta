import { useState } from "react";
import { FaRobot, FaMagic, FaLightbulb, FaPaperPlane } from "react-icons/fa";

export default function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "assistant",
        content:
          "Hello! I'm your AI assistant. I can help you create content, generate ideas, and optimize your social media posts. How can I help you today?",
      },
    ]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Add user message
    setMessages([...messages, { role: "user", content: prompt }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Great question! Here's a suggestion: Try posting about #Innovation and #Technology this week. Posts with engaging visuals and trending hashtags typically perform 40% better!",
        },
      ]);
    }, 1000);

    setPrompt("");
  }

  const suggestions = [
    "Generate a post idea for Instagram",
    "Optimize my LinkedIn content",
    "Create a tweet about our new product",
    "Suggest best posting times",
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-orange-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              AI Assistant
            </h1>
            <p className="text-gray-600">
              Your intelligent content creation companion
            </p>
          </div>
          <div className="text-6xl text-purple-600 animate-pulse">
            <FaRobot />
          </div>
        </div>

        {/* Quick Suggestions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl text-yellow-500">
              <FaLightbulb />
            </span>
            <h3 className="font-bold text-gray-900">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setPrompt(suggestion)}
                className="text-left p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-md hover:scale-105 transition-all"
              >
                <span className="text-purple-600 mr-2"><FaMagic /></span>
                <span className="text-gray-700 font-semibold">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col" style={{ height: "500px" }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shrink-0">
                    <FaRobot />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-linear-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    U
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 p-6"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask me anything about your content..."
                className="flex-1 rounded-xl border-2 border-gray-300 bg-gray-50 px-5 py-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                <FaPaperPlane /> Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
