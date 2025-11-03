import { useState } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaFire,
  FaHeart,
  FaComment,
  FaShare,
} from "react-icons/fa";

const platforms = [
  "All Platforms",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "YouTube",
  "X",
  "TikTok",
];

export default function TrendingFeed() {
  const [keyword, setKeyword] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [platform, setPlatform] = useState(platforms[0]);

  // Dummy trending posts
  const trendingPosts = [
    {
      id: 1,
      platform: "Instagram",
      content: "Brand new product launch! Revolutionary features #innovation #tech",
      stats: { likes: 1200, comments: 300, shares: 89 },
      image: "📱",
      trending: true,
    },
    {
      id: 2,
      platform: "X",
      content: "The future of AI is here. Exciting times ahead! #AI #Future",
      stats: { likes: 900, comments: 150, shares: 234 },
      image: "🤖",
      trending: true,
    },
    {
      id: 3,
      platform: "TikTok",
      content: "New viral dance challenge taking over! Join the fun! #viral #fun",
      stats: { likes: 2000, comments: 500, shares: 456 },
      image: "💃",
      trending: true,
    },
    {
      id: 4,
      platform: "LinkedIn",
      content: "Industry insights: 5 trends to watch in 2025 #business #trends",
      stats: { likes: 650, comments: 120, shares: 89 },
      image: "📊",
      trending: false,
    },
    {
      id: 5,
      platform: "Facebook",
      content: "Community event this weekend! Join us for celebrations 🎉",
      stats: { likes: 780, comments: 95, shares: 167 },
      image: "🎉",
      trending: false,
    },
    {
      id: 6,
      platform: "YouTube",
      content: "New tutorial series dropping soon! Subscribe now 📺",
      stats: { likes: 1500, comments: 234, shares: 678 },
      image: "🎥",
      trending: true,
    },
  ];

  const platformIcons: Record<string, React.ReactNode> = {
    Instagram: <span className="text-pink-600"><FaInstagram /></span>,
    X: <span className="text-black"><FaTwitter /></span>,
    TikTok: <span className="text-gray-900"><FaTiktok /></span>,
    Facebook: <span className="text-blue-600"><FaFacebook /></span>,
    YouTube: <span className="text-red-600"><FaYoutube /></span>,
    LinkedIn: <span className="text-blue-700"><FaLinkedin /></span>,
  };

  // Filter logic
  const filteredPosts = trendingPosts.filter(
    (post) =>
      (platform === "All Platforms" || post.platform === platform) &&
      (keyword === "" ||
        post.content.toLowerCase().includes(keyword.toLowerCase())) &&
      (hashtag === "" || post.content.includes(`#${hashtag}`))
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-orange-50 to-yellow-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Trending Posts
            </h1>
            <p className="text-gray-600">
              Discover what's hot across social media
            </p>
          </div>
          <div className="text-6xl text-red-600 animate-pulse">
            <FaFire />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                🔍 Keyword
              </label>
              <input
                className="w-full rounded-xl border-2 border-gray-300 bg-gray-50 px-4 py-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Search keywords..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                # Hashtag
              </label>
              <input
                className="w-full rounded-xl border-2 border-gray-300 bg-gray-50 px-4 py-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Enter hashtag..."
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                🌐 Platform
              </label>
              <select
                className="w-full rounded-xl border-2 border-gray-300 bg-gray-50 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                {platforms.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all"
            >
              {/* Platform Badge */}
              <div className="flex items-center justify-between p-4 bg-linear-to-r from-orange-50 to-yellow-50 border-b border-orange-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {platformIcons[post.platform]}
                  </span>
                  <span className="font-bold text-gray-900">
                    {post.platform}
                  </span>
                </div>
                {post.trending && (
                  <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    <FaFire /> HOT
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-6xl mb-4 text-center">{post.image}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {post.content}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-around pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-pink-600">
                    <FaHeart />
                    <span className="font-bold">{post.stats.likes}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600">
                    <FaComment />
                    <span className="font-bold">{post.stats.comments}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <FaShare />
                    <span className="font-bold">{post.stats.shares}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-7xl text-gray-300 mb-4">🔍</div>
            <p className="text-gray-500 text-xl font-semibold">
              No trending posts found
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
