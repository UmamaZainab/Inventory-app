const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const upload = require('./config/upload-config'); // Import the Multer setup
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Update with your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow PUT requests
}));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));


// Define routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/products', productRoutes);  // Product routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






// API Route to fetch all products
// API Route to fetch all products with pagination and sorting
app.get('/products', async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  try {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(Number(limit)); // Make sure limit is a number

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      products: products,
      totalPages: totalPages,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Fetch a single product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(mongoose.Types.ObjectId(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});




// API Route to calculate the inventory worth
// API Route to calculate the inventory worth
app.get('/inventory-worth', async (req, res) => {
  try {
    const products = await Product.find();

    let totalWorth = 0;
    const productDetails = products.map((product) => {
      const productWorth = product.quantity * product.price;
      totalWorth += productWorth;
      return {
        id: product._id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        worth: productWorth
      };
    });

    res.json({
      totalWorth,
      products: productDetails
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





// API Route to add a new product
// API Route to add a new product
// API Route to add a new product
app.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;

    // Validate required fields
    if (!name || !price || !quantity) {
      return res.status(400).json({ message: 'Name, price, and quantity are required.' });
    }

    // Get the uploaded image URL
    const imageURL = req.file?.path || null;

    // Create a new product
    const product = new Product({
      name,
      price,
      quantity,
      description,
      imageURL,
    });

    // Save the product to the database
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(400).json({ message: 'Failed to add product. Please check your input.', error: error.message });
  }
});



// API Route to update a product
app.put('/products/:id', async (req, res) => {
  console.log('Updating product with ID:', req.params.id, req.body);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});






// API Route to delete a product
app.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Route to handle product image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.json({ imageURL: req.file.path }); // Cloudinary provides the image URL
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error });
  }
});

