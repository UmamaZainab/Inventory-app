import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mofcoLogo from "../img/logo.png"; // Import the logo image




const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []); // Runs only once when the page is first loaded

  const handleSignOut = () => {
    // Set isLoggedIn to false in localStorage to log out the user
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);  // Update local state
    navigate("/login");    // Redirect to login page
  };

  const navigate = useNavigate();  // Initialize navigate

  

  return (
    <nav className="bg-white shadow-md py-4 px-8">
      <div className="flex items-center justify-between">
        {/* Logo and Nav Links */}
        <Link to="/" className="flex items-center">
          <img
            src={mofcoLogo}
            alt="Mofco Logo"
            className="w-25 h-auto" // Adjust the width and height as per your need
          />
        </Link>

        <div className="flex space-x-6">
          {/* Conditional Rendering: Show different links based on login state */}
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="text-cool-blue-gray hover:text-orange-main transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-cool-blue-gray hover:text-orange-main transition duration-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/products"
                className="text-cool-blue-gray hover:text-orange-main transition duration-300"
              >
                Product List
              </Link>
              <Link
                to="/inventory-worth"
                className="text-cool-blue-gray hover:text-orange-main transition duration-300"
              >
                Inventory Worth
              </Link>
              <button
                onClick={handleSignOut}
                className="text-cool-blue-gray hover:text-orange-main transition duration-300"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
