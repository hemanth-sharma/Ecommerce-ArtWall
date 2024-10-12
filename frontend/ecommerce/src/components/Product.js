import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Product.css'; // Custom CSS for hover effect and wishlist button

function Product({ product }) {
  return (
    <Card className="product-card">
      <div className="image-container">
        {/* Link to the product detail page */}
        <Link to={`/product/${product.id}`}>
          <Card.Img variant="top" src={product.image} alt={product.name} />
        </Link>

        {/* Wishlist Button (visible on hover) */}
        <Link to="/wishlist">
          <i className="fa-regular fa-heart fa-xl wishlist-btn"></i>
          
        </Link>
      </div>

      <Card.Body>
        <Card.Title as="div">
          <strong>{product.name}</strong>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Product;
