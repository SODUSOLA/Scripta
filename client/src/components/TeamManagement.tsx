import { FaUsers, FaUserPlus, FaEdit, FaTrash, FaShieldAlt } from "react-icons/fa";

const teamMembers = [
  { id: 1, name: "Karl Anderson", role: "Admin", email: "karl@scripta.com", status: "Active" },
  { id: 2, name: "Maya Rodriguez", role: "Editor", email: "maya@scripta.com", status: "Active" },
  { id: 3, name: "Lee Chen", role: "Viewer", email: "lee@scripta.com", status: "Active" },
  { id: 4, name: "Sarah Williams", role: "Editor", email: "sarah@scripta.com", status: "Invited" },
];

export default function TeamManagement() {
  const getRoleBadge = (role: string) => {
    const colors = {
      Admin: "bg-red-100 text-red-700",
      Editor: "bg-blue-100 text-blue-700",
      Viewer: "bg-gray-100 text-gray-700",
    };
    return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const getStatusBadge = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-blue-50 to-cyan-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Team Management
            </h1>
            <p className="text-gray-600">
              Manage your team members and permissions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-xl shadow-md border border-gray-200">
              <div className="text-3xl font-bold text-indigo-600">
                {teamMembers.length}
              </div>
              <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">
                Members
              </div>
            </div>
            <button className="flex items-center gap-3 bg-linear-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              <FaUserPlus /> Invite Member
            </button>
          </div>
        </div>

        {/* Roles Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl text-red-600">
                <FaShieldAlt />
              </span>
              <div>
                <div className="text-2xl font-bold text-gray-900">1</div>
                <div className="text-sm text-gray-600 font-semibold">
                  Admin
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">Full access & permissions</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl text-blue-600">
                <FaEdit />
              </span>
              <div>
                <div className="text-2xl font-bold text-gray-900">2</div>
                <div className="text-sm text-gray-600 font-semibold">
                  Editors
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">Can create & edit content</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl text-gray-600">
                <FaUsers />
              </span>
              <div>
                <div className="text-2xl font-bold text-gray-900">1</div>
                <div className="text-sm text-gray-600 font-semibold">
                  Viewers
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500">View-only access</p>
          </div>
        </div>

        {/* Team Members Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 bg-linear-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-indigo-600 text-3xl">
                <FaUsers />
              </span>
              Team Members
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Member
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Email
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Role
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
                {teamMembers.map((member, index) => (
                  <tr
                    key={member.id}
                    className={`border-b border-gray-100 hover:bg-indigo-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-white">
                          {member.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">
                            {member.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{member.email}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleBadge(
                          member.role
                        )}`}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(
                          member.status
                        )}`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                          title="Remove"
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
        </div>

        {/* Permissions Info */}
        <div className="bg-linear-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-yellow-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            🔐 Role Permissions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-bold text-red-700 mb-2">Admin</div>
              <ul className="space-y-1">
                <li>✓ Full access</li>
                <li>✓ Manage team</li>
                <li>✓ Billing & settings</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-blue-700 mb-2">Editor</div>
              <ul className="space-y-1">
                <li>✓ Create content</li>
                <li>✓ Edit & publish</li>
                <li>✗ Manage team</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-gray-700 mb-2">Viewer</div>
              <ul className="space-y-1">
                <li>✓ View content</li>
                <li>✗ Edit content</li>
                <li>✗ Manage team</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
