import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiSettings, FiShoppingBag, FiUser, FiLogOut } from "react-icons/fi";

export default function AccountLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (!u) navigate("/login");
      setUser(u);
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="bg-white border rounded-xl overflow-hidden">
            <NavItem to="/account" icon={<FiSettings />} label="Dashboard" end />
            <NavItem to="/account/orders" icon={<FiShoppingBag />} label="Orders" />
            <NavItem to="/account/profile" icon={<FiUser />} label="Profile Edit" />
            <button
              onClick={logout}
              className="w-full text-left px-4 py-3 border-t hover:bg-gray-50 flex items-center gap-2 text-red-600"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </aside>

        {/* Content */}
        <section className="md:col-span-2">
          <Outlet context={{ user, setUser }} />
        </section>
      </div>
    </div>
  );
}

function NavItem({ to, icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `px-4 py-3 flex items-center gap-2 border-b ${
          isActive ? "bg-primary-700 text-white" : "hover:bg-gray-50"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
