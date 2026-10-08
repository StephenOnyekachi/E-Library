
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminHeader({ onMenuClick, admin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            Admin Dashboard
          </h2>

          <p className="hidden text-sm text-gray-500 sm:block">
            Manage your E-Library
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Admin Profile */}
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            {admin?.username?.charAt(0).toUpperCase() || "A"}
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-900">
              {admin?.username || "Admin"}
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>

        {/* View Website */}
        <button
          onClick={() => navigate("/")}
          className="hidden rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:block"
        >
          View Website
        </button>

        {/* Mobile Logout */}
        <button
          onClick={handleLogout}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 sm:hidden"
          aria-label="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
