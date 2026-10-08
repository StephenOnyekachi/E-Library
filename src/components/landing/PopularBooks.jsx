
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getBooks } from "../../data/bookStorage";

function PopularBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const libraryBooks = getBooks();

    // Show up to 5 books in the popular section.
    setBooks(libraryBooks.slice(0, 5));
  }, []);

  return (
    <section id="books" className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Explore our collection
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Popular Books
            </h2>

            <p className="mt-3 max-w-xl text-gray-500">
              Discover books readers are currently exploring.
            </p>
          </div>

          <Link
            to="/books"
            className="text-left text-sm font-semibold text-emerald-600 hover:text-emerald-700 sm:text-right"
          >
            View all books →
          </Link>
        </div>

        {books.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {books.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-blue-50 text-blue-600">
                      <span className="text-5xl font-bold">
                        {book.title?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-2 font-bold text-gray-900">
                    {book.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {book.author}
                  </p>

                  <p className="mt-3 font-bold text-emerald-600">
                    ₦{Number(book.price || 0).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
            <p className="text-gray-500">
              No books are currently available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default PopularBooks;
