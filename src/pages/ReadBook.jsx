
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lock,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getBooks } from "../data/bookStorage";

function ReadBook() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const books = getBooks();

  const book = books.find(
    (item) => Number(item.id) === Number(id)
  );

  const chapters = useMemo(() => {
    if (!book?.chapters || !Array.isArray(book.chapters)) {
      return [];
    }

    return book.chapters;
  }, [book]);

  const hasUploadedChapters = chapters.length > 0;

  const defaultChapters = [
    "Introduction",
    "Getting Started",
    "Understanding the Basics",
    "Practical Application",
    "Advanced Concepts",
    "Conclusion",
  ];

  const readerChapters = hasUploadedChapters
    ? chapters
    : defaultChapters.map((title, index) => ({
        id: `default-${index + 1}`,
        chapterNumber: index + 1,
        title,
        pdfName: "",
        pdfUrl: "",
      }));

  const [currentChapter, setCurrentChapter] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedChapters, setCompletedChapters] = useState([]);

  const storageKey = `readingProgress-${id}`;
  const completedKey = `completedChapters-${id}`;

  /*
   * Check whether the user has purchased this book.
   */
  const hasPurchased = useMemo(() => {
    const purchasedBooks = JSON.parse(
      localStorage.getItem("purchasedBooks") || "[]"
    );

    if (!Array.isArray(purchasedBooks)) {
      return false;
    }

    return purchasedBooks.some(
      (purchasedBook) =>
        Number(
          typeof purchasedBook === "object"
            ? purchasedBook.id
            : purchasedBook
        ) === Number(book?.id)
    );
  }, [book?.id]);

  /*
   * Chapter 1 is always free.
   * Chapters 2+ require payment.
   */
  const canReadChapter = (chapterNumber) => {
    if (chapterNumber === 1) {
      return true;
    }

    return hasPurchased;
  };

  /*
   * Restore saved progress.
   */
  useEffect(() => {
    const savedProgress = Number(
      localStorage.getItem(storageKey) || 1
    );

    if (
      savedProgress >= 1 &&
      savedProgress <= readerChapters.length
    ) {
      if (savedProgress > 1 && !hasPurchased) {
        setCurrentChapter(1);
      } else {
        setCurrentChapter(savedProgress);
      }
    }
  }, [
    storageKey,
    readerChapters.length,
    hasPurchased,
  ]);

  /*
   * Open a chapter from the URL.
   *
   * Example:
   * /book/1/read?chapter=3
   */
  useEffect(() => {
    const chapterFromUrl = Number(
      searchParams.get("chapter")
    );

    if (
      !chapterFromUrl ||
      chapterFromUrl < 1 ||
      chapterFromUrl > readerChapters.length
    ) {
      return;
    }

    /*
     * Do not allow an unpaid user to open
     * Chapter 2 or above directly through the URL.
     */
    if (!canReadChapter(chapterFromUrl)) {
      setCurrentChapter(1);
      return;
    }

    setCurrentChapter(chapterFromUrl);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [
    searchParams,
    readerChapters.length,
    hasPurchased,
  ]);

  /*
   * Load completed chapters.
   */
  useEffect(() => {
    const savedCompleted = JSON.parse(
      localStorage.getItem(completedKey) || "[]"
    );

    if (Array.isArray(savedCompleted)) {
      setCompletedChapters(savedCompleted);
    }
  }, [completedKey]);

  /*
   * Save current reading progress.
   */
  useEffect(() => {
    localStorage.setItem(
      storageKey,
      String(currentChapter)
    );
  }, [currentChapter, storageKey]);

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <BookOpen
            size={48}
            className="mx-auto mb-4 text-blue-600"
          />

          <h1 className="text-2xl font-bold text-gray-900">
            Book Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The book you are trying to read could not be
            found.
          </p>

          <Link
            to="/books"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  const selectedChapter =
    readerChapters[currentChapter - 1];

  const progress =
    readerChapters.length > 0
      ? Math.round(
          (completedChapters.length /
            readerChapters.length) *
            100
        )
      : 0;

  const selectChapter = (chapterNumber) => {
    if (
      chapterNumber < 1 ||
      chapterNumber > readerChapters.length
    ) {
      return;
    }

    if (!canReadChapter(chapterNumber)) {
      setCurrentChapter(1);
      setSidebarOpen(false);
      return;
    }

    setCurrentChapter(chapterNumber);
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const markChapterComplete = () => {
    if (!selectedChapter) {
      return;
    }

    if (!canReadChapter(currentChapter)) {
      return;
    }

    const chapterId =
      selectedChapter.id || currentChapter;

    setCompletedChapters((previous) => {
      if (previous.includes(chapterId)) {
        return previous;
      }

      const updated = [...previous, chapterId];

      localStorage.setItem(
        completedKey,
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const isChapterCompleted = (chapter) => {
    if (!chapter) {
      return false;
    }

    return completedChapters.includes(
      chapter.id || currentChapter
    );
  };

  const goToPreviousChapter = () => {
    selectChapter(currentChapter - 1);
  };

  const goToNextChapter = () => {
    const nextChapter = currentChapter + 1;

    if (!canReadChapter(nextChapter)) {
      return;
    }

    markChapterComplete();
    selectChapter(nextChapter);
  };

  const isCurrentChapterLocked =
    !canReadChapter(currentChapter);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 lg:hidden"
              aria-label="Open chapters"
            >
              <Menu size={22} />
            </button>

            <Link
              to={`/book/${book.id}`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100"
              aria-label="Back to book details"
            >
              <ArrowLeft size={20} />
            </Link>

            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold text-gray-900 sm:text-base">
                {book.title}
              </h1>

              <p className="truncate text-xs text-gray-500">
                {book.author}
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="text-right">
              <p className="text-xs text-gray-500">
                Reading progress
              </p>

              <p className="text-sm font-semibold text-gray-900">
                {progress}%
              </p>
            </div>

            <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Desktop Sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-gray-200 bg-white lg:block">
          <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto p-5">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Table of Contents
              </p>

              <h2 className="mt-1 text-lg font-bold text-gray-900">
                Chapters
              </h2>

              {!hasPurchased && (
                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Chapter 1 is free. Purchase the book to
                  unlock the remaining chapters.
                </p>
              )}
            </div>

            <ChapterList
              chapters={readerChapters}
              currentChapter={currentChapter}
              onSelect={selectChapter}
              isChapterCompleted={isChapterCompleted}
              hasPurchased={hasPurchased}
            />
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 bg-black/40"
              aria-label="Close chapters"
            />

            <aside className="relative h-full w-[85%] max-w-sm overflow-y-auto bg-white shadow-xl">
              <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Table of Contents
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-gray-900">
                    Chapters
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100"
                  aria-label="Close chapters"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-5">
                <ChapterList
                  chapters={readerChapters}
                  currentChapter={currentChapter}
                  onSelect={selectChapter}
                  isChapterCompleted={isChapterCompleted}
                  hasPurchased={hasPurchased}
                />
              </div>
            </aside>
          </div>
        )}

        {/* Reader */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {/* Chapter Header */}
            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    Chapter {currentChapter} of{" "}
                    {readerChapters.length}
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                    {selectedChapter?.title ||
                      `Chapter ${currentChapter}`}
                  </h2>

                  {selectedChapter?.pdfName &&
                    !isCurrentChapterLocked && (
                      <p className="mt-2 text-sm text-gray-500">
                        {selectedChapter.pdfName}
                      </p>
                    )}
                </div>

                {isChapterCompleted(selectedChapter) &&
                  !isCurrentChapterLocked && (
                    <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                      <CheckCircle2 size={20} />
                      Completed
                    </div>
                  )}
              </div>
            </div>

            {/* Locked Chapter */}
            {isCurrentChapterLocked ? (
              <LockedChapter
                book={book}
                chapter={selectedChapter}
              />
            ) : selectedChapter?.pdfUrl ? (
              /* PDF Reader */
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-5">
                  <div className="flex min-w-0 items-center gap-2">
                    <BookOpen
                      size={18}
                      className="shrink-0 text-blue-600"
                    />

                    <span className="truncate text-sm font-medium text-gray-700">
                      {selectedChapter.pdfName ||
                        "Chapter PDF"}
                    </span>
                  </div>

                  <a
                    href={selectedChapter.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Open PDF
                  </a>
                </div>

                <div className="bg-gray-200">
                  <iframe
                    src={selectedChapter.pdfUrl}
                    title={
                      selectedChapter.title ||
                      `Chapter ${currentChapter}`
                    }
                    className="h-[70vh] min-h-[600px] w-full border-0"
                  />
                </div>
              </div>
            ) : (
              <DefaultChapterContent
                book={book}
                chapter={selectedChapter}
                chapterNumber={currentChapter}
              />
            )}

            {/* Navigation */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goToPreviousChapter}
                disabled={currentChapter === 1}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={18} />
                Previous Chapter
              </button>

              <button
                type="button"
                onClick={markChapterComplete}
                disabled={isCurrentChapterLocked}
                className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  isCurrentChapterLocked
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : isChapterCompleted(
                          selectedChapter
                        )
                      ? "bg-green-50 text-green-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <CheckCircle2 size={18} />

                {isCurrentChapterLocked
                  ? "Locked"
                  : isChapterCompleted(selectedChapter)
                    ? "Chapter Completed"
                    : "Mark as Complete"}
              </button>

              <button
                type="button"
                onClick={goToNextChapter}
                disabled={
                  currentChapter === readerChapters.length ||
                  (!hasPurchased &&
                    currentChapter === 1)
                }
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {!hasPurchased && currentChapter === 1
                  ? "Unlock Next Chapter"
                  : "Next Chapter"}

                {hasPurchased ? (
                  <ChevronRight size={18} />
                ) : (
                  <Lock size={17} />
                )}
              </button>
            </div>

            {/* Purchase CTA */}
            {!hasPurchased &&
              currentChapter === 1 &&
              readerChapters.length > 1 && (
                <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        Enjoying the book?
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Chapter 1 is free. Purchase this book
                        to unlock all remaining chapters.
                      </p>
                    </div>

                    <Link
                      to={`/book/${book.id}/payment`}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Unlock Full Book
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              )}

            {/* Mobile Progress */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 sm:hidden">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">
                  Reading progress
                </span>

                <span className="text-xs font-bold text-gray-900">
                  {progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>

            {/* Back to Book */}
            <div className="mt-8 text-center">
              <Link
                to={`/book/${book.id}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
              >
                <ArrowLeft size={16} />
                Back to book details
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ChapterList({
  chapters,
  currentChapter,
  onSelect,
  isChapterCompleted,
  hasPurchased,
}) {
  return (
    <div className="space-y-2">
      {chapters.map((chapter, index) => {
        const chapterNumber =
          chapter.chapterNumber || index + 1;

        const active =
          currentChapter === index + 1;

        const completed =
          isChapterCompleted(chapter);

        const locked =
          chapterNumber > 1 && !hasPurchased;

        return (
          <button
            key={chapter.id || `${chapterNumber}-${index}`}
            type="button"
            onClick={() => onSelect(index + 1)}
            className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition ${
              active
                ? "bg-blue-50 text-blue-700"
                : locked
                  ? "text-gray-400 hover:bg-gray-50"
                  : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                locked
                  ? "bg-gray-100 text-gray-400"
                  : active
                    ? "bg-blue-600 text-white"
                    : completed
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
              }`}
            >
              {locked ? (
                <Lock size={15} />
              ) : completed ? (
                <CheckCircle2 size={17} />
              ) : (
                chapterNumber
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={`text-sm font-semibold ${
                  locked
                    ? "text-gray-400"
                    : active
                      ? "text-blue-700"
                      : "text-gray-800"
                }`}
              >
                {chapter.title ||
                  `Chapter ${chapterNumber}`}
              </p>

              {locked ? (
                <p className="mt-1 text-xs text-gray-400">
                  Purchase to unlock
                </p>
              ) : chapter.pdfName ? (
                <p className="mt-1 truncate text-xs text-gray-400">
                  PDF content
                </p>
              ) : null}
            </div>

            {locked && (
              <Lock
                size={15}
                className="mt-1 shrink-0 text-gray-400"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function LockedChapter({ book, chapter }) {
  return (
    <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
          <Lock size={34} className="text-blue-600" />
        </div>

        <h3 className="mt-6 text-2xl font-bold text-gray-900">
          Chapter Locked
        </h3>

        <p className="mt-3 text-sm leading-7 text-gray-500">
          <strong className="text-gray-700">
            {chapter?.title || "This chapter"}
          </strong>{" "}
          is available after purchasing{" "}
          <strong className="text-gray-700">
            {book.title}
          </strong>
          .
        </p>

        <div className="mt-6 rounded-xl bg-gray-50 p-4 text-left">
          <p className="text-sm font-semibold text-gray-800">
            Your free access
          </p>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            You can read Chapter 1 for free. Purchase the
            book to continue reading the remaining chapters.
          </p>
        </div>

        <Link
          to={`/book/${book.id}/payment`}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Unlock Full Book
          <ChevronRight size={18} />
        </Link>

        <Link
          to={`/book/${book.id}`}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
        >
          <ArrowLeft size={17} />
          Back to Book
        </Link>
      </div>
    </div>
  );
}

function DefaultChapterContent({
  book,
  chapter,
  chapterNumber,
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 border-b border-gray-100 pb-6">
          <p className="text-sm font-medium text-blue-600">
            Chapter {chapterNumber}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">
            {chapter?.title ||
              `Chapter ${chapterNumber}`}
          </h3>
        </div>

        <div className="space-y-6 text-base leading-8 text-gray-600">
          <p>
            Welcome to chapter {chapterNumber} of{" "}
            <strong className="font-semibold text-gray-900">
              {book.title}
            </strong>
            .
          </p>

          <p>
            This chapter is currently using the default
            reading experience because the administrator has
            not uploaded a PDF for this chapter yet.
          </p>

          <div className="rounded-xl bg-blue-50 p-5">
            <p className="font-semibold text-blue-900">
              PDF content not uploaded
            </p>

            <p className="mt-2 text-sm leading-6 text-blue-800">
              Once the administrator uploads a PDF for this
              chapter, the actual PDF will appear here
              automatically.
            </p>
          </div>

          <p>
            Continue reading through the chapters using the
            navigation controls below. Your reading progress
            is saved automatically in this browser.
          </p>
        </div>
      </div>
    </article>
  );
}

export default ReadBook;
