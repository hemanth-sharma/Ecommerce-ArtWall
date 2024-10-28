import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";
import axios from "axios";
import { useWishlist } from "../context/wishlistContext";
import { useAuth } from "../context/AuthContext";
import { wishlistClickHandler } from "../utils/wishlistUtils";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

function Product({ product }) {
  const [inWishlist, setInWishlist] = useState(false);
  const { isAuthenticated } = useAuth();
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { setWishlistItemCount } = useWishlist();
  

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);
  
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isProductInWishlist = wishlist.some(
      (item) => item._id === product._id
    );
    setInWishlist(isProductInWishlist);
  }, [product._id]);

  const handleWishlistClick = () => {
    wishlistClickHandler(product, inWishlist, setInWishlist, isAuthenticated, setWishlistItemCount);
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
          className={`fa-heart fa-xl wishlist-btn ${
            inWishlist ? "fa-solid active" : "fa-regular"
          }`}
          onClick={handleWishlistClick}
          style={{ cursor: "pointer" }}
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
