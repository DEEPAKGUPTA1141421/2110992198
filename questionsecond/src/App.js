import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, TextField, Button, Select, MenuItem } from '@material-ui/core';
import Product from "./Product.js";
const API_BASE_URL = 'http://localhost:3000'; 

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/product/:productId">
          <ProductDetailsPage />
        </Route>
        <Route path="/">
          <AllProductsPage />
        </Route>
      </Switch>
    </Router>
  );
};

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    rating: '',
    priceMin: '',
    priceMax: '',
    availability: ''
  });
  const [sorting, setSorting] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchData();
  }, [filters, sorting, page, pageSize]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/all/products`, {
        params: {
          page,
          pageSize,
          ...filters,
          sort: sorting
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

 

  return (
    <Container>
       <Product/>
    </Container>
  );
};

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
   
  }, []);

  return (
    <Container>
      <Product/>
    </Container>
  );
};

export default App;
