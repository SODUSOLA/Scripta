import { FaCalendarAlt, FaClock, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// Dummy scheduled posts
const scheduledPosts = [
  {
    id: 1,
    date: "2025-10-28T10:00",
    content: "Instagram campaign launch",
    platform: "Instagram",
    status: "Scheduled",
  },
  {
    id: 2,
    date: "2025-10-29T14:30",
    content: "TikTok video drop",
    platform: "TikTok",
    status: "Scheduled",
  },
  {
    id: 3,
    date: "2025-10-30T09:00",
    content: "LinkedIn article",
    platform: "LinkedIn",
    status: "Scheduled",
  },
  {
    id: 4,
    date: "2025-10-31T16:00",
    content: "Twitter thread on industry trends",
    platform: "Twitter",
    status: "Scheduled",
  },
  {
    id: 5,
    date: "2025-11-01T11:00",
    content: "Facebook community update",
    platform: "Facebook",
    status: "Scheduled",
  },
];

export default function ContentCalendar() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Content Calendar
            </h1>
            <p className="text-gray-600">
              View and manage your scheduled content
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-xl shadow-md border border-gray-200">
              <div className="text-3xl font-bold text-green-600">
                {scheduledPosts.length}
              </div>
              <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
                Scheduled
              </div>
            </div>
            <button className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              <FaPlus className="text-xl" /> Schedule New
            </button>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl text-green-600">
                <FaCalendarAlt />
              </span>
              <h2 className="text-2xl font-bold text-gray-900">
                Upcoming Posts
              </h2>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700 transition">
                Week
              </button>
              <button className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold">
                Month
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700 transition">
                Year
              </button>
            </div>
          </div>

          {scheduledPosts.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <div className="text-7xl text-gray-300 mb-4">
                <FaCalendarAlt className="mx-auto" />
              </div>
              <p className="text-gray-500 text-xl font-semibold mb-2">
                No scheduled posts
              </p>
              <p className="text-gray-400 text-sm">
                Start scheduling content to see it here
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-50 to-blue-50">
                  <tr className="border-b border-gray-200">
                    <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                      Date & Time
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                      Content
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                      Platform
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                      Status
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledPosts.map((post, idx) => (
                    <tr
                      key={post.id}
                      className={`border-b border-gray-100 hover:bg-green-50 transition-colors ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-900">
                          <FaClock className="text-green-600" />
                          <div>
                            <div className="font-bold">
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                            <div className="text-sm text-gray-600">
                              {new Date(post.date).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-900">
                          {post.content}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                          {post.platform}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                          {post.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            className="text-blue-600 hover:text-blue-800 transition text-lg"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 transition text-lg"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Calendar Grid View */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            📅 Monthly Overview
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center font-bold text-gray-700 py-2 text-sm"
              >
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const dayNum = i - 2;
              const hasPost = [5, 8, 12, 18, 25].includes(dayNum);
              return (
                <div
                  key={i}
                  className={`aspect-square border rounded-lg p-2 text-sm ${
                    dayNum > 0 && dayNum <= 31
                      ? hasPost
                        ? "bg-green-100 border-green-300 font-bold cursor-pointer hover:shadow-md"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                      : "bg-gray-100 border-gray-200"
                  } transition`}
                >
                  {dayNum > 0 && dayNum <= 31 && (
                    <div>
                      <div className="text-gray-900">{dayNum}</div>
                      {hasPost && (
                        <div className="text-xs text-green-700 mt-1">
                          • Post
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
