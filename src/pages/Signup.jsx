
import {
  ArrowLeft,
  BookOpen,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
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

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!formData.terms) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }

    // Temporary frontend registration.
    // This will be replaced by Django authentication later.
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        username: formData.username,
        email: formData.email,
      })
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        username: formData.username,
        email: formData.email,
      })
    );

    alert("Account created successfully!");

    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Section */}
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
              Join E-Library
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white xl:text-5xl">
              Start your journey of learning and discovery.
            </h1>

            <p className="mt-6 text-lg leading-8 text-blue-100">
              Create your account and get access to your personal digital
              library, books, and reading progress.
            </p>
          </div>

          <p className="text-sm text-blue-100">
            © 2026 E-Library. All rights reserved.
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

            {/* Back Link */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
            >
              <ArrowLeft size={17} />
              Back to Library
            </Link>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Create an account
              </h2>

              <p className="mt-2 text-gray-500">
                Sign up to start using your E-Library account.
              </p>
            </div>

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
                    placeholder="Choose a username"
                    autoComplete="username"
                    className="w-full rounded-lg border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    autoComplete="email"
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
                    placeholder="Create a password"
                    autoComplete="new-password"
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

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-gray-200 bg-white py-3.5 pl-11 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <span>
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Terms and Conditions will be added later."
                      )
                    }
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Terms and Conditions
                  </button>{" "}
                  and Privacy Policy.
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                <Check size={18} />
                Create Account
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Sign in
              </Link>
            </p>

            {/* Backend Notice */}
            <div className="mt-8 rounded-lg bg-blue-50 p-4">
              <p className="text-center text-xs leading-5 text-blue-700">
                Account registration will be connected to Django's secure
                authentication system when the backend is added.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
