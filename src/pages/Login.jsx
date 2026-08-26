import { Link } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../hooks/useApp";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(
      isLogin ? "Signed in successfully! (Demo)" : "Account created! (Demo)",
      "success",
    );
  };

  return (
    <div className="container-custom py-12 lg:py-20">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-brand-900"
          >
            LUXE
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-brand-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-2 text-sm text-brand-500">
            {isLogin
              ? "Sign in to access your account and orders"
              : "Join LUXE for exclusive offers and faster checkout"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="text-sm font-medium text-brand-700"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-3 text-sm focus:border-brand-400 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="login-password"
              className="text-sm font-medium text-brand-700"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-3 text-sm focus:border-brand-400 focus:outline-none"
            />
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-brand-500 hover:text-brand-800"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-brand-900 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-brand-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-brand-800 hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>

        <p className="mt-8 text-center text-xs text-brand-400">
          This is a demo login page. No real authentication is performed.
        </p>
      </div>
    </div>
  );
}
