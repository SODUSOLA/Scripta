import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import PasswordResetForm from "./components/Auth/PasswordResetForm";
import VerifyDeviceForm from "./components/Auth/VerifyDeviceForm";
import TermsPage from "./components/TermsPage";
import Dashboard from "./pages/Dashboard";
import TrendingFeed from "./components/TrendingFeed";
import PostComposer from "./components/PostComposer";
import ContentCalendar from "./components/ContentCalendar";
import Inbox from "./components/Inbox";
import AccountSwitcher from "./components/AccountSwitcher";
import TeamManagement from "./components/TeamManagement";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import AIAssistant from "./components/AIAssistant";
import AccountProfile from "./components/AccountProfile";
import ChangePasswordForm from "./components/ChangePasswordForm";
import AIUsageStats from "./components/AIUsageStats";
import DraftManager from "./components/DraftManager";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { UserContext } from "./context/UserContext";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

function VerifyDeviceFormWrapper() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email") || "";
  return <VerifyDeviceForm email={email} />;
}

function MainLayout() {
  const user = useContext(UserContext);
  if (!user?.email) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <TopBar />
        <div className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trending" element={<TrendingFeed />} />
            <Route path="/compose" element={<PostComposer />} />
            <Route path="/calendar" element={<ContentCalendar />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/accounts" element={<AccountSwitcher />} />
            <Route path="/profile" element={<AccountProfile />} />
            <Route path="/change-password" element={<ChangePasswordForm />} />
            <Route path="/team" element={<TeamManagement />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/ai" element={<AIAssistant />} />
            <Route path="/ai-usage" element={<AIUsageStats />} />
            <Route path="/drafts" element={<DraftManager />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // Simulate getting user email from localStorage or API
  const [user, setUser] = useState({ email: "" });

  useEffect(() => {
    // Load user email from localStorage
    const loadUser = () => {
      const storedEmail = localStorage.getItem("userEmail");
      setUser({ email: storedEmail || "" });
    };

    // Load initially
    loadUser();

    // Listen for storage events (e.g., login in another tab)
    window.addEventListener("storage", loadUser);

    // Listen for custom event we'll dispatch after login
    window.addEventListener("userLoggedIn", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("userLoggedIn", loadUser);
    };
  }, []);

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/reset" element={<PasswordResetForm />} />
          <Route path="/verify" element={<VerifyDeviceFormWrapper />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
