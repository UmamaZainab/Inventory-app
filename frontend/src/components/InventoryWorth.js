import React, { useEffect, useState } from 'react';
import { getInventoryWorth } from '../services/api';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import "../index.css"; // Importing the CSS file for animation
import backgroundImage from "../img/cf.jpg"; // Adjust the path based on the location of the file

const InventoryWorth = () => {
  const [totalWorth, setTotalWorth] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventoryWorth();
  }, []);

  useEffect(() => {
    // Filter products based on the search query
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const fetchInventoryWorth = async () => {
    try {
      const data = await getInventoryWorth();
      setTotalWorth(data.totalWorth); // Set the total worth
      setProducts(data.products); // Set all products
      setFilteredProducts(data.products); // Initialize filtered products
    } catch (error) {
      console.error('Error fetching inventory worth:', error);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Pagination: Calculate the products to display for the current page
  const offset = currentPage * itemsPerPage;
  const currentProducts = filteredProducts.slice(offset, offset + itemsPerPage);

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


      <div className='w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 mt-14 mb-6'>
      <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">Inventory Worth:</h1>

      {/* Display Total Worth */}
      <h2 className="text-2xl font-bold text-center mb-6">
        Total Inventory Worth: <span className="text-green-500">SAR {totalWorth.toFixed(2)}</span>
      </h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by product name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 border rounded-md border-gray-300 mb-6"
      />

      {/* Table of Products */}
      <h3 className="text-xl font-semibold mb-4 text-orange-500">Individual Product Worth:</h3>
      <table className="min-w-full border-collapse table-auto mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border-b text-left">ID</th>
            <th className="p-3 border-b text-left">Name</th>
            <th className="p-3 border-b text-left">Quantity</th>
            <th className="p-3 border-b text-left">Price (SAR)</th>
            <th className="p-3 border-b text-left">Worth (SAR)</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{product.id}</td>
                <td className="p-3 border-b">{product.name}</td>
                <td className="p-3 border-b">{product.quantity}</td>
                <td className="p-3 border-b">{product.price}</td>
                <td className="p-3 border-b">{(product.worth).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-3">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>

 

      {/* Pagination */}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={'flex justify-center mt-4'}
        pageClassName={'px-4 py-2 border border-gray-300 mx-1 rounded-full cursor-pointer'}
        activeClassName={'bg-orange-500 text-white'}
        disabledClassName={'text-gray-400 cursor-not-allowed'}
        previousClassName={'p-2'} // Styling for "Previous"
        nextClassName={'p-2'} // Styling for "Next
      />
    </div>

    <button
        onClick={() => navigate(-1)}
        className="bg-orange-500 text-white px-8 py-2 rounded-full hover:bg-orange-600 mb-12"
      >
        Back
      </button>
    </div>
  );
};

export default InventoryWorth;
