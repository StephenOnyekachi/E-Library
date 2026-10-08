
import {
  BookOpen,
  CalendarDays,
  CreditCard,
  DollarSign,
  Search,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminStatCard from "../components/admin/AdminStatCard";
import { getBooks } from "../data/bookStorage";

function AdminSales() {
  const [admin, setAdmin] = useState({ username: "Admin" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedAdmin = JSON.parse(
      localStorage.getItem("adminUser") || "null"
    );

    if (savedAdmin) {
      setAdmin(savedAdmin);
    }

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
          customer: "Registered User",
          bookId: book.id,
          bookTitle: book.title,
          author: book.author,
          amount: Number(book.price || 0),
          status: "Paid",
          date: new Date().toLocaleDateString(),
          reference: "Frontend Purchase",
        };
      })
      .filter(Boolean);

    setSales(salesData);
  }, []);

  const filteredSales = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return sales;
    }

    return sales.filter(
      (sale) =>
        sale.customer.toLowerCase().includes(searchValue) ||
        sale.bookTitle.toLowerCase().includes(searchValue) ||
        sale.author.toLowerCase().includes(searchValue) ||
        sale.reference.toLowerCase().includes(searchValue)
    );
  }, [sales, search]);

  const totalSales = useMemo(() => {
    return sales.reduce(
      (total, sale) => total + Number(sale.amount || 0),
      0
    );
  }, [sales]);

  const totalOrders = sales.length;

  const uniqueCustomers = new Set(
    sales.map((sale) => sale.customer)
  ).size;

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
          <section className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Sales
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              View purchases and monitor your library sales.
            </p>
          </section>

          {/* Stats */}
          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <AdminStatCard
              title="Total Sales"
              value={`₦${totalSales.toLocaleString()}`}
              icon={DollarSign}
              iconBg="bg-green-50"
              iconColor="text-green-600"
            />

            <AdminStatCard
              title="Total Orders"
              value={totalOrders}
              icon={ShoppingBag}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
            />

            <AdminStatCard
              title="Customers"
              value={uniqueCustomers}
              icon={Users}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
            />

            <AdminStatCard
              title="Paid Orders"
              value={sales.filter(
                (sale) => sale.status === "Paid"
              ).length}
              icon={CreditCard}
              iconBg="bg-yellow-50"
              iconColor="text-yellow-600"
            />
          </section>

          {/* Sales Section */}
          <section className="rounded-2xl bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-gray-100 p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Sales Transactions
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Recent book purchases and payment information.
                  </p>
                </div>

                <div className="relative w-full lg:max-w-sm">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search sales..."
                    className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            {filteredSales.length > 0 ? (
              <>
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50 text-left">
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Order
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Customer
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Book
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Amount
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Status
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Date
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredSales.map((sale) => (
                        <tr
                          key={sale.id}
                          className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                        >
                          {/* Order */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                <ShoppingBag size={18} />
                              </div>

                              <div>
                                <p className="font-semibold text-gray-900">
                                  #{sale.id.toString().padStart(4, "0")}
                                </p>

                                <p className="text-xs text-gray-500">
                                  {sale.reference}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Customer */}
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-gray-900">
                              {sale.customer}
                            </p>
                          </td>

                          {/* Book */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                                <BookOpen size={18} />
                              </div>

                              <div>
                                <p className="max-w-xs truncate text-sm font-semibold text-gray-900">
                                  {sale.bookTitle}
                                </p>

                                <p className="text-xs text-gray-500">
                                  {sale.author}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Amount */}
                          <td className="px-6 py-4">
                            <p className="font-semibold text-gray-900">
                              ₦
                              {sale.amount.toLocaleString()}
                            </p>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                              {sale.status}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <CalendarDays size={16} />
                              {sale.date}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="space-y-4 p-4 md:hidden">
                  {filteredSales.map((sale) => (
                    <div
                      key={sale.id}
                      className="rounded-xl border border-gray-100 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <ShoppingBag size={19} />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900">
                              Order #
                              {sale.id
                                .toString()
                                .padStart(4, "0")}
                            </p>

                            <p className="text-xs text-gray-500">
                              {sale.customer}
                            </p>
                          </div>
                        </div>

                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                          {sale.status}
                        </span>
                      </div>

                      <div className="mt-4 rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-500">
                            <BookOpen size={18} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900">
                              {sale.bookTitle}
                            </p>

                            <p className="text-xs text-gray-500">
                              {sale.author}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                        <div>
                          <p className="text-xs text-gray-500">
                            Amount
                          </p>

                          <p className="mt-1 font-bold text-gray-900">
                            ₦{sale.amount.toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">
                            Date
                          </p>

                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {sale.date}
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 text-xs text-gray-400">
                        Reference: {sale.reference}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <ShoppingBag size={30} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  No sales yet
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {search
                    ? "Try a different search term."
                    : "Completed book purchases will appear here."}
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminSales;
