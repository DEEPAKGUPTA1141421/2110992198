const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const TEST_SERVER_API = 'https://testserver.com/api';


const fetchProducts = async (category, n, page = 1, sort = {}) => {
    try {
        const response = await axios.get(`${TEST_SERVER_API}/categories/${category}/products`, {
            params: { n, page, ...sort }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};


const fetchProductDetails = async (category, productId) => {
    try {
        const response = await axios.get(`${TEST_SERVER_API}/categories/${category}/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
};


app.get('/categories/:category/products', async (req, res) => {
    const { category } = req.params;
    const { n = 10, page = 1, sort = {} } = req.query;

    try {
        const products = await fetchProducts(category, n, page, sort);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/categories/:category/products/:productId', async (req, res) => {
    const { category, productId } = req.params;

    try {
        const productDetails = await fetchProductDetails(category, productId);
        res.json(productDetails);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
