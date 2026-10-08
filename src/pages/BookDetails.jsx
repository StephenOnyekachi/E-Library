
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronRight,
  CreditCard,
  Lock,
  Unlock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import { getBooks } from "../data/bookStorage";

function BookDetails() {
  const { id } = useParams();

  const [books, setBooks] = useState([]);
  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    setBooks(getBooks());

    const purchasedBooks = JSON.parse(
      localStorage.getItem("purchasedBooks") || "[]"
    );

    const purchased = purchasedBooks.some((purchasedBook) => {
      const purchasedId =
        typeof purchasedBook === "object"
          ? purchasedBook.id
          : purchasedBook;

      return Number(purchasedId) === Number(id);
    });

    setHasPurchased(purchased);
  }, [id]);

  const book = books.find(
    (item) => Number(item.id) === Number(id)
  );

  if (!book) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex min-h-screen items-center justify-center px-4 pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Book Not Found
            </h1>

            <p className="mt-2 text-gray-500">
              The book you are looking for does not exist.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <ArrowLeft size={18} />
              Back to Library
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const chapters = Array.isArray(book.chapters)
    ? book.chapters
    : [];

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          {/* Back Button */}
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Library
          </Link>

          {/* Book Details */}
          <div className="grid overflow-hidden rounded-3xl bg-white shadow-sm lg:grid-cols-2">

            {/* Book Image */}
            <div className="flex min-h-[450px] items-center justify-center bg-gray-100 p-8">
              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className="max-h-[500px] w-full max-w-md rounded-2xl object-cover shadow-lg"
                />
              ) : (
                <div className="flex h-96 w-72 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <span className="text-7xl font-bold">
                    {book.title?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Information */}
            <div className="flex flex-col justify-center p-6 sm:p-10">

              {/* Category */}
              <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {book.category}
              </span>

              {/* Title */}
              <h1 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                {book.title}
              </h1>

              {/* Author */}
              <p className="mt-3 text-base text-gray-500">
                Written by{" "}
                <span className="font-medium text-gray-700">
                  {book.author}
                </span>
              </p>

              {/* Price */}
              <div className="mt-6">
                <p className="text-3xl font-bold text-blue-600">
                  ₦{Number(book.price || 0).toLocaleString()}
                </p>
              </div>

              {/* Description */}
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-900">
                  About This Book
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  {book.description ||
                    "Explore this book and discover valuable knowledge, ideas, and insights."}
                </p>
              </div>

              {/* Chapter Count */}
              <div className="mt-6 flex items-center gap-2">
                <BookOpen
                  size={18}
                  className="text-blue-600"
                />

                <span className="text-sm font-medium text-gray-700">
                  {chapters.length > 0
                    ? `${chapters.length} ${
                        chapters.length === 1
                          ? "Chapter"
                          : "Chapters"
                      }`
                    : "No chapters uploaded yet"}
                </span>
              </div>

              {/* Purchase Status */}
              {hasPurchased ? (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3">
                  <Unlock
                    size={18}
                    className="text-green-600"
                  />

                  <span className="text-sm font-semibold text-green-700">
                    You own this book — All chapters unlocked
                  </span>
                </div>
              ) : (
                <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3">
                  <p className="text-sm leading-6 text-blue-700">
                    <strong>Free preview:</strong> Chapter 1 is
                    available to read for free. Purchase this book
                    to unlock all remaining chapters.
                  </p>
                </div>
              )}

              {/* Availability */}
              <div className="mt-6 flex items-center gap-2">
                <CheckCircle
                  size={18}
                  className={
                    book.available === false
                      ? "text-red-500"
                      : "text-green-500"
                  }
                />

                <span
                  className={`text-sm font-medium ${
                    book.available === false
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {book.available === false
                    ? "Currently unavailable"
                    : "Available for purchase"}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                {/* Buy */}
                {book.available === false ? (
                  <button
                    disabled
                    className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-200 px-5 py-3.5 text-sm font-semibold text-gray-500"
                  >
                    <CreditCard size={18} />
                    Currently Unavailable
                  </button>
                ) : hasPurchased ? (
                  <Link
                    to={`/book/${book.id}/read`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    <Unlock size={18} />
                    Read Full Book
                  </Link>
                ) : (
                  <Link
                    to={`/book/${book.id}/payment`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <CreditCard size={18} />
                    Buy Book
                  </Link>
                )}

                {/* Read */}
                <Link
                  to={`/book/${book.id}/read`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <BookOpen size={18} />
                  Read Book
                </Link>

              </div>
            </div>
          </div>

          {/* Chapters Section */}
          <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8">

            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Book Chapters
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Read the first chapter for free or unlock the
                  complete book.
                </p>
              </div>

              <span className="w-fit rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                {chapters.length}{" "}
                {chapters.length === 1
                  ? "Chapter"
                  : "Chapters"}
              </span>
            </div>

            {/* No Chapters */}
            {chapters.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-gray-200 py-12 text-center">
                <BookOpen
                  size={40}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-4 text-sm font-medium text-gray-500">
                  No chapters have been uploaded yet.
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  The administrator will add the book content soon.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {chapters.map((chapter, index) => {
                  const chapterNumber =
                    index + 1;

                  const isFree = chapterNumber === 1;
                  const isUnlocked =
                    isFree || hasPurchased;

                  return (
                    <div
                      key={chapter.id || index}
                      className={`flex flex-col gap-4 rounded-2xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${
                        isUnlocked
                          ? "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/30"
                          : "border-gray-100 bg-gray-50"
                      }`}
                    >
                      {/* Chapter Info */}
                      <div className="flex min-w-0 items-center gap-4">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                            isUnlocked
                              ? "bg-blue-50 text-blue-600"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {chapterNumber}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-gray-900">
                            {chapter.title ||
                              `Chapter ${chapterNumber}`}
                          </h3>

                          <div className="mt-1 flex items-center gap-2">
                            {isFree ? (
                              <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-600">
                                FREE
                              </span>
                            ) : hasPurchased ? (
                              <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-600">
                                UNLOCKED
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500">
                                <Lock size={10} />
                                LOCKED
                              </span>
                            )}

                            {chapter.pdfName && (
                              <span className="text-xs text-gray-400">
                                PDF
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Chapter Action */}
                      {isUnlocked ? (
                        <Link
                          to={`/book/${book.id}/read?chapter=${chapterNumber}`}
                          className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                        >
                          <BookOpen size={15} />
                          Read Chapter
                          <ChevronRight size={15} />
                        </Link>
                      ) : (
                        <Link
                          to={`/book/${book.id}/payment`}
                          className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Lock size={15} />
                          Purchase to Unlock
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Purchase CTA */}
            {!hasPurchased &&
              chapters.length > 1 &&
              book.available !== false && (
                <div className="mt-6 rounded-2xl bg-blue-600 p-6 text-white">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold">
                        Unlock the Complete Book
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-blue-100">
                        Get access to all {chapters.length} chapters
                        for ₦
                        {Number(
                          book.price || 0
                        ).toLocaleString()}
                        .
                      </p>
                    </div>

                    <Link
                      to={`/book/${book.id}/payment`}
                      className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                      <CreditCard size={17} />
                      Buy Full Book
                    </Link>
                  </div>
                </div>
              )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default BookDetails;
