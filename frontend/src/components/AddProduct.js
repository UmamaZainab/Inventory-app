import React, { useState } from 'react';
import { addProduct } from '../services/api';
import "../index.css"; // Importing the CSS file for animation
import backgroundImage from "../img/cf.jpg"; // Adjust the path based on the location of the file
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        image: null, // Store the selected image file
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Use FormData to send the image file and other data
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('quantity', formData.quantity);
        data.append('description', formData.description);
        if (formData.image) data.append('image', formData.image);

        try {
            const response = await addProduct(data); // API call
            console.log(response);
            setMessage('Product added successfully!');
        } catch (error) {
            console.error(error);
            setMessage('Failed to add product. Please try again.');
        }
    };
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
                    backgroundColor: "rgba(255, 255, 255, 0.2)", // Adjust opacity and color here
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1, // Ensure the overlay is behind the content
                }}
            ></div>
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 mt-14 mb-6">
                <h1 className="text-2xl font-bold text-orange-500 mb-6 text-center">Add New Product</h1>
                {message && (
                    <p
                        className={`mb-4 text-center ${
                            message.includes('success') ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter product name"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-e96c34"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Enter product price"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-e96c34"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="Enter quantity"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-e96c34"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter product description"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-e96c34"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            required
                        ></textarea>
                    </div>

                    {/* Image */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                            Product Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-e96c34"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-orange-500 border border-orange-500  hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-300"
                    >
                        Add Product
                    </button>

                </form>
            </div>
            <div className='flex mb-12'>
            <button
                        onClick={() => navigate("/products")}
                        className="bg-gray-500 text-md border  border-gray-500 text-white hover:bg-gray-600 py-1 px-4 rounded-full focus:outline-none focus:ring-4 focus:ring-gray-300"
                    >
                        Go back
                    </button>
            </div>

        </div>
    );
};

export default AddProduct;
