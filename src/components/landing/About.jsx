
function About() {
  return (
    <section className="bg-white px-6 py-20" id="about">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        
        {/* Text */}
        <div>
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-blue-600">
            About E-Library
          </span>

          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
            Your Digital Gateway to Knowledge
          </h2>

          <p className="mb-5 leading-7 text-gray-600">
            E-Library is a modern digital library designed to make books,
            knowledge, and educational resources easily accessible from
            anywhere.
          </p>

          <p className="mb-8 leading-7 text-gray-600">
            Discover new books, explore different categories, and enjoy a
            simple reading experience built for students, researchers, and
            everyone who loves learning.
          </p>

          <a
            href="#books"
            className="inline-flex rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Explore Our Library
          </a>
        </div>

        {/* Image / Visual */}
        <div className="flex justify-center">
          <div className="flex h-80 w-full max-w-md items-center justify-center rounded-2xl bg-blue-50">
            <div className="text-center">
              <div className="mb-4 text-7xl">📚</div>

              <h3 className="text-xl font-bold text-gray-900">
                Learn. Discover. Grow.
              </h3>

              <p className="mt-2 text-gray-500">
                Knowledge at your fingertips.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
