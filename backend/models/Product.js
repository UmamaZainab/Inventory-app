const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String },
    imageURL: { type: String }, // New field for storing the image URL
});

module.exports = mongoose.model('Product', productSchema);
