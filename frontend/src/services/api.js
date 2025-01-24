import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = async (page = 0, limit = 5) => {
  try {
    const response = await fetch(
      `${API_URL}/products?page=${page + 1}&limit=${limit}`
    );
    const data = await response.json();
    return data;  // Ensure this returns an object like { products, totalPages }
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], totalPages: 0 };  // Return empty array if there's an error
  }
};



export const addProduct = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    // Use FormData if the update includes file uploads
    const formData = new FormData();
    formData.append('name', updatedProduct.name);
    formData.append('quantity', updatedProduct.quantity);
    formData.append('price', updatedProduct.price);
    formData.append('description', updatedProduct.description);
    if (updatedProduct.image) {
      formData.append('image', updatedProduct.image); // Add image only if it exists
    }

    const response = await axios.put(`${API_URL}/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // Return updated product data
  } catch (error) {
    console.error('Error updating product:', error);
    throw error; // Rethrow to handle in the caller
  }
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.data;
};

export const getInventoryWorth = async () => {
  try {
    const response = await fetch(`${API_URL}/inventory-worth`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching inventory worth:', error);
    throw error;
  }
};

