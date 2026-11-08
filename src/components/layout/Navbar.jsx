import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useApp } from "../../hooks/useApp";
import SearchBar from "../ui/SearchBar";
import authService from "../../appwrite/auth";
import { logOut } from "../../store/authSlice";
import { useDispatch, useSelector, useStore } from "react-redux";
import { stopSync } from "../../store/cartSync";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/category", label: "Categories" },
  { to: "/deals", label: "Deals" },
];

export default function Navbar() {
  const { status, userData, authChecked } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const { cartCount, wishlist } = useApp();
  const dispatch = useDispatch();
  const store = useStore();
  const closeMobile = () => setMobileOpen(false);

  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpenUser(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await stopSync(store);
    await authService.logout();
    dispatch(logOut());
  };

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-[#fffdfb]/95 backdrop-blur-sm">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2"
            onClick={closeMobile}
          >
            <span className="text-xl font-extrabold tracking-[-0.08em] text-brand-900 lg:text-2xl">
              meloza<span className="text-accent">.</span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-4 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                end
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors p-2 px-3 rounded-2xl ${
                    isActive
                      ? "text-white bg-brand-900 hover:bg-brand-900"
                      : "text-brand-900 hover:text-brand-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden flex-1 max-w-xl lg:block">
            <SearchBar />
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-brand-700 transition-colors hover:bg-brand-50"
              aria-label={`Wishlist${wishlist.length ? `, ${wishlist.length} items` : ""}`}
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-brand-700 transition-colors hover:bg-brand-50"
              aria-label={`Shopping cart${cartCount ? `, ${cartCount} items` : ""}`}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-900 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            {!authChecked ? (
              <div
                className="hidden h-10 w-10 animate-pulse rounded-lg bg-brand-100 sm:flex"
                aria-hidden="true"
              />
            ) : status ? (
              <div
                onClick={() => setOpenUser(!openUser)}
                ref={popupRef}
                className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-brand-700 transition-colors hover:bg-brand-50 sm:flex"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-900 text-sm font-semibold text-white">
                  {String(userData.name).slice(0, 1).toUpperCase()}
                </div>
                <div
                  className={`z-2 ${openUser ? "visible opacity-100" : "invisible opacity-0"} fixed mt-33 mr-35 flex w-45 flex-col items-start justify-center gap-3 rounded-lg border border-brand-200 bg-white p-5 text-sm shadow-xl transition-all delay-150 ease-in`}
                >
                  <Link
                    to="/account"
                    className="cursor-pointer hover:text-brand-900"
                  >
                    Manage my account
                  </Link>
                  <button
                    className="cursor-pointer hover:text-brand-900"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-brand-700 transition-colors hover:bg-brand-50 sm:flex"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-700 transition-colors hover:bg-brand-50 lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="pb-3 lg:hidden">
          <SearchBar onSearch={() => closeMobile()} />
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-brand-100 bg-white lg:hidden">
          <nav
            className="container-custom flex flex-col py-4"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                end
                key={link.to}
                to={link.to}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `py-3 text-base font-medium transition-colors ${
                    isActive ? "text-brand-900" : "text-brand-500"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {!authChecked ? (
              <div className="py-3 text-base font-medium text-brand-400">
                Account
              </div>
            ) : status ? (
              <div
                onClick={() => setOpenUser(!openUser)}
                ref={popupRef}
                className="cursor-pointer py-3 text-base font-medium text-brand-500"
              >
                Account
                <div
                  className={`z-2 ${openUser ? "visible opacity-100" : "invisible opacity-0"} mt-2 flex w-45 flex-col items-start justify-center gap-3 rounded-lg border border-brand-200 bg-white p-5 text-sm shadow-xl transition-all delay-150 ease-in`}
                >
                  <Link
                    to="/account"
                    className="cursor-pointer hover:text-brand-900"
                    onClick={closeMobile}
                  >
                    Manage my account
                  </Link>
                  <button
                    className="cursor-pointer hover:text-brand-900"
                    onClick={() => {
                      handleLogout();
                      closeMobile();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMobile}
                className="py-3 text-base font-medium text-brand-500"
              >
                Account
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
