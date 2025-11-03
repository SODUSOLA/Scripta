import { useState, useEffect } from "react";
import { api } from "../utils/api";
import type { ApiError } from "../utils/api";
import {
  FaRobot,
  FaDollarSign,
  FaChartLine,
  FaBolt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

interface UsageActivity {
  id: string;
  topic: string;
  tokensUsed: number;
  costUSD: number;
  createdAt: string;
  model: string;
}

interface UsageStats {
  total_generations: number;
  total_tokens: number;
  total_cost_usd: string;
  recent_activity: UsageActivity[];
}

export default function AIUsageStats() {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsageStats();
  }, []);

  const fetchUsageStats = async () => {
    try {
      const response = await api.get<UsageStats>("/ai/usage/me");
      setStats(response);
      setError(null);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to load AI usage stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl text-blue-600 mb-4">
            <FaRobot className="mx-auto" />
          </div>
          <div className="text-xl text-gray-600 font-semibold">
            Loading AI usage stats...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-10">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  const avgTokensPerGen = stats?.total_generations
    ? Math.round(stats.total_tokens / stats.total_generations)
    : 0;
  const avgCostPerGen = stats?.total_generations
    ? (parseFloat(stats.total_cost_usd) / stats.total_generations).toFixed(6)
    : "0.00";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              AI Usage Statistics
            </h1>
            <p className="text-gray-600">
              Track your AI-powered content generation activity
            </p>
          </div>
          <div className="text-6xl text-purple-600 animate-pulse">
            <FaRobot />
          </div>
        </div>

        {/* Primary Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl opacity-80">
                <FaRobot />
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                TOTAL
              </div>
            </div>
            <div className="text-sm font-semibold uppercase tracking-wide opacity-90 mb-2">
              Generations
            </div>
            <div className="text-5xl font-extrabold">
              {stats?.total_generations || 0}
            </div>
            <div className="mt-3 text-sm opacity-75">
              AI-powered content created
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl opacity-80">
                <FaChartLine />
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                USAGE
              </div>
            </div>
            <div className="text-sm font-semibold uppercase tracking-wide opacity-90 mb-2">
              Total Tokens
            </div>
            <div className="text-4xl font-extrabold">
              {stats?.total_tokens.toLocaleString() || 0}
            </div>
            <div className="mt-3 text-sm opacity-75">
              ~{avgTokensPerGen.toLocaleString()} per generation
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl opacity-80">
                <FaDollarSign />
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                COST
              </div>
            </div>
            <div className="text-sm font-semibold uppercase tracking-wide opacity-90 mb-2">
              Total Spend (USD)
            </div>
            <div className="text-4xl font-extrabold">
              ${parseFloat(stats?.total_cost_usd || "0").toFixed(2)}
            </div>
            <div className="mt-3 text-sm opacity-75">
              ${avgCostPerGen} per generation
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl text-orange-500">
                <FaBolt />
              </div>
              <div className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Efficiency
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {avgTokensPerGen.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Average tokens per generation
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl text-green-500">
                <FaCheckCircle />
              </div>
              <div className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Activity
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {stats?.recent_activity.length || 0}
            </div>
            <div className="text-sm text-gray-600 mt-1">Recent generations</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl text-blue-500">
                <FaClock />
              </div>
              <div className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                Last Used
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {stats?.recent_activity[0]
                ? new Date(stats.recent_activity[0].createdAt).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" }
                  )
                : "Never"}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {stats?.recent_activity[0]
                ? new Date(stats.recent_activity[0].createdAt).toLocaleTimeString(
                    "en-US",
                    { hour: "2-digit", minute: "2-digit" }
                  )
                : "No activity yet"}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl text-purple-600">
              <FaChartLine />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Activity
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Your latest AI-powered generations
              </p>
            </div>
          </div>
          {!stats || stats.recent_activity.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <div className="text-7xl text-gray-300 mb-4">
                <FaRobot className="mx-auto" />
              </div>
              <p className="text-gray-500 text-xl font-semibold mb-2">
                No AI activity yet
              </p>
              <p className="text-gray-400 text-sm">
                Start using AI features to see your usage statistics here
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gradient-to-r from-purple-50 to-blue-50">
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wide">
                        Topic
                      </th>
                      <th className="py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wide">
                        Model
                      </th>
                      <th className="py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wide">
                        Tokens
                      </th>
                      <th className="py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wide">
                        Cost (USD)
                      </th>
                      <th className="py-4 px-6 text-sm font-bold text-gray-700 uppercase tracking-wide">
                        Date & Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recent_activity.map((activity, index) => (
                      <tr
                        key={activity.id}
                        className={`border-b border-gray-100 hover:bg-purple-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                          <div className="flex items-center gap-2">
                            <span className="text-purple-600">📝</span>
                            {activity.topic}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-mono text-xs font-bold">
                            {activity.model}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm font-bold text-gray-900">
                          {activity.tokensUsed.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-sm font-bold text-green-600">
                          ${activity.costUSD.toFixed(6)}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">
                          <div>
                            {new Date(activity.createdAt).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric", year: "numeric" }
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(activity.createdAt).toLocaleTimeString(
                              "en-US",
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
