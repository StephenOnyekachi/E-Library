
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import About from "../components/landing/About";
import PopularBooks from "../components/landing/PopularBooks";
import Categories from "../components/landing/Categories";
import Books from "../components/books/Books";
import Footer from "../components/landing/Footer";

function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Books />
      <PopularBooks />
      <Categories />
      <Footer />
    </main>
  );
}

export default LandingPage;
