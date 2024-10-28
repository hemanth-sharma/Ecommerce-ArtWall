// SearchProductsPage.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "../Product";
import { useLocation } from "react-router-dom";

function SearchProductsPage() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          query ? `/api/search/?query=${query}` : `/api/search/`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [query, location.search]);
  return (
    <>
      <h2
        className="text-center my-4 text-truncate"
        style={{
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
          fontWeight: "bold",
        }}
      >
        {query}
      </h2>
      {products.length == 0 ? (
        <h6 className="text-center my-4">No products found</h6>
      ) : (
        <Container className="collection-container">
          <Row>
            {products.map((product) => (
              <Col key={product._id} xs={6} sm={4} md={3} lg={2}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default SearchProductsPage;
