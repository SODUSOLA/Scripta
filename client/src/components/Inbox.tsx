import { useState } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaEnvelope,
  FaFilter,
  FaReply,
  FaStar,
  FaTrash,
} from "react-icons/fa";

const dummyMessages = [
  {
    id: 1,
    platform: "Instagram",
    sender: "UserA",
    message: "Great post! Love your content!",
    time: "09:30 AM",
    unread: true,
    starred: false,
  },
  {
    id: 2,
    platform: "X",
    sender: "UserB",
    message: "Can you share more about this topic?",
    time: "10:15 AM",
    unread: true,
    starred: true,
  },
  {
    id: 3,
    platform: "Facebook",
    sender: "UserC",
    message: "Interested in your offer. Let's connect!",
    time: "11:00 AM",
    unread: false,
    starred: false,
  },
  {
    id: 4,
    platform: "Instagram",
    sender: "UserD",
    message: "Amazing photos! Where was this taken?",
    time: "Yesterday",
    unread: false,
    starred: false,
  },
  {
    id: 5,
    platform: "X",
    sender: "UserE",
    message: "Thanks for the follow back! 🙏",
    time: "2 days ago",
    unread: false,
    starred: true,
  },
];

export default function Inbox() {
  const [filter, setFilter] = useState("All Platforms");
  const platforms = ["All Platforms", "Instagram", "X", "Facebook"];

  const filteredMessages = dummyMessages.filter(
    (msg) => filter === "All Platforms" || msg.platform === filter
  );

  const platformIcons: Record<string, React.ReactNode> = {
    Instagram: <span className="text-pink-600"><FaInstagram /></span>,
    X: <span className="text-black"><FaTwitter /></span>,
    Facebook: <span className="text-blue-600"><FaFacebook /></span>,
  };

  const unreadCount = dummyMessages.filter((msg) => msg.unread).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Unified Inbox
            </h1>
            <p className="text-gray-600">
              Manage all your social messages in one place
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-xl shadow-md border border-gray-200">
              <div className="text-3xl font-bold text-teal-600">
                {unreadCount}
              </div>
              <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
                Unread
              </div>
            </div>
            <div className="text-5xl text-teal-600">
              <FaEnvelope />
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-teal-600 text-xl">
              <FaFilter />
              <span className="font-bold text-gray-900">Filter:</span>
            </div>
            <select
              className="flex-1 min-w-[200px] rounded-xl border-2 border-gray-300 bg-gray-50 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {platforms.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-teal-100 text-teal-700 font-semibold hover:bg-teal-200 transition">
                All
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition">
                Unread
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition">
                Starred
              </button>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-16 bg-gray-50">
              <div className="text-7xl text-gray-300 mb-4">📧</div>
              <p className="text-gray-500 text-xl font-semibold">
                No messages found
              </p>
            </div>
          ) : (
            <div>
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-center justify-between p-6 border-b last:border-0 transition-all hover:bg-teal-50 ${
                    msg.unread ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl">
                      {platformIcons[msg.platform]}
                    </div>
                    <div className="w-12 h-12 bg-linear-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md">
                      {msg.sender[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-gray-900 text-lg">
                          {msg.sender}
                        </span>
                        {msg.unread && (
                          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                        {msg.starred && (
                          <span className="text-yellow-500 text-lg">
                            <FaStar />
                          </span>
                        )}
                      </div>
                      <div className="text-gray-700">{msg.message}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {msg.platform} • {msg.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-3 rounded-lg bg-teal-100 text-teal-700 hover:bg-teal-200 transition"
                      title="Reply"
                    >
                      <FaReply />
                    </button>
                    <button
                      className="p-3 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                      title="Star"
                    >
                      <FaStar />
                    </button>
                    <button
                      className="p-3 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
