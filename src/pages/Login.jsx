
import {
  ArrowLeft,
  BookOpen,
  Eye,
  EyeOff,
  Lock,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Please enter your username and password.");
      return;
    }

    // Temporary frontend login.
    // Django authentication will replace this later.
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        username: formData.username,
      })
    );

    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden bg-blue-600 lg:flex lg:flex-col lg:justify-between lg:p-12">
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
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-100">
              Welcome Back
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white xl:text-5xl">
              Continue your journey of learning and discovery.
            </h1>

            <p className="mt-6 text-lg leading-8 text-blue-100">
              Access your books, continue reading, and discover new knowledge
              from your personal digital library.
            </p>
          </div>

          <p className="text-sm text-blue-100">
            © 2026 E-Library. All rights reserved.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-10 lg:hidden">
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

            {/* Back Home */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
            >
              <ArrowLeft size={17} />
              Back to Library
            </Link>

            {/* Heading */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome back
              </h2>

              <p className="mt-2 text-gray-500">
                Sign in to access your E-Library account.
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
                    placeholder="Enter your username"
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
                    placeholder="Enter your password"
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

              {/* Remember + Forgot Password */}
              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />

                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Password reset will be connected to the Django backend later."
                    )
                  }
                  className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Sign In
              </button>
            </form>

            {/* Signup */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Create an account
              </Link>
            </p>

            {/* Security Note */}
            <div className="mt-8 rounded-lg bg-blue-50 p-4">
              <p className="text-center text-xs leading-5 text-blue-700">
                Your account will use Django's secure authentication system
                when the backend is connected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
