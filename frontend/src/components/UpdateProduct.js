import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../index.css"; // Importing the CSS file for animation
import backgroundImage from "../img/cf.jpg"; // Adjust the path based on the location of the file


const UpdateProduct = () => {
    const { id } = useParams(); // Dynamically fetch product ID from URL params
    const navigate = useNavigate();

    // State for product fields
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(''); // For success feedback
    const [errorMessage, setErrorMessage] = useState(''); // For error feedback
    const API_URL = 'https://inventory-app-v276.onrender.com';


    useEffect(() => {
        // Fetch product details to pre-fill form
        const fetchProduct = async () => {
            try {
                console.log(`Fetching product with ID: ${id}`);
                const response = await axios.get(`${API_URL}/products/${id}`);
                console.log('Product fetched successfully:', response.data);
                const product = response.data;
                setName(product.name);
                setPrice(product.price);
                setQuantity(product.quantity);
                setDescription(product.description);
            } catch (error) {
                console.error('Error fetching product:', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Status code:', error.response.status);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
                setErrorMessage('Failed to fetch product details. Please try again later.');
            }
        };


        fetchProduct();
    }, [id]);



    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create FormData object for the form
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('description', description);
        if (image) formData.append('image', image);

        try {
            console.log(`Updating product with ID: ${id}`);
            console.log('Form data being sent:', {
                name,
                price,
                quantity,
                description,
                image: image ? image.name : null,
            });

            // Make the API request
            const response = await axios.put(`${API_URL}/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Required for file uploads
                },
            });

            console.log('Product updated successfully:', response.data);

            // Show success message
            setSuccessMessage('Product updated successfully!');
            setErrorMessage(''); // Clear previous errors

            // Redirect to the product list
            navigate('/');
        } catch (error) {
            // Log detailed error information
            console.error('Error updating product:', error);

            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }

            // Show error message to the user
            setErrorMessage('Failed to update product. Please try again.');
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
                    backgroundColor: "rgba(255, 255, 255, 0.2)", // Adjust opacity and color here
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1, // Ensure the overlay is behind the content
                }}
            ></div>

            <div className='w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 mt-14 mb-12'>
            <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">Update Product</h1>

            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="block font-semibold">Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter product name"
                        className="w-full p-3 border rounded-md border-gray-300"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block font-semibold">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                        className="w-full p-3 border rounded-md border-gray-300"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block font-semibold">Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                        className="w-full p-3 border rounded-md border-gray-300"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block font-semibold">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter product description"
                        className="w-full p-3 border rounded-md border-gray-300"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block font-semibold">Upload Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full p-3 border rounded-md border-gray-300"
                    />
                </div>

                <div className="flex justify-between items-center mt-6">
                    <button
                        type="submit"
                        className="bg-orange-500 border border-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
                    >
                        Update Product
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-gray-500 border border-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            </div>


        </div>
    );
};

export default UpdateProduct;
