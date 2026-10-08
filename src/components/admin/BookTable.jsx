
import { Edit3, Trash2 } from "lucide-react";

function BookTable({ books = [], onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Book
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Author
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Category
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Price
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr
                  key={book.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-50 text-blue-600">
                        {book.image ? (
                          <img
                            src={book.image}
                            alt={book.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-bold">
                            {book.title?.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-[220px] truncate font-semibold text-gray-900">
                          {book.title}
                        </p>

                        <p className="text-xs text-gray-500">
                          ID: {book.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {book.author}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                      {book.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ₦{Number(book.price || 0).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        book.available === false
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {book.available === false
                        ? "Unavailable"
                        : "Available"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit?.(book)}
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                        aria-label={`Edit ${book.title}`}
                      >
                        <Edit3 size={18} />
                      </button>

                      <button
                        onClick={() => onDelete?.(book)}
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                        aria-label={`Delete ${book.title}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 p-4 md:hidden">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id}
              className="rounded-xl border border-gray-100 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-50 text-blue-600">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="font-bold">
                        {book.title?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-gray-900">
                      {book.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {book.author}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
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

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xs text-gray-400">Category</p>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {book.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Price</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    ₦{Number(book.price || 0).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => onEdit?.(book)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                >
                  <Edit3 size={16} />
                  Edit
                </button>

                <button
                  onClick={() => onDelete?.(book)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-sm text-gray-500">
            No books found.
          </div>
        )}
      </div>
    </div>
  );
}

export default BookTable;
