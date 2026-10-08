
import {
  Mail,
  Search,
  ShieldCheck,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminStatCard from "../components/admin/AdminStatCard";

function AdminUsers() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({ username: "Admin" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedAdmin = JSON.parse(
      localStorage.getItem("adminUser") || "null"
    );

    if (savedAdmin) {
      setAdmin(savedAdmin);
    }

    const registeredUser = JSON.parse(
      localStorage.getItem("registeredUser") || "null"
    );

    if (registeredUser) {
      setUsers([
        {
          id: 1,
          username: registeredUser.username || "User",
          email: registeredUser.email || "No email",
          role: "User",
          status: "Active",
        },
      ]);
    }
  }, []);

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return users;
    }

    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
    );
  }, [users, search]);

  const handleDelete = (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this user?"
    );

    if (!confirmed) {
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userId)
    );

    localStorage.removeItem("registeredUser");
    localStorage.removeItem("currentUser");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:ml-64">
        <AdminHeader
          onMenuClick={() => setSidebarOpen(true)}
          admin={admin}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <section className="mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Users
              </h1>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Manage registered users and monitor account activity.
              </p>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <AdminStatCard
              title="Total Users"
              value={users.length}
              icon={Users}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
            />

            <AdminStatCard
              title="Active Users"
              value={
                users.filter((user) => user.status === "Active").length
              }
              icon={User}
              iconBg="bg-green-50"
              iconColor="text-green-600"
            />

            <AdminStatCard
              title="Administrators"
              value="1"
              icon={ShieldCheck}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
            />
          </section>

          {/* Users Table */}
          <section className="rounded-2xl bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Registered Users
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Users currently registered on the platform.
                  </p>
                </div>

                <div className="relative w-full sm:max-w-xs">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search users..."
                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            {filteredUsers.length > 0 ? (
              <>
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50 text-left">
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          User
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Email
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Role
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Status
                        </th>

                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                {user.username
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div>
                                <p className="font-semibold text-gray-900">
                                  {user.username}
                                </p>

                                <p className="text-xs text-gray-500">
                                  User ID #{user.id}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail size={16} />
                              {user.email}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
                              {user.role}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                              {user.status}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDelete(user.id)}
                              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="space-y-4 p-4 md:hidden">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="rounded-xl border border-gray-100 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                            {user.username
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900">
                              {user.username}
                            </p>

                            <p className="text-xs text-gray-500">
                              User ID #{user.id}
                            </p>
                          </div>
                        </div>

                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                          {user.status}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                        <Mail size={16} />
                        <span className="break-all">
                          {user.email}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
                          {user.role}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleDelete(user.id)}
                          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <Users size={30} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  No users found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {search
                    ? "Try a different search term."
                    : "No users have registered yet."}
                </p>
              </div>
            )}
          </section>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              ← Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminUsers;
