import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface RegisterFormProps {
  setAuthView?: (view: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      // Redirect to verify page with email
      navigate(`/verify?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full relative bg-center bg-cover flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/bg.jpg')" }}
      aria-label="Register hero background"
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/40 to-black/70 z-0" />

      {/* main layout: hero + register card */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto flex flex-col lg:flex-row items-center justify-between min-h-screen px-4 lg:px-10 py-8">
        {/* Hero copy (hidden on small screens) */}
        <div className="hidden lg:flex flex-col justify-center max-w-[50%] pr-12 text-white">
          <div className="mb-3 font-bold text-2xl text-orange-400 tracking-wide">
            Scripta
          </div>
          <h1 className="font-extralight text-[64px] leading-tight text-white/90 tracking-wide mb-3 drop-shadow-lg">
            Designed for Individuals
          </h1>
          <p className="mt-3 text-lg text-white/70">
            View the analytics and expand your post from one application!
          </p>
        </div>

        {/* right panel (register card) */}
        <div className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0 flex flex-col items-center justify-center">
          <div className="bg-white/95 rounded-xl shadow-xl px-8 py-10 w-full flex flex-col items-center border border-gray-200 backdrop-blur-md transition-all duration-200">
            {/* Logo */}
            <div className="mb-5 flex justify-center">
              <img
                src="/assets/logo.svg"
                alt="Unifidely logo"
                className="w-20 h-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            <h2 className="text-3xl font-semibold mb-4 text-gray-900 text-center">
              Create your account
            </h2>
            <p className="mb-6 text-gray-500 text-center text-base">
              Sign up to get started
            </p>

            {error && (
              <div className="text-red-600 text-sm font-medium py-2 px-4 bg-red-50 border border-red-200 rounded-lg mb-2 text-center animate-shake">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-600 text-sm font-medium py-2 px-4 bg-green-50 border border-green-200 rounded-lg mb-2 text-center animate-fade-in">
                {success}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 w-full"
              noValidate
              aria-label="Register Form"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-xs font-semibold text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  autoComplete="username"
                  aria-required="true"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  autoComplete="email"
                  aria-required="true"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pr-24 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                    autoComplete="new-password"
                    aria-required="true"
                    required
                  />
                  {/* Toggle password visibility */}
                  <button
                    type="button"
                    tabIndex={0}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.964 9.964 0 013.172-7.266M21 12c0 5.523-4.477 10-10 10a9.964 9.964 0 01-7.266-3.172M16.24 7.76A5.966 5.966 0 0121 12M3 3l18 18"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                        <circle cx="12" cy="12" r="3" strokeWidth="2" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-semibold text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 pr-24 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                    autoComplete="new-password"
                    aria-required="true"
                    required
                  />
                  {/* Toggle confirm password visibility */}
                  <button
                    type="button"
                    tabIndex={0}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 focus:outline-none"
                  >
                    {showConfirm ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.964 9.964 0 013.172-7.266M21 12c0 5.523-4.477 10-10 10a9.964 9.964 0 01-7.266-3.172M16.24 7.76A5.966 5.966 0 0121 12M3 3l18 18"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                        <circle cx="12" cy="12" r="3" strokeWidth="2" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 mr-2 accent-orange-500"
                  required
                />
                <label htmlFor="agree" className="text-xs text-gray-700">
                  I agree to all the{" "}
                  <Link
                    to="/terms"
                    className="text-orange-600 underline hover:text-orange-800"
                    target="_blank"
                  >
                    terms and conditions
                  </Link>
                </label>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-linear-to-br from-orange-500 to-orange-600 text-white font-semibold py-3 shadow-lg hover:scale-[1.03] hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-orange-300"
                disabled={loading || !agreed}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeWidth="4"
                        fill="none"
                      />
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register"
                )}
              </button>
              <div className="text-center mt-2">
                <span className="text-sm text-gray-700">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-orange-600 font-semibold hover:underline"
                  >
                    Log in
                  </Link>
                </span>
              </div>
            </form>
            {/* Google auth visual area */}
            <div className="mt-7 w-full">
              <button
                type="button"
                onClick={() =>
                  alert(
                    "Start Google OAuth flow (implement server/client flow)."
                  )
                }
                className="w-full flex items-center justify-center gap-3 bg-gray-50 border border-gray-300 rounded-md py-2 shadow hover:bg-white transition text-gray-800 font-semibold text-base active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Authorize register with Google"
              >
                <span className="w-6 h-6 inline-block">
                  {/* Google icon (inline SVG) */}
                  <svg viewBox="0 0 533.5 544.3" className="w-full h-full">
                    <path
                      fill="#4285F4"
                      d="M533.5 278.4c0-17.9-1.4-35.1-4.1-51.8H272v98h146.9c-6.3 34.1-24.6 63.1-52.6 82.5v68.5h84.9C499.6 426.1 533.5 357.9 533.5 278.4z"
                    />
                    <path
                      fill="#34A853"
                      d="M272 544.3c71 0 130.5-23.5 174-63.9l-84.9-68.5c-23.6 15.9-53.6 25.4-89.1 25.4-68.5 0-126.6-46.3-147.5-108.6H35.8v68.1C79.1 487.9 167.6 544.3 272 544.3z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M124.5 327.8c-10.6-31.2-10.6-64.6 0-95.8V164H35.8c-40.9 79.4-40.9 173 0 252.4l88.7-88.6z"
                    />
                    <path
                      fill="#EA4335"
                      d="M272 107.2c37.7-.6 73.9 13 101.4 37.4l76.1-76.1C402.7 25.2 344.7 0 272 0 167.6 0 79.1 56.4 35.8 141.9L124.5 230C145.4 167.7 203.5 121.3 272 121.3z"
                    />
                  </svg>
                </span>
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
