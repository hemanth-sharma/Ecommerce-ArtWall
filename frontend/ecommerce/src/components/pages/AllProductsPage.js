// AllProductsPage.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "../Product";
import { useLocation } from "react-router-dom";

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const location = useLocation(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("api/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Function to filter products by category
  // const filterProductsByCategory = (category) => {
  //   return category ? products.filter(product => product.categories.some(cat => cat.category.category === category)) : products;
  // };

  // // Get the category from the query parameters
  // const queryParams = new URLSearchParams(location.search);
  // const categoryName = queryParams.get("category"); // Get the category parameter

  // // Filter products based on the category
  // const filteredProducts = filterProductsByCategory(categoryName);

  return (
    <>
    <Container className="collection-container">
      <Row>
        {products.map((product) => (
          <Col key={product._id} xs={6} sm={4} md={3} lg={2}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Container>
    </>
    
  );
}

export default AllProductsPage;
