import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import TermsPage from "./components/TermsPage";
import PasswordResetForm from "./components/Auth/PasswordResetForm";
import VerifyDeviceForm from "./components/Auth/VerifyDeviceForm";
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
import { useLocation } from "react-router-dom";

function VerifyDeviceFormWrapper() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email") || "";
  return <VerifyDeviceForm email={email} />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/reset" element={<PasswordResetForm />} />
      <Route path="/verify" element={<VerifyDeviceFormWrapper />} />
      <Route path="/terms" element={<TermsPage />} />
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
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
}
