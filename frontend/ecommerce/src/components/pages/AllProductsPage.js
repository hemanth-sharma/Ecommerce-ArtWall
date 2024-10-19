// AllProductsPage.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "../Product";
import { useLocation } from "react-router-dom";

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("category");
  console.log("CategoryName = ", categoryName)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(categoryName ? `/api/products/?category=${categoryName}` : "/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [categoryName, location.search]);

  // Function to filter products by category
  // const filterProductsByCategory = (category) => {
  //   return category ? products.filter(product => product.categories.some(cat => cat.category.category === category)) : products;
  // };

  // Get the category from the query parameters
  // const queryParams = new URLSearchParams(location.search);
  // const categoryName = queryParams.get("category"); 

  // Filter products based on the category
  // const filteredProducts = filterProductsByCategory(categoryName);
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
          {products.map((product) => ( // Use filteredProducts instead of products
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
