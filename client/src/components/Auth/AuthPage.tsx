import { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import PasswordResetForm from "./PasswordResetForm";
import ChangePasswordForm from "./ChangePasswordForm";

type AuthView = "login" | "register" | "verify" | "reset" | "change";

export default function AuthPage() {
  const [view, setView] = useState<AuthView>("login");

  return (
    <div className="w-full">
      {view === "login" && (
        <LoginForm setAuthView={(v) => setView(v as AuthView)} />
      )}
      {view === "register" && (
        <RegisterForm setAuthView={(v) => setView(v as AuthView)} />
      )}
      {view === "reset" && <PasswordResetForm />}
      {view === "change" && <ChangePasswordForm />}
    </div>
  );
}
