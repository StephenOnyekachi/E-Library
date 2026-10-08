
import {
  FileText,
  Image,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

function BookForm({
  initialData = null,
  onSubmit,
  onCancel,
  submitText = "Save Book",
}) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    description: "",
    image: "",
    imageFile: null,
    available: true,
    chapters: [],
  });

  const [chapterTitle, setChapterTitle] = useState("");
  const [editingChapterId, setEditingChapterId] = useState(null);

  const imageInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        author: initialData.author || "",
        category: initialData.category || "",
        price: initialData.price || "",
        description: initialData.description || "",
        image: initialData.image || "",
        imageFile: null,
        available: initialData.available !== false,
        chapters: Array.isArray(initialData.chapters)
          ? initialData.chapters
          : [],
      });
    } else {
      setFormData({
        title: "",
        author: "",
        category: "",
        price: "",
        description: "",
        image: "",
        imageFile: null,
        available: true,
        chapters: [],
      });
    }

    setChapterTitle("");
    setEditingChapterId(null);
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Upload book cover
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      event.target.value = "";
      return;
    }

    // Remove previous temporary image URL
    if (
      formData.image &&
      formData.image.startsWith("blob:")
    ) {
      try {
        URL.revokeObjectURL(formData.image);
      } catch {
        // Ignore invalid object URLs.
      }
    }

    const imageUrl = URL.createObjectURL(file);

    setFormData((current) => ({
      ...current,
      image: imageUrl,
      imageFile: file,
    }));

    event.target.value = "";
  };

  // Remove book cover
  const handleRemoveImage = () => {
    if (
      formData.image &&
      formData.image.startsWith("blob:")
    ) {
      try {
        URL.revokeObjectURL(formData.image);
      } catch {
        // Ignore invalid object URLs.
      }
    }

    setFormData((current) => ({
      ...current,
      image: "",
      imageFile: null,
    }));

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  // Add or update a chapter
  const handleAddChapter = () => {
    if (!chapterTitle.trim()) {
      alert("Please enter a chapter title.");
      return;
    }

    if (editingChapterId !== null) {
      setFormData((current) => ({
        ...current,
        chapters: current.chapters.map((chapter) =>
          chapter.id === editingChapterId
            ? {
                ...chapter,
                title: chapterTitle.trim(),
              }
            : chapter
        ),
      }));

      setChapterTitle("");
      setEditingChapterId(null);

      return;
    }

    const newChapter = {
      id: Date.now(),
      title: chapterTitle.trim(),
      pdfName: "",
      pdfUrl: "",
      pdfFile: null,
    };

    setFormData((current) => ({
      ...current,
      chapters: [...current.chapters, newChapter],
    }));

    setChapterTitle("");
  };

  // Edit chapter title
  const handleEditChapter = (chapter) => {
    setChapterTitle(chapter.title);
    setEditingChapterId(chapter.id);
  };

  // Delete chapter
  const handleDeleteChapter = (chapterId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this chapter?"
    );

    if (!confirmed) {
      return;
    }

    setFormData((current) => ({
      ...current,
      chapters: current.chapters.filter(
        (chapter) => chapter.id !== chapterId
      ),
    }));

    if (editingChapterId === chapterId) {
      setChapterTitle("");
      setEditingChapterId(null);
    }
  };

  // Upload PDF
  const handlePdfUpload = (event, chapterId) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      event.target.value = "";
      return;
    }

    const pdfUrl = URL.createObjectURL(file);

    setFormData((current) => ({
      ...current,
      chapters: current.chapters.map((chapter) => {
        if (chapter.id !== chapterId) {
          return chapter;
        }

        if (chapter.pdfUrl) {
          try {
            URL.revokeObjectURL(chapter.pdfUrl);
          } catch {
            // Ignore invalid object URLs.
          }
        }

        return {
          ...chapter,
          pdfName: file.name,
          pdfUrl,
          pdfFile: file,
        };
      }),
    }));

    event.target.value = "";
  };

  // Delete only the PDF from a chapter
  const handleRemovePdf = (chapterId) => {
    setFormData((current) => ({
      ...current,
      chapters: current.chapters.map((chapter) => {
        if (chapter.id !== chapterId) {
          return chapter;
        }

        if (chapter.pdfUrl) {
          try {
            URL.revokeObjectURL(chapter.pdfUrl);
          } catch {
            // Ignore invalid object URLs.
          }
        }

        return {
          ...chapter,
          pdfName: "",
          pdfUrl: "",
          pdfFile: null,
        };
      }),
    }));
  };

  // Move chapter up
  const handleMoveChapterUp = (index) => {
    if (index === 0) {
      return;
    }

    setFormData((current) => {
      const chapters = [...current.chapters];

      [chapters[index - 1], chapters[index]] = [
        chapters[index],
        chapters[index - 1],
      ];

      return {
        ...current,
        chapters,
      };
    });
  };

  // Move chapter down
  const handleMoveChapterDown = (index) => {
    if (index === formData.chapters.length - 1) {
      return;
    }

    setFormData((current) => {
      const chapters = [...current.chapters];

      [chapters[index], chapters[index + 1]] = [
        chapters[index + 1],
        chapters[index],
      ];

      return {
        ...current,
        chapters,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter the book title.");
      return;
    }

    if (!formData.author.trim()) {
      alert("Please enter the author's name.");
      return;
    }

    if (!formData.category.trim()) {
      alert("Please enter the book category.");
      return;
    }

    if (!formData.price || Number(formData.price) < 0) {
      alert("Please enter a valid book price.");
      return;
    }

    const cleanedChapters = formData.chapters.map(
      (chapter, index) => ({
        ...chapter,
        chapterNumber: index + 1,
      })
    );

    onSubmit?.({
      ...formData,
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      chapters: cleanedChapters,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            Book Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter the basic information about the book.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Title */}
          <div className="md:col-span-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Book Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Author */}
          <div>
            <label
              htmlFor="author"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Author
            </label>

            <input
              id="author"
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Category
            </label>

            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Technology"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Price (₦)
            </label>

            <input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter book price"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Book Cover Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Book Cover Image
            </label>

            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
              {formData.image ? (
                <div className="flex items-center gap-4">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={formData.image}
                      alt="Book cover preview"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {formData.imageFile?.name ||
                        "Book cover image"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Cover image selected successfully.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <label className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700">
                        <Upload size={14} />
                        Replace Image

                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-8 text-center transition hover:border-blue-300 hover:bg-blue-50">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Image size={24} />
                  </div>

                  <span className="text-sm font-semibold text-gray-800">
                    Upload book cover
                  </span>

                  <span className="mt-1 text-xs text-gray-500">
                    JPG, PNG, WEBP or other image formats
                  </span>

                  <span className="mt-3 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white">
                    <Upload size={14} />
                    Choose Image
                  </span>

                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Or Use Image URL
            </label>

            <div className="relative">
              <Image
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="image"
                name="image"
                type="url"
                value={
                  formData.imageFile
                    ? ""
                    : formData.image
                }
                onChange={(event) => {
                  setFormData((current) => ({
                    ...current,
                    image: event.target.value,
                    imageFile: null,
                  }));
                }}
                placeholder="https://example.com/book.jpg"
                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <p className="mt-2 text-xs text-gray-400">
              You can either upload an image or provide an image URL.
            </p>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a short description of the book..."
              className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Availability */}
          <div className="md:col-span-2">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />

              <span>
                <span className="block text-sm font-medium text-gray-700">
                  Book available
                </span>

                <span className="block text-xs text-gray-500">
                  Users can currently purchase and read this book.
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Image Preview */}
      {formData.image && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Image Preview
          </h2>

          <div className="flex items-center gap-5">
            <div className="h-32 w-24 overflow-hidden rounded-xl bg-gray-100">
              <img
                src={formData.image}
                alt="Book preview"
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                {formData.title || "Book cover"}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Preview of the book cover image.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chapters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Book Chapters
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add and manage the PDF content for each chapter.
            </p>
          </div>

          <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            {formData.chapters.length}{" "}
            {formData.chapters.length === 1
              ? "Chapter"
              : "Chapters"}
          </span>
        </div>

        {/* Add/Edit Chapter */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <label
            htmlFor="chapterTitle"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {editingChapterId !== null
              ? "Edit Chapter Title"
              : "Chapter Title"}
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="chapterTitle"
              type="text"
              value={chapterTitle}
              onChange={(event) =>
                setChapterTitle(event.target.value)
              }
              placeholder="e.g. Introduction"
              className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={handleAddChapter}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {editingChapterId !== null ? (
                <>
                  <Save size={17} />
                  Update Chapter
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add Chapter
                </>
              )}
            </button>

            {editingChapterId !== null && (
              <button
                type="button"
                onClick={() => {
                  setChapterTitle("");
                  setEditingChapterId(null);
                }}
                className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Chapters List */}
        <div className="mt-6 space-y-4">
          {formData.chapters.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center">
              <FileText
                size={32}
                className="mx-auto text-gray-300"
              />

              <p className="mt-3 text-sm font-medium text-gray-500">
                No chapters added yet.
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Add a chapter above and upload its PDF.
              </p>
            </div>
          ) : (
            formData.chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Chapter Information */}
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                      {index + 1}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-gray-900">
                        {chapter.title}
                      </h3>

                      {chapter.pdfName ? (
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-green-600">
                          <FileText size={14} />
                          {chapter.pdfName}
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-red-500">
                          No PDF uploaded
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Chapter Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Move Up */}
                    <button
                      type="button"
                      onClick={() =>
                        handleMoveChapterUp(index)
                      }
                      disabled={index === 0}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ↑
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      onClick={() =>
                        handleMoveChapterDown(index)
                      }
                      disabled={
                        index === formData.chapters.length - 1
                      }
                      className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ↓
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() =>
                        handleEditChapter(chapter)
                      }
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    {/* Upload PDF */}
                    <label className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700">
                      <Upload size={14} />

                      {chapter.pdfName
                        ? "Replace PDF"
                        : "Upload PDF"}

                      <input
                        type="file"
                        accept="application/pdf,.pdf"
                        className="hidden"
                        onChange={(event) =>
                          handlePdfUpload(
                            event,
                            chapter.id
                          )
                        }
                      />
                    </label>

                    {/* Remove PDF */}
                    {chapter.pdfName && (
                      <button
                        type="button"
                        onClick={() =>
                          handleRemovePdf(chapter.id)
                        }
                        className="rounded-lg border border-orange-200 px-3 py-2 text-xs font-medium text-orange-600 transition hover:bg-orange-50"
                      >
                        Remove PDF
                      </button>
                    )}

                    {/* Delete Chapter */}
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteChapter(chapter.id)
                      }
                      className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Frontend Notice */}
        <div className="mt-5 rounded-xl bg-amber-50 p-4">
          <p className="text-xs leading-5 text-amber-700">
            <strong>Frontend prototype:</strong> Book cover images
            and PDF files are currently handled temporarily in the
            browser. When the Django backend is added, they will be
            uploaded and stored permanently on the server.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <X size={18} />
          Cancel
        </button>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Save size={18} />
          {submitText}
        </button>
      </div>
    </form>
  );
}

export default BookForm;
