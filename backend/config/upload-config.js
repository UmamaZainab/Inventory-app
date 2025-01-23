const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'duk5mvwzb', // Replace with your Cloudinary cloud name
    api_key: '785781236746918', // Replace with your API key
    api_secret: 'zbk77aQh4_lHavkEGdydiRZEWRg', // Replace with your API secret
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'product-images', // Folder name in Cloudinary
        allowed_formats: ['jpeg', 'png', 'jpg'], // Allowed file types
    },
});

const upload = multer({ storage });

module.exports = upload;
