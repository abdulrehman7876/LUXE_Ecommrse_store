import EmptyState from "../components/ui/EmptyState";
import {
  User,
  Package,
  MapPin,
  Lock,
  CreditCard,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { logIn, logOut } from "../store/authSlice";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { useEffect, useState } from "react";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import { useApp } from "../hooks/useApp";
import { useDispatch, useSelector, useStore } from "react-redux";
import { stopSync } from "../store/cartSync";

export default function ManageAccount() {
  const { status, userData, authChecked } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useStore();
  const nav = [
    {
      label: "Account Overview",
      size: 18,
      slug: "/account",
      icon: User,
    },
    {
      label: "My Orders",
      size: 18,
      slug: "/account/my-orders",
      icon: Package,
    },
    {
      label: "Addresses",
      size: 18,
      slug: "/account/addresses",
      icon: MapPin,
    },
    {
      label: "Payment methods",
      size: 18,
      slug: "/account/payment-methods",
      icon: CreditCard,
    },
    {
      label: "Security",
      size: 18,
      slug: "/account/security",
      icon: Lock,
    },
  ];

  const handleLogout = async () => {
    await stopSync(store);
    await authService.logout();
    dispatch(logOut());
    navigate("/");
  };

  useEffect(() => {
    if (authChecked && !status) {
      navigate("/login");
    }
  }, [authChecked, status, navigate]);

  if (!authChecked || !userData) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Home <span className="mx-2">/</span> My Account
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Manage My Account
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your personal information, orders, security and preferences.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-gray-100 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-lg font-semibold text-white">
                {String(userData.name).slice(0, 1).toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-900">
                  {userData.name}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {userData.email}
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              {nav.map((item) => (
                <SidebarItem
                  key={item.label}
                  icon={item.icon}
                  size={item.size}
                  label={item.label}
                  slug={item.slug}
                />
              ))}

              <button
                onClick={handleLogout}
                className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 cursor-pointer"
              >
                <LogOut size={18} />
                Logout
              </button>
            </nav>
          </aside>
          <Outlet />
          {/* Main Content */}
        </div>
      </div>
    </div>
  );
}

export function AccountOverview() {
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    name: userData.name,
    email: userData.email,
    password: "",
  });
  const dispatch = useDispatch();
  const { showToast } = useApp();
  const handleEdit = () => {
    setEdit(!edit);
    if (edit === false) return;
    if (data.name !== userData.name) {
      authService
        .updateName(data.name)
        .then((res) => {
          if (res) {
            dispatch(logIn(res));
            showToast("Account updated successfully");
            setData((prev) => ({
              ...prev,
              email: res.email,
              password: "",
            }));
          }
        })
        .catch((err) => {
          setData(() => ({
            name: userData.name,
            email: userData.email,
            password: "",
          }));
          showToast(err.message, "error");
        });
    }
    if (data.email !== userData.email) {
      authService
        .updateEmail(data)
        .then((res) => {
          if (res) {
            dispatch(logIn(res));
            showToast("Account updated successfully");
            setData((prev) => ({
              ...prev,
              email: res.email,
              password: "",
            }));
          }
        })
        .catch((err) => {
          setData(() => ({
            name: userData.name,
            email: userData.email,
            password: "",
          }));
          showToast(err.message, "error");
        });
    }
  };

  return (
    <main className="space-y-6">
      {/* Personal Information */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your personal details.
            </p>
          </div>

          <button
            onClick={handleEdit}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 cursor-pointer"
          >
            {`${edit ? "Submit" : "Edit"}`}
          </button>
        </div>

        <form className="grid gap-5 sm:grid-cols-2">
          <InputField
            label="First Name"
            type={"text"}
            readOnly={!edit}
            autoComplete="new-name"
            onChange={(e) =>
              setData((prev) => ({ ...prev, name: e.target.value }))
            }
            edit={edit}
            value={data.name}
          />
          <InputField
            label="Email Address"
            type={"email"}
            readOnly={!edit}
            autoComplete="new-email"
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
            edit={edit}
            value={data.email}
          />
          <div className={`${edit ? "visible" : "hidden"}`}>
            <InputField
              label="Enter current password"
              type={"password"}
              readOnly={!edit}
              autoComplete="current-password"
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
              edit={edit}
              value={data.password}
            />
          </div>
        </form>
      </section>

      {/* Account Summary */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Account Overview
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AccountCard
            icon={<Package />}
            title="Orders"
            value="0"
            description="Total orders placed"
            onClick={() => navigate("/account/my-orders")}
          />

          <AccountCard
            icon={<MapPin />}
            title="Addresses"
            value="0"
            description="Saved addresses"
            onClick={() => navigate("/account/addresses")}
          />
        </div>
      </section>

      {/* Security */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
              <Lock size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Password & Security
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Keep your account secure by using a strong password.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/account/security")}
            className="hidden items-center gap-1 text-sm font-medium text-gray-900 hover:underline sm:flex cursor-pointer"
          >
            Change Password
            <ChevronRight size={16} />
          </button>
        </div>

        <button
          onClick={() => navigate("/account/security")}
          className="mt-4 flex items-center gap-1 text-sm font-medium text-gray-900 hover:underline sm:hidden"
        >
          Change Password
          <ChevronRight size={16} />
        </button>
      </section>
    </main>
  );
}

export function Security() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const { showToast } = useApp();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwords.currentPassword || !passwords.newPassword) {
      return;
    }
    authService
      .updatePassword(passwords)
      .then(() => {
        showToast("Password Changed Successfully");
        setPasswords({
          currentPassword: "",
          newPassword: "",
        });
      })
      .catch(() => {
        showToast("Failed to change password", "error");
      });
  };
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="mt-2 space-y-8">
        <input type="text" hidden autoComplete="username" />
        <InputField
          label="Enter current password"
          type={"password"}
          autoComplete="current-password"
          onChange={(e) =>
            setPasswords((prev) => ({
              ...prev,
              currentPassword: e.target.value,
            }))
          }
          value={passwords.currentPassword}
        />
        <InputField
          label="Enter new password"
          type={"password"}
          autoComplete="new-password"
          onChange={(e) =>
            setPasswords((prev) => ({ ...prev, newPassword: e.target.value }))
          }
          value={passwords.newPassword}
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-brand-900 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700 cursor-pointer"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export function Order() {
  return (
    <main className="space-y-6">
      {/* Personal Information */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <EmptyState
          icon={Package}
          title="You have no past orders, Order Now"
          description="Order items you loved"
          actionLabel="Discover Products"
          actionTo="/shop"
        />
      </section>
    </main>
  );
}
export function Addresses() {
  return (
    <main className="space-y-6">
      {/* Personal Information */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <EmptyState
          icon={MapPin}
          title="No addresses added"
          description="Order now to add address"
          actionLabel="Discover Products"
          actionTo="/shop"
        />
      </section>
    </main>
  );
}
export function PaymentMethods() {
  return (
    <main className="space-y-6">
      {/* Personal Information */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <EmptyState
          icon={MapPin}
          title="No payment method is added"
          description="Order now to add payment method"
          actionLabel="Discover Products"
          actionTo="/shop"
        />
      </section>
    </main>
  );
}

/* Sidebar Item */
function SidebarItem({ icon: Icon, size, label, slug, ...props }) {
  return (
    <NavLink
      end
      to={slug}
      {...props}
      className={({ isActive }) =>
        `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition cursor-pointer outline-none ${
          isActive
            ? "bg-gray-900 text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`
      }
    >
      {<Icon size={size} />}
      {label}
    </NavLink>
  );
}

/* Input */
function InputField({ label, value, type, edit = true, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <input
        type={type}
        value={value}
        {...props}
        className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none ${
          edit
            ? "border-brand-400 focus:border-brand-400"
            : "border-gray-200 bg-gray-50"
        }`}
      />
    </div>
  );
}

/* Account Card */
function AccountCard({ icon, title, value, description, ...prop }) {
  return (
    <div
      {...prop}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
          {icon}
        </div>

        <span className="text-2xl font-bold text-gray-900">{value}</span>
      </div>

      <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>

      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}
