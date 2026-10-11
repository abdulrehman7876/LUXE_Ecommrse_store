import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useApp } from "../../hooks/useApp";
import SearchBar from "../ui/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import Account from "../../pages/Account";
import authService from "../../appwrite/Auth";
import { logOut } from "../../store/authSlice";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/category", label: "Categories" },
  { to: "/deals", label: "Deals" },
];

export default function Navbar() {
  const { status, userData } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const { cartCount, wishlist } = useApp();
  const dispatch = useDispatch();
  const closeMobile = () => setMobileOpen(false);

  const popupRef = useRef(null);

  useEffect(() => {
    console.log(userData);

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
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logOut());
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur-sm">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          {/* Logo */}
          <Link to="/" className="shrink-0" onClick={closeMobile}>
            <span className="text-xl font-bold tracking-tight text-brand-900 lg:text-2xl">
              LUXE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                end
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    link.to === window.location.pathname && isActive
                      ? "text-brand-900"
                      : "text-brand-500 hover:text-brand-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Search - Desktop */}
          <div className="hidden flex-1 max-w-md lg:block">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-brand-600 transition-colors hover:bg-brand-50"
              aria-label={`Wishlist${wishlist.length ? `, ${wishlist.length} items` : ""}`}
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-900 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-brand-600 transition-colors hover:bg-brand-50"
              aria-label={`Shopping cart${cartCount ? `, ${cartCount} items` : ""}`}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-900 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            {status ? (
              <div
                onClick={() => setOpenUser(!openUser)}
                ref={popupRef}
                className="hidden h-10 w-10 items-center justify-center rounded-lg text-brand-600 transition-colors hover:bg-brand-50 sm:flex cursor-pointer"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                  {String(userData.name).slice(0, 1).toUpperCase()}
                </div>
                <div
                  className={`z-2 ${openUser ? "flex opacity-100 visible" : "flex opacity-0 invisible"} transition-all delay-150 ease-in flex-col items-start justify-center border border-brand-300 shadow-2xl shadow-accent/10 bg-brand-50 fixed p-5 text-sm gap-3 mt-33 mr-35 w-45 rounded-lg`}
                >
                  <Link
                    to="/account"
                    className="hover:text-brand-900 cursor-pointer"
                  >
                    Manage my account
                  </Link>
                  <button
                    className="hover:text-brand-900 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden h-10 w-10 items-center justify-center rounded-lg text-brand-600 transition-colors hover:bg-brand-50 sm:flex cursor-pointer"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-600 transition-colors hover:bg-brand-50 lg:hidden"
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

        {/* Mobile Search */}
        <div className="pb-3 lg:hidden">
          <SearchBar onSearch={() => closeMobile()} />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-brand-100 bg-white lg:hidden">
          <nav
            className="container-custom flex flex-col py-4"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <NavLink
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
            {status ? (
              <div
                onClick={() => setOpenUser(!openUser)}
                ref={popupRef}
                className="py-3 text-base font-medium text-brand-500 cursor-pointer"
              >
                Account
                <div
                  className={`z-2 ${openUser ? "flex opacity-100 visible" : "flex opacity-0 invisible"} transition-all delay-150 ease-in flex-col items-start justify-center border border-brand-300 shadow-2xl shadow-accent/10 bg-brand-50 fixed p-5 text-sm gap-3 mt-2 w-45 rounded-lg`}
                >
                  <Link
                    to="/account"
                    className="hover:text-brand-900 cursor-pointer"
                  >
                    Manage my account
                  </Link>
                  <button
                    className="hover:text-brand-900 cursor-pointer"
                    onClick={handleLogout}
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
