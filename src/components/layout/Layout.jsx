import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ToastNotification from "../ui/ToastNotification";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../appwrite/Auth";
import { logIn, logOut } from "../../store/authSlice";
import LoadingSkeleton from "../ui/LoadingSkeleton";

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(logIn(userData));
        } else {
          dispatch(logOut());
        }
      })
      .catch((err) =>
        console.log("User Not Loged in authService :: Error", err.message),
      )
      .finally(() => setLoading(false));
  }, []);
  return loading ? (
    <>
      <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem] animate-pulse bg-gray-100"></div>
      <LoadingSkeleton />
    </>
  ) : (
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
