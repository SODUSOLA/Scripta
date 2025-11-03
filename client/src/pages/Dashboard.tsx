// Dashboard.tsx - Main overview page
import OverviewCard from "../components/Dashboard/OverviewCard";
import {
  FaChartLine,
  FaComments,
  FaRegCalendarCheck,
  FaRocket,
  FaUsers,
  FaHeart,
  FaEye,
  FaShareAlt,
  FaArrowUp,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Dashboard() {
  const recentPosts = [
    {
      id: 1,
      title: "Product Launch Announcement",
      platform: "Twitter",
      date: "2 hours ago",
      engagement: "1.2k",
      status: "Published",
    },
    {
      id: 2,
      title: "Behind the Scenes Content",
      platform: "Instagram",
      date: "5 hours ago",
      engagement: "892",
      status: "Published",
    },
    {
      id: 3,
      title: "Industry Insights Blog",
      platform: "LinkedIn",
      date: "1 day ago",
      engagement: "2.3k",
      status: "Published",
    },
  ];

  const upcomingScheduled = [
    {
      id: 1,
      title: "Weekend Special Offer",
      platform: "Facebook",
      scheduledFor: "Tomorrow, 10:00 AM",
    },
    {
      id: 2,
      title: "Tutorial Video Series",
      platform: "YouTube",
      scheduledFor: "Nov 5, 2:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Good Morning! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Here's what's happening with your content today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <OverviewCard
            title="Total Reach"
            value="2.5k"
            icon={<FaChartLine />}
          />
          <OverviewCard
            title="Engagement Rate"
            value="4.2%"
            icon={<FaComments />}
          />
          <OverviewCard
            title="Posts This Week"
            value="24"
            icon={<FaRegCalendarCheck />}
          />
          <OverviewCard
            title="Active Campaigns"
            value="7"
            icon={<FaRocket />}
          />
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-pink-500 text-2xl">
                <FaHeart />
              </span>
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Likes
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900">8.4k</div>
            <div className="text-xs text-green-600 font-semibold mt-1">
              +12% this week
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-blue-500 text-2xl">
                <FaEye />
              </span>
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Views
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900">24.8k</div>
            <div className="text-xs text-green-600 font-semibold mt-1">
              +8% this week
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-green-500 text-2xl">
                <FaShareAlt />
              </span>
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Shares
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900">1.2k</div>
            <div className="text-xs text-green-600 font-semibold mt-1">
              +24% this week
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-purple-500 text-2xl">
                <FaUsers />
              </span>
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Followers
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900">5.7k</div>
            <div className="text-xs text-green-600 font-semibold mt-1">
              +156 new this week
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Posts */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl text-blue-600">
                <FaArrowUp />
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
            </div>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{post.title}</h3>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                      {post.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="font-semibold">{post.platform}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FaHeart className="text-pink-500" /> {post.engagement}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Scheduled */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl text-purple-600">
                <FaCalendarAlt />
              </span>
              <h2 className="text-2xl font-bold text-gray-900">
                Upcoming Posts
              </h2>
            </div>
            <div className="space-y-4">
              {upcomingScheduled.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-md transition"
                >
                  <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="font-semibold">{post.platform}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt /> {post.scheduledFor}
                    </span>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all">
                View Full Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition rounded-xl p-4 font-semibold">
              📝 Create Post
            </button>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition rounded-xl p-4 font-semibold">
              📅 Schedule Content
            </button>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition rounded-xl p-4 font-semibold">
              📊 View Analytics
            </button>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition rounded-xl p-4 font-semibold">
              🤖 AI Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
