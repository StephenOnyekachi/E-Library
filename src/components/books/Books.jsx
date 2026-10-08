
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../../data/bookStorage";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(getBooks());
  }, []);

  return (
    <section
      id="books"
      className="bg-white px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Our Library
            </p>

            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Explore Our Books
            </h2>

            <p className="mt-3 max-w-2xl text-gray-500">
              Discover books across different categories and start learning
              today.
            </p>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Book Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                {book.image ? (
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-blue-50 text-blue-600">
                    <span className="text-4xl font-bold">
                      {book.title?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Category */}
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm">
                  {book.category}
                </span>

                {/* Availability */}
                {book.available === false && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
                      Unavailable
                    </span>
                  </div>
                )}
              </div>

              {/* Book Details */}
              <div className="p-5">
                <h3 className="truncate text-lg font-bold text-gray-900">
                  {book.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  by {book.author}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-bold text-blue-600">
                    ₦{Number(book.price || 0).toLocaleString()}
                  </p>

                  <Link
                    to={`/book/${book.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    View Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {books.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center">
            <p className="text-gray-500">
              No books are currently available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Books;
