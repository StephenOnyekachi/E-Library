
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold"
            >
              <BookOpen
                size={28}
                className="text-blue-500"
              />

              <span>E-Library</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Your digital gateway to knowledge. Discover books, explore
              new ideas, and enjoy a simple reading experience from
              anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <Link
                  to="/"
                  className="transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/books"
                  className="transition hover:text-white"
                >
                  Browse Books
                </Link>
              </li>

              <li>
                <a
                  href="/#categories"
                  className="transition hover:text-white"
                >
                  Categories
                </a>
              </li>

              <li>
                <a
                  href="/#about"
                  className="transition hover:text-white"
                >
                  About Us
                </a>
              </li>

              <li>
                <Link
                  to="/my-library"
                  className="transition hover:text-white"
                >
                  My Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold">
              Your Account
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <Link
                  to="/login"
                  className="transition hover:text-white"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="transition hover:text-white"
                >
                  Create Account
                </Link>
              </li>

              <li>
                <Link
                  to="/my-library"
                  className="transition hover:text-white"
                >
                  My Library
                </Link>
              </li>

              <li>
                <Link
                  to="/books"
                  className="transition hover:text-white"
                >
                  Discover Books
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4 text-sm text-slate-400">

              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <p>
                  E-Library
                  <br />
                  Nigeria
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="shrink-0 text-blue-500"
                />

                <a
                  href="tel:+2340000000000"
                  className="transition hover:text-white"
                >
                  +234 000 000 0000
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-blue-500"
                />

                <a
                  href="mailto:info@elibrary.com"
                  className="transition hover:text-white"
                >
                  info@elibrary.com
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <p>
            © 2026 E-Library. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
