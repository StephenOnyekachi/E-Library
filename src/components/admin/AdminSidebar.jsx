
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const handleComingSoon = (message) => {
    alert(message);
  };

  const isActive = (path) => location.pathname === path;

  const baseClasses =
    "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition";

  const activeClasses = "bg-blue-600 text-white hover:bg-blue-700";

  const inactiveClasses =
    "text-gray-300 hover:bg-gray-800 hover:text-white";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-gray-950 text-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-gray-800 px-6">
          <div>
            <h1 className="text-xl font-bold">E-Library</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {/* Dashboard */}
          <button
            onClick={() => navigate("/admin/dashboard")}
            className={`${baseClasses} ${
              isActive("/admin/dashboard")
                ? activeClasses
                : inactiveClasses
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          {/* Books */}
          <button
            onClick={() => navigate("/admin/books")}
            className={`${baseClasses} ${
              isActive("/admin/books")
                ? activeClasses
                : inactiveClasses
            }`}
          >
            <BookOpen size={20} />
            Books
          </button>

          {/* Users */}
          <button
            onClick={() => navigate("/admin/users")}
            className={`${baseClasses} ${
              isActive("/admin/users")
                ? activeClasses
                : inactiveClasses
            }`}
          >
            <Users size={20} />
            Users
          </button>

          {/* Sales */}
          <button
            onClick={() => navigate("/admin/sales")}
            className={`${baseClasses} ${
              isActive("/admin/sales")
                ? activeClasses
                : inactiveClasses
            }`}
          >
            <ShoppingBag size={20} />
            Sales
          </button>

          {/* Settings */}
          <button
            onClick={() => navigate("/admin/settings")}
            className={`${baseClasses} ${
              isActive("/admin/settings")
                ? activeClasses
                : inactiveClasses
            }`}
          >
            <Settings size={20} />
            Settings
          </button>
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-800 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
