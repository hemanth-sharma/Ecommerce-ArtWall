import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import './HomePage.css'; // Ensure CSS for styling is applied
import { imageUrl, paintingUrls } from '../PaintingProducts.js'
import Product from '../Product.js';
import { Link } from "react-router-dom";
import axios from "axios";
import useCartActions from "../../hooks/useCartActions";

import { useWishlist } from "../../context/wishlistContext";
import { useAuth } from "../../context/AuthContext.js"
import { wishlistClickHandler } from "../../utils/wishlistUtils.js";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

function HomePage() {
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const { addToCart } = useCartActions();
  const [isLiked, setIsLikedWishlist] = useState(false);
  const { isAuthenticated } = useAuth();
  const { setWishlistItemCount } = useWishlist();

  useEffect(()=>{
    
    const fetchProduct = async ()=>{
      try {
        // Fetch all products from the backend API
        console.log("API ENDPOINT = ", API_ENDPOINT);
        const response = await axios.get(`${API_ENDPOINT}/api/products/`);

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

  const handleWishlistClick = () => {
    wishlistClickHandler(featuredProduct, isLiked, setIsLikedWishlist, isAuthenticated, setWishlistItemCount);
  };
  
  console.log(featuredProduct)
  console.log(featuredProduct.image.split('/images/').join(''))
  
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
          <div className="blurred-bg" style={{ backgroundImage: `url(${featuredProduct.image.split('/images/').join('')})` }}></div>

          {/* Foreground Content */}
          <Container className="position-relative">
            <Row className="align-items-center">
              {/* Left Side - Image Frame */}
              <Col md={6}>
                <Card className="image-card">
                  <Card.Img variant="top" src={featuredProduct.image.split('/images/').join('')} alt="Framed painting" className="poster-image" />
                </Card>
              </Col>

              {/* Right Side - Buttons in a row at the bottom-right */}
              <Col md={6} className="d-flex flex-column justify-content-end align-items-end">
                <div className="button-group">
                  <Button variant="primary" className="w-100 mb-3" onClick={() => addToCart(featuredProduct)}>Add to Cart</Button>
                  <Button className="w-100 mb-3" style={{ backgroundColor: isLiked ? "#F00" : "#5BC0DE", borderColor: isLiked ? "#FF6B6B" : "#5BC0DE" }} onClick={handleWishlistClick}>Like</Button>
                  <Link to={`/product/${featuredProduct._id}`} className="w-100">
                    <Button variant="outline-info" className="w-100">View</Button>
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