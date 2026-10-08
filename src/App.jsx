
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBooks from "./pages/AdminBooks";
import BookDetails from "./pages/BookDetails";
import ReadBook from "./pages/ReadBook";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import BooksPage from "./pages/BooksPage";
import AdminUsers from "./pages/AdminUsers";
import AdminSales from "./pages/AdminSales";
import AdminSettings from "./pages/AdminSettings";
import MyLibrary from "./pages/MyLibrary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<AdminBooks />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/book/:id/read" element={<ReadBook />} />
        <Route path="/book/:id/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/sales" element={<AdminSales />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/my-library" element={<MyLibrary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
