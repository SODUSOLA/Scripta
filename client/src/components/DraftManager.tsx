import { useState, useEffect } from "react";
import { api } from "../utils/api";
import type { ApiError } from "../utils/api";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaFileAlt,
  FaClock,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

interface Draft {
  id: string;
  title: string;
  content: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
}

export default function DraftManager() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingDraft, setEditingDraft] = useState<Draft | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    platform: "general",
  });

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const response = await api.get<Draft[]>("/drafts");
      setDrafts(response);
      setError(null);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to load drafts");
    } finally {
      setLoading(false);
    }
  };

  const createDraft = async () => {
    if (!formData.title || !formData.content) {
      setError("Title and content are required");
      return;
    }

    try {
      const newDraft = await api.post<Draft>("/drafts", formData);
      setDrafts([newDraft, ...drafts]);
      setFormData({ title: "", content: "", platform: "general" });
      setShowCreateForm(false);
      showSuccess("Draft created successfully");
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to create draft");
    }
  };

  const updateDraft = async () => {
    if (!editingDraft) return;

    try {
      const updated = await api.patch<Draft>(`/drafts/${editingDraft.id}`, {
        title: formData.title,
        content: formData.content,
      });
      setDrafts(drafts.map((d) => (d.id === updated.id ? updated : d)));
      setEditingDraft(null);
      setFormData({ title: "", content: "", platform: "general" });
      showSuccess("Draft updated successfully");
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to update draft");
    }
  };

  const deleteDraft = async (id: string) => {
    if (!confirm("Are you sure you want to delete this draft?")) return;

    try {
      await api.delete(`/drafts/${id}`);
      setDrafts(drafts.filter((d) => d.id !== id));
      showSuccess("Draft deleted successfully");
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to delete draft");
    }
  };

  const startEdit = (draft: Draft) => {
    setEditingDraft(draft);
    setFormData({
      title: draft.title,
      content: draft.content,
      platform: draft.platform,
    });
    setShowCreateForm(false);
  };

  const cancelEdit = () => {
    setEditingDraft(null);
    setFormData({ title: "", content: "", platform: "general" });
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-6xl text-indigo-600 mb-4">
            <FaFileAlt className="mx-auto" />
          </div>
          <div className="text-xl text-gray-600 font-semibold">
            Loading drafts...
          </div>
        </div>
      </div>
    );
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <FaTwitter className="text-blue-400" />;
      case "facebook":
        return <FaFacebook className="text-blue-600" />;
      case "instagram":
        return <FaInstagram className="text-pink-600" />;
      case "linkedin":
        return <FaLinkedin className="text-blue-700" />;
      default:
        return <FaFileAlt className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Draft Manager
            </h1>
            <p className="text-gray-600">
              Create, edit, and organize your content drafts
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-xl shadow-md border border-gray-200">
              <div className="text-3xl font-bold text-indigo-600">
                {drafts.length}
              </div>
              <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
                Total Drafts
              </div>
            </div>
            <button
              onClick={() => {
                setShowCreateForm(!showCreateForm);
                setEditingDraft(null);
                setFormData({ title: "", content: "", platform: "general" });
              }}
              className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <FaPlus className="text-xl" /> New Draft
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg shadow-sm animate-shake">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-lg shadow-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        {/* Create/Edit Form */}
        {(showCreateForm || editingDraft) && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingDraft ? "✏️ Edit Draft" : "📝 Create New Draft"}
              </h2>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  cancelEdit();
                }}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Draft Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter a catchy title..."
                  className="w-full rounded-xl border-2 border-gray-300 bg-gray-50 px-5 py-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Write your content here..."
                  rows={8}
                  className="w-full rounded-xl border-2 border-gray-300 bg-gray-50 px-5 py-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {formData.content.length} characters
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                  className="w-full rounded-xl border-2 border-gray-300 bg-gray-50 px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                >
                  <option value="general">📄 General</option>
                  <option value="twitter">🐦 Twitter</option>
                  <option value="facebook">👥 Facebook</option>
                  <option value="instagram">📸 Instagram</option>
                  <option value="linkedin">💼 LinkedIn</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={editingDraft ? updateDraft : createDraft}
                  className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  <FaSave /> {editingDraft ? "Update Draft" : "Create Draft"}
                </button>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    cancelEdit();
                  }}
                  className="px-6 py-3 rounded-xl font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Drafts Grid */}
        {drafts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 border-2 border-dashed border-gray-300 text-center">
            <div className="text-8xl text-gray-300 mb-6">
              <FaFileAlt className="mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Drafts Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start creating amazing content by adding your first draft
            </p>
            <button
              onClick={() => {
                setShowCreateForm(true);
                setEditingDraft(null);
                setFormData({ title: "", content: "", platform: "general" });
              }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <FaPlus className="text-xl" /> Create Your First Draft
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {drafts.map((draft, index) => (
              <div
                key={draft.id}
                className="group bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{getPlatformIcon(draft.platform)}</div>
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Draft #{drafts.length - index}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                        {draft.title}
                      </h3>
                    </div>
                  </div>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wide">
                    {draft.platform}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3 text-sm leading-relaxed">
                  {draft.content}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>
                      Created {new Date(draft.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>✏️</span>
                    <span>
                      Updated {new Date(draft.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(draft)}
                    className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-yellow-600 hover:scale-105 transition-all duration-200 shadow-md"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => deleteDraft(draft.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 hover:scale-105 transition-all duration-200 shadow-md"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
