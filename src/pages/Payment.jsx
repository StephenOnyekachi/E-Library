
import { ArrowLeft, BookOpen, Lock, ShieldCheck } from "lucide-react";
import PaystackPop from "@paystack/inline-js";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getBooks } from "../data/bookStorage";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(getBooks());
  }, []);

  const book = books.find(
    (item) => Number(item.id) === Number(id)
  );

  const handlePayment = () => {
    if (!book) {
      alert("Book not found.");
      return;
    }

    if (book.available === false) {
      alert("This book is currently unavailable.");
      return;
    }

    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

    if (!publicKey) {
      alert("Paystack public key is missing.");
      return;
    }

    const email = window.prompt(
      "Enter your email address to continue with payment:"
    );

    if (!email) {
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: publicKey,
      email: email,
      amount: Number(book.price) * 100,
      currency: "NGN",

      metadata: {
        bookId: book.id,
        bookTitle: book.title,
      },

      onSuccess: (transaction) => {
        console.log("Payment successful:", transaction);

        // Temporary frontend purchase record.
        // This will later be handled securely by Django.
        const purchasedBooks = JSON.parse(
          localStorage.getItem("purchasedBooks") || "[]"
        );

        if (!purchasedBooks.includes(book.id)) {
          purchasedBooks.push(book.id);

          localStorage.setItem(
            "purchasedBooks",
            JSON.stringify(purchasedBooks)
          );
        }

        navigate("/payment-success", {
          state: {
            bookId: book.id,
            bookTitle: book.title,
            reference: transaction.reference,
          },
        });
      },

      onCancel: () => {
        alert("Payment was cancelled.");
      },

      onError: (error) => {
        console.error("Paystack error:", error);

        alert(
          error?.message || "Something went wrong with the payment."
        );
      },
    });
  };

  if (!book) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Book Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            We couldn't find the book you are trying to purchase.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={18} />
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            to={`/book/${book.id}/read`}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Reading
          </Link>

          <div className="flex items-center gap-2 font-semibold text-gray-900">
            <BookOpen size={21} className="text-blue-600" />
            E-Library
          </div>
        </div>
      </header>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Premium Access
            </span>

            <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
              Unlock This Book
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-gray-500">
              Get access to all premium chapters of this book after your
              payment is successfully verified.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Book Information */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
                <BookOpen size={28} className="text-blue-600" />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                {book.title}
              </h2>

              <p className="mt-2 text-gray-500">
                By {book.author}
              </p>

              <div className="my-8 border-t border-gray-100" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Book access
                  </span>

                  <span className="font-medium text-gray-900">
                    Full access
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Free chapters
                  </span>

                  <span className="font-medium text-green-600">
                    Chapter 1
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Premium chapters
                  </span>

                  <span className="font-medium text-gray-900">
                    All remaining chapters
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                  <Lock size={19} className="text-blue-600" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Secure Payment
                  </h2>

                  <p className="text-sm text-gray-500">
                    One-time payment
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  Total amount
                </p>

                <p className="mt-1 text-3xl font-bold text-gray-900">
                  ₦{Number(book.price || 0).toLocaleString()}
                </p>
              </div>

              <button
                onClick={handlePayment}
                disabled={book.available === false}
                className={`mt-6 w-full rounded-lg px-6 py-3.5 font-semibold text-white transition ${
                  book.available === false
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {book.available === false
                  ? "Book Unavailable"
                  : "Continue to Payment"}
              </button>

              <div className="mt-5 flex items-start gap-3 rounded-lg bg-green-50 p-4">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <p className="text-sm leading-6 text-green-700">
                  Your payment will be securely processed by Paystack.
                  Premium access will be granted after successful payment
                  verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Payment;
