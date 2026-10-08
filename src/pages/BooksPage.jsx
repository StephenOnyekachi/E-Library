
import { BookOpen, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { getBooks } from "../data/bookStorage";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  useEffect(() => {
    setBooks(getBooks());
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        books
          .map((book) => book.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [books]);

  const filteredBooks = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return books.filter((book) => {
      const matchesSearch =
        !searchValue ||
        book.title?.toLowerCase().includes(searchValue) ||
        book.author?.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || book.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [books, search, category]);

  const handleSearchChange = (event) => {
    const value = event.target.value;

    setSearch(value);

    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    if (category !== "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    setSearchParams(params);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    setCategory(value);

    const params = new URLSearchParams(searchParams);

    if (search.trim()) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    if (value !== "All") {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    setSearchParams(params);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white px-5 pb-10 pt-28 shadow-sm lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              E-Library
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-950 sm:text-4xl">
              Explore Our Books
            </h1>

            <p className="mt-3 text-gray-500">
              Search our collection and discover books that match
              your interests.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mt-8 grid gap-4 md:grid-cols-[1fr_240px]">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by book title or author..."
                className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="relative">
              <SlidersHorizontal
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "All"
                      ? "All Categories"
                      : item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredBooks.length}
              </span>{" "}
              {filteredBooks.length === 1 ? "book" : "books"}
            </p>

            {category !== "All" && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {category}
              </span>
            )}
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredBooks.map((book) => (
                <article
                  key={book.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-blue-50 text-blue-600">
                        <BookOpen size={48} />
                      </div>
                    )}

                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm">
                      {book.category}
                    </span>

                    {book.available === false && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
                          Unavailable
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h2 className="truncate text-lg font-bold text-gray-900">
                      {book.title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      by {book.author}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="text-lg font-bold text-blue-600">
                        ₦
                        {Number(book.price || 0).toLocaleString()}
                      </p>

                      <Link
                        to={`/book/${book.id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                      >
                        View Book
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center">
              <BookOpen
                size={42}
                className="mx-auto text-gray-300"
              />

              <h2 className="mt-4 text-lg font-bold text-gray-900">
                No books found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try another search term or category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setSearchParams({});
                }}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default BooksPage;
