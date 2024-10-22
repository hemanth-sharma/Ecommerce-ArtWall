import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import './HomePage.css'; // Ensure CSS for styling is applied
import { imageUrl, paintingUrls } from '../PaintingProducts.js'
import Product from '../Product.js';
import { Link } from "react-router-dom";
import axios from "axios"


function HomePage() {
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const fetchProduct = async ()=>{
      try {
        // Fetch all products from the backend API
        const response = await axios.get("api/products/");

        if (response.data.length > 0) {
          const randomProduct = response.data[Math.floor(Math.random() * response.data.length)];
          
          setFeaturedProduct(randomProduct);
          setProducts(response.data.slice(0, 18));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }; 
    fetchProduct();

  }, []);
  // console.log("The Products Data")
  // console.log(featuredProduct)
  // console.log("List of Products")
  // console.log(products)
  
  return (
    <>
      <div className="main-container">
        {/* First Section */}
        <div className="featured-container">
        {featuredProduct && (
          <>
          {/* Blurred Background */}
          <div className="blurred-bg" style={{ backgroundImage: `url(${featuredProduct.image})` }}></div>

          {/* Foreground Content */}
          <Container className="position-relative">
            <Row className="align-items-center">
              {/* Left Side - Image Frame */}
              <Col md={6}>
                <Card className="image-card">
                  <Card.Img variant="top" src={featuredProduct.image} alt="Framed painting" className="poster-image" />
                </Card>
              </Col>

              {/* Right Side - Buttons in a row at the bottom-right */}
              <Col md={6} className="d-flex flex-column justify-content-end align-items-end">
                <div className="button-group">
                  <Button variant="primary" className="me-3 mb-3">Add to Cart</Button>
                  <Button variant="secondary" className="me-3 mb-3">Like</Button>
                  <Link to={`/product/${featuredProduct._id}`}>
                    <Button variant="outline-info" className="mb-3">View</Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
          </>
        )}
        </div>

        {/* Second Section */}
        <Container className="collection-container">
          <Row>
          {products.map((product) => (
            <Col key={product._id} xs={6} sm={4} md={2} lg={2}>
              <Product product={product} />
            </Col>
          ))}
          </Row>
          <Row className="justify-content-center mt-4">
            <Col xs="auto">
              <Link to="/products">
               <button type="button" class="btn btn-outline-primary more-collection">See More</button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default HomePage;