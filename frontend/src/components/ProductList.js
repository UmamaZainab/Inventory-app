import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../services/api";
import ReactPaginate from "react-paginate";
import "../index.css"; // Importing the CSS file for animation
import backgroundImage from "../img/cf.jpg"; // Adjust the path based on the location of the file

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const itemsPerPage = 5;

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            const data = await getProducts(currentPage, itemsPerPage);
            if (data && data.products) {
                setProducts(data.products);
                setPageCount(data.totalPages);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        fetchProducts();
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter((product) => {
        const name = product.name ? product.name.toLowerCase() : "";
        const description = product.description
            ? product.description.toLowerCase()
            : "";
        const searchQuery = searchTerm.toLowerCase();
        return name.includes(searchQuery) || description.includes(searchQuery);
    });

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
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl mx-auto mt-16">
                <h1 className="text-3xl font-semibold text-orange-600 mb-4">
                    Product List
                </h1>
                <div className="flex justify-between items-center mb-8 mt-4">
                    <input
                        type="text"
                        placeholder="Search products"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm w-full max-w-md"
                    />
                    <button
                        onClick={() => navigate("/add")}
                        className="bg-orange-500 border border-orange-500  text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-all"
                    >
                        Add Product
                    </button>
                </div>

                <table className="w-full table-auto border-collapse bg-white shadow-lg">
                    <thead className="bg-orange-500 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Quantity</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Description</th>
                            <th className="px-4 py-2 text-left">Image</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <tr
                                    key={product._id}
                                    className="border-b hover:bg-gray-50 transition-all"
                                >
                                    <td className="px-4 py-2">{product._id}</td>
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">{product.quantity}</td>
                                    <td className="px-4 py-2">${product.price}</td>
                                    <td className="px-4 py-2">{product.description}</td>
                                    <td className="px-4 py-2">
                                        {product.imageURL ? (
                                            <img
                                                src={product.imageURL}
                                                alt={product.name}
                                                className="w-16 h-16 rounded object-cover"
                                            />
                                        ) : (
                                            <span className="text-gray-500 italic">No Image</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-8 flex justify-center gap-2">
                                        <button
                                            onClick={() => navigate(`/update/${product._id}`)}
                                            className="bg-green-500 border border-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition-all"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-500 border border-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition-all"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="px-4 py-6 text-center text-gray-500 italic"
                                >
                                    No products available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={
                        "flex justify-center items-center gap-2 mt-6 pagination text-white"
                    }
                    previousLinkClassName="bg-orange-500 px-3 py-1 rounded hover:bg-orange-400"
                    nextLinkClassName="bg-orange-500 px-3 py-1 rounded hover:bg-orange-400"
                    activeClassName="text-gray-500 bg-gray-200 text-white p-1 rounded"
                    pageLinkClassName="text-gray-500 p-1 rounded hover:bg-gray-300 p-1"
                />
            </div>

            <div className="mt-8 flex flex-col items-center justify-center mb-6">
            <p className="text-lg text-gray-800 shadow-md">To check your inventory worth click here!</p>
            <button
                        onClick={() => navigate("/inventory-worth")}
                        className="bg-orange-500 border border-orange-500  text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-all mt-4"
                    >
                        Inventory Worth
                    </button>
            </div>
            
        </div>
    );
};

export default ProductList;
