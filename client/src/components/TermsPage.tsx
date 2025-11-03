import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-purple-50 to-pink-100 p-6">
      <div className="bg-white/95 rounded-xl shadow-xl p-8 max-w-2xl w-full border border-gray-200 backdrop-blur-md animate-fade-in">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 text-center">
          Terms and Conditions
        </h1>
        <p className="mb-6 text-gray-700 text-base text-center">
          Please read these terms and conditions carefully before using Scripta.
        </p>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 text-sm">
          <li>
            <strong>Acceptance:</strong> By creating an account, you agree to
            abide by these terms and all applicable laws.
          </li>
          <li>
            <strong>Privacy:</strong> Your data is handled securely and will not
            be shared without your consent, except as required by law.
          </li>
          <li>
            <strong>Content:</strong> You are responsible for all content you
            create, upload, or share on Scripta.
          </li>
          <li>
            <strong>Prohibited Use:</strong> Do not use Scripta for illegal,
            harmful, or abusive activities.
          </li>
          <li>
            <strong>Account Security:</strong> Keep your login credentials
            confidential. You are responsible for activity under your account.
          </li>
          <li>
            <strong>Changes:</strong> Scripta may update these terms at any
            time. Continued use means you accept the new terms.
          </li>
          <li>
            <strong>Termination:</strong> Accounts may be suspended or
            terminated for violations of these terms.
          </li>
        </ul>
        <p className="mt-6 text-xs text-gray-400 text-center">
          Last updated: October 26, 2025
        </p>
        <style>{`
          @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
          .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
        `}</style>
      </div>
    </div>
  );
}
