import { useState } from "react";

interface Props {
  email: string;
  onVerified?: () => void;
}

export default function VerifyDeviceForm({ email, onVerified }: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.email || email);
      // Dispatch event to update UserContext
      window.dispatchEvent(new Event("userLoggedIn"));
      if (onVerified) onVerified();
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-purple-50 to-pink-100 transition-all duration-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-sm w-full flex flex-col items-center animate-fade-in"
      >
        <div className="flex justify-center mb-6">
          <svg
            width={40}
            height={40}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-2 tracking-tight">
          Device Verification
        </h2>
        <p className="text-gray-500 text-sm text-center mb-4">
          Enter the code sent to{" "}
          <span className="font-mono text-blue-700">{email}</span>
        </p>
        <input
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 mb-3"
          required
        />
        {error && (
          <div className="w-full mb-3 px-3 py-2 bg-red-50 border border-red-200 text-red-700 rounded text-sm text-center animate-shake">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white text-sm font-semibold shadow-md transition-all duration-200 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-[1.03] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            loading ? "opacity-60 cursor-not-allowed" : "hover:brightness-110"
          }`}
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
              Verifying...
            </span>
          ) : (
            "Verify"
          )}
        </button>
        <div className="mt-6 text-center w-full">
          <span className="text-xs text-gray-400">
            Didn’t get a code? Check your spam folder or{" "}
            <a href="#" className="text-blue-500 hover:underline">
              resend
            </a>
            .
          </span>
        </div>
        <style>{`
          @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
          .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
          @keyframes shake { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-8px); } 40%, 60% { transform: translateX(8px); } }
          .animate-shake { animation: shake 0.5s; }
        `}</style>
      </form>
    </div>
  );
}
