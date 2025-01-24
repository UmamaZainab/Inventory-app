import React, { useState } from "react";
import axios from "axios";
import "../index.css"; // Importing the CSS file for animation
import backgroundImage from "../img/bg5.webp"; // Adjust the path based on the location of the file

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://inventory-app-v276.onrender.com/api/auth/register", {
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
    className="bg-soft-cream min-h-screen flex flex-col justify-center items-center text-cool-blue-gray"
    style={{
        // backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/213/48/981/architecture-building-city-photography-wallpaper-preview.jpg')",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        zIndex: 0,
    }}
>
              {/* Overlay for opacity */}
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity and color here
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1, // Ensure the overlay is behind the content
                }}
            ></div>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#E96C34] text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E96C34] focus:border-[#E96C34]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E96C34] focus:border-[#E96C34]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#E96C34] text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-[#d15a2a] transition duration-200"
          >
            Sign Up
          </button>
        </form>
        {message && (
          <p
            className={`text-sm mt-4 text-center ${
              message.toLowerCase().includes("success")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#7a8a9e] font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
