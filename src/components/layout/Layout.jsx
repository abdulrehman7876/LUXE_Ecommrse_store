import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ToastNotification from "../ui/ToastNotification";
import { useEffect } from "react";

import authService from "../../appwrite/auth";
import { logIn, logOut } from "../../store/authSlice";
import { useDispatch, useStore } from "react-redux";
import { syncAfterLogin } from "../../store/cartSync";

export default function Layout() {
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(logIn(userData));
        syncAfterLogin(userData, store);
      } else {
        dispatch(logOut());
      }
    });
  }, [dispatch, store]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastNotification />
    </div>
  );
}
