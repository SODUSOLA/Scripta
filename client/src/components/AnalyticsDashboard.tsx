import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaArrowUp,
  FaArrowDown,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function AnalyticsDashboard() {
  const platformStats = [
    {
      platform: "Facebook",
      icon: <FaFacebook />,
      color: "blue",
      reach: "12.5k",
      engagement: "8.2%",
      growth: "+12%",
      isPositive: true,
    },
    {
      platform: "Twitter",
      icon: <FaTwitter />,
      color: "sky",
      reach: "8.3k",
      engagement: "5.4%",
      growth: "+8%",
      isPositive: true,
    },
    {
      platform: "Instagram",
      icon: <FaInstagram />,
      color: "pink",
      reach: "15.2k",
      engagement: "12.1%",
      growth: "+24%",
      isPositive: true,
    },
    {
      platform: "LinkedIn",
      icon: <FaLinkedin />,
      color: "indigo",
      reach: "6.7k",
      engagement: "4.8%",
      growth: "-3%",
      isPositive: false,
    },
  ];

  const weeklyData = [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 52 },
    { day: "Wed", value: 38 },
    { day: "Thu", value: 65 },
    { day: "Fri", value: 58 },
    { day: "Sat", value: 42 },
    { day: "Sun", value: 48 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Analytics & Insights
            </h1>
            <p className="text-gray-600">
              Track your performance across all platforms
            </p>
          </div>
          <div className="text-5xl text-indigo-600">
            <FaChartBar />
          </div>
        </div>

        {/* Platform Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformStats.map((stat) => (
            <div
              key={stat.platform}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:scale-105 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`text-3xl text-${stat.color}-600`}
                  style={{
                    color:
                      stat.color === "blue"
                        ? "#3b82f6"
                        : stat.color === "sky"
                        ? "#0ea5e9"
                        : stat.color === "pink"
                        ? "#ec4899"
                        : "#6366f1",
                  }}
                >
                  {stat.icon}
                </div>
                <span
                  className={`flex items-center gap-1 text-sm font-bold ${
                    stat.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.isPositive ? <FaArrowUp /> : <FaArrowDown />}
                  {stat.growth}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                {stat.platform}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Reach:</span>
                  <span className="font-bold text-gray-900">{stat.reach}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Engagement:</span>
                  <span className="font-bold text-gray-900">
                    {stat.engagement}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Engagement Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl text-blue-600">
                <FaChartLine />
              </span>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Weekly Engagement
                </h3>
                <p className="text-sm text-gray-600">Last 7 days performance</p>
              </div>
            </div>
            <div className="flex items-end justify-between h-48 gap-2">
              {weeklyData.map((data) => (
                <div key={data.day} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${data.value}%` }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2 font-semibold">
                    {data.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Distribution */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl text-purple-600">
                <FaChartPie />
              </span>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Platform Distribution
                </h3>
                <p className="text-sm text-gray-600">Content by platform</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-700">Instagram</span>
                  <span className="font-bold text-gray-900">38%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-pink-600 h-3 rounded-full"
                    style={{ width: "38%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-700">Facebook</span>
                  <span className="font-bold text-gray-900">28%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                    style={{ width: "28%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-700">Twitter</span>
                  <span className="font-bold text-gray-900">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-sky-500 to-sky-600 h-3 rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-700">LinkedIn</span>
                  <span className="font-bold text-gray-900">14%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 rounded-full"
                    style={{ width: "14%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Posts */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            🏆 Top Performing Posts
          </h3>
          <div className="space-y-4">
            {[
              {
                title: "Product Launch Announcement",
                platform: "Instagram",
                engagement: "12.4k",
                reach: "45.2k",
              },
              {
                title: "Behind the Scenes Video",
                platform: "TikTok",
                engagement: "8.7k",
                reach: "32.1k",
              },
              {
                title: "Industry Insights Article",
                platform: "LinkedIn",
                engagement: "5.2k",
                reach: "18.3k",
              },
            ].map((post, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100"
              >
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{post.title}</h4>
                  <p className="text-sm text-gray-600">{post.platform}</p>
                </div>
                <div className="flex gap-8 text-sm">
                  <div>
                    <div className="text-gray-600">Engagement</div>
                    <div className="font-bold text-gray-900">
                      {post.engagement}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Reach</div>
                    <div className="font-bold text-gray-900">{post.reach}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
