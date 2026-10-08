
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Clock3,
  Library,
  LogOut,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBooks } from "../data/bookStorage";

const TOTAL_CHAPTERS = 6;

function MyLibrary() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [purchasedIds, setPurchasedIds] = useState([]);
  const [readingProgress, setReadingProgress] = useState({});
  const [completedBooks, setCompletedBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    const purchased = JSON.parse(
      localStorage.getItem("purchasedBooks") || "[]"
    );

    const progress = JSON.parse(
      localStorage.getItem("readingProgress") || "{}"
    );

    const completed = JSON.parse(
      localStorage.getItem("completedBooks") || "[]"
    );

    setUser(currentUser);
    setPurchasedIds(purchased.map(Number));
    setReadingProgress(progress);
    setCompletedBooks(completed.map(Number));
    setBooks(getBooks());
  }, []);

  const myBooks = useMemo(() => {
    return books.filter((book) =>
      purchasedIds.includes(Number(book.id))
    );
  }, [books, purchasedIds]);

  const getProgress = (bookId) => {
    const id = Number(bookId);

    if (completedBooks.includes(id)) {
      return 100;
    }

    const chapter = Number(readingProgress[id] || 1);

    return Math.round(
      ((chapter - 1) / TOTAL_CHAPTERS) * 100
    );
  };

  const completedBookList = useMemo(() => {
    return myBooks.filter((book) =>
      completedBooks.includes(Number(book.id))
    );
  }, [myBooks, completedBooks]);

  const readingBookList = useMemo(() => {
    return myBooks.filter(
      (book) => getProgress(book.id) < 100
    );
  }, [myBooks, readingProgress, completedBooks]);

  const averageProgress = useMemo(() => {
    if (myBooks.length === 0) {
      return 0;
    }

    const total = myBooks.reduce(
      (sum, book) => sum + getProgress(book.id),
      0
    );

    return Math.round(total / myBooks.length);
  }, [myBooks, readingProgress, completedBooks]);

  const filteredBooks = useMemo(() => {
    return myBooks.filter((book) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query);

      const progress = getProgress(book.id);

      const matchesFilter =
        filter === "all" ||
        (filter === "reading" && progress < 100) ||
        (filter === "completed" && progress === 100);

      return matchesSearch && matchesFilter;
    });
  }, [
    myBooks,
    search,
    filter,
    readingProgress,
    completedBooks,
  ]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <BookMarked
            size={50}
            className="mx-auto mb-4 text-blue-600"
          />

          <h1 className="text-2xl font-bold text-gray-900">
            Login Required
          </h1>

          <p className="mt-2 text-gray-500">
            Please login to access your library.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xl font-bold text-gray-900"
          >
            <BookOpen
              size={27}
              className="text-blue-600"
            />

            E-Library
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/dashboard"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 sm:block"
            >
              Dashboard
            </Link>

            <Link
              to="/books"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 md:block"
            >
              Browse Books
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 sm:px-4"
            >
              <LogOut size={16} />

              <span className="hidden sm:inline">
                Logout
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Library size={25} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Your Collection
              </p>

              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                My Library
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-gray-500">
            Manage your purchased books, continue reading,
            and keep track of your reading progress.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Books */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BookMarked size={22} />
              </div>

              <span className="text-2xl font-bold text-gray-900">
                {myBooks.length}
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-gray-500">
              Total Books
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Books in your library
            </p>
          </div>

          {/* Reading */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <Clock3 size={22} />
              </div>

              <span className="text-2xl font-bold text-gray-900">
                {readingBookList.length}
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-gray-500">
              Currently Reading
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Books still in progress
            </p>
          </div>

          {/* Completed */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 size={22} />
              </div>

              <span className="text-2xl font-bold text-gray-900">
                {completedBookList.length}
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-gray-500">
              Completed
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Books you've finished
            </p>
          </div>

          {/* Overall Progress */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <BookOpen size={22} />
              </div>

              <span className="text-2xl font-bold text-gray-900">
                {averageProgress}%
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-gray-500">
              Overall Progress
            </p>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-purple-600 transition-all duration-500"
                style={{
                  width: `${averageProgress}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search your library..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              {
                value: "all",
                label: "All Books",
              },
              {
                value: "reading",
                label: "Reading",
              },
              {
                value: "completed",
                label: "Completed",
              },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  filter === item.value
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {myBooks.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredBooks.length}
              </span>{" "}
              {filteredBooks.length === 1
                ? "book"
                : "books"}
            </p>

            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Empty Library */}
        {myBooks.length === 0 && (
          <div className="mt-8 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <BookMarked
              size={54}
              className="mx-auto mb-5 text-gray-300"
            />

            <h2 className="text-2xl font-bold text-gray-900">
              Your library is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              You haven't purchased any books yet. Browse
              our collection and start building your library.
            </p>

            <Link
              to="/books"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Books
              <ArrowRight size={18} />
            </Link>
          </div>
        )}

        {/* No Search Results */}
        {myBooks.length > 0 && filteredBooks.length === 0 && (
          <div className="mt-8 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <Search
              size={48}
              className="mx-auto mb-4 text-gray-300"
            />

            <h2 className="text-xl font-bold text-gray-900">
              No books found
            </h2>

            <p className="mt-2 text-gray-500">
              Try changing your search or filter.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Book Grid */}
        {filteredBooks.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => {
              const progress = getProgress(book.id);
              const isCompleted = progress === 100;

              return (
                <article
                  key={book.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <div className="absolute left-3 top-3">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                          <CheckCircle2 size={14} />
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                          <Clock3 size={14} />
                          Reading
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      {book.category}
                    </p>

                    <h2 className="mt-2 line-clamp-2 text-lg font-bold text-gray-900">
                      {book.title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      By {book.author}
                    </p>

                    {/* Progress */}
                    <div className="mt-5">
                      <div className="mb-2 flex items-center justify-between text-xs font-medium">
                        <span className="text-gray-500">
                          Reading Progress
                        </span>

                        <span
                          className={
                            isCompleted
                              ? "font-semibold text-green-600"
                              : "font-semibold text-blue-600"
                          }
                        >
                          {progress}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCompleted
                              ? "bg-green-500"
                              : "bg-blue-600"
                          }`}
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Reading Button */}
                    <Link
                      to={`/book/${book.id}/read`}
                      className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition ${
                        isCompleted
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {isCompleted
                        ? "Read Again"
                        : "Continue Reading"}

                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Information */}
        {myBooks.length > 0 && (
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* Progress Overview */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <BookOpen size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Reading Overview
                  </h2>

                  <p className="text-sm text-gray-500">
                    Your overall library progress
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Overall Progress
                  </span>

                  <span className="text-lg font-bold text-purple-600">
                    {averageProgress}%
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-purple-600 transition-all duration-500"
                    style={{
                      width: `${averageProgress}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BookMarked size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Discover More
                  </h2>

                  <p className="text-sm text-gray-500">
                    Find your next book
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-gray-500">
                Explore our collection and discover books
                across technology, education, science,
                self-development, and more.
              </p>

              <Link
                to="/books"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Browse Books
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default MyLibrary;
