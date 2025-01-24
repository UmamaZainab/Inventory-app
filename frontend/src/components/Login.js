import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../index.css"; // Importing the CSS file for animation
import backgroundImage from "../img/bg5.webp";

const API_URL = process.env.REACT_APP_API_URL;
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save token to localStorage
                localStorage.setItem('authToken', data.token);

                // Navigate to the product list page
                navigate('/products');
            } else {
                setError(data.message || 'Invalid credentials.');
            }
        } catch (err) {
            console.error('Error during login request:', err);
            setError('Something went wrong. Please try again later.');
        }
    };



    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          // Replace this with your actual login logic
          const response = await axios.post("/login", { email, password });
      
          // On successful login, set the login state in localStorage
          localStorage.setItem("isLoggedIn", "true");
          
          // Redirect to Product List or home page
          navigate("/products");
        } catch (error) {
          console.error("Error logging in:", error);
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
                <h2 className="text-2xl font-bold text-[#E96C34] text-center mb-6">Login</h2>
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E96C34] focus:border-[#E96C34]"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E96C34] focus:border-[#E96C34]"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#E96C34] text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-[#d15a2a] transition duration-200"
                    >
                        Login
                    </button>
                </form>
                {error && (
                    <p className="text-red-500 text-sm mt-4 text-center">
                        {error}
                    </p>
                )}
                <p className="text-center mt-6 text-sm">
                    Don't have an account?{' '}
                    <a
                        href="/signup"
                        className="text-[#7a8a9e] font-semibold hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
