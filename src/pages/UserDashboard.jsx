
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Clock3,
  LogOut,
  Mail,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBooks } from "../data/bookStorage";

const TOTAL_CHAPTERS = 6;

function UserDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [purchasedIds, setPurchasedIds] = useState([]);
  const [books, setBooks] = useState([]);
  const [readingProgress, setReadingProgress] = useState({});
  const [completedBooks, setCompletedBooks] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    const purchasedBooks = JSON.parse(
      localStorage.getItem("purchasedBooks") || "[]"
    );

    const savedProgress = JSON.parse(
      localStorage.getItem("readingProgress") || "{}"
    );

    const savedCompletedBooks = JSON.parse(
      localStorage.getItem("completedBooks") || "[]"
    );

    setUser(currentUser);
    setPurchasedIds(purchasedBooks.map(Number));
    setReadingProgress(savedProgress);
    setCompletedBooks(savedCompletedBooks.map(Number));
    setBooks(getBooks());
  }, []);

  const myBooks = useMemo(() => {
    return books.filter((book) =>
      purchasedIds.includes(Number(book.id))
    );
  }, [books, purchasedIds]);

  const getBookProgress = (bookId) => {
    const id = Number(bookId);

    if (completedBooks.includes(id)) {
      return 100;
    }

    const chapter = Number(readingProgress[id] || 1);

    return Math.round(
      ((chapter - 1) / TOTAL_CHAPTERS) * 100
    );
  };

  const readingBooks = useMemo(() => {
    return myBooks
      .filter((book) => getBookProgress(book.id) < 100)
      .slice(0, 3);
  }, [myBooks, readingProgress, completedBooks]);

  const completedBookList = useMemo(() => {
    return myBooks.filter((book) =>
      completedBooks.includes(Number(book.id))
    );
  }, [myBooks, completedBooks]);

  const recentlyPurchased = useMemo(() => {
    return [...myBooks].reverse().slice(0, 4);
  }, [myBooks]);

  const completedCount = completedBookList.length;

  const averageProgress =
    myBooks.length > 0
      ? Math.round(
          myBooks.reduce(
            (total, book) => total + getBookProgress(book.id),
            0
          ) / myBooks.length
        )
      : 0;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <BookOpen
            size={50}
            className="mx-auto mb-4 text-blue-600"
          />

          <h1 className="text-2xl font-bold text-gray-900">
            Login Required
          </h1>

          <p className="mt-2 text-gray-500">
            Please login to access your dashboard.
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
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900"
          >
            <BookOpen
              size={26}
              className="text-blue-600"
            />

            E-Library
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 sm:block"
            >
              Home
            </Link>

            <Link
              to="/books"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 sm:block"
            >
              Browse Books
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">
                Logout
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">
                Welcome back
              </p>

              <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                {user.name || user.username || "Reader"}
              </h1>

              <p className="mt-2 max-w-xl text-blue-100">
                Continue your reading journey and explore
                your personal library.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/books"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Browse Books
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/my-library"
                className="inline-flex items-center gap-2 rounded-lg border border-blue-400 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                My Library
                <BookMarked size={17} />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              Purchased Books
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <Clock3 size={22} />
              </div>

              <span className="text-2xl font-bold text-gray-900">
                {readingBooks.length}
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-gray-500">
              Currently Reading
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 size={22} />
              </div>

              <span className="text-2xl font-bold text-gray-900">
                {completedCount}
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-gray-500">
              Completed
            </p>
          </div>

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
              Reading Progress
            </p>
          </div>
        </div>

        {/* Continue Reading */}
        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Continue Reading
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Pick up where you left off.
              </p>
            </div>

            <Link
              to="/my-library"
              className="hidden items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex"
            >
              View Library
              <ArrowRight size={16} />
            </Link>
          </div>

          {readingBooks.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {readingBooks.map((book) => {
                const progress = getBookProgress(book.id);

                return (
                  <div
                    key={book.id}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm"
                  >
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        {book.category}
                      </p>

                      <h3 className="mt-2 line-clamp-2 text-lg font-bold text-gray-900">
                        {book.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        By {book.author}
                      </p>

                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-xs font-medium">
                          <span className="text-gray-500">
                            Progress
                          </span>

                          <span className="text-gray-900">
                            {progress}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-blue-600 transition-all"
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      <Link
                        to={`/book/${book.id}/read`}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Continue Reading
                        <ArrowRight size={17} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <BookOpen
                size={44}
                className="mx-auto mb-4 text-gray-300"
              />

              <h3 className="text-xl font-bold text-gray-900">
                Nothing to continue
              </h3>

              <p className="mt-2 text-gray-500">
                Purchase a book and start reading to see it
                here.
              </p>

              <Link
                to="/books"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Browse Books
                <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </section>

        {/* Completed Books */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Completed Books
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Books you've finished reading.
              </p>
            </div>

            {completedBookList.length > 0 && (
              <Link
                to="/my-library"
                className="hidden items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex"
              >
                View Library
                <ArrowRight size={16} />
              </Link>
            )}
          </div>

          {completedBookList.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {completedBookList.slice(0, 3).map((book) => (
                <div
                  key={book.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <div className="absolute right-3 top-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                        <CheckCircle2 size={14} />
                        Completed
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
                      {book.category}
                    </p>

                    <h3 className="mt-2 line-clamp-2 text-lg font-bold text-gray-900">
                      {book.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      By {book.author}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-sm font-semibold text-green-600">
                        100% Complete
                      </span>

                      <Link
                        to={`/book/${book.id}/read`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Read Again
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <CheckCircle2
                size={44}
                className="mx-auto mb-4 text-gray-300"
              />

              <h3 className="text-xl font-bold text-gray-900">
                No completed books yet
              </h3>

              <p className="mt-2 text-gray-500">
                Finish reading a book and it will appear here.
              </p>
            </div>
          )}
        </section>

        {/* Recently Purchased */}
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recently Purchased
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest books.
              </p>
            </div>

            <Link
              to="/my-library"
              className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              My Library
              <ArrowRight size={16} />
            </Link>
          </div>

          {recentlyPurchased.length > 0 ? (
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="divide-y divide-gray-100">
                {recentlyPurchased.map((book) => (
                  <div
                    key={book.id}
                    className="flex items-center gap-4 p-4 sm:p-5"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-16 w-12 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-gray-900">
                        {book.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {book.author}
                      </p>
                    </div>

                    <Link
                      to={`/book/${book.id}/read`}
                      className="hidden items-center gap-1 text-sm font-semibold text-blue-600 sm:flex"
                    >
                      Read
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <BookMarked
                size={44}
                className="mx-auto mb-4 text-gray-300"
              />

              <h3 className="text-xl font-bold text-gray-900">
                No purchases yet
              </h3>

              <p className="mt-2 text-gray-500">
                Browse the library and purchase your first
                book.
              </p>
            </div>
          )}
        </section>

        {/* Bottom Grid */}
        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Profile */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <User size={26} />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-gray-900">
                  {user.name || user.username || "Reader"}
                </h2>

                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                  <Mail size={15} />

                  <span className="truncate">
                    {user.email || "No email provided"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-5">
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </div>

          {/* Quick Access */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Quick Access
            </h2>

            <div className="mt-4 space-y-3">
              <Link
                to="/my-library"
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <BookMarked size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      My Library
                    </p>

                    <p className="text-sm text-gray-500">
                      View your purchased books
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={18}
                  className="text-gray-400"
                />
              </Link>

              <Link
                to="/books"
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <BookOpen size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Browse Books
                    </p>

                    <p className="text-sm text-gray-500">
                      Explore the collection
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={18}
                  className="text-gray-400"
                />
              </Link>

              <Link
                to="/"
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    <ArrowRight size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Home
                    </p>

                    <p className="text-sm text-gray-500">
                      Return to the homepage
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={18}
                  className="text-gray-400"
                />
              </Link>
            </div>
          </div>

          {/* Reading Progress */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Reading Progress
            </h2>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Overall Progress
                </span>

                <span className="text-lg font-bold text-blue-600">
                  {averageProgress}%
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${averageProgress}%`,
                  }}
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {myBooks.length}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Total Books
                  </p>
                </div>

                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-2xl font-bold text-green-600">
                    {completedCount}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default UserDashboard;
