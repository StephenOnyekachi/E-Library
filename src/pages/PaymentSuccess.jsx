
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Home,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function PaymentSuccess() {
  const location = useLocation();

  const {
    bookId,
    bookTitle,
    reference,
  } = location.state || {};

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-5">
          <div className="flex items-center gap-2 font-semibold text-gray-900">
            <BookOpen size={22} className="text-blue-600" />
            E-Library
          </div>
        </div>
      </header>

      {/* Success Content */}
      <section className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm md:p-10">
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2
              size={46}
              className="text-green-600"
            />
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Payment Successful!
          </h1>

          <p className="mx-auto mt-3 max-w-md leading-7 text-gray-500">
            Your payment has been received successfully. You can now continue
            reading your book.
          </p>

          {/* Book Information */}
          {bookTitle && (
            <div className="mt-8 rounded-xl bg-gray-50 p-5 text-left">
              <p className="text-sm text-gray-500">
                Book purchased
              </p>

              <h2 className="mt-1 font-bold text-gray-900">
                {bookTitle}
              </h2>

              {reference && (
                <p className="mt-3 text-xs text-gray-400">
                  Payment reference: {reference}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {bookId ? (
              <Link
                to={`/book/${bookId}/read`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Continue Reading
                <ArrowRight size={18} />
              </Link>
            ) : (
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Back to Library
                <Home size={18} />
              </Link>
            )}

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <Home size={18} />
              Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PaymentSuccess;
