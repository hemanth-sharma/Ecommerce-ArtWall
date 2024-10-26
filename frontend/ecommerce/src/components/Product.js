import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";
import axios from "axios";
import { useWishlist } from "../context/wishlistContext";
import { useAuth } from "../context/AuthContext";

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

  const handleWishlistClick = async () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isAuthenticated) {
      try {
        const token = localStorage.getItem("authToken");

        if (inWishlist) {
          // Remove from backend wishlist
          await axios.delete(`api/wishlist/remove/${product._id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setInWishlist(false);
          setWishlistItemCount(prevCount => prevCount - 1);
        } else {
          // Add to backend wishlist
          await axios.post(
            "api/wishlist/add/",
            { product_id: product._id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setInWishlist(true);
          setWishlistItemCount(prevCount => prevCount + 1);
        }
      } catch (error) {
        console.error("Failed to update wishlist:", error);
      }
    } else {
      if (inWishlist) {
        // Removing from localStorage wishlist
        const updatedWishlist = wishlist.filter(
          (item) => item._id !== product._id
        );
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setInWishlist(false);
        setWishlistItemCount(prevCount => prevCount - 1);
      } else {
        // Adding the item in localStorage wishlist
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        setInWishlist(true);
        setWishlistItemCount(prevCount => prevCount + 1);
      }
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
