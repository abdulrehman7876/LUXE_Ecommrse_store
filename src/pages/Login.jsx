import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApp } from "../hooks/useApp";
import authService from "../appwrite/auth";
import { logIn, logOut } from "../store/authSlice";
import { useDispatch, useSelector, useStore } from "react-redux";
import { syncAfterLogin, syncAfterRegister } from "../store/cartSync";

export default function Login() {
  const dispatch = useDispatch();
  const store = useStore();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { showToast } = useApp();

  const { status } = useSelector((state) => state.auth);
  useEffect(() => {
    if (status) {
      navigate("/account");
    }
  }, [status, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(data.email)) {
      if (isLogin) {
        authService
          .login(data)
          .then((session) => {
            if (session) {
              authService.getCurrentUser().then((userData) => {
                if (userData) {
                  navigate("/");
                  dispatch(logIn(userData));
                  syncAfterLogin(userData, store);
                  showToast("Signed in successfully");
                  setData({
                    name: "",
                    email: "",
                    password: "",
                  });
                } else {
                  dispatch(logOut());
                  showToast("Some error occured please try agian!");
                }
              });
            }
          })
          .catch((err) => {
            showToast(err.message, "error");
          });
      } else {
        authService
          .createAccount(data)
          .then((session) => {
            if (session) {
              authService.getCurrentUser().then((userData) => {
                if (userData) {
                  navigate("/");
                  dispatch(logIn(userData));
                  syncAfterRegister(userData, store);
                  showToast("Signed in successfully");
                  setData({
                    name: "",
                    email: "",
                    password: "",
                  });
                } else {
                  dispatch(logOut());
                  showToast("Some error occured please try agian!");
                  setData({
                    name: "",
                    email: "",
                    password: "",
                  });
                }
              });
            }
          })
          .catch((err) => {
            showToast(err.message, "error");
          });
      }
    }
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
            {isLogin ? "Welcome" : "Create Account"}
          </h1>
          <p className="mt-2 text-sm text-brand-500">
            {isLogin
              ? "Sign in to access your account and orders"
              : "Join LUXE for exclusive offers and faster checkout"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {!isLogin ? (
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-brand-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={data.name}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-3 text-sm focus:border-brand-400 focus:outline-none"
              />
            </div>
          ) : null}
          <div>
            <label
              htmlFor="login-email"
              className="text-sm font-medium text-brand-700"
            >
              Email
            </label>
            <input
              id="login-email"
              autoComplete="email"
              type="email"
              value={data.email}
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
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
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={data.password}
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
              required
              minLength={6}
              className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-3 text-sm focus:border-brand-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-brand-900 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700 cursor-pointer"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-brand-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-brand-800 hover:underline cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
