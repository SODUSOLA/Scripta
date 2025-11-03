import { useState } from "react";

export default function PasswordResetForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full relative bg-center bg-cover flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/bg.jpg')" }}
      aria-label="Reset hero background"
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/40 to-black/70 z-0" />

      {/* main layout: hero + reset card */}
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

        {/* right panel (reset card) */}
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
              Reset Password
            </h2>
            <p className="mb-6 text-gray-500 text-center text-base">
              Enter your email to receive a password reset link
            </p>

            {error && (
              <div className="text-red-600 text-sm font-medium py-2 px-4 bg-red-50 border border-red-200 rounded-lg mb-2 text-center animate-shake">
                {error}
              </div>
            )}
            {sent ? (
              <div className="text-green-600 text-sm font-medium py-2 px-4 bg-green-50 border border-green-200 rounded-lg mb-2 text-center animate-fade-in">
                If your email is registered, a reset link has been sent.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 w-full"
                noValidate
                aria-label="Reset Form"
              >
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
                <button
                  type="submit"
                  className="w-full rounded-md bg-linear-to-br from-orange-500 to-orange-600 text-white font-semibold py-3 shadow-lg hover:scale-[1.03] hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-orange-300"
                  disabled={loading}
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
                      Sending...
                    </span>
                  ) : (
                    "Send reset link"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
        @keyframes shake { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-8px); } 40%, 60% { transform: translateX(8px); } }
        .animate-shake { animation: shake 0.5s; }
      `}</style>
    </div>
  );
}
