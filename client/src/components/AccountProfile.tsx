import { useState, useEffect } from "react";
import { api } from "../utils/api";
import type { ApiError } from "../utils/api";
import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaDesktop,
  FaTrash,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";

interface User {
  id: string;
  username: string;
  email: string;
}

interface Session {
  id: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

export default function AccountProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
    fetchSessions();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get<{ user: User }>("/me");
      setUser(response.user);
      setError(null);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await api.get<{ sessions: Session[] }>("/sessions");
      setSessions(response.sessions);
    } catch (err) {
      const apiError = err as ApiError;
      console.error("Failed to load sessions:", apiError.message);
    }
  };

  const revokeSession = async (sessionId: string) => {
    try {
      await api.delete(`/sessions/${sessionId}`);
      setSuccessMessage("Session revoked successfully");
      setSessions(sessions.filter((s) => s.id !== sessionId));
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to revoke session");
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Account Settings
            </h1>
            <p className="text-gray-600">
              Manage your profile and security settings
            </p>
          </div>
          <div className="text-5xl text-blue-600">
            <FaShieldAlt />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg shadow-sm animate-shake">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-lg shadow-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="text-xl">✓</span>
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-3xl text-blue-600">
              <FaUser />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Profile Information
            </h2>
          </div>
          {user ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-blue-600 text-xl">
                    <FaUser />
                  </span>
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Username
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {user.username}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-purple-600 text-xl">
                    <FaEnvelope />
                  </span>
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    Email
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900 break-all">
                  {user.email}
                </div>
              </div>

              <div className="md:col-span-2 bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-gray-600 text-xl">
                    <FaIdCard />
                  </span>
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                    User ID
                  </span>
                </div>
                <div className="text-sm font-mono text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
                  {user.id}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No user data available</p>
            </div>
          )}
        </div>

        {/* Active Sessions Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-3xl text-green-600">
              <FaDesktop />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                Active Sessions
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Manage devices connected to your account
              </p>
            </div>
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
              {sessions.length} Active
            </div>
          </div>
          {sessions.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <div className="text-6xl text-gray-300 mb-4">
                <FaDesktop className="mx-auto" />
              </div>
              <p className="text-gray-500 text-lg font-semibold">
                No active sessions
              </p>
              <p className="text-gray-400 text-sm mt-2">
                You'll see your device sessions here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session, index) => (
                <div
                  key={session.id}
                  className="group relative flex items-start gap-4 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200"
                >
                  <div className="flex-shrink-0 text-3xl text-blue-600 mt-1">
                    <FaDesktop />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                        SESSION {index + 1}
                      </span>
                      {index === 0 && (
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-bold text-gray-900 mb-1 truncate">
                      {session.userAgent}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">📍</span>
                        <span className="font-mono">{session.ipAddress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-gray-400" />
                        <span>
                          {new Date(session.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => revokeSession(session.id)}
                    className="flex-shrink-0 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-600 hover:scale-105 transition-all duration-200 shadow-md"
                  >
                    <FaTrash />
                    Revoke
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security Tips */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-yellow-200">
          <div className="flex items-start gap-4">
            <div className="text-3xl text-yellow-600">
              <FaShieldAlt />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Security Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>
                    Revoke sessions from devices you don't recognize
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>Change your password regularly to keep your account secure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>
                    Don't share your account credentials with anyone
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
