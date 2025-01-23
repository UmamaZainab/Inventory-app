import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Importing the CSS file for animation
import backgroundImage from "../img/bg4.jpg"; // Adjust the path based on the location of the file



const Welcome = () => {
    const navigate = useNavigate();

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
                    backgroundColor: "rgba(255, 255, 255, 0)", // Adjust opacity and color here
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1, // Ensure the overlay is behind the content
                }}
            ></div>



            <div className="flex flex-col items-center space-y-8 relative z-10">
                {/* Animated Text */}
                <h1 className="welcome-text mb-0 text-6xl sm:text-5xl font-bold text-center text-white">
                    {Array.from("Welcome to Mofco Inventory").map((letter, index) => (
                        <span
                            key={index}
                            className="animated-letter"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </span>
                    ))}
                </h1>

                {/* Description */}
                <p className="text-lg sm:text-base text-center px-4 max-w-2xl text-white">

                Easily manage your products, track their value, and optimize your stock levels.If you're new here, sign up to create an account.

Already have an account? Log in below.
                </p>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-[#E96C34] hover:bg-orange-hover text-white py-2 px-6 rounded-full border-2 border-[#E96C34] hover:border-orange-hover text-lg shadow-md transition duration-300"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-[#E96C34] hover:bg-cool-blue-hover text-white py-2 px-8 rounded-full border-2 border-[#E96C34] text-lg shadow-md transition duration-300"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
