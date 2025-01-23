// src/components/Loading.js
import React from "react";
import "../index.css"; // Importing the CSS file for animation


const Loading = () => {
    return (
        <div className="loading-screen bg-soft-cream flex justify-center items-center min-h-screen">
            <div
                className="loading-spinner border-4 border-t-transparent rounded-full w-12 h-12 animate-spin"
                style={{
                    borderColor: "#E96C34", // Orange color for spinner
                    borderTopColor: "transparent", // Transparent for the spinning effect
                }}
            ></div>
        </div>
    );
};

export default Loading;
