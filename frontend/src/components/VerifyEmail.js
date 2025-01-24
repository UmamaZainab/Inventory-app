import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get("token");
            if (!token) {
                setMessage("Invalid or missing token");
                return;
            }
            try {
                const response = await axios.get(`https://inventory-app-v276.onrender.com/api/auth/verify-email?token=${token}`);
                setMessage(response.data.message);
            } catch (error) {
                setMessage(error.response?.data?.message || "Verification failed");
            }
        };
        verifyEmail();
    }, [searchParams]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">Verify Your Email</h1>
                <p className="text-center text-lg">{message}</p>
            </div>
        </div>
    );
};

export default VerifyEmail;
