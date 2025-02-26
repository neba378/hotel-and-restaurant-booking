import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerListings from "./pages/CustomerListings";
import VendorListings from "./pages/VendorListings";
import VendorDetail from "./pages/VendorDetail";
// import VendorListings from "./pages/VendorListings";
import CustomerDetail from "./pages/CustomerDetail";
import AddService from "./pages/AddService";
// import VendorDetail from "./pages/VendorDetail";
// import BookingPage from "./pages/BookingPage";
// import ManageListing from "./pages/ManageListing";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* <Header /> */}
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/customer-listings" element={<CustomerListings />} />
            <Route path="/vendor-detail/:id" element={<VendorDetail />} />
            <Route path="/vendor-listings" element={<VendorListings />} />
            <Route path="/add-service" element={<AddService />} />
            <Route path="/customer-detail/:id" element={<CustomerDetail />} />
            {/*<Route path="/vendor-detail/:id" element={<VendorDetail />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/manage-listing" element={<ManageListing />} />
            <Route path="/manage-listing/:id" element={<ManageListing />} /> */}
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
