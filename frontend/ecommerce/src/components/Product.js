import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Product.css'; 

function Product({ product }) {
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isProductInWishlist = wishlist.some(item => item._id === product._id);
    setInWishlist(isProductInWishlist);
  }, [product._id]);

  const handleWishlistClick = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if(inWishlist){
      // Removing from the wishlist
      const updatedWishlist = wishlist.filter(item => item._id !== product._id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setInWishlist(false);
    }
    else{
      // Adding the item in the wishlist
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setInWishlist(true);
    }
  };
  return (
    <Card className="product-card">
      <div className="image-container">
        {/* Link to the product detail page */}
        <Link to={`/product/${product._id}`}>
          <Card.Img variant="top" src={product.image} alt={product.name} />
        </Link>

        {/* Wishlist Button (visible on hover) */}
        <i
          className={`fa-heart fa-xl wishlist-btn ${inWishlist ? 'fa-solid active' : 'fa-regular'}`}
          onClick={handleWishlistClick}
          style={{ cursor: 'pointer' }}
        ></i>
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
