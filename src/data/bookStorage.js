
import defaultBooks from "./books";

const STORAGE_KEY = "libraryBooks";

export function getBooks() {
  const storedBooks = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

  if (!Array.isArray(storedBooks) || storedBooks.length === 0) {
    return defaultBooks;
  }

  const mergedBooks = [...defaultBooks];

  storedBooks.forEach((storedBook) => {
    const existingIndex = mergedBooks.findIndex(
      (book) => Number(book.id) === Number(storedBook.id)
    );

    if (existingIndex !== -1) {
      mergedBooks[existingIndex] = {
        ...mergedBooks[existingIndex],
        ...storedBook,
      };
    } else {
      mergedBooks.push(storedBook);
    }
  });

  return mergedBooks;
}

export function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}
