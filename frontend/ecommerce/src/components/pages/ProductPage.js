import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; 
import useCartActions from "../../hooks/useCartActions";

const API_URL = process.env.REACT_APP_API_URL;

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false)
  const { addToCart } = useCartActions();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/product/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching product");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <><p>Loading....</p></>
  if (error) return <><p>{error}</p></>

  // Function to render stars based on rating
  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar key={i} className={i < rating ? "text-warning" : "text-muted"} />
      );
    }
    return stars;
  };
  // toggle description 
  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  }
  return (
    <>
      <Container className="position-relative">
        <Row className="align-items-center">
          <Col md={6}>
            <Card className="image-card">
              <Card.Img variant="top" src={product.image} alt="Framed painting" className="poster-image" />
            </Card>
          </Col>

          <Col md={6} className="d-flex flex-column justify-content-end align-items-start">
            <h3>{product.name}</h3>
            
            

            <p>
              {showFullDescription 
                ? product.description 
                : product.description.length > 200
                  ? `${product.description.substring(0, 200)}...`
                  : product.description  
              }
              {product.description.length > 200 && (
                <span onClick={toggleDescription} style={{ color: 'blue', cursor: 'pointer' }}>
                  {showFullDescription ? " Read less" : " Read more"}
                </span>
              )}
            </p>

            <div className="d-flex align-items-center">
            <span>{product.rating}</span>
              {renderRatingStars(product.rating)}
              <p className="mb-0 ml-2">({product.reviews_count} reviews)</p>
            </div>
            <p>In Stock: {product.in_stock ? "Yes" : "No"}</p>
            <p>Price: <strong>₹</strong>{product.price}</p>
            <div className="w-100 d-flex">
              <Button variant="primary" className="w-100 me-3" onClick={() => addToCart(product)}>Add to Cart</Button>
              <Button variant="success" className='w-100 me-3'>Buy Now</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductPage;
