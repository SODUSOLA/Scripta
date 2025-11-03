import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTelegram,
  FaTiktok,
  FaImage,
  FaVideo,
  FaSmile,
  FaCalendarAlt,
  FaPaperPlane,
} from "react-icons/fa";

const platforms = [
  { name: "Facebook", icon: <FaFacebook />, color: "blue" },
  { name: "Instagram", icon: <FaInstagram />, color: "pink" },
  { name: "LinkedIn", icon: <FaLinkedin />, color: "indigo" },
  { name: "YouTube", icon: <FaYoutube />, color: "red" },
  { name: "Telegram", icon: <FaTelegram />, color: "sky" },
  { name: "X", icon: <FaTwitter />, color: "gray" },
  { name: "TikTok", icon: <FaTiktok />, color: "purple" },
  { name: "Snapchat", icon: <span>👻</span>, color: "yellow" },
];

export default function PostComposer() {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [schedule, setSchedule] = useState("");
  const [postNow, setPostNow] = useState(true);

  function handlePlatformChange(platform: string) {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Integrate with backend API
    if (postNow) {
      alert(`Post published to ${selectedPlatforms.join(", ")}`);
    } else {
      alert(
        `Post scheduled for ${selectedPlatforms.join(", ")} at ${schedule}`
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Create Post
            </h1>
            <p className="text-gray-600">
              Compose and schedule content across all your platforms
            </p>
          </div>
          <div className="text-5xl text-orange-600">
            <FaPaperPlane />
          </div>
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 space-y-6"
        >
          {/* Content Editor */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              📝 Post Content
            </label>
            <textarea
              className="w-full rounded-xl border-2 border-gray-300 bg-gray-50 px-5 py-4 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition resize-none"
              placeholder="What's on your mind? Share your thoughts..."
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex items-center justify-between mt-3">
              <div className="text-sm text-gray-600">
                {content.length} characters
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="text-gray-500 hover:text-orange-600 transition text-xl"
                  title="Add Image"
                >
                  <FaImage />
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-orange-600 transition text-xl"
                  title="Add Video"
                >
                  <FaVideo />
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-orange-600 transition text-xl"
                  title="Add Emoji"
                >
                  <FaSmile />
                </button>
              </div>
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              🌐 Select Platforms
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {platforms.map((platform) => (
                <label
                  key={platform.name}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedPlatforms.includes(platform.name)
                      ? "border-orange-500 bg-orange-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-orange-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform.name)}
                    onChange={() => handlePlatformChange(platform.name)}
                    className="hidden"
                  />
                  <span className="text-2xl">{platform.icon}</span>
                  <span className="font-semibold text-gray-900">
                    {platform.name}
                  </span>
                </label>
              ))}
            </div>
            {selectedPlatforms.length > 0 && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-sm font-semibold text-green-700">
                  ✓ Selected: {selectedPlatforms.join(", ")}
                </span>
              </div>
            )}
          </div>

          {/* Scheduling Options */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              ⏰ Posting Schedule
            </label>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-orange-300 cursor-pointer transition">
                <input
                  type="radio"
                  name="schedule"
                  checked={postNow}
                  onChange={() => setPostNow(true)}
                  className="w-5 h-5 text-orange-600"
                />
                <div>
                  <div className="font-bold text-gray-900">Post Now</div>
                  <div className="text-sm text-gray-600">
                    Publish immediately to selected platforms
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-orange-300 cursor-pointer transition">
                <input
                  type="radio"
                  name="schedule"
                  checked={!postNow}
                  onChange={() => setPostNow(false)}
                  className="w-5 h-5 text-orange-600"
                />
                <div className="flex-1">
                  <div className="font-bold text-gray-900 mb-2">
                    Schedule for Later
                  </div>
                  {!postNow && (
                    <div className="flex items-center gap-3">
                      <span className="text-orange-600 text-xl">
                        <FaCalendarAlt />
                      </span>
                      <input
                        type="datetime-local"
                        className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        value={schedule}
                        onChange={(e) => setSchedule(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={!content || selectedPlatforms.length === 0}
              className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <FaPaperPlane />
              {postNow ? "Publish Now" : "Schedule Post"}
            </button>
            <button
              type="button"
              className="px-8 py-4 rounded-xl font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Save as Draft
            </button>
          </div>
        </form>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-yellow-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            💡 Pro Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Keep your content concise and engaging</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Use hashtags to increase visibility</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Schedule posts during peak engagement hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Add visual content for better performance</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
