
import {
  ArrowLeft,
  BookOpen,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Please enter your username and password.");
      return;
    }

    // Temporary frontend admin authentication.
    // Django will handle real admin authentication later.
    localStorage.setItem(
      "adminUser",
      JSON.stringify({
        username: formData.username,
      })
    );

    navigate("/admin/dashboard");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Section */}
        <div className="hidden bg-gray-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
            >
              <BookOpen size={28} />
              E-Library
            </Link>
          </div>

          <div className="max-w-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600">
              <ShieldCheck
                size={30}
                className="text-white"
              />
            </div>

            <span className="mt-6 inline-block text-sm font-semibold uppercase tracking-wider text-blue-400">
              Administration
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white xl:text-5xl">
              Manage your digital library from one place.
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-400">
              Access your administration dashboard to manage books, users,
              categories, and other library resources.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 E-Library. Admin Portal.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 lg:hidden">
              <Link
                to="/"
                className="flex items-center gap-2 text-xl font-bold text-gray-900"
              >
                <BookOpen
                  size={27}
                  className="text-blue-600"
                />
                E-Library
              </Link>
            </div>

            {/* Back */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
            >
              <ArrowLeft size={17} />
              Back to Library
            </Link>

            {/* Heading */}
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <ShieldCheck
                  size={25}
                  className="text-blue-600"
                />
              </div>

              <h2 className="text-3xl font-bold text-gray-900">
                Admin Login
              </h2>

              <p className="mt-2 text-gray-500">
                Sign in to access the E-Library administration panel.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Username
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter admin username"
                    autoComplete="username"
                    className="w-full rounded-lg border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter admin password"
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-gray-200 bg-white py-3.5 pl-11 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Login */}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Sign In to Admin
              </button>
            </form>

            {/* Security Notice */}
            <div className="mt-8 flex items-start gap-3 rounded-lg bg-blue-50 p-4">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <p className="text-sm leading-6 text-blue-700">
                This is currently a frontend-only admin login. Real admin
                authentication and permissions will be handled securely by
                Django later.
              </p>
            </div>

            {/* User Login */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Are you a regular user?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                User Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminLogin;
