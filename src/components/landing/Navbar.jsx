
import {
  BookMarked,
  BookOpen,
  Menu,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) {
      navigate("/books");
      closeMenu();
      return;
    }

    navigate(`/books?search=${encodeURIComponent(query)}`);
    closeMenu();
  };

  return (
    <header className="fixed left-0 top-0 z-[9999] w-full bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 text-xl font-bold text-gray-900"
        >
          <BookOpen
            size={27}
            className="text-blue-600"
          />

          <span>E-Library</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/books"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Books
          </Link>

          <a
            href="/#categories"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Categories
          </a>

          <a
            href="/#about"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            About
          </a>

          <Link
            to="/my-library"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            <BookMarked size={16} />
            My Library
          </Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="relative"
          >
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books..."
              className="w-44 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </form>

          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white shadow-lg lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
              >
                Home
              </Link>

              <Link
                to="/books"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
              >
                Books
              </Link>

              <a
                href="/#categories"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
              >
                Categories
              </a>

              <a
                href="/#about"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
              >
                About
              </a>

              <Link
                to="/my-library"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
              >
                <BookMarked size={17} />
                My Library
              </Link>
            </div>

            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="relative mt-4"
            >
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search books..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </form>

            {/* Mobile Auth */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="rounded-lg border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={closeMenu}
                className="rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
