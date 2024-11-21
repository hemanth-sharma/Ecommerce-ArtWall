// AllProductsPage.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Product from "../Product";
import { useLocation } from "react-router-dom";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("category");
  console.log("CategoryName = ", categoryName)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(categoryName ? `${API_ENDPOINT}/api/products/?category=${categoryName}` : `${API_ENDPOINT}/api/products/`);
        setProducts(response.data);
        setNextPage(response.data.next);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [categoryName]);

  // Function to filter products by category
  // const filterProductsByCategory = (category) => {
  //   return category ? products.filter(product => product.categories.some(cat => cat.category.category === category)) : products;
  // };

  // Get the category from the query parameters
  // const queryParams = new URLSearchParams(location.search);
  // const categoryName = queryParams.get("category"); 

  // Filter products based on the category
  // const filteredProducts = filterProductsByCategory(categoryName);
  const loadMoreProducts = async () => {
    if (nextPage) {
      try {
        const response = await axios.get(nextPage); 
        setProducts((prevProducts) => [...prevProducts, ...response.data.results]); // Append new products
        setNextPage(response.data.next); 
      } catch (error) {
        console.error("Error loading more products:", error);
      }
    }
  };
  console.log("Category data: ", products)
  return (
    <>
      {categoryName && (
        <h2 className="text-center my-4" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', fontWeight: 'bold' }}>
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} POSTERS
        </h2>
      )}


      <Container className="collection-container">
        <Row>
          {products.map((product) => ( 
            <Col key={product._id} xs={6} sm={4} md={3} lg={2}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      {nextPage && (
        <div className="text-center mt-4">
          <Button onClick={loadMoreProducts} className="btn btn-outline-primary">
            Load More
          </Button>

        </div>
      )}
      </Container>
    </>
  );
}

export default AllProductsPage;
