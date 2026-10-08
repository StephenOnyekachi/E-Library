
import {
  Bell,
  BookOpen,
  Check,
  Mail,
  Phone,
  RotateCcw,
  Save,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";

import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";

const DEFAULT_SETTINGS = {
  libraryName: "E-Library",
  email: "admin@elibrary.com",
  phone: "+234 800 000 0000",
  currency: "NGN",
  emailNotifications: true,
  purchaseNotifications: true,
};

function AdminSettings() {
  const [admin, setAdmin] = useState({ username: "Admin" });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedAdmin = JSON.parse(
      localStorage.getItem("adminUser") || "null"
    );

    if (savedAdmin) {
      setAdmin(savedAdmin);
    }

    const savedSettings = JSON.parse(
      localStorage.getItem("librarySettings") || "null"
    );

    if (savedSettings) {
      setSettings({
        ...DEFAULT_SETTINGS,
        ...savedSettings,
      });
    }
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "librarySettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all settings to their default values?"
    );

    if (!confirmed) {
      return;
    }

    setSettings(DEFAULT_SETTINGS);

    localStorage.setItem(
      "librarySettings",
      JSON.stringify(DEFAULT_SETTINGS)
    );

    setSaved(false);
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
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Settings size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Settings
                </h1>

                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                  Manage your E-Library settings and preferences.
                </p>
              </div>
            </div>
          </section>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Library Information */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <BookOpen size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      Library Information
                    </h2>

                    <p className="text-sm text-gray-500">
                      Basic information about your digital library.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label
                    htmlFor="libraryName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Library Name
                  </label>

                  <input
                    id="libraryName"
                    name="libraryName"
                    type="text"
                    value={settings.libraryName}
                    onChange={handleChange}
                    placeholder="Enter library name"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Contact Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={settings.email}
                      onChange={handleChange}
                      placeholder="admin@elibrary.com"
                      className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Contact Phone
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={settings.phone}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="currency"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Currency
                  </label>

                  <select
                    id="currency"
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="NGN">
                      Nigerian Naira (₦)
                    </option>
                    <option value="USD">
                      US Dollar ($)
                    </option>
                    <option value="GBP">
                      British Pound (£)
                    </option>
                    <option value="EUR">
                      Euro (€)
                    </option>
                  </select>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                    <Bell size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      Notifications
                    </h2>

                    <p className="text-sm text-gray-500">
                      Choose which notifications you want to receive.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <label className="flex cursor-pointer items-start justify-between gap-5 rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">
                      Email Notifications
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Receive important library updates by email.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>

                <label className="flex cursor-pointer items-start justify-between gap-5 rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">
                      Purchase Notifications
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Get notified when a user purchases a book.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="purchaseNotifications"
                    checked={settings.purchaseNotifications}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>
            </section>

            {/* Actions */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <RotateCcw size={17} />
                  Reset Settings
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  {saved ? (
                    <>
                      <Check size={18} />
                      Settings Saved
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Settings
                    </>
                  )}
                </button>
              </div>
            </section>
          </form>
        </main>
      </div>
    </div>
  );
}

export default AdminSettings;
