const Product = require('../models/Product');  // Assuming you're using Mongoose models

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from database
        res.status(200).json(products); // Return products in the response
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params; // Retrieve product ID from the request params
    try {
        const product = await Product.findById(id); // Find product by its ID
        if (!product) {
            return res.status(404).json({ message: 'Product not found' }); // Handle case where product is not found
        }
        res.status(200).json(product); // Return the product details
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product', error: error.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    const { name, description, price, quantity } = req.body; // Extract data from request body
    try {
        const newProduct = new Product({
            name,
            description,
            price,
            quantity
        });
        
        const savedProduct = await newProduct.save(); // Save the new product to the database
        res.status(201).json(savedProduct); // Return the saved product in the response
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
    const { id } = req.params; // Get product ID from URL parameters
    const { name, description, price, quantity } = req.body; // Get the updated data from the request body
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, quantity },
            { new: true } // Return the updated document after the update
        );
        
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct); // Return the updated product details
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params; // Get product ID from URL parameters
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(id); // Delete the product by its ID
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' }); // Return a success message
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};
