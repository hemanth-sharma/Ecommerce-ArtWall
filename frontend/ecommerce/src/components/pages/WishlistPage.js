import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from "../Product";
import { useCart } from "../../context/cartContext";
import { useWishlist } from '../../context/wishlistContext';
import useCartActions from "../../hooks/useCartActions";
import { useAuth } from "../../context/AuthContext";



function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const { setIsAuthenticated } = useAuth();
  const {setCartItemCount} = useCart();
  const {setWishlistItemCount} = useWishlist();
  const { addToCart } = useCartActions();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); // Set to true if token exists
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (isAuthenticated) {
          // Fetch wishlist from backend if authenticated
          const response = await axios.get(`/api/wishlist/`);
          setWishlist(response.data);
        } else {
          // Fetch wishlist from localStorage if not authenticated
          const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
          setWishlist(localWishlist);
        }
      } catch (err) {
        // In case of error, fallback to localStorage
        const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(localWishlist);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWishlist();
  }, [isAuthenticated]);

  
  
  if (loading) return <><p>Loading....</p></>;
  if (error) return <><p>{error}</p></>;

  return (
    <Container>
      <h2 className='text-center my-4'>My Wishlist</h2>
      <Row>
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <Col key={product.id} xs={6} sm={4} md={3} lg={2}>
              <Product product={product} />
              <Button 
                  variant="primary" 
                  className="mt-2 w-100" 
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
            </Col>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </Row>
    </Container>
  );
}

export default WishlistPage;
