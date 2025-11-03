import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FaBell, FaSearch, FaRegCalendarAlt } from "react-icons/fa";

const TopBar = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = date.toLocaleTimeString();
  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const user = useContext(UserContext);
  const navigate = useNavigate();

  // Get initials from email
  const getInitials = (email: string) => {
    if (!email) return "?";
    const name = email.split("@")[0];
    const parts = name.split(/[._-]/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return parts
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-20 bg-white flex items-center justify-between px-8 py-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        {/* User avatar */}
        <button
          className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold text-lg focus:outline-none hover:bg-blue-700 transition"
          title={user?.email || "Account"}
          onClick={() => navigate("/profile")}
        >
          {getInitials(user?.email || "")}
        </button>
        {/* Search bar */}
        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
          <span className="text-gray-400 mr-2">
            <FaSearch size={16} />
          </span>
          <input
            type="text"
            placeholder="Search templates"
            className="bg-transparent outline-none w-full text-base"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        {/* Time and date */}
        <div className="flex items-center gap-2 text-gray-600 text-base">
          <span>{formattedTime}</span>
          <FaRegCalendarAlt size={20} />
          <span>{formattedDate}</span>
        </div>
        {/* Notification icon */}
        <button
          className="text-gray-400 hover:text-blue-600 text-xl"
          aria-label="Notifications"
        >
          <FaBell />
        </button>
        {/* Create Post button */}
        <button 
          onClick={() => navigate("/create-post")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-base hover:bg-blue-700 transition"
        >
          + Create Post
        </button>
        {/* Logout button */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold text-base hover:bg-red-600 transition"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            // Dispatch event to update UserContext
            window.dispatchEvent(new Event("userLoggedIn"));
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      {/* Calendar dropdown above icon */}
      {/* ...existing code... */}
      {/* Calendar dropdown is handled by the button in the time/date section above. Removed duplicate icon and dropdown. */}
    </header>
  );
};

export default TopBar;
