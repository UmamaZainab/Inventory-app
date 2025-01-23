const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Import the controller

// Define routes and link them to the controller functions
router.get('/', productController.getAllProducts);  // Should point to the getAllProducts function in the controller
router.get('/:id', productController.getProductById);  // Should point to the getProductById function in the controller
router.post('/', productController.createProduct);  // Should point to the createProduct function in the controller
router.put('/:id', productController.updateProduct);  // Should point to the updateProduct function in the controller
router.delete('/:id', productController.deleteProduct);  // Should point to the deleteProduct function in the controller

module.exports = router; // Export the router to use it in server.js
