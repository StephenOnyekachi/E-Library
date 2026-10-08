
import {
  BookOpen,
  Filter,
  Plus,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminStatCard from "../components/admin/AdminStatCard";
import BookForm from "../components/admin/BookForm";
import BookTable from "../components/admin/BookTable";

const defaultBooks = [
  {
    id: 1,
    title: "The Power of Knowledge",
    author: "John Smith",
    description:
      "A practical guide to understanding the importance of knowledge and continuous learning.",
    category: "Education",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    available: true,
    chapters: [],
  },
  {
    id: 2,
    title: "Modern Web Development",
    author: "David Johnson",
    description:
      "Learn the fundamentals and modern techniques used to build powerful web applications.",
    category: "Technology",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    available: true,
    chapters: [],
  },
  {
    id: 3,
    title: "The Art of Learning",
    author: "Michael Brown",
    description:
      "Discover practical strategies for learning faster, remembering more, and improving your skills.",
    category: "Self Development",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    available: true,
    chapters: [],
  },
  {
    id: 4,
    title: "Introduction to Science",
    author: "Sarah Williams",
    description:
      "An introduction to important scientific concepts and discoveries.",
    category: "Science",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    available: true,
    chapters: [],
  },
];

function getStoredBooks() {
  const savedBooks = JSON.parse(
    localStorage.getItem("libraryBooks") || "null"
  );

  if (!Array.isArray(savedBooks)) {
    localStorage.setItem(
      "libraryBooks",
      JSON.stringify(defaultBooks)
    );

    return defaultBooks;
  }

  const mergedBooks = savedBooks.map((book) => ({
    ...book,
    chapters: Array.isArray(book.chapters)
      ? book.chapters
      : [],
  }));

  defaultBooks.forEach((defaultBook) => {
    const exists = mergedBooks.some(
      (book) => Number(book.id) === Number(defaultBook.id)
    );

    if (!exists) {
      mergedBooks.push(defaultBook);
    }
  });

  localStorage.setItem(
    "libraryBooks",
    JSON.stringify(mergedBooks)
  );

  return mergedBooks;
}

function AdminBooks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [admin] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("adminUser") || "null") || {
        username: "Admin",
      }
    );
  });

  const [books, setBooks] = useState(getStoredBooks);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

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
    const search = searchTerm.toLowerCase().trim();

    return books.filter((book) => {
      const matchesSearch =
        !search ||
        book.title?.toLowerCase().includes(search) ||
        book.author?.toLowerCase().includes(search) ||
        book.category?.toLowerCase().includes(search);

      const matchesCategory =
        categoryFilter === "All" ||
        book.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [books, searchTerm, categoryFilter]);

  const availableBooks = books.filter(
    (book) => book.available !== false
  ).length;

  const unavailableBooks = books.filter(
    (book) => book.available === false
  ).length;

  const saveBooks = (updatedBooks) => {
    setBooks(updatedBooks);

    localStorage.setItem(
      "libraryBooks",
      JSON.stringify(updatedBooks)
    );
  };

  const handleAddBook = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleEditBook = (book) => {
    setEditingBook({
      ...book,
      chapters: Array.isArray(book.chapters)
        ? book.chapters
        : [],
    });

    setShowForm(true);
  };

  const handleDeleteBook = (book) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${book.title}"?`
    );

    if (!confirmed) {
      return;
    }

    const updatedBooks = books.filter(
      (item) => item.id !== book.id
    );

    saveBooks(updatedBooks);
  };

  const handleFormSubmit = (bookData) => {
    const normalizedBookData = {
      ...bookData,
      chapters: Array.isArray(bookData.chapters)
        ? bookData.chapters
        : [],
    };

    if (editingBook) {
      const updatedBooks = books.map((book) =>
        book.id === editingBook.id
          ? {
              ...book,
              ...normalizedBookData,
            }
          : book
      );

      saveBooks(updatedBooks);
    } else {
      const highestId =
        books.length > 0
          ? Math.max(
              ...books.map(
                (book) => Number(book.id) || 0
              )
            )
          : 0;

      const newBook = {
        id: highestId + 1,
        ...normalizedBookData,
      };

      saveBooks([newBook, ...books]);
    }

    setShowForm(false);
    setEditingBook(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  const hasFilters =
    searchTerm.trim() || categoryFilter !== "All";

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:ml-64">
        <AdminHeader
          onMenuClick={() => setSidebarOpen(true)}
          admin={admin}
        />

        <main className="p-4 sm:p-6 lg:p-8">

          {/* Page Header */}
          <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Library Management
              </p>

              <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                Books
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-500">
                Add, edit, search, and manage books and
                their chapter content.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddBook}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={19} />
              Add New Book
            </button>
          </section>

          {/* Statistics */}
          <section className="mb-8 grid gap-4 sm:grid-cols-3">
            <AdminStatCard
              title="Total Books"
              value={books.length}
              icon={BookOpen}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
            />

            <AdminStatCard
              title="Available Books"
              value={availableBooks}
              icon={BookOpen}
              iconBg="bg-green-50"
              iconColor="text-green-600"
            />

            <AdminStatCard
              title="Unavailable Books"
              value={unavailableBooks}
              icon={BookOpen}
              iconBg="bg-red-50"
              iconColor="text-red-600"
            />
          </section>

          {/* Search and Filters */}
          <section className="mb-6 rounded-2xl bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search by title, author, or category..."
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="relative lg:w-64">
                <Filter
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value)
                  }
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category === "All"
                        ? "All Categories"
                        : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredBooks.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900">
                  {books.length}
                </span>{" "}
                books
              </p>

              {hasFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("All");
                  }}
                  className="inline-flex items-center gap-1 self-start text-sm font-medium text-blue-600 transition hover:text-blue-700 sm:self-auto"
                >
                  <X size={16} />
                  Clear filters
                </button>
              )}
            </div>
          </section>

          {/* Book Management */}
          <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-gray-900">
                    Book Collection
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage books, chapters, and PDF
                    content.
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  {filteredBooks.length}{" "}
                  {filteredBooks.length === 1
                    ? "Book"
                    : "Books"}
                </span>
              </div>
            </div>

            <BookTable
              books={filteredBooks}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
            />
          </section>
        </main>
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-gray-50 shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {editingBook
                    ? "Edit Book"
                    : "Add New Book"}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {editingBook
                    ? "Update the book information and manage its chapters."
                    : "Add a new book and its chapter content to your digital library."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCancelForm}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close form"
              >
                <X size={22} />
              </button>
            </div>

            {/* Form */}
            <div className="p-4 sm:p-6">
              <BookForm
                initialData={editingBook}
                onSubmit={handleFormSubmit}
                onCancel={handleCancelForm}
                submitText={
                  editingBook
                    ? "Update Book"
                    : "Save Book"
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBooks;
