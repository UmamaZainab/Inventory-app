import React, { useState } from "react";
import axios from "axios";
import "../index.css"; // Importing the CSS file for animation
import backgroundImage from "../img/bg5.webp"; // Adjust the path based on the location of the file

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error sending reset link");
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

            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-center mb-6">Forgot Password</h1>

            <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-200"
                >
                    Send Reset Link
                </button>
            </form>

            {message && (
                <p className={`mt-4 text-center ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                    {message}
                </p>
            )}


</div>
        </div>
    );
};

export default ForgotPassword;
