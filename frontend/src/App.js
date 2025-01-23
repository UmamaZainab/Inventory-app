import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import ForgotPassword from "./components/ForgetPassword";
import VerifyEmail from "./components/VerifyEmail";
import InventoryWorth from "./components/InventoryWorth";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import ProductList from "./components/ProductList";
import Navbar from './components/Navbar';
import Loading from "./components/Loading";


const App = () => {
  const [loading, setLoading] = useState(true);

  // Simulate a global loading effect on app load
  useEffect(() => {
    // Simulate an artificial delay (e.g., fetching initial data)
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after a short delay
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (loading) {
    return <Loading />; // Show the loading screen while the app is loading
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/inventory-worth" element={<InventoryWorth />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
        <Route path="/products" element={<ProductList />} /> {/* Add ProductList Route */}
      </Routes>
    </Router>
  );
};

export default App;
