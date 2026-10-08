
import {
  BookOpen,
  DollarSign,
  Eye,
  Plus,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminStatCard from "../components/admin/AdminStatCard";
import SalesChart from "../components/admin/SalesChart";
import { getBooks } from "../data/bookStorage";

function AdminDashboard() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({ username: "Admin" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const savedAdmin = JSON.parse(
      localStorage.getItem("adminUser") || "null"
    );

    if (savedAdmin) {
      setAdmin(savedAdmin);
    }

    setBooks(getBooks());

    const purchasedBooks = JSON.parse(
      localStorage.getItem("purchasedBooks") || "[]"
    );

    const libraryBooks = getBooks();

    const salesData = purchasedBooks
      .map((bookId, index) => {
        const book = libraryBooks.find(
          (item) => Number(item.id) === Number(bookId)
        );

        if (!book) {
          return null;
        }

        return {
          id: index + 1,
          bookId: book.id,
          title: book.title,
          author: book.author,
          amount: Number(book.price || 0),
          status: "Paid",
          date: new Date().toISOString(),
        };
      })
      .filter(Boolean);

    setSales(salesData);
  }, []);

  const totalBooks = books.length;

  const registeredUser = JSON.parse(
    localStorage.getItem("registeredUser") || "null"
  );

  const totalUsers = registeredUser ? 1 : 0;

  const totalSales = sales.reduce(
    (sum, sale) => sum + Number(sale.amount || 0),
    0
  );

  const booksRead = 0;

  const recentBooks = books.slice(0, 5);

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
          {/* Header */}
          <section className="mb-8">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Admin Overview
              </p>

              <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                Dashboard
              </h1>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Welcome back, {admin.username || "Admin"}. Here is
                what is happening with your E-Library.
              </p>
            </div>
          </section>

          {/* Statistics */}
          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard
              title="Total Books"
              value={totalBooks}
              icon={BookOpen}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
            />

            <AdminStatCard
              title="Total Users"
              value={totalUsers}
              icon={Users}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
            />

            <AdminStatCard
              title="Total Sales"
              value={`₦${totalSales.toLocaleString()}`}
              icon={DollarSign}
              iconBg="bg-green-50"
              iconColor="text-green-600"
            />

            <AdminStatCard
              title="Books Read"
              value={booksRead}
              icon={Eye}
              iconBg="bg-orange-50"
              iconColor="text-orange-600"
            />
          </section>

          {/* Revenue Chart */}
          <section className="mb-8">
            <SalesChart sales={sales} />
          </section>

          {/* Main Content */}
          <section className="grid gap-6 xl:grid-cols-[1fr_320px]">
            {/* Recent Books */}
            <div className="rounded-2xl bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 p-5 sm:p-6">
                <div>
                  <h2 className="font-bold text-gray-900">
                    Recent Books
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Books currently available in your library.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/admin/books")}
                  className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  View All
                </button>
              </div>

              {recentBooks.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {recentBooks.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center gap-4 p-5 transition hover:bg-gray-50 sm:p-6"
                    >
                      <div className="h-14 w-11 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        {book.image ? (
                          <img
                            src={book.image}
                            alt={book.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-blue-50 text-blue-600">
                            <BookOpen size={20} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-gray-900">
                          {book.title}
                        </h3>

                        <p className="mt-1 truncate text-sm text-gray-500">
                          {book.author}
                        </p>
                      </div>

                      <div className="hidden text-right sm:block">
                        <p className="font-semibold text-gray-900">
                          ₦
                          {Number(
                            book.price || 0
                          ).toLocaleString()}
                        </p>

                        <span
                          className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                            book.available === false
                              ? "bg-red-50 text-red-600"
                              : "bg-green-50 text-green-600"
                          }`}
                        >
                          {book.available === false
                            ? "Unavailable"
                            : "Available"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/book/${book.id}`)
                        }
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-blue-600"
                        title="View book"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-16 text-center">
                  <BookOpen
                    size={40}
                    className="mx-auto text-gray-300"
                  />

                  <p className="mt-4 text-sm text-gray-500">
                    No books available yet.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6">
                <h2 className="font-bold text-gray-900">
                  Quick Actions
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Quickly manage your library.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => navigate("/admin/books")}
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Plus size={20} />
                  </span>

                  <span>
                    <span className="block font-semibold text-gray-900">
                      Add New Book
                    </span>

                    <span className="mt-1 block text-xs text-gray-500">
                      Add a book to your library
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/admin/books")}
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-200 p-4 text-left transition hover:border-purple-200 hover:bg-purple-50"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <BookOpen size={20} />
                  </span>

                  <span>
                    <span className="block font-semibold text-gray-900">
                      Manage Books
                    </span>

                    <span className="mt-1 block text-xs text-gray-500">
                      Edit or remove existing books
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/admin/users")}
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-200 p-4 text-left transition hover:border-green-200 hover:bg-green-50"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    <Users size={20} />
                  </span>

                  <span>
                    <span className="block font-semibold text-gray-900">
                      Manage Users
                    </span>

                    <span className="mt-1 block text-xs text-gray-500">
                      View registered users
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/admin/sales")}
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-200 p-4 text-left transition hover:border-orange-200 hover:bg-orange-50"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                    <ShoppingBag size={20} />
                  </span>

                  <span>
                    <span className="block font-semibold text-gray-900">
                      View Sales
                    </span>

                    <span className="mt-1 block text-xs text-gray-500">
                      Monitor book purchases
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
