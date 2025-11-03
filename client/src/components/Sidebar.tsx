import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaChartBar,
  FaUsers,
  FaRobot,
  FaRegFileAlt,
  FaCog,
  FaQuestionCircle,
  FaInbox,
  FaUser,
  FaKey,
  FaChartLine,
  FaFileAlt,
} from "react-icons/fa";

const navItems = [
  { name: "Overview", path: "/dashboard", icon: <FaHome size={20} /> },
  {
    name: "Content Calendar",
    path: "/calendar",
    icon: <FaCalendarAlt size={20} />,
  },
  { name: "Drafts", path: "/drafts", icon: <FaFileAlt size={20} /> },
  { name: "Analytics", path: "/analytics", icon: <FaChartBar size={20} /> },
  { name: "Inbox", path: "/inbox", icon: <FaInbox size={20} /> },
  { name: "Team", path: "/team", icon: <FaUsers size={20} /> },
  { name: "AI Assistant", path: "/ai", icon: <FaRobot size={20} /> },
  { name: "AI Usage", path: "/ai-usage", icon: <FaChartLine size={20} /> },
  { name: "Profile", path: "/profile", icon: <FaUser size={20} /> },
  {
    name: "Change Password",
    path: "/change-password",
    icon: <FaKey size={20} />,
  },
  { name: "Templates", path: "/templates", icon: <FaRegFileAlt size={20} /> },
  { name: "Settings", path: "/settings", icon: <FaCog size={20} /> },
  { name: "Help Center", path: "/help", icon: <FaQuestionCircle size={20} /> },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="bg-white text-black w-64 min-h-screen flex flex-col py-8 px-6 border-r border-gray-200 font-sans fixed top-0 left-0 z-30">
      <div className="mb-10 text-2xl font-extrabold tracking-wide">
        Work Space
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 py-2 px-3 rounded-lg text-base font-medium transition
                ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
              style={{ marginBottom: 2 }}
            >
              <span className="text-black mr-2">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
